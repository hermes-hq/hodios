---
schema: 1
id: implement-certificate-pinning
kind: prompt
title: Decide on and implement certificate pinning in a mobile app
description: Decides whether a mobile app should pin TLS certificates and, if so, implements public key pinning with backup pins, safe rotation, expiry and a way to recover without bricking old versions.
category: security
version: 1.0.0
status: incubating
stage: [design, build]
role: [mobile-engineer, security-engineer]
stack: [ios, android]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [adr, code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [certificate-pinning, tls, mobile-security]
pairs_with:
  prompts: [review-mobile-app-security, choose-spa-token-storage, implement-biometric-login]
  personas: [security-auditor]
args:
  - name: app
    description: The app, platforms and frameworks (native, React Native, Flutter), which hosts it calls, and why pinning is being considered.
    type: text
    required: true
  - name: infrastructure
    description: Who manages the certificates for those hosts (your team, a CDN, a cloud load balancer) and how often they rotate.
    type: text
output_contract:
  format: markdown
  sections: [Decision, Pin set and rotation plan, Changes, Tests, Operational runbook]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pinning protects against a mis-issued or locally installed certificate authority intercepting traffic (Android apps targeting API 24 or later already ignore user-installed CAs by default, so on Android the remaining threat is mainly a mis-issued or compromised CA), which matters for banking, health and high-value apps, and is often required by penetration test reports. It also has a famous failure mode: when the server certificate or key changes and no shipped app version trusts the new one, every installed copy stops working until users update, and some never do. Pinning the leaf certificate breaks at every renewal; pinning the public key (SPKI hash) of your own key or an intermediate survives renewals if the key is reused. Always ship at least one backup pin for a key that is not yet in use, kept offline. CDNs and managed load balancers can change keys and intermediate CAs without notice, so pinning to them needs the provider's guidance. Use the platform's declarative mechanisms where possible: Android Network Security Config `<pin-set>` with an `expiration` date (after which pinning is not enforced), and on iOS `NSPinnedDomains` in App Transport Security (iOS 14+) or a maintained library; cross-platform apps (React Native, Flutter) need native configuration or a maintained plugin. Pinning does not stop someone reverse-engineering their own device's traffic with a modified app, so it is not an API protection. Many teams conclude Certificate Transparency checks plus standard TLS are enough; that is a valid outcome.
</context>

<task>
Decide on and, if justified, implement certificate pinning for {{app}}.
{{#infrastructure}}Certificates: {{infrastructure}}{{/infrastructure}}

1. Read the app's networking code and configuration (Network Security Config, ATS settings, HTTP clients, any existing pinning or trust overrides) and the hosts it calls.
2. Decide: weigh the app's risk, who controls the server keys, rotation frequency and the update rate of the user base. If pinning is not justified, say so, recommend the alternative, and stop after removing any unsafe trust overrides found.
3. If pinning: choose the hosts to pin (your own API, not third-party SDK hosts), pin SPKI hashes of the current key plus at least one backup key, and an intermediate only if the provider supports it. State the expiry date of the pin set.
4. Implement with platform mechanisms first: Android Network Security Config with `pin-set` and `expiration`, iOS `NSPinnedDomains` or a maintained library, and the native or plugin equivalent for React Native or Flutter. Keep debug-build overrides for local proxies out of release builds.
5. Add a reporting path for pin failures (an analytics event without sensitive data) and a remote way to warn users or force an update if pins must change.
6. Test: a server presenting a valid certificate whose key is not pinned is rejected in release builds (a user-installed proxy CA alone does not prove pinning on Android, which already distrusts it), the normal server works, a backup-key server works. Document how the team tests on a device.
</task>

<constraints>
- Never pin only the leaf certificate without a backup pin and a rotation plan.
- Never ship code that disables certificate validation or trusts all certificates, including in debug paths that can reach release builds.
- Do not invent SPKI hashes; give the commands the team runs against their real keys and leave placeholders clearly marked.
- Do not pin third-party SDK domains you do not control.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Decision
Pin or not, and why, in a few sentences.
## Pin set and rotation plan
Table: host, pinned key (current, backup), source, expiry; then the rotation steps.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and how it was run.
## Operational runbook
What to do before a key change, and what to do if pins fail in the field.
</output_format>
