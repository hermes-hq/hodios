---
schema: 1
id: mine-daily-work-for-content
kind: prompt
title: Mine daily work for content
description: Turns the work a busy owner or practitioner already does into content with a capture routine, a weekly 15-minute log and 20 ideas drawn from their own week. For people with no content day.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, content-creator]
subject: [retail, agriculture, construction, hospitality]
requires: [none]
inputs: [text, notes]
output: [plan, ideas, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [capture-routine, behind-the-scenes, trade-content, content-ideas, batching, low-effort]
pairs_with:
  prompts: [plan-content-calendar, define-content-pillars, plan-content-repurposing-system]
args:
  - name: work_description
    description: What a normal week of your work looks like, in your own words, for example "I fit bathrooms, mostly older houses, 2-3 jobs a week, lots of customer questions about tiles". Include what customers ask and what goes wrong.
    type: text
    required: true
  - name: time_per_week
    description: How much time you can honestly give content each week, for example "15 minutes", "an hour on Sunday".
    type: string
    default: 30 minutes
output_contract:
  format: markdown
  sections: [Where your content already is, Capture routine, Weekly log, 20 ideas from your week, Turning a capture into a post, What to keep private]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone whose real job is not content (a plumber, baker, farmer, nurse, florist, freelance bookkeeper) post useful things without setting aside a content day they will never have. Advice for creators usually fails them: it assumes long scripting sessions, trending audio and daily posting. What works instead is capture during the work (a 10-second photo, a voice note, a customer question written down) and a short weekly moment to turn the best capture into one post. Their most valuable material is what they find boring: the steps they do without thinking, the mistakes they stop customers making, before and after, and the honest answer to a common question.

Time available each week: {{time_per_week}}
</context>

<task>
<work>
{{work_description}}
</work>

1. Where your content already is: from the description, list the moments in their week that hold content (start of a job, a problem found, a question asked, a finished result, a delivery, a seasonal change, a tool or material choice).
2. Capture routine: three or four tiny habits linked to things they already do ("when you arrive at a job, take one wide photo before you touch anything"), each under a minute, with what to capture (photo, 10-second clip, voice note, written question) and where to drop it (one phone album or note).
3. Weekly log: a 15-minute template to review captures, pick one or two, and note the question or result behind each.
4. 20 ideas drawn from their own week, specific to their trade, spread across: customer questions answered, before and after, mistakes avoided, how it is done, tools or materials and why, seasonal or local timing, myths in the trade, a day in numbers. Each idea in one line with the capture it needs.
5. Turning a capture into a post: a three-part formula (what this is, what most people get wrong or do not see, what to do or ask) with one worked example from their work, and how to reuse it across one or two channels without extra effort.
6. What to keep private: customers' homes, faces, addresses, number plates, patient or client details, children, and anything a customer has not agreed to; ask permission with a one-line script.
</task>

<constraints>
- Fit the plan to the stated time; if it is under 15 minutes, aim for one post a week and say that is enough.
- No jargon (no "funnels", "hooks", "content pillars" without explanation); write the way the person talks.
- Never invent facts about their trade, prices or regulations; ideas are prompts for them to fill with their own knowledge.
- For regulated work (health, care, legal, finance, electrical, gas), remind them to stay within their professional and confidentiality rules and avoid advice that needs a professional assessment.
- If the work description is too thin to produce specific ideas, ask two or three questions about a typical week and stop.
</constraints>

<output_format>
## Where your content already is
Bullets, one per moment.

## Capture routine
Table: when you... | capture this | takes | drop it in.

## Weekly log
A short fill-in template.

## 20 ideas from your week
Numbered list, each idea with the capture it needs in brackets.

## Turning a capture into a post
The formula, one worked example and a reuse note.

## What to keep private
Bullets and a one-line permission script.
</output_format>
