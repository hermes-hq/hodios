---
schema: 1
id: write-promotion-nomination
kind: prompt
title: Write a promotion nomination for your report
description: Writes a manager's promotion case for a direct report, with evidence mapped to the next level's expectations, sustained impact, honest gaps, peer input and answers to likely committee doubts.
category: people-management
version: 1.0.0
status: incubating
stage: [build]
role: [manager, engineering-manager, operations-manager, executive]
requires: [none]
inputs: [notes, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [promotion-nomination, promotion-committee, career-ladder, sponsorship, talent-review]
pairs_with:
  prompts: [build-career-ladder, run-calibration-session, write-performance-review, prepare-promotion-case]
  personas: [leadership-coach]
args:
  - name: evidence
    description: The person's work over the review period (projects, outcomes, scope, examples of behaviour, peer feedback), using initials, plus their self-assessment or brag document if you have it.
    type: text
    required: true
  - name: next_level
    description: The expectations for the level they are being nominated to, ideally copied from your career ladder, and the committee's format or word limit.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Readiness check, Nomination, Evidence map, Likely doubts, Gaps to address]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior manager who has sat on many promotion committees. Committees promote people who are already operating at the next level, consistently, with evidence. Nominations fail when they list tasks instead of impact, describe effort rather than outcomes, show one great project rather than a sustained pattern, use the language of the current level, hide gaps the committee will find anyway, or rely on adjectives ("rock star") that read as advocacy rather than evidence. Managers also write unevenly: confident, visible people get stronger cases than quieter ones with the same impact, which compounds bias. A strong nomination maps evidence to each next-level expectation, shows scope and influence, names gaps with a plan, and anticipates the committee's questions.

<evidence>
{{evidence}}
</evidence>

<next_level>
{{next_level}}
</next_level>
</context>

<task>
1. Readiness check: compare the evidence with each next-level expectation, and say honestly whether the case is strong, borderline or not yet ready. If not ready, say what is missing and stop short of writing a weak case; give the conversation to have with the person instead.
2. Nomination: a summary paragraph, then the case organised by the next level's dimensions, each with two or three specific examples showing situation, what the person did, scope and outcome, and why it is next-level rather than current-level work. Respect any word limit.
3. Evidence map: a table of each expectation against the evidence and how long it has been sustained.
4. Likely doubts: the three to five questions the committee will probably ask (for example is this sustained, how much was the team versus them, what about the missed deadline), with a factual answer for each.
5. Gaps to address: gaps the committee may raise and how they are being addressed, written honestly.
</task>

<constraints>
- Use only the evidence given; never invent projects, metrics or quotes. Mark missing evidence as [needs evidence].
- Replace adjectives with specific behaviour and outcomes.
- Do not mention personal circumstances (leave, health, family) except where the person has asked and it is relevant, for example to explain a period of absence fairly.
- Check the language for gendered or personality-based descriptions that are applied unevenly, such as "abrasive" or "helpful", and replace them with evidence.
</constraints>

<output_format>
## Readiness check
## Nomination
## Evidence map
Table: Next-level expectation | Evidence | Sustained since.
## Likely doubts
Table: Question | Answer.
## Gaps to address
</output_format>
