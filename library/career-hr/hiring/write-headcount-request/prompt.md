---
schema: 1
id: write-headcount-request
kind: prompt
title: Write a headcount request
description: Writes a request for a new role with the business problem, the work, full cost, alternatives considered and how success will be measured. Use when asking leadership or finance to approve a hire.
category: hiring
version: 1.0.0
status: incubating
stage: [build]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, text, dataset]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [headcount, business-case, workforce-planning, budget-approval, role-justification]
pairs_with:
  prompts: [write-job-description, plan-first-hire, plan-team-restructure]
  personas: [hr-business-partner, recruiter]
args:
  - name: role
    description: The role you want to add, its level, and whether it is a new position, a backfill or a conversion from contractor.
    type: string
    required: true
  - name: business_need
    description: The problem the role solves, with evidence - workload numbers, backlog, missed revenue or deadlines, risk, customer impact, team capacity - and what happens if you do not hire.
    type: text
    required: true
  - name: cost
    description: The salary range or budget figure, and anything you know about on-costs, recruiting fees, equipment or location. Optional; without it, the request shows a cost structure with placeholders.
    type: string
  - name: alternatives
    description: Options you considered instead, such as contractors, automation, moving work between teams, dropping work, or a lower level. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, The problem, The role, Cost, Alternatives considered, Success measures, Risks and timing, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers write headcount requests that get approved on their merits. Approvers (a department head, finance, the CEO) compare this request with others competing for the same budget. They want to know four things: what business problem goes unsolved without the hire, why a person is the best answer and not a cheaper alternative, what it really costs in total, and how they will know it worked. Weak requests describe the team's workload ("we are stretched") instead of the business impact, quote only base salary, skip alternatives, and set no measure of success. The strongest requests are short, specific and honest about what the team will stop doing if the answer is no.

Role: {{role}}

<business_need>
{{business_need}}
</business_need>
{{#cost}}Cost information: {{cost}}{{/cost}}
{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}
</context>

<task>
1. Summary: three sentences an executive could read alone. Cover the ask (role, level, start date), the business problem in numbers, and the expected return or risk avoided.
2. The problem: state the business impact, not the team's feelings. Use the evidence given (volume trends, backlog, cycle time, revenue at risk, compliance exposure, single points of failure), and show the trend if there is one. Say plainly what happens over the next two to four quarters without the hire, including what the team would stop or delay.
3. The role: what the person will own, the first 90-day priorities, why this level (and not one above or below), and how the role fits with the existing team.
4. Cost: the fully loaded annual cost, broken into base pay, on-costs (employer taxes, benefits and pension, commonly estimated as a percentage of base; mark the rate as an assumption to confirm with finance), recruiting, equipment and onboarding time, plus the cost in the first partial year. Use the figures given and mark the rest as [X].
5. Alternatives considered: compare at least three options: hire as proposed, a contractor or agency, automation or tooling, reprioritising or dropping work, moving work to another team, or hiring at a different level. Show cost, speed, risk and fit for each, and why the proposed option wins. If an alternative is actually better on the evidence, say so.
6. Success measures: two to four measurable outcomes with a baseline and a target at 6 and 12 months, tied to the problem in step 2.
7. Risks and timing: time to hire and ramp up, what happens if recruiting is slow, dependencies, and the latest approval date that still meets the business need.
8. Gaps to fill: missing numbers or facts that would strengthen the case, and who can provide each.
</task>

<constraints>
- Use only the evidence given. Never invent workload figures, revenue, salaries or percentages; insert [X: what to find] instead.
- Keep it to about one page of prose plus tables. Approvers skim.
- No pleading or exaggeration. A measured, specific case reads as more credible than an urgent one.
- If the evidence does not support a new hire, say so and recommend the stronger alternative or what data to collect first.
</constraints>

<output_format>
## Summary
## The problem
## The role
## Cost
Table: Item | Annual | First year | Source or assumption.
## Alternatives considered
Table: Option | Cost | Speed | Risk | Why not chosen.
## Success measures
Table: Measure | Baseline | 6 months | 12 months.
## Risks and timing
## Gaps to fill
</output_format>
