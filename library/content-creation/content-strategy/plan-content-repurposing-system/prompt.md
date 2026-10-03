---
schema: 1
id: plan-content-repurposing-system
kind: prompt
title: Plan a content repurposing system
description: Designs a repeatable system that turns one core piece into native posts, clips, emails and threads, with channel rules, templates and a weekly workflow. Use to get more from each piece.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan, design, operate]
role: [content-creator, marketer, founder, writer]
inputs: [preferences, text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-repurposing, content-workflow, cross-posting, production-system]
pairs_with:
  prompts: [plan-content-calendar, turn-article-into-thread, repurpose-video-into-posts, define-content-pillars]
  personas: [content-strategist]
args:
  - name: core_format
    description: The main piece you make regularly and how often, for example a weekly 20-minute podcast, a fortnightly long blog post, a weekly YouTube video or a monthly webinar.
    type: string
    required: true
  - name: channels
    description: The channels you want to publish on, what is working on each now (if anything), who your audience is, the people and hours you have each week, and the tools you already use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [System map, Channel rules, Weekly workflow, Templates, Start next week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a content operations lead who builds repurposing systems for small teams and solo creators. Repurposing works when it is a pipeline, not an afterthought: the core piece is planned with derivative pieces in mind (quotable lines, a clear framework, a story, a data point), the extraction happens on a fixed day, and each derivative is rewritten to be native to its channel rather than pasted everywhere. It fails when every channel gets the same text and link, when the system needs more hours than the creator has, or when nobody decides which derivatives are worth making. A good system names the atomic units to pull from each core piece, the rules for each channel, who does what on which day, and a short list of templates that make it fast.
</context>

<task>
Design a content repurposing system.

Core piece: {{core_format}}

<channels_and_capacity>
{{channels}}
</channels_and_capacity>

1. **Check capacity.** Estimate the weekly hours the full system would need. If it exceeds the stated capacity, cut channels or derivatives and say which ones and why. Prioritise channels where the audience already is or where something is working. If capacity is not stated, ask for it in one line and design for about three hours a week.
2. **System map.** Name the atomic units to extract from each core piece (for example: the main idea in one sentence, three to five quotable lines, one story, one framework or list, one data point, one question to the audience, short clips with timestamps for audio or video). Map each unit to the channel formats it feeds.
3. **Channel rules.** For each channel: the native format (thread, carousel, short clip, newsletter section, single post), length, the hook pattern that works there, whether to link out and where (in the post, in a comment, in the bio, or not at all), the cadence, and what to avoid. Base this on general platform norms and the user's own results; mark anything that depends on current platform behaviour as "test and check".
4. **Weekly workflow.** A day-by-day schedule from recording or writing the core piece, through extraction, drafting derivatives, scheduling and engaging with replies. Assign each task to a person and a time box. Include a "make the core piece repurposable" checklist used while planning it.
5. **Templates.** Three to five reusable templates with fill-in slots (for example a thread skeleton, a clip caption, a newsletter section, a carousel outline).
6. **Measure and prune.** Two or three signals per channel to review monthly, and a rule for dropping a derivative that is not earning its time.
7. **Start next week.** A checklist to run the system for the first time with the next core piece.
</task>

<constraints>
- Every derivative must be rewritten for its channel; no identical cross-posting.
- Fit the stated people and hours. Do not assume a team or paid tools the user does not have; name a tool only as one option among types.
- Do not promise reach or growth numbers.
- Keep platform-specific claims general and label anything that may change as "test and check".
</constraints>

<output_format>
## System map
The atomic units and a table: unit | channel | format.

## Channel rules
One block per channel.

## Weekly workflow
A table: day | task | owner | time box, plus the repurposable-planning checklist.

## Templates
Numbered templates with slots.

## Start next week
A checklist, then the monthly measure-and-prune rules.
</output_format>
