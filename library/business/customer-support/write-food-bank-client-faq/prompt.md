---
schema: 1
id: write-food-bank-client-faq
kind: prompt
title: Write a food bank client FAQ
description: Writes a plain-language, stigma-free FAQ for people using a food bank, pantry or community fridge - referral, what to bring, dietary and cultural needs, privacy and other help nearby.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, writer]
subject: [nonprofit]
requires: [none]
inputs: [text, notes]
output: [docs, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [food-bank, plain-language, dignity, community-pantry, faq]
pairs_with:
  prompts: [write-help-center-article, design-accessible-customer-service]
args:
  - name: organisation_details
    description: How your service works - name, opening times and places, referral or self-referral, how often people can come, what a parcel or visit includes, delivery for people who cannot travel, dietary options, what personal details you record and why, and partner services you signpost to.
    type: text
    required: true
  - name: languages
    description: Optional. Languages your visitors speak, so the FAQ can be written for easy translation and flag what a translator must check.
    type: text
output_contract:
  format: markdown
  sections: [FAQ, Short version for posters, Translation notes, Facts to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write for people who are about to use a food bank, pantry or community fridge, often for the first time. Many arrive anxious, ashamed or exhausted, some read English as a second language, and some have low literacy. The questions they most want answered are practical ("Do I need a referral?", "What do I bring?", "Will anyone judge me?", "Can I get halal food?") and the worst FAQs bury those under mission statements, use charity jargon ("beneficiaries", "service users", "eligibility criteria") or hint at suspicion. Good ones are short, warm, specific and honest about limits.
</context>

<task>
<organisation_details>
{{organisation_details}}
</organisation_details>

{{#languages}}
Visitor languages: {{languages}}
{{/languages}}

1. Write 10-15 questions in the visitor's own words, in the order they ask them: Can I come? Do I need a referral and how do I get one? When and where? What do I bring? What happens when I arrive? What will I get? Can you meet my diet, religion or allergy? I have no kitchen, or no way to cook. Can I send someone else, or get a delivery? How often can I come? What do you write down about me and who sees it? Can you help with more than food? What if I need help today and you are closed?
2. Answers: 1-4 short sentences each, "you" and "we", about a 9-11 year old reading level, one idea per sentence, no idioms. Say what people do not need to bring or prove as well as what they do.
3. Dignity: no words that imply blame or suspicion, no "deserving", and a line that everyone is welcome to ask for help without explaining why. Mention that volunteers keep what people share private.
4. Dietary and cultural needs: name the options the organisation actually has (for example halal, kosher, vegetarian, gluten-free, baby food and nappies, kettle or no-cook packs, toiletries and period products) and say honestly what is not always available.
5. Privacy: say what is recorded, why, how long it is kept and who sees it, in plain words, only from the details given.
6. Write a poster version: the five most important answers in under 60 words.
7. If languages are given, add translation notes: terms to keep consistent, phrases that do not translate literally, and a reminder to have a fluent speaker from the community check it rather than relying on machine translation alone.
</task>

<constraints>
- Use only the facts given. Never invent opening times, addresses, phone numbers, eligibility rules or partner services; put [CHECK: ...] where something is needed and list it under Facts to confirm.
- Do not include benefit or legal advice; signpost to the partner services named, or write "[CHECK: local advice service]".
- For "I need help today", point to the organisation's stated emergency options and to local emergency services if someone is in danger; never write a phone number that was not given.
- No exclamation marks, no religious or political messaging unless the organisation is faith-based and asks for it, and even then the FAQ must say help is for everyone.
</constraints>

<output_format>
## FAQ
Each question as a bold line, then the answer.

## Short version for posters
Five lines, under 60 words in total.

## Translation notes
Bullets, or "None requested".

## Facts to confirm
Bullets of every [CHECK] item.
</output_format>
