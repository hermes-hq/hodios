---
schema: 1
id: migrate-views-to-declarative-ui
kind: prompt
title: Migrate views to declarative UI
description: Plans an incremental move from UIKit to SwiftUI or Android Views to Jetpack Compose, with two-way interop, screen order, state hoisting, theming, previews and per-screen risks.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [mobile-engineer, tech-lead]
stack: [swiftui, android]
requires: [none]
inputs: [file, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [jetpack-compose, uikit, interop, state-hoisting, design-tokens, incremental-rollout]
pairs_with:
  prompts: [plan-incremental-migration]
  personas: [migration-engineer, swift-ios-engineer]
args:
  - name: platform
    description: Which move this is. ios means UIKit (or storyboards) to SwiftUI; android means XML Views and Fragments to Jetpack Compose.
    type: enum
    enum: [ios, android]
    required: true
  - name: screen_code
    description: Code for one representative screen (view controller or Fragment, its layout or storyboard notes, view model or presenter) and any custom views it uses.
    type: text
    required: true
  - name: app_context
    description: Optional. Minimum OS version, number of screens, navigation approach, architecture (MVVM, MVI, coordinators), design system, team size and release cadence.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Interop approach, Screen order, Converted screen, Theming and previews, Risks per screen, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mobile team wants to adopt declarative UI without a rewrite. Platform: {{platform}}. The moves that work are incremental: new and leaf screens first, both frameworks hosting each other during the transition, and state owned outside the view so it survives the switch. They fail when a team starts with the most complex screen, keeps business logic inside view controllers or Fragments, rebuilds the design system twice, or discovers late that the minimum OS version blocks APIs they planned on. Accessibility, performance of long lists and navigation are the usual regressions.
{{#app_context}}
App context:
{{app_context}}
{{/app_context}}
</context>

<task>
<screen_code>
{{screen_code}}
</screen_code>

1. Readiness: check the minimum OS or API level against the declarative APIs the plan needs and name anything to confirm in the official documentation (iOS: availability of the navigation and list APIs used; Android: Compose BOM version, Kotlin and compiler plugin alignment). Check whether logic lives in the view layer; if it does, the first step is moving it to a view model with observable state.
2. Interop in both directions:
   - ios: `UIHostingController` to put SwiftUI inside UIKit screens and navigation; `UIViewRepresentable` or `UIViewControllerRepresentable` to wrap existing custom views, with a Coordinator for delegates.
   - android: `ComposeView` in XML layouts and Fragments (with the right view composition strategy for the Fragment lifecycle); `AndroidView` to embed existing Views; keep the existing navigation until most screens are converted.
3. Order screens by value and risk: leaf, low-traffic or new screens first; shared components (buttons, cells, text styles) early as small units; navigation containers and screens with complex gestures, maps, web views or camera last. Give a rough relative size per screen.
4. Convert the given screen: hoist state to the view model, expose immutable UI state plus event callbacks, keep side effects out of the view body (`task` or `onAppear` on iOS; `LaunchedEffect` and lifecycle-aware collection on Android), use stable identifiers in lists, and keep accessibility labels, dynamic type or font scaling, and test tags.
5. Theming: one source of design tokens (colours, typography, spacing) mapped into both the old and new frameworks so screens look the same side by side, with dark mode.
6. Previews and tests: previews with fake state for loading, empty, error and long-content cases; snapshot or UI tests that run on both the old and new screen before switching.
7. Rollout: ship each screen behind a remote flag where practical, compare crash rate, screen load time and key funnel metrics, then delete the old screen and its layout or storyboard.
</task>

<constraints>
- Plan an incremental migration; recommend a full rewrite only if the user asks, and then state the trade-off.
- Do not invent API names, availability or library versions. If you are unsure whether an API exists at the stated minimum OS or API level, say so and name the documentation page to check.
- If the screen code, minimum OS version or navigation approach is missing and it changes the plan, ask, and mark assumptions as [X].
- Keep the converted screen behaviourally identical, including accessibility.
{{> output/uncertainty}}
</constraints>

<output_format>
## Readiness check
Bullets: blockers, things to confirm, prerequisite refactors.

## Interop approach
How old and new host each other here, with a short code sketch for each direction.

## Screen order
Table: screen or component | why now | size (S, M, L) | dependencies.

## Converted screen
Code for the given screen: UI state type, view model changes and the declarative view.

## Theming and previews
Token mapping and the preview states to provide.

## Risks per screen
Table: screen | risk (accessibility, list performance, navigation, gestures, lifecycle) | check before release.

## Open questions
Bullets.
</output_format>
