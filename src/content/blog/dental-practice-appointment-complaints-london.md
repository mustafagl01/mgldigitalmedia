---
title: "Dental practice appointment complaints in London: what 106 negative reviews show"
description: "We counted 106 negative reviews of London dental practices. Appointment handling appears in 41. What automation can fix, and where it backfires."
date: "2026-10-18"
language: "en"
tags: ["dental practice", "appointments", "patient communication", "automation", "research"]
cover: ""
faqs:
  - question: "What do patients complain about most at London dental practices?"
    answer: "In the 106 negative London reviews we coded, clinical care is the most common complaint (46), followed closely by staff or dentist attitude (42) and appointment handling (41). Appointment complaints cover practice-side cancellations, long waits to rebook, wrong or unconfirmed times, and disputes after missed appointments, including removal from the practice list. Price surprises appear in 16 reviews and unanswered calls in 5. A review can carry several themes, so the numbers should not be added up. The sample is small and deliberately negative, so it shows which problems recur rather than how common they are across all practices. Appointment handling stands out because, unlike clinical outcomes, it is mostly a process and communication problem."
  - question: "Can an NHS dental practice charge for a missed appointment?"
    answer: "In England, no: a practice cannot charge an NHS patient for a missed NHS appointment. BDA guidance also says that one missed appointment is not by itself grounds for removing a patient from the practice list, although a pattern of non-attendance can be taken into account. Private care is different: a private practice may charge a cancellation fee or ask for a deposit if its policy says so, and that policy should be clear at booking. Several reviewers only learned about a fee or removal after the event. Stating the applicable policy in every confirmation helps both sides, as long as staff, not an automated rule, make the final decision on exceptional cases."
  - question: "How should dental appointment reminders be timed?"
    answer: "A common pattern is a confirmation at booking and reminders about 48 and 24 hours before the appointment, sent within daytime hours the practice sets. Timing and frequency matter as much as content: two of the reviews we read complained about the reminders themselves, one about a text at 07:13 on a Sunday and one about repeated unwanted calls. Each reminder should let the patient reply to change or cancel, and that reply should release the slot to someone on a short-notice list. If an email gets no response, sending the same message by SMS reduces the \"it went to spam\" problem one reviewer described. Keep clinical detail out of the message."
  - question: "Do automated reminders reduce missed appointments?"
    answer: "They can help with missed appointments caused by a patient forgetting or never seeing the booking, but we have not measured that effect and we do not quote a figure. What the reviews do show is the value of a clear record: when a missed appointment leads to a fee or de-registration dispute, a log of what was sent, when, and how the patient replied settles the facts. Reminders do not help when the cause is a lack of capacity or a practice-side cancellation; there, the useful automation is fast notice to the patient and refilling freed slots from a waiting list. Test on a small set of bookings before rolling out."
---

**Short answer:** In 106 negative reviews of London dental practices, **appointment handling appears in 41**, almost as often as clinical care (46) and staff attitude (42). Patients describe short-notice cancellations by the practice, weeks-long waits to rebook, confirmed slots at a closed door, and fees or de-registration after a missed appointment. Price surprises (16) and unanswered calls (5) follow. Clinical care is not a software problem; most appointment complaints are communication and record-keeping failures, which is the part automation can help with.

| 106 | 41 | 16 | 2 |
|---|---|---|---|
| negative reviews read | mention appointment handling | mention price or fees | complain about the reminders themselves |

## What did we count?

A review can raise several issues, so totals exceed 106. The table shows only counts that **both coders** agreed on.

| Theme | Reviews (of 106) | Can automation help? |
|---|---|---|
| Clinical care: outcome, diagnosis, pain | 46 | No |
| Staff and dentist attitude | 42 | Not directly |
| Appointment handling: cancellations, rebooking waits, booking errors, missed-appointment disputes, de-registration | 41 | Yes: confirmations, rebooking, clear policy |
| Price: fees not disclosed upfront, quote changed at the appointment, refunds | 16 | Partly: written estimates and fee notices |
| Other | 8 | - |
| Unanswered calls, no call-back | 5 | Yes: call-back tracking |
| Complaints about reminder messages themselves | 2 | This is automation done badly |

In short:
- 41 of 106 negative London reviews mention how appointments were handled.
- The recurring patterns: the practice cancels at short notice and the next slot is weeks away; a confirmed time turns out to be wrong or the door is closed; a missed or late appointment leads to a fee the patient says nobody mentioned, or to removal from the practice list.
- 2 reviews complain about reminders themselves: one about a text at 07:13 on a Sunday, one asking the practice to stop phoning.

