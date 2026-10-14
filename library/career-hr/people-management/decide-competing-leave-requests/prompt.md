---
schema: 1
id: decide-competing-leave-requests
kind: prompt
title: Decide clashing holiday or leave requests fairly
description: Helps a manager decide between clashing holiday or leave requests with clear rules, minimum cover, history and statutory rights, then explain the decision and set a fairer system for next time.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, engineering-manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [annual-leave, holiday-requests, fairness, cover-planning, peak-periods]
pairs_with:
  prompts: [plan-key-person-cover, rebalance-team-workload, plan-shift-team-huddle]
  personas: [hr-business-partner]
args:
  - name: requests
    description: Who asked for which dates (initials), when they asked, the type of leave (annual, religious observance, family event, school holidays, parental or carer's), who had the same period last time, and how many people you need working.
    type: text
    required: true
  - name: policy
    description: Your leave policy as you know it (first come first served, blackout periods, rotation, minimum notice) and the country where the team works. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The clash, Rules and rights to check, Options, Recommendation, Telling people, A fairer system for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers decide clashing leave requests, a small decision that causes outsized resentment when handled badly. Disputes usually come from unwritten rules: first-come-first-served favours people who book early; "parents get school holidays" breeds resentment from everyone else; the manager's favourites seem to win; the same people always cover Christmas or Eid or summer. Some leave is not simply discretionary: statutory leave types (parental, carer's, some medical) and requests linked to religious observance may carry legal protections, and policies or contracts may set notice and approval rules. A fair decision looks at the written policy, the minimum cover needed (check it is real, not habit), what each person had last time, the type and importance of each request, and alternatives such as partial overlap, swapping, temporary cover or splitting the period. Explaining the reasoning matters as much as the decision.

<requests>
{{requests}}
</requests>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. The clash: summarise the requests, the overlap, and the minimum cover actually needed. Question whether the cover number is a real requirement.
2. Rules and rights to check: what the policy says, which requests may be statutory or protected (to be confirmed with HR for the country), and any notice rules.
3. Options: three or four options (approve all with temporary cover, split dates, rotate based on last time, approve by request order, ask the team to agree swaps), each with fairness and operational effects.
4. Recommendation: the fairest workable option and the reasoning in plain words.
5. Telling people: a short, respectful message to each person whose request is refused or changed, with the reason and what they can do (alternative dates, priority next time).
6. A fairer system for next time: a simple written rule set (booking windows, rotation for peak periods, how religious and family events are weighed, how swaps work) the team can see.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory leave rights for any country as fact; list what HR must confirm.
- Do not rank requests by the type of family someone has or whether they have children unless the policy says so; treat all personal reasons with respect.
- Use only the facts given; mark gaps [X].
</constraints>

<output_format>
## The clash
## Rules and rights to check
## Options
Table: Option | Fairness | Operational effect.
## Recommendation
## Telling people
## A fairer system for next time
</output_format>
