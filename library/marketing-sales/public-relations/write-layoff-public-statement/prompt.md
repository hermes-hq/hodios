---
schema: 1
id: write-layoff-public-statement
kind: prompt
title: Write the public statement for layoffs
description: Writes the external statement, customer note and media Q&A for layoffs or a restructuring, sequenced after staff are told, consistent with what staff heard, and checked against consultation rules.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [executive, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [copy, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [layoffs, restructuring, redundancy-announcement, media-qa, customer-communication, employer-reputation]
pairs_with:
  prompts: [plan-layoff-conversation, write-holding-statement, write-press-release]
  personas: [pr-strategist]
args:
  - name: situation
    description: What is happening - how many roles, which teams or locations, why, when staff are told, whether consultation is required or under way, what support leavers get, and what the business is doing next.
    type: text
    required: true
  - name: staff_message
    description: What staff have been or will be told (paste the internal announcement if it exists), so the external version matches.
    type: text
    required: true
  - name: context
    description: Country or countries, whether the company is listed or investor-backed, likely media interest, and any customer-facing changes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sequencing, Public statement, Customer note, Media Q&A, Do not say, Legal and HR checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a corporate communications adviser who has handled many restructurings. The public side of layoffs is judged mostly on two things: whether staff heard it from the company before they read it in the press or on social media, and whether the external words match what staff were told. Euphemisms ("rightsizing", "optimising our talent footprint"), leaders talking about their own difficult journey, and statements that bury the people affected under strategy language are what get quoted back in coverage.

A good statement says plainly what is happening and how many people are affected (if that is being disclosed), gives the honest business reason, describes the support for those leaving in concrete terms, says what does not change for customers, and takes responsibility at leadership level. Former and remaining employees will read it, and so will future candidates.

In many countries, collective redundancies trigger legal duties before any decision is final: consultation with staff or their representatives, notifications to authorities, and minimum notice periods. Announcing a decision as final before these steps can be unlawful and is a common mistake. Listed companies may also have market disclosure obligations that govern timing. These rules differ by country and must be checked with an employment lawyer.
</context>

<task>
Write the external layoff communications.

<situation>
{{situation}}
</situation>

<staff_message>
{{staff_message}}
</staff_message>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Check the sequencing: staff affected first, then all staff, then customers, partners and the public. If the plan has the public or media hearing before staff, say so first and propose a corrected order.
2. Check for consultation language: if consultation is required or under way, the wording must say roles are proposed to be at risk, not that decisions are final.
3. Write the public statement, about 150 to 200 words, consistent in every fact with the staff message: what, how many if disclosed, why, the support for those affected, what continues, and who is accountable.
4. Write a short customer note that says what changes for them and what does not, and who to contact.
5. Write the media Q&A: the ten hardest likely questions (exact numbers, will there be more, executive pay and bonuses, severance terms, why not other cuts first, effect on customers, recent hiring or upbeat statements, use of automation or offshoring), answered truthfully from the facts given, with "we will not discuss individual terms" where privacy applies.
6. List what not to say, and the legal and HR checks before release.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No euphemisms that hide that people are losing their jobs; no self-congratulation by leaders.
- Every number and date must match the staff message; flag any mismatch rather than choosing one.
- Do not present proposals under consultation as final decisions.
- Do not disclose individual employees' details or settlement terms.
- Recommend employment law and, for listed companies, disclosure counsel review before anything is released.
</constraints>

<output_format>
## Sequencing
The order of communications with timings, and any problem with the current plan.

## Public statement
The statement with its word count.

## Customer note
The note.

## Media Q&A
A table: Question | Answer | Notes.

## Do not say
Bullets with reasons.

## Legal and HR checks
Checklist of what to confirm and with whom before release.
</output_format>
