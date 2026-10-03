---
schema: 1
id: review-mobile-app-security
kind: prompt
title: Review a mobile app's security
description: Reviews an iOS or Android app against OWASP MASVS areas (storage, crypto, auth, network, platform, code, resilience, privacy) and returns ranked findings with fixes. Use before release or an audit.
category: security
version: 1.0.0
status: incubating
stage: [review, verify]
role: [mobile-engineer, security-engineer, tech-lead]
stack: []
requires: [none]
inputs: [text, repo, file, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mobile-security, owasp, masvs, secure-storage, certificate-pinning]
pairs_with:
  personas: [security-auditor]
  prompts: [review-auth-flow, review-api-security, threat-model-feature]
args:
  - name: app_description
    description: The app - what it does, data it stores, how users sign in, the backend APIs it calls, third-party SDKs, and any code, manifest, Info.plist, entitlements or network config you can paste.
    type: text
    required: true
  - name: platform
    description: Which platform or platforms to review.
    type: enum
    enum: [ios, android, both]
    default: both
output_contract:
  format: markdown
  sections: [Summary, Findings, Details, Not verified, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mobile app runs on a device the attacker may own. Anything shipped in the app bundle (API keys, endpoints, feature flags, business logic) can be extracted, so the server must enforce every rule that matters. The recurring issues: secrets in the binary; tokens or personal data in `SharedPreferences`, `UserDefaults`, plain files, logs or backups instead of the Keychain or Android Keystore-backed storage; cleartext traffic or App Transport Security exceptions; exported Android components and deep links that trigger actions without validation; WebViews with JavaScript bridges loading untrusted content; biometric checks that only flip a boolean instead of unlocking a key; sensitive screens captured in the app switcher; and third-party SDKs collecting more than the privacy labels admit. Root and jailbreak detection and obfuscation only slow an attacker down.
</context>

<task>
Review this app ({{platform}}):
<app_description>
{{app_description}}
</app_description>

1. If you can read the repository, read the manifest or Info.plist, entitlements, network security config, storage code, auth code, WebView usage and dependency list before forming findings. If only a description is given, review what it reveals and list what you would need to see.
2. Work through the OWASP MASVS areas, skipping checks that do not apply to {{platform}}:
   - **Storage:** where tokens, keys and personal data live; backups (`android:allowBackup`, iCloud and iTunes backup exclusion); logs; clipboard; screenshots and the app-switcher snapshot.
   - **Crypto:** platform keystores instead of hardcoded keys; no custom algorithms; secure random.
   - **Auth:** token storage and refresh, session expiry, server-side checks, biometrics bound to a keystore key with user authentication required.
   - **Network:** TLS everywhere, no ATS or cleartext exceptions without reason, certificate pinning only with a rotation plan and backup pins.
   - **Platform:** exported activities, services, receivers and providers; intent and deep-link validation; universal and app links verification; WebView settings and JavaScript bridges; permissions requested versus used.
   - **Code:** secrets in the binary or resources, debug flags in release builds, outdated or vulnerable SDKs.
   - **Resilience:** whether tampering or running on a rooted device matters for this app's threat model, and proportionate measures.
   - **Privacy:** data each SDK collects, consent before collection, and whether store privacy disclosures match.
3. Rank findings by severity (critical, high, medium, low) using impact and how easily it is exploited for this app, not a generic rating.
4. For each finding give the evidence (file and line, config key or the description's words), the risk in one sentence, and a concrete fix for the platform.
</task>

<constraints>
- Report only what the evidence supports; put suspected issues under Not verified with how to confirm them.
- Never suggest shipping a secret in the app with obfuscation as the protection; move it to the server or use short-lived, scoped tokens.
- Dynamic testing tools (MobSF, Frida, objection, a proxy) are for apps the reader owns or is authorised to test; say so when recommending them.
- Use current platform APIs; if an API was deprecated, name the replacement.
</constraints>

<output_format>
## Summary
Three sentences: overall risk, the worst finding, what to fix first.
## Findings
Table: id, MASVS area, severity, platform, finding, evidence.
## Details
For each critical and high finding: risk, evidence, fix with code or config.
## Not verified
Bullets: what could not be checked and how to check it.
## Test plan
Numbered checks to run on a test device or emulator before release.
</output_format>
