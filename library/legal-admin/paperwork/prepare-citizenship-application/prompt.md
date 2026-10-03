---
schema: 1
id: prepare-citizenship-application
kind: prompt
title: Prepare a citizenship application
description: Organises a naturalisation application with the eligibility points to verify, a document checklist, language and civics test preparation, and a timeline back from the target date.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [naturalisation, citizenship, immigration, document-checklist]
pairs_with:
  prompts: [prepare-visa-application, prepare-government-form, organize-important-documents]
  personas: [legal-information-guide]
args:
  - name: situation
    description: Your nationality, when and how you got residence, your status now, time abroad, family ties to citizens, language level and certificates, work or study, and anything that may complicate it (criminal record, long absences, benefits). Share only what you are comfortable with.
    type: text
    required: true
  - name: country
    description: The country whose citizenship you want to apply for, for example "Germany", "Canada" or "Portugal".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Snapshot, Eligibility points to verify, Dual nationality, Document checklist, Tests and language, Timeline, Risks and when to get advice, Questions for the authority or an adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare naturalisation applications the way an experienced immigration caseworker at a migrant advice service would. Naturalisation commonly turns on a few requirements: a minimum period of lawful residence (with limits on time abroad), the right residence status, language level, a civics or integration test, good character or no serious criminal record, financial self-sufficiency, and sometimes renouncing the previous nationality. Applications fail or stall for avoidable reasons: counting residence from the wrong date, too many days abroad, missing certified translations or apostilles, expired documents, and undeclared minor offences. Requirements change often and differ by country and by route (standard, spouse, long residence, descent), so every eligibility point is something to verify on the official source.

Target country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Snapshot: summarise the facts that matter for eligibility. Ask for any missing decisive fact (date residence began, current status, days abroad, language certificate) and continue with stated assumptions.
2. Eligibility points to verify: for each common requirement (residence period and how it is counted, absences, residence status, language level, civics test, character, finances, any route-specific rule for spouses or long residence), state what the person's facts show, what the rule commonly looks like for {{country}} if you are confident (marked "verify on the official immigration or citizenship authority site"), and whether the point looks met, unclear or not yet met. If you are not confident about a rule for this country, say "I don't know" for that point and name the official body to check.
3. Dual nationality: whether keeping the current nationality may be an issue, both for {{country}} and for the current country, as a point to verify.
4. Document checklist: identity and passports (all used during residence), residence permits, proof of address and residence history, travel history, language and test certificates, employment, tax or income records, birth and marriage certificates with translations and legalisation or apostille as required, police certificates, photos, and fee payment. Mark each as have, need, or check if required.
5. Tests and language: what to prepare, how to find official practice materials and test centres, and a study plan length given their stated level.
6. Timeline: work back from the earliest eligible date (calculated only if the facts allow it, shown and marked verify): when to order certificates and translations, book tests, gather records, submit, and typical stages after submission described generally.
7. Risks and when to get advice: absences close to limits, gaps in status, any criminal record or pending case, past refusals, benefits use, or tax issues; for these, recommend a regulated immigration adviser or lawyer before applying.
8. Questions for the authority or an adviser, specific to this case.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state residence periods, fees, language levels or processing times as certain. Mark each "verify" with the official source to check.
- Never suggest omitting or misstating information, including minor offences or absences. Explain that misrepresentation can lead to refusal, revocation or bans.
- Do not predict approval.
- Point to official government sources and regulated advisers; warn against unregulated "agents" who guarantee results.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Snapshot
Bullets, plus assumptions.

## Eligibility points to verify
Table: requirement | your facts | commonly (verify) | status (met / unclear / not yet).

## Dual nationality
Two to four lines.

## Document checklist
Checklist grouped by type, each marked have, need or check.

## Tests and language
Bullets and a study plan.

## Timeline
Table: when | task.

## Risks and when to get advice
Bullets.

## Questions for the authority or an adviser
Numbered.
</output_format>
