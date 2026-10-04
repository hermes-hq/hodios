---
schema: 1
id: write-frontline-service-standards
kind: prompt
title: Write frontline service standards
description: Writes a one-page service standards card for shop, cafe or reception staff - greeting, waiting, phone, complaints, goodbye - each as an observable behaviour a manager can coach and check.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, build]
role: [manager, founder, operations-manager]
subject: [retail, hospitality]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [service-standards, observable-behaviours, staff-coaching, front-desk, customer-experience]
pairs_with:
  prompts: [build-service-recovery-playbook, write-job-aid, build-support-qa-scorecard]
args:
  - name: business
    description: The business and its customers - type, size, busy times, what customers come for, the counter, desk or floor set-up, and the service problems you see now (slow greetings, phones ignored, staff on phones).
    type: text
    required: true
  - name: values
    description: How you want customers to feel or the words you use for your style, for example "relaxed and local" or "calm and precise". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Standards card, Coaching checklist, Notes for the manager]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write service standards for small shops, cafes, salons and reception desks. Most standards fail because they are adjectives ("be friendly", "go the extra mile") that nobody can see, coach or check, or because there are 30 of them and nobody remembers any. Standards that work are a handful of observable behaviours tied to the moments that matter most to customers: being noticed when they walk in, not being left waiting without a word, the phone, a complaint, and the goodbye. Each says what a customer would see or hear, sets a realistic target for a busy moment, and leaves room for the person's own words rather than a script.
</context>

<task>
<business>
{{business}}
</business>
{{#values}}
<values>
{{values}}
</values>
{{/values}}

1. Choose five to seven moments that matter for this business (for example arrival, browsing or waiting, ordering or the desk, the phone, a problem or complaint, payment, goodbye), led by the service problems described.
2. For each moment, write one or two standards as observable behaviours with a realistic measure: "Every customer is acknowledged within 10 seconds of coming in, even if you are busy - eye contact and a word"; "If someone waits more than 2 minutes, tell them how long"; "Phone answered within 4 rings with the business name and your name". Fit the measures to the set-up and busy times.
3. Add the "when it goes wrong" standard: listen without interrupting, apologise for the experience, fix what you can now, get a manager for what you cannot, and never argue in front of other customers.
4. Show how each standard reflects the stated values, in a few words, if values are given.
5. Coaching checklist: for each standard, what a manager watches for and one question to ask the staff member afterwards.
6. Notes for the manager: how to introduce the card (one moment a week, not all at once), and any standard that needs equipment, staffing or a rule changed to be achievable.
</task>

<constraints>
- Every standard is observable: if a manager could not see or hear it, rewrite it.
- No scripts beyond a few example words; staff use their own voice.
- Realistic for the staffing and busy times described; never require something impossible at peak (such as walking every customer to the shelf in a one-person shop).
- No standards about appearance or accent beyond hygiene and any stated uniform; nothing that treats customers differently by who they are.
- Card fits one printed page: about 250 words.
</constraints>

<output_format>
## Standards card
A heading per moment, one or two bullet standards under each.
## Coaching checklist
Table: Standard | Watch for | Question to ask.
## Notes for the manager
Bullets.
</output_format>
