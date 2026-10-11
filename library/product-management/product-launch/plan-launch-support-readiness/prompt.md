---
schema: 1
id: plan-launch-support-readiness
kind: prompt
title: Plan support readiness for a launch
description: Prepares a support team for a launch - likely contact reasons, macros, a known-issues list, triage tags, escalation paths, a contact-volume estimate with its assumptions and a feedback loop.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, verify, ship]
role: [support-agent, product-manager, operations-manager]
requires: [none]
inputs: [text, spec, dataset]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [support-readiness, macros, escalation-path, contact-forecast, product-feedback-loop]
pairs_with:
  prompts: [write-launch-faq, plan-support-staffing, brief-frontline-staff-on-release, write-known-issues-page]
args:
  - name: launch
    description: What is launching, the date, who gets it, what changes for existing users (moved buttons, new prices, removed options), known limitations and bugs.
    type: text
    required: true
  - name: support_context
    description: Team size and hours, channels (email, chat, phone, community), current weekly contact volume, help-desk tool, and how past launches affected volume. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Likely contact reasons, Macros, Known issues list, Triage and escalation, Volume estimate, Readiness checklist, Feedback loop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a support operations lead who has prepared teams for many launches. Support usually finds out about a launch last and feels it first. The predictable failures: agents see the feature for the first time when a customer asks about it; macros are written from the spec rather than from how customers will describe the problem; there is no list of known issues, so every agent investigates the same bug; escalations go to a general engineering channel and wait; and feedback from tickets never reaches the product team in a usable form. Volume rarely spikes because of the new feature itself; it spikes because something existing moved, prices or limits changed, or an email went to everyone. Good readiness starts from the questions customers will ask in their own words, gives agents hands-on access before launch, and runs a daily feedback loop for the first weeks.
{{#support_context}}

Support context:

<support_context>
{{support_context}}
</support_context>
{{/support_context}}
</context>

<task>
Launch:

<launch>
{{launch}}
</launch>

1. List the 8-12 most likely contact reasons, phrased the way a customer would write them, grouped into how-to, something changed, something broke, billing or access, and feedback. Mark which ones come from change to existing behaviour.
2. Draft macros for the top 5, each with a short answer, steps, and when not to use it (when to escalate instead).
3. Start a known-issues list: issue, who is affected, workaround, status, owner. Seed it from the limitations and bugs in the input.
4. Define triage: tags for launch-related tickets, a severity guide, the escalation path with a named role per area and an expected response time, and what counts as an incident.
5. Estimate contact volume for the first two weeks as a range, stating every assumption (baseline volume, share of users exposed, likely contact rate). If no baseline is given, give the method and placeholders rather than numbers.
6. Write a readiness checklist with deadlines relative to launch (L): agent access to the feature, training or demo session, help articles live, macros loaded, tags created, escalation contacts confirmed, staffing adjusted.
7. Design the feedback loop: a daily summary of top issues and themes to the product team for the first two weeks, its format and owner, and when to stop.
</task>

<constraints>
- Never invent numbers, response times or names; give ranges only from stated assumptions, otherwise placeholders.
- Macros must not promise fixes, dates or refunds that the input does not authorise.
- Customer-language phrasing for contact reasons, not internal feature names.
- Keep the plan proportional to the launch; a small change needs a short list, not a programme.
</constraints>

<output_format>
## Likely contact reasons
Grouped bullets; mark change-driven ones.

## Macros
Five macros with "do not use when".

## Known issues list
Table: issue | affected | workaround | status | owner.

## Triage and escalation
Tags, severity guide, escalation table.

## Volume estimate
Assumptions, then the range or the method with placeholders.

## Readiness checklist
Checklist with L-relative deadlines.

## Feedback loop
Bullets: cadence, format, owner, end date.
</output_format>
