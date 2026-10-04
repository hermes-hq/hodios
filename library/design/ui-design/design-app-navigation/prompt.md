---
schema: 1
id: design-app-navigation
kind: prompt
title: Design app navigation
description: Designs navigation for a web or mobile app from its sections and primary tasks, choosing tabs, drawers or sidebars and specifying depth, back behaviour, deep links and responsive changes.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, mobile-engineer]
requires: [none]
inputs: [text, spec, image]
output: [docs, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [navigation-patterns, tab-bar, sidebar, deep-links, back-behaviour, responsive-navigation]
pairs_with:
  prompts: [design-information-architecture, check-ui-against-platform-conventions, adapt-design-for-mobile, plan-tree-test]
  personas: [product-designer]
args:
  - name: sections
    description: The app's top-level sections and what sits under each, from the sitemap or information architecture, with rough usage if known.
    type: text
    required: true
  - name: primary_tasks
    description: The three to five tasks users do most often or that matter most to the business, with who does them and how often.
    type: text
    required: true
  - name: platform
    description: Where the app runs. cross-platform means one design that must adapt to iOS, Android and web.
    type: enum
    enum: [web, ios, android, cross-platform]
    default: cross-platform
output_contract:
  format: markdown
  sections: [Navigation model, Primary navigation, Secondary and contextual navigation, Depth and back behaviour, Deep links and entry points, Responsive and platform variants, Edge cases, How to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Information architecture decides what goes where; navigation decides how people move through it. Navigation problems usually come from forcing the sitemap straight into a menu: seven tabs on a phone, the most frequent task buried two levels deep under a hamburger, a back button that does something different from the system back gesture, tab state lost when switching, or a shared link that lands on a screen with no way up. Good navigation is built around the primary tasks, follows the platform's conventions so people's habits work, and has defined behaviour for every way into the app: launch, notification, link, search and widget.
</context>

<task>
Design the navigation.

<sections>
{{sections}}
</sections>

<primary_tasks>
{{primary_tasks}}
</primary_tasks>

Platform: {{platform}}.

1. **Navigation model:** in two or three sentences, describe the model (hub and spoke, flat tabs with stacks, sidebar with nested pages, task-led wizard) and why it suits these tasks. Name the top-level destinations and say which sections become secondary or contextual rather than top-level.
2. **Primary navigation:** choose the pattern per platform and justify it against the alternatives:
   - Mobile: a bottom tab bar or navigation bar for three to five frequently switched destinations; a drawer only for many rarely used destinations; a single stack for small task-focused apps.
   - Web: a top bar for a handful of sections, a side navigation for many sections or deep products, with collapse behaviour.
   Give the exact order, labels (short nouns, no jargon) and icon meanings, and say which destination opens on launch.
3. **Secondary and contextual navigation:** segmented controls, in-page tabs, filters, overflow menus, account and settings placement, and where search, create and notifications live. Keep primary actions (create, compose, scan) out of the navigation unless they are a destination.
4. **Depth and back behaviour:** the maximum depth per section, how users go up and back, whether each tab keeps its own stack and state, what re-tapping the active tab does, how modals and full-screen tasks are dismissed, and how unsaved changes are protected. State how the in-app back control relates to the system back gesture or browser back, following the platform's conventions.
5. **Deep links and entry points:** a URL or route scheme for key screens, what happens when a deep link opens a screen several levels down (build the parent stack so up and back make sense), links that need sign-in, links to content the user cannot access, and entry from notifications, widgets and search.
6. **Responsive and platform variants:** how the navigation changes between phone, tablet and desktop widths (for example bottom tabs to a navigation rail to a sidebar), and the differences between iOS, Android and web if cross-platform.
7. **Edge cases:** first run and empty states, role-based or feature-flagged destinations, badges and notification counts, very long labels in other languages, right-to-left layouts, keyboard and screen-reader navigation (landmarks, focus after navigation, skip links on web).
8. **How to test:** a short plan with a tree test or first-click test on the primary tasks, the success measure for each, and what result would make you change the model.
9. Before answering, check each primary task: count the taps or clicks from launch and confirm none of the top tasks is hidden behind a drawer or more than two steps from launch without a reason.
10. If the sections or tasks are too vague to design from (for example only "home, stuff, settings"), ask two or three focused questions and stop.
</task>

<constraints>
- Follow current platform conventions in general terms; do not quote specific guideline version numbers, and say where a convention should be checked against the latest platform guidelines.
- Do not redesign the information architecture; if a section's placement blocks good navigation, flag it as a recommendation instead.
- Limit top-level destinations to what fits the pattern; if there are more, show what moves where.
</constraints>

<output_format>
Markdown with the contract's sections in order. Include a table of the primary destinations (Order, Label, Icon idea, Contents, Why top-level), a navigation map as an indented tree or Mermaid diagram, and a table of primary tasks with tap or click counts.
</output_format>
