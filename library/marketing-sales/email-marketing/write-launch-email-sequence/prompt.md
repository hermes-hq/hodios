---
schema: 1
id: write-launch-email-sequence
kind: prompt
title: Write a launch email sequence
description: Writes a product or course launch email sequence - warm-up, doors open, proof, objections, deadline and close - with segments that stop selling to people who have already bought.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, content-creator, copywriter]
requires: [none]
inputs: [text, spec]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [launch-sequence, course-launch, cart-close, objection-handling, open-cart]
pairs_with:
  prompts: [write-promo-email, write-email-subject-lines, write-event-email-sequence]
args:
  - name: offer
    description: What is launching (product, course, programme, membership), price and payment options, what is included, the guarantee or refund terms, and who it is for and not for.
    type: text
    required: true
  - name: launch_window
    description: Dates for warm-up, open and close, any real bonus or price that ends, and whether doors close for good or the offer stays available later.
    type: text
    required: true
  - name: audience_and_proof
    description: List size and how warm it is, the main objections you hear, and real proof available (testimonials with permission, results, beta numbers). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Launch calendar, Emails, Segments and suppression, After the close]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a launch copywriter. A launch sequence works because the list hears about a problem before it hears about a product, gets a clear open date, sees proof and answers to its real doubts, and then has an honest reason to decide now. Most sales in an open-close launch come on the first day and the last day, so those two emails deserve the most care, and the final 24 hours usually needs more than one email. What novices miss: buyers must be removed from the sequence the moment they purchase; people who say "not now" should be able to opt out of this launch without unsubscribing from everything; and the deadline must be real. A "closing forever" that reopens next week destroys the next launch.
</context>

<task>
Write the launch email sequence.

<offer>
{{offer}}
</offer>

Launch window: {{launch_window}}
{{#audience_and_proof}}
<audience_and_proof>
{{audience_and_proof}}
</audience_and_proof>
{{/audience_and_proof}}

1. **Launch calendar:** map every email to a date and time across warm-up (value content that names the problem, two or three emails), open, middle (proof, objections, FAQ, a story), and close (24 hours left, final hours, closed). Mark which emails go to everyone and which only to engaged or interested people.
2. **Warm-up emails:** teach or show something useful related to the offer and announce the open date; include an "I'm interested" click to build a hot segment.
3. **Open email:** what it is, who it is for, what is included, price and payment options, guarantee, one link.
4. **Middle emails:** one per main objection or proof point, using only the supplied testimonials and results.
5. **Close emails:** state exactly what ends and when, with the time zone; final-hours email is short.
6. For each email give two subject lines, a preheader, the body and one call to action.
7. **Segments and suppression:** remove buyers immediately and send them an onboarding email instead; add a "not for me this time" link that removes someone from the launch only; cap total sends per day.
8. **After the close:** a closed or waitlist email, and what to measure (sales by email, unsubscribes per email, refund rate).
</task>

<constraints>
- Use only supplied proof. Never invent testimonials, student results, income claims or numbers; use `[NEEDED: ...]` where proof is missing.
- The deadline and bonus endings must match the launch window exactly. If the offer stays available after the close, do not write "never again" language.
- No guilt or shame tactics, no claims of guaranteed results.
- Include an unsubscribe link in every email.
</constraints>

<output_format>
## Launch calendar
A table: Date and time | Email | Job | Sent to.

## Emails
For each email: subject lines, preheader, body, call to action.

## Segments and suppression
Bullets.

## After the close
The closing email and a short measurement list.
</output_format>
