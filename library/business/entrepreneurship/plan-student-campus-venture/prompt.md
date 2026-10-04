---
schema: 1
id: plan-student-campus-venture
kind: prompt
title: Plan a student campus venture
description: Plans a student's venture on or around campus - a tested idea, university rules and support to check, time against study, pricing and a semester-long test with clear milestones.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [student, founder]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [student-entrepreneurs, campus-business, semester-plan, time-budget, university-incubator]
pairs_with:
  prompts: [validate-business-idea, find-first-customers, price-services, budget-for-university]
  personas: [startup-mentor]
args:
  - name: idea
    description: The venture (a tutoring service, a resale or printing service, a food stall, an app for students, an events brand), who the customers are, and any team members.
    type: text
    required: true
  - name: university_support
    description: What you know about your university's rules and support - incubator, enterprise office, grants, competitions, rules on selling on campus, visa or scholarship conditions on work.
    type: text
  - name: weekly_hours
    description: Hours a week you can give it during term without harming your studies.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Idea check, Rules and support to check, Time budget, Offer and pricing, Semester test plan, Decision at semester end, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a university or college student plan a venture on or around campus. Students have unusual advantages: a dense market of similar customers, cheap access to mentors, incubators, competitions and student grants, and the freedom to fail cheaply. They also face real limits: deadlines and exams that wipe out weeks, term breaks when campus customers disappear, university rules on trading on campus, using its brand or facilities, and who owns ideas built with university resources, and for international students, visa conditions that may restrict self-employment. A good plan treats one semester as a time-boxed experiment with a decision at the end.

Hours a week available: {{weekly_hours}}
</context>

<task>
<idea>
{{idea}}
</idea>
{{#university_support}}

<university_support>
{{university_support}}
</university_support>
{{/university_support}}

1. Idea check: who exactly buys, what they use today, why they would switch, and the riskiest assumption. Suggest five to ten conversations with target students before building anything, and the question to ask.
2. Rules and support to check: selling on campus and in halls, using the university's name or logo, room and equipment use, intellectual property policy for ideas developed with university resources or in a course, student union society rules if run as a society, scholarship or visa work conditions for international students, food hygiene or other licences if relevant; and support to look for (enterprise office, incubator, mentors, grants, competitions, law or business school clinics). Each as a question with where to ask.
3. Time budget: fit the venture into the hours given around the academic calendar - mark exam and deadline weeks as low-effort, plan around term breaks, and name what to drop if grades slip.
4. Offer and pricing: a simple first offer for students' budgets, payment method, and the price that still makes the hours worthwhile.
5. Semester test plan: week-by-week milestones across about 12 to 14 weeks - interviews, a first sale or pilot, a small launch, a measure each week - with a target for each.
6. Decision at semester end: criteria for continue, change or stop, and what happens over the break (pause, run remotely, hand over).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state a university's rules, a visa's work conditions or a grant's terms; list them as checks with the enterprise office, student union, international student advisers or official sources.
- Protect study time: if the hours needed exceed the hours given, say so and shrink the plan.
- No invented competitions, grants or mentors; describe types to look for.
- If the idea is too vague to plan (no customer or offer), ask for those first.
</constraints>

<output_format>
## Idea check
Short bullets, then the interview question.
## Rules and support to check
Table: Check | Why | Who to ask.
## Time budget
Table: Weeks | Venture hours | Focus.
## Offer and pricing
Three to five lines.
## Semester test plan
Table: Week | Milestone | Target.
## Decision at semester end
Continue, change, stop criteria as bullets.
## Questions
Short bullets.
</output_format>
