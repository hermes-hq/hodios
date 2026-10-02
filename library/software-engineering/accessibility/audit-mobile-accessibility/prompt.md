---
schema: 1
id: audit-mobile-accessibility
kind: prompt
title: Audit a mobile screen for accessibility
description: Audits an iOS, Android, React Native or Flutter screen for labels, traits, focus order, text scaling, touch targets, contrast and gestures, with platform fixes and a VoiceOver or TalkBack test script.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, verify]
role: [mobile-engineer, qa-engineer, designer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [file, image, text]
output: [report, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voiceover, talkback, mobile-accessibility, wcag, dynamic-type, touch-targets]
pairs_with:
  personas: [accessibility-specialist, mobile-engineer]
  prompts: [write-screen-reader-test-plan, review-color-contrast, audit-web-accessibility]
args:
  - name: screen
    description: The screen to audit, as a description of its elements and behaviour, a screenshot, or both, including any custom gestures and dynamic content.
    type: text
    required: true
  - name: platform
    description: Platform or framework the screen is built with.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
  - name: code
    description: The screen's source code (SwiftUI or UIKit, Jetpack Compose or Views, React Native, Flutter), if available.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Findings, Screen reader test script, Not checked]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mobile accessibility bugs are mostly invisible to sighted developers testing by tapping: an icon button that VoiceOver reads as "button" or TalkBack reads as "unlabelled", a card whose five text pieces are read as five separate stops, focus that jumps to the bottom of the screen after a dialog closes, text that clips or overlaps at the largest font sizes, a 28-point close button, a swipe-to-delete with no alternative for people who cannot swipe, and status messages that change silently. Each platform has its own accessibility API, so fixes must use the platform's own properties, and the only reliable check is a real screen reader run.
</context>

<task>
Audit this {{platform}} screen for accessibility.

<screen>
{{screen}}
</screen>

{{#code}}
<code>
{{code}}
</code>
{{/code}}

1. Check each area, using the code when given and the description or screenshot otherwise:
   - **Labels and names:** every interactive element and meaningful image has a concise accessible name that says what it is or does; decorative images are hidden from assistive technology; labels do not repeat the role ("button") or include visible-only cues ("tap the red icon").
   - **Roles, traits and states:** buttons, headings, links, toggles, tabs and adjustable controls expose the right role, and state (selected, checked, expanded, disabled) is exposed and announced when it changes.
   - **Grouping and focus order:** related content is grouped into one stop where that helps (a list cell, a card); reading and focus order follows the visual and logical order; focus moves sensibly when dialogs, sheets or new content appear and returns when they close.
   - **Text scaling:** text uses scalable type (Dynamic Type on iOS, sp units or scalable typography on Android, font scaling left enabled in React Native and Flutter) and the layout reflows without clipping or overlap at the largest accessibility sizes.
   - **Touch targets:** at least 44 by 44 points on iOS (Apple's guidance) and 48 by 48 dp on Android and Material (Google's guidance), with adequate spacing; WCAG 2.2 sets 24 by 24 CSS pixels as the minimum.
   - **Contrast and colour:** text contrast at least 4.5:1 (3:1 for large text) and 3:1 for icons and control boundaries, in light and dark mode; colour is never the only signal.
   - **Gestures and motion:** every custom or multi-finger gesture (swipe actions, long press, drag to reorder) has an accessible alternative such as custom accessibility actions or a visible button; animations respect the reduce-motion setting.
   - **Announcements:** errors, loading results and toasts are announced to screen readers (live regions or announcements) without stealing focus unnecessarily.
2. For each problem found, give the fix using the platform's own API:
   - ios: `accessibilityLabel`, `accessibilityHint`, `accessibilityTraits` or SwiftUI `.accessibilityAddTraits`, `accessibilityElement(children: .combine)` or `shouldGroupAccessibilityChildren`, `accessibilityCustomActions` or `.accessibilityAction`, `UIFont.preferredFont(forTextStyle:)` with `adjustsFontForContentSizeCategory` or SwiftUI text styles, and `UIAccessibility.post(notification:argument:)`.
   - android: `contentDescription`, Compose `Modifier.semantics { }` with `contentDescription`, `role`, `stateDescription` and `heading()`, `mergeDescendants`, `importantForAccessibility`, `accessibilityHeading`, `accessibilityLiveRegion`, custom accessibility actions, `minimumInteractiveComponentSize`, and sp text sizes.
   - react-native: `accessible`, `accessibilityLabel`, `accessibilityHint`, `accessibilityRole` or `role`, `accessibilityState`, `accessibilityActions` with `onAccessibilityAction`, `importantForAccessibility`, `accessibilityElementsHidden`, `hitSlop`, `allowFontScaling`, and `AccessibilityInfo.announceForAccessibility`.
   - flutter: `Semantics` (label, button, header, value), `MergeSemantics`, `ExcludeSemantics`, `Semantics` custom actions, `SemanticsService.announce`, text that respects `MediaQuery` text scaling, and `kMinInteractiveDimension`.
   Show a short before-and-after code snippet for each fix when code was given.
3. Map each finding to its WCAG 2.2 success criterion and rate severity by user impact: blocker (a task cannot be completed with a screen reader, switch control or large text), serious, moderate or minor.
4. Write a manual screen reader test script for the screen on the platform's reader (VoiceOver for iOS, TalkBack for Android, both for cross-platform frameworks): the setting to enable, the gestures to use (swipe right and left to move, double-tap to activate, the rotor or reading controls, the escape or back gesture), and for each step what should be announced. Add checks for the largest text size, a switch or keyboard pass if relevant, and the automated tools to run (Xcode Accessibility Inspector, Android Accessibility Scanner, Espresso or Compose accessibility checks, Flutter's accessibility guideline tests).
</task>

<constraints>
- Report only problems you can see in the code, description or screenshot. Mark anything that can only be confirmed on a device as "verify on device" and put it in the test script.
- Use only APIs that exist on the named platform; if you are unsure of an API's exact name or availability for the OS version, say so.
- Prefer native semantics and standard controls over custom accessibility workarounds.
- Do not claim the screen is compliant; an audit from code or screenshots cannot prove that.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
The number of findings by severity and the most important fix, in at most 4 lines.
## Findings
Numbered, most severe first. Each: element, problem, who is affected, WCAG criterion, severity, fix (with code when available).
## Screen reader test script
Numbered steps: action or gesture, expected announcement or result.
## Not checked
What could not be assessed from the input and how to check it.
</output_format>
