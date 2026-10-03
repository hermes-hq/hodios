---
schema: 1
id: build-annual-marketing-calendar
kind: prompt
title: Build an annual marketing calendar
description: Builds a twelve-month marketing calendar with seasonal moments, launches, tentpole campaigns, always-on activity, lead times, channel plans and budget by quarter, checked against team capacity.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketing-calendar, annual-planning, seasonal-marketing, campaign-planning, marketing-budget]
pairs_with:
  prompts: [write-marketing-plan, plan-content-calendar, plan-marketing-campaign, write-campaign-brief]
args:
  - name: business
    description: The business, products, customers, region and seasonality of sales (busy and quiet months), channels you use, team size, and the year's goals.
    type: text
    required: true
  - name: key_dates
    description: Dates already fixed - launches, trade shows, sales, company events, funding or hiring moments, and industry dates that matter to your customers. Optional.
    type: text
  - name: budget
    description: Annual marketing budget, or what is already committed, for example "60k EUR, 15k already booked for two trade shows". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Planning year and assumptions, Year at a glance, Quarter plans, Month by month, Budget by quarter, Capacity check, Review points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing operations lead who builds the annual calendar once the strategy is set. A calendar turns a plan into dates: a few tentpole campaigns timed to when customers buy, launches given proper run-up, always-on activity that keeps going between peaks, and lead times worked back so creative, ads and stock are ready on time. Calendars fail when they fill every month equally, copy generic retail holidays that do not matter to the customers, ignore the team's capacity, or put the budget into quiet months. The strategy itself (positioning, audiences, channel choice) is a separate job; here you schedule it.
</context>

<task>
Build an annual marketing calendar for this business.

<business>
{{business}}
</business>

{{#key_dates}}
<key_dates>
{{key_dates}}
</key_dates>
{{/key_dates}}

{{#budget}}Budget: {{budget}}{{/budget}}

1. State the planning year (ask if it is not clear from the input), the region, and your assumptions about the sales cycle and seasonality.
2. Identify the moments that matter to these customers: buying seasons, industry events, budget cycles for B2B, cultural and retail dates relevant to the region and audience, plus the fixed dates supplied. Drop generic dates that do not fit and say so.
3. Choose three to five tentpole campaigns, each timed to a peak in buying, with a one-line goal. Place launches with enough run-up.
4. Define the always-on activity that runs all year (search, email, social, content, partnerships) and how intensity changes around tentpoles.
5. For each quarter: goals, campaigns, channel plan, key deliverables and their deadlines worked back from launch dates (brief, creative, approvals, setup).
6. Produce a month-by-month calendar.
7. Split the budget by quarter, weighted toward the peaks, separating committed and planned spend. Without a budget, give percentages.
8. Check capacity: flag months where the team has more launches or deliverables than it can handle, and propose what to move or drop.
9. Set review points to adjust the calendar based on results.
</task>

<constraints>
- Include only dates that matter to this business's customers. Cultural and religious dates are included only when relevant and handled respectfully.
- Do not invent fixed dates for events whose dates you do not know for the planning year; mark them "date to confirm".
- Lead times are realistic for the channel (print, retail and trade shows need months; social posts need days).
- If the business or region is unclear, ask before building the calendar.
</constraints>

<output_format>
## Planning year and assumptions
## Year at a glance
A table: Quarter | Tentpoles | Launches | Key dates.
## Quarter plans
Per quarter: goals, campaigns, channels, deliverables with deadlines.
## Month by month
A table: Month | Campaigns and moments | Channels | Deliverables due | Owner.
## Budget by quarter
A table: Quarter | Committed | Planned | Share of year.
## Capacity check
## Review points
</output_format>
