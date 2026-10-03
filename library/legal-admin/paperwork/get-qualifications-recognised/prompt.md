---
schema: 1
id: get-qualifications-recognised
kind: prompt
title: Get qualifications recognised abroad
description: "Plans getting a degree, trade certificate or professional licence recognised in a new country: the deciding body, documents, translations and apostilles, costs, timelines and partial recognition."
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [qualification-recognition, regulated-professions, apostille, certified-translation, credential-evaluation, newcomers]
pairs_with:
  prompts: [translate-personal-document, convert-cv-to-country-format, prepare-government-form]
  workflows: [newcomer-first-month-track]
args:
  - name: qualification
    description: The qualification and what you want to do with it, for example "Bachelor of Nursing, 4 years, plus 6 years as a registered nurse; want to work as a nurse" or "Electrician trade certificate".
    type: text
    required: true
  - name: from_country
    description: Country where the qualification was awarded (and where any licence was issued, if different).
    type: string
    required: true
  - name: to_country
    description: Country where you want it recognised, and the region if the profession is regulated regionally.
    type: string
    required: true
  - name: profession_regulated
    description: Whether you already know the profession is regulated in the new country (you need permission to practise, not just to be hired).
    type: enum
    enum: ["yes", "no", unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Your route, Who decides, Document pack, Translation and authentication, Timeline and costs, If recognition is partial or refused, Working while you wait, Questions to ask the body]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recognition is two different processes that people mix up. For a regulated profession (often medicine, nursing, teaching, law, engineering titles, electricians, childcare, many trades), a competent authority must authorise you before you may practise or use the title, and it may set conditions such as a language test, an adaptation period, an aptitude exam or supervised practice. For an unregulated job, recognition is usually optional: a comparability statement from the national academic recognition centre or a credential evaluation service helps employers understand the degree but does not license anything. Academic recognition (for further study) is different again. Choosing the wrong route wastes months and fees.

Qualification: {{qualification}}
Awarded in: {{from_country}}
Recognition wanted in: {{to_country}}
Profession regulated, as the person understands it: {{profession_regulated}}
</context>

<task>
1. If the qualification description lacks what decides the route (the exact title, length of study, whether they hold a licence to practise in {{from_country}}, years of experience, and the job they want), ask for the missing items in a short "Need from you" list, then continue with the gaps marked [BRACKETS].
2. Decide the likely route and say how confident you are: regulated profession needing authorisation, unregulated job where a comparability statement helps, academic recognition for study, or a trade route that may involve a skills assessment. If {{profession_regulated}} is unsure, explain how to find out (the national database or contact point for regulated professions, the professional body, or the labour ministry), as items to verify.
3. Who decides: name the kind of body (competent authority for the profession, often regional; national academic recognition centre; chamber of trades; credential evaluator). Name a specific organisation only if you are confident it exists and holds that role, and still mark it verify.
4. Document pack: diplomas, transcripts with subjects and hours, course syllabi, proof of licence and a certificate of good standing from the {{from_country}} regulator, proof of professional experience with duties and hours, ID, and name-change evidence if names differ. Say which ones are hard to obtain later from abroad and should be requested now.
5. Translation and authentication: certified or sworn translation (who may do it in {{to_country}}, verify), apostille under the Hague Convention if both countries are parties, otherwise consular legalisation; originals versus certified copies.
6. Timeline and costs as typical ranges marked verify, with the steps that take longest.
7. Partial recognition or refusal: compensation measures, bridging courses, appeals and their deadlines (verify), and when to get help from a migrant career service or a lawyer.
8. Working while waiting: related roles that do not need the protected title, and the risk of using a protected title too early.
9. Before writing, check that the route matches the facts given and that no fee, deadline or body is stated as certain.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state fees, processing times, language levels or exam formats as current fact; mark them "typical, verify with the deciding body".
- Do not guarantee recognition or predict the decision.
- Never suggest presenting a qualification as equivalent before a decision, using a protected title without authorisation, or altering documents.
- Recommend free help where it often exists (public recognition advice services, migrant career centres, unions or professional associations) as something to check locally.
{{> output/uncertainty}}
</constraints>

<output_format>
Only if decisive facts are missing, start with "Need from you".

## Your route
One paragraph: which process, why, and confidence.

## Who decides
Bullets: the body type, what it decides, how to identify the right one.

## Document pack
Table: Document | Get it from | Hard to get later? | Translation | Apostille or legalisation | Status.

## Translation and authentication
Bullets.

## Timeline and costs
Table: Stage | Typical time (verify) | Typical cost (verify).

## If recognition is partial or refused
Bullets.

## Working while you wait
Bullets.

## Questions to ask the body
Numbered.
</output_format>
