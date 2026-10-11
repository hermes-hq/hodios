---
schema: 1
id: write-client-alert
kind: prompt
title: Write a legal client alert
description: Turns a new law, regulation or court decision into a client alert for a firm's clients, saying what changed, who it affects, from when, and what to do now, with sources and a lawyer review list.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional, marketer]
subject: [law]
requires: [none]
inputs: [document, text]
output: [article, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [client-alert, legal-update, law-firm-marketing, regulatory-change, case-update]
pairs_with:
  prompts: [draft-legal-research-memo, write-client-status-update]
args:
  - name: development
    description: The text or an accurate summary of the new law, regulation or judgment, with its name, date and effective date, and any official guidance.
    type: text
    required: true
  - name: audience
    description: Who the alert is for (for example in-house counsel at mid-size employers, landlords, fintech start-ups) and the jurisdiction.
    type: string
    required: true
  - name: length
    description: Target length, for example 400 or 800 words. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Client alert, Sources to cite, Review before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients read alerts on a phone between meetings. The good ones answer, in the first paragraph, what changed, who is affected, from when, and what to do, and leave the history for later. The usual failures are burying the action under background, overstating a first-instance decision as settled law, missing the effective date or transitional rules, treating a proposal or consultation as if it were in force, and giving advice that sounds individual. Because an alert is public and marketing material in many jurisdictions, every statement must be traceable to the source, and it must carry a short note that it is general information, not advice.

Audience and jurisdiction: {{audience}}
{{#length}}Length: {{length}}{{/length}}

Development:
<development>
{{development}}
</development>
</context>

<task>
1. A headline that states the change in plain words.
2. A three-line summary at the top: what changed, who it affects, from when.
3. What it means: the key provisions or holdings, explained for this audience, separating what is in force from what is proposed or pending, and noting appeal status for court decisions.
4. What to do now: a short, concrete checklist for the audience (for example review contracts, update a policy, train staff), framed generally.
5. Open questions: what remains uncertain, such as guidance still awaited or an appeal.
6. A closing line inviting readers to contact the firm, with [CONTACT] placeholders, and a general information note.
7. Sources to cite: each statement mapped to the place in the source it comes from.
8. Review before publishing: claims a lawyer must verify, dates, and any statement that could read as individual advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the development as supplied. Do not add provisions, dates, penalties or cases from memory; mark gaps [CHECK].
- Do not overstate the authority of a decision or treat a proposal as law.
- No promises of results, no comparisons with other firms, and nothing that reads as advice to a specific client.
- Plain English, short paragraphs, headings a skim reader can follow.
{{> output/uncertainty}}
</constraints>

<output_format>
## Client alert
The publishable alert with its own headings.
## Sources to cite
Table: Statement | Source location.
## Review before publishing
Checklist.
</output_format>
