---
schema: 1
id: react-native-rules
kind: rule
title: React Native rules
description: Standing rules for React Native code covering platform-specific files, list performance, navigation, native module boundaries, permissions, secure storage and testing on real devices.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [react-native]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [flatlist, navigation, permissions, secure-storage, native-modules]
applies_to: ["**/*.tsx", "**/*.ts", "**/*.jsx", "app.json", "app.config.*", "ios/**", "android/**"]
pairs_with:
  rules: [react-component-rules, typescript-strict-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this React Native app:

**Know the project first**
- Check `package.json` for the React Native version, whether the app uses Expo (managed or with prebuild) or bare React Native, and which navigation, state and storage libraries are installed. Use what is there. In an Expo project, prefer Expo modules and config plugins over editing `ios/` and `android/` by hand.

**Platform differences**
- Handle small differences with `Platform.select` or `Platform.OS`. When a component differs substantially, use platform files (`Button.ios.tsx`, `Button.android.tsx`) with the same exported props type.
- Test every UI change on both iOS and Android; do not assume behaviour on one matches the other (shadows versus elevation, keyboard handling, back button, fonts).
- Wrap screens in the safe-area handling the project uses and handle the keyboard on forms (`KeyboardAvoidingView` or the project's helper).
- Handle the Android hardware back button deliberately on screens with unsaved changes or modals.

**Lists and performance**
- Render long or unbounded data with a virtualised list (`FlatList`, `SectionList` or the project's high-performance list), never `ScrollView` with `.map()`.
- Provide `keyExtractor` from stable ids, keep `renderItem` and item components memoised, and give fixed-height rows a layout hint so the list can skip measurement.
- Keep work off the JS thread during animations and gestures: use the native driver or the project's animation library's worklets. Do not run heavy computation in render.
- Judge performance in a release build on a real low-end device, not in a debug build or simulator.

**Navigation**
- Type route params for every navigator and read them through typed hooks. Pass ids in params, not large objects or functions.
- Configure deep links through the navigator's linking config and validate incoming params like any untrusted input.

**Native module boundaries**
- Keep native code behind a small, typed JavaScript interface in one module. Callers never touch `NativeModules` directly.
- Do not add a native dependency for something achievable in JavaScript or already provided by an installed library. When you add one, state the native rebuild and any pod or Gradle step it needs.

**Permissions and privacy**
- Request a permission at the moment the user takes the action that needs it, explain why first, and handle denied and permanently denied states with a path to settings.
- Add the matching usage descriptions (`Info.plist` keys or Expo config) and Android manifest entries in the same change, written in plain language.

**Secure storage and data**
- Store tokens, credentials and personal data only in the platform keychain or keystore (through the project's secure storage library). Never put them in AsyncStorage, MMKV without encryption, logs or Redux persistence.
- Never embed API secrets in the bundle; anything in the JavaScript bundle can be extracted. Call your own backend instead.
- Use HTTPS only and do not disable certificate checks or App Transport Security.

**Accessibility**
- Give touchables an `accessibilityRole` and an `accessibilityLabel` when the visible content is not descriptive, keep touch targets at least 44 by 44 points, and support dynamic font sizes without clipping.

**Tests**
- Test components with the project's testing library by role, label and text, not by implementation details. Mock native modules at the boundary module, not throughout.
- Before finishing, run the type check, lint and tests, and say plainly which platforms you actually ran the change on.
