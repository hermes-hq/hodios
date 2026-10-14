---
schema: 1
id: send-reminders-from-spreadsheet
kind: prompt
title: Send reminder emails from a spreadsheet
description: Sets up scheduled email reminders for due or expiring items listed in Google Sheets or Excel, marking each reminder as sent so nobody is emailed twice, with quota limits and a dry run.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, project-manager, individual]
stack: [google-sheets, excel, javascript]
inputs: [text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [email-reminders, due-dates, apps-script, time-driven-trigger, renewal-alerts]
pairs_with:
  prompts: [write-spreadsheet-automation, write-office-script, calculate-dates-and-workdays]
args:
  - name: sheet
    description: The sheet layout - item, owner or recipient email column, due or expiry date, status, and any existing "reminded" column - with a few sample rows (fake data is fine).
    type: text
    required: true
  - name: rules
    description: When to remind (days before due, on the day, overdue repeats), who gets it, one email per item or one summary per person, and what stops reminders (status done, date passed).
    type: text
    required: true
  - name: tool
    description: Google Sheets (consumer or Workspace account) or Excel in OneDrive or SharePoint with Power Automate.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Design, Columns to add, Script or flow, Schedule, Test plan, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up reminder emails driven by a spreadsheet: contract renewals, certificate expiries, overdue tasks, equipment checks. The failures are predictable: the same person emailed every day because nothing records that a reminder went out; a run that crashes halfway and resends everything next time; dates compared with times attached so "due today" never matches; the script running in a different time zone from the sheet; and quotas exceeded. Record a "last reminded" date per row and write it straight after each send, so a crash cannot cause a repeat. Compare dates at day level. In Google Apps Script, MailApp sends as the account that owns the trigger; daily recipient quotas are much lower for consumer accounts than for Google Workspace, `MailApp.getRemainingDailyQuota()` reports what is left, a run stops after about six minutes, and a time-driven trigger runs within the hour chosen, not at an exact minute. In Excel the usual route is a scheduled Power Automate flow: the data must be an Excel table, "List rows present in a table" returns only the first 256 rows unless pagination is turned on, and dates come back as serial numbers unless the date format option is set to ISO 8601.
</context>

<task>
Set up the reminders in {{tool}}.

<sheet>
{{sheet}}
</sheet>

<rules>
{{rules}}
</rules>

1. Design: restate the rules as a precise condition per row (for example status is not Done, and due date minus today is 14, 7 or 1 day or the item is overdue and last reminded is more than 7 days ago) and decide between one email per row or one summary per recipient. Ask one question if the rules are ambiguous in a way that changes who gets emailed.
2. Columns to add: Last Reminded (date) and Reminder Count, plus Status values that stop reminders. Explain that people can clear Last Reminded to force a resend.
3. Script or flow:
   - Google Sheets: complete Apps Script with a configuration block (sheet name, header names, days-before list, sender name, `DRY_RUN = true`), header lookup by name, day-level date comparison in the spreadsheet's time zone, grouping by recipient if chosen, a quota check before sending, writing Last Reminded immediately after each successful send, `LockService` so two runs cannot overlap, and a summary log.
   - Excel: a Power Automate flow step by step: Recurrence trigger with time zone, List rows present in a table with pagination and ISO 8601 dates, a Filter array or condition, Send an email (V2), Update a row keyed on a unique ID column; plus the unique ID column it needs.
4. Schedule: the trigger setup (Apps Script time-driven daily trigger at an hour; Power Automate Recurrence), and the account it runs as and sends from.
5. Test plan: a test tab or test recipients, a dry run that logs who would be emailed and why, one real send to yourself, then go live.
6. Limits: quotas for the account type (say they change and where to check the current figure), run time, emails landing in spam, what happens if someone renames a column, and who should own the trigger when staff leave.
</task>

<constraints>
- Send only to addresses in the sheet that the rules select; never add tracking, external services or attachments the user did not ask for.
- `DRY_RUN` on by default; the user turns it off after testing.
- Do not state exact quota numbers as guaranteed; give them as approximate and point to the current quota page in the product's documentation.
- Keep personal data minimal in the email body; link to the sheet rather than copying sensitive columns.
- Use V8 Apps Script syntax and only Apps Script services or standard Power Automate connectors.
</constraints>

<output_format>
## Design
The exact reminder condition in words.
## Columns to add
## Script or flow
Code block or numbered flow steps.
## Schedule
## Test plan
## Limits
</output_format>
