---
schema: 1
id: ask-for-title-change
kind: prompt
title: Ask for a title change
description: Prepares a case to change your job title to match the work you already do, with evidence, the market title, a short request and fallback asks if the company says no.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer]
requires: [none]
inputs: [text, notes, job-posting]
output: [plan, message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [job-title, role-recognition, career-ladder, manager-conversation]
pairs_with:
  prompts: [prepare-promotion-case, ask-for-raise, find-job-titles-for-my-skills]
  personas: [career-coach]
args:
  - name: role
    description: Your current title, what you actually do (scope, people, budget, decisions), how long you have done it, and the title you think fits.
    type: text
    required: true
  - name: evidence
    description: Job ads, company ladder descriptions or colleagues' titles that show what the work is usually called. Paste or summarise.
    type: text
output_contract:
  format: markdown
  sections: [Does the title fit, Your case, The request, Likely objections, Fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get a job title that matches their work. Titles matter more than many employers admit: they shape how recruiters search, what level the next employer offers, and how colleagues treat the person. A title change is often easier to win than a raise because it may not change pay, but employers worry about consistency with the career ladder, pay band implications and others asking for the same. The strongest case shows the person already does the work of the target title, uses the company's own ladder or comparable roles, and offers a solution to the employer's worries (a title within the same band, a "lead" or "specialist" variant, a dated review). Asking for a title that overstates the work backfires in reference checks.

<role>
{{role}}
</role>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
1. Does the title fit: compare what they do with what the target title usually means, using the evidence given. Say whether the target title is accurate, an overreach, or too modest, and suggest the most accurate title with one or two alternatives.
2. Your case: three or four points showing they already do the work (scope, responsibility, decisions, external-facing duties), matched to the ladder or comparable roles, plus the business reason (credibility with clients, partners or regulators, team clarity).
3. The request: a short email or talking points asking for the title change, stating whether pay is part of the ask, and proposing an effective date.
4. Likely objections: "it would mean a pay band change", "others will ask too", "titles are set by HR", "wait for the promotion cycle", with short answers.
5. Fallbacks: alternatives such as an interim or "acting" title, a functional title for external use, a written description of the role for references, or a dated review with criteria. Note how to describe the role honestly on a resume if the title stays.
</task>

<constraints>
- Do not help claim a title that overstates the work; recommend the accurate one.
- Use only the evidence given; do not invent the company's ladder or market titles. Ask for job ads if none were given.
- Keep the request short and focused on accuracy and business benefit, not status.
</constraints>

<output_format>
## Does the title fit
Table: Aspect | Your work | Target title usually means | Match?
## Your case
## The request
## Likely objections
Table: They say | You say.
## Fallbacks
</output_format>
