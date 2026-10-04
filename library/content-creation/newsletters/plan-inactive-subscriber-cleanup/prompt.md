---
schema: 1
id: plan-inactive-subscriber-cleanup
kind: prompt
title: Plan an inactive subscriber cleanup
description: Plans a sunset policy for a newsletter list, defining inactive when opens are unreliable, with a re-permission email, a grace window, rules for paid and new subscribers, and the expected effect.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [writer, content-creator, marketer]
requires: [none]
inputs: [dataset, text]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [list-hygiene, sunset-policy, deliverability, re-permission, sender-reputation]
pairs_with:
  prompts: [audit-newsletter-performance, write-win-back-campaign]
args:
  - name: list_stats
    description: What you know about the list - total subscribers, growth sources, how many have not clicked or opened in 90/180/365 days, bounce and spam complaint rates, sending cadence, and any deliverability problems (landing in spam, a warning from the platform).
    type: text
    required: true
  - name: platform
    description: The email or newsletter platform you send from, so the plan can use the segment and automation names it offers. Optional; the plan stays platform-neutral if empty.
    type: string
  - name: has_paid_tier
    description: Whether some subscribers pay. Paying subscribers are never removed by a sunset rule.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Diagnosis, Inactive definition, Sunset sequence, Exceptions, Expected effect, Checks before you start]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a newsletter writer clean their list of people who no longer read it. This is a hygiene and reputation decision, not a sales campaign: the aim is that mailbox providers keep delivering to the readers who want the newsletter, and that the writer stops paying for or worrying about addresses that are gone. Experts know three things writers miss. Opens are unreliable: mail privacy features pre-load images and report false opens, and image blocking hides real ones, so an inactive definition based on opens alone removes some readers and keeps some ghosts. Removing people silently is worse than asking: a re-permission email lets real readers stay with one click. And the right window depends on cadence: a daily list shows inactivity in weeks, a monthly list needs a year.

{{#platform}}Platform: {{platform}}. Use its segment and automation features by their general function, and tell the writer to confirm exact names in its help pages.{{/platform}}
Paid tier: {{has_paid_tier}}.
</context>

<task>
<list_stats>
{{list_stats}}
</list_stats>

1. Diagnose: is a cleanup needed now (rising spam placement, complaint rate near or above 0.1%, bounce rate above about 2%, a large never-engaged block, cost) or is it routine hygiene? Say if the data is too thin to judge.
2. Define inactive using the strongest signals available, in order: no clicks, no replies, no site visits from email, then opens with a caveat. Set the window by cadence: about 90 days for daily, 120-180 for weekly, 9-12 months for monthly. Exclude anyone who joined within the window.
3. Design the sunset sequence: an optional lighter-cadence period, a re-permission email with a single "keep me subscribed" link, one reminder about a week later, then removal or suppression. Write both emails: plain, honest subject lines ("Do you still want this newsletter?"), what they get, one click to stay, and no guilt.
4. Exceptions: paying subscribers (never sunset; review their engagement separately and ask if they still want the paid issues), recent sign-ups, people who replied or clicked recently, and VIP contacts the writer names.
5. Estimate the effect: how many addresses are likely to go, the share of them who will re-confirm (state it as a range and an assumption), and what should improve (placement, open and click rates as percentages of a cleaner list, platform cost). Warn that headline subscriber counts will fall.
6. Set the routine: run the rule monthly or quarterly as an automation, and keep suppressed addresses rather than re-importing them.
</task>

<constraints>
- Use only the numbers given. Never state a provider's exact thresholds, pricing or feature names as fact; say what to check.
- Never suggest re-adding unsubscribed or bounced addresses, buying lists, or tricks to fake engagement.
- Do not frame removal as punishment; the reader experience comes first.
- If the stats lack the size of the inactive segment or the cadence, ask for them before estimating, or label estimates clearly as assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Two to four sentences.

## Inactive definition
The rule in one line, the window and why, and what counts as activity.

## Sunset sequence
Table: step | timing | what happens. Then both emails (subject, preview, body under 120 words each).

## Exceptions
Bullets.

## Expected effect
Table: measure | now | expected after | assumption.

## Checks before you start
Checklist.
</output_format>
