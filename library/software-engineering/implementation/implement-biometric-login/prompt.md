---
schema: 1
id: implement-biometric-login
kind: prompt
title: Add biometric unlock to a mobile app
description: Adds Face ID, Touch ID or Android biometric unlock backed by Keychain or Keystore so biometrics unlock a stored credential, with fallbacks, enrolment changes and opt-in handled.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, security-engineer]
stack: [ios, android]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [biometrics, face-id, keychain, keystore, biometricprompt, auth]
args:
  - name: platform
    description: Platform and framework.
    type: enum
    enum: [ios-native, android-native, react-native, flutter, both-native]
    required: true
  - name: what_it_unlocks
    description: What biometrics should protect, for example "re-login without password", "confirm payments", "open the app after 5 minutes in background".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Changes, Edge cases, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Biometrics never prove anything to your server; they only let the device release a secret. The weak pattern calls `LAContext.evaluatePolicy` or `BiometricPrompt` and, on a true result, logs the user in. On a rooted or jailbroken device that boolean can be hooked. The strong pattern stores a credential (usually a refresh token, or a key that signs a server challenge) in the Keychain with an access control requiring biometry, or in the Android Keystore with a key that requires user authentication, so the secret is unusable without a real biometric match. Other things teams miss: invalidating the credential when a new fingerprint or face is enrolled, a passcode fallback policy, lockout after failed attempts, the `NSFaceIDUsageDescription` string, and making biometric unlock opt-in after a normal login.
</context>

<task>
Add biometric unlock.

Platform: {{platform}}
Protects: {{what_it_unlocks}}

1. Read the current auth flow: login, token storage, session refresh, logout, and any existing secure storage wrapper or plugin (`react-native-keychain`, `expo-local-authentication`, `local_auth` with `flutter_secure_storage`).
2. Design the flow: user logs in normally, then opts in; the app stores the credential protected by biometrics; on unlock, the OS prompts and releases the credential; the app uses it with the server as usual. Say what is stored and what the server sees.
3. iOS: store the item in the Keychain with `SecAccessControlCreateWithFlags` using `.biometryCurrentSet` (invalidated when enrolment changes) and `kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly`; read it with an `LAContext` and a clear `localizedReason`; add `NSFaceIDUsageDescription` to Info.plist.
4. Android: generate a Keystore key with `setUserAuthenticationRequired(true)` and `setInvalidatedByBiometricEnrollment(true)`, encrypt the credential with it, and decrypt through `BiometricPrompt` with a `CryptoObject`; check `BiometricManager.canAuthenticate(BIOMETRIC_STRONG)` first.
5. Cross-platform: use a plugin that supports hardware-backed, biometric-bound storage, and confirm in its docs and code that it does not just return a boolean.
6. Handle edge cases: no biometrics enrolled, hardware missing, enrolment changed (key invalidated: fall back to password and re-offer opt-in), user cancels, lockout after too many attempts, device passcode removed, logout and account switch (delete the stored credential).
7. Add a setting to turn biometric unlock off, which deletes the stored credential.
8. Write unit tests around a wrapper interface for the outcomes (success, cancel, invalidated, unavailable) and list the manual device tests to run. Build and run tests; say clearly that real biometric prompts need a device or simulator enrolment.
</task>

<constraints>
- Never treat a biometric success boolean as authentication without a protected secret behind it.
- Never store passwords for biometric re-login; store a revocable token or key.
- Never send biometric data anywhere; the app never sees it.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
The flow from opt-in to unlock, what is stored where, and how the server is involved.

## Changes
One line per file: `path`, what changed.

## Edge cases
Table: Situation | What the user sees | What the app does.

## Tests
Automated tests, then manual device checks.

## Verification
Commands run and their real results.
</output_format>
