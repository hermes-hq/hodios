---
schema: 1
id: manage-staff-attendance-issues
kind: prompt
title: Manage staff attendance issues fairly
description: Plans how a manager of hourly or shift staff handles lateness, no-shows and absence patterns fairly, with a return conversation script, policy steps, support to offer and records to keep.
category: people-management
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [text, notes, document]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [attendance, absence-management, lateness, no-call-no-show, return-to-work-interview, shift-work]
pairs_with:
  prompts: [address-underperformance-early, write-written-warning, plan-one-on-one]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: situation
    description: What has happened - the pattern of lateness, absences or no-shows with dates if you have them, the role and shift pattern, how long the person has worked there, anything they have said about why, and what you have done so far.
    type: text
    required: true
  - name: policy
    description: Your current attendance rules - how to report absence, how lateness is counted, trigger points, any points or warning system, sick pay rules. Paste the policy if you have it; leave empty if there is none written down.
    type: text
  - name: country
    description: Country (and state or region) where the person works, because sick leave, protected leave, disability and dismissal rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the pattern shows, Check before you act, The conversation, Support to offer, Policy steps, Records, When to get HR or legal advice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Attendance problems in shift work hit the rest of the team fast: someone covers, a rota breaks, customers wait. Managers often swing between ignoring it for months and jumping straight to a warning. The fair route is consistent and early: look at the actual pattern, find out why before deciding what it means, offer reasonable support, set a clear expectation, and follow the written policy the same way for everyone. Some absences carry legal protection (disability, pregnancy, family or medical leave, jury service, union duties and others, depending on the country), and points systems that count every absence the same can create risk when part of the pattern is protected.

<situation>
{{situation}}
</situation>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
Country: {{country}}
</context>

<task>
1. What the pattern shows: summarise the facts (how many incidents, of what kind, when, any timing pattern such as Mondays, early shifts or after rota changes), what is known about causes, and what is assumption. If the dates or the kind of absence are unclear, list what to find out first.
2. Check before you act: whether others with similar records have been treated the same way; what the policy says (or that there is no written policy and what that means for consistency); whether any absence may relate to illness, disability, pregnancy, caring duties or another protected reason, and what to check for {{country}}; a welfare check if a no-show could mean the person is unwell or in danger, especially for lone workers.
3. The conversation: a private, calm script - opening that states the facts without judgement, open questions to understand the cause, listening, support options, the clear expectation going forward, what happens next under the policy, and an agreed review date. Include responses for "my bus is always late", "it's my kids", "I've been ill", silence, and anger.
4. Support to offer, matched to the likely causes: a shift change or swap, a later start for a set period, a clear absence reporting route, an occupational health or doctor referral, an employee assistance programme, adjustments for a health condition.
5. Policy steps: a ladder from informal conversation to documented conversation to formal stages, as the policy defines them (or a sensible fair sequence if there is none), with what triggers each step and the review period. Note that formal warnings usually need a proper process and the right to respond.
6. Records: what to note after the conversation and how to keep it factual, plus a short follow-up note to send the employee confirming what was agreed.
7. When to get HR or legal advice: before any formal warning or dismissal, when a health condition, pregnancy or protected leave may be involved, when the employee raises a grievance, or when union or collective agreement terms apply.
8. Before answering, check the script contains no diagnosis, no assumptions presented as fact, and nothing that singles the person out compared with how others are treated.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Fair, firm and humane: the aim is reliable attendance, not punishment.
- Do not diagnose or speculate about health. If health may be involved, treat it as a possible need for support or adjustments and suggest occupational health or medical input.
- Do not state employment law, sick pay rules, protected leave rights or dismissal procedures as fact for {{country}}; name what to check and with whom (HR, the official labour authority, an employment adviser).
- Never suggest disciplining for a protected reason, contacting the employee's doctor without consent, or discussing the person with the team.
- Use only the facts given; mark missing details as [X] with a question.
</constraints>

<output_format>
Start with one sentence: this is a fair-process plan, not legal advice, and the rules for {{country}} named below must be checked before any formal step.
## What the pattern shows
Facts, then assumptions, then what to find out.
## Check before you act
Checklist.
## The conversation
Script, then a table: They say | You say.
## Support to offer
## Policy steps
Table: Step | Trigger | What happens | Review period.
## Records
What to note, then the follow-up note to the employee.
## When to get HR or legal advice
</output_format>
