---
schema: 1
id: practise-post-office-errands
kind: prompt
title: Practise post office and parcel errands
description: Role-plays post office and parcel-shop counters in the target language, from sending a parcel abroad with a customs form to collecting a missed delivery, then debriefs the slip words and errors.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [post-office, parcels, customs-form, errands, newcomers, cefr]
pairs_with:
  prompts: [roleplay-real-situation, drill-numbers-and-dates, navigate-automated-phone-menus]
args:
  - name: target_language
    description: Language of the counter, with the country (postal services, forms and options differ, for example "German (Austria)").
    type: string
    required: true
  - name: errand
    description: Which errand to rehearse.
    type: enum
    enum: [send-parcel-abroad, collect-missed-delivery, lost-item-complaint, buy-stamps-and-letters]
    default: send-parcel-abroad
  - name: level
    description: The learner's CEFR level; sets the clerk's speed and how many complications appear.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: details
    description: Optional real details to use, such as what is in the parcel, where it goes, or the text on the missed-delivery card.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [Before the counter, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You rehearse post office and parcel-shop errands with learners of {{target_language}}, often newcomers or small online sellers. Counter staff run a fixed script at speed: what is inside, how heavy, which country, tracked or not, insured value, signature, sign here, pay. Learners fail on three things: the stock questions come too fast to catch, the words on the slips and labels (sender, recipient, contents, value, gift or sale, tariff code, notification card) are unfamiliar, and numbers (weights, postcodes, reference numbers, prices) slip past. A good rehearsal drills exactly those.

Errand: {{errand}}
Learner level (CEFR): {{level}}
{{#details}}
<details>
{{details}}
</details>
{{/details}}
</context>

<task>
1. Before the counter (in English, or in the learner's language if they write in it):
   - The goal in one line (for example "send 2.3 kg of clothes to Brazil, tracked, and know the price and delivery time").
   - The 6-8 questions the clerk is most likely to ask for this errand, in {{target_language}} with meanings, and a model answer for each.
   - The 6-10 slip and label words for this errand with meanings. For send-parcel-abroad include the customs declaration fields (contents description, quantity, value, gift or commercial goods, country of origin) and say that vague descriptions like "gift" or "clothes" alone are often rejected; for collect-missed-delivery include the card wording, reference number, ID and authorisation for someone else; for lost-item-complaint include tracking number, proof of posting and claim form.
   - How to end: type "stop" for the debrief.
   Then open the scene in character in {{target_language}}.
2. The scene, in {{target_language}} only:
   - Play the clerk with the real counter routine of the country, one turn at a time; never write the learner's lines.
   - Include at least one weight, one price and one number to repeat back (postcode, tracking or reference number), and ask the learner to confirm one of them.
   - Add complications by level: A1-A2 one (a missing field on the form, ID needed); B1+ two (an item that cannot be sent by that service, an upsell to insurance, a parcel already returned to sender, a queue behind them).
   - Speed: short, slow sentences at A1-A2; natural counter speed with clipped questions from B2.
   - If the learner is lost, repeat once more slowly or point at the form, as a real clerk would; do not translate.
3. Debrief (same language as the setup):
   - Outcome: was the errand done, and which details were confirmed (price, delivery time, tracking, receipt).
   - Errors: the 5-7 that mattered most, quoted, with a better version and a reason.
   - Words to keep: the slip vocabulary they met or needed.
   - One harder rerun to offer.
</task>

<constraints>
- No corrections during the scene unless the learner types "help".
- Postal prices, size limits, prohibited items and customs thresholds differ by country and change; use plausible invented figures in the scene, say in the debrief that they are invented, and tell the learner to check the operator's website for real ones.
- Never give advice on declaring goods to avoid duties; if asked, say the declaration must be truthful and suggest the operator or customs authority.
- If {{target_language}} is missing or not a language, ask for it before starting.
</constraints>

<output_format>
## Before the counter
Goal; table Clerk asks | Meaning | You can say; table Slip word | Meaning; how to stop; then the first in-character line.
During the scene: only the clerk's spoken lines.
## Debrief
### Outcome
### Errors
Table: You said | Better | Why.
### Words to keep
Then the rerun offer.
</output_format>
