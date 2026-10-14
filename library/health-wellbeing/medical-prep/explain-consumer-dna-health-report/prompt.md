---
schema: 1
id: explain-consumer-dna-health-report
kind: prompt
title: Explain a consumer DNA health report
description: Explains a home DNA test's health results in plain language, what the variants and risk scores mean and do not mean, the test's limits, and when confirmatory clinical testing is worth asking about.
category: medical-prep
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
subject: [medicine, biology]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [genetic-testing, direct-to-consumer-test, genetic-risk, brca, apoe, plain-language-health]
pairs_with:
  prompts: [prepare-for-genetic-counselling, organize-family-medical-history, prepare-doctor-questions]
  personas: [health-navigator]
args:
  - name: results
    description: 'The health results as written in the report, for example "BRCA1/BRCA2 (selected variants): variant not detected", "APOE: one copy of e4", "Type 2 diabetes polygenic score: increased likelihood", "Carrier status: one variant for cystic fibrosis". Do not paste raw data files.'
    type: text
    required: true
  - name: family_history
    description: Relevant family history, for example "mum had breast cancer at 42, her sister ovarian cancer". Optional but important.
    type: text
  - name: worry
    description: What worries you most or what you want to decide. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this kind of test can and cannot do, Your results in plain language, What a negative result does not mean, When clinical testing is worth asking about, Questions for a doctor or genetic counsellor, Before you share these results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand health results from consumer (direct-to-consumer) DNA tests. Most of these tests use genotyping arrays that check selected positions in the genome, not full gene sequencing, so a cancer-gene report may cover only a handful of the thousands of known harmful variants (some BRCA reports cover only a few variants common in people of Ashkenazi Jewish ancestry). A "variant not detected" result therefore does not rule out an inherited risk, especially with a strong family history. Reports mix different kinds of results: single-gene variants with large effects (where a positive result should be confirmed by a clinical laboratory before any medical decision), carrier status (relevant mainly for having children), polygenic scores that add up many small effects and shift risk only modestly, and variants such as APOE e4 that raise risk without determining outcome. Relative risk ("twice as likely") is often confused with absolute risk; reference data are weaker for people of non-European ancestry; and third-party analysis of raw data files has a high rate of results that do not hold up in clinical testing. Genetic counsellors are the specialists for interpreting and deciding on clinical testing. Protection against genetic discrimination (for example in life or long-term care insurance) differs by country.

Results: {{results}}
{{#family_history}}Family history: {{family_history}}{{/family_history}}
{{#worry}}Worry or decision: {{worry}}{{/worry}}
</context>

<task>
1. What this kind of test can and cannot do: four or five plain sentences on arrays versus sequencing, selected variants, and the different types of result in their report.
2. Your results in plain language: a table with each result as written, its type (single-gene variant, carrier status, polygenic score, risk-modifying variant, or unclear), what it generally means, and what it does not mean. For risk statements, explain relative versus absolute risk and that lifestyle, family history and other genes matter.
3. What a negative result does not mean: explain why "not detected" is limited, tied to their specific results, and that family history still counts. If the family history they gave includes cancer at a young age, several relatives with the same or linked cancers, or a known family variant, say this is a reason to raise it with a doctor regardless of the consumer result.
4. When clinical testing is worth asking about: a positive result in a high-impact gene (confirm with a clinical lab before any decision), a strong family history, a known family variant, planning a pregnancy with a positive carrier result, or results that are causing real distress. Explain the usual route (family doctor referral to genetics, or a genetic counsellor) and to check how it works where they live.
5. Questions for a doctor or genetic counsellor: top three first, then the rest, tied to their results and family history.
6. Before you share these results: a short note that results can affect relatives, that relatives may not want to know, and that insurance and privacy protections vary by country and type of insurance, so check before sharing with insurers or uploading raw data to other services.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never tell them they have or will get a disease, calculate their personal risk, or suggest screening, medicine or surgery changes based on a consumer test.
- Do not analyse raw data files or individual variant identifiers beyond what the report states; explain why third-party raw-data interpretation is unreliable.
- Do not state discrimination laws as fact for their country.
- Be calm and proportionate: neither dismiss a concerning result nor amplify it. For APOE e4 or similar results, acknowledge the emotional weight once.
</constraints>

<output_format>
## What this kind of test can and cannot do
## Your results in plain language
Table: Result as written | Type | What it generally means | What it does not mean.
## What a negative result does not mean
## When clinical testing is worth asking about
## Questions for a doctor or genetic counsellor
Top 3, then the rest.
## Before you share these results
</output_format>
