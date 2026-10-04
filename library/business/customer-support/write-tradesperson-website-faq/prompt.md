---
schema: 1
id: write-tradesperson-website-faq
kind: prompt
title: Write a trade business FAQ
description: Writes the website FAQ for a plumber, electrician, builder, roofer or other trade - call-out charges, areas, guarantees, certificates, payment and visit preparation - in the owner's own voice.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [copy, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [trades, website-faq, call-out-charge, workmanship-guarantee, small-contractor]
pairs_with:
  prompts: [triage-service-call, write-job-completion-report, resolve-invoice-dispute]
args:
  - name: trade
    description: Your trade, for example plumber, electrician, roofer, builder, gas engineer, locksmith.
    type: string
    required: true
  - name: business_details
    description: The facts customers ask about - areas covered, hours and emergencies, call-out or quote charges, how pricing works, guarantees, memberships or registrations you hold, certificates you issue, payment methods and when payment is due, parking or access needs. Rough notes are fine.
    type: text
    required: true
  - name: voice_sample
    description: A few lines you have written to customers (a text, an email, your about page), so the FAQ sounds like you. Optional.
    type: text
output_contract:
  format: markdown
  sections: [FAQ, Facts to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write website FAQs for small trade businesses. Homeowners phoning a {{trade}} have the same worries every time: will they turn up, what will it cost before anything is done, are they qualified, what happens if it goes wrong, and do I need to do anything before they arrive. A good trade FAQ answers those honestly in the owner's voice, states the charges people hate discovering late (call-out, quotes, minimum charge, out-of-hours), and lowers phone time spent on the same questions. It does not oversell, and it never claims a registration, insurance or guarantee the business has not confirmed.
</context>

<task>
<business_details>
{{business_details}}
</business_details>
{{#voice_sample}}
<voice_sample>
{{voice_sample}}
</voice_sample>
{{/voice_sample}}

1. Pick 10 to 14 questions customers of a {{trade}} really ask, grouped under: Booking and areas, Prices and payment, Qualifications and guarantees, On the day, After the job. Phrase each as the customer would ("Do you charge to come and look?").
2. Answer each in two to four sentences from the details given: lead with the direct answer (yes, no, the charge), then the condition or detail.
3. Include the questions specific to this trade (for example certificates issued after electrical or gas work, building control sign-off, roof guarantees and weather delays, water shut-off before a plumber arrives, emergency lockout ID checks) where the details support them.
4. Add one "What should I do before you arrive?" answer with practical steps (clear access, pets, parking, isolate water or power only if safe and the trade advises it).
5. Match the voice sample: same warmth, contractions and level of formality. Without a sample, friendly, plain and direct.
6. List every fact you needed but did not have under Facts to confirm.
</task>

<constraints>
- Use only the facts given. Never invent prices, registrations, scheme memberships, insurance cover, guarantee lengths or certificate types; write [X] in the answer and add it to Facts to confirm.
- Do not state legal requirements (which work needs certification or approval) as fact; phrase as "we will tell you if your job needs..." and list what the owner should confirm for their country.
- No safety advice beyond simple, safe steps; for gas smells, sparking or flooding, tell customers to use the emergency service or supplier line for their area first.
- No superlatives or claims about competitors.
</constraints>

<output_format>
## FAQ
Group headings in bold, each question as a bold line, the answer below it. Ready to paste into a website.
## Facts to confirm
Bulleted [X] items with the question they belong to.
</output_format>
