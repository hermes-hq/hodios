---
schema: 1
id: practise-reading-charts
kind: prompt
title: Practise reading charts with a quiz
description: Builds data literacy with a round-by-round quiz on reading charts, from axes and scales to misleading designs, using described or uploaded charts and explaining every answer.
category: data-visualization
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual, teacher]
requires: [none]
inputs: [image, preferences]
output: [quiz, explanation, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [data-literacy, chart-reading, misleading-charts, graphicacy, numeracy]
pairs_with:
  prompts: [interpret-chart, critique-chart, explain-statistical-concept]
  personas: [data-visualization-designer]
args:
  - name: level
    description: school uses simple everyday contexts and plain words; adult uses news, money and health contexts; professional adds dual axes, log scales, indexed series, small multiples and uncertainty bands.
    type: enum
    enum: [school, adult, professional]
    default: adult
  - name: rounds
    description: Number of quiz rounds.
    type: number
    default: 8
  - name: focus
    description: Optional focus, for example "misleading charts in the news", "reading charts in health reports" or "charts in my finance course". Leave empty for a mixed quiz.
    type: string
output_contract:
  format: markdown
  sections: [Round, Feedback, Final summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reading a chart well is a skill: check the title, the units and the axes before the shape; read a value accurately; notice what is compared with what; and catch the designs that mislead, such as a truncated or broken axis, a dual axis that manufactures a correlation, cumulative totals that can only rise, areas or 3D shapes that exaggerate differences, a cherry-picked time window, raw counts where rates matter, a log scale read as linear, or a correlation presented as cause. People learn this fastest by answering a question, then seeing exactly why the answer is right or wrong.
</context>

<task>
Quiz me on reading charts: {{rounds}} rounds at {{level}} level{{#focus}}, focused on {{focus}}{{/focus}}.

First turn: say in one line how the quiz works and that I can upload or describe my own chart at any time to use as a round. Then start round 1.

Each round:
1. Present one chart. Describe it precisely in words: chart type, title, axis labels, units, scale (including where the axis starts and any breaks), and the data points or a small table of the plotted values, so I can picture it exactly. Say that the data are invented for practice unless I supplied the chart.
2. Ask one question, multiple choice with three or four options or a short answer. Then stop and wait for my answer.
3. When I answer, say whether it is right, explain why in two to four sentences, name the reading skill or the misleading technique involved, and give one habit to use next time ("check where the y-axis starts before comparing bar heights").

Progression: start with reading values and units, then comparisons and trends, then rates versus counts and the choice of baseline, then misleading designs, then (for professional) dual axes, log scales, indexing and uncertainty. If I get two in a row wrong, step back to an easier version of the same skill; if I get three in a row right, step up.

After the last round, give a Final summary: my score, the skills I showed, the two skills to practise, and a short checklist I can use on any chart.
</task>

<constraints>
- One round per turn; never reveal the answer before I reply.
- Describe each chart completely enough that the question can be answered from the description alone; if a chart I upload cannot be read clearly, say what is unclear.
- Use realistic contexts for the level, without real people, real companies or real political parties as the subject of a misleading chart.
- Keep the tone encouraging and precise; a wrong answer is a chance to learn the habit.
</constraints>

<output_format>
## Round N of {{rounds}}
The chart description, then the question. Stop.
## Feedback
Right or not, the explanation, the skill name and the habit; then the next round in the same turn.
## Final summary
After the last round only: score, strengths, two skills to practise, and the checklist.
</output_format>
