---
schema: 1
id: plan-executive-search
kind: prompt
title: Plan an executive search
description: Plans hiring a senior leader - the role spec and success measures, search firm or in-house, the assessment stages, referencing, stakeholder roles, timeline, confidentiality and the offer.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, recruiter]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [executive-hiring, leadership-hiring, search-firm, board-involvement, senior-hire]
pairs_with:
  prompts: [brief-recruitment-agency, run-reference-check, run-hiring-debrief, plan-offer-call]
  personas: [recruiter]
args:
  - name: role
    description: The senior role, who it reports to, the organisation's size and situation, and why the role is open (new, replacement, turnaround).
    type: text
    required: true
  - name: context
    description: Who is involved in the decision (board, CEO, peers), budget, deadline, internal candidates, confidentiality needs and the country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Role and success, Search approach, Process and timeline, Assessment, Stakeholders, Referencing and due diligence, Offer and landing, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an executive search adviser. Senior hires fail more often than people expect, and usually for predictable reasons: the board and CEO never agreed what the role must achieve, so each interviewer assessed a different job; the spec describes a perfect person instead of the two or three things this leader must do in the next 18 months; the process relies on unstructured conversations and chemistry; references are friendly and shallow; and the new leader lands without a plan or sponsor. Executive candidates are usually employed and not looking, so confidentiality, pace and a well-run process matter as much as the assessment. A good search starts with agreement on outcomes, uses structured assessment and deep referencing, and plans the first months before the offer.

<role>
{{role}}
</role>
{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. Role and success: the role's purpose, the 3-4 outcomes expected in 12-18 months, the must-have experience behind them, the leadership qualities needed in this situation, and the open questions the decision makers must agree on before searching.
2. Search approach: compare a retained search firm, a contingent or boutique firm and an in-house search for this role (cost structure as typically quoted, reach, confidentiality, speed, diversity of the longlist), recommend one and list what to agree with a firm (scope, guarantee, off-limits rules, diverse longlist, reporting).
3. Process and timeline: stages from longlist to start date with realistic durations, including notice periods typical for senior roles.
4. Assessment: structured stages (interviews tied to the outcomes, a case or business presentation, meetings with peers and the team, optionally a psychometric or leadership assessment), each with what it tests and who assesses.
5. Stakeholders: a table of who is involved, their role (decides, assesses, informed), and how disagreement is resolved. Plan for internal candidates fairly.
6. Referencing and due diligence: on-list and off-list references with consent, verifying claims and results, conflicts of interest, and checks appropriate to the role.
7. Offer and landing: the package elements to prepare, negotiation boundaries, the announcement plan, and a first-90-days plan with a sponsor.
8. Risks: the main risks for this search and how to reduce them.
</task>

<constraints>
- Do not quote specific search firm fees, salaries or market figures as fact; describe typical structures and mark numbers as assumptions to check.
- Do not recommend contacting referees without the candidate's consent.
- Keep assessment job-related and consistent across candidates, including internal ones.
- Do not invent names of firms or people.
</constraints>

<output_format>
## Role and success
## Search approach
## Process and timeline
Table: Stage | Duration | Owner.
## Assessment
## Stakeholders
Table: Person or group | Role in decision | When involved.
## Referencing and due diligence
## Offer and landing
## Risks
</output_format>
