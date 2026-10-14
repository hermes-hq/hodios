---
schema: 1
id: plan-advocacy-campaign
kind: prompt
title: Plan a nonprofit advocacy campaign
description: Plans a nonprofit campaign to change a specific policy or practice, with a winnable ask, a power map, escalating tactics, the voices of people affected and checks on political activity rules.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit, public-sector]
tags: [advocacy, policy-change, power-mapping, campaign-strategy, lived-experience]
pairs_with:
  prompts: [build-theory-of-change, write-letter-to-elected-official, write-policy-brief]
  personas: [nonprofit-advisor]
args:
  - name: issue
    description: The problem, who it affects, what evidence you have, and the change you want (a law, a regulation, a council decision, a company practice).
    type: text
    required: true
  - name: context
    description: Your organisation (legal form, country, size, reputation, allies), any timing such as an election, budget round or consultation, and the resources you can commit.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The ask, Power map, Allies and opponents, Strategy and tactics, Voices and evidence, Rules and risks, Timeline, How we will know]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan advocacy for a nonprofit. Campaigns usually fail for one of three reasons: the ask is a cause ("end child poverty") rather than a decision someone can make ("the council keeps the holiday food programme in next year's budget"); the campaign targets everyone instead of the few people who can actually decide and the people who influence them; or it opens with its loudest tactic and has nowhere to go. Experienced campaigners pick a specific, winnable ask with a deadline, map power, start with insider tactics and escalate only when needed, put people with lived experience at the centre with support and consent, and keep the organisation inside the rules on political activity, which for charities and tax-exempt bodies can be strict and differ by country.

Issue: {{issue}}
Context: {{context}}
</context>

<task>
1. The ask: turn the issue into one primary ask that names the decision, the decision-maker and the deadline, plus a fallback ask. Test it: specific, winnable within the resources, and linked to the organisation's purpose.
2. Power map: decision-makers and the people and bodies who influence them, placed by power over the decision and current position (support, undecided, oppose), with what each cares about.
3. Allies and opponents: likely allies and coalition partners, likely opponents and their arguments, and the strongest honest answer to each argument.
4. Strategy and tactics: a sequence that starts with insider tactics (briefings, meetings, evidence submissions, consultation responses) and escalates (public letters, media, supporter actions, coalition statements, peaceful public events) only if earlier stages fail, with a trigger for each step.
5. Voices and evidence: how to involve people affected safely and with consent (training, support, the right to withdraw, avoiding exposing them to abuse), and what evidence to gather or commission.
6. Rules and risks: political activity and lobbying rules to check for the organisation's legal form and country (party neutrality, election periods, lobbying registration or limits), funder restrictions, and reputational risks.
7. Timeline aligned with decision points, and how you will know the campaign is working (both the final win and intermediate signs such as a meeting granted or a public commitment).
</task>

<constraints>
- Do not invent facts about politicians, officials, laws or statistics. Use roles where names are unknown.
- Keep the organisation non-partisan: never suggest supporting or opposing a candidate or party; say that rules on campaigning and lobbying by charities and tax-exempt organisations differ by country and must be checked with the regulator's guidance.
- No deceptive tactics: no fake grassroots accounts, no misleading claims, no harassment of officials or opponents.
- Protect people with lived experience: never plan to share their stories without informed consent and support.
</constraints>

<output_format>
## The ask
## Power map
Table: Person or body | Power over decision | Position | What they care about | Approach.
## Allies and opponents
## Strategy and tactics
Table: Stage | Tactic | Trigger to escalate.
## Voices and evidence
## Rules and risks
## Timeline
## How we will know
</output_format>
