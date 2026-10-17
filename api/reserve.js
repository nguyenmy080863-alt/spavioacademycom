/**
 * Vercel function: POST /api/reserve
 *
 * Receives an early-bird reservation and e-mails it to kris.tran900@gmail.com
 * (override with NOTIFY_EMAIL). With no configuration the e-mail is sent through
 * FormSubmit (formsubmit.co): the very first signup makes FormSubmit mail an
 * activation link to that address; click it once and every later signup arrives.
 * Optional environment variables (see README):
 *   NOTIFY_EMAIL         recipient, default kris.tran900@gmail.com
 *   RESEND_API_KEY       send through Resend instead (own sender, no activation step)
 *   RESEND_FROM          optional sender, default onboarding@resend.dev
 *   SIGNUP_WEBHOOK_URL   also POST the signup as JSON (Google Apps Script, Zapier, Make, n8n, ...)
 * A signup is rejected with an error (never silently dropped) if every destination fails.
 */

/** Where reservations are e-mailed unless NOTIFY_EMAIL says otherwise. */
const DEFAULT_NOTIFY_EMAIL = 'kris.tran900@gmail.com';

const LOCALES = ['en', 'de', 'vi'];
const VIA = ['zalo', 'whatsapp'];
const GOALS = ['', 'ordering', 'import-export', 'ecommerce', 'partners', 'other'];
const LEVELS = ['', 'beginner', 'basics', 'intermediate', 'advanced', 'unsure'];

const clip = (value, max) => String(value ?? '').trim().slice(0, max);
const json = (res, status, body) => res.status(status).json(body);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Honeypot: real visitors never fill this field. Pretend success to bots.
  if (clip(body.website, 200)) return json(res, 200, { ok: true });

  if (!clip(body.name, 120)) return json(res, 400, { error: 'name_required' });
  const email = clip(body.email, 200).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json(res, 400, { error: 'invalid_email' });
  if (body.consent !== true) return json(res, 400, { error: 'consent_required' });

  const phone = clip(body.phone, 30);
  const phoneDigits = phone.replace(/\D/g, '').length;
  if (phone && (!/^\+?[0-9 ()\-.]{6,30}$/.test(phone) || phoneDigits < 7 || phoneDigits > 15)) {
    return json(res, 400, { error: 'invalid_phone' });
  }

  // "Something else" must come with the visitor's own words.
  const goal = GOALS.includes(body.goal) ? body.goal : '';
  const goalOther = goal === 'other' ? clip(body.goalOther, 300) : '';
  if (goal === 'other' && !goalOther) return json(res, 400, { error: 'goal_other_required' });

  const signup = {
    email,
    name: clip(body.name, 120),
    phone,
    via: phone && Array.isArray(body.via) ? VIA.filter((v) => body.via.includes(v)) : [],
    goal,
    goalOther,
    level: LEVELS.includes(body.level) ? body.level : '',
    pageLocale: LOCALES.includes(body.locale) ? body.locale : '',
    source: pickSource(body.source),
    course: 'business-chinese-fundamentals',
    offer: 'early-bird-299-eur',
    consent: true,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.SIGNUP_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  // E-mail always goes to `notify`: through Resend when a key is set, otherwise through
  // FormSubmit (no key needed; the first signup triggers a one-time activation e-mail).
  // The webhook, when set, gets the same signup as JSON.
  const deliveries = [
    resendKey ? sendEmail(resendKey, notify, signup) : sendViaFormSubmit(notify, signup),
    ...(webhook ? [postWebhook(webhook, signup)] : []),
  ];
  const results = await Promise.allSettled(deliveries);
  const failed = results.filter((r) => r.status === 'rejected');
  failed.forEach((r) => console.error('reserve: delivery failed', r.reason?.message || r.reason));

  // Success if at least one destination took it, so a visitor is not turned away
  // because a secondary destination is down.
  if (failed.length === deliveries.length) return json(res, 502, { error: 'delivery_failed' });
  return json(res, 200, { ok: true });
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function pickSource(source) {
  const out = {};
  if (source && typeof source === 'object') {
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref', 'referrer']) {
      if (source[key]) out[key] = clip(source[key], 100);
    }
  }
  return out;
}

async function postWebhook(url, signup) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signup),
  });
  if (!response.ok) throw new Error(`webhook ${response.status}`);
}

/** The signup as readable lines, shared by every e-mail route. */
function signupLines(signup) {
  return [
    `E-mail: ${signup.email}`,
    `Name: ${signup.name || '-'}`,
    `Phone: ${signup.phone ? `${signup.phone} (${signup.via.join(', ') || 'no app chosen'})` : '-'}`,
    `Needs Chinese for: ${signup.goal || '-'}${signup.goalOther ? ` (${signup.goalOther})` : ''}`,
    `Chinese level: ${signup.level || '-'}`,
    `Page language: ${signup.pageLocale || '-'}`,
    `Source: ${Object.keys(signup.source).length ? JSON.stringify(signup.source) : '-'}`,
    `Received: ${signup.receivedAt}`,
  ];
}

/** Resend: own sender, no activation step (needs RESEND_API_KEY). */
async function sendEmail(apiKey, to, signup) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'Business Chinese signups <onboarding@resend.dev>',
      to: [to],
      reply_to: signup.email,
      subject: `Early-bird reservation: ${signup.name || signup.email}`,
      text: signupLines(signup).join('\n'),
    }),
  });
  if (!response.ok) throw new Error(`resend ${response.status}`);
}

/**
 * FormSubmit AJAX endpoint: forwards the fields as an e-mail to `to`, no account or
 * key. The first ever submission for an address only sends an activation link to it.
 */
async function sendViaFormSubmit(to, signup) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURI(to)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Early-bird reservation: ${signup.name || signup.email}`,
      _replyto: signup.email,
      _template: 'table',
      _captcha: 'false',
      Name: signup.name || '-',
      Email: signup.email,
      Phone: signup.phone ? `${signup.phone} (${signup.via.join(', ') || 'no app chosen'})` : '-',
      'Needs Chinese for': `${signup.goal || '-'}${signup.goalOther ? ` (${signup.goalOther})` : ''}`,
      'Chinese level': signup.level || '-',
      'Page language': signup.pageLocale || '-',
      Source: Object.keys(signup.source).length ? JSON.stringify(signup.source) : '-',
      Received: signup.receivedAt,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || String(result.success) === 'false') {
    throw new Error(`formsubmit ${response.status} ${result.message || ''}`.trim());
  }
}
