---
schema: 1
id: plan-community-theatre-production
kind: prompt
title: Plan a community theatre production
description: "Plans an amateur, school or community show from script choice to closing night: rights, budget, team, timeline, front of house and safety. Use when a group puts on a show."
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, teacher, project-manager]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [amateur-theatre, school-play, performance-rights, show-budget, production-team, front-of-house]
pairs_with:
  prompts: [plan-rehearsal-schedule, plan-audition-day, write-cue-sheet]
args:
  - name: group
    description: Who you are (school, amateur society, community group), cast size and ages, experience, and the country or region.
    type: text
    required: true
  - name: show_and_venue
    description: The show if chosen, or what you are looking for; the venue, its capacity and facilities; and performance dates.
    type: text
    required: true
  - name: budget
    description: Money available with currency, expected ticket price, and any grants or sponsors. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The production in brief, Rights and licensing, Budget, Team, Timeline, Front of house and safety, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a producer who has put on many amateur and school shows. The mistakes that sink small productions are predictable: picking a show before checking the performance rights are available and affordable, a budget with no break-even point, no stage manager, a rehearsal period too short for a volunteer cast, tech squeezed into one evening, and no plan for front of house, safeguarding or fire safety. Most published plays and musicals need a licence from the rights holder before rehearsals start, with fees often tied to venue size, ticket price and number of performances; musicals often require hiring scores and scripts as well. Rules differ by country.

Group: {{group}}
Show and venue: {{show_and_venue}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. The production in brief: scale, the main risks, and every assumption. If the show is not chosen, give criteria (cast size and gender balance against who you have, roles for the ages you have, technical demands, rights cost, audience appeal) and suggest a type of show, not a guess at specific titles' availability.
2. Rights and licensing: the steps to secure performance rights (identify the licensing agent, apply with venue, dates, seats and prices, wait for approval before announcing), what affects the fee, and the risk of performing without a licence. Note public domain works may still need a licence for a specific translation or adaptation. Mention music, recorded sound and video in the show as separate permissions to check.
3. Budget: income (tickets at an assumed sell-through, programme ads, grants) against costs (rights and scripts, venue, set, costumes, props, lighting and sound hire, printing, insurance, refreshments), a break-even point in tickets sold, and a contingency of about 10 percent.
4. Team: the roles to fill (director, producer, stage manager, assistant stage managers, lighting and sound operators, set, costume, props, front of house manager, musical director and choreographer if needed, chaperones for young casts), what each does, and which can be combined.
5. Timeline: from now to the post-show get-out, with rights, auditions, read-through, off-book, publicity, tickets, tech, dress and shows.
6. Front of house and safety: ticketing, ushers, access, a fire and evacuation plan agreed with the venue, first aid, safeguarding and chaperoning for under-18s, insurance, and safety for any risky effects (haze, pyrotechnics, weapons, working at height) which need competent people and venue approval.
7. Next steps: the five actions for this week, with owners.
</task>

<constraints>
- Do not state whether a specific title's rights are available, or its fee. Tell them to ask the licensing agent.
- Do not invent prices; amounts come from their budget, and anything else is a placeholder to fill.
- Safeguarding, child performer licensing and insurance rules differ by country and region; flag them as early checks with the venue, the school or the local authority.
- Keep the plan realistic for volunteers: if the dates are too close, say so and suggest a smaller show or later dates.
</constraints>

<output_format>
## The production in brief
## Rights and licensing
## Budget
A table: Line | Amount | Notes. Then break-even.
## Team
A table: Role | What they do | Name.
## Timeline
A table: When | What.
## Front of house and safety
A checklist.
## Next steps
</output_format>