> **Method:** 92 text reviews of 1-2 stars from the lowest-rated reviews of the first 12 practices returned for "dental practice" in London on Google Maps, plus the 14 most recent 1-2 star Trustpilot reviews of two UK dental chains. Collected 16 October 2026. Each review was tagged against a written guide by two independent coders (two different AI models); agreement (Cohen's kappa) 0.76-0.94 across themes. A small, non-random sample deliberately focused on negative reviews: it shows direction, not prevalence. No practice, dentist or reviewer is named.

## Why are appointment complaints so common?

Because many of these problems start before the patient reaches the chair. Reviewers describe waiting weeks for a slot and then having it cancelled on the day, arriving at a confirmed time to find the practice closed, or being told after a missed appointment that they owe a fee or have been removed from the list. In one case the booking email had gone to the patient's spam folder.

These causes are not all the same. Some reflect limited capacity, some an incorrect record, some a policy the patient never understood. Automation only helps with the communication layer: confirming time and place, giving an easy way to change, recording what was sent and what came back, and flagging when nobody has picked up a reply. It cannot create a free dentist or decide who should be treated.

## What do the rules say about missed appointments?

In England, a practice cannot charge an NHS patient for a missed appointment, and BDA guidance says a single missed appointment is not by itself grounds for removal from the practice list, although repeated non-attendance can be taken into account. Private practices may charge a cancellation fee or take a deposit under their own policy, which should be made clear at booking.

Several reviewers did not know which rule applied to them until they were at the reception desk. The practical fix is for the booking record to know whether a visit is NHS or private, and for every confirmation to state the relevant policy in one plain sentence. Staff should still review exceptional cases rather than letting an automated rule make the final call.

## Example flow: confirm, remind, rebook

*Example flow, a design sketch based on this research, not a live client installation.*

**Compact chain:** Booking in the practice system → confirmation with policy → reminders at 48h and 24h → patient replies → rebooking or staff task → communication log

1. **Input:** Reception books a slot in the practice management system (for example Dentally or Software of Excellence) or the practice's shared calendar.
2. **Process, confirmation:** The patient gets the date, time, full address, how to change the booking, and the NHS or private attendance policy that applies.
3. **Process, reminders:** Reminders go 48 and 24 hours before, inside a daytime window the practice sets (for example 09:00-18:00, never early on a Sunday).
4. **Process, replies:** If the patient replies "change" or "cancel", they are offered the next free slots and the freed slot goes to patients on a short-notice list.
5. **Process, practice cancels:** If the practice has to cancel, affected patients hear within the hour with rebooking options, instead of finding out at the door.
6. **Process, fallback:** If an email bounces or gets no response, the same message goes by SMS.
7. **Output:** Every confirmation, reminder, delivery result and reply is logged against the patient. If a missed-appointment dispute arises, both sides can see what was sent and when.

## How does Istanbul compare?

We counted 86 negative reviews of Istanbul clinics with the same method. There, appointment complaints are less common (9 of 86) and mostly about waiting past the booked time. The main automatable issue is **price** (16): quotes changing at the till, fees not mentioned in advance, invoices not sent. Both cities show exactly 16 price complaints, but the workflow around them differs. → [Istanbul article (Turkish)](/blog/dis-klinigi-fiyat-ve-randevu-sikayetleri)

## Where this breaks

- **It does not fix clinical care.** 46 of the 106 reviews are about treatment. Better messages will not change those.
- **It does not fix attitude.** 42 reviews are about staff or dentist attitude. A faster template can spread an unhelpful tone just as fast.
- **Reminders can become the complaint.** Two reviews are about the reminders: a 07:13 Sunday text and repeated unwanted calls. Set a sending window, cap the number of messages and make "stop" work.
- **It does not create capacity.** If the next free slot is six weeks away, a quicker message only delivers the bad news sooner. The real gain is refilling freed slots from a short-notice list.
- **A wrong policy becomes a repeated error.** An automatic "one missed appointment = removed" rule for NHS patients would go against BDA guidance. Get the policy right before automating it.
- **Health information needs care.** Treatment details are special category data under UK GDPR. Keep SMS and email to time, place and how to change; leave clinical detail out.
- **Reminders should stay reminders.** Under PECR, a genuine appointment reminder is generally treated as a service message. Adding promotions such as whitening offers or plan upsells can turn it into direct marketing, which needs consent.

## Sources
1. Google Maps, "dental practice" London; 92 text reviews of 1-2 stars from the lowest-rated reviews of the first 12 practices, collected 16 Oct 2026.
2. Trustpilot, two UK dental chains; the 14 most recent 1-2 star reviews, collected 16 Oct 2026.
3. British Dental Association, "Managing non-attendance in dental practices providing NHS care in England", bda.org.
4. Information Commissioner's Office, guidance on direct marketing and PECR (service messages and marketing), ico.org.uk.
5. ---
**Author:** Mustafa Gul, founder of MGL Digital Media Ltd (UK company no. 16007414). Builds WhatsApp, phone and workflow automation for small businesses. He collected the data in this article himself. There is no published client case for this workflow yet; the example flow is a design based on this research, not a client installation.

Related: [Automatic appointment reminders and booking](/en/sorunlar/randevu-hatirlatma-sistemi) · [Enquiry and reception automation for clinics](/en/solutions/klinik)
