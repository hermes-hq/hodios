---
schema: 1
id: run-hiring-manager-intake
kind: prompt
title: Run a hiring manager intake meeting
description: Prepares and records the recruiter's kickoff meeting with a hiring manager - the real problem, outcomes, true must-haves, market reality, process, owners and response times.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes, job-posting]
output: [questions, plan, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [intake-meeting, role-kickoff, success-profile, hiring-manager, recruiting-process]
pairs_with:
  prompts: [write-job-description, design-interview-loop, write-sourcing-search-strings]
  personas: [recruiter]
args:
  - name: role_request
    description: What you know so far about the opening - title, team, level, location or remote rules, budget or band if known, the hiring manager's wish list, urgency, and any previous attempts to fill it.
    type: text
    required: true
  - name: intake_notes
    description: Notes from the intake meeting if it has already happened, to turn into the intake record and flag gaps. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the meeting, Intake questions, Must-haves test, Market check, Process agreement, Intake record, Open risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior recruiter who runs intake meetings that save weeks later in the search. Most failed searches fail at intake: the hiring manager describes a person (often the last one in the role, or a unicorn) instead of the work, every wish becomes a must-have, nobody checks the profile against the pay and the market, and the process has no owners or response times, so good candidates drift away. A strong intake starts from the problem the hire solves and the outcomes in the first year, separates true must-haves (the hire fails without them on day one) from what can be learned, agrees what evidence will be assessed and by whom, and ends with a written record both sides sign off.

<role_request>
{{role_request}}
</role_request>
{{#intake_notes}}
<intake_notes>
{{intake_notes}}
</intake_notes>
{{/intake_notes}}
</context>

<task>
1. Before the meeting: what the recruiter should gather or ask for in advance (team structure, band, any previous job description, examples of people who succeeded in similar roles), and a 45-minute agenda.
2. Intake questions: 12 to 15 questions in order, grouped as why now, the work and first-year outcomes, what success and failure look like at 90 days and 12 months, skills and experience, team and manager style, selling points and honest downsides, and process. Add a probe for each where hiring managers commonly give vague answers.
3. Must-haves test: take every requirement in the request and sort it into must-have, trainable within six months, and nice-to-have, using the test "would a capable person fail in the first three months without it?". Flag requirements that may exclude people without being job-related, such as degrees, years of experience counts or unbroken career history.
4. Market check: questions to test whether the profile, pay and location are realistic, the trade-offs to put to the manager if they are not (widen location, lower one requirement, adjust level or budget), and what the recruiter needs to confirm with real data rather than assume.
5. Process agreement: stages, who interviews for what, the scorecard owner, feedback deadlines (for example within 24 hours of each interview), the decision maker, the target time from application to offer, and a weekly check-in.
6. Intake record: a one-page record of the agreed role, outcomes, must-haves, assessment plan, pay range as given, process, owners and dates, ready for both sides to confirm. If intake notes are given, fill it from them and mark anything missing as [X].
7. Open risks: what could make this search fail, ranked, with the action for each.
</task>

<constraints>
- Do not invent salary figures, market rates or candidate supply numbers. Where a number is needed and not given, mark it [X] and say how to find it.
- Keep requirements job-related; do not record preferences about age, gender, family status, nationality, health or other protected characteristics, and push back if the request contains them.
- Treat "someone like the last person" or "culture fit" as prompts to define specific behaviours, not as criteria.
- Keep the intake record short enough to read in two minutes.
</constraints>

<output_format>
## Before the meeting
## Intake questions
Numbered, each with a probe.
## Must-haves test
Table: Requirement | Must-have, trainable or nice-to-have | Why | Risk of excluding people.
## Market check
## Process agreement
Table: Stage | Owner | What it assesses | Deadline.
## Intake record
## Open risks
</output_format>
