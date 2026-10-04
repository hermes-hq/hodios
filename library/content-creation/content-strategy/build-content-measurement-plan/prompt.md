---
schema: 1
id: build-content-measurement-plan
kind: prompt
title: Build a content measurement plan
description: Builds a content measurement plan linking goals to a few metrics that can move, with tracking, baselines, a review rhythm and what each result would change. Drops vanity metrics and names blind spots.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, founder]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [goal-metrics, utm-tracking, attribution, vanity-metrics, review-cadence, baseline]
pairs_with:
  prompts: [analyze-content-performance, define-content-pillars, plan-content-calendar]
  personas: [content-strategist]
args:
  - name: goals
    description: What the content is meant to achieve for you or the organisation, for example "more enquiries for kitchen fitting", "500 newsletter signups", "volunteers for the spring programme". Numbers and deadlines if you have them.
    type: text
    required: true
  - name: channels
    description: The channels and formats you publish on, roughly how often, and what you already track (if anything).
    type: text
    required: true
  - name: tools
    description: Analytics and tools you have access to, for example "website analytics, Instagram insights, a booking form, a spreadsheet". Leave empty if unsure.
    type: string
    default: platform insights and a spreadsheet
output_contract:
  format: markdown
  sections: [Goal to metric map, What we will not track, Tracking setup, Baseline, Review rhythm, Decision rules, Blind spots]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, small business or nonprofit comms team decide what to measure before they publish, so the numbers later answer a question. Three mistakes are common: tracking whatever the platform dashboard shows first (reach, followers, likes) instead of what the goal needs; never recording a starting point, so nobody can tell whether anything changed; and reviewing numbers without having agreed what a result would change. A good plan has one outcome metric per goal, one or two leading indicators that move earlier, a cheap way to capture each, a baseline, and a decision rule. Some valuable effects (trust, word of mouth, a donor who read for two years before giving) cannot be measured cleanly, and the plan should say so instead of pretending.

Tools available: {{tools}}
</context>

<task>
<goals>
{{goals}}
</goals>

<channels>
{{channels}}
</channels>

1. For each goal, name one outcome metric (the thing itself: enquiries, signups, sign-ups to volunteer, sales, donations) and one or two leading indicators that tend to precede it per channel (saves, shares, link clicks, replies, profile visits to website, email click rate, watch time past 50%). Explain the link in one line.
2. List the metrics they will deliberately not report and why (follower counts, impressions or likes on their own, unless the goal is awareness and even then paired with something behavioural).
3. Tracking setup with what they have: UTM tags with a naming pattern (source, medium, campaign written the same way every time), "How did you hear about us?" on forms and at the till with fixed options, a unique link or code per channel, tagging replies and DMs, and a one-tab spreadsheet layout. Keep it to what one person can maintain in 15 minutes a week.
4. Baseline: what to record now (last 4 to 12 weeks if available) and how to estimate it if there is no history.
5. Review rhythm: a weekly 10-minute check of leading indicators, a monthly review of outcomes, and a quarterly decision about pillars or channels. Warn against judging a channel on fewer than 8 to 12 posts or about a month of steady publishing.
6. Decision rules: for each goal, what result means keep, change or stop, written before the data arrives.
7. Blind spots: what this plan cannot see (dark social, offline word of mouth, long consideration cycles) and a cheap proxy for each.
</task>

<constraints>
- Do not invent benchmarks or "typical" rates as fact; if you mention a range, call it a rough rule of thumb to check against their own baseline.
- Do not recommend buying new tools unless the existing ones cannot capture an outcome metric at all; then name the type of tool, not a brand.
- If a goal has no observable outcome ("raise our profile"), propose a measurable version and ask them to confirm it.
- Respect privacy: no tracking of individuals beyond what forms and platforms already collect with consent; mention cookie or consent rules vary by country.
- If goals or channels are missing, ask for them and stop.
</constraints>

<output_format>
## Goal to metric map
Table: goal | outcome metric | leading indicators | channel | why the link holds.

## What we will not track
Bullets with a one-line reason each.

## Tracking setup
Numbered setup steps, then a UTM naming example and the spreadsheet columns.

## Baseline
Table: metric | current value or [X] | period | source.

## Review rhythm
Weekly, monthly and quarterly checklists.

## Decision rules
Table: goal | keep if | change if | stop if | review date.

## Blind spots
Bullets: what is missed and the proxy.
</output_format>
