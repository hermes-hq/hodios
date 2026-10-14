---
schema: 1
id: find-patterns-in-journal
kind: prompt
title: Find patterns in your journal
description: Reads weeks or months of your own journal entries and reflects back recurring themes, what tends to come before good and bad days, progress you may not notice and what you keep circling back to.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [summary, questions]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [journal-entries, self-reflection, recurring-themes, triggers, personal-review]
pairs_with:
  prompts: [summarize-feedback-about-me, extract-open-questions, turn-content-into-actions]
args:
  - name: entries
    description: Your journal entries with dates, as many as you are comfortable sharing. Remove other people's full names if you prefer.
    type: text
    required: true
  - name: question
    description: Optional - what you want to understand (for example "why some weeks I can't get started", "how my mood relates to work").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [What stands out, Recurring themes, What comes before good and hard days, Changes over time, Things you keep circling back to, Questions to reflect on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read a person's own journal and reflect back patterns they may not see from inside a single day. Journals are written in the moment, so the hard days are over-represented and slow progress goes unnoticed. Thoughtful reflection counts rather than impresses: how often a theme appears and when, what tends to precede the entries that feel good or heavy (sleep, a person, a type of work, money worries, exercise, time alone), how the language about a topic changes over the months, and which questions the writer asks again and again without answering. You use the writer's own words, offer patterns as observations to test rather than conclusions, and never diagnose.

<entries>
{{entries}}
</entries>

{{#question}}What the writer wants to understand: {{question}}{{/question}}
</context>

<task>
1. Note the date range and number of entries, and any long gaps.
2. Before anything else, check for signs of crisis (thoughts of self-harm or suicide, harm to others, abuse or danger); if present, respond to that first as the constraints say.
3. Summarise what stands out in three or four sentences, in a warm and plain tone.
4. List recurring themes with how many entries mention each and short quotes in the writer's words.
5. Describe what tends to come before entries that read as good days and as hard days, offered as patterns to test, with the dates that show it.
6. Describe changes over time: what has improved, eased, grown or shifted, with examples.
7. List questions, worries or intentions the writer keeps returning to.
8. Offer three or four open questions to reflect on, and, if the writer asked a specific question, what the entries do and do not show about it.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose or label (no "this sounds like depression" or "anxiety disorder"); describe what the entries say.
- Base every pattern on the entries; cite dates. Say when there are too few entries to see a pattern.
- Do not judge other people mentioned in the entries or tell the writer to cut anyone off.
- If entries describe lasting low mood, sleep loss or inability to cope with daily life, gently suggest talking to a doctor or counsellor.
</constraints>

<output_format>
## What stands out
Three or four sentences.

## Recurring themes
Table: Theme | Entries | Quote

## What comes before good and hard days
Bullets, each with dates and marked as a pattern to test.

## Changes over time
Bullets.

## Things you keep circling back to
Bullets.

## Questions to reflect on
Numbered.
</output_format>
