---
schema: 1
id: plan-giving-day-campaign
kind: prompt
title: Plan a giving day campaign
description: Plans a giving day or peer-to-peer fundraising campaign - goal, matching gift, ambassadors, a content calendar for before, during and after, and a supporter toolkit.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, marketer, founder]
subject: [nonprofit]
inputs: [text]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [giving-day, peer-to-peer, matching-gift, content-calendar, ambassador-toolkit]
pairs_with:
  prompts: [write-donor-appeal, write-donor-thank-you, plan-fundraising-event, write-crowdfunding-campaign]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: The organisation, its mission, who supports it (email list size, social followers, active volunteers, past online giving results), staff time available, and the specific thing this campaign will fund.
    type: text
    required: true
  - name: goal
    description: The fundraising goal (amount and currency), plus any donor-count goal.
    type: string
    required: true
  - name: date
    description: The giving day date or campaign window, and whether it is part of a regional or national giving day. If empty, the plan uses relative dates (D-30, D-day, D+7).
    type: string
output_contract:
  format: markdown
  sections: [Goal check, Campaign concept, Matching gift, Ambassadors, Content calendar, Supporter toolkit, Day-of run sheet, After the day]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a digital fundraising strategist who has run giving days and peer-to-peer campaigns for organisations of many sizes. Giving days work through urgency (a deadline), leverage (a matching gift that doubles donations), social proof (a live progress bar, donor counts) and networks (ambassadors who ask their own friends, which brings donors the organisation could never reach by itself). The results are made before the day: a match secured weeks in advance, ambassadors recruited and equipped, early gifts so the progress bar does not start at zero, and a content plan for every few hours of the day. The day after matters too: fast thanks and impact updates turn one-time givers into repeat donors.
</context>

<task>
Plan a giving day or peer-to-peer campaign.

<organisation>
{{organisation}}
</organisation>

Goal: {{goal}}
{{#date}}
Date: {{date}}
{{/date}}

1. Goal check: compare the goal with past online giving and audience size (list size, followers, volunteers). Show a simple build-up: expected gifts from the email list, social audience, ambassadors' networks, board and major donors, and the match, each with a stated assumption (for example response rate and average gift). Say whether the goal looks realistic, and adjust if not.
2. Campaign concept: a theme and a concrete "what your gift does" framing (for example "50 provides a week of meals for a family"), using only costs the user confirms; placeholders otherwise. One headline and one-sentence pitch.
3. Matching gift: who to ask (board, major donors, a local business), how to make the ask, the match structure (dollar-for-dollar up to an amount, power hours, unlock challenges at donor-count milestones), and the deadline to secure it.
4. Ambassadors: target number, who to recruit (board, volunteers, beneficiaries' families where appropriate, loyal donors), their personal goal, their tools, and how to support and recognise them.
5. Content calendar: from about four weeks before to one week after. Table rows by date or relative day; channels (email, social, text messages if supporters opted in, website, ambassadors); the message's job (save the date, match announcement, early gift ask, launch, progress updates, final hours, thanks, results).
6. Supporter toolkit: ready-to-use copy for ambassadors: a personal email template, three short social posts, a text message, and talking points. Mark spots for personal stories. Keep each short.
7. Day-of run sheet: an hour-by-hour plan for the giving day: who posts, who watches the progress bar, when matches or challenges are announced, how to respond to donors live, and a contingency if giving is behind schedule.
8. After the day: thank-you within 24 hours, results announcement, impact update within a few weeks, how to bring new donors into a welcome series, and the metrics to record (total, donors, new donors, average gift, ambassador results, channel sources).
</task>

<constraints>
- Never invent past results, costs of services, or response-rate benchmarks as facts. Assumptions are stated and labelled.
- Arithmetic in the goal build-up is exact and shown.
- Only message people through channels where they have opted in; remind the user to follow consent and data protection rules for email and text messages.
- Announce a match only after a real donor has committed it, ideally in writing. Never advertise a match, deadline or progress figure that is not true.
- Impact claims must be true and specific; flag any "what your gift does" figure the user needs to confirm.
- If audience size or past results are missing, ask for them or state assumptions and how they affect the goal.
</constraints>

<output_format>
## Goal check
Build-up table: Source | Assumption | Expected amount. Total, then verdict.
## Campaign concept
## Matching gift
## Ambassadors
## Content calendar
Table: Date or day | Channel | Message job | Owner.
## Supporter toolkit
## Day-of run sheet
## After the day
</output_format>
