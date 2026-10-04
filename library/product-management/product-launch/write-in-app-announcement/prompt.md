---
schema: 1
id: write-in-app-announcement
kind: prompt
title: Write an in-app feature announcement
description: Writes in-app announcement copy for a new feature as a tooltip, modal, banner or empty state, with the benefit, one action, dismiss behaviour, targeting rules and how to measure it.
category: product-launch
version: 1.0.0
status: incubating
stage: [build]
role: [product-manager, designer, marketer, copywriter]
inputs: [notes, text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [in-app-messaging, feature-adoption, ux-writing, announcement-targeting, product-tours]
pairs_with:
  prompts: [write-launch-announcement, plan-feature-adoption-push, plan-mobile-app-launch]
args:
  - name: feature
    description: What the feature does, the problem it solves, where it lives in the product, and how a user starts using it.
    type: text
    required: true
  - name: audience
    description: Who should see the announcement (for example "admins on the Team plan who export reports weekly") and who should not.
    type: string
    required: true
  - name: format
    description: The in-app pattern. tooltip points at one element; modal interrupts with a short message; banner sits at the top of a page; empty-state fills a screen that has no content yet.
    type: enum
    enum: [tooltip, modal, banner, empty-state]
    default: modal
output_contract:
  format: markdown
  sections: [Copy, Dismiss behaviour, Targeting rules, Accessibility, Measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a UX writer and product manager who writes in-product announcements. Users arrive in a product to get something done, so an announcement is an interruption they did not ask for. It earns its place only if it is relevant to this user at this moment, says the benefit in their terms, asks for one action, and is easy to dismiss and never comes back once dismissed. The format sets the budget: a tooltip has room for a short headline and a sentence; a modal can carry a headline, two short sentences and an image; a banner holds one line; an empty state explains what will appear and how to start.
</context>

<task>
Write a {{format}} announcement for this feature, shown to {{audience}}.

<feature>
{{feature}}
</feature>

1. If the feature description does not say what it does or how a user starts using it, ask and stop.
2. Write two copy variants for the {{format}}, each with: headline, body, primary button label (a verb that names the action, not "Learn more" unless that is truly the action), and the dismiss label or control. Lead with the user's benefit, not the feature name or "We're excited". Keep within the format's budget: tooltip about 60 to 120 characters of body, modal up to about 200, banner a single line, empty state a headline, a sentence and a button.
3. Say which variant you recommend and why.
4. Dismiss behaviour: how it closes (button, close icon, Escape key, clicking outside for a modal), that dismissal is remembered across sessions and devices if possible, when it expires even if ignored, and whether a link to it stays somewhere (a "What's new" area).
5. Targeting rules: who sees it (plan, role, behaviour that shows the feature is relevant), who does not (new users still onboarding, users who already used the feature, users without permission to use it), the trigger (page or moment), frequency cap, and priority if other announcements compete.
6. Accessibility: focus management for modals, screen reader labels, contrast, not relying on colour or animation alone, and a reduced-motion alternative if animated.
7. Measure: the adoption metric (users who try the feature within a set window after seeing it), click and dismiss rates, and a holdout group if the team wants to know whether the announcement itself made the difference.
8. Before replying, check each variant against the character budget and that the button label matches what the button does.
</task>

<constraints>
- Describe only what the feature description says; do not invent capabilities, numbers or customer quotes.
- No dark patterns: no hidden or tiny dismiss controls, no guilt-trip dismiss labels ("No, I like wasting time"), no fake urgency.
- Plain, friendly language at the reading level of the product's users; no jargon the audience would not use.
</constraints>

<output_format>
## Copy
Two variants, each as: Headline / Body / Button / Dismiss. Then "Recommended:" with the reason.
## Dismiss behaviour
## Targeting rules
A table: Rule | Setting.
## Accessibility
## Measure
</output_format>
