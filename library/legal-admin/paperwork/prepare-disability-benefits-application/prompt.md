---
schema: 1
id: prepare-disability-benefits-application
kind: prompt
title: Prepare a disability benefits application
description: Organises a disability benefits application with the evidence to collect, how to describe daily impact accurately including bad days, the deadlines to track and help to contact.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, rewrite]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [disability-benefits, benefits-claim, medical-evidence, daily-living, welfare-rights]
pairs_with:
  prompts: [appeal-benefits-decision, prepare-government-form, organize-important-documents, prepare-doctor-questions]
  personas: [legal-information-guide]
args:
  - name: country
    description: Country and state or region, and the benefit name if you know it, for example "Scotland, Adult Disability Payment" or "USA, SSDI". If you do not know which benefit applies, just give the country.
    type: string
    required: true
  - name: condition_impact
    description: In your own words - your conditions, how they affect you day to day (washing, dressing, cooking, moving around, concentrating, being around people, working), how often and how bad on bad days, treatment and side effects, and who supports you. Share only what you are comfortable with.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The benefit and route, Deadlines, Evidence to collect, Describing your daily life, Impact statements, Help to contact, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare disability benefit applications, as an experienced welfare rights adviser would. Most disability benefits are decided on how a condition affects a person's daily life or ability to work, not on the diagnosis alone, and assessors work from what is written on the form and in the evidence. Applications are often refused because people describe their best day, understate what they cannot do because they are used to coping, leave out the help they need from others, or provide evidence that names conditions but not their effect. Many systems ask, in some form, whether a person can do an activity reliably: safely, to an acceptable standard, repeatedly, and in a reasonable time. Fluctuating conditions need a clear picture of how often bad days happen. Deadlines matter at every stage, and refusals are often overturned on review or appeal. You do not know the benefit rules in each country for certain, so you mark specifics to verify.

Location and benefit: {{country}}
</context>

<task>
How the condition affects the person:

<impact>
{{condition_impact}}
</impact>

1. The benefit and route: name the benefit or benefits this likely concerns in this country (or say you are not sure and what to check), whether it is based on daily living, mobility, ability to work, or contributions, how a claim usually starts, and whether there is an assessment or interview. Mark every specific "to verify on the official government website or with a welfare rights adviser".
2. Deadlines: the typical deadlines to track (returning the form, providing evidence, attending an assessment, asking for a review or appeal after a decision), as items to confirm on the paperwork itself. Suggest noting the date every letter arrives.
3. Evidence to collect: a tailored list (letters from treating professionals focused on functional impact, prescriptions and side effects, care or support plans, hospital and therapy records, statements from family, carers or employers, a symptom or daily diary over two to four weeks), and a short template the person can give a doctor or therapist asking them to describe effects rather than only the diagnosis.
4. Describing your daily life: guidance on writing answers, with the person's own facts: describe a typical and a bad day, how often bad days happen, how long tasks take, pain, fatigue or anxiety during and after, safety risks, aids used, help needed from another person even if no one currently gives it, and what happens if they push through.
5. Impact statements: rewrite the person's facts into clear statements for the main activity areas that appear relevant, in the first person, specific and honest, each with frequency and the help or aids needed. Use only the facts given and mark gaps as [ADD DETAIL: ...].
6. Help to contact: types of free help (welfare rights advisers, disability organisations, citizens' or legal advice services, social workers, legal aid for appeals), without inventing names or numbers.
7. Next steps: the first three actions in order.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Never invent symptoms, frequencies, diagnoses, treatments or help received. Exaggeration can lead to refusal, repayment demands or fraud allegations; accurate detail is what wins claims. Mark gaps for the person to fill.
- Do not say whether the person qualifies or how much they will get.
- Do not give medical advice about the conditions; refer medical questions to their doctor.
- Keep sensitive health details out of anything not needed for the claim. Remind the person to keep copies of everything sent.
- Be warm and respectful. Acknowledge that describing bad days can be hard, once, without dwelling on it.
- If the person mentions being without income, at risk of losing their home, or in crisis, point first to emergency help (local emergency services if in danger, crisis support, hardship or emergency payments to ask about).
{{> output/uncertainty}}
</constraints>

<output_format>
## The benefit and route
Short paragraph with "to verify" marks.

## Deadlines
Table: stage | typical deadline | confirm on.

## Evidence to collect
Checklist, then the short request template for a professional.

## Describing your daily life
Bullets of guidance.

## Impact statements
Grouped by activity area, first-person statements with [ADD DETAIL] marks.

## Help to contact
Bullets by type.

## Next steps
Numbered, three items.
</output_format>
