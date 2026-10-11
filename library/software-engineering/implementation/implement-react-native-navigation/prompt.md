---
schema: 1
id: implement-react-native-navigation
kind: prompt
title: Implement React Native navigation
description: Implements React Native navigation with Expo Router or React Navigation, covering stacks, tabs and modals, auth gating without back-button leaks, typed params and deep-link mapping.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, frontend-engineer]
stack: [react-native, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [navigation, expo-router, react-navigation, auth-flow, typed-routes]
pairs_with:
  prompts: [implement-mobile-deep-links, implement-protected-routes]
  personas: [react-native-engineer]
args:
  - name: nav_spec
    description: The screens and flows, for example "onboarding, sign in, then tabs for Home, Search, Profile; product detail from Home and Search; settings as a modal".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Navigation tree, Auth gating, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React Native engineer building the app's navigation. Navigation structure decides back-button behaviour, deep links and how auth works, and it is expensive to change later:
- Expo Router (file-based, built on React Navigation) or React Navigation (configured in code): follow what the project uses. Do not mix both.
- Auth gating: render the signed-in and signed-out screen groups conditionally on auth state (React Navigation's recommended pattern; in Expo Router, protected route groups or a redirect in the layout, depending on the SDK version). Navigating to Home with `navigate()` after sign-in leaves the sign-in screen in the history, so Android back returns to it. Show a splash while the stored session is restored, to avoid a flash of the sign-in screen.
- Typed params: declare a param list per navigator (React Navigation's global `RootParamList` declaration) or use Expo Router's typed routes, so wrong params fail at compile time.
- Pass ids as params, not whole objects. Params must be serialisable for deep links and state persistence, and objects go stale.
- Structure: tabs nested in a root stack; modals and full-screen flows at the root so they cover the tab bar; detail screens that can open from several tabs either live in each tab's stack or in the root stack, chosen on purpose. Avoid double headers from nested navigators.
- Deep links: the linking config (or file routes) must map every path to a screen in the tree, including screens behind auth, which should land after sign-in. Hosting the association files for universal and app links is a separate step.
- Android hardware back, gestures on iOS, and screen focus events (`useFocusEffect`) for refreshing data on return.
</context>

<task>
Build navigation for:
{{nav_spec}}

1. Read `package.json` (Expo SDK, Expo Router or React Navigation versions), the current navigation code, auth state handling and tests.
2. Write the navigation tree: navigators, screens, params, modals and where each detail screen lives.
3. Write the auth gating: how state switches screen groups, the splash during restore, and deep links into protected screens.
4. Implement the navigators or route files, typed params, auth gating, linking config, and focus-based refresh where screens need it.
5. Write tests with React Native Testing Library: signed-out user sees sign-in and cannot go back into the app, sign-in replaces the auth stack, a deep link to a detail screen opens it with the right params, a protected deep link lands after sign-in.
6. Run the tests, `tsc --noEmit` and the linter. Fix what fails.
</task>

<constraints>
- Do not mix Expo Router and manual React Navigation containers.
- Never pass non-serialisable values as params.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Navigation tree
An indented outline of navigators and screens with their params.
## Auth gating
How signed-in and signed-out states switch, and deep links into protected screens.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
