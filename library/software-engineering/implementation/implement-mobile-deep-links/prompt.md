---
schema: 1
id: implement-mobile-deep-links
kind: prompt
title: Implement mobile deep links
description: Implements iOS universal links and Android app links with hosted association files, a route table with auth and missing-content cases, deferred links after install, and a test matrix.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [mobile-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [text, config]
output: [code, config, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [deep-links, universal-links, app-links, routing, deferred-deep-links]
pairs_with:
  personas: [mobile-engineer]
  prompts: [implement-push-notifications]
args:
  - name: link_patterns
    description: The web URLs that should open the app and the screen each maps to, for example "https://shop.example.com/p/{productId} -> product page". Add your domains, bundle id or package name, and whether some screens need login.
    type: text
    required: true
  - name: platform
    description: The app's platform or cross-platform framework.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Route table, Association files, App configuration, Routing code, Deferred deep links, Test matrix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants web links to open the right screen in their {{platform}} app. Deep links fail quietly: the apple-app-site-association file is served with a redirect, the wrong content type or behind auth, so iOS never verifies it (and iOS fetches it through Apple's CDN, which caches it); Android `autoVerify` fails because assetlinks.json lists only the debug or upload key and not the Play App Signing certificate fingerprint; links typed into the browser address bar or opened from the same domain stay in the browser by design; custom URL schemes are used for things that should be verified HTTPS links, letting other apps claim them; and the router assumes the user is logged in and the item exists. Every link also needs a working web fallback.
</context>

<task>
<link_patterns>
{{link_patterns}}
</link_patterns>

1. If the domains, bundle id or package name, or Team ID are missing, list them as [X] and continue with placeholders.
2. Build the route table: URL pattern, parameters with validation (type, length), target screen, whether auth is needed, and behaviour when the content is missing or forbidden. Exclude paths that must stay on the web (checkout callbacks, password reset if handled on the web, admin).
3. Write the association files: `apple-app-site-association` (components format with paths and exclusions) and `assetlinks.json` with the release signing certificate SHA-256 fingerprints, plus hosting rules: HTTPS, no redirects, served at `/.well-known/`, `application/json`, publicly reachable.
4. Write the app configuration for {{platform}}: Associated Domains entitlement on iOS, intent filters with `android:autoVerify="true"` on Android, and the framework's linking config for React Native or Flutter.
5. Write the routing code as one parser shared by cold start, warm start and in-app links: parse, validate, then navigate with a proper back stack (opening a product from a link should allow going back to home, not exit the app). If auth is needed, store the pending route, show login, then resume it. If content is missing, show a friendly screen with a way forward.
6. Handle deferred deep links (user taps a link without the app installed): explain the options (an attribution or linking provider, Android Install Referrer, a clipboard or server-side match) with their privacy trade-offs, and recommend the simplest that fits.
7. Write the test matrix and the commands to verify: Apple's AASA validation via the CDN URL, `adb shell pm get-app-links` and `adb shell am start -a android.intent.action.VIEW -d <url>`, and an `xcrun simctl openurl` call.
</task>

<constraints>
- Treat every link parameter as untrusted input; never let a link trigger a purchase, deletion or data change without user confirmation in the app.
- Do not invent provider SDK APIs; state versions assumed.
- Ask rather than guess when a route's auth requirement is unclear.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets with [X] placeholders.
## Route table
Table: Pattern | Params and validation | Screen | Auth | Missing or forbidden.
## Association files
Both files in code blocks, then hosting rules as bullets.
## App configuration
Snippets per platform.
## Routing code
Files with names.
## Deferred deep links
Recommendation and trade-offs in under 120 words.
## Test matrix
Table: Scenario | App state (not installed, killed, background, logged out) | Steps | Expected.
</output_format>
