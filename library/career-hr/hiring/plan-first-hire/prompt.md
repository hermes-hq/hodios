---
schema: 1
id: plan-first-hire
kind: prompt
title: Plan a small business's first hire
description: Decides whether and whom a small business should hire first - the role, employee versus contractor, the real cost, the hiring process and onboarding. Use when you are stretched and thinking of hiring.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-employee, micro-business, contractor-vs-employee, employer-setup, solo-founder]
pairs_with:
  prompts: [write-job-description, write-headcount-request, plan-new-hire-onboarding, write-offer-letter]
  personas: [startup-mentor, recruiter]
args:
  - name: business
    description: What the business does, how long it has run, revenue and profit trend if you are willing to share, the country and region, and who works in it now (you, partners, freelancers).
    type: text
    required: true
  - name: workload
    description: What you are doing that you should not be, what is not getting done, tasks by rough hours per week, and what you would do with the time a hire frees up.
    type: text
    required: true
  - name: budget
    description: What you could spend per month on help, and how many months of that cost you could carry if revenue dipped. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Should you hire yet, Which role first, Employee or contractor, The real cost, Hiring process, First 30 days, Set up before day one]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise owners of small businesses making their first hire. Owners usually hire too late (once they are burnt out and quality is slipping) or hire the wrong role first: someone to do what the owner enjoys rather than what is draining time from the work that brings in revenue. They often underestimate the full cost and the management time a new person needs, and sometimes engage a "contractor" who in law is really an employee. A good first-hire decision starts from the work, not the job title. It means sorting the owner's time into work only they can do, work that earns money, and work someone else could do well, then choosing the cheapest reliable way to hand off the third group.

<business>
{{business}}
</business>

<workload>
{{workload}}
</workload>
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Should you hire yet: sort the workload into three groups: only the owner can do it; it drives revenue; someone else could do it. Estimate the hours that could be handed off each week. Test the alternatives first (dropping tasks, software or automation, outsourcing a function such as bookkeeping, a freelancer for a defined project) and say whether a hire is justified now, later (with a trigger, such as a revenue level or hours per week), or not at all.
2. Which role first: if hiring makes sense, recommend the first role and say why, with the hours, the outcomes it owns, and the skills that matter. Say whether part-time or full-time fits better. Also name the role that is tempting but should come later.
3. Employee or contractor: explain the general factors authorities usually weigh (control over how and when work is done, integration into the business, exclusivity, who provides tools, financial risk, and whether the work is ongoing). Say which arrangement the described work leans towards and why. Name the authority or test to check in their country (for example, the IRS and state tests in the US, HMRC's employment status guidance in the UK, or the national labour or social-security authority in EU countries). Be explicit that misclassification carries penalties and that they should confirm with an accountant or employment adviser.
4. The real cost: build a monthly and annual cost table: pay, employer taxes and social contributions, mandatory insurance, pension or retirement contributions where required, paid leave and holiday cover, equipment and software, recruiting, and the owner's management and training time in the first three months. Use percentages as labelled assumptions to verify locally, and show the break-even: how much revenue or freed owner time the hire must generate to pay for itself. Compare this with the budget if given, including how many months they could carry the cost in a dip.
5. Hiring process: a short, practical process for an owner with little time: a one-page role description, where to find candidates for this role, a two-stage process (a structured conversation, then a paid work trial or work sample), reference checks, and how to make the offer.
6. First 30 days: an onboarding plan with documented processes for the handed-off work, a first-week schedule, weekly check-ins, what the person owns by day 30, and how the owner will let go of the work.
7. Set up before day one: a checklist of employer obligations to verify locally: registering as an employer, payroll and withholding, employment contract or written terms, right-to-work checks, mandatory insurance and pension, health and safety, data protection, and record-keeping. Mark these as items to confirm with an accountant, payroll provider or the official business support service.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state tax rates, thresholds or legal tests as fact for their country; give them as assumptions to verify, with the type of source.
- Use only the figures provided; mark missing ones as [X] and ask about the most important at the end.
- Do not help structure the role as "contractor" to avoid obligations when the work looks like employment; explain the risk instead.
- Be honest if the numbers do not support a hire yet.
</constraints>

<output_format>
## Should you hire yet
Table: Task | Hours per week | Group, then the verdict.
## Which role first
## Employee or contractor
## The real cost
Table: Item | Monthly | Annual | Assumption to verify. Then the break-even.
## Hiring process
## First 30 days
## Set up before day one
Checklist, then up to three questions.
</output_format>
