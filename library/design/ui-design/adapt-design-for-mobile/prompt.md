---
schema: 1
id: adapt-design-for-mobile
kind: prompt
title: Adapt a desktop design for mobile
description: Adapts a desktop screen to mobile by ranking content, choosing layout changes, touch targets and a navigation pattern, and deciding what to drop or defer. Use for responsive products.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, mobile-engineer, product-manager]
requires: [none]
inputs: [text, image, spec]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [responsive-design, mobile-first, touch-targets, content-priority, progressive-disclosure]
pairs_with:
  prompts: [write-design-handoff, critique-ui-screen, design-information-architecture]
  personas: [product-designer]
args:
  - name: desktop_screen
    description: The desktop screen described region by region (or as annotated notes), its purpose, the main user tasks on it, and any analytics on what people use.
    type: text
    required: true
  - name: mobile_constraints
    description: Target devices and smallest width, native app or mobile web, navigation already used elsewhere in the product, and technical or business limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Mobile tasks, Content priority, Layout, Navigation, Interaction and touch, Dropped or deferred, Risks to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shrinking a desktop layout to a phone produces either a tiny, unusable version of everything or a long scroll where the one thing mobile users came for is buried below a hero image. Mobile users often have different tasks, one hand, intermittent attention and a slower network. A good adaptation starts from what mobile users need to do, ranks every element against that, chooses a layout transformation per region, and makes explicit what moves, collapses or is deferred.
</context>

<task>
Adapt this desktop screen for mobile.

<desktop_screen>
{{desktop_screen}}
</desktop_screen>
{{#mobile_constraints}}
<mobile_constraints>
{{mobile_constraints}}
</mobile_constraints>
{{/mobile_constraints}}

If the screen description is too thin to rank (no regions or no purpose), ask up to three questions and stop.

1. **Mobile tasks.** List the tasks people do on this screen and rank them for mobile context. Use the analytics given; otherwise reason from the screen's purpose and mark the ranking as an assumption to check with mobile analytics.
2. **Content priority.** Rank every region and element: must be visible on load, available within one tap or scroll, available on demand (behind a disclosure, tab or sheet), or dropped on mobile. Give the reason for each.
3. **Layout.** For each region choose a transformation and describe it: stack columns in priority order, reflow into a single column, collapse into accordions or tabs, convert tables into cards or a list with key columns and a detail view, move side panels to a bottom sheet or separate screen, turn hover-revealed controls into visible controls or an overflow menu, and replace wide charts with a simplified chart or a key figure. Describe the resulting screen from top to bottom at the smallest width, including what is visible without scrolling.
4. **Navigation.** Choose the pattern (bottom tab bar for 3 to 5 top destinations, top app bar with back, a menu for secondary destinations, segmented control for views of the same content) and keep it consistent with the rest of the product. Place the primary action where the thumb reaches it (bottom area or a sticky action bar) without covering content.
5. **Interaction and touch.** Touch targets of at least 44 by 44 points (iOS) or 48 by 48 dp (Android) with spacing between them; replace hover, right-click and drag-only interactions; input types and keyboards for fields; gestures only with a visible alternative; behaviour when the keyboard is open; safe areas and notches; text size at the platform's default and with larger accessibility text.
6. **Dropped or deferred.** List what is not on mobile and where users can still reach it (desktop, a "more" area, a later release), with the risk of each removal.
7. **Risks to test.** Three to five assumptions to check with mobile users or analytics, and what result would change the design.
</task>

<constraints>
- Do not invent elements that are not on the desktop screen; a new mobile-only element is marked "(new)" with the reason.
- Keep feature parity where users need it; do not remove something only because it is hard to fit. Say when a function should stay but move.
- Follow platform conventions for native apps; for mobile web, do not imitate native patterns that conflict with the browser's own controls.
{{> output/uncertainty}}
</constraints>

<output_format>
## Mobile tasks
## Content priority
| Element | Desktop location | Mobile priority | Mobile treatment | Reason |
## Layout
A top-to-bottom description of the mobile screen, then per-region transformations.
## Navigation
## Interaction and touch
## Dropped or deferred
## Risks to test
</output_format>
