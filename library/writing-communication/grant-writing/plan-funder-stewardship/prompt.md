---
schema: 1
id: plan-funder-stewardship
kind: prompt
title: Plan relationships with grant funders between applications
description: Plans how to keep good relationships with your institutional grant funders between applications, with a contact calendar, useful updates, early warning of problems, thank-yous and renewal timing.
category: grant-writing
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, executive, founder, writer]
requires: [none]
inputs: [text, dataset]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [funder-stewardship, funder-relations, renewal-planning, programme-officer, grant-portfolio]
pairs_with:
  prompts: [plan-grant-pipeline, write-grant-report, request-grant-variation]
  personas: [grant-writer]
args:
  - name: funders
    description: Your current and past institutional funders (trusts, foundations, government programmes, companies), what each funds, amounts, end dates, reporting dates, your contact there, and how the relationship stands.
    type: text
    required: true
  - name: capacity
    description: Who in your organisation manages funder relationships and roughly how many hours a month they have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Funder map, Contact calendar, Message templates, Bad-news protocol, Renewal plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of trusts and foundations fundraising. The organisations that win repeat grants treat institutional funders as partners, not cash machines: they report on time, tell funders early when something changes or goes wrong, share what they are learning (including what did not work), invite funders to see the work without pressure, thank them specifically, and do not only make contact when they want money. Funders talk to each other and remember who surprised them with bad news at the final report. Effort should be proportionate: a funder providing a large multi-year grant warrants regular contact, while a small one-off grant needs a good report and a thank-you. Some funders prefer minimal contact, and their stated preferences come first.

<funders>
{{funders}}
</funders>
{{#capacity}}
<capacity>
{{capacity}}
</capacity>
{{/capacity}}
</context>

<task>
1. Funder map: tier each funder by value, strategic importance and renewal potential, note its stated contact preferences, and name the internal owner.
2. Contact calendar for the next 12 months: reports, renewal or reapplication windows, and a small number of purposeful contacts per tier (a short update with a story or result shared with consent, an invitation to a visit or event, sharing learning or a relevant report). Fit it to the stated capacity.
3. Message templates: a short update email, a thank-you that names what the grant made possible, and a learning note about something that did not go as planned.
4. Bad-news protocol: what counts as material change (delays, underspend or overspend, staff departure, missed targets, safeguarding or reputational issues), how soon to tell the funder, who tells them, what to include, and when a formal variation request is needed.
5. Renewal plan: for each grant ending in the next 18 months, when to start the renewal conversation, what evidence to gather now, and what to do if renewal looks unlikely (exit planning, other funders).
</task>

<constraints>
- Respect each funder's stated contact preferences; never suggest contacting a funder that has asked not to be approached outside its process.
- Do not invent funder details, relationships, results or stories; mark gaps.
- Stories and photos of participants only with consent.
- Keep the plan within the stated staff capacity.
</constraints>

<output_format>
## Funder map
Table: Funder | Tier | Amount and end date | Contact preference | Owner.
## Contact calendar
Table: Month | Funder | Contact | Purpose.
## Message templates
## Bad-news protocol
## Renewal plan
</output_format>
