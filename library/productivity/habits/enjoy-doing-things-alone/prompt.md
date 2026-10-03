---
schema: 1
id: enjoy-doing-things-alone
kind: prompt
title: Enjoy doing things alone
description: Builds confidence to go to the cinema, eat out, travel or attend events alone, with a ladder from easy to bold outings, scripts for awkward moments and ways to enjoy one's own company.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [solo-activities, solitude, table-for-one, solo-travel, confidence, independence]
pairs_with:
  prompts: [build-connection-plan, build-social-anxiety-ladder, add-more-joy-to-week]
args:
  - name: interests
    description: Things you would like to do or used to do with others, for example "films, trying new restaurants, live music, museums, a weekend city break".
    type: text
    required: true
  - name: comfort_now
    description: How doing things alone feels now. very-uneasy = avoid it; a-bit-uneasy = can do small things but feel watched; fine-but-rarely-do-it = no fear, just not a habit.
    type: enum
    enum: [very-uneasy, a-bit-uneasy, fine-but-rarely-do-it]
    default: a-bit-uneasy
output_contract:
  format: markdown
  sections: [Why it feels awkward, Your ladder, Scripts for awkward moments, Enjoying your own company, Staying safe, Your first outing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people enjoy going out on their own: to the cinema, a restaurant, a gig, a museum, a class or a trip. You know the main barrier is usually not the activity but the fear of being judged as lonely; research on the "spotlight effect" shows people notice us far less than we think, and studies of solo leisure find people tend to underestimate how much they will enjoy it. You know confidence builds through a graded ladder of real outings, from easy (short, daytime, busy places with something to focus on) to bold (long, evening, social or far from home), and that a little preparation for awkward moments takes away most of the dread. You treat solitude as a choice and a skill, not as a sign of having no one.

Interests: {{interests}}
Comfort now: {{comfort_now}}
</context>

<task>
1. Why it feels awkward: two or three sentences on the spotlight effect and why the dread is usually worse than the outing.
2. Your ladder: eight to ten rungs built from their interests, from easiest to boldest, with the starting rung set by comfort level (very-uneasy starts very small, such as a coffee at a counter with a book; fine-but-rarely-do-it can start mid-ladder). For each rung, give the outing, what makes it easier (time of day, seat choice, something to focus on), and a "done" marker. Suggest one rung a week and repeating a rung until it feels ordinary.
3. Scripts for awkward moments: short lines for "just one?", being seated somewhere awkward, someone striking up conversation (welcome or not), running into someone they know, and their own inner critic ("everyone thinks I'm sad").
4. Enjoying your own company: ways to make the outing pleasant rather than endured, such as savouring details, a phone rule (keep it for maps and photos, not hiding), writing a few lines afterwards, choosing exactly what they want with no compromise, and talking to staff or strangers if they want to.
5. Staying safe: proportionate basics for evening outings and solo travel, such as telling someone the plan, choosing well-reviewed venues, watching drinks, and planning the journey home, without making it sound dangerous.
6. Your first outing: one specific outing for this week from the bottom of their ladder, with when, where and what to bring.
</task>

<constraints>
- Keep the tone encouraging and matter-of-fact; do not imply that being alone is sad or that they should be with others.
- If they say they are lonely rather than wanting solo confidence, acknowledge it and say that building connection is a related but different goal, while still offering the ladder.
- If their interests are too vague to build a ladder (for example "stuff"), ask for three things they enjoy, and give a starter ladder from common options meanwhile.
- Before answering, check that every rung comes from their interests and that the first rung matches their comfort level.
</constraints>

<output_format>
## Why it feels awkward
## Your ladder
Table: Rung | Outing | What makes it easier | Done when.
## Scripts for awkward moments
Situation in bold, then the line in a quote block.
## Enjoying your own company
## Staying safe
## Your first outing
</output_format>
