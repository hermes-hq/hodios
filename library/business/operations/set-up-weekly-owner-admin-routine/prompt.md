---
schema: 1
id: set-up-weekly-owner-admin-routine
kind: prompt
title: Set up a weekly owner admin routine
description: Sets up a weekly admin routine for a one-person business - quotes, invoices, chasing, bookkeeping, orders and follow-ups - with a time box per task, a monthly extra and a quarterly check.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [admin-routine, sole-traders, invoicing, receipts, time-boxing, cash-collection]
pairs_with:
  prompts: [write-invoice, set-up-simple-bookkeeping, track-business-expenses, plan-estimated-tax-payments, run-founder-weekly-check-in]
args:
  - name: business
    description: What you do, how you get paid (per job, retainer, online orders), roughly how many quotes, jobs or orders a week, and the admin that slips most.
    type: text
    required: true
  - name: tools
    description: Tools you already use - email, calendar, invoicing or accounting software, spreadsheet, booking system, notes app. Leave empty to keep it tool-free.
    type: text
  - name: admin_hours
    description: Hours a week you are willing to give to admin.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Weekly routine, Daily five minutes, Monthly extra, Quarterly check, Templates to create once, If you fall behind]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a sole trader, freelancer or one-person business owner set up an admin routine that actually happens. Admin left to "when I have time" costs real money: quotes sent late lose jobs, invoices sent late are paid late, unpaid invoices are not chased, receipts are lost before the tax return, and enquiries go cold. The fix is a fixed weekly block with a time box per task, a short daily habit for anything time-sensitive, and a monthly and quarterly layer for the jobs that cannot wait a year. Admin that is not scheduled turns into a weekend catch-up.

Admin time per week: {{admin_hours}} hours
</context>

<task>
<business>
{{business}}
</business>
{{#tools}}

<tools>
{{tools}}
</tools>
{{/tools}}

1. Weekly routine: one or two fixed blocks (suggest a day and time that suits the business, for example Friday afternoon for trades, Monday morning for client services) with tasks in order and minutes each, fitting within the hours given: invoice everything finished, chase overdue invoices (a set sequence: friendly reminder at due date, firmer at 7 days, call at 14 days), send outstanding quotes, reply to enquiries, record income and expenses and file receipts, check bank against invoices, order stock or materials, follow up recent customers for reviews or repeat work, plan next week's calendar.
2. Daily five minutes: only what cannot wait a week - new enquiries replied to within a working day, photos of receipts, jobs marked done for invoicing.
3. Monthly extra: bank reconciliation, profit and cash check against last month, tax set-aside moved to a separate account, subscriptions review, marketing post or newsletter, backing up records.
4. Quarterly check: tax deadlines and estimated payments to verify, insurance and renewals, prices review, any registrations or licences due.
5. Templates to create once: quote, invoice, reminder emails, enquiry reply, review request, job checklist - with what each must contain.
6. If you fall behind: a catch-up order (money first: invoices and chasing, then quotes, then records) and how to shrink the routine to the minimum in a busy week.
Use the tools they already have; if none, keep it to a calendar, a folder and a spreadsheet. If the tasks do not fit the hours, say what to cut or automate.
</task>

<constraints>
- Do not recommend specific paid software brands; describe the type of tool, or use the ones they named.
- Tax deadlines, invoicing rules and record-keeping periods differ by country; list them as checks with an accountant or the tax authority.
- Keep the weekly total within the hours given, and show the minutes.
- If the business description is missing how they get paid, ask, because the routine depends on it.
</constraints>

<output_format>
## Weekly routine
Day and time, then table: Order | Task | Minutes | Done when. Total minutes.
## Daily five minutes
Three to four bullets.
## Monthly extra
Checklist with minutes.
## Quarterly check
Checklist.
## Templates to create once
Table: Template | Must include.
## If you fall behind
Numbered catch-up order, then the minimum routine.
</output_format>
