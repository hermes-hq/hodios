---
schema: 1
id: build-rfp-answer-library
kind: prompt
title: Build an RFP answer library
description: Turns past RFP, tender and questionnaire responses into a reusable answer library with canonical answers, owners, evidence, review dates and tailoring notes, so each bid starts from approved text.
category: sales
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [sales-rep, operations-manager, founder, consultant]
requires: [none]
inputs: [document, text]
output: [table, docs, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rfp, bid-management, content-library, tenders, proposal-management]
pairs_with:
  prompts: [respond-to-rfp, answer-security-questionnaire, write-sales-proposal]
args:
  - name: past_answers
    description: Past RFP, tender or questionnaire questions and the answers you gave, pasted as text, ideally from several bids. Include the date and bid name of each if you have them.
    type: text
    required: true
  - name: context
    description: Your company and product in a few lines, who answers which topics (sales, product, security, legal, finance), and where the library will live (spreadsheet, document, bid tool). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Topic structure, Answer library, Conflicts and outdated answers, Gaps, Governance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build answer libraries for bid teams. Teams that answer RFPs without one rewrite the same answers each time, copy text from an old bid that is no longer true, and contradict themselves across bids, which evaluators and lawyers notice. Bid managers know a library only works if each answer has one approved canonical version, a named owner who keeps it true, evidence it can point to (a certificate, a policy, a customer figure with permission), a review date, and a note on how to tailor it. Answers about security, compliance, insurance, uptime and financials age fastest and carry the most risk if wrong. Most questions come back as variants of a much smaller set of core questions, so grouping variants under one canonical question is where the time saving comes from.
</context>

<task>
<past_answers>
{{past_answers}}
</past_answers>

{{#context}}<context_given>
{{context}}
</context_given>{{/context}}

1. **Topic structure:** propose topics and subtopics that fit the questions given (for example company, product, implementation, support and service levels, security, privacy, legal and commercial, sustainability, references) and an id scheme for answers.
2. **Answer library:** group every question with its variants under a canonical question. For each, write the canonical answer by merging the best of the past answers in plain, specific language, a short version (one to two sentences) and a long version where useful. Record the owner role, the evidence it relies on, the date of the newest source, and a tailoring note (what to change for each bid).
3. **Conflicts and outdated answers:** list where past answers contradict each other or contain time-sensitive claims (certifications, headcount, customer counts, uptime figures, prices, named customers) and say which version to keep or that the owner must decide.
4. **Gaps:** common questions in this kind of bid that the past answers do not cover yet, with the owner who should write them.
5. **Governance:** how to keep the library true (review cycle by topic, who approves changes, how bid writers request a new answer, how to retire answers), sized to the team.
</task>

<constraints>
- Build canonical answers only from the past answers given. Do not add capabilities, certifications, figures or customer names that are not in them.
- Where past answers disagree on a fact, do not pick one silently; list it under conflicts for the owner to decide.
- Flag any named customer or figure that may need permission or a refresh before reuse.
- If the input is only a handful of questions, still build the structure and say the library will grow with each bid.
</constraints>

<output_format>
## Topic structure
Nested list with the id scheme.

## Answer library
Table: Id | Canonical question | Variants | Short answer | Long answer | Owner | Evidence | Source date | Tailoring note.

## Conflicts and outdated answers
Table: Id | Issue | Versions found | Decision needed from.

## Gaps
Bullets: question, owner.

## Governance
Bullets.
</output_format>
