---
schema: 1
id: run-internal-tool-feedback-pulse
kind: prompt
title: Run an internal tool feedback pulse
description: Designs a quarterly feedback pulse for an internal tool - a five-question survey, anonymity rules, office hours, links to task data and how staff see what changed - so employees answer honestly.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate, review]
role: [product-manager, operations-manager, manager, business-analyst]
requires: [none]
inputs: [text]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [internal-tools, employee-feedback, pulse-survey, anonymity, office-hours, workarounds]
pairs_with:
  prompts: [define-internal-tool-metrics, check-feedback-sampling-bias]
args:
  - name: tool_and_users
    description: The internal tool (CRM, warehouse app, case management system, HR portal, admin panel), the teams and roles that use it, how many people, and whether use is mandatory.
    type: text
    required: true
  - name: known_issues
    description: Optional. Problems you already know about, what usage or task data you can already see, and any past surveys and how they went.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, The survey, Anonymity rules, Schedule, Office hours, Combining with usage data, Showing what changed, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design a recurring feedback pulse for a tool that colleagues must use to do their jobs. Internal users are captive: low usage does not signal a problem, and they often do not complain because they fear looking slow, blaming the team that built it, or being told to "follow the process". They also develop workarounds (side spreadsheets, sticky notes, copy-paste) that hide the real cost.

A pulse works if it is short, safe to answer, asks only what logs cannot show, and staff can see that answers led to changes. It fails when it asks 25 questions, when managers can see who said what, and when nothing visible happens afterwards.
</context>

<task>
<tool_and_users>
{{tool_and_users}}
</tool_and_users>

{{#known_issues}}
<known_issues>
{{known_issues}}
</known_issues>
{{/known_issues}}

1. Purpose: two or three decisions the pulse should inform this year.
2. The survey, five questions, under three minutes:
   - Ease: "Overall, the tool makes my work easy" (1-7, strongly disagree to strongly agree).
   - Time cost: "In a typical week, how much time do you lose to the tool?" (none, under 30 minutes, 30-60 minutes, 1-3 hours, more than 3 hours).
   - Workarounds: "Do you keep anything outside the tool to get your work done?" (no / yes, what?).
   - Biggest blocker: one open question about the last time the tool got in the way.
   - One change: "If you could change one thing, what would it be?"
   Plus role and team as the only demographics, with groups wide enough for anonymity. Adapt wording to the tool and its users.
3. Do not ask what the logs already show (how often they use it, which screens) and do not ask for ratings of individual features.
4. Anonymity rules: run through a tool or person outside the reporting line, report no group with fewer than five responses, remove identifying details from comments before sharing, and never use answers in performance reviews. Tell staff these rules in the invitation.
5. Schedule: quarterly, open for 7-10 days, one reminder, sent at a quiet time in the work cycle (not month-end for finance, not peak season for warehouses). Track response rate by team.
6. Office hours: a fortnightly 30-minute drop-in (in person or call) where staff show the team what goes wrong, plus a few short observation visits to the busiest roles.
7. Combine with usage data: pair time-lost answers with task times or error logs where they exist, and look for teams where the tool reports smooth use but staff report workarounds.
8. Show what changed: within three weeks of each pulse, share the top three themes, what will change, what will not and why, and at the next pulse, what was done.
</task>

<constraints>
- Keep the survey at five questions plus role and team; if the user wants more, explain the cost to response rate and honesty, and offer a rotating sixth question at most.
- Do not invent response rates, user counts or known issues.
- If use is mandatory or tied to targets, add a line in the plan warning against reading adoption as satisfaction.
- If the tool and its users are not described, ask for them and stop.
</constraints>

<output_format>
## Purpose
Bullets.

## The survey
The invitation text (under 80 words, including the anonymity promise) and the five questions with scales.

## Anonymity rules
Numbered rules.

## Schedule
Table: step | timing | owner.

## Office hours
Format, cadence and how notes are recorded.

## Combining with usage data
Bullets on which data to pair with which answer.

## Showing what changed
The "what we heard, what we will do" message template.

## Questions
What to confirm.
</output_format>
