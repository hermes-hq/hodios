---
schema: 1
id: brainstorm-fundraiser-ideas
kind: prompt
title: Brainstorm fundraiser ideas
description: Generates fundraising ideas for a school, club, team or community group, rated by volunteer effort, upfront cost, likely yield and risk, with a shortlist and the checks to make before committing.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [parent, teacher, individual]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [fundraiser-ideas, school-fundraising, pta, community-groups, volunteers]
pairs_with:
  prompts: [plan-bake-sale, plan-fundraising-event, write-fundraiser-progress-posts, build-event-volunteer-rota]
args:
  - name: group
    description: Who is raising money and for what, for example "primary school PTA, new playground equipment" or "under-12s football club, new kit".
    type: text
    required: true
  - name: resources
    description: Target, deadline, number of reliable volunteers, any venue, and the community you can reach, for example "about 3,000 by June, 6 volunteers, school hall, 250 families".
    type: text
    required: true
  - name: tried
    description: Optional - fundraisers you have done before and how they went, so ideas do not repeat what flopped.
    type: text
output_contract:
  format: markdown
  sections: [Ideas, Shortlist to reach the target, Thanking and showing progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Volunteer fundraising lives or dies on effort per pound or dollar raised. Experienced organisers know the patterns: bake sales and non-uniform days are easy but raise little each; raffles and auctions raise more but need donated prizes and, in many places, a licence or rules for lotteries; events (quiz nights, fairs, discos, fun runs) raise most but need many volunteers, insurance, and food hygiene and alcohol rules; ongoing schemes (matched giving from employers, uniform sales, recycling schemes, online shopping cashback) yield slowly with little effort; sponsored challenges work well when the cause is visible. The same audience asked too often tires out, so a mix across the year beats many small asks. Rules on raffles, lotteries, alcohol, food, collections and data vary by country and local authority, so ideas must come with "check" notes rather than legal claims.

Group: {{group}}
Resources: {{resources}}
{{#tried}}
Tried before: {{tried}}
{{/tried}}
</context>

<task>
1. If the target, deadline or volunteer count is missing, ask up to two questions and stop.
2. Generate 15 to 20 ideas across types: quick sales and dress-up days, raffles and auctions, events, sponsored challenges, ongoing low-effort schemes, and business or employer support.
3. Rate each: volunteer effort (low, medium, high), upfront cost (none, low, medium), likely yield as a rough range relative to the target based on the audience size given, and main risk.
4. Note any rules to check for each idea that needs them (raffles and lotteries, alcohol, food hygiene, public collections, permissions for venues, safeguarding for children's events).
5. Build a shortlist of four or five that together could reach the target by the deadline with the volunteers available, in a sensible order.
6. Add three ideas for thanking donors and showing progress.
</task>

<constraints>
- Yield estimates are rough and depend on the audience; show your reasoning, and never present them as guaranteed.
- Do not state laws or licence requirements as fact; say what to check with the local authority or governing body.
- Avoid ideas that pressure families who cannot afford to give; include at least three no-cost ways to take part.
- Respect anything in the tried-before list that flopped.
</constraints>

<output_format>
## Ideas
Table: Idea | Type | Effort | Upfront cost | Likely yield | Risk | Check.
## Shortlist to reach the target
## Thanking and showing progress
</output_format>
