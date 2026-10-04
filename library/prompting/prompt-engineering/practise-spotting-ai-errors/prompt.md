---
schema: 1
id: practise-spotting-ai-errors
kind: prompt
title: Practise spotting AI errors
description: "Trains AI literacy with rounds of assistant-style answers containing planted errors, such as invented citations, wrong maths or outdated facts, and coaches the user to catch and verify them."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, teacher]
requires: [none]
inputs: [topic]
output: [quiz, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [ai-literacy, hallucinations, checking-citations, lateral-reading, misinformation]
pairs_with:
  prompts: [audit-ai-answer-for-errors, learn-prompting-basics]
  personas: [ai-literacy-coach]
args:
  - name: rounds
    description: Number of rounds in the session.
    type: number
    default: 6
  - name: domain
    description: "The subject area the answers come from, for example 'general', 'history', 'personal finance basics', 'biology for 14-year-olds', or the user's own field."
    type: string
    default: general
  - name: level
    description: "beginner: one clear error per answer and hints on request. intermediate: subtler errors, up to two per answer, mixed with claims that are true but unverifiable."
    type: enum
    enum: [beginner, intermediate]
    default: beginner
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI assistants fail in recognisable ways: citations and quotes that do not exist, statistics with false precision, arithmetic slips, facts that were true years ago, confident overgeneralisations, a plausible feature or law that is not real, a correct fact attributed to the wrong person or date, a missing caveat that changes the advice, and a logical leap from evidence to conclusion. People get better at catching these with practice, especially when each catch is paired with a verification habit: open the cited source and check it says that, search for the exact title, recompute the numbers, check the date of the information, read what other sources say about the claim (lateral reading), and ask what would have to be true.

Session: {{rounds}} rounds, domain "{{domain}}", level {{level}}.
</context>

<task>
1. In your first message, explain the game in three or four sentences: you will show short answers of the kind an AI assistant might give, some containing planted errors and some clean; the user says what they think is wrong and how they would check it; you reveal and score. Then start round 1 in the same message.
2. Plan privately: spread the rounds across different error types and include at least one clean answer (no planted error) per six rounds, so the user cannot assume every answer is wrong.
3. Each round, show:
   - a realistic question someone might ask in the domain;
   - an assistant-style answer of about one short paragraph, written in the confident tone assistants use, containing the planted errors for the level (one clear one at beginner; up to two subtle ones at intermediate, mixed with claims that are true but would need checking);
   - the prompt "What, if anything, is wrong here, and how would you check it?"
   Then stop and wait for the user's answer. At beginner level, give a hint only if the user asks.
4. After the user answers, reveal: each planted error, quoted, with the correct information, the error type, and the specific verification move that would catch it. Credit what the user caught, including real problems you did not plant, and say so if they flagged something that was actually correct. Give the round score, then present the next round in the same message.
5. After the last round, give the summary.
</task>

<constraints>
- Plant only errors where you are confident of the correct fact. For "outdated" errors, use changes that are long settled (for example Pluto's reclassification in 2006), not recent events your knowledge may not cover.
- Invented citations, studies and quotes must be fictional and clearly labelled as invented at the reveal; never attribute a fabricated quote or false damaging claim to a real living person or real organisation.
- Every planted error is corrected at the reveal; no false claim is left standing at the end of the session.
- In health, legal or money domains, keep the planted errors educational, correct them clearly, and never let a dangerous instruction stand even briefly unmarked: choose errors such as a wrong date or a missing caveat over a harmful dose or instruction.
- Show one round per message and wait for the user. If the user says "stop", go straight to the summary.
- Keep each answer short enough to check in a minute or two.
</constraints>

<output_format>
Each round: a "Round k of {{rounds}}" heading, the question, the assistant-style answer in a quote block, and the prompt to respond.

Each reveal: Planted errors (quote, correction, type, how to check), what the user caught, round score.

At the end:
**Score:** caught x of y planted errors; false alarms z.
A table: Error type | Seen | Caught.
**Habits to keep:** three verification habits, matched to the error types the user missed most.
</output_format>
