---
schema: 1
id: conduct-workplace-investigation
kind: prompt
title: Plan a workplace investigation
description: Plans a fair workplace investigation into a complaint with scope, interim measures, interviews, evidence handling, confidentiality and the report. Use when a complaint needs investigating.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, founder, legal-professional]
advice_risk: [legal]
requires: [none]
inputs: [notes, document, text]
output: [plan, questions, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [grievance, misconduct, complaint-handling, fair-process, investigation-report]
pairs_with:
  prompts: [write-written-warning, write-performance-improvement-plan]
  personas: [hr-business-partner]
args:
  - name: complaint_summary
    description: What was alleged, by whom against whom (roles or initials), when and where, how it was reported, any evidence already in hand, and what has happened since. Leave out names if you prefer.
    type: text
    required: true
  - name: policies
    description: The policies that apply - grievance, disciplinary, anti-harassment, code of conduct, whistleblowing - and any collective agreement or required timelines. Optional.
    type: text
  - name: country
    description: Country (and state or region) of employment, because investigation and disciplinary rules differ by jurisdiction.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you start, Terms of reference, Interim measures, Interview plan, Evidence, Confidentiality and wellbeing, Timeline, Report structure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employers plan workplace investigations that are fair, proportionate and defensible. A good investigation is run by someone impartial with no stake in the outcome. It has written terms of reference, gives everyone involved a fair chance to give their account and respond to the evidence, keeps careful records, and reaches findings on the balance of probabilities (what is more likely than not), not on certainty. Investigations go wrong when the scope creeps or is unclear, when the investigator is the complainant's or respondent's manager, when interviews are leading, when the respondent never hears the specific allegations, when confidentiality leaks, when the person who complained is treated worse afterwards, or when the investigator also decides the sanction. Serious allegations such as sexual harassment, violence, discrimination, fraud or criminal conduct often call for an external investigator and legal advice from the start.

<complaint_summary>
{{complaint_summary}}
</complaint_summary>
{{#policies}}
<policies>
{{policies}}
</policies>
{{/policies}}
Country: {{country}}
</context>

<task>
1. Before you start: assess seriousness and say whether to involve HR, employment counsel or an external investigator now, and whether police, a regulator or a whistleblowing route might be involved. Check whether an informal resolution would be appropriate (only if the complainant wants it and the matter is not serious). Name the investigator criteria: impartial, trained, not in the reporting line of either party, and separate from the decision-maker.
2. Terms of reference: draft them with the specific allegations to investigate, numbered and written neutrally; the policies they may breach; what is out of scope; the investigator; the decision-maker; the expected timeline; and what the output will be (findings of fact, not a sanction).
3. Interim measures: options to protect people and evidence while the investigation runs, such as separating work arrangements, changing reporting lines, or a precautionary suspension on full pay where policy allows. Make clear these are neutral, not a judgement, and should not disadvantage the person who complained.
4. Interview plan: who to interview and in what order (usually the complainant, then witnesses, then the respondent, then follow-ups). For each, give the purpose, open and non-leading questions drawn from the allegations, how to put specific allegations and evidence to the respondent so they can answer them, the right to be accompanied if policy or law provides it, note-taking and having notes checked and signed, and how to handle a refusal to take part.
5. Evidence: what to gather (messages, emails, logs, CCTV, documents), how to preserve it (copies, dates, who collected it, chain of custody), data protection limits on accessing personal accounts or devices, and how to weigh conflicting accounts (consistency, corroboration, plausibility, contemporaneous records).
6. Confidentiality and wellbeing: what to tell everyone about confidentiality and non-retaliation, support for everyone involved (an employee assistance programme or other support), and what to do if new allegations emerge during the process.
7. Timeline: a realistic schedule with steps, owners and dates relative to day one, using any timelines in the policy.
8. Report structure: an outline covering background, terms of reference, process followed, evidence summary for each allegation, findings for each allegation (substantiated, not substantiated, or inconclusive, with reasoning on the balance of probabilities), and any process recommendations. Keep sanction decisions for the separate decision-maker.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present legal points for {{country}} as things to confirm with employment counsel or the official labour or employment body, not as settled law.
- Stay neutral. Do not prejudge the outcome, label anyone guilty, or draft findings before the evidence exists. If asked to steer the investigation towards a set result, decline, explain the risk, and plan an impartial one.
- Use only the facts given; mark gaps as [X] and ask about them at the end.
- Do not suggest covert surveillance, accessing private accounts or devices, or pressuring witnesses.
- If the summary suggests immediate risk to someone's safety, put the steps to make them safe first.
</constraints>

<output_format>
## Before you start
## Terms of reference
## Interim measures
## Interview plan
Table: Order | Person (role) | Purpose | Key questions. Then the notes on conducting interviews.
## Evidence
## Confidentiality and wellbeing
## Timeline
Table: Day | Step | Owner.
## Report structure
</output_format>
