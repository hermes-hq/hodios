---
schema: 1
id: write-sales-roleplay-scenarios
kind: prompt
title: Write sales role-play scenarios
description: Builds a set of role-play cards for a sales team training session, each with a rep brief, a buyer brief with hidden objections, success criteria and a scoring sheet for observers.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, sales-rep, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [sales-training, role-play-cards, sales-enablement, team-workshop, coaching]
pairs_with:
  prompts: [build-sales-playbook, plan-new-rep-ramp, quiz-objection-handling]
  personas: [sales-coach]
args:
  - name: team_and_offer
    description: What the team sells, to whom, typical deal and sales stages, and the team's experience level.
    type: text
    required: true
  - name: skills_to_train
    description: The skills to focus on, such as cold call openers, discovery, objection handling, pricing, negotiation, closing, renewal or upsell. Include problems you have seen on real calls.
    type: text
    required: true
  - name: session
    description: Session length, number of people, and format (in person or video). For example "90 minutes, 8 reps, in person".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Session plan, Scenario cards, Scoring sheet, Facilitator notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design role-play training for sales managers. Team role-plays often fail: the "buyer" is a colleague who either caves immediately or turns hostile for fun, scenarios are vague ("sell to a CFO"), there are no clear success criteria, and feedback is general praise. Role-play works when each scenario is specific and realistic, the buyer has a written brief with hidden information that only good skill reveals, each round is short (8 to 12 minutes) with a clear goal, and observers score against observable behaviours with quoted evidence.

Use groups of three (rep, buyer, observer) and rotate so everyone plays each role. Start with an easier scenario to build confidence, then harder ones. Base scenarios on real deals and objections the team faces, anonymised.
</context>

<task>
Build the role-play session.

<team_and_offer>
{{team_and_offer}}
</team_and_offer>

<skills_to_train>
{{skills_to_train}}
</skills_to_train>

<session>
{{session}}
</session>

1. Plan the session: timings for intro, rounds, debriefs and close, with groups and rotations that fit the number of people. If the numbers do not divide evenly, say how to handle it.
2. Write one scenario card per round, in increasing difficulty, each with: the skill being trained; a rep brief (situation, what they know, the goal for the round); a buyer brief (role, company, real situation, hidden objection or blocker, what the rep must do to unlock it, how to react to weak and strong moves); and success criteria.
3. Write a scoring sheet for observers: four to six observable behaviours, a 1 to 3 scale with what each score looks like, and space for one quoted line and one suggested better line.
4. Write facilitator notes: how to brief buyers to stay realistic, how to run a two-minute debrief per round, and common pitfalls.
</task>

<constraints>
- Base scenarios on the offer and problems given; do not invent product features, prices or customer names. Use placeholders where details are needed.
- Buyer briefs must be realistic: neither instant agreement nor hostility for its own sake.
- Keep each card readable on one printed page.
- Feedback criteria must be observable behaviours, not personality traits.
</constraints>

<output_format>
## Session plan
Table: Time | Activity | Groups.

## Scenario cards
For each card: title, skill, Rep brief, Buyer brief, Success criteria.

## Scoring sheet
Table: Behaviour | 1 | 2 | 3. Then the quote and better-line boxes.

## Facilitator notes
Bullets.
</output_format>
