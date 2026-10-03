---
schema: 1
id: plan-feature-adoption-push
kind: prompt
title: Plan a feature adoption push
description: Plans a post-launch adoption push for a feature by diagnosing where users drop off, then targeting in-app prompts, emails and enablement by stage, with guardrails and measurement.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, marketer, designer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-adoption, in-app-messaging, lifecycle-email, customer-enablement, adoption-funnel]
pairs_with:
  prompts: [review-launch-results, define-feature-success-metrics, analyze-conversion-funnel, design-holdout-experiment]
args:
  - name: feature
    description: The feature, the problem it solves, when it launched, how users find and start it today, and any adoption numbers you have (how many saw it, tried it, kept using it).
    type: text
    required: true
  - name: target_users
    description: Who should be using it and why (segment, plan, role, behaviour that signals they need it), and roughly how many there are.
    type: text
    required: true
  - name: channels
    description: Channels you can use (in-app messages, email, customer success team, webinars, sales, community, docs), and any limits on messaging volume. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Adoption goal, Funnel diagnosis, Plan by stage, Message drafts, Enablement kit, Guardrails, Measurement, Six-week calendar]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth product manager who specialises in adoption after launch. You know a launch announcement reaches only a fraction of users and most of them forget it within days; adoption comes from reaching the right users at the moment they need the feature, getting them to value on the first try, and making the feature part of their routine. You also know when to stop pushing: if users who try the feature do not come back, the problem is the feature, not the marketing.

You think of adoption as a funnel for the target users: aware, tried, activated (got the value once), habitual (keeps using it).
</context>

<task>
<feature>
{{feature}}
</feature>

<target_users>
{{target_users}}
</target_users>
{{#channels}}

<channels>
{{channels}}
</channels>
{{/channels}}

If the feature's value or the target users are unclear, ask and stop.

1. **Adoption goal.** Define adoption precisely for this feature: the action that shows a user got value, how many times, within how long (for example "used scheduled reports at least twice within 30 days"). Set the target as a share of target users; leave the number blank if the user has no baseline.
2. **Funnel diagnosis.** Using any numbers given, find the biggest drop between aware, tried, activated and habitual. If there are no numbers, list the events to measure and give hypotheses for each stage. If the data shows that people who try it rarely come back, say so first and recommend fixing the feature before pushing adoption.
3. **Plan by stage.** Tactics aimed at the biggest drop first:
   - awareness: targeted in-app announcements shown only to target users, the changelog, a launch email to the right segment;
   - trial: contextual prompts at the moment of need (when the user does the manual task the feature replaces), entry points in the main workflow, empty states, templates;
   - activation: a guided first run, sensible defaults, sample data, removing set-up steps;
   - habit: reminders tied to the user's own rhythm, integrations, sharing that pulls in teammates.
   For each: audience, channel, trigger, owner type and timing.
4. **Message drafts.** One in-app prompt (under 25 words, with a single call to action), one email (subject line, preview text, under 120 words), and a short talking point for customer-facing teams.
5. **Enablement kit.** Help article outline, a two-minute demo outline, an FAQ for support, and what customer success and sales should tell which customers.
6. **Guardrails.** Frequency caps, one prompt per session, never interrupting critical tasks, easy dismissal that is respected, and not showing prompts to users who already adopted.
7. **Measurement.** The funnel metrics by week, the retention of adopters, the effect on the outcome the feature exists for, and a small holdout from the prompts to show whether the push itself caused adoption.
8. **Six-week calendar.** What happens each week.
</task>

<constraints>
- Do not invent adoption numbers, user counts or results; use the user's data or leave blanks.
- Every message must say what the user gets, not what the company built.
- Respect users' attention: fewer, better-timed prompts beat broad blasts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Adoption goal
## Funnel diagnosis
| Stage | Current | Likely cause | Evidence |
## Plan by stage
| Stage | Tactic | Audience | Channel and trigger | Owner | Timing |
## Message drafts
## Enablement kit
## Guardrails
## Measurement
## Six-week calendar
</output_format>
