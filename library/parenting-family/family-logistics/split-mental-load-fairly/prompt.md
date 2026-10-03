---
schema: 1
id: split-mental-load-fairly
kind: prompt
title: Split the mental load fairly
description: Helps a couple or household make invisible family work visible, from remembering birthdays to booking appointments, and share it out fairly with clear end-to-end ownership.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [notes, text]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mental-load, invisible-work, household-fairness, couples, domestic-labour, ownership]
pairs_with:
  prompts: [coordinate-family-calendar, create-chore-chart, plan-family-meeting, plan-relationship-check-in]
args:
  - name: household
    description: Who lives there, children's ages, and each adult's paid work hours and commute, for example "two adults; A works 40 h plus 1 h commute, B works 24 h from home; kids 3 and 7".
    type: text
    required: true
  - name: current_split
    description: Who does what now, as honestly as you can, including the remembering and planning, not only the doing. Optional.
    type: text
  - name: friction_points
    description: Where it hurts, for example "I'm the only one who knows when the vaccinations are due", "he does the tasks but I have to ask", "we fight about the school WhatsApp group". Optional.
    type: text
output_contract:
  format: markdown
  sections: [The invisible work list, Who carries what now, What fair means for you, Proposed split, Starting the conversation, Handover plan, Weekly sync]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help households share family work fairly, drawing on research about cognitive and emotional labour. Much family work is invisible: noticing that something is needed, planning it, deciding, remembering, and following up. Splitting only the visible tasks ("you do the dishes") leaves one person as the household manager who must remember and ask. Real relief comes from end-to-end ownership: the owner of a job notices, plans, does and follows up, to a standard both agree, without reminders. Fair rarely means 50/50 per task; it means a total load, paid and unpaid, that both adults accept as fair.

<household>
{{household}}
</household>
{{#current_split}}
<current_split>
{{current_split}}
</current_split>
{{/current_split}}
{{#friction_points}}
<friction_points>
{{friction_points}}
</friction_points>
{{/friction_points}}
</context>

<task>
1. The invisible work list: an inventory of family jobs grouped by area (children's health and school, social calendar and gifts, meals and food shopping, home and repairs, money and admin, relatives and caring, pets, the emotional temperature of the family), tailored to this household. Under each job, show the hidden parts: noticing, planning, deciding, doing, following up.
2. Who carries what now: from the current split and friction points, a table showing who holds each part. Where information is missing, mark it "?" and give a five-minute exercise for both adults to fill it in separately, then compare.
3. What fair means for you: weigh total load, including paid work hours, commute and caring, so the split reflects this household rather than a 50/50 rule; state the assumptions you made.
4. Proposed split: assign whole jobs with end-to-end ownership, favouring jobs that cluster naturally (for example one person owns everything about school), each with a short agreed standard of done and a "minimum standard" for busy weeks. Rebalance any job that consistently falls to one person, and flag the friction points directly.
5. Starting the conversation: an opening script for the person raising it that describes the load without blame ("I want us to look at the remembering and planning together, because I'm running out of room for it"), and how to respond if the other adult feels criticised.
6. Handover plan: how to hand a job over properly (share the information, contacts and logins they need, then step back), and the rule that the new owner may do it differently as long as the standard is met; no checking up or redoing.
7. Weekly sync: a 15-minute weekly agenda (the week ahead, who owns what, anything dropped, one appreciation each) and a shared calendar or list setup.
</task>

<constraints>
- No gender assumptions about who does what; use the names or labels the household gave.
- Stay neutral and non-blaming; describe patterns, not character.
- If the description suggests control, intimidation or fear rather than an unfair split, say gently that this is beyond a chores plan and point to relationship or domestic abuse support.
- Do not name or reproduce commercial card systems or methods; describe the ideas in your own words.
- Before answering, check that every job in the proposed split has one owner and a standard of done.
</constraints>

<output_format>
## The invisible work list
## Who carries what now
Table: Job | Notices | Plans | Does | Follows up.
## What fair means for you
## Proposed split
Table: Job | Owner | Standard of done | Busy-week minimum.
## Starting the conversation
## Handover plan
## Weekly sync
</output_format>
