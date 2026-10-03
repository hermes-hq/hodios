---
schema: 1
id: build-self-editing-checklist
kind: prompt
title: Build a self-editing checklist
description: Builds a personal self-editing checklist from samples of someone's writing and feedback they have received, ordered by their most frequent issues, with a quick test for each.
category: editing
version: 1.0.0
status: incubating
stage: [learn]
role: [writer, student, individual, manager]
requires: [none]
inputs: [text, document]
output: [checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-editing, writing-habits, personal-style-guide, feedback-patterns]
pairs_with:
  prompts: [capture-writing-voice, critique-draft, tighten-prose, proofread-text]
  personas: [editor]
args:
  - name: writing_samples
    description: Two or more pieces of your own writing of the kind you want to improve, pasted with a line like "--- sample 2 ---" between them. More and longer samples give a more reliable checklist.
    type: text
    required: true
  - name: feedback_received
    description: Optional, comments others have made on your writing (from a manager, teacher, editor or reviewer), quoted as closely as you can.
    type: text
  - name: writing_type
    description: "Optional, the kind of writing the checklist is for, for example \"work emails\", \"university essays\", \"grant proposals\", \"blog posts\"."
    type: string
output_contract:
  format: markdown
  sections: [Your top issues, Self-editing checklist, Strengths to keep, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generic editing checklists fail because they list thirty things the writer already does well and bury the three they always get wrong. A personal checklist is built from evidence: the issues that actually recur in this person's writing and the comments readers keep making. Each item is short, ordered by how often it bites, and paired with a fast mechanical test ("search for 'just'", "read only the first sentence of each paragraph") so it is used in two minutes before sending, not admired once and forgotten.
</context>

<task>
Build my personal self-editing checklist{{#writing_type}} for {{writing_type}}{{/writing_type}}.

<writing_samples>
{{writing_samples}}
</writing_samples>
{{#feedback_received}}
<feedback_received>
{{feedback_received}}
</feedback_received>
{{/feedback_received}}

1. If there are no samples, ask for them and stop. If there is only one sample or fewer than about 400 words in total, continue but say the checklist is provisional and will improve with more samples.
2. Analyse the samples for recurring issues at three levels: structure (main point late, missing ask, weak openings or endings, paragraphs with several ideas), sentences (length, hedging, passive voice that hides the actor, nominalisations, filler, repetition) and mechanics (specific spelling, punctuation or agreement errors that repeat). Count occurrences and note which samples they appear in.
3. Read the feedback. Map each comment to an issue you found, or add it as an issue if the samples show it. If feedback is not borne out by the samples, or contradicts them, say so rather than adding it.
4. Rank the issues by frequency across samples, weighted up when readers have also complained about them. Keep the eight to twelve that matter most; drop one-offs.
5. Write one checklist item per issue: the check as a short question, a quick test the writer can run in under a minute, and the fix, each with a before and after taken from their own samples.
6. Note two or three strengths that appear consistently, so the writer does not edit them out.
</task>

<constraints>
- Every item must be backed by evidence from the samples or the feedback. No generic advice that does not apply to this writer.
- Quote the writer's own sentences for examples; you may shorten them with an ellipsis.
- Fit the checklist to the writing type: a hedging check matters in a proposal; a citation check only if the samples need citations.
- If the samples have few real problems, produce a shorter checklist and say so.
</constraints>

<output_format>
## Your top issues
A table: Rank | Issue | How often (for example "11 times across 3 of 3 samples") | Also raised in feedback (yes or no) | Example from your writing.
## Self-editing checklist
A numbered list of checkboxes in rank order. Each: **- [ ] The check as a question**, then "Test:" one line, then "Fix:" one line with before → after.
## Strengths to keep
Two or three bullets with an example each.
## How to use it
Two or three lines: when to run it, in what order (structure first, then sentences, then mechanics), and when to update it.
</output_format>
