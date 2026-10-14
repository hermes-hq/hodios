---
schema: 1
id: adapt-talk-for-new-audience
kind: prompt
title: Adapt an existing talk for a new audience
description: Reworks a talk you have already given for a different audience by mapping what they know and care about, deciding what to keep, swap or cut, and rewriting the opening, examples and call to action.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, executive, researcher, developer-advocate]
requires: [none]
inputs: [text, document]
output: [outline, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [audience-analysis, talk-reuse, repurposing, call-to-action]
pairs_with:
  prompts: [shorten-presentation-for-time, write-talk-openings-and-closings, plan-conference-talk-pipeline]
  personas: [speechwriter, speaking-coach]
args:
  - name: talk
    description: The existing talk as a script, outline or slide text with speaker notes.
    type: text
    required: true
  - name: original_audience
    description: Who the talk was written for and the setting.
    type: text
    required: true
  - name: new_audience
    description: The new audience, the setting, the time slot, and what the organiser or you want them to think or do afterwards.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Audience shift, "Keep, change or cut", Revised outline, New opening and close, Material needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speechwriter. A talk that worked once tends to be reused unchanged, and it fails because the audience changed: the jargon that was shared vocabulary is now noise, the examples come from the wrong world, the depth is wrong, and the call to action asks people to do something they cannot do. Experts keep the spine of a good talk (its one idea and the order of the argument) and change everything that depends on the listener: the opening hook, the examples and stories, the level of detail, the objections addressed, and the ask. They also check what the new audience already believes, because a talk that persuades sceptics is built differently from one that equips supporters.

<talk>
{{talk}}
</talk>

<original_audience>
{{original_audience}}
</original_audience>

<new_audience>
{{new_audience}}
</new_audience>
</context>

<task>
1. Audience shift: compare the two audiences on what they already know, what they care about, what they may resist, the words they use, and what they can actually do after the talk. Name the two or three differences that matter most.
2. State the talk's one idea and check that it still holds for the new audience; if it does not, say so and propose a reframed idea.
3. Keep, change or cut: go through the talk section by section and decide for each whether to keep it, change it (and how), or cut it, with a reason tied to the audience shift. Fit the result to the new time slot.
4. Revised outline: the new running order with timings that add up.
5. New opening and close: rewrite the first 60 seconds to connect to the new audience's concerns, and rewrite the close with a call to action they can carry out.
6. Jargon: list terms to define or replace.
7. Material needed: examples, stories or data the new audience would find credible that are not in the original, marked as [NEEDED: ...] for the speaker to supply.
</task>

<constraints>
- Do not invent examples, case studies, data or quotes; mark what is needed.
- Keep the speaker's voice and the substance of their claims; do not strengthen claims to suit the new audience.
- Timings must add up to the new slot.
</constraints>

<output_format>
## Audience shift
## Keep, change or cut
Table: Section | Decision | How | Reason.
## Revised outline
With timings and total.
## New opening and close
## Material needed
Including the jargon list.
</output_format>
