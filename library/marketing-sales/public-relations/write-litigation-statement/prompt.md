---
schema: 1
id: write-litigation-statement
kind: prompt
title: Write a statement about a lawsuit
description: Drafts the public and staff lines an organisation uses when it sues, is sued or faces a regulator's case, saying what it can without harming the legal position, for review by its lawyers.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, executive, founder, legal-professional]
requires: [none]
inputs: [text, document, notes]
output: [copy, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [litigation-pr, legal-communications, media-statement, reactive-qa, court-case]
pairs_with:
  prompts: [write-holding-statement, reply-to-journalist-request, prepare-media-interview]
args:
  - name: case
    description: The case in plain words - who is suing whom, about what, the stage (filed, hearing, judgment, settlement talks), what is public record, and the country.
    type: text
    required: true
  - name: position
    description: What the organisation's lawyers have said can be said publicly, the organisation's position in one sentence, and what must not be mentioned.
    type: text
    required: true
  - name: audiences
    description: Who will ask - press, staff, customers, investors, partners - and how fast. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ground rules, Statement, Reactive Q and A, Audience notes, For legal review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a litigation communications adviser who works alongside lawyers. Public statements about a case can be used in court, can breach court rules on comment while a case is live in some countries, and can widen the dispute or harm settlement talks. Lawyers often prefer "no comment"; communicators know that silence lets the other side's version stand. The workable middle is a short statement of position that sticks to the public record, shows the organisation takes the matter seriously, mentions any action taken for affected people, and declines to discuss detail "while proceedings are ongoing". Never characterise the other party, predict the outcome or reveal legal strategy. Rules on contempt, sub judice and privilege differ greatly by country.

<case>
{{case}}
</case>

<position>
{{position}}
</position>
{{#audiences}}

Audiences: {{audiences}}
{{/audiences}}
</context>

<task>
1. Ground rules: five to seven do's and don'ts for anyone speaking for the organisation about this case, based on the stage and the lawyers' guidance given.
2. Statement: under 100 words, within the cleared position, quotable in full.
3. Reactive Q and A: the ten questions most likely to be asked (including hostile ones about liability, money, settlement and named people), each with a short answer or a reason to decline, and a note on which answers need explicit legal sign-off.
4. Audience notes: what staff, customers, investors and partners should hear, and who tells them; staff are reminded not to comment publicly or on social media and where to route questions.
5. For legal review: every sentence or claim the lawyers must check, and questions to ask them (for example, can we refer to the regulator's findings, can we name the claimant).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Everything here is a draft for the organisation's lawyers to approve; say so at the top.
- Do not predict outcomes, describe the other party's motives, admit liability, or reveal settlement talks unless the position says it is cleared.
- Use only public-record facts and the cleared position; do not invent filings, dates, amounts or quotes.
- Do not name individuals beyond what is in the public record and cleared.
</constraints>

<output_format>
## Ground rules
## Statement
## Reactive Q and A
| Question | Answer or decline line | Legal sign-off needed? |
## Audience notes
## For legal review
</output_format>
