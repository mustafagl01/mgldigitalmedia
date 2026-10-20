## 1 — Core metaphor

**"Every routine task in your business becomes a job card: a trigger, an action, and your approval before anything leaves the building."** The component is the **Job Card** — a spec-sheet block (Trigger → Does → Touches → *Your approval* → Result) used for all five catalogue automations, every tier, every pricing row. Not decoration: the entire catalogue is rendered as Job Cards, so a salon owner sees "appointment reminder → WhatsApp → you tap approve" and an ops director sees "quote request → parsed → draft → you approve." Same component, same honesty, both audiences.

## 2 — Information architecture

Kill principle: the business sells by **complexity tier**, so the site must be organized by tier, not by tool (n8n, WhatsApp) or sector. Sector pages and /sorunlar are thin duplicates; tools are components inside offers, not offers.

Routes (~12 templates × 2 locales ≈ 24 URLs vs ~35 — a ~30% cut, estimate):
- `/` home
- `/automation` — the ladder: Ready-made → Connected → Complex → Custom
- `/automation/[5 slugs]` — one small page per catalogue item (keeps search traffic that /sorunlar was chasing)
- `/assistants` — phone receptionist + WhatsApp (usage pricing shown here)
- `/web-ads` — one page, two spec sheets (websites one-off; ads flat monthly)
- `/manufacturers` — ONE page built for the cold-email click: Complex-tier examples, how engagements run, "human approval" spec
- `/pricing` — single hub, TR/GBP toggle, no sub-pages
- `/work` — proof page (see §6)
- `/about`, `/contact`, `/blog` (comparison articles live here)

One tap: pricing, real-work link, WhatsApp contact, and a persistent trust bar (company no., Companies House link, founder name, city). The audience fork is **two links in the hero** into the same ladder — Ready-made sorts small businesses, Complex/`/manufacturers` sorts factories. No contradiction possible because both sit on one ladder, mirroring the price list.

## 3 — Home page (7 sections)

1. **Hero:** "We take the routine work off your phone — bookings, reminders, chases, documents. Automated, with your approval on every send." Below: 3 stacked Job Cards in a static "running" state. Dual CTA: *Small business* / *Manufacturer or distributor*. Trust bar directly under.
2. The five catalogue Job Cards.
3. The ladder (Connected / Complex / Custom, one line + example each).
4. Proof strip: live coffee-shop link (real client), demos labelled demos, founder name/photo.
5. How it runs: map on a call → 14-day trial → you approve, we maintain.
6. Pricing band, both currencies, entry points only.
7. Founder + closing CTA combined (one-person company is the pitch, not a secret).

First screen must let a manufacturer verify "real, technical, not an agency farm" in <60s (estimate): legal entity visible, no fluff, one concrete example.

## 4 — Palette, type, logo

Metaphor = status board, so colour carries **meaning**, not vibes:
- Background **#F2F4EF** (cool, NOT cream — deliberately far from the warm-paper looks), ink **#1B211E**
- Running/approved: **#1D6B4F** (deep engine green)
- Awaiting-your-approval chip: **#B7791F** used only as a small semantic dot, never as a palette accent
- Type: **IBM Plex Sans** + **IBM Plex Mono** (full Turkish coverage, latin-ext; Mono renders Job Card field labels — the spec-sheet voice). One family, two registers.

**Redesign the logo:** "mgl.ai" set in Plex Sans, with a single green square after it — the approval light. The orange-red italic "ai" goes; it's in your banned family anyway and clashes.

## 5 — Signature interaction

**The Approval Gate.** One interactive demo, reused: a Job Card drafts a WhatsApp reply / quote draft, sits visibly in *Awaiting your approval*, user taps approve, card flips to *Sent*. Everyone else in this space demos the magic; you demo the control — which is your actual differentiator. Motion: **calm.** One state flip, no scroll animation, cursor-dot may blink.

## 6 — Trust without case studies

- `/work` page with an **honest scoreboard**: "1 paying client · 1 live site · 4 demos (labelled) · 1 enterprise discussion — updated [date]." I expect the other advisors to hate this; I argue it's your best asset. Cold-email recipients already suspect you're small — verified honesty converts the 60-second check into differentiation. (If the founder can't update it monthly, drop it — a stale counter is a lie.)
- Link the live coffee-shop site (with client's OK).
- Demos captioned "Built as a proposal — not client work."
- 3-minute founder video, face to camera; LinkedIn link.
- Published spec: where data lives, GDPR/KVKK handling, where the approval step sits, money-back terms in plain words.
- "Founding clients: next 3 engagements at listed prices" (if true).

## 7 — Images

Shared style: flat technical-diagram line art, ink + green duotone on the cool ground — documentation drawings, not marketing renders.
1. Hero: line-art flow where a salon front and a factory line merge into one diagram.
2–6. One per catalogue card (calendar+phone; invoice+arrow; folder; star; funnel).
7. Tier marks: plug-nodes / parsed document / blank sheet.
8. Graph-paper background texture (very low contrast).

Forbidden: stock-looking people, robot hands, glowing brains, fake dashboards with invented numbers, any render of a business you haven't worked with, all orange/copper tones. Founder portrait must be a real photo — never generated.

## 8 — Failure modes

- **The fork is the redesign.** A gorgeous site whose hero still reads "small-business websites" loses the manufacturer in 60 seconds (estimate). If §2's fork isn't shipped, everything else is paint.
- **Maintenance collapse.** The founder runs this from a phone. If page count isn't cut hard, in 6 months (estimate) half the site is stale and the "honest company" reads as a neglected one.
- **Demo leakage.** One unlabelled dental-clinic screenshot indexed by Google becomes a fabricated case study.
- **Palette drift.** Green + a warmish ground slides straight back into "warm paper + lime." Keep the ground cool; I'd rather fight over that than over type.
- **My scoreboard idea failing silently** — see §6; it's the one recommendation I'd withdraw fastest if evidence disagrees.
