---
schema: 1
id: design-contextual-help
kind: prompt
title: Design contextual help in a product
description: Designs in-product help for a screen or feature, choosing per spot between better labels, inline hints, tooltips, help panels, walkthroughs and docs links, with content and trigger rules.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, technical-writer]
requires: [none]
inputs: [text, image, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [in-product-help, tooltips, inline-hints, user-assistance, support-deflection]
pairs_with:
  prompts: [design-onboarding-flow, build-accessible-tooltips, write-help-center-article, write-ux-microcopy, design-help-center-structure]
  personas: [ux-writer, product-designer]
args:
  - name: screen_context
    description: The screen or feature (description or screenshot), who uses it, where users get stuck or ask support (tickets, session recordings, search terms in docs), existing help content, and any terms or concepts that are new to users.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Confusion points, Fix first, Help pattern per spot, Content drafts, Trigger and dismissal rules, Accessibility, Measuring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Help in the interface is a last resort, not a first one: a clearer label, a better default or an example value removes more confusion than a tooltip ever explains. When help is needed, the pattern should match the need: inline hint text for what a field expects, a tooltip for a short definition on demand (never essential information, which mobile users and many keyboard users cannot reach reliably), an expandable or side panel for concepts that take a paragraph, a walkthrough only for genuinely multi-step tasks, and a docs link for depth. Help that appears on every visit gets dismissed unread; help that cannot be found again is lost after the first dismissal.
</context>

<task>
<screen_context>
{{screen_context}}
</screen_context>

If the screen and its confusion points cannot be identified from the input, ask for a screenshot or description and the support evidence, and stop.

1. **Confusion points.** List each place users get stuck, with the evidence given or marked as a hypothesis, and the underlying cause (unfamiliar term, unclear consequence, missing example, hidden rule, multi-step task).
2. **Fix first.** For each point, whether a design or copy change (label, default, example, inline validation, layout) would remove the need for help, and what that change is.
3. **Help pattern per spot.** For what remains, the pattern chosen and why: inline hint, tooltip or toggletip, expandable help, side panel, empty-state guidance, walkthrough, docs link, or contact support.
4. **Content drafts.** Exact text for each item: short, task-focused, using the user's words, with an example where it helps and a link only when the destination answers the question.
5. **Trigger and dismissal rules.** On demand versus proactive, when proactive help appears (first use, after an error, after hesitation), how it is dismissed, and how to find it again.
6. **Accessibility.** Help that appears on hover or focus can be dismissed without moving the pointer or focus, can be hovered without disappearing, and stays until dismissed (WCAG 1.4.13 Content on Hover or Focus). Prefer toggletips opened by click or tap over hover-only tooltips, associate hints with their fields for screen readers, keep focus order in panels, and never put essential information only in a tooltip.
7. **Measuring.** How to tell it worked: fewer tickets on the topic, fewer errors on the field, help open rate falling over time.
</task>

<constraints>
- Never use a tooltip for information a user needs to complete the task.
- Do not invent product behaviour to explain; where the rule is unclear, mark it [confirm].
- No more than one proactive help element on a screen at once.
{{> output/uncertainty}}
</constraints>

<output_format>
## Confusion points
| Spot | Evidence | Cause |
## Fix first
## Help pattern per spot
| Spot | Pattern | Why |
## Content drafts
## Trigger and dismissal rules
## Accessibility
## Measuring
</output_format>
