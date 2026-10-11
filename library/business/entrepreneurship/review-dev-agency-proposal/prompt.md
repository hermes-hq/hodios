---
schema: 1
id: review-dev-agency-proposal
kind: prompt
title: Review a development agency proposal
description: Reviews a development agency or freelancer proposal for your MVP - scope gaps, estimate realism, who owns the code, payment terms, support and red flags - with questions to send back.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [review]
role: [founder]
advice_risk: [legal]
requires: [none]
inputs: [document, text]
output: [report, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [vendor-proposal, software-quote, code-ownership, milestone-payments, scope-gaps]
pairs_with:
  prompts: [spec-app-idea-for-developers, choose-mvp-build-approach, compare-freelancer-proposals, review-software-development-agreement]
args:
  - name: proposal
    description: The proposal text - scope, features, estimate, team, timeline, payment terms, ownership and support terms. Paste it in full if you can.
    type: text
    required: true
  - name: brief
    description: What you asked them to build (your brief or a summary), your budget and deadline, and any other quotes you received.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Scope match, Estimate check, Ownership and terms, Red flags, Questions to send, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders judge software development proposals before they sign. The risks are predictable: a low headline price that covers only part of what was asked, with the rest billed later as change requests; vague line items ("backend development - 120 hours") that hide assumptions; no testing, project management or deployment in the estimate; the agency keeping ownership of code or hosting accounts; large upfront payments not tied to delivered milestones; no warranty period for bugs; and a team that changes after signing. Comparing quotes only works when each quote covers the same scope.

<proposal>
{{proposal}}
</proposal>

<brief>
{{brief}}
</brief>
</context>

<task>
1. Summary: what the proposal offers, total cost, timeline and team, in a few lines.
2. Scope match: map each item in the founder's brief to the proposal - covered, partly covered, missing or unclear. List items in the proposal the founder did not ask for.
3. Estimate check: look for missing work (design, testing, project management, deployment, app store submission, admin tools, emails, data migration), padded or vague line items, and whether the timeline fits the team size. Judge realism relative to the scope and any other quotes given, without inventing market rates.
4. Ownership and terms: who owns the code, designs and data; who holds the hosting, domain and app store accounts; access to the source code repository during the project; payment schedule versus milestones; change request pricing; warranty and bug-fix period; support and maintenance after launch; termination and handover; confidentiality.
5. Red flags, ranked by severity.
6. Questions to send back to the vendor, written so they can be pasted into an email.
7. Verdict: proceed, negotiate (list the changes), or get other quotes, with reasons.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state market day rates or claim a price is too high or too low in absolute terms; compare with the scope and other quotes the founder provided.
- Treat ownership and contract terms as items to confirm in the written contract, and recommend a lawyer review before signing if the contract is large or unclear.
- Do not assume something is included because it is common; if the proposal does not say it, mark it unclear.
</constraints>

<output_format>
## Summary
## Scope match
Table: Brief item | In proposal? | Note.
## Estimate check
## Ownership and terms
Table: Term | What the proposal says | Risk | What to ask for.
## Red flags
Numbered, most serious first.
## Questions to send
## Verdict
</output_format>
