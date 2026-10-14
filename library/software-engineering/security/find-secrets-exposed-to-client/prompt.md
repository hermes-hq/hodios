---
schema: 1
id: find-secrets-exposed-to-client
kind: prompt
title: Find secrets shipped to browsers and apps
description: Finds keys and secrets shipped to browsers or mobile apps through public env prefixes, bundles, source maps and app packages, separates truly public keys, and moves secrets server side.
category: security
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [frontend-engineer, mobile-engineer, fullstack-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [report, diff, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [client-side-secrets, environment-variables, source-maps, api-keys, bundles]
pairs_with:
  prompts: [audit-repo-for-secrets, respond-to-leaked-secret, plan-secrets-management, review-mobile-app-security]
  personas: [security-auditor]
args:
  - name: app
    description: The web or mobile app, its framework and build tool (Vite, Next.js, Create React App, Expo, native iOS or Android), and the third-party services it calls.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Exposed values, Classification, Changes, Rotation needed, Prevention, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Anything in a client bundle or app package is public: minification and obfuscation do not hide strings, and app packages can be unpacked in minutes. Build tools copy environment variables into the bundle by prefix (`NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`, `EXPO_PUBLIC_`, `NUXT_PUBLIC_`, SvelteKit's public env), so a secret given one of those prefixes "to make it work" ships to every user. Other routes: config files imported by client code, source maps published to production that contain original source and comments, and native config files or string resources in mobile apps. Not every key is a secret, though: Firebase web config, Stripe publishable keys, Supabase anon keys and Maps browser keys are designed to be public and are protected by rules, restrictions or server-side checks. The real job is telling the two apart, moving true secrets (Stripe secret keys, OpenAI or other LLM API keys, database URLs, service role keys, signing secrets) behind a server endpoint, and restricting the public ones.
</context>

<task>
Find secrets exposed to clients in {{app}}.

1. Read the build configuration and list every environment variable exposed to the client by prefix or explicit `define`/`env` config, and every import of config or secret files from client code.
2. Build the app for production locally and search the output (`dist/`, `.next/static`, `build/`, the APK or IPA contents if the project builds one) for key patterns, the names of known secret variables, and high-entropy strings. Check whether source maps are emitted and published.
3. For mobile, check native config (`Info.plist`, `AndroidManifest.xml`, `strings.xml`, `gradle.properties`, embedded JSON) and hard-coded strings in code.
4. Classify each value: public by design (and whether its restrictions are set, such as referrer, bundle id or security rules), or secret. Never print values; show variable name, file and the first few characters only if needed to identify the type.
5. For each secret, move the call that needs it to a server endpoint, edge function or backend proxy that authenticates the user and rate limits, and remove the variable from the client build.
6. List which secrets were ever shipped in a release and therefore must be rotated, with the provider and the order to do it.
7. Add prevention: a CI check that fails when a secret pattern appears in build output, lint or naming rules so server-only variables cannot get a public prefix, and hidden or unpublished source maps.
8. Rebuild and search the output again to confirm the secrets are gone; run the tests.
</task>

<constraints>
- Never print secret values in the report, logs or commits.
- Do not rotate keys yourself; give the steps and note what breaks during rotation.
- Do not mark a public-by-design key as safe without checking its restrictions or rules.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Exposed values
Table: variable or string, where it ships (bundle, source map, app package), file.
## Classification
Table: value, public by design or secret, restrictions in place, action.
## Changes
One line per file: `path`, what changed.
## Rotation needed
Ordered list of secrets to rotate, provider, and impact.
## Prevention
The CI check and rules added.
## Verification
Build output searched again and the actual result.
</output_format>
