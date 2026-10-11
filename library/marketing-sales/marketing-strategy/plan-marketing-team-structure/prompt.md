---
schema: 1
id: plan-marketing-team-structure
kind: prompt
title: Plan the marketing team and first hires
description: Plans which marketing work to keep in-house, give to freelancers or hand to an agency, the order of hires for the company's stage and budget, and the profile of the first or next marketer.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketing-hiring, team-design, in-house-vs-agency, first-marketing-hire, freelancers]
pairs_with:
  prompts: [write-marketing-agency-brief, choose-marketing-tech-stack, define-marketing-kpis, decide-in-house-or-outsource]
  personas: [fractional-cmo]
args:
  - name: company
    description: What the company sells, revenue or funding stage, growth goal, how customers come in today, and who does marketing now (founder, a generalist, agencies, nobody).
    type: text
    required: true
  - name: budget
    description: The total yearly budget for marketing people, freelancers and agencies (separate from ad spend if possible), and the country or region you hire in.
    type: text
    required: true
  - name: work_list
    description: The marketing work you need done or wish you did (content, paid ads, events, product marketing, design, email, website, partnerships). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Work that needs doing, Who should do what, Hiring order, Profile of the next hire, Budget check, Management and measures, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing leader who has built teams from zero. Founders often hire a senior head of marketing too early, expecting one person to set strategy and execute everything, or hire a junior to "do social" with no direction. The right first hire depends on the growth motion: a sales-led B2B company usually needs someone who can build pipeline and product messaging; a self-serve product needs a growth or lifecycle generalist; a local or ecommerce business may get further with a strong executor plus specialist freelancers. Keep in-house the work that needs deep product and customer knowledge and constant iteration (positioning, messaging, the core channel); buy specialist or bursty work (design, video, technical SEO, paid media set-up) from freelancers or agencies. Every role needs a clear owner of results and a measure, and agencies need an in-house owner to manage them.
</context>

<task>
<company>
{{company}}
</company>

<budget>
{{budget}}
</budget>

{{#work_list}}
<work_list>
{{work_list}}
</work_list>
{{/work_list}}

1. If the growth motion or the budget is unclear, ask up to three questions and stop.
2. Work that needs doing: list the marketing work by importance to the growth goal, separating ongoing from project work and core from specialist.
3. Who should do what: for each piece of work, in-house, freelancer, agency or the founder for now, with the reason (knowledge needed, frequency, skill rarity, cost).
4. Hiring order: the next one to three roles in order, with the trigger for each later hire (revenue level, pipeline gap, workload) rather than fixed dates.
5. Profile of the next hire: what they own, the first 90 days' outcomes, must-have experience matched to the motion, seniority level and why, and interview tasks that test the real work.
6. Budget check: estimated cost for each option using salary ranges the user should verify for their region (label as rough), freelancer and agency costs as ranges, totals against budget.
7. Management and measures: who the marketer reports to, how agencies and freelancers are managed, and the measures each role owns.
8. Risks: common failure modes for this plan and early warning signs.
</task>

<constraints>
- Do not state salaries or agency fees as facts; give rough ranges marked to verify locally, or leave placeholders.
- Do not recommend a title-heavy structure the budget cannot sustain.
- Hiring decisions must follow local employment law; do not give legal advice on contracts or contractor status, flag it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Three bullets: next hire, what to outsource, what the founder keeps for now.

## Work that needs doing

## Who should do what
A table: Work | Who | Why.

## Hiring order
A table: Order | Role | Trigger.

## Profile of the next hire

## Budget check
A table: Option | Rough cost | Note.

## Management and measures

## Risks
</output_format>
