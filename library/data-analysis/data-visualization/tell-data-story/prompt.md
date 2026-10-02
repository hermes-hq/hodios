---
schema: 1
id: tell-data-story
kind: prompt
title: Tell a data story
description: Turns analysis findings into a data story with one message, a sequence of charts with action titles and annotations, and the narrative linking them. Use when presenting to non-analysts.
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, product-manager, consultant]
inputs: [notes, dataset, text]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [storytelling, action-titles, annotations, presentation-flow]
pairs_with:
  prompts: [choose-chart-type, write-insight-report, critique-chart]
  personas: [data-analyst]
args:
  - name: findings
    description: The findings with their numbers, the charts or tables you already have, and the recommendation if you have one.
    type: text
    required: true
  - name: audience
    description: Who you are presenting to, what they care about, what they already believe, how long you have, and the format (live talk, slides sent ahead, written memo).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Big idea, Storyline, Chart sequence, Narrative, The ask, What to cut]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach analysts on presenting data to executives and other non-analysts. The most common failure is a tour of every chart in the order the analysis happened. Your approach puts the message first: one big idea the audience should remember and act on, a storyline that moves from what they know to what they need to do, and a short sequence of charts where every chart earns its place with a title that states its point and an annotation that points at the evidence.
</context>

<task>
Turn these findings into a data story for this audience.

<findings>
{{findings}}
</findings>

<audience>
{{audience}}
</audience>

1. Write the big idea in one sentence: what the audience should believe or do, and why now. It must be a complete sentence with a point of view, not a topic ("Customer service" is a topic; "Fixing first-response time is the cheapest way to cut churn this quarter" is a big idea). If the findings do not support a clear message, say so and offer the strongest honest message they do support.
2. Build the storyline with a situation, complication and resolution structure: what the audience already accepts, what has changed or is at stake, and what to do. Adjust tone for the audience's prior beliefs: if they will resist, lead with the evidence before the conclusion.
3. Choose the chart sequence: three to six charts, each making exactly one point that moves the story forward. For each, give an action title (a full sentence stating the takeaway), the chart type and why, the data it uses, the annotation (which point, line or bar to highlight, and the note to put on it), and the highlighting (one accent colour on the focus, grey for context).
4. Write the narrative: the spoken or written lines that link the charts, one short paragraph per chart, including the "so what" for this audience.
5. End with the ask: the decision or action requested, with the owner and timing if known, and what happens if nothing is done.
6. List what to cut or move to an appendix: findings that are true but do not serve the big idea.
</task>

<constraints>
- Use only the findings provided. Do not add numbers, causes or recommendations that are not supported; where the story needs evidence you do not have, mark it as a gap.
- Keep uncertainty honest: if a finding is directional or based on a small sample, the title and narrative must say so.
- Each chart has one message. If a chart needs two titles, it is two charts.
- Fit the time or length the audience allows; a five-minute slot gets three charts at most.
</constraints>

<output_format>
## Big idea
One sentence.

## Storyline
Situation, complication, resolution: one or two sentences each.

## Chart sequence
A table: # | action title | chart type | data | annotation and highlight | why it is here.

## Narrative
One short paragraph per chart.

## The ask
## What to cut
Bullets, each with one line on why.
</output_format>
