---
schema: 1
id: design-settings-screen
kind: prompt
title: Design a settings screen
description: Designs a settings or preferences screen with an audit of each setting, grouping, defaults, controls, search, save behaviour and safe destructive actions, following platform conventions.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, product-manager, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, spec, image]
output: [table, report, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [settings, preferences, defaults, destructive-actions, platform-conventions]
pairs_with:
  prompts: [design-information-architecture, write-ux-microcopy, design-notification-strategy, review-design-for-dark-patterns]
  personas: [product-designer]
args:
  - name: settings_list
    description: The settings the product has or needs, with what each one does, its current default and how often people change it if known. Include account, privacy, notification and danger-zone items.
    type: text
    required: true
  - name: platform
    description: Platform whose conventions apply.
    type: enum
    enum: [web, ios, android, desktop]
    default: web
output_contract:
  format: markdown
  sections: [Settings audit, Structure, Screen design, Save behaviour, Destructive actions, Search and findability, Accessibility, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior product designer. Settings screens grow by accretion: every team adds a toggle, labels describe the implementation ("Enable async sync"), groups follow the org chart, defaults are chosen to suit the business rather than the user, some toggles save instantly while others need a Save button nobody sees, and "Delete account" sits one tap from "Log out". The best settings screen has fewer settings, sensible defaults, groups named for what users want to do, and one consistent save model.
</context>

<task>
Design the settings screen for the {{platform}} platform.

<settings_list>
{{settings_list}}
</settings_list>

If the list is missing or only names categories with no settings, ask for the actual settings and stop.

1. **Settings audit.** For each setting: what the user gets from it, who changes it and how often (if known), and a recommendation: keep, rename, merge, move closer to where it is used (contextual), make automatic, or remove. Check every default: it should be the safest, most private and most common choice, and opt-in for marketing and data sharing. Mark defaults that need a product or legal decision.
2. **Structure.** Groups named for user goals ("Notifications", "Privacy", "Your account"), ordered by how often people visit, with the danger zone last. Decide between a single page and a list that drills into sub-pages based on the number of settings and {{platform}} conventions (for example a grouped list with drill-in on ios and android, a left nav with sections on web and desktop). Keep the depth to two levels.
3. **Screen design.** For each group: controls per setting (a toggle only for instant on/off effects, radio or segmented control for a few exclusive options, select for long lists, a row that opens a sub-screen for complex settings), label and one-line description, current value visible on the row, and dependent settings shown only when relevant.
4. **Save behaviour.** One model per screen: instant apply with confirmation feedback for simple preferences, explicit Save and Cancel for forms with several related fields; guard unsaved changes when leaving. Say which settings need re-authentication (email, password, two-factor) and which take effect later.
5. **Destructive actions.** For delete account, reset, remove data or leave workspace: separate placement, plain description of consequences (what is deleted, what is kept, whether it can be undone, grace period), confirmation proportional to impact (typing the name only for irreversible ones), and an export option before deletion where relevant.
6. **Search and findability.** Whether search is needed (usually beyond about 20 settings), synonyms it should match, and deep links from the rest of the product to specific settings.
7. **Accessibility.** Toggle and control labels that state the setting, state announced, adequate touch targets, keyboard order on web and desktop, and system settings respected (text size, reduced motion, dark mode).
8. **Open questions.** Decisions and facts needed from product, engineering or legal.
</task>

<constraints>
- Follow {{platform}} conventions unless there is a stated reason not to.
- No dark patterns: no pre-enabled marketing or data-sharing defaults, no burying the delete or unsubscribe option, no guilt-tripping confirmation copy.
- Do not invent settings the user did not list; suggestions for missing ones go in a separate short list.
{{> output/uncertainty}}
</constraints>

<output_format>
## Settings audit
| Setting | User value | Recommendation | Default (current → proposed) | Note |
## Structure
Grouped outline in order, with depth.
## Screen design
Per group: rows with control type, label, description, visible value.
## Save behaviour
## Destructive actions
## Search and findability
## Accessibility
## Open questions
</output_format>
