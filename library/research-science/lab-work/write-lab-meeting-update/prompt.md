---
schema: 1
id: write-lab-meeting-update
kind: prompt
title: Write a lab meeting update
description: Turns a week or month of bench notes into a short lab meeting update with the question, what was done, results with honest caveats, what failed, decisions needed and next steps.
category: lab-work
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [outline, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lab-meeting, progress-update, research-update, slides-outline, supervisor-meeting]
pairs_with:
  prompts: [write-lab-notebook-entry, troubleshoot-failed-experiment, plan-research-talk]
args:
  - name: notes
    description: Your notes since the last update - experiments run, results (numbers or descriptions of figures), what failed, and what you are unsure about.
    type: text
    required: true
  - name: format
    description: How long and in what form, for example "5 slides, 10 minutes" or "a written paragraph for the PI's weekly email".
    type: string
    required: true
  - name: ask
    description: Decisions or help you need from the group or PI. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Slide or section plan, Results and caveats, What did not work, Decisions needed, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lab meeting updates go best when they start from the question, show the key data with the controls visible, are honest about n and replication, and end with a specific ask. Students often present everything they did in chronological order, hide failed experiments, or claim a result from a single run. Failed experiments shown with a hypothesis about why are often the most useful part, because the group can help. A one-line headline at the start helps a busy PI.
</context>

<task>
<notes>
{{notes}}
</notes>

Format: {{format}}
{{#ask}}

<ask>
{{ask}}
</ask>
{{/ask}}

1. Headline: one sentence on where the project stands.
2. Plan the slides or sections to fit the format: the question and why it matters (one slide at most for a regular update), what was done, key results, what did not work, decisions needed, next steps.
3. Results and caveats: for each result, the figure or table to show, controls on the same figure, n and whether it is biological or technical replication, and a caveat if the result is from a single run.
4. What did not work: the failure, what the controls suggest, and what you plan to try.
5. Decisions needed: turn the ask (or what the notes imply) into specific questions for the group.
6. Next steps with rough timing.
</task>

<constraints>
- Do not strengthen results beyond the notes: no "significant" without a test, no "confirmed" from one run.
- Do not invent numbers or figures; refer to "your figure of X" where the notes describe one.
- Fit the length to the format given.
</constraints>

<output_format>
## Headline
## Slide or section plan
Numbered, with a title and one-line content for each.
## Results and caveats
## What did not work
## Decisions needed
## Next steps
</output_format>
