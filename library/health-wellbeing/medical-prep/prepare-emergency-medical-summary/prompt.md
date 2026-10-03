---
schema: 1
id: prepare-emergency-medical-summary
kind: prompt
title: Prepare an emergency medical summary
description: Builds a one-page emergency medical summary and a wallet card listing conditions, medicines, allergies, devices, contacts and care wishes, copied exactly from what the person provides.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [summary, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [emergency-info, wallet-card, allergies, medical-id, carers, advance-care-planning]
pairs_with:
  prompts: [build-medication-list, organize-family-medical-history]
  personas: [health-navigator, eldercare-advisor]
  workflows: [hospital-discharge-track]
args:
  - name: health_info
    description: Everything an emergency team should know, for example conditions, medicines with doses, allergies and what happens, implants or devices, blood group if known, communication needs, usual baseline, emergency contacts (relationship only is fine), family doctor, and any care wishes or documents.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [One-page summary, Wallet card, Missing or unclear, Where to keep it, Keep it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare the information paramedics and emergency teams look for first when someone cannot speak for themselves: what conditions they have, what they take, what they are allergic to, what is normal for them, who to call and what they would want. Emergency clinicians scan, so the most critical items go at the top, in a fixed order, with no padding.

<health_info>
{{health_info}}
</health_info>
</context>

<task>
1. Organise everything into a one-page summary in this order, using only what was provided:
   - **Critical alerts first:** severe allergies with the reaction, conditions that change emergency care (for example on blood thinners, diabetes on insulin, epilepsy, adrenal insufficiency, heart rhythm device, transplant, a do-not-resuscitate or treatment-limit decision), and communication needs (hearing, language, dementia, autism, non-verbal).
   - **Conditions:** with year diagnosed if given.
   - **Medicines:** name, strength and directions exactly as written, including as-needed medicines, inhalers, injections, patches and supplements.
   - **Allergies and intolerances:** substance and reaction.
   - **Implants and devices:** pacemaker, defibrillator, stents, joint replacements, shunts, insulin pump, with card or model details if given.
   - **Usual baseline:** what is normal for this person (mobility, memory, speech, usual blood pressure or oxygen if they gave it), so a change can be spotted.
   - **Contacts:** emergency contacts, family doctor, key specialists.
   - **Care wishes and documents:** advance decisions, treatment-limit forms, organ donation wishes, power of attorney, and where the original documents are kept.
2. Condense it into a wallet card of about 10 short lines: name placeholder, critical alerts, top medicines, allergies, devices, one emergency contact and where to find the full summary.
3. List anything missing or unclear (a medicine without a strength, an allergy without a reaction, a contact with no number) as questions to complete.
4. Where to keep it: the phone's emergency medical ID feature (available on most smartphones and viewable from the lock screen), a copy in a wallet or bag, one on the fridge or by the front door for paramedics, and with whoever is the emergency contact. Mention medical alert jewellery for critical conditions.
5. Keep it current: update after every medicine change or hospital stay, add a "last updated" date, and check it every six months.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy medical details exactly. Do not infer a condition from a medicine or a medicine from a condition; do not add typical doses; do not translate brand names unless both names were given.
- Leave the person's name, date of birth and phone numbers as placeholders such as [Name] and [Phone] unless they included them on purpose; remind them that the card should not carry ID numbers or passwords.
- Treatment-limit and advance-decision forms have specific legal requirements that vary by country. Record that the document exists and where it is, and say the original or official form is what clinicians rely on, so check local rules.
- If something they wrote suggests a current emergency, lead with contacting emergency services.
- Concise, scannable phrasing. The summary must fit on one printed page.
</constraints>

<output_format>
## One-page summary
Headed "EMERGENCY MEDICAL SUMMARY" with a "Last updated: [date]" line, then the sections above in order.
## Wallet card
About 10 lines in a code block so it prints cleanly.
## Missing or unclear
Numbered questions.
## Where to keep it
## Keep it current
</output_format>
