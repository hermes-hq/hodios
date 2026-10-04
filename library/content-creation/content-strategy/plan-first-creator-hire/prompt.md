---
schema: 1
id: plan-first-creator-hire
kind: prompt
title: Plan a creator's first hire
description: Plans a solo creator's first editor, assistant, designer or producer from a time audit, with what to hand off first, the SOPs to write, a role brief, a paid test task and how to protect the voice.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer, founder]
requires: [none]
inputs: [text]
output: [plan, table, checklist, docs]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [delegation, freelancers, time-audit, sops, paid-test, video-editor]
pairs_with:
  prompts: [plan-first-hire, cost-out-content-plan, design-content-production-pipeline]
  personas: [creator-business-manager]
args:
  - name: current_workload
    description: What you do each week and roughly how long each task takes (scripting, filming, editing, thumbnails, emails, community, admin, sponsors). A one-week time log is ideal; estimates are fine.
    type: text
    required: true
  - name: budget
    description: What you can spend per month on help, with currency, and how steady your income is.
    type: string
    required: true
  - name: role_ideas
    description: Roles you are considering, for example "video editor", "virtual assistant for email and sponsors", "podcast producer".
    type: text
output_contract:
  format: markdown
  sections: [Where your time goes, What to hand off first, Ready to hire check, Role brief, Paid test task, Rates and costs to research, Protecting your voice, First 30 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a solo creator, podcaster or newsletter writer plan their first paid help. The usual mistakes: hiring for the task they dislike most rather than the one that frees the most valuable time; hiring before the process is written down, so the new person guesses, the creator redoes the work and concludes "nobody can do it like me"; choosing on portfolio alone without a paid test; and committing to a monthly cost that the income cannot carry in a slow month. A good first hire is usually a freelancer or part-time contractor for one well-defined, repeatable task (editing, thumbnails, inbox and sponsor admin, show notes) that the creator can describe in a written procedure and check in minutes.

Budget: {{budget}}
</context>

<task>
<current_workload>
{{current_workload}}
</current_workload>

{{#role_ideas}}
<role_ideas>
{{role_ideas}}
</role_ideas>
{{/role_ideas}}

1. Where your time goes: group tasks into create (only you can do: ideas, on-camera, voice), support (skilled but transferable: editing, design, research) and admin (inbox, scheduling, invoices, uploads). Hours per week for each.
2. What to hand off first: score transferable tasks by hours freed, how repeatable they are, how easy to check, and risk to the voice or audience trust. Recommend one role, with hours per week.
3. Ready to hire check: written procedure exists, examples of "good", file and access setup, the creator's review time, and three to six months of the cost covered even in a slow month. If not ready, list what to do first.
4. Role brief: outcomes, tasks, hours, tools, turnaround, how feedback works, and what they will not do (no posting as the creator, no replies in the creator's name unless agreed).
5. Paid test task: a real but non-urgent piece, the same brief for every candidate, a time limit, payment for the test, and the scoring criteria.
6. Rates and costs to research: how to find local or platform rates for the role, what is included (revisions, turnaround, software), contractor versus employee status, and that contracts, tax and employment status rules vary by country.
7. Protecting your voice: a style guide or editing notes, reference examples, a review checkpoint and how to give feedback in the first month.
8. First 30 days: onboarding steps, access with least privilege (separate logins, no shared passwords), review rhythm and a go or no-go point.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state market rates or salaries as fact; give how to research them and use [rate] placeholders in any calculation.
- Mention once that whether someone is a contractor or employee is decided by local law, not by the label, and that an accountant or local business advice service can confirm tax and employment duties.
- Access safety: separate accounts or delegated access, two-factor authentication, no sharing of the creator's personal passwords.
- If the workload or budget is missing, ask for them and stop.
</constraints>

<output_format>
## Where your time goes
Table: task | hours per week | type (create, support, admin).

## What to hand off first
Table: task | hours freed | repeatable | easy to check | voice risk | verdict. Then the recommended role in one line.

## Ready to hire check
Checklist with ticks or gaps.

## Role brief
A short fill-in brief.

## Paid test task
Bullets including scoring criteria.

## Rates and costs to research
Bullets, with a monthly cost formula.

## Protecting your voice
Bullets.

## First 30 days
Week-by-week checklist.
</output_format>
