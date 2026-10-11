---
schema: 1
id: adapt-deck-for-new-audience
kind: prompt
title: Adapt an existing deck for a new audience
description: Re-cuts a deck built for one audience for another, such as team to executives or experts to customers, deciding what to reorder, cut, add and reword slide by slide.
category: presentations
version: 1.0.0
status: incubating
stage: [design, review]
role: [manager, consultant, product-manager, researcher]
requires: [none]
inputs: [document, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [audience-analysis, deck-reuse, executive-audience, storyline, jargon]
pairs_with:
  prompts: [critique-slide-deck, shorten-presentation-for-time, outline-presentation]
  personas: [presentation-designer]
args:
  - name: deck
    description: The existing deck as slide titles with each slide's main content, in order. Speaker notes help.
    type: text
    required: true
  - name: original_audience
    description: Who the deck was built for and what they wanted from it.
    type: text
    required: true
  - name: new_audience
    description: The new audience, what they already know, what they care about and what you want them to do afterwards.
    type: text
    required: true
  - name: time_slot
    description: Time available with the new audience, if different. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What changes for this audience, Slide decisions, New running order, Slides to write, Terms to translate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people reuse a deck for a different room. Swapping the title slide is not enough. Different audiences differ in what question they bring, how much method they want, what words they know and what action is available to them. Executives want the conclusion, the impact in their terms (money, risk, time, customers) and the decision first, with method in the appendix. Practitioners want the how and the evidence. Customers want what changes for them, not the internal project story. A board wants risk and oversight. The test for every slide: would this audience miss it if it were gone?

<deck>
{{deck}}
</deck>

Original audience: {{original_audience}}
New audience: {{new_audience}}
{{#time_slot}}Time available: {{time_slot}}{{/time_slot}}
</context>

<task>
1. State the question the new audience brings and the action you want from them, and contrast it with the original audience in two lines. If the new audience description is too thin to decide (for example just "managers"), ask two short questions and stop.
2. Decide for each existing slide: keep as is, reword (give the new title), move earlier or later, merge, move to appendix, or cut, with a one-line reason tied to the new audience.
3. Identify what the new audience needs that the deck lacks, such as an impact slide in their terms, a "what this means for you" slide or a clear ask, and outline each new slide. Mark any content the presenter must supply as [to supply]; do not fabricate it.
4. Build the new running order{{#time_slot}} sized to {{time_slot}}{{/time_slot}}.
5. List jargon, acronyms and internal names in the deck that the new audience may not know, with a plain replacement or a one-line definition.
6. Flag any slide that would be risky to show this audience as it stands, such as internal-only figures, criticism of the client or confidential names, and say what to do.
</task>

<constraints>
- Keep the facts and numbers in the deck; change framing, order and depth, not the truth.
- Do not invent data, quotes or results for new slides.
- Use assertion-style titles for reworded and new slides.
</constraints>

<output_format>
## What changes for this audience
Two to four lines.

## Slide decisions
Table: # | Current title | Decision | New title or note | Reason. Mark slides that are risky to show this audience.

## New running order
Numbered list of slide titles{{#time_slot}} with minutes{{/time_slot}}, appendix at the end.

## Slides to write
Each new slide: title and bullet content, with [to supply] placeholders.

## Terms to translate
Table: Term | Replacement or definition.
</output_format>
