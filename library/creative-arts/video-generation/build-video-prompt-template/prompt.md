---
schema: 1
id: build-video-prompt-template
kind: prompt
title: Build a video prompt template
description: Builds a reusable prompt template for a recurring video series from prompts that already worked, with a fixed look block, named slots, slot rules, filled examples and a test plan.
category: video-generation
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [content-creator, marketer, designer]
requires: [none]
inputs: [text, notes]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [prompt-template, series-look, reusable-prompts, brand-consistency]
pairs_with:
  prompts: [write-video-generation-prompt, review-generated-video-takes, build-image-style-guide]
args:
  - name: series
    description: "What the series is, e.g. 'weekly 8-second product teasers for a tea shop' or 'daily nature clips for a meditation channel', and the look you want."
    type: text
    required: true
  - name: good_prompts
    description: Two to five prompts that produced results you liked, with a note on what you liked about each.
    type: text
    required: true
  - name: varies
    description: "What changes from episode to episode, e.g. 'the product, the season, the time of day'."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What made them work, Template, Slot rules, Filled examples, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creators who post generated video regularly usually rewrite each prompt from memory, and the series look slowly drifts: the grade shifts, the lens changes, the pacing gets busier. A template stops the drift by separating what never changes (camera language, lens, light, palette, texture, pacing, aspect ratio) from what does (subject, setting, action), and by limiting how each slot may be filled. The fixed block should be written once, in exact wording, because small rewordings change results. Slot rules matter as much as the slots: one action only, an approved list of settings, a word limit. A template is tested on very different slot values before it is trusted, and versioned when it changes.
</context>

<task>
Build a prompt template for this series.

<series>
{{series}}
</series>

<good_prompts>
{{good_prompts}}
</good_prompts>

What varies: {{varies}}

1. **What made them work.** Compare the good prompts and list the shared wording and choices that likely produced the look (camera, lens, light, palette, pace, structure, length). Note any differences that seem to explain differences in results, marked as guesses to test.
2. **Template.** Write one template: a fixed look block in exact wording, then named slots in double square brackets (for example [[subject]], [[setting]], [[action]]) in a set order, and a closing fixed line for the end state or framing. Keep the fixed block in the same position every time.
3. **Slot rules.** For each slot: what it may contain, a word limit, allowed and banned values (for example "one action only", "no readable text", "settings from this list"), and an example.
4. **Filled examples.** Three filled prompts for deliberately different slot values within the series, to show the template holds.
5. **Test plan.** How to test: generate the three examples with the same settings, compare against the look criteria, change only one word of the fixed block at a time if the look is off, and record template versions (v1, v2) with what changed.
6. Before answering, check that the fixed block is identical in all filled examples and that every slot obeys its rules.
</task>

<constraints>
- Build from the user's good prompts; do not replace their look with a generic one.
- Do not use living artists' names, studio names or trademarks as style shortcuts; describe the look in visual terms.
- No tool, model or version names.
</constraints>

<output_format>
## What made them work
Bullets, with guesses marked.
## Template
Code block.
## Slot rules
Table: Slot | Contains | Limit | Allowed or banned | Example.
## Filled examples
Three code blocks.
## Test plan
Numbered steps and a version log line format.
</output_format>
