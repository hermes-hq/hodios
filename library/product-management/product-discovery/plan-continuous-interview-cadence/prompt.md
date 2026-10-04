---
schema: 1
id: plan-continuous-interview-cadence
kind: prompt
title: Set up a weekly customer interview habit
description: Sets up a sustainable weekly customer interview habit for a product trio or solo PM, with automated recruiting, a rota, a 30-minute format, a one-page snapshot and a route from insight to decisions.
category: product-discovery
version: 1.0.0
status: incubating
stage: [plan, discover, learn]
role: [product-manager, designer, founder, engineering-manager]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [continuous-discovery, interview-cadence, product-trio, automated-recruiting, interview-snapshot]
pairs_with:
  prompts: [write-customer-interview-guide, synthesize-customer-interviews, map-opportunity-solution-tree, write-research-screener]
  personas: [product-coach]
args:
  - name: team_and_users
    description: Who is on the team and their availability, who your users are, how you can reach them today (in-product, email list, sales, support) and any rules on contacting customers.
    type: text
    required: true
  - name: hours_per_week
    description: Total hours per week the team can realistically give to customer conversations, including preparation and notes.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [The habit in one line, Recruiting on autopilot, Weekly rhythm, Interview format, Snapshot template, From insight to decision, Keeping it going]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product teams build a weekly habit of talking to customers that survives busy quarters. The habit dies for predictable reasons: recruiting each interview by hand takes longer than the interview; the schedule depends on one enthusiastic person; notes pile up in a folder nobody opens; and nothing visibly changes because of what was heard. A durable habit has recruiting that runs itself, a fixed slot in everyone's calendar, a short repeatable format, a one-page snapshot per conversation, and a regular moment where snapshots feed decisions. It must fit the hours the team really has, not the ideal.

Hours per week: {{hours_per_week}}
</context>

<task>
Team and users:

<team_and_users>
{{team_and_users}}
</team_and_users>

1. State the habit in one line (for example "one 30-minute customer story every Wednesday, two of the trio attend, snapshot shared by Thursday").
2. Size it to {{hours_per_week}} hours: count interview time, prep, snapshot writing and a monthly review; if the hours are too few for one interview a week, propose one every two weeks rather than a plan that breaks.
3. Recruiting on autopilot: pick the best always-on channel for these users (an in-product invitation shown to a rotating sample, a line in support replies or onboarding emails, a standing request to sales or account managers, a research panel), a two- or three-question screener, a self-booking calendar link, an incentive policy and contact limits (no customer asked more than once a quarter). Include a fallback when a slot is not filled.
4. Weekly rhythm: day and time, who attends (interviewer and note-taker rotating among the trio), a reminder routine, and the rule for cancellations.
5. Interview format (30 minutes): brief context, one story about a specific recent experience related to the current outcome, probes, and close. Rotate the story prompt each month to match the team's current focus.
6. Snapshot template: one page per interview with participant profile (no names), memorable quote, the story in five lines, opportunities heard (needs, pains, desires), insights, and follow-ups.
7. From insight to decision: where snapshots live, a 30-minute monthly review to update the opportunity map or backlog, and how to show customers' words in planning and stakeholder updates.
8. Keeping it going: a simple tracker (interviews per month, percent of team attending), what to do when the habit slips, and how to restart after a gap.
</task>

<constraints>
- Fit the stated hours and access; never assume a research team or budget that was not mentioned.
- Respect contact rules: if customers are enterprise accounts owned by sales, include agreeing a process with account owners.
- Snapshots must not include personal data beyond what is needed; use participant codes.
- If the team, users or any way to reach users is missing, ask for it and stop.
</constraints>

<output_format>
## The habit in one line
One sentence.

## Recruiting on autopilot
Channel, screener questions, booking, incentive, contact limits, fallback.

## Weekly rhythm
Table: when | what | who | minutes. Plus the time budget adding up to the stated hours.

## Interview format
Timed outline with the current story prompt.

## Snapshot template
The template as a fill-in block.

## From insight to decision
Bullets.

## Keeping it going
Tracker columns and slip and restart rules.
</output_format>
