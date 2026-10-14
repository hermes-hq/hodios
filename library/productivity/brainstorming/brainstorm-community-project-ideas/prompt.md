---
schema: 1
id: brainstorm-community-project-ideas
kind: prompt
title: Brainstorm community project ideas
description: Generates project ideas for a street, neighbourhood group, club or school community from what the area needs and the people and places it already has, sized from one afternoon to a year.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent, teacher, student]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [community-building, asset-based, neighbourhood, volunteering, civic-projects]
pairs_with:
  prompts: [plan-fundraising-event, find-volunteering-match, plan-recurring-meetup]
args:
  - name: community
    description: The community - a street, estate, village, club, school or faith group - who lives or takes part there, and what you know it needs or complains about.
    type: text
    required: true
  - name: resources
    description: Optional - people, skills, spaces, money, time and contacts available, and who has to give permission for things.
    type: text
output_contract:
  format: markdown
  sections: [Needs and assets, Ideas by size, Best fits, First steps, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Community projects that last usually start from what a place already has (people with skills, underused spaces, existing groups, local businesses), an approach known as asset-based community development, rather than from a list of what it lacks. They also start small: an afternoon event that works builds the trust and contact list for a bigger project. Ideas fail when they depend on one enthusiast, need permissions nobody checked, or serve the organisers more than the people they are for. Good ideas involve the people affected in shaping them.

<community>
{{community}}
</community>
{{#resources}}
Resources:
<resources>
{{resources}}
</resources>
{{/resources}}
</context>

<task>
1. Summarise needs and assets from what the user said, marking which are stated and which are your guesses to check. If the community is too vague (no place or group named), ask up to two questions and stop.
2. Generate 15 to 20 project ideas across sizes: one afternoon, a monthly thing, a season-long project, and a year-long project. Cover several kinds: connection (meeting neighbours), practical help (repairs, shared tools, lifts), green spaces and environment, learning and skills, culture and celebration, and support for people who are often left out (older or isolated people, new arrivals, disabled people, young people).
3. For each idea, note which assets it uses and who it serves.
4. Choose four best fits: realistic for the resources, serving a stated need, and able to involve the people affected. For each, give what success looks like after the first run.
5. Give first steps for the top idea: who to talk to first, a small pilot, how to invite people, and how to share the load so it does not depend on one person.
6. List checks to make: permissions for spaces or public land, insurance, safeguarding if children or vulnerable adults are involved, food hygiene, and accessibility, as questions to ask locally.
</task>

<constraints>
- Do not state local rules, grant schemes or organisation names as fact; describe types and say how to find out.
- Ideas involve the community rather than doing things to it; avoid ideas that could embarrass or single out the people they aim to help.
- Keep the first step small enough to do within a month.
</constraints>

<output_format>
## Needs and assets
Two bulleted lists, guesses marked.

## Ideas by size
Table: Idea | Size | Kind | Assets used | Who it serves.

## Best fits
Four ideas with reasons and what success looks like.

## First steps
Numbered steps for the top idea.

## Checks
Checklist of questions to ask locally.
</output_format>
