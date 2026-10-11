---
schema: 1
id: design-in-app-feedback-widget
kind: prompt
title: Design an in-app feedback widget
description: Designs an in-app "send feedback" flow that captures page, account, version and an optional screenshot, with a few categories, routing to the right team and an honest acknowledgement.
category: user-feedback
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, designer, software-engineer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [feedback-button, in-app-feedback, feedback-routing, screenshot-capture, product-ops]
pairs_with:
  prompts: [build-feedback-intake-process, design-feedback-tagging-taxonomy, design-in-product-survey]
args:
  - name: product
    description: The product (web, mobile, desktop), who uses it, and rough number of active users.
    type: text
    required: true
  - name: team_setup
    description: Who will read feedback (product, support, engineering), tools in use (help desk, issue tracker, feedback tool) and any regulated or sensitive data in the product. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Entry point, Form, Captured context, Routing and triage, Acknowledgement and follow-up, Privacy and accessibility, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design feedback capture for software products. User-initiated feedback is high intent but skewed: it comes from engaged, often frustrated users at the moment something went wrong or a need appeared. Its value depends on context the user will not type: which screen, which account and plan, app version, browser or device, and what just happened. Good widgets capture that automatically, keep the form to one free-text box plus a category, and make clear what happens next. They fail when "feedback" becomes a black hole, when urgent bugs and account questions land in a product backlog nobody reads quickly, when the button hides in a menu or nags as a modal, or when screenshots silently capture personal or confidential data.

Product:

<product>
{{product}}
</product>
{{#team_setup}}

Team and tools:

<team_setup>
{{team_setup}}
</team_setup>
{{/team_setup}}
</context>

<task>
1. State the purpose and scope: what this widget is for (ideas, bugs, confusion) and what it is not for (account, billing and urgent issues, which go to support), with how the widget points users there.
2. Design the entry point: placement on web and mobile, label wording, keyboard and screen reader access, and whether to add a contextual entry point on key screens. No auto-opening modal.
3. Design the form: a category choice with three or four options (for example "Something's broken", "Idea or request", "I'm confused", "Other"), one free-text box with a prompt that asks what the user was trying to do, an optional screenshot, and an optional "you may contact me about this" checkbox. Give the exact copy.
4. List the context captured automatically: a table of field, source, why it is needed, and sensitivity. Include screen or URL, app version, platform, account and user ids, plan, locale, timestamp, and recent client errors where available. Exclude anything not needed.
5. Define routing and triage: rules by category and keywords (bugs to the issue tracker or support triage with a severity check, confusion to support and documentation owners, ideas to the feedback tool and product owner), deduplication, who looks at new items and how often, and a rule for urgent items such as data loss or security.
6. Write the acknowledgement and follow-up: the in-app confirmation (honest about whether a reply will come), an optional confirmation email, and how users hear back when something they raised is fixed or shipped.
7. Cover privacy and accessibility: screenshot redaction of sensitive fields, a notice of what is collected, retention, consent where required by local law, and access for assistive technology.
8. Define metrics: submissions per active user, category mix, time to first triage, share routed correctly, share of submitters who hear back, and a monthly sample read by the product owner.
</task>

<constraints>
- Do not ask users to fill in information the app already knows.
- Never route everything to one inbox; every category needs a named owner role.
- Do not promise a personal reply unless the team can staff it.
- Do not claim legal compliance; flag where local privacy rules need checking.
</constraints>

<output_format>
## Purpose and scope
Short paragraph.

## Entry point
Bullets.

## Form
The exact copy for each element.

## Captured context
A table: field | source | why | sensitivity.

## Routing and triage
A table: category or condition | destination | owner role | response target.

## Acknowledgement and follow-up
The copy and the follow-up rule.

## Privacy and accessibility
Bullets.

## Metrics
Bullets with how each is measured.
</output_format>
