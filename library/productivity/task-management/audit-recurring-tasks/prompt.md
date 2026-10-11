---
schema: 1
id: audit-recurring-tasks
kind: prompt
title: Audit recurring tasks
description: Lists every recurring task at work or home with its yearly time cost, then marks each to automate, delegate, batch, simplify, do less often or drop, starting with the changes that free the most hours.
category: task-management
version: 1.0.0
status: incubating
stage: [review]
role: [individual, manager, operations-manager, parent]
requires: [none]
inputs: [text, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [recurring-work, time-audit, automation-candidates, batching, simplify, routine-tasks]
pairs_with:
  prompts: [automate-personal-routine, audit-time-use, build-reusable-checklist]
args:
  - name: tasks
    description: Every task you do on repeat, with how often and how long each takes (for example "weekly report, every Monday, 90 min"; "meal planning, weekly, 45 min").
    type: text
    required: true
  - name: context
    description: Your role or household, who could take tasks on, tools you have, and anything you must keep doing personally. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Yearly cost, Verdicts, Top five changes, Hours freed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit someone's recurring tasks to give them time back. Recurring work hides its cost because each instance is small: a 20-minute daily task is over 80 hours a year. The useful questions, in order: does this still need doing at all (reports nobody reads, checks that never find anything); could it be done less often; could it be simpler (a template, a smaller version, fewer people involved); could several be batched into one sitting; could someone else do it better or cheaper; could software do it. People jump to automation first, but dropping or simplifying is usually faster and cheaper, and automating a task that should not exist only hides it.

Recurring tasks:
<tasks>
{{tasks}}
</tasks>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Compute the yearly time cost of each task from its frequency and duration, and the total. Mark any duration the user did not give as an estimate.
2. For each task, apply the questions in order and give one verdict: drop, do less often, simplify, batch with another task, delegate, automate, or keep as is. Add the concrete change (for example "send the report fortnightly", "template for the agenda").
3. Estimate the hours saved per year for each change and the one-off effort to make it.
4. Rank the top five changes by hours saved per hour of setup effort, and give the first step for each.
5. Note any change that needs someone else's agreement (a manager for dropping a report, a partner for a household job) and who.
</task>

<constraints>
- Do not suggest dropping tasks with legal, safety, financial or care consequences (tax filings, medication, safety checks); simplify or keep them and say why.
- Do not name specific automation products unless the user listed their tools; describe what the automation would do.
- Delegation needs someone to delegate to; if the user named nobody, mark it "if someone is available".
- Show the arithmetic for yearly costs.
</constraints>

<output_format>
## Yearly cost
Table: Task | Frequency | Minutes each | Hours per year. Then total.

## Verdicts
Table: Task | Verdict | Change | Hours saved per year | Setup effort | Needs agreement from.

## Top five changes
Numbered: change, why it ranks, first step.

## Hours freed
One or two sentences with the total.
</output_format>
