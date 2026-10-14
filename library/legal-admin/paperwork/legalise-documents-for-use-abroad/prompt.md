---
schema: 1
id: legalise-documents-for-use-abroad
kind: prompt
title: Legalise documents for use abroad
description: Works out what a foreign authority needs before it accepts your documents - apostille or consular legalisation, certified copies, sworn translation - and the right order to do it in.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, student, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [apostille, consular-legalisation, sworn-translation, certified-copies, documents-abroad]
pairs_with:
  prompts: [translate-personal-document, get-qualifications-recognised, prepare-visa-application]
args:
  - name: documents
    description: Each document, the country that issued it and the issuing body (for example "UK degree certificate from a university", "US FBI background check", "Brazilian birth certificate").
    type: text
    required: true
  - name: destination
    description: The country where the documents will be used, and the authority or purpose (visa, marriage, job, university, court).
    type: string
    required: true
  - name: deadline
    description: When you need everything ready. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Route per document, Order of steps, Translation, Timeline, Confirm with the receiving authority]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Before an authority accepts a foreign public document, it usually wants proof that the signature or seal is genuine. Between countries that are parties to the Hague Apostille Convention, that proof is an apostille issued by a designated authority in the country that issued the document. Where either country is not a party, or for some document types, the older chain applies: authentication in the issuing country, then legalisation by the destination country's embassy or consulate. Some countries and EU rules exempt certain public documents from any formality, sometimes with multilingual forms. The order matters and is a common cause of rejection: some documents (university degrees, private documents) need notarisation or certification first; the apostille goes on the original or on a certified copy depending on the issuing country's rules; and translation is usually done after the apostille so the apostille is translated too, by a sworn or certified translator recognised in the destination country. Receiving authorities also set freshness rules, such as documents issued within the last three or six months.

Destination: {{destination}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}
</context>

<task>
Documents:
<documents>
{{documents}}
</documents>

1. Route per document: for each, whether an apostille, consular legalisation chain, an exemption, or nothing is typically needed between the issuing country and {{destination}}, who usually issues it, whether it goes on the original or a certified copy, and any preliminary step (notarisation, certification by the issuing body). Mark each verify, and note where Convention membership or a bilateral arrangement must be checked.
2. Order of steps: one ordered list across all documents so nothing is done twice or in the wrong order, including freshness rules to check.
3. Translation: whether translation is needed, by whom (sworn, certified or court translator in the destination, or one accepted from abroad), whether to translate the apostille too, and whether a translation itself needs an apostille.
4. Timeline: work back from the deadline if given, with typical durations marked verify, and the riskiest step.
5. Confirm with the receiving authority: the exact questions to ask before paying for anything.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a country is or is not a party to the Apostille Convention, or that a document is exempt, as certain fact; say what is commonly the case and mark it verify on the official list.
- Never state fees or processing times as fact.
- Warn about unofficial apostille services that overcharge or cannot issue apostilles themselves, while noting legitimate agents exist.
- Never suggest altering, backdating or recreating a document.
{{> output/uncertainty}}
</constraints>

<output_format>
## Route per document
Table: document | issuing country | route | issuer | original or copy | first step | verify.

## Order of steps
Numbered.

## Translation
Bullets.

## Timeline
Table or dated list, or "No deadline given".

## Confirm with the receiving authority
Numbered questions.
</output_format>
