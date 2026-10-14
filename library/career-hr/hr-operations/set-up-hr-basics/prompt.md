---
schema: 1
id: set-up-hr-basics
kind: prompt
title: Set up HR basics
description: Checks a small organisation's HR basics - contracts, records, pay, policies, onboarding, exits - and returns a prioritised gap list and 30-day plan. Use when you have just taken on HR.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, manager, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [small-company, hr-checklist, employment-contracts, employee-records, first-hr-hire, people-ops-basics]
pairs_with:
  prompts: [write-employee-handbook, plan-new-hire-onboarding, write-workplace-policy, answer-employee-hr-question]
  workflows: [set-up-hr-function-track]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: What the organisation does, the country or countries where people work, and how many employees, contractors and part-timers it has.
    type: text
  - name: current_state
    description: What HR exists today - contracts, payroll, a handbook, onboarding, records, who handles HR - and what prompted you to look now. Optional.
    type: text
  - name: concern
    description: A specific problem on your mind, if any (for example "someone just asked about parental leave and we have no policy"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, Gap list, First 30 days, Questions for an adviser, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have just become responsible for HR in a small or growing organisation, often a founder, office manager or first HR hire. They tend to start in the wrong place: a values workshop or an engagement survey while some staff have no written contract, holiday is tracked in someone's head, and personal data sits in a shared folder. The order that protects people and the organisation is: legal basics and records first, then pay and leave done correctly, then the few policies people actually need, then onboarding and exits, then everything else. Employment law differs by country, and sometimes by state or region, so every legal point is something to confirm locally.
{{#organisation}}

<organisation>
{{organisation}}
</organisation>
{{/organisation}}
{{#current_state}}

<current_state>
{{current_state}}
</current_state>
{{/current_state}}
{{#concern}}

<concern>
{{concern}}
</concern>
{{/concern}}
</context>

<task>
1. If you do not know the country and rough headcount, ask these questions and stop:
   1. Where do your people work (country, and state or region if it matters), and how many employees, contractors and part-timers are there? (for example "Germany, 12 employees, 3 freelancers")
   2. What exists today: contracts, payroll, a handbook, records, onboarding? (default: payroll runs, little else is written down)
   3. What made you look at HR now: growth, a problem, a new role? (default: you have just been given responsibility for HR)
   Say that if they answer "just give me the checklist", you will make a general version with every legal point marked "confirm locally". If you have the basics, do not ask; state assumptions in one line and go on.
2. Safety screen: if the input mentions an open dispute, a claim, harassment, discrimination, a safety incident or someone in distress, put that first under Where you stand, say it needs prompt attention from an employment lawyer or adviser, and do not let the checklist delay it.
3. Where you stand: three to five lines on what is in place and the biggest exposure.
4. Gap list across six areas: written terms or contracts for everyone; correct classification of contractors; right-to-work and identity checks; employee records and personal data (what is kept, where, who can see it); pay, working time, holiday and sick leave tracked correctly; the essential policies (at minimum conduct, leave, complaints or grievance, discipline, health and safety, data protection, and any others the country requires); onboarding and leaving. For each item: status from what you were told (in place, partial, missing, unknown), why it matters, and priority (now, this quarter, later).
5. First 30 days: a week-by-week plan that fixes the "now" items first, fitted to someone doing HR part-time, with what to collect, write or decide each week.
6. Questions for an adviser: the specific points to confirm with an employment lawyer, accountant or the national employment authority, phrased so the user can ask them directly.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state employment law, thresholds or deadlines as fact; describe what to check and mark it "confirm locally".
- Keep it proportionate to the headcount: a 10-person team needs a few clear basics, not an enterprise HR model.
- Treat employee data as confidential; suggest access limits, not wider sharing.
</constraints>

<output_format>
## Where you stand
## Gap list
Table: Area | Item | Status | Why it matters | Priority.
## First 30 days
Table: Week | Tasks | Output.
## Questions for an adviser
Numbered.
## Go deeper
One line: "Write an employee handbook", "Plan new-hire onboarding", "Write a workplace policy" or "Answer an employee's HR question" for the next pieces, or "Set up the HR function" to build the whole foundation step by step.
</output_format>
