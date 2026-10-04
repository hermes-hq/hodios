---
schema: 1
id: native-mobile-accessibility-rules
kind: rule
title: Native mobile accessibility rules
description: Standing rules that make an assistant write accessible iOS, Android, React Native and Flutter UI code, with labels and traits, target sizes, text scaling, focus order and announcements.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, review]
role: [mobile-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [voiceover, talkback, dynamic-type, touch-targets, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-mobile-accessibility, audit-motor-accessibility, write-screen-reader-test-plan]
  rules: [frontend-accessibility-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change mobile UI code in SwiftUI, UIKit, Jetpack Compose, Android Views, React Native or Flutter, follow these rules. They target WCAG 2.2 AA as applied to mobile and the platform guidelines. If a request conflicts with them (for example "fix the font size so it never grows"), say what it breaks and offer an accessible alternative.

Names, roles and states
- Prefer standard platform controls (`Button`, `Toggle`, `Switch`, `TextField`, `Slider`) over tappable views; they bring roles, states and actions for free.
- Every interactive element has a concise name that matches its visible text: `accessibilityLabel` (SwiftUI, UIKit, React Native), `contentDescription` or `Modifier.semantics` (Android), `Semantics(label:)` or `tooltip` (Flutter). Do not include the role in the name ("Delete", not "Delete button").
- Expose the role and state when you build a custom control: `.accessibilityAddTraits(.isButton)` and `.isSelected`; `Role.Button` and `stateDescription`, `selected` and `toggleableState` in Compose; `accessibilityRole` and `accessibilityState` in React Native; `Semantics(button: true, selected:, checked:)` in Flutter.
- Hide purely decorative images and duplicate elements from assistive technology (`.accessibilityHidden(true)`, `contentDescription = null` with no click, `importantForAccessibility="no"` or `accessible={false}`, `ExcludeSemantics`).
- Group related pieces read as one item (a card with title, price and rating) so screen-reader users do not swipe five times per card: `.accessibilityElement(children: .combine)`, `Modifier.semantics(mergeDescendants = true)`, `accessible` on the container, `MergeSemantics`.
- Use hints only for non-obvious results, and keep them short.

Touch and input
- Touch targets are at least 44 by 44 pt on iOS and 48 by 48 dp on Android and Flutter, even when the icon is smaller; extend the hit area with padding, `minimumInteractiveComponentSize`, `hitSlop` or `contentShape`.
- Every swipe, long-press, multi-finger or drag action also exists as a visible control or a custom accessibility action (`accessibilityActions`, `customActions`, `CustomSemanticsAction`).
- Never rely on shake, tilt or timing alone; provide a button and let users turn motion triggers off.

Text and layout
- Use the platform text styles that scale with the user's font size (Dynamic Type text styles, `sp` units, React Native `allowFontScaling` left on, Flutter `TextScaler` respected). Never cap scaling to protect a layout.
- Layouts survive the largest accessibility text sizes: text wraps instead of truncating, stacks switch from horizontal to vertical, and scroll views wrap content that can grow.
- Text contrast is at least 4.5:1 (3:1 for large text), and icons and control borders at least 3:1, in light and dark mode.
- Never convey meaning by colour alone; pair it with text, an icon or a shape.
- Support both orientations unless the app's function needs one.

Focus, order and announcements
- Reading order follows the visual order; fix it with layout order first, then `accessibilitySortPriority`, `traversalIndex` or `OrdinalSortKey` only when needed.
- When a screen, sheet or dialog opens, move accessibility focus to its title or first meaningful element, and return it to the trigger when it closes (`AccessibilityFocusState`, `UIAccessibility.post(.screenChanged)`, `requestFocus` or `sendAccessibilityEvent`, `AccessibilityInfo.setAccessibilityFocus`).
- Announce asynchronous results that appear away from focus (saved, error, results loaded) with the platform announcement API or a polite live region (`accessibilityLiveRegion`, `liveRegion` in Compose), once, not repeatedly.
- Modals trap accessibility focus while open (`.accessibilityAddTraits(.isModal)`, `accessibilityViewIsModal`, `importantForAccessibility` on background, `BlockSemantics`).
- Support hardware keyboards and switch access: every control is focusable and operable without touch.

Motion and media
- Respect reduce motion (`accessibilityReduceMotion`, `ANIMATOR_DURATION_SCALE`, `AccessibilityInfo.isReduceMotionEnabled`, `MediaQuery.disableAnimations`).
- Video with speech has captions; autoplaying media is muted and can be paused.

Reporting
- When your change adds or alters interactive UI, say which screens need a manual VoiceOver and TalkBack pass and a check at the largest text size, because automated scanners and previews do not catch these reliably.
