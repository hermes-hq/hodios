---
schema: 1
id: run-legitimate-interests-assessment
kind: prompt
title: Run a legitimate interests assessment
description: Works through the three-part purpose, necessity and balancing test for relying on legitimate interests to process personal data, records the reasoning and names the safeguards that tip the balance.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, legal-professional, marketer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [report, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [legitimate-interests, lawful-basis, balancing-test, data-protection, gdpr-records]
pairs_with:
  prompts: [map-personal-data-processing, draft-dpia, check-email-marketing-compliance, write-privacy-policy]
  personas: [compliance-officer]
args:
  - name: processing
    description: The processing you want to rely on legitimate interests for - what personal data, about whom, from where, for what purpose, who sees it, how long it is kept, and whether people would expect it.
    type: text
    required: true
  - name: context
    description: The organisation, its relationship with the people (customers, prospects, staff, website visitors), the country, and any alternatives you considered. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is legitimate interests the right basis, Purpose test, Necessity test, Balancing test, Safeguards, Decision and record, Review triggers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation decide whether it can rely on legitimate interests as the lawful basis for processing personal data under GDPR-style laws, and document that decision. The assessment has three parts that regulators look for: a purpose test (is there a real, specific, lawful interest, the organisation's or a third party's?), a necessity test (is the processing actually needed for that interest, or is there a less intrusive way?), and a balancing test (do the individuals' interests, rights and reasonable expectations override it, considering the nature of the data, the relationship, vulnerability such as children, and the likely impact?). Common mistakes: stating "business purposes" as the interest, skipping the less-intrusive alternative, ignoring that people would be surprised, using legitimate interests where consent is legally required (some electronic marketing, cookies, special category data), and failing to tell people and offer an easy objection. A written assessment is the evidence an organisation needs if challenged.
</context>

<task>
Processing:

<processing>
{{processing}}
</processing>
{{#context}}

Context:
<context_info>
{{context}}
</context_info>
{{/context}}

1. Check first whether legitimate interests is a possible basis at all: flag if the processing involves special category or criminal offence data, children, electronic marketing or cookies where consent rules may apply, or if another basis (contract, legal obligation) fits better. Say what to verify.
2. Purpose test: state the interest specifically, whose it is, the benefit, and whether it is lawful and ethical.
3. Necessity test: explain how the processing achieves the purpose and list less intrusive alternatives (less data, aggregation, shorter retention, pseudonymisation), with whether each would work.
4. Balancing test: the nature of the data, the relationship, reasonable expectations (would people expect this from the privacy notice and context?), possible impacts (financial, reputational, loss of control, discrimination, distress), vulnerable groups, and scale. Give a reasoned conclusion, not just a list.
5. Safeguards: concrete measures that reduce impact (transparency wording, easy opt-out or objection route, minimisation, access controls, retention limits).
6. Decision and record: proceed, proceed with safeguards, or use another basis or stop, with a one-paragraph record suitable for the processing register and the privacy notice wording to add.
7. Review triggers: changes that should prompt a re-assessment.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the organisation's facts. Where facts are missing, state the assumption and mark it.
- Do not cite article numbers, regulator guidance titles or case names unless the user supplied them. Refer to the law generally and mark it "verify".
- Do not reach a "pass" by ignoring an identified impact; if the balance is close or negative, say so.
- Recommend a data protection professional for large-scale, novel or sensitive processing, children's data, or tracking and profiling, and note that a DPIA may also be needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is legitimate interests the right basis
Bullets with flags.

## Purpose test
Short paragraph.

## Necessity test
Table: alternative | would it work | why.

## Balancing test
Factors and a reasoned conclusion.

## Safeguards
Bullets.

## Decision and record
Decision, register record, privacy notice wording.

## Review triggers
Bullets.
</output_format>
