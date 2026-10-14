---
schema: 1
id: write-internal-kb-article
kind: prompt
title: Write an internal support knowledge article
description: Writes an agent-only knowledge article from a solved case - how to recognise it, checks to confirm, the fix, policy limits, the macro to use and when to escalate.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [support-agent, operations-manager, technical-writer]
requires: [none]
inputs: [ticket, notes, message]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [internal-knowledge-base, agent-playbook, solved-case, knowledge-centred-service, case-reuse]
pairs_with:
  prompts: [build-support-macros, write-help-center-article, summarize-support-conversation, write-known-issue-brief]
  rules: [support-commitment-rules]
args:
  - name: solved_case
    description: The resolved ticket thread or a summary of it, including what the customer reported, what was checked, what fixed it, and any dead ends.
    type: text
    required: true
  - name: internal_context
    description: Tools and screens agents use, relevant policy limits, who to escalate to, existing macros or help articles. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Title, Applies when, How to confirm, Resolution, Policy and limits, Customer wording, Escalate when, Article metadata]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a solved support case into an internal knowledge article that lets the next agent solve the same problem in minutes. Internal articles differ from public help articles: the reader is an agent mid-ticket who needs to recognise the case from what the customer says, confirm it with internal tools, apply the fix within policy, and know exactly where their authority ends. Most internal knowledge bases rot because articles are written as stories ("customer X had a weird issue and we eventually found..."), titled with internal jargon nobody searches for, missing the checks that distinguish lookalike problems, and never updated. Good practice, often called knowledge-centred service, is to capture the article while the case is fresh, title it in the customer's words, keep it short and structured, and record when it was last confirmed.
</context>

<task>
<solved_case>
{{solved_case}}
</solved_case>

{{#internal_context}}
<internal_context>
{{internal_context}}
</internal_context>
{{/internal_context}}

1. Write a title in the words customers use to describe the symptom, with one internal term in brackets if agents search by it.
2. "Applies when": the customer-reported symptoms and the environment or plan where this happens, plus lookalike problems this article does NOT cover and how to tell them apart.
3. "How to confirm": the specific checks in internal tools, in order, with what you expect to see.
4. "Resolution": numbered steps for the agent, then any steps the customer must do. Mark steps that change customer data or money and need care.
5. "Policy and limits": what the agent may offer (credits, exceptions), what needs approval, and anything they must not promise.
6. "Customer wording": two or three sentences an agent can adapt, or the name of the existing macro to use.
7. "Escalate when": conditions and the team or queue, plus what to include.
8. "Article metadata": source ticket reference, product version, date, owner, and a review date.
9. Leave out the dead ends unless one of them is a common wrong turn; then add it as a "Do not" line.
</task>

<constraints>
- Use only what the case and context show. If a step's exact screen or setting name is unclear, write `[CHECK: ...]`.
- Strip customer personal data; keep the ticket reference only.
- Keep it under about 400 words, scannable, with no narrative.
- Do not generalise a one-off fix into a rule unless the case shows the cause; say "seen once" if that is all the evidence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Title
One line.

## Applies when
Symptoms, scope, lookalikes.

## How to confirm
Numbered checks.

## Resolution
Numbered steps.

## Policy and limits
Bullets.

## Customer wording
Short text or macro name.

## Escalate when
Conditions, destination, what to include.

## Article metadata
Source, version, date, owner, review date, confidence (seen once or confirmed pattern).
</output_format>
