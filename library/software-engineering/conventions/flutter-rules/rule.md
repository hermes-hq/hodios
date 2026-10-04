---
schema: 1
id: flutter-rules
kind: rule
title: Flutter rules
description: Standing rules for Flutter code covering widget composition, const constructors, a single state management approach, async and BuildContext safety, theming, accessibility and widget tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [flutter]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [widgets, state-management, theming, widget-tests, buildcontext]
applies_to: ["lib/**/*.dart", "test/**/*.dart", "integration_test/**/*.dart"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Flutter app:

**Know the project first**
- Check `pubspec.yaml` for the Flutter and Dart SDK constraints and the packages already in use (state management, routing, HTTP, code generation), and follow the patterns in existing features. Do not add a package for something the project already does another way.

**Widget composition**
- Split large `build` methods into small widget classes, not helper methods that return widgets. Separate classes rebuild independently and can be `const`.
- Mark widget constructors and widget instances `const` whenever their inputs are compile-time constants, and keep the `prefer_const_constructors` lints passing.
- Keep `build` pure and cheap: no network calls, no object creation that should persist, no side effects. Create controllers, streams and futures in `initState` (or the state management layer), never in `build`.
- Give widgets in reorderable or dynamic lists stable `Key`s derived from the data.

**State management**
- Use the one state management approach the project already uses (for example Provider, Riverpod, Bloc or plain `ValueNotifier`). Do not introduce a second one. If the project has none and the feature needs shared state, ask before choosing.
- Keep business logic and I/O out of widgets: widgets read state and dispatch intents; repositories and services talk to the network and storage.
- Use `setState` only for state local to one widget, and call it only while the widget is mounted.

**Async and BuildContext safety**
- After any `await` in a widget or state method, check `if (!context.mounted) return;` (or `mounted` in a `State`) before using `context`, calling `setState` or navigating.
- Dispose every `TextEditingController`, `AnimationController`, `ScrollController`, `FocusNode`, stream subscription and timer you create, in `dispose()`.
- Show loading, error and empty states for every asynchronous view; never leave a spinner with no timeout or error path.

**Lists and performance**
- Use `ListView.builder`, `GridView.builder` or slivers for long or unbounded lists, never a `Column` inside a `SingleChildScrollView` with hundreds of children.
- Size images to their display size and cache network images with the project's approach. Profile in profile mode, not debug, before claiming a performance fix.

**Theming and layout**
- Take colours, text styles and shapes from `Theme.of(context)` (`colorScheme`, `textTheme`) or the project's design tokens. Do not hard-code colours or font sizes in widgets, and support dark mode if the app does.
- Build layouts that adapt to screen size and text scale with `LayoutBuilder`, `MediaQuery` or flexible widgets, not fixed pixel widths. Test with large text scaling.
- Respect safe areas and the keyboard (`SafeArea`, scrollable forms).

**Accessibility**
- Give icon-only buttons a `tooltip` or semantic label, and images a `semanticLabel` (or exclude decorative ones from semantics).
- Keep tap targets at least 48 by 48 logical pixels and colour contrast at WCAG AA. Do not convey meaning by colour alone.
- Make custom controls expose their role and state through `Semantics`.

**Strings**
- Put user-facing text in the project's localisation files if it has them, never inline in widgets.

**Tests**
- Add widget tests with `testWidgets` and `pumpWidget` for new screens and components, finding widgets by key, text or semantics label, and covering loading, error and data states. Unit test the logic layer without widgets.
- Before finishing, run `flutter analyze` and `flutter test`, and fix every analyzer warning you introduced.
