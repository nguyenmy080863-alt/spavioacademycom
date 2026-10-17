/**
 * Static build: renders one page per language from src/copy.mjs into dist/.
 *   /          English (default, x-default)
 *   /de/       German
 *   /vi/       Vietnamese
 * No dependencies. Run: node build.mjs   (Vercel runs it via vercel.json)
 */
import { cp, mkdir, readFile, readdir, rm, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { COPY, LOCALES, PATH, demoShared, platforms } from './src/copy.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const config = JSON.parse(await readFile(join(ROOT, 'site.config.json'), 'utf8'));
const SITE = (config.siteUrl || '').replace(/\/+$/, '');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const exists = (p) => access(p).then(() => true, () => false);

const FLAG = { en: 'gb', de: 'de', vi: 'vn' };
const GOAL_KEYS = ['ordering', 'import-export', 'ecommerce', 'partners', 'other'];
const LEVEL_KEYS = ['beginner', 'basics', 'intermediate', 'advanced', 'unsure'];

const icon = {
  arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>',
  // Scalloped "verified" seal with a check: for credentials and benefit lists (the plain check stays for the selected language).
  badge:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>',
  plus:'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>',
  chevron: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
};

function flag(code, size) {
  // The 24px flags sit in the closed language menu, so they can wait; the 36px one is in the header.
  const lazy = size < 36 ? ' loading="lazy"' : '';
  return `<img src="@@BASE@@assets/flags/${FLAG[code]}.svg" alt="" width="${size}" height="${size}" class="flag"${lazy}>`;
}

function languageMenu(current) {
  const items = LOCALES.map(
    (code) => `<a href="${PATH[code]}" hreflang="${code}" lang="${code}"${code === current ? ' aria-current="page"' : ''}>
        ${flag(code, 24)}<span>${esc(COPY[code].label)}</span>${code === current ? icon.check : ''}
      </a>`,
  ).join('');
  return `<details class="lang">
      <summary aria-label="${esc(COPY[current].label)}" title="${esc(COPY[current].label)}">${flag(current, 36)}</summary>
      <div class="lang-menu">${items}</div>
    </details>`;
}

function logo() {
  return `<span class="logo"><img src="@@BASE@@assets/brand/spavioai-logo.png" alt="" width="917" height="192"><span class="pill">Academy</span></span>`;
}

function jsonLd(c, locale) {
  const url = SITE ? SITE + PATH[locale] : undefined;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.hero.title.replace(/,$/, '') + ' ' + c.hero.titleEm,
    description: c.meta.description,
    inLanguage: locale,
    ...(url ? { url } : {}),
    provider: { '@type': 'Organization', name: 'Spavio AI', url: 'https://spavioai.de' },
    instructor: { '@type': 'Person', name: c.lecturer.name },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/PreOrder',
      ...(url ? { url: url + '#reserve' } : {}),
    },
  };
  return JSON.stringify(data);
}

