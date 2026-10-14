---
schema: 1
id: swiftui-rules
kind: rule
title: SwiftUI rules
description: Standing rules for SwiftUI code covering small views, clear state ownership, no work in body, NavigationStack routing, lists and identity, previews and accessibility.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [swiftui]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [state-ownership, observable, navigation-stack, view-identity, previews]
applies_to: ["**/*.swift"]
pairs_with:
  rules: [swift-style-rules]
  prompts: [build-swiftui-screen, split-large-swiftui-view]
  personas: [mobile-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change SwiftUI code in this project:

**Know the targets first**
- Check the deployment target before using an API. `@Observable`, `NavigationStack`, `.task(id:)` and many modifiers need recent OS versions. Use what the project's minimum version supports, or guard with `#available` and say so.
- Follow the state approach the project already uses (`@Observable` models or `ObservableObject` with `@Published`). Do not mix both in new code for the same feature.

**State ownership**
- Every piece of state has exactly one owner. A view that owns simple local state uses `@State private var`. A view that creates an observable model owns it with `@State` (for `@Observable`) or `@StateObject` (for `ObservableObject`), never `@ObservedObject`, which gets recreated with the parent.
- Pass data down as plain values when the child only reads it. Pass a `@Binding` only when the child must write. Use `@Bindable` to get bindings into an `@Observable` model.
- Use `@Environment` for app-wide dependencies (a model shared by many screens, services, settings), not for passing one value one level down.
- Do not copy state into a second `@State` in a child; the copy goes stale. Derive values with computed properties instead.

**Keep `body` cheap and pure**
- `body` runs often and must not have side effects: no network calls, no writes to models, no `print`-driven debugging left behind, no heavy formatting or sorting of large collections. Precompute in the model.
- Start async work with `.task` (or `.task(id:)` to restart when an input changes) so it is cancelled when the view disappears. Do not start work in `init` or `onAppear` with an unowned `Task {}`.
- Update UI-facing state on the main actor. Mark view models `@MainActor`.

**Small views and composition**
- Split a view when `body` passes about 40 to 60 lines or when a section has its own state. Extract subviews as separate `View` structs, not as computed properties returning `some View`, so SwiftUI can diff them independently.
- Prefer custom `ViewModifier`s and styles (`ButtonStyle`, `LabelStyle`) over repeating the same modifier chains.
- Avoid `AnyView`; use `@ViewBuilder`, `Group` or generics to keep type information and performance.

**Lists and identity**
- Give `ForEach` and `List` stable identity: `Identifiable` models or an explicit `id:` key path that never changes for an item. Never use array indices or `\.self` on values that can repeat or change.
- Use lazy stacks (`LazyVStack`, `List`) for long or unbounded content.
- Do not use `.id()` to force a refresh unless resetting the view's state is the intent; say so in a comment.

**Navigation**
- Use `NavigationStack` with value-based `navigationDestination(for:)` and a path the model can own, not the deprecated `NavigationView` or `NavigationLink(destination:)` in new code.
- Present sheets and alerts from optional or `Identifiable` state, not from several boolean flags.

**Accessibility and layout**
- Use system text styles (`.font(.body)`) so Dynamic Type works. Do not hard-code font sizes or fixed frames that clip larger text.
- Give icon-only buttons an accessibility label. Group related elements with `.accessibilityElement(children: .combine)` where it reads better.
- Use semantic colours and assets from the asset catalogue so light and dark mode both work.

**Previews and tests**
- Add a `#Preview` for every new view, with sample data covering empty, loading, error and long-text states where they exist. Previews must not hit the network.
- Keep logic in the model so it can be unit tested without the view. Test the model, not the view hierarchy.

**Before you finish**
- Build for the minimum deployment target and fix warnings you introduced, including concurrency warnings. Say what you ran.
