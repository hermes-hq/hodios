---
schema: 1
id: plan-new-rep-ramp
kind: prompt
title: Plan a new rep ramp
description: Plans a 90-day ramp for a new sales rep with product and customer learning, shadowing, certification role-plays, weekly activity and pipeline milestones and manager check-ins, sized to the cycle.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder]
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
tags: [rep-onboarding, ramp-plan, certification, sales-enablement, first-sales-hire, leading-indicators]
pairs_with:
  prompts: [build-sales-playbook, practise-cold-call, score-discovery-call, quiz-objection-handling]
  personas: [sales-coach]
args:
  - name: role_and_market
    description: The role (SDR, account executive, field rep, account manager), what they sell, to whom, average deal size, inbound or outbound mix, and quota or targets if set. Rough notes are fine.
    type: text
    required: true
  - name: sales_cycle
    description: Typical time from first contact to signed deal (for example "2-3 weeks", "4-6 months").
    type: string
    required: true
  - name: resources
    description: What exists already - playbook, call recordings, CRM, demo environment, product docs, other reps to shadow, a founder who still sells - and the manager's weekly time for the new rep. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ramp assumptions, Weeks 1-2, Weeks 3-6, Weeks 7-13, Certifications, Milestones, Manager check-ins, Gaps to fill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a sales manager, or a founder hiring their first rep, plan the new rep's first 90 days. Ramps fail in familiar ways: the rep reads documents for a month and never practises, or is thrown on the phones on day two with no product knowledge; targets are judged on closed revenue when the sales cycle is longer than the ramp; and the manager has no regular check-in, so problems surface at month three. A good ramp moves from learning to supervised practice to owning a patch, uses certifications (role-plays the rep must pass before doing the real thing), and measures leading indicators (activity, meetings, qualified pipeline, call quality) where closed deals cannot yet be expected.
</context>

<task>
<role_and_market>
{{role_and_market}}
</role_and_market>

Sales cycle: {{sales_cycle}}

{{#resources}}<resources>
{{resources}}
</resources>{{/resources}}

1. Ramp assumptions: what "fully ramped" means for this role, and what the rep can realistically achieve in 90 days given the cycle. If the cycle is longer than about 60 days, the 90-day goals are pipeline and skill milestones, not closed revenue. Suggest a ramped quota schedule only as a percentage of full quota (for example 0%, 25%, 50% by month) and mark it as a proposal to agree, not a fact.
2. Weeks 1-2 (learn): product, customer problems, ideal customer profile, competitors, tools and CRM rules, listening to at least ten recorded or live calls, and meeting customers or customer-facing colleagues.
3. Weeks 3-6 (practise and shadow): reverse shadowing (the rep leads, the experienced seller observes), first real activity in a limited, lower-risk segment, daily or every-other-day feedback.
4. Weeks 7-13 (own): full activity in their patch with weekly targets, deals reviewed in one-to-ones.
5. Certifications: three to five gates (for example pitch, discovery call, demo, objection handling, pricing and proposal), each with what is tested, the passing standard and who signs it off. No customer-facing activity of that type before the gate is passed.
6. Milestones by week: activities, meetings held, qualified opportunities, pipeline value, and quality measures (call scores, CRM hygiene). Size them from the deal size and cycle given; label every number as a starting assumption to adjust after week 4.
7. Manager check-ins: a daily 10-minute stand-up in weeks 1-4, a weekly one-to-one agenda, and day 30, 60 and 90 reviews with the questions to ask and signs the ramp is off track.
8. Gaps to fill: resources the plan needs that are missing.
</task>

<constraints>
- Do not invent benchmarks such as "reps should book 15 meetings a month"; derive targets from the inputs and label them as assumptions.
- Fit the plan to the manager's stated time; if none is given, assume about three hours a week and say so.
- Keep weeks concrete: each has a goal, three to six activities and an output.
- Fair, consistent treatment: the same gates for every new rep; note to align targets and any pay or commission terms with HR and the employment contract.
- If the role or the sales cycle is missing, ask for it and stop.
</constraints>

<output_format>
## Ramp assumptions
Bullets, including the ramped quota proposal.

## Weeks 1-2
Table: Week | Goal | Activities | Output.

## Weeks 3-6
Same table.

## Weeks 7-13
Same table.

## Certifications
Table: Gate | What is tested | Passing standard | Signed off by | By week.

## Milestones
Table: Week | Activities | Meetings | Qualified opportunities | Pipeline | Quality measure.

## Manager check-ins
Daily, weekly and 30-60-90 review agendas, plus warning signs.

## Gaps to fill
Bullets.
</output_format>
