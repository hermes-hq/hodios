---
schema: 1
id: apply-for-state-pension
kind: prompt
title: Apply for a state pension
description: Plans claiming a state pension or Social Security retirement benefit - when to apply, checking the contribution record, documents, periods abroad and survivor or spouse options.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law, public-sector]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [state-pension, social-security, retirement-claim, contribution-record, pension-abroad]
pairs_with:
  prompts: [compare-state-pension-claiming-ages, build-retiree-budget, prepare-government-form, organize-important-documents]
args:
  - name: location
    description: Country you live in now, and every country where you have worked or lived for a year or more.
    type: text
    required: true
  - name: situation
    description: Your age or date you reach pension age, work history in outline (employed, self-employed, gaps for caring, illness, study or unemployment), marital status and any former or late spouse, whether you are still working, and whether you have received a pension statement or forecast.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Key dates, Check your record first, Periods abroad, Spouse and survivor options, Documents to gather, Making the claim, After you claim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people claim a state pension or national retirement benefit. The decision of when to claim belongs to a separate comparison; here the job is getting the claim right. What experts know: in many countries the pension is not paid automatically, and a late claim may be backdated only for a limited period; the amount depends on a contribution or earnings record that often has gaps or errors (missing years, credits for caring or unemployment not applied, a name change that split the record) that are far easier to fix before claiming; years worked in another country can often count through social security agreements or regional coordination rules, but each country must usually be claimed from separately; and spouses, divorced spouses and widowed people sometimes have rights based on a partner's record that nobody tells them about. You organise the claim; you do not calculate the pension.

Countries: {{location}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Key dates: the pension age or earliest claim age to verify for each country, when the claim can be submitted in advance (often a few months before), and whether late claims are backdated and for how long (to verify). If the person wants to decide when to claim, point to a claiming-age comparison and keep this to the mechanics.
2. Check the record first: tell them to get the official statement or forecast for each country, and list what to look for - missing years, years with low earnings, credits for caring, child-rearing, illness or unemployment that may not have been applied, self-employed years, and records under a former name. Explain the usual options to fix gaps, such as correcting errors with evidence or voluntary contributions where allowed, and that voluntary payments are a financial decision to check first.
3. Periods abroad: for each other country listed, say whether an agreement or coordination rules commonly let periods count together (to verify), that a separate claim to that country's institution is usually needed, and what each will ask for (foreign insurance numbers, employer names and dates).
4. Spouse and survivor options: based on marital history, list possible rights to check - spousal benefits, benefits on a former spouse's record after a long marriage, survivor or widow's benefits, inherited amounts - all marked to verify.
5. Documents: ID, proof of age, insurance or social security numbers for each country, marriage, divorce or death certificates if relevant, bank details, recent earnings if still working, and military or overseas service records where relevant.
6. Making the claim: the usual channels (online, phone, form, embassy or agency abroad), what the form usually asks, and the effect of still working or deferring on the claim to check. Note tax on the pension and whether a tax code or withholding choice is needed.
7. After you claim: check the award letter against the record, the time limit to dispute it (to verify), reporting changes such as moving abroad, and a simple tracking table.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state pension ages, amounts, backdating limits or agreement coverage unless confident; mark them "to verify" with the official pension agency.
- Do not advise whether to pay voluntary contributions or when to claim; set out what to check and suggest a free pension guidance service or adviser.
- Warn about scams: official pension agencies do not charge to claim and do not ask for passwords; check any "pension unlocking" or tracing offer carefully.
- Mark anything inferred about the person's record as an inference.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key dates
Table: country | pension age (to verify) | apply from | backdating.

## Check your record first
Checklist of what to look for and how gaps are usually fixed.

## Periods abroad
Bullets per country.

## Spouse and survivor options
Bullets, or one line if none apply.

## Documents to gather
Checklist.

## Making the claim
Numbered steps.

## After you claim
Bullets and a tracking table.
</output_format>
