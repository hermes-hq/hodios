---
schema: 1
id: set-up-life-admin-calendar
kind: prompt
title: Set up a life-admin calendar
description: Builds a recurring calendar of a household's renewals, check-ups, tax dates, vehicle tests, subscriptions and document expiries, with lead times and reminders set so nothing turns urgent.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [life-admin, renewals, reminders, household-admin, recurring-tasks, deadlines]
pairs_with:
  prompts: [clear-life-admin-backlog, run-monthly-review, write-household-operations-manual, plan-digital-legacy]
  personas: [executive-assistant]
args:
  - name: household
    description: Who lives in the home and what you look after, for example "two adults, a 7-year-old, a rented flat, one car bought 2019, a dog, both of us self-employed". Add any dates you already know (insurance renewal in May, passports expire 2028).
    type: text
    required: true
  - name: country
    description: The country (and state or region if rules differ there) whose taxes, vehicle tests and official renewals apply.
    type: string
    required: true
  - name: tool
    description: Where the calendar will live. calendar-app = a phone or computer calendar with alerts; paper = a wall or desk planner; spreadsheet = a sheet you review monthly.
    type: enum
    enum: [calendar-app, paper, spreadsheet]
    default: calendar-app
output_contract:
  format: markdown
  sections: [What I assumed, The life-admin calendar, Month by month, Set it up, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design life-admin systems for busy households. Most admin emergencies are not hard tasks; they are ordinary recurring tasks noticed too late: a passport that expires three weeks before a trip, a car test missed by a month, an insurance policy that auto-renews at a higher price, a free trial that turned into a yearly charge, a tax deadline found on the last weekend. The fix is a calendar where every recurring obligation has two dates: the date it is due, and the earlier date when you must start, which is the due date minus the time the task really takes (processing times, appointment waits, shopping around for a quote).

Household: {{household}}
Country: {{country}}
Calendar tool: {{tool}}
</context>

<task>
1. If the household description does not say whether there is a vehicle, whether the home is owned or rented, or who has pets or dependants, and that would change the calendar a lot, ask up to four short questions in one message and stop. Otherwise continue and list your assumptions.
2. Build the inventory of recurring obligations for this household, grouped by area. Consider and keep only what applies:
   - Money and tax: tax return and payment dates, self-employed instalments, benefit or allowance renewals, annual account and statement reviews.
   - Home: insurance, energy and broadband contract end dates, rent review or mortgage fixed-rate end, boiler or heating service, smoke and carbon monoxide alarm tests, gutters, chimney, seasonal jobs.
   - Vehicles: registration or road tax, roadworthiness test, insurance, servicing, licence renewal.
   - Health: dental and eye check-ups, national screening and vaccination schedules (by age and country, to confirm with a doctor), repeat prescriptions, children's routine reviews.
   - Pets: vaccinations, flea and worm treatment, insurance, licences.
   - Documents: passports, identity cards, driving licences, visas or residence permits, warranties.
   - Subscriptions and memberships: renewals, free-trial end dates, annual price rises.
   - Children and school: enrolment and application deadlines, term dates, forms that recur each year.
3. For each item give: how often it recurs, the due date (from the input, or a marked placeholder such as [renewal date - check the policy document]), a realistic lead time with the reason, the reminders to set, who owns it, and where the paperwork lives (a pointer such as "insurance folder" or "email label: car", never account numbers or passwords).
4. Spread the load: lay the items out month by month. If one month carries several heavy tasks, move the flexible ones (for example a boiler service to late summer, a dental check to a quiet month) and say what you moved.
5. Add one recurring "admin hour" (monthly, 30 to 60 minutes) where the coming month's reminders are reviewed and the calendar itself is updated.
6. Explain how to set it up in the chosen tool:
   - calendar-app: a separate shared "Life admin" calendar, yearly or monthly repeating events, two alerts per item (start-by date and a week before the due date), and the what-to-bring notes in the event description.
   - paper: a year-at-a-glance planner for due dates, a start-by mark in a second colour, and a monthly checklist page reviewed in the admin hour.
   - spreadsheet: one row per item with the columns from step 3 plus "next due" and "done", sorted by start-by date, with conditional highlighting for the next 30 days.
7. Before answering, check: every item has a real date or a placeholder, no deadline or rate is invented, every country-specific item says to confirm it with the official source for the current year, and nothing sensitive (passwords, PINs, full account or ID numbers) appears.
</task>

<constraints>
- Never invent official deadlines, processing times, fees or rates. Where a typical lead time helps, label it as typical and tell them to check the official source for the current year.
- Health schedules depend on age, history and country; list them as "ask your doctor or check the national programme", never as medical advice.
- Calendars get shared and synced; keep passwords, PINs, full account numbers and ID numbers out of every event.
- Only include items that fit this household; do not pad the list with obligations they do not have.
- Plain language, no jargon.
</constraints>

<output_format>
## What I assumed
Bullets, or the questions you need answered first.
## The life-admin calendar
Table: Item | Area | Repeats | Due | Start by (lead time and why) | Reminders | Owner | Paperwork lives in.
## Month by month
January to December, each with its items; note anything moved to spread the load.
## Set it up
Numbered steps for {{tool}}, including the monthly admin hour.
## Gaps to fill
Checklist of dates and details to look up, with where to find each one.
</output_format>
