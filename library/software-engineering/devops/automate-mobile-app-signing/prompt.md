---
schema: 1
id: automate-mobile-app-signing
kind: prompt
title: Automate mobile app signing
description: Sets up iOS provisioning and Android keystore signing in CI with certificate and profile management, secret storage, build numbers, test-track uploads and recovery from expired certificates.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [mobile-engineer, devops-engineer]
stack: [ios, android]
requires: [none]
inputs: [config, text]
output: [config, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [code-signing, provisioning-profiles, keystore, play-app-signing, testflight, fastlane]
pairs_with:
  prompts: [design-ci-cd-pipeline, write-github-actions-workflow, triage-mobile-crash-spike]
  workflows: [mobile-app-release-track]
args:
  - name: platform
    description: Which platform's signing to automate.
    type: enum
    enum: [ios, android, both]
    required: true
  - name: ci_system
    description: The CI system and runners, for example "GitHub Actions with macOS runners", "Bitrise" or "GitLab CI with a self-hosted Mac mini".
    type: string
    required: true
  - name: current_setup
    description: How signing works today - who holds the certificates and keystore, the build tool (Xcode project, Gradle, Expo, Flutter, fastlane), bundle ids or application ids, number of apps and targets, and any pain points.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Secrets and where they live, Pipeline config, Build numbers, Store upload, Expiry and recovery, Checklist, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You move mobile app signing off one person's laptop and into CI so any release can be built, signed and uploaded the same way every time. The usual failures: certificates and profiles created by hand and expiring without warning; an Android upload key that only one person has, with no backup; signing secrets echoed into logs or available to builds from forks; build numbers that collide when two branches build at once; and a "works on my machine" Xcode automatic-signing setup that breaks on a clean runner.

Platform: {{platform}}
CI: {{ci_system}}
</context>

<task>
{{#current_setup}}
<current_setup>
{{current_setup}}
</current_setup>
{{/current_setup}}

1. Choose the approach and say why:
   - iOS: a shared signing store (for example fastlane match in a private encrypted repo or bucket, or the CI vendor's managed signing) versus API-key-driven automatic signing with an App Store Connect API key. Use distribution certificates and App Store profiles for release, ad hoc or development only where needed. Note the account role the API key needs and that it must be least privilege.
   - Android: Play App Signing with a separate upload key (recommended, so a lost upload key can be reset through Play support), the keystore stored as an encrypted secret, and the Gradle `signingConfigs` reading passwords from environment variables, never from `build.gradle` or `gradle.properties` in the repo.
2. Secrets: list each secret (certificate and password, profile or match passphrase, API key, keystore and passwords), where it lives (CI secret store scoped to protected branches or environments), who can read it, and how the runner receives it (temporary keychain on macOS created and deleted per job; keystore decoded to a temp path and deleted after).
3. Write the pipeline config for the named CI: install pinned tool versions, restore signing, set the build number, build and sign the release artifact (IPA, AAB), upload, then clean up keychains and files in an always-run step. Restrict signing jobs to protected branches and tags; never run them for pull requests from forks.
4. Build numbers: monotonic and unique (CI run number plus an offset, or the latest store build plus one), separate from the marketing version; explain the choice.
5. Upload: iOS to TestFlight, Android to an internal or closed testing track, with release notes from the changelog. Promotion to production stays a deliberate, manual or gated step.
6. Expiry and recovery: renewal reminders before certificate and API key expiry (calendar plus a scheduled CI job that checks expiry dates), what to do when a distribution certificate expires or is revoked (App Store installs keep working, while ad hoc and enterprise builds signed with a revoked certificate can stop launching; new builds need a new certificate and profiles), and the Android upload-key reset path. Keep an offline, access-controlled backup of the keystore and passphrases.
</task>

<constraints>
- Never put secrets, passwords or key material in the repository, in plain CI variables visible to logs, or in example output; reference them through the named CI's secret syntax with placeholder names.
- Do not lose or rotate the Android app signing key; only the upload key is handled in CI when Play App Signing is used. Warn clearly if the user does not use Play App Signing.
- Do not invent bundle ids, team ids or app ids; use placeholders and list them.
- Say which steps need a human with account owner or admin rights.
- Tool flags change between versions; name the version assumed and tell the user to check it.
</constraints>

<output_format>
## Approach
Per platform, three to five lines.
## Secrets and where they live
Table: secret | used for | stored in | scope | rotation.
## Pipeline config
One fenced block per platform for the named CI, plus any lane or Gradle snippet.
## Build numbers
Short explanation and the snippet.
## Store upload
Bullets.
## Expiry and recovery
Table: item | expires | warning | recovery steps.
## Checklist
One-time setup steps in order, marking which need an account admin.
## Open questions
Bullets, or "None".
</output_format>
