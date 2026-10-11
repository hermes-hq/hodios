---
schema: 1
id: design-progress-and-streak-features
kind: prompt
title: Design progress and streak features
description: Designs progress, streak and goal features for a habit, learning or fitness product that motivate without guilt or dark patterns, including goal setting, recovery from a broken streak and opt-out.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [streaks, progress-tracking, personal-targets, motivation, habit-apps]
pairs_with:
  prompts: [review-design-for-dark-patterns, design-notification-strategy, design-progression-system, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: product_context
    description: The product and the behaviour it supports (practice, exercise, learning, saving, journaling), who uses it, how often the behaviour realistically happens, what progress data exists, current motivation features, and retention or complaint data.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [mobile-app, web, both]
    default: mobile-app
output_contract:
  format: markdown
  sections: [Behaviour and cadence, Progress model, Goal setting, Streak rules, Missed days and recovery, Celebrations and reminders, Control and wellbeing, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Streaks and progress bars work when they make real progress visible, and backfire when they punish ordinary life. A daily streak for a behaviour people sensibly do three times a week trains them to game it or quit after the first miss; losing a 200-day streak is a common moment of churn. Self-set, adjustable goals beat imposed ones; weekly cadence suits many behaviours better than daily; recovery mechanics (rest days, a grace period, "repair" earned by effort rather than bought) keep people going. Guilt-driven notifications and paid streak protection are where motivation turns into a dark pattern, especially for health or children's products.
</context>

<task>
<product_context>
{{product_context}}
</product_context>

Design for {{platform}}. If the behaviour the product supports is unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Behaviour and cadence.** State the healthy cadence for this behaviour and choose daily, weekly or goal-based tracking accordingly, with reasons.
2. **Progress model.** What counts as progress (sessions, minutes, skills, amount saved), how it is visualised over time (calendar, weekly ring, level, cumulative total), and which views users see first.
3. **Goal setting.** Default goal, choices offered, how goals are adjusted up or down without penalty, and what the first week looks like so early wins are likely.
4. **Streak rules.** If a streak is used at all: what keeps it alive, time zone and travel handling, rest days or freezes, and whether the streak is shown prominently or kept secondary to total progress.
5. **Missed days and recovery.** Exact screens and copy after a miss and after a broken streak, keeping cumulative progress visible, and how to restart without shame.
6. **Celebrations and reminders.** Milestones worth celebrating, their visual weight, reminder timing chosen by the user, and tone rules (no guilt, no threats of loss).
7. **Control and wellbeing.** Hide streaks, pause for illness or holidays, turn off reminders, and limits for sensitive domains (fitness, diet, children).
8. **Metrics.** Retention after first miss, goal adjustment rate, reminder opt-out rate, streak-break churn, and a wellbeing signal such as complaints or survey answers, not only daily actives.
</task>

<constraints>
- No guilt or loss-threat copy ("Your streak will die", sad mascot shaming), no selling streak protection that exploits loss aversion, no fake urgency.
- Do not default to daily streaks for behaviours that are healthier less often.
- For health, diet or exercise products, avoid targets that push excessive behaviour; do not give medical or nutrition targets as fact.
- Users can hide or pause motivational features without losing their data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Behaviour and cadence
## Progress model
## Goal setting
## Streak rules
## Missed days and recovery
Screens with exact copy.
## Celebrations and reminders
| Moment | Treatment | Copy |
## Control and wellbeing
## Metrics
</output_format>
