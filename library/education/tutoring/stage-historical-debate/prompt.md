---
schema: 1
id: stage-historical-debate
kind: prompt
title: Stage a historical debate
description: Stages a debate between two long-dead historical figures on a question the student chooses, with the student moderating and every position tagged against the sources.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
subject: [history]
requires: [none]
inputs: [topic]
output: [conversation, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [roleplay, historical-debate, source-tagging, anachronism, moderation]
pairs_with:
  prompts: [interview-historical-figure, prepare-debate-case, analyze-primary-source]
  personas: [history-tutor]
args:
  - name: figure_a
    description: The first figure, e.g. "Alexander Hamilton". Must be a public figure who died long ago.
    type: string
    required: true
  - name: figure_b
    description: The second figure, e.g. "Thomas Jefferson". Same rule.
    type: string
    required: true
  - name: question
    description: The motion or question to debate, e.g. "Should the United States have a national bank?".
    type: string
    required: true
  - name: rounds
    description: How many moderator questions after the opening statements.
    type: number
    default: 4
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A staged debate makes students compare how two people from the past reasoned about the same problem, and moderating it trains the question-asking that good history depends on. The risks are the usual ones for role-play, doubled: invented quotations, positions the figures never held, and figures arguing about things they never knew existed. Every position here is tagged against the record, and the student moderates.

Debaters: {{figure_a}} and {{figure_b}}. Question: {{question}}. Rounds after openings: {{rounds}}.
</context>

<task>
1. **Check both figures.** Voice a figure only if they are a real public figure who died long ago (as a working line, more than fifty years) with a documented record. Living, recently dead and private people are declined in a sentence, with an offer to swap in someone suitable. Figures known chiefly for atrocities are not voiced in the first person; offer a historian summarising their documented position instead.
2. **Write the moderator's brief** (out of role) before the debate starts:
   - Each figure's dates and what they actually said, wrote or did about this question, with source types.
   - An **anachronism check**: did each figure address this question, a close version of it, or nothing like it? Did their lifetimes overlap, and did they ever meet or respond to each other? If a figure never addressed the question, say their position will be inferred from related views, and tag accordingly.
   - Three questions the student could ask as moderator.
   Then ask the student to open the debate.
3. **Opening statements:** each figure states their position in character, a short paragraph each, giving the strongest version of their documented case.
4. **Run {{rounds}} rounds.** In each round the student asks a question (to one figure or both); each figure answers and may respond to the other. Tag every substantive claim:
   - **(documented)**: the figure's own words or recorded actions, or contemporary records.
   - **(inferred)**: a reasonable extension of documented views to this question.
   - **(invented)**: rhetorical colour added for the debate, never a policy position.
   End each round with a two-line *Source check* out of role: the strongest documented point on each side, and anything inferred that a student should not repeat as fact. Then ask for the next question.
5. **Keep the moderator in charge.** If the student asks a leading or unfair question, let the figure answer it as they would, and note in the source check how the question shaped the answer.
6. **After the last round,** close the debate and give the debrief.
</task>

<constraints>
- Never invent direct quotations. Quote only short words you are sure of, with a source type; otherwise paraphrase.
- Give each side its strongest documented case. Do not let one figure win by being written worse.
- Figures know nothing after their own deaths. If the question depends on later events, frame it in terms they could have understood and say so in the brief.
- Represent views now seen as wrong accurately and briefly, without slurs or endorsement, and add context in the source check.
- Do not declare a winner. The student judges, and the debrief asks them to.
- Before each round, check: every position tagged, nothing anachronistic, both sides given equal space.
</constraints>

<output_format>
**Moderator's brief:** figures and dates; what each said on the question; anachronism check; three starter questions.

**Openings, then each round:**
**{{figure_a}}:** in-character answer with tags.
**{{figure_b}}:** in-character answer with tags.
*Source check:* two lines.

**Debrief:**
- Table: Claim | Who | Tag | Basis (source type).
- Where the two positions truly differ, and where they were closer than the debate made them sound.
- The student's turn: which side was better supported by evidence, and why, in their own words.
</output_format>
