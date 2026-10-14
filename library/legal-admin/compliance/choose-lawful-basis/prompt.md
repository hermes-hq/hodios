---
schema: 1
id: choose-lawful-basis
kind: prompt
title: Choose a lawful basis for each data use
description: Picks the GDPR-style lawful basis for each purpose you process personal data for, with reasons, extra conditions for sensitive data, and what each choice commits you to.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, product-manager, marketer]
subject: [law]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lawful-basis, consent, legitimate-interests, special-category-data, data-protection, record-of-processing]
pairs_with:
  prompts: [run-legitimate-interests-assessment, map-personal-data-processing, write-privacy-policy, check-email-marketing-compliance]
args:
  - name: purposes
    description: Each thing you do with personal data, as a separate line - for example processing orders, sending newsletters, product analytics, fraud checks, CCTV, staff payroll, health questionnaires - with whose data and which data.
    type: text
    required: true
  - name: organisation
    description: Who you are (business, charity, school, public body, employer) and how you relate to the people concerned. Optional.
    type: text
  - name: jurisdiction
    description: The law that applies, for example EU GDPR in a named member state or UK GDPR.
    type: string
    default: "EU GDPR"
output_contract:
  format: markdown
  sections: [Basis by purpose, Special category and criminal data, What each choice commits you to, Purposes to rethink, Record and notice wording, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an organisation choose a lawful basis for each purpose under the GDPR or a law modelled on it. There are six bases: consent, contract, legal obligation, vital interests, public task and legitimate interests. The basis is chosen per purpose, not per database or per person, it must be decided before the processing starts and recorded, and it cannot be swapped later because the first choice turns out to be inconvenient. Common mistakes: relying on consent where the person has no real choice (employees, or a service that cannot be used without agreeing), which makes the consent invalid; stretching "contract" to cover analytics, profiling or marketing that the service does not objectively need; using legitimate interests without doing the three-part test of purpose, necessity and balancing; and forgetting that some activities are governed by separate rules regardless of basis, such as email and text marketing and non-essential cookies under ePrivacy-type rules. Health, biometric, ethnicity, religion, sexual orientation, trade union and similar data also need a separate condition, and criminal offence data has its own rules. The choice matters afterwards: it decides which rights apply (for example objection under legitimate interests, portability under consent or contract) and what must be said in the privacy notice.

Law: {{jurisdiction}}
</context>

<task>
Purposes:
<purposes>
{{purposes}}
</purposes>
{{#organisation}}

Organisation:
<organisation>
{{organisation}}
</organisation>
{{/organisation}}

1. Basis by purpose: for each purpose, the recommended basis, a short reason, the runner-up and why it is weaker, and what would change the answer.
2. Special category and criminal data: for any purpose touching this data, the additional condition likely needed and any extra requirement such as a policy document, as commonly required under national law.
3. What each choice commits you to: the rights that apply, consent mechanics (granular, recorded, as easy to withdraw as to give), the legitimate interests assessment to keep, and any separate ePrivacy-type consent for marketing or cookies.
4. Purposes to rethink: purposes that look unnecessary, lack a defensible basis, or combine things that should be split.
5. Record and notice wording: a row for each purpose for the record of processing activities, and a plain-language line for the privacy notice.
6. Points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not default to consent. Recommend it only where people have a genuine, free choice and you can honour withdrawal.
- Do not invent article numbers or national law sections beyond those you are confident of; mark national rules "confirm for {{jurisdiction}}".
- If a purpose appears to be unlawful under any basis (for example covert monitoring or selling sensitive data without consent), say so plainly.
- Recommend a data protection officer or lawyer for public bodies, large-scale sensitive data, or children's data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Basis by purpose
Table: purpose | data | recommended basis | reason | runner-up | what would change it.

## Special category and criminal data
Table: purpose | data type | additional condition | extra requirement.

## What each choice commits you to
Bulleted list grouped by basis.

## Purposes to rethink
Bulleted list.

## Record and notice wording
Table: purpose | basis | record entry | notice line.

## Points to verify
Numbered list.
</output_format>
