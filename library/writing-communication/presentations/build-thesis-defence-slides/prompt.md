---
schema: 1
id: build-thesis-defence-slides
kind: prompt
title: Build thesis defence slides
description: Plans the presentation for a thesis defence or viva, built around the contributions, timed to the rules, with backup slides for likely examiner questions.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [student, researcher]
requires: [none]
inputs: [document, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis-defence, viva, phd, masters-thesis, examiners, academic-presentation]
pairs_with:
  prompts: [plan-backup-slides, drill-presentation-qa, outline-presentation]
  personas: [presentation-designer]
args:
  - name: thesis_summary
    description: Your research question, methods, chapters and main findings, and what you claim is new. The abstract plus chapter summaries is ideal.
    type: text
    required: true
  - name: defence_format
    description: The rules for the presentation part, for example "20-minute public presentation then 60 minutes of questions from a committee of four" or "viva with no presentation, examiners asked for a 10-minute summary".
    type: text
    required: true
  - name: known_weaknesses
    description: Limitations you know about or that your supervisor or reviewers have raised. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Core message, Slide outline, Contribution slide, Backup slides, Questions to prepare]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help candidates plan the presentation at the start of a thesis defence or viva. Formats vary widely by country and institution: some defences are public with a fixed 20 to 45 minute talk, some vivas are private with a short summary or none, and the rules come from the institution, not from general advice. Common mistakes: re-presenting the whole thesis chapter by chapter, spending half the time on background the examiners already know, burying the contributions, hiding limitations the examiners have certainly spotted, and running over time. Strong defence talks are organised around the contributions (what is new and why it matters), show the evidence for each, state limitations before examiners raise them, and end with the contributions restated. Examiners use the talk to choose their questions, so what is shown invites what is asked.

<thesis_summary>
{{thesis_summary}}
</thesis_summary>

Defence format: {{defence_format}}
{{#known_weaknesses}}Known weaknesses: {{known_weaknesses}}{{/known_weaknesses}}
</context>

<task>
1. Read the format and state the time budget. If the format is unclear or there may be no presentation at all, say what to confirm with the supervisor or the institution's regulations, and plan for the most likely case.
2. Write the core message: the thesis's contributions in two to four numbered sentences, using only what the summary claims.
3. Build the slide outline around the contributions: brief motivation and gap, research question, approach, one section per contribution with its key evidence, limitations, implications and future work, and contributions restated. Give each slide an assertion title and minutes, keeping background to about 15% of the time.
4. Write the contribution slide in full, since it is the slide examiners return to.
5. Plan backup slides for the questions the talk will invite, especially method choices, alternative explanations, limitations and generalisability{{#known_weaknesses}}, and each known weakness{{/known_weaknesses}}.
6. List the questions to prepare spoken answers for, grouped by type.
</task>

<constraints>
- Do not invent findings, statistics, citations or contributions; use placeholders like [figure from chapter 4].
- Do not present limitations as strengths or hide known weaknesses; plan how to state them honestly.
- Say clearly that institutional rules override this plan.
</constraints>

<output_format>
## Core message
The time budget and anything to confirm with the institution, then the numbered contributions.

## Slide outline
Table: # | Slide title (assertion) | Content | Minutes. Total shown.

## Contribution slide
The full slide text.

## Backup slides
Table: Backup | Question it answers | Content | Source chapter.

## Questions to prepare
Grouped bullets.
</output_format>
