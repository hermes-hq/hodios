---
schema: 1
id: build-ai-output-review-checklist
kind: prompt
title: Build an AI output review checklist
description: Builds a checklist a team uses to review AI outputs before use, tiered by risk, covering facts, sources, numbers, tone, privacy, rights and sign-off. For teams adopting AI in daily work.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [review]
role: [manager, operations-manager, editor, individual]
requires: [none]
inputs: [text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ai-review, human-in-the-loop, quality-assurance, ai-governance]
pairs_with:
  prompts: [audit-ai-answer-for-errors, write-ai-use-policy, build-team-prompt-library]
args:
  - name: use_cases
    description: What the team uses AI output for, for example "customer replies, blog drafts, sales proposals, summaries of contracts", and who sees the result.
    type: text
    required: true
  - name: risks
    description: "Optional: incidents or worries so far, regulated content, brand rules, or data the team handles."
    type: text
output_contract:
  format: markdown
  sections: [Risk tiers, Checklists, Red flags, Sign-off, One-page version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI output fails in ways that read fluently: an invented statistic, a source that does not exist or does not say that, a number that does not add up, a confident claim about a policy that changed, a tone that is off for the audience, a customer's personal data pasted into a public draft, or text too close to someone else's work. Teams catch these when review is proportionate to the stakes: a quick glance for an internal note, a real check for anything a customer, regulator or the public will see. A checklist people actually use is short, tiered and specific to their work.

<use_cases>
{{use_cases}}
</use_cases>
{{#risks}}
<risks>
{{risks}}
</risks>
{{/risks}}
</context>

<task>
1. Sort the use cases into three risk tiers by audience and consequence: internal and low-stakes, external or decision-informing, and high-stakes (legal, financial, medical, safety, regulated, or published under the company's name at scale). If a use case's audience is unclear, place it in the higher tier and say so.
2. Write a checklist per tier, cumulative (higher tiers include the lower), each item a yes-or-no question someone can answer:
   - Accuracy: every factual claim checked against a source the reviewer opened; every number recomputed or traced; names, dates, prices and policies confirmed as current.
   - Sources: each cited source exists and says what the text claims; quotes are verbatim.
   - Fit: answers the actual request; tone, terminology and brand rules for the audience; no invented commitments or promises.
   - Privacy and confidentiality: no personal data, client data or internal information that should not leave the team; nothing pasted into tools the data rules forbid.
   - Rights and integrity: no text or images closely copied from identifiable works; disclosure of AI use where the team's policy or the context requires it.
   - Fairness: no stereotypes or unequal treatment of groups in content that affects people.
3. List red flags that mean "stop and check harder": very specific numbers without a source, citations to papers or laws the reviewer cannot find, legal or medical statements, anything that would embarrass the team if wrong.
4. Define sign-off: who reviews each tier (the author, a peer, a named role such as legal or compliance), what gets recorded, and when an output must be rewritten by a person instead of fixed.
5. Condense everything into a one-page version for daily use.
</task>

<constraints>
- Keep the tier-1 checklist to five items or fewer, or nobody will use it.
- Tailor items to the listed use cases; drop generic items that do not apply.
- Do not present the checklist as legal compliance; for regulated content, add an item to follow the team's own legal or compliance review.
- Plain language, no AI jargon.
</constraints>

<output_format>
## Risk tiers
Table: Use case | Tier | Why.
## Checklists
One checklist per tier, as checkboxes.
## Red flags
Bullets.
## Sign-off
Table: Tier | Reviewer | Record kept.
## One-page version
A compact block ready to print or pin.
</output_format>
