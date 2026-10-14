---
schema: 1
id: quantify-resume-achievements
kind: prompt
title: Quantify resume achievements
description: Interviews you to find honest numbers for resume bullets that have none - scale, frequency, money, time and before-and-after - and shows how to estimate them so you can defend each one.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes]
output: [questions, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [resume-metrics, achievement-bullets, estimating-impact, numbers-on-resume]
pairs_with:
  prompts: [rewrite-resume-bullets, build-master-resume, tailor-resume-to-job]
  personas: [resume-writer]
args:
  - name: bullets
    description: The resume bullets or duties that have no numbers, with the job title and employer type for each. Paste a whole resume if easier.
    type: text
    required: true
  - name: job_context
    description: Anything that helps size your work - team size, number of customers or sites, budget, systems used, what records you could still check. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Number types to look for, Questions, Rewritten bullets, How to defend each number]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find the numbers hidden in their own work. Most people say "I don't have metrics" because nobody handed them a dashboard, yet nearly every job has countable scale: how many (customers, tickets, orders, patients, students, reports, invoices), how often (per day, per week, per month), how much (budget, revenue, cost, stock value), how fast (turnaround, cycle time, response time), how big the group (people managed, trained, supported, sites, countries), and change over time (before and after, rank among peers, error rates). Honest estimation is normal and accepted when the person can explain it: "about 40 calls a day" over a year becomes "around 9,000 customer calls a year". Good practice uses ranges or "about" for estimates, prefers absolute figures with a base over bare percentages ("cut late invoices from about 30 to 5 a month" beats "reduced late invoices by 83%"), and avoids false precision ("37.4%") that no one could have measured. Interviewers often ask "how did you measure that?", so every number must have a story behind it.

<bullets>
{{bullets}}
</bullets>
{{#job_context}}
<job_context>
{{job_context}}
</job_context>
{{/job_context}}
</context>

<task>
1. For each bullet, name the one or two number types most likely to exist for that kind of work (scale, frequency, money, time, people, change, rank).
2. Ask short, concrete questions per bullet that the person can answer from memory, records or a quick estimate ("Roughly how many orders did the warehouse ship on a normal day?", "What was the turnaround before you changed the process, and after?"). Group them by bullet and keep it to the questions that matter most.
3. If the material already contains enough to estimate, show the arithmetic (for example 40 calls a day x 230 working days = about 9,000 a year) and mark the result as an estimate the person must confirm.
4. Rewrite each bullet with [placeholders] where the answer is still missing, so the person can drop the figure in. Show the version with an estimate filled in where you calculated one.
5. For each number, give a one-line answer to "how do you know that?" based on its source (system report, own count, manager feedback, estimate from frequency).
</task>

<constraints>
- Never invent a number. Every figure is either from the person's material, a shown calculation from their material, or a [placeholder].
- Do not turn team results into individual ones; ask what the person's own part was.
- Do not force a number into every bullet. When a bullet truly has nothing countable, say so and strengthen it with scope or a concrete outcome instead.
- Avoid percentages without a base and precision the person could not have measured.
- Respect confidentiality: if a figure such as revenue may be confidential, suggest a ratio, range or relative measure instead.
</constraints>

<output_format>
## Number types to look for
## Questions
## Rewritten bullets
## How to defend each number
</output_format>
