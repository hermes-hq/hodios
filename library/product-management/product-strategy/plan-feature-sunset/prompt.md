---
schema: 1
id: plan-feature-sunset
kind: prompt
title: Plan a feature sunset
description: Plans retiring a feature with user and revenue impact, migration paths, a dated timeline, communications by segment, support preparation and data handling. Use when reducing product surface.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [product-manager, engineering-manager, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [deprecation, end-of-life, migration-plan, customer-communication]
pairs_with:
  prompts: [write-roadmap-update, write-launch-faq, close-feedback-loop]
args:
  - name: feature
    description: The feature to retire, why you are retiring it, and anything already decided (date, owner, replacement).
    type: text
    required: true
  - name: usage_data
    description: Who uses it and how much - active users or accounts by segment, plan, revenue attached, API usage, contractual commitments. Optional; without it, the plan lists the data to pull first.
    type: text
  - name: alternatives
    description: What users can use instead - a replacement feature, an integration, an export, a partner product. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision summary, Impact, Migration paths, Timeline, Communications, Support preparation, Data handling, Success measures and exceptions, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who has retired features without losing customers' trust. A sunset goes wrong when users find out from a broken workflow instead of a message, when a large customer's contract promised the feature, when API consumers are forgotten, when there is no way to get data out, and when support learns about it on the day. A good sunset is predictable: announced early, staged, with a clear path for every affected group and a named owner for exceptions.
{{#usage_data}}

Usage data:

<usage_data>
{{usage_data}}
</usage_data>
{{/usage_data}}
{{#alternatives}}

Alternatives for users:

<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}
</context>

<task>
Feature to retire:

<feature>
{{feature}}
</feature>

1. Summarise the decision and its rationale in plain terms users would accept (cost of maintaining it, low usage, a better replacement, security or legal reasons). If the rationale is weak or missing, say so; a sunset needs a reason you can state publicly.
2. Assess impact by segment: who uses it (by plan, size, region, use case), how heavily, revenue attached, accounts with contractual or SLA commitments, integrations and API consumers, and internal dependents (reports, other features, sales collateral). If usage data is missing, list the exact queries or reports to pull before proceeding, and mark the impact as unknown.
3. Define migration paths per segment: the replacement, how to move (self-serve steps, assisted migration, export), the effort for the user, and what they lose. Be honest where there is no equivalent.
4. Build a timeline relative to the removal date (T): internal alignment, notice to the most affected accounts, public announcement, in-product warnings, stop new adoption (hide for new users), read-only or reduced mode, removal, and data deletion. Recommend notice periods proportionate to impact (longer for paid, API and contractual users), and note that contracts and local law may set minimum notice periods that must be checked.
5. Plan communications by segment: channel (personal email from account manager, email, in-app banner, changelog, API deprecation headers and docs), timing and the key message. Draft the main customer email: what is changing, when, why, what to do, how to get help.
6. Prepare support: an FAQ, two or three reply macros (including for upset customers), an escalation path for exceptions, and a training note.
7. Plan data handling: export options and formats, how long data is kept after removal, deletion in line with the privacy policy and data processing agreements, and confirmation to customers.
8. Define success measures (migration rate by segment, support volume, churn among affected accounts against a baseline) and the exception policy (who can grant an extension and on what grounds).
9. List risks with mitigations, including when to pause or reverse the sunset.
</task>

<constraints>
- Never invent usage numbers, revenue or contract terms. Unknowns are marked and turned into tasks.
- Recommend a legal or contracts review whenever paid commitments, SLAs, API terms or personal data are involved; do not give a legal opinion.
- Write customer-facing text in plain, respectful language with no internal jargon and no blame on users.
- Dates are relative to T unless the input gives a removal date.
</constraints>

<output_format>
## Decision summary
Three or four sentences.

## Impact
Table: segment | users or accounts | usage level | revenue attached | commitments | impact.

## Migration paths
Table: segment | path | user effort | what they lose.

## Timeline
Table: when (relative to T) | action | audience | owner.

## Communications
Table by segment, then the draft customer email.

## Support preparation
FAQ, macros and escalation path.

## Data handling
Bullets.

## Success measures and exceptions
Bullets.

## Risks
Table: risk | likelihood | impact | mitigation | trigger to pause.
</output_format>
