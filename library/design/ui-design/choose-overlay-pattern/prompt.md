---
schema: 1
id: choose-overlay-pattern
kind: prompt
title: Choose an overlay pattern
description: Chooses between modal dialog, drawer, popover, bottom sheet, toast, inline expansion or a new page for each interaction, with reasons, behaviour rules and the mobile equivalent.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, mobile-engineer, product-manager]
requires: [none]
inputs: [text, image]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [modals, drawers, bottom-sheets, popovers, toasts, interaction-patterns]
pairs_with:
  prompts: [define-elevation-and-layering, design-destructive-action-safeguards, critique-ui-screen, design-app-navigation]
  personas: [product-designer]
args:
  - name: interactions
    description: One or more interactions to place, each with what triggers it, what the user does in it (read, choose, fill a form, confirm), how long it takes, whether the user needs to see the page behind, and any current pattern used.
    type: text
    required: true
  - name: platform
    description: Platforms the decision must cover.
    type: enum
    enum: [web, ios, android, responsive-web, desktop]
    default: responsive-web
output_contract:
  format: markdown
  sections: [Decisions, Behaviour rules, Mobile and small screens, Anti-patterns avoided]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Overlays are chosen by habit: a modal for everything, then modals on top of modals. The choice should follow from a few questions. Must the user act before continuing (modal dialog) or can they ignore it (toast, banner, inline)? Do they need the context behind (drawer, side panel, popover) or is it a separate task (new page or full-screen)? How long is the content (a choice fits a popover; a long form does not fit a modal, and loses work when dismissed by an outside click)? Should it have its own URL and back-button behaviour (page or routed panel)? On mobile, bottom sheets and full-screen views replace most desktop modals and popovers, and platform conventions differ between iOS and Android.
</context>

<task>
<interactions>
{{interactions}}
</interactions>

Decide for {{platform}}. If an interaction is described too vaguely to judge what the user does in it, ask about that one and decide the rest.

1. For each interaction, answer: must the user respond before continuing; do they need to see or use the page behind; how much content and input; is it a separate task worth a URL; how often it happens.
2. Choose one pattern: modal dialog, non-modal dialog, drawer or side panel, popover or menu, bottom sheet (partial or full), toast or snackbar, banner, inline expansion, full-screen view, or new page. Give the deciding reason in one line.
3. **Behaviour rules** for each chosen pattern: how it opens and closes (escape, close button, outside click, swipe), whether outside click is allowed when there is unsaved input, focus on open and return on close, scroll locking, back-button behaviour, stacking limits (no modal over modal; what to do instead), and whether a toast offers an action and stays long enough to use it.
4. **Mobile and small screens.** The equivalent pattern on small screens and on iOS versus Android where they differ.
5. **Anti-patterns avoided.** Name what the current or obvious choice would have got wrong.
</task>

<constraints>
- Toasts never carry information the user must act on or errors that block progress.
- Forms that take more than a few fields or minutes do not go in an outside-click-dismissable overlay.
- Do not stack overlays; propose a step within the overlay or a page instead.
- Keyboard and screen reader behaviour (focus trap for modals, return focus) is part of every decision.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions
| Interaction | Pattern | Deciding reason |
## Behaviour rules
Per pattern used: open, close, focus, scroll, back button, stacking.
## Mobile and small screens
## Anti-patterns avoided
</output_format>