function head(c, locale) {
  const url = SITE ? SITE + PATH[locale] : '';
  const alternates = SITE
    ? LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE + PATH[l]}">`).join('\n  ') +
      `\n  <link rel="alternate" hreflang="x-default" href="${SITE + PATH.en}">\n  <link rel="canonical" href="${url}">`
    : '';
  const og = SITE
    ? `<meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}/og/${locale}.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="${SITE}/og/${locale}.png">`
    : '';
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(c.meta.title)}</title>
  <meta name="description" content="${esc(c.meta.description)}">
  <meta name="theme-color" content="#761dea">
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Spavio AI Academy">
  <meta property="og:title" content="${esc(c.meta.title)}">
  <meta property="og:description" content="${esc(c.meta.description)}">
  <meta property="og:locale" content="${c.ogLocale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(c.meta.title)}">
  <meta name="twitter:description" content="${esc(c.meta.description)}">
  ${og}
  <link rel="icon" href="@@BASE@@assets/brand/spavio-academy-mark.png" type="image/png">
  <link rel="preload" href="@@BASE@@assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="@@BASE@@assets/fonts/playfair-display-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="@@BASE@@assets/styles.css">
  <script type="application/ld+json">${jsonLd(c, locale)}</script>`;
}

function page(locale, hasPhoto) {
  const c = COPY[locale];
  const cta = (cls = '') =>
    `<a href="#reserve" class="btn btn-primary ${cls}" data-cta>${esc(c.hero.ctaPrimary)}${icon.arrow}</a>`;
  const demo = demoShared
    .map(
      (d, i) => `<li>
          <p class="zh" lang="zh-Hant">${esc(d.zh)}</p>
          <p class="py" lang="zh-Latn-pinyin"><span class="sr">${esc(c.demo.pinyinLabel)}: </span>${esc(d.py)}</p>
          <p class="tr">${esc(c.demo.translations[i])}</p>
        </li>`,
    )
    .join('');
  const marquee = [...c.situations.items, ...c.situations.items]
    .map((t, i) => `<li${i >= c.situations.items.length ? ' aria-hidden="true"' : ''}>${esc(t)}</li>`)
    .join('');
  const platformItems = [...platforms, ...platforms]
    .map((p, i) => {
      const hidden = i >= platforms.length ? ' aria-hidden="true"' : '';
      return p.full
        ? `<li class="logo-chip full"${hidden}><img src="@@BASE@@assets/platforms/${p.logo}" alt="${esc(p.name)}" width="55" height="44" loading="lazy"></li>`
        : `<li class="logo-chip"${hidden}><img src="@@BASE@@assets/platforms/${p.logo}" alt="" width="32" height="32" loading="lazy"><span>${esc(p.name)}</span></li>`;
    })
    .join('');
  const learn = c.learn.items
    .map(
      (it, i) => `<li class="card">
          <span class="num">${i + 1}</span>
          <h3>${esc(it.t)}</h3>
          <p>${esc(it.d)}</p>
        </li>`,
    )
    .join('');
  const steps = c.how.steps
    .map(
      (s, i) => `<li>
          <span class="num">${i + 1}</span>
          <h3>${esc(s.t)}</h3>
          <p>${esc(s.d)}</p>
        </li>`,
    )
    .join('');
  // The credentials as three compact cards (groups of three, in the order of the list).
  const bio = c.lecturer.groupTitles
    .map(
      (title, g) => `<div class="group">
          <h3>${esc(title)}</h3>
          <ul class="ticks tight">${c.lecturer.bio
            .slice(g * 3, g * 3 + 3)
            .map((b) => `<li>${icon.badge}<span>${esc(b)}</span></li>`)
            .join('')}</ul>
        </div>`,
    )
    .join('');
  const deckSlides = Array.from({ length: slideCount }, (_, i) => {
    const n = i + 1;
    const alt = c.preview.alt.replace('{n}', n).replace('{total}', slideCount);
    return `<li><img src="@@BASE@@assets/lesson/slide-${String(n).padStart(2, '0')}.webp" alt="${esc(alt)}" width="1280" height="720" decoding="async" loading="lazy"></li>`;
  }).join('');
  const academyBullets =c.academy.build.bullets
    .map((b) => `<li>${icon.badge}<span>${esc(b)}</span></li>`)
    .join('');
  const includes = c.offer.includes.map((b) => `<li>${icon.badge}<span>${esc(b)}</span></li>`).join('');
  const goals = c.form.goalOptions
    .map((label, i) => `<option value="${GOAL_KEYS[i]}">${esc(label)}</option>`)
    .join('');
  const levels = c.form.levelOptions
    .map((label, i) => `<option value="${LEVEL_KEYS[i]}">${esc(label)}</option>`)
    .join('');
  const faq = c.faq.items
    .map(
      (f) => `<details>
          <summary>${esc(f.q)}${icon.plus}</summary>
          <p>${esc(f.a)}</p>
        </details>`,
    )
    .join('');
  const links = [
    ['#course', c.nav.course],
    ['#lecturer', c.nav.lecturer],
    ['#reserve', c.nav.offer],
    ['#academy', c.nav.academy],
    ['#faq', c.nav.faq],
  ]
    .map(([h, t]) => `<a href="${h}">${esc(t)}</a>`)
    .join('');
  const photo = hasPhoto
    ? `<img src="@@BASE@@assets/academy/minhkhuetran.png" alt="${esc(c.lecturer.photoAlt)}" width="1024" height="1024" loading="lazy">`
    : `<span class="initials" role="img" aria-label="${esc(c.lecturer.photoAlt)}">MKT</span>`;
  const msg = JSON.stringify({
    sending: c.form.sending,
    error: c.form.error,
    notConnected: c.form.notConnected,
    required: c.form.required,
    invalidEmail: c.form.invalidEmail,
    phoneInvalid: c.form.phoneInvalid,
    viaRequired: c.form.viaRequired,
  });

  return `<!doctype html>
