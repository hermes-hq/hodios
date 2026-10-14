---
schema: 1
id: coach-new-manager-on-team
kind: prompt
title: Coach a newly promoted manager who reports to you
description: Helps a manager of managers support a newly promoted manager through their first months, with expectations, a coaching rhythm, skills to build, checkpoints and warning signs to act on early.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, executive, operations-manager]
requires: [none]
inputs: [notes]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [manager-of-managers, first-time-managers, coaching-plan, leadership-development, checkpoints]
pairs_with:
  prompts: [run-skip-level-meetings, coach-with-grow-model, plan-transition-to-manager]
  personas: [leadership-coach]
args:
  - name: new_manager
    description: The new manager's background (initials only), strengths, what you expect will be hard for them, the team they now lead (size, seniority, any former peers or difficult situations) and how much time you can give them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What success looks like, Your coaching rhythm, Skills to build, Checkpoints, Warning signs, Your first conversation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help senior managers develop the managers who report to them. Most new managers are promoted for being good at the work and then left alone, on the assumption that they will pick it up. Predictable struggles follow: continuing to do the work themselves instead of delegating, avoiding hard feedback, saying yes to everything from above, either micromanaging or disappearing, not running one-on-ones, and feeling lonely and unsure if they are doing well because output is no longer the measure. The manager's manager can prevent most of this by being explicit about what success looks like in the new role, meeting often in the first months, teaching through real situations rather than theory, watching for early signals through skip-levels and the team's work, and making it safe to admit they are struggling. Doing the new manager's hard conversations for them undermines them; preparing them for those conversations builds them.

<new_manager>
{{new_manager}}
</new_manager>
</context>

<task>
1. What success looks like: three to five outcomes for their first six months, focused on the team (one-on-ones running, clear priorities, feedback given, a healthy team), not their individual output. Include what they should stop doing.
2. Your coaching rhythm: how often to meet in months one to three and after, a standing agenda for those sessions (a real situation they are facing, a skill, how they are doing), and how to use real moments (preparing for a hard conversation, reviewing a delegation).
3. Skills to build: a table of the skills most likely to need work given their background, how each will show up, and how to build it (practice, shadowing, a resource, feedback).
4. Checkpoints: what to check at 30, 60 and 90 days, and how to gather signals (skip-levels, team pulse, peer feedback) without undermining them.
5. Warning signs: early signals of trouble (doing the work themselves, team going quiet, escalating everything, avoiding a problem person) and the response to each.
6. Your first conversation: an outline for the kickoff conversation that sets expectations, asks how they feel, and agrees how you will work together.
</task>

<constraints>
- Use only the facts given; mark gaps [X].
- Do not advise the senior manager to take over the new manager's hard conversations or decisions, except where there is legal or safety risk.
- Skip-level conversations must not be used to go around the new manager or collect gossip.
- Keep the plan within the time the senior manager says they have.
</constraints>

<output_format>
## What success looks like
## Your coaching rhythm
## Skills to build
Table: Skill | How it will show up | How to build it.
## Checkpoints
## Warning signs
Table: Sign | What it may mean | Your response.
## Your first conversation
</output_format>
