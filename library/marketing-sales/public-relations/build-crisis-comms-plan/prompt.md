---
schema: 1
id: build-crisis-comms-plan
kind: prompt
title: Build a crisis communications plan
description: Builds a crisis communications plan before anything goes wrong - likely scenarios, crisis team and decision rights, a first-hour protocol, audience order, templates and drills.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, marketer, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crisis-communications, crisis-plan, scenario-planning, approval-chain, preparedness]
pairs_with:
  prompts: [write-holding-statement]
  personas: [pr-strategist]
args:
  - name: organisation
    description: What the organisation does, its size, locations, the people it serves, who regulates it, and any past incidents.
    type: text
    required: true
  - name: team
    description: The roles available to staff a crisis team (for example chief executive, operations lead, legal adviser, HR, communications) and any gaps.
    type: text
    required: true
  - name: known_risks
    description: Risks you already worry about. Optional; the plan proposes scenarios if empty.
    type: text
output_contract:
  format: markdown
  sections: [Scenarios, Crisis team and decision rights, First-hour protocol, Audience and channel map, Templates, Drills and upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a crisis communications consultant writing a plan in calm times. Plans that work are short enough to use at 2am on a phone: who decides, who speaks, who is told first, and where the templates are. Plans that fail are long binders nobody has read, with approval chains so slow that the organisation's first word comes hours after social media's. The hardest parts are agreed in advance: what counts as a crisis rather than an issue, who can approve a statement when the chief executive is unreachable, and the rule that people affected and staff hear before or with the media. Notification duties to regulators, insurers or authorities vary by sector and country and often run on short clocks.

<organisation>
{{organisation}}
</organisation>

<team>
{{team}}
</team>
{{#known_risks}}
<known_risks>
{{known_risks}}
</known_risks>
{{/known_risks}}
</context>

<task>
1. Scenarios: list eight to twelve realistic scenarios for this organisation (operational failure, safety incident, data breach, misconduct by a leader or staff member, product or service harm, legal or regulatory action, social media backlash, a crisis at a partner or supplier), each rated likelihood and impact (low, medium, high), with the first sign that it is happening. Define three severity levels with plain triggers, for example level 1 handled by the team on duty, level 3 convenes the full crisis team.
2. Crisis team and decision rights: each role, its job in a crisis, a named deputy slot, and who can approve a holding statement in under 30 minutes. Give a two-signature fast-track for holding statements and a fuller route for later statements. Flag any role the team cannot fill.
3. First-hour protocol: a numbered checklist from first alert to first statement: verify, set severity, convene, protect people, confirm facts, pause scheduled marketing, issue holding statement and staff note, start monitoring, set the next update time, start a decision log.
4. Audience and channel map: who must be told, in what order, by whom and on which channel (affected people, staff, board, regulators, insurers, partners, customers, media, the local community). Mark which have legal or contractual notification duties to check.
5. Templates: short fill-in-the-blank holding statement, staff note and customer notice, with [BRACKETS] for the facts.
6. Drills and upkeep: a tabletop exercise outline using one scenario, how often to run it, who owns the plan, when contact lists are re-checked, and an after-action review format.
</task>

<constraints>
- Keep the core of the plan (team, first-hour protocol, audience map) to what fits on two printed pages; put detail after it.
- Do not state specific notification deadlines or laws as fact; list them as items to confirm with legal advisers for the sector and country.
- Do not put real phone numbers or personal data in the plan; use role names and say where the contact sheet is kept.
- Scenarios must fit the organisation described; do not pad with ones that cannot happen to it.
- Put the safety of people before reputation in every protocol step.
</constraints>

<output_format>
## Scenarios
A table: Scenario | Likelihood | Impact | First sign. Then the severity levels.
## Crisis team and decision rights
A table: Role | Job in a crisis | Deputy | Can approve.
## First-hour protocol
Numbered checklist.
## Audience and channel map
A table: Order | Audience | Who tells them | Channel | Duty to check.
## Templates
## Drills and upkeep
</output_format>
