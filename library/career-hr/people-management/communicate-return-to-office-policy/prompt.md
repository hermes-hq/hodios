---
schema: 1
id: communicate-return-to-office-policy
kind: prompt
title: Apply an office attendance policy with your team
description: Plans how a manager explains and applies an office attendance policy to their team - the team conversation, answers to pushback, individual exception requests and handling non-compliance fairly.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager]
advice_risk: [legal]
requires: [none]
inputs: [document, notes]
output: [script, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [return-to-office, hybrid-work, attendance-policy, exception-requests, pushback]
pairs_with:
  prompts: [assess-flexible-working-request, plan-workplace-adjustments-as-manager, handle-team-resistance-to-change]
  personas: [hr-business-partner]
args:
  - name: policy
    description: What the policy says (days required, start date, exceptions process, how attendance is tracked) and the reason the company gave.
    type: text
    required: true
  - name: team
    description: Your team's current pattern, where people live, known circumstances (caring duties, disabilities, people hired as remote, long commutes), how they are reacting, and how much discretion you have. Use initials. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your own position, Team conversation, Answers to pushback, Individual situations, Making office days worth it, Handling non-compliance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help line managers carry out an office attendance or return-to-office policy they may not have chosen. The manager is caught between leadership and the team, and the common mistakes come from that: disowning the policy ("I don't agree either, but…"), which invites the team to ignore it; enforcing it rigidly without looking at individual circumstances; making private side deals that the rest of the team sees as unfair; or saying nothing and letting attendance drift. People who were hired as remote, people with disabilities or caring responsibilities, and people who have a contractual or statutory right to request flexible working may need a separate, proper process. Good practice: explain the reason honestly, be clear about what is fixed and what is flexible, make office days useful (planned overlap, not people on video calls from desks), route individual requests through the formal process consistently, and address non-compliance privately and early.

<policy>
{{policy}}
</policy>
{{#team}}
<team>
{{team}}
</team>
{{/team}}
</context>

<task>
1. Your own position: how to be honest about your view without undermining the policy, and what to clarify with your manager or HR first (discretion you have, exceptions process, how attendance will be measured, consequences).
2. Team conversation: an outline and key lines for the team meeting, stating the policy, the reason, what is fixed and what is flexible, how office days will work, and how to raise individual circumstances.
3. Answers to pushback: honest answers to common objections (commute cost and time, productivity at home, "I was hired remote", childcare, "leadership doesn't come in either", "we will just be on video calls").
4. Individual situations: for each circumstance in the input, the likely route (informal flexibility within your discretion, a formal flexible working request, an adjustment request, a contract question for HR), handled consistently.
5. Making office days worth it: concrete ways to make in-office days valuable (anchor days, team rituals, collaborative work, fewer calls).
6. Handling non-compliance: a private, curious first conversation, then clear expectations, then escalation under policy with HR; how to keep it consistent across the team.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state employment law rights (flexible working, contractual remote status, disability adjustments) as fact; list what HR must confirm.
- Do not suggest secret individual deals outside the policy's process.
- Do not invent policy details; mark unknowns [X].
- Treat people with disabilities, caring duties or remote contracts through proper processes, not as general complainers.
</constraints>

<output_format>
## Your own position
## Team conversation
## Answers to pushback
Table: Objection | Honest answer.
## Individual situations
Table: Person | Circumstance | Route | Who decides.
## Making office days worth it
## Handling non-compliance
</output_format>
