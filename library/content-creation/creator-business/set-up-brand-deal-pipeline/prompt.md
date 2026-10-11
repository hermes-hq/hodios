---
schema: 1
id: set-up-brand-deal-pipeline
kind: prompt
title: Set up a brand deal pipeline tracker
description: Sets up a creator's tracker for brand deals from enquiry to paid - stages, fields for deliverables, usage, exclusivity and payment dates, views for what is due, a weekly routine and starter rows.
category: creator-business
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
inputs: [notes, preferences]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [deal-tracker, spreadsheet, deal-pipeline, invoice-tracking, exclusivity-calendar]
pairs_with:
  prompts: [plan-sponsorship-inventory, build-tracker-spreadsheet, chase-late-payment]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: current
    description: "How you track deals now (inbox, notes, spreadsheet), how many deals and enquiries a month, who else touches them (manager, editor, assistant), and the tool you want to use (spreadsheet, Notion, Airtable, other)."
    type: text
    required: true
  - name: deals
    description: "Optional. A few current or recent deals in rough notes, to turn into starter rows."
    type: text
output_contract:
  format: markdown
  sections: [Stages, Fields, Views, Weekly routine, Starter rows]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Creators lose money on brand deals less from bad negotiation than from losing track: an enquiry not answered, a deliverable date missed, usage that ran past its end date unbilled, an exclusivity window that blocks a new offer without anyone noticing, and invoices nobody chased. A simple tracker fixes most of this if it has the right stages (from enquiry to paid, with a lost or declined stage), the fields that matter later (deliverables with due dates, usage start and end, exclusivity category and dates, fee, invoice date, payment due and paid date, contact), and views that answer weekly questions: what is due this week, what needs a reply, which invoices are overdue, which exclusivity windows are active. The tool matters less than the routine: a short weekly review. Fields that nobody updates are worse than no fields, so fewer is better.
</context>

<task>
<current>
{{current}}
</current>

{{#deals}}
<deals>
{{deals}}
</deals>
{{/deals}}

1. **Stages:** six to eight stages from enquiry to paid, plus declined and lost, with the rule for moving a deal between stages.
2. **Fields:** a table of fields with type and why each matters, keeping only what they will update; include deliverables and due dates, usage end date, exclusivity category and dates, fee, invoice and payment dates, and contact.
3. **Views:** views or filters for this week's deliverables, replies needed, overdue invoices, active exclusivity and usage ending soon, built in their chosen tool where possible, marking tool-specific steps as checks.
4. **Weekly routine:** a 15-minute weekly review checklist and who does what if others help.
5. **Starter rows:** their deals converted into rows if given, or three example rows marked as examples.
</task>

<constraints>
- Keep the field list short; every field must answer a question they ask regularly.
- Do not invent deal details; mark example rows as examples.
- Mark tool-specific features as checks.
- Do not store passwords or bank details in the tracker.
</constraints>

<output_format>
## Stages
Table: stage | moves on when.

## Fields
Table: field | type | why.

## Views
## Weekly routine
Checkbox list.

## Starter rows
Table with the fields as columns.
</output_format>
