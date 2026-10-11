---
schema: 1
id: write-support-enablement-doc
kind: prompt
title: Write a support enablement doc
description: Writes the internal doc that teaches support how a feature works, its limits, settings, likely problems, how to diagnose them and when to escalate, from code and specs.
category: docs
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [software-engineer, product-manager, technical-writer, support-agent]
stack: []
requires: [repo-read]
inputs: [repo, spec, ticket]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [support-handoff, feature-launch, internal-docs, escalation-paths, known-limits]
pairs_with:
  prompts: [plan-launch-support-readiness, write-troubleshooting-guide, document-permissions-matrix, write-release-notes]
args:
  - name: feature
    description: The feature, with the spec, PR links or code paths that implement it.
    type: text
    required: true
  - name: notes
    description: Launch date, rollout (flag, plans, regions), known bugs, the on-call or owning team, and the support tool or ticket tags in use.
    type: text
output_contract:
  format: markdown
  sections: [Enablement doc, Questions for the team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Support usually learns about a feature from its first angry ticket. The handoff doc that prevents this is not the public help article: it tells agents how the feature really behaves, including what customers will mistake for bugs. Engineers writing it tend to describe the happy path and the architecture; support needs the opposite. They need who has it (plan, flag, region, rollout percentage), the limits and edge cases in numbers (file size, rate limits, time zones, what happens on downgrade), the error messages customers will see and what each means, what they can check themselves in admin tools, and the exact point at which to escalate with what information attached. Everything in it should be traceable to the code or spec, because agents will repeat it to customers word for word.
</context>

<task>
Write a support enablement doc for: {{feature}}
{{#notes}}Notes: {{notes}}{{/notes}}

1. Read the spec and the implementing code. Extract: who gets it (plans, roles, flags, regions), the main flows, limits and defaults (with units), validation rules, user-visible error messages, emails or notifications sent, and behaviour on edge cases (downgrade, deleted user, concurrent edits, time zones, retries).
2. Identify what customers will likely report as a bug but is intended, and what is a known bug with a workaround.
3. Describe what support can check without engineering: admin screens, account settings, audit logs or status fields, with where to find them.
4. Write troubleshooting entries for the likely problems: symptom as a customer would describe it, how to confirm, what to tell the customer, fix or workaround.
5. Define escalation: the conditions that require engineering, which team or channel, and the information to attach (account id, timestamps, request ids, screenshots).
6. Add a short summary that an agent can read in two minutes, and suggested macro wording for the top two or three questions.
</task>

<constraints>
- Every limit, number, message and behaviour must come from the code, spec or notes; anything unconfirmed goes to questions for the team, not into the doc.
- Write in plain language without code or class names; agents repeat this to customers.
- Do not promise dates, refunds, roadmap items or SLAs that are not in the notes.
- Keep customer data, internal hostnames and secrets out of examples.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Enablement doc
The doc in Markdown, with sections: Summary, Who has it, How it works, Limits and defaults, Expected behaviour that looks like a bug, Known issues, What support can check, Troubleshooting, Escalation, Suggested macros.
## Questions for the team
Checklist of gaps and unconfirmed behaviour to resolve before launch.
</output_format>
