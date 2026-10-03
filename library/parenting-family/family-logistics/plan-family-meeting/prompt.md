---
schema: 1
id: plan-family-meeting
kind: prompt
title: Plan a family meeting
description: Plans a family meeting on a shared issue such as care for a parent, money or holidays, with an agenda, ground rules, roles, a decision method and a summary to send afterwards.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-meeting, facilitation, siblings, shared-decisions, ground-rules, ageing-parents]
pairs_with:
  prompts: [build-care-rota, plan-parent-care-conversation, prepare-difficult-conversation]
  personas: [eldercare-advisor]
args:
  - name: issue
    description: What needs deciding and why now, the facts everyone should know, what has been tried, where people disagree, and any history that makes it tense.
    type: text
    required: true
  - name: attendees
    description: Who will be there and how, for example "my brother (local), my sister (abroad, joins by video), our mum (the subject of the meeting), my partner", plus anyone who should be involved but is not.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose and outcome, Before the meeting, Agenda, Ground rules, Roles, How we will decide, Handling hard moments, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families run meetings that end with decisions instead of old arguments. Family meetings go wrong when people arrive with different facts, the loudest voice decides, old roles take over ("the responsible one", "the baby"), or the person most affected is talked about instead of with. They go better with a clear purpose, facts shared in advance, agreed ground rules, a neutral facilitator (sometimes someone outside the family), a round where everyone speaks before anyone argues, and written actions with owners and dates.

<issue>
{{issue}}
</issue>

<attendees>
{{attendees}}
</attendees>
</context>

<task>
1. Purpose and outcome: one sentence each for why the family is meeting and what a good result looks like (for example, "agree how Mum's care is covered for the next three months and who pays for what"). Narrow it if the issue is too big for one meeting, and say what is left for later.
2. Before the meeting: what to share in advance (the facts, options already known, costs, any professional input such as a doctor's or social worker's view), how to invite people (a short invitation message), and short one-to-one calls with anyone likely to feel ambushed. Include the person the decision is about wherever possible and appropriate, and how to make it easy for them (time of day, place, hearing or memory needs).
3. Agenda: a timed agenda of 60–90 minutes: welcome and purpose, ground rules, the facts, a round where each person shares their view and what they can offer without interruption, options, decision, actions, and the next check-in.
4. Ground rules: five or six short rules suited to this family (one person speaks at a time, talk about the issue not the person, no rehashing the past, phones away, it is fine to pause).
5. Roles: facilitator (ideally someone who can stay neutral; suggest an outside facilitator or mediator if conflict is high), note-taker, timekeeper; how remote attendees take part fairly.
6. How we will decide: the decision method that fits the issue (the person whose life it is decides with support; consensus; agreement that everyone can live with; or a majority for small logistics), stated before the meeting, and what happens if no decision is reached.
7. Handling hard moments: short scripts for the facilitator when someone dominates, goes silent, gets upset, or brings up old grievances, and when to call a break.
8. After the meeting: a summary template (decisions, actions with owners and dates, open questions, next meeting) to send within a day.
</task>

<constraints>
- Stay neutral between family members; describe behaviour and needs, not character.
- Respect the autonomy of the person most affected; an adult with capacity makes their own decisions.
- For money, inheritance, property or legal authority (power of attorney, guardianship), note that the family should get advice from a lawyer or financial adviser before acting, and do not give that advice yourself.
- If the issue involves abuse, neglect or a person at risk, say that it needs adult or child protection services, not only a family meeting.
- Use only the facts given; mark assumptions and ask about anything that changes the plan.
</constraints>

<output_format>
## Purpose and outcome
## Before the meeting
Include the invitation message.
## Agenda
Table: Time | Item | Lead | Outcome.
## Ground rules
## Roles
## How we will decide
## Handling hard moments
Scripts in quotes.
## After the meeting
Summary template.
</output_format>
