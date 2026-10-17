# Business Chinese Fundamentals: early-bird landing page

Landing page to test demand for the **Business Chinese Fundamentals** course (early bird, 299 €) with lecturer **Minh Khue Tran**, in **English** (`/`), **German** (`/de/`) and **Vietnamese** (`/vi/`). It uses the Spavio AI Academy identity (Violet Glam: Playfair Display + Manrope, violet gradient on the primary button only, self-hosted fonts, no tracking).

A visitor reserves a seat (free, no payment) with email and what they need Chinese for. That is the demand signal.

## Deploy on Vercel

1. Put this folder in its own GitHub repo (or run `npx vercel` inside it).
2. On vercel.com: **Add New > Project**, import the repo. Leave the settings as they are: `vercel.json` already sets the build command (`node build.mjs`) and the output folder (`dist`).
3. **Signups arrive by e-mail at `kris.tran900@gmail.com`, with no setup.** After the first deploy, submit the form once yourself. [FormSubmit](https://formsubmit.co) then e-mails an activation link to that address (check spam); click it once. From then on every reservation is delivered. Until you click it, signups are not delivered, so do this before running ads.

   Optional environment variables (Project > Settings > Environment Variables), then redeploy:

   | Variable | What it does |
   |---|---|
   | `NOTIFY_EMAIL` | Send to a different address than `kris.tran900@gmail.com`. |
   | `RESEND_API_KEY` | Send through [Resend](https://resend.com) instead of FormSubmit (no activation step). Until you verify a domain there, mail can only go to the address your Resend account was registered with. Optional `RESEND_FROM` sets the sender. |
   | `SIGNUP_WEBHOOK_URL` | Also POST each signup as JSON to a URL: Google Apps Script (writes a Google Sheet), Zapier, Make, n8n, ... |

   If every destination fails, the visitor sees an error instead of a false "reserved" message.
4. Open `site.config.json` and set `"siteUrl"` to the final address (for example `https://chinese.spavioai.de`). This switches on canonical links, hreflang, the share image URLs and `sitemap.xml`. Redeploy.

Signup JSON: `email, name, phone (optional), via (zalo / whatsapp), goal (+ goalOther when goal is "other"), level (beginner / basics / intermediate / advanced / unsure), pageLocale, source (utm_*, referrer), course, offer, consent, receivedAt`. For ad tests, tag links with `?utm_source=facebook&utm_campaign=...`; the source is stored with each signup.

## Edit and preview locally

```
node build.mjs     # writes dist/
node serve.mjs     # http://localhost:4173/  (the form writes to signups.local.jsonl)
```

- Text, in all three languages: `src/copy.mjs`
- Look: `src/styles.css`; page structure: `build.mjs`
- Lecturer photo: add `assets/lecturer.jpg` (4:5, about 640x800) and rebuild; until then the page shows initials.
- Share images: `assets/og/{en,de,vi}.png` (1200x630).
- Privacy, imprint and Academy links: `site.config.json`.

## Things to confirm before spending on ads

- **Script**: the sample lines are in Traditional characters (the lecturer studied in Taiwan). Change `demoShared` in `src/copy.mjs` if the course teaches Simplified.
- **Course details are not on the page** because they were not given: start date, number of lessons, duration, teaching language, regular price.
- **VAT**: the page says "299 €" without "incl. VAT" / "excl. VAT". Add it to `offer.priceNote` once decided.
- **Legal**: the privacy and imprint links point at spavioai.de; make sure the privacy policy covers collecting signup emails.
