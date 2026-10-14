---
schema: 1
id: generate-youtube-video-ideas
kind: prompt
title: Generate YouTube video ideas
description: Generates video ideas for an existing channel from audience questions and its proven formats, each with a working title, thumbnail concept and a demand check.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer]
stack: [youtube]
requires: [none]
inputs: [notes, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [content-ideas, audience-questions, outlier-videos, packaging, search-vs-browse]
pairs_with:
  prompts: [package-video-title-thumbnail, write-youtube-script, analyze-video-retention]
  personas: [youtube-strategist]
args:
  - name: channel
    description: What the channel covers, who watches, and your recent or best videos with rough views (or how they did compared with your usual). The more real numbers, the better.
    type: text
    required: true
  - name: audience_questions
    description: Questions and requests from comments, emails, communities or search suggestions you have seen, pasted as they were written.
    type: text
  - name: count
    description: How many ideas to generate.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Channel read, Ideas, Demand check, Make next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help YouTubers with an existing channel decide what to make next. On a channel that already has an audience, the best ideas are rarely brand-new topics; they are new angles on what has already worked for these viewers, or answers to questions viewers keep asking. Experienced creators look for demand before they script: their own outlier videos (ones that did far better than the channel's usual), outliers on similar channels (views high compared with that channel's subscriber count), questions repeated in comments, and search suggestions. They also know two kinds of video behave differently: search videos answer a question people type and keep earning slowly; browse videos win on a curiosity-driven title and thumbnail shown to existing viewers. An idea that cannot be packaged as one clear title and one thumbnail image is not ready yet.
</context>

<task>
<channel>
{{channel}}
</channel>

<audience_questions>
{{audience_questions}}
</audience_questions>

1. Read the channel: which topics and formats have worked best, judged only from the numbers and notes given, who the viewer is, and what the channel promises. If no performance data is given, say that the ideas rest on topic fit alone.
2. Mine the audience questions: group repeats, note the exact wording viewers use, and mark which ones a single video could answer.
3. Generate {{count}} ideas. Spread them across formats that suit the channel (tutorial, list, comparison, experiment or challenge, story, myth-busting, reaction to news in the niche, beginner guide, update or follow-up to a past winner). Each idea must trace to one signal: a past winner, a viewer question, or a stated gap.
4. For each idea give: a working title under 60 characters; a thumbnail concept (one main image and at most four words of text, not repeating the title); the viewer's reason to click in one line; search or browse; the demand signal it rests on; and effort (low, medium, high).
5. Flag any idea that would pull in a different audience from the one the channel has, and say whether that is worth it.
6. Pick the three to make next and say why, favouring strong demand and low effort first.
</task>

<constraints>
- Never invent search volumes, view counts, competitor videos or trend data. The demand signal must come from the input; where the input has none, write "unproven" and name the check the creator can do (search suggestions, outliers on two named similar channels they choose, a community poll).
- Titles must be deliverable by the video. No clickbait the content cannot pay off.
- Keep ideas inside the channel's niche and voice unless you flag a deliberate stretch.
- If the channel description is too thin to tell the niche or viewer, ask two or three questions and stop.
</constraints>

<output_format>
## Channel read
Three to five bullets: what wins, who watches, the channel's promise, data caveats.

## Ideas
Table: # | working title | thumbnail concept | why they click | search or browse | format | effort.

## Demand check
Table: # | demand signal from the input, or "unproven" plus the check to run | audience drift flag.

## Make next
The three picks with one reason each.
</output_format>
