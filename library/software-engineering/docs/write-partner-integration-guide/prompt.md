---
schema: 1
id: write-partner-integration-guide
kind: prompt
title: Write a partner integration guide
description: Writes an end-to-end integration guide for partners building on your API, from sandbox access through required flows, edge cases and a test checklist to go-live and support.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, developer-advocate, product-manager]
requires: [repo-read, file-write]
inputs: [spec, repo, document]
output: [docs, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-integration, partner-onboarding, go-live, sandbox]
pairs_with:
  prompts: [write-api-quickstart, write-api-authentication-guide, document-webhook-events]
args:
  - name: integration
    description: What partners must build (for example "accept payments in their POS", "sync orders from their marketplace") and the API, webhooks and sandbox details.
    type: text
    required: true
  - name: certification
    description: Whether partners must pass a review or certification before going live, and what it checks.
    type: text
output_contract:
  format: markdown
  sections: [Guide written, Gaps for partners, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quickstart gets a developer to one call; a partner integration guide gets a partner to production without a dozen support calls. Partners fail late, on the things a reference does not organise for them: which flows are mandatory versus optional, the exact order of calls for a complete business transaction, the states an object moves through, webhooks they must handle to stay in sync, error and retry cases that only show up with real traffic (timeouts, duplicates, partial failures, refunds and cancellations), sandbox behaviour that differs from production, and the go-live gate. The most useful artefact in such guides is a test checklist the partner can run in the sandbox, with magic values that trigger each edge case.
</context>

<task>
Write the partner integration guide for:

<integration>
{{integration}}
</integration>
{{#certification}}
Go-live review: {{certification}}
{{/certification}}

1. Gather the facts: the API spec, webhook events, object state machines, sandbox credentials process and test values, rate limits, and any existing partner tickets or FAQs in the repo.
2. Structure the guide:
   - Overview: what the partner builds, the parts of the API involved, and a Mermaid sequence diagram of the main transaction.
   - Before you start: account and sandbox access, credentials, environments and their base URLs, required partner configuration (webhook URL, IP allowlists, redirect URIs).
   - Required flows: each mandatory flow as numbered steps with the exact calls, which data to store (IDs, idempotency keys), and the expected state after each step.
   - Keeping in sync: the webhooks to handle, how to reconcile if webhooks are missed.
   - Edge cases: timeouts and retries with idempotency, duplicates, partial failures, cancellations and refunds or reversals, and what to show the end user.
   - Sandbox versus production differences.
   - Test checklist: every scenario the partner must pass, with the sandbox values that trigger it and the expected result.
   - Going live: the review or certification steps, switching credentials, monitoring, and how to reach support with the right details (request IDs).
3. Link to the API reference for field-level detail instead of repeating it.
4. Check every request example against the spec or sandbox.
</task>

<constraints>
- Mark which flows are required and which optional only from the source; if unclear, ask.
- Never invent sandbox test values, SLAs, fees or certification criteria.
- Use fake credentials and example data only.
- Keep business terms consistent with the API's names.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path, sections, and which examples were checked.
## Gaps for partners
Things partners will need that the API or sandbox does not offer yet (for example no way to trigger a failure in sandbox).
## Questions for the owners
Facts to confirm before publishing.
</output_format>
