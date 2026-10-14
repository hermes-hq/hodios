---
schema: 1
id: upgrade-third-party-api-version
kind: prompt
title: Upgrade an integration to a vendor's new API version
description: Moves an integration to a vendor's new API version before the old one is sunset, finding affected call sites and webhooks, adapting to breaking changes and rolling out with sandbox tests.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, text, url]
output: [diff, tests, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [vendor-api, api-deprecation, webhooks, sdk-upgrade, sunset-date]
pairs_with:
  prompts: [migrate-api-version, upgrade-major-dependency, migrate-payment-provider]
  personas: [migration-engineer]
args:
  - name: integration
    description: The vendor and API, current and target versions, SDK in use, and the sunset date if known.
    type: text
    required: true
  - name: changelog
    description: The vendor's migration guide or changelog text for the versions crossed, pasted in.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Version gap, Breaking changes that apply, Changes made, Webhooks, Test and rollout, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vendors pin API versions in different ways: a request header, a version in the path, an account-level default, or the SDK version. Payment and social APIs often pin the version per account and separately per webhook endpoint, so request calls and webhook payloads can be on different versions at once, and upgrading one does not upgrade the other. Breaking changes are usually listed per version in a changelog; the ones that bite are not removed endpoints but changed response shapes: renamed or removed fields, objects that are no longer expanded by default, new enum values that break exhaustive switches, changed default pagination, and new required parameters. A vendor SDK major often bundles a version change with its own interface changes. The safe pattern is to pin the new version explicitly on a small set of calls, test them in the vendor's sandbox, then widen, and to make webhook handlers accept both payload shapes during the switch. Errors from the vendor after rollout need monitoring by version.
</context>

<task>
Integration: {{integration}}
{{#changelog}}Changelog or guide: {{changelog}}{{/changelog}}

1. Read the integration code: every call site, the fields read from responses, webhook handlers and the fields they read, SDK version and where the API version is set.
2. Build the list of breaking changes for each version crossed from the provided changelog; if none was provided, ask for it or mark items "to verify" rather than recalling changes from memory.
3. Map each applicable change to call sites and handlers. Ignore changes to features the code does not use.
4. Make the changes behind a single version setting, add adapters where response shapes change, and handle new enum values with a safe default.
5. Make webhook handlers accept old and new payloads, then plan the webhook endpoint version switch separately.
6. Test against the sandbox with recorded or real responses, then plan the rollout (one call path or a percentage first), monitoring of vendor errors, and rollback by reverting the version setting.
</task>

<constraints>
- Do not invent breaking changes, field names or dates; use the provided changelog or mark "to verify".
- Do not run calls against the live production account; use the sandbox or test mode.
- Do not upgrade the webhook endpoint version and request version in one step without handlers that accept both.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Version gap
Current and target versions, sunset date, and how the version is selected (header, path, account setting, SDK).
## Breaking changes that apply
Table: change | call sites or webhook handlers affected | fix.
## Changes made
Code changes, SDK upgrade, adapters added.
## Webhooks
Webhook versioning and how handlers accept both payload shapes during rollout.
## Test and rollout
Sandbox tests, rollout steps, monitoring and rollback.
## Remaining risks
Bullets, or "None".
</output_format>
