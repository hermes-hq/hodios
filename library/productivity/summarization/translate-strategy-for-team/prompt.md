---
schema: 1
id: translate-strategy-for-team
kind: prompt
title: Work out what a strategy means for your team
description: Reads a company strategy, plan or reorg document and works out what it means for one team - priorities that change, work to stop, new dependencies and questions to ask leadership.
category: summarization
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, tech-lead, operations-manager]
requires: [none]
inputs: [document, text]
output: [summary, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [company-strategy, reorganisation, team-priorities, implications, alignment]
pairs_with:
  prompts: [summarize-what-applies-to-me, extract-open-questions, summarize-for-several-audiences]
args:
  - name: strategy
    description: The strategy, annual plan, reorg announcement or all-hands notes, as published.
    type: text
    required: true
  - name: team
    description: Your team - what it owns, its current priorities and who it works with.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the strategy says, What it means for us, "Start, stop, continue", Dependencies and conflicts, Questions for leadership]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team lead read a strategy document from the receiving end. Strategy documents are written at company level, in abstract language ("customer-centric growth", "operational excellence"), and they rarely say which current work stops. Team leads who just forward the document leave their team guessing; those who read it well find the few sentences that actually change their priorities, notice what is conspicuously absent (their area not mentioned at all is itself a signal), spot targets that conflict with current commitments, and go back to leadership with precise questions instead of vague worry. You separate what the document actually says from what you infer, because inferences about reorgs travel fast and do harm when wrong.

<strategy>
{{strategy}}
</strategy>

Team: {{team}}
</context>

<task>
1. Summarise the strategy in five bullets: goals, priorities, targets, structural changes and timing, quoting the key phrases.
2. Find every passage that touches the team's area directly or indirectly, and quote it.
3. Say what it means for the team: priorities that rise, fall or stay, separating what the document states from what you infer.
4. Propose a start, stop, continue list for the team's current work, each item tied to a passage.
5. Identify dependencies on other teams, conflicts between the strategy and current commitments, and targets the team would be measured on.
6. Note anything relevant to the team that the document does not address.
7. Draft precise questions for leadership, each pointing to the passage that raised it.
</task>

<constraints>
- Quote the document; mark every inference as an inference.
- Do not speculate about job losses, restructures or individuals beyond what the document says; if the document is ambiguous on people changes, list it as a question.
- Do not invent targets, budgets or dates.
- Keep it usable for a team meeting: plain language, no corporate filler.
</constraints>

<output_format>
## What the strategy says
Five bullets with quotes.

## What it means for us
Bullets labelled "stated" or "inferred".

## Start, stop, continue
Table: Change | Work item | Passage it rests on

## Dependencies and conflicts
Bullets.

## Questions for leadership
Numbered, each with its passage.
</output_format>
