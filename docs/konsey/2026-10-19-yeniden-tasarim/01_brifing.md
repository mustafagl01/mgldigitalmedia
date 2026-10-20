# Council brief — mgl-ai.com redesign from scratch (round 1)

You are one of three independent advisors. Disagree openly; do not agree out of politeness. Mark every number as an estimate unless sourced. English, max ~900 words.

## Context
- MGL Digital Media Ltd, UK-registered company, run by ONE founder who also has a full-time day job; he manages everything from his phone. Bilingual site TR + EN, region-based prices (Turkey TRY, UK GBP).
- What is sold (two price lists, both for businesses of ANY size and sector):
  1. **Automation** — tiers by job complexity, not company size: Ready-made (5 fixed catalogue automations: lead capture, appointment reminders, payment chaser, document collection, review requests) → Connected (2-3 workflows, CRM/cloud apps) → Complex (ERP, AI document reading, multilingual; e.g. reading incoming quote requests and preparing a draft) → Custom.
  2. **Web, ads, AI assistants** — websites (one-off build), Meta/Google ads management (flat monthly fee), AI phone receptionist and WhatsApp assistant (monthly + prepaid usage).
- Visitors: (a) decision makers at 20-500 staff manufacturers/distributors who received a cold email and check whether we are real and competent (they spend <60 seconds); (b) small business owners (clinics, salons, restaurants, accountants) from search, ads or referral.
- Proof available: no case studies yet; 1 paying UK small-business client (ads); a live client site with online ordering (a coffee shop); several demo websites built (dental clinic, hair transplant clinic, nursery); a first large manufacturer prospect in talks. Company number, address, founder name are public.
- Constraints: honest tone, no fabricated numbers/logos/testimonials; 14-day free trial / money-back promise exists; human approval always stays with the client; GDPR/KVKK.
- Stack stays: Vite + React, prerendered static pages, Cloudflare Pages. Images generated with an image model (no stock), but no fake client work shown as real.

## Current site (owner dislikes it: home page, other pages, design)
- Palette: warm cream paper #F7F4EE, ink #171713, crimson accent #A91D2D (plus moss, ochre). Fonts: Source Serif + DM Sans. Logo: "mgl" serif + italic "ai" in orange-red #BC3B15, tag "/ SYSTEMS" (accent colours inconsistent with site).
- Home has 11 stacked sections (hero, capabilities, problems, journey, process bridge, who we work with, how we work, why MGL, pricing band, demo section, founder's bet, closing CTA). Hero image: a laptop showing a café website + WhatsApp chat + CRM notifications (reads as small-business only).
- ~35 routes with overlapping logic: /services, /solutions (by sector: clinic, real estate, e-commerce, beauty, restaurant), /sorunlar (problem pages: after-hours calls, appointment reminders, payment chasing, document collection, Excel→messages), separate service pages (WhatsApp AI, voice AI, n8n, process automation, lead generation, managed outreach, UK accounting automation), comparison articles, blog, /pricing hub + /pricing/automation + /pricing/local.

## Banned defaults (owner's standing rules)
Orange/copper/terracotta/brick palettes (blind spot of past projects); generic hero + 3 cards + testimonials; stock-photo look; dark-mode-by-default; "AI made this" effect soup. Recently used in other projects (do not repeat): navy+brass gold, pastel pink, cream+rose+petrol, warm paper+gold+bronze (Lora/Karla), ink+matte gold (Italiana), warm paper+lime (Archivo), ink+bone+teal (Newsreader/Instrument Sans). Fonts already used: Fraunces, DM Sans, Lora, Karla, Archivo, Newsreader, Instrument Sans, Inter.

## Questions
1. **Core metaphor** in one sentence, and how it becomes a CONTENT component (not decoration). It must work for both a salon owner and a factory operations director.
2. **Information architecture:** the full route list you would build (merge/kill the overlapping pages). What must a visitor find in one tap? How do the two audiences each find their path without the site contradicting itself?
3. **Home page:** section list top to bottom (max ~7), what the first screen says and shows.
4. **Palette (hex) + type pairing** (Turkish glyphs required), justified by the metaphor. Keep or redesign the logo?
5. **Signature interaction** nobody else in this space has (one), and motion level (calm / medium / high).
6. **Trust without case studies:** concrete content ideas.
7. **Images:** what to generate (list each image, one line each), shared style direction, what is forbidden.
8. What would make this redesign fail? Disagree openly.