<html lang="${locale}">
<head>
  ${head(c, locale)}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container bar">
    <a href="${PATH[locale]}" class="brand" aria-label="Spavio AI Academy">${logo()}</a>
    <nav class="primary" aria-label="Primary">${links}</nav>
    <div class="bar-end">
      <span class="lang-wrap">${languageMenu(locale)}</span>
      <a href="${esc(config.academySignupUrl)}" class="btn btn-soft btn-sm start-link">${esc(c.nav.start)}</a>
      <a href="#reserve" class="btn btn-primary btn-sm" data-cta>${esc(c.nav.reserve)}</a>
    </div>
  </div>
</header>

<main id="main">
  <section class="shell">
    <!-- Light hero (follows the visitor's light/dark theme). The earlier always-dark version was: <div class="dark hero"> + composer-dark.png -->
    <div class="hero">
      <div class="hero-wash" aria-hidden="true"></div>
      <div class="hero-inner">
        <h1 class="display">${esc(c.academy.hero.title)} <em>${esc(c.academy.hero.titleEm)}</em></h1>
        <p class="lead">${esc(c.academy.hero.subtitle).replaceAll('Spavio AI Academy', 'Spavio&nbsp;AI&nbsp;Academy')}</p>
        <div class="actions">
          <a href="${esc(config.academySignupUrl)}" class="btn btn-primary">${esc(c.nav.start)}${icon.arrow}</a>
        </div>
      </div>
      <div class="product-frame">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="@@BASE@@assets/academy/composer-dark.png">
          <img src="@@BASE@@assets/academy/composer-light.png" alt="${esc(c.academy.hero.frameAlt)}" width="1280" height="720" decoding="async">
        </picture>
      </div>
    </div>
  </section>

  <section id="intro" class="section intro">
    <div class="container split">
      <div class="stack">
        <p class="badge">${esc(c.hero.badge)}</p>
        <h2 class="display">${esc(c.hero.title)} <em>${esc(c.hero.titleEm)}</em></h2>
        <p class="muted big">${esc(c.hero.subtitle)}</p>
        <div class="actions">
          ${cta()}
          <a href="#lecturer" class="btn btn-soft">${esc(c.hero.ctaSecondary)}</a>
        </div>
        <p class="fine">${esc(c.hero.note)}</p>
      </div>
      <figure class="frame">
        <figcaption>${esc(c.demo.label)}</figcaption>
        <ul class="demo">${demo}</ul>
      </figure>
    </div>
  </section>

  <section class="situations" aria-labelledby="situations-title">
    <div class="container center">
      <h2 id="situations-title" class="display sm">${esc(c.situations.lead)}</h2>
      <p class="muted">${esc(c.situations.sub)}</p>
    </div>
    <div class="marquee-mask"><ul class="marquee">${marquee}</ul></div>
    <div class="platforms">
      <div class="container center">
        <h3 class="platforms-lead">${esc(c.platforms.lead)}</h3>
      </div>
      <div class="marquee-mask"><ul class="marquee">${platformItems}</ul></div>
      ${c.platforms.note ? `<div class="container center"><p class="fine">${esc(c.platforms.note)}</p></div>` : ''}
    </div>
  </section>

  <section id="course" class="section">
    <div class="container split">
      <div class="stack">
        <h2 class="display">${esc(c.learn.title)} <em>${esc(c.learn.titleEm)}</em></h2>
        <p class="muted big">${esc(c.learn.body)}</p>
        ${cta('mt')}
      </div>
      <ul class="cards">${learn}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="display">${esc(c.how.title)}</h2>
      <ol class="steps">${steps}</ol>
    </div>
  </section>

  <section id="lecturer" class="section">
    <div class="container lecturer">
      <div class="who">
        <div class="portrait">${photo}</div>
        <p class="eyebrow">${esc(c.lecturer.eyebrow)}</p>
        <h2 class="display name">${esc(c.lecturer.name)}</h2>
      </div>
      <div class="groups">${bio}</div>
    </div>
  </section>

  <section id="reserve" class="section reserve">
    <div class="container split top">
      <div class="stack">
        <p class="eyebrow">${esc(c.offer.eyebrow)}</p>
        <h2 class="display">${esc(c.offer.title)} <em>${esc(c.offer.titleEm)}</em></h2>
        <p class="muted big">${esc(c.offer.body)}</p>
        <div class="price-card">
          <div class="price-head">
            <span class="tag">${esc(c.offer.badge)}</span>
          </div>
          <p class="price-was"><span class="sr">${esc(c.offer.regularLabel)}: </span><s>${esc(c.offer.regularPrice)}</s></p>
          <p class="price">${esc(c.offer.price)}</p>
          <p class="limited">${esc(c.offer.limited)}</p>
          <p class="muted small">${esc(c.offer.priceNote)}</p>
          <ul class="ticks tight">${includes}</ul>
        </div>
      </div>

      <form class="form-card" id="reserve-form" novalidate data-locale="${locale}" data-messages='${esc(msg)}'>
        <h3 class="display xs">${esc(c.form.title)}</h3>
        <p class="muted">${esc(c.form.sub)}</p>
        <div class="field">
          <label for="f-name">${esc(c.form.name)} <span aria-hidden="true">*</span></label>
          <input id="f-name" name="name" type="text" autocomplete="name" maxlength="120" required placeholder="${esc(c.form.namePlaceholder)}">
          <p class="err" data-err="name" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-email">${esc(c.form.email)} <span aria-hidden="true">*</span></label>
          <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="200" required placeholder="${esc(c.form.emailPlaceholder)}">
          <p class="err" data-err="email" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-phone">${esc(c.form.phone)}</label>
          <input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="30" placeholder="${esc(c.form.phonePlaceholder)}">
          <p class="err" data-err="phone" role="alert"></p>
          <fieldset class="via">
            <legend>${esc(c.form.phoneVia)}</legend>
            <label class="choice"><input type="checkbox" name="via" value="zalo"><span>Zalo</span></label>
            <label class="choice"><input type="checkbox" name="via" value="whatsapp"><span>WhatsApp</span></label>
          </fieldset>
          <p class="err" data-err="via" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-goal">${esc(c.form.goal)}</label>
          <div class="select"><select id="f-goal" name="goal"><option value="">${esc(c.form.goalPlaceholder)}</option>${goals}</select>${icon.chevron}</div>
        </div>
        <div class="field" id="goal-other-field" hidden>
          <label for="f-goal-other">${esc(c.form.goalOther)} <span aria-hidden="true">*</span></label>
          <textarea id="f-goal-other" name="goalOther" rows="3" maxlength="300" placeholder="${esc(c.form.goalOtherPlaceholder)}"></textarea>
          <p class="err" data-err="goalOther" role="alert"></p>
        </div>
        <div class="field">
          <label for="f-level">${esc(c.form.level)}</label>
          <div class="select"><select id="f-level" name="level"><option value="">${esc(c.form.levelPlaceholder)}</option>${levels}</select>${icon.chevron}</div>
        </div>
        <div class="field hp" aria-hidden="true">
          <label for="f-website">Website</label>
          <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
        </div>
        <div class="field consent">
          <label class="check">
            <input type="checkbox" name="consent" required>
            <span>${esc(c.form.consent)} <a href="${esc(config.privacyUrl)}" target="_blank" rel="noopener">${esc(c.form.privacy)}</a></span>
          </label>
          <p class="err" data-err="consent" role="alert"></p>
        </div>
        <button class="btn btn-primary wide" type="submit">${esc(c.form.submit)}${icon.arrow}</button>
        <p class="err form-err" data-err="form" role="alert"></p>
        <p class="fine">${esc(c.hero.note)}</p>
        <div class="success" id="reserve-success" hidden tabindex="-1">
          <h3 class="display xs">${esc(c.form.successTitle)}</h3>
          <p class="muted">${esc(c.form.success)}</p>
        </div>
      </form>
    </div>
  </section>

  <section id="preview" class="section">
    <div class="container">
      <div class="stack deck-head">
        <p class="eyebrow">${esc(c.preview.eyebrow)}</p>
        <h2 class="display">${esc(c.preview.title)} <em>${esc(c.preview.titleEm)}</em></h2>
        <p class="muted big">${esc(c.preview.body)}</p>
      </div>
      <div class="deck" data-deck>
        <ul class="deck-track" tabindex="0" aria-label="${esc(c.preview.label)}">${deckSlides}</ul>
        <div class="deck-controls">
          <button type="button" class="deck-btn" data-deck-prev aria-label="${esc(c.preview.prev)}">${icon.arrow.replace('class="icon"', 'class="icon flip"')}</button>
          <span class="deck-count" data-deck-count aria-live="polite">1 / ${slideCount}</span>
          <button type="button" class="deck-btn" data-deck-next aria-label="${esc(c.preview.next)}">${icon.arrow}</button>
        </div>
      </div>
    </div>
  </section>

  <section id="academy" class="section">
    <div class="container split">
      <div class="stack">
        <p class="eyebrow">${esc(c.academy.build.eyebrow)}</p>
        <h2 class="display">${esc(c.academy.build.title)} <em>${esc(c.academy.build.titleEm)}</em></h2>
        <p class="muted big">${esc(c.academy.build.body)}</p>
        <a href="${esc(config.academySignupUrl)}" class="btn btn-primary">${esc(c.academy.build.cta)}${icon.arrow}</a>
        <ul class="ticks">${academyBullets}</ul>
      </div>
      <div class="shot">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="@@BASE@@assets/academy/blueprint-dark.png">
          <img src="@@BASE@@assets/academy/blueprint-light.png" alt="${esc(c.academy.build.imageAlt)}" width="1600" height="1000" loading="lazy" decoding="async">
        </picture>
      </div>
    </div>
  </section>

  <section id="faq" class="section">
    <div class="container faq">
      <h2 class="display">${esc(c.faq.title)}</h2>
      <div class="faq-list">${faq}</div>
    </div>
  </section>

  <section class="shell">
    <div class="dark final">
      <div class="final-wash" aria-hidden="true"></div>
      <div class="final-inner">
        <h2 class="display">${esc(c.final.title)}</h2>
        <p class="lead">${esc(c.final.body)}</p>
        <div class="actions">
          ${cta()}
          <a href="${esc(config.academySignupUrl)}" class="btn btn-soft">${esc(c.nav.start)}</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container foot">
    <div class="stack tight-stack">
      ${logo()}
      <p class="muted small">${esc(c.footer.tagline)}</p>
    </div>
    <nav aria-label="Footer">
      <span class="lang-wrap-mobile">${languageMenu(locale)}</span>
      <a href="${esc(config.academyUrl)}">${esc(c.footer.academy)}</a>
      <a href="${esc(config.imprintUrl)}">${esc(c.footer.imprint)}</a>
      <a href="${esc(config.privacyUrl)}">${esc(c.footer.privacy)}</a>
    </nav>
  </div>
  <div class="container copy">© ${new Date().getFullYear()} <a href="https://spavioai.de">Spavio AI</a></div>
</footer>
<script src="@@BASE@@assets/script.js" defer></script>
</body>
</html>
`;
}

// ---- build ----
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
await cp(join(ROOT, 'src', 'styles.css'), join(DIST, 'assets', 'styles.css'));
await cp(join(ROOT, 'src', 'script.js'), join(DIST, 'assets', 'script.js'));
if (await exists(join(ROOT, 'assets', 'og'))) await cp(join(ROOT, 'assets', 'og'), join(DIST, 'og'), { recursive: true });

const hasPhoto = await exists(join(ROOT, 'assets', 'academy', 'minhkhuetran.png'));
// Lesson 1 slides: assets/lesson/slide-01.webp ... (any count)
const slideCount = (await readdir(join(ROOT, 'assets', 'lesson'))).filter((f) => /^slide-\d+\.webp$/.test(f)).length;

for (const locale of LOCALES) {
  const base = locale === 'en' ? './' : '../';
  const html = page(locale, hasPhoto).replaceAll('@@BASE@@', base);
  const dir = locale === 'en' ? DIST : join(DIST, locale);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

if (SITE) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const alts = [...LOCALES, 'x-default']
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE + PATH[l === 'x-default' ? 'en' : l]}"/>`)
    .join('\n');
  const urls = LOCALES.map(
    (l) => `  <url>\n    <loc>${SITE + PATH[l]}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alts}\n  </url>`,
  ).join('\n');
  await writeFile(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
  );
  await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
} else {
  await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n`);
}

console.log(`Built ${LOCALES.length} pages into dist/${hasPhoto ? '' : ' (no assets/academy/minhkhuetran.png: using initials)'}`);
