---
schema: 1
id: write-client-monthly-report
kind: prompt
title: Write a monthly client report
description: Writes an agency's or consultant's monthly report to a client with work delivered, results against agreed goals, issues and their fixes, hours or budget used and next month's plan.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, marketer, project-manager, manager]
requires: [none]
inputs: [dataset, notes, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [client-reporting, agency, retainer, account-management, monthly-update]
pairs_with:
  prompts: [write-status-report, write-monthly-business-review, write-deliverable-cover-note]
args:
  - name: month_data
    description: This month's work done, results and metrics with last month or target for comparison, hours or budget used, issues, and client requests.
    type: text
    required: true
  - name: engagement
    description: "What the client pays for, the goals or KPIs agreed, and the retainer or budget, for example an SEO retainer of 40 hours a month aiming for 20% more organic leads by year end."
    type: text
    required: true
  - name: client_reader
    description: Who reads it on the client side and how technical they are. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Client report, Internal notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients renew retainers when the monthly report shows progress toward the goals they care about, in their language, and when bad news arrives with a plan rather than hidden in a chart. Account managers see the same mistakes: a dump of platform metrics nobody asked for, activity listed as if it were results, a bad month explained away, hours used without saying what they bought, and no clear asks of the client (approvals, content, access) even though the delays are on their side. A strong report opens with the result against goal, explains the main movements in a sentence each, owns problems, states hours or budget used against the agreement, and lists next month's plan and the client's actions.
</context>

<task>
Write this month's client report{{#client_reader}} for {{client_reader}}{{/client_reader}}.

<engagement>
{{engagement}}
</engagement>

<month_data>
{{month_data}}
</month_data>

1. If there is no data on this month's work or results, ask in one short message and stop.
2. Headline: three or four sentences on progress toward the agreed goals, with the key numbers and comparison (last month, target, same month last year where given).
3. Results against goals: a table with goal, target, this month, previous, trend, and a one-line explanation of each significant change. Only explain causes the data supports; otherwise say the cause is being investigated.
4. Work delivered: the main pieces of work and what each was for, grouped, not every task.
5. Issues and fixes: what went wrong or is at risk, the impact, and what is being done. Own the agency's part plainly.
6. Hours or budget: used against allowance, and over or under, with the reason.
7. Next month: planned work tied to the goals.
8. What we need from you: approvals, assets, access, feedback, each with a date.
9. Add internal notes (not for the client) on account risks you noticed, such as scope creep or a goal that looks unreachable.
</task>

<constraints>
- Use only the data given; never invent metrics, comparisons or causes. Mark gaps `[NEEDED: …]`.
- Activity is not a result: do not present the number of posts or tasks as progress toward a goal unless the goal is activity.
- Plain language for the reader; explain any technical metric in a few words the first time.
- Under about 700 words for the client report.
</constraints>

<output_format>
## Client report
Headline; Results against goals (table); Work delivered; Issues and fixes; Hours and budget; Next month; What we need from you (table: Request · Why · By).
## Internal notes
Bullets for the account team only. "None" if none.
</output_format>
