---
schema: 1
id: list-feature-edge-cases
kind: prompt
title: List a feature's edge cases
description: Lists the edge cases of a feature before build by boundaries, time zones, concurrency, permissions, money and rounding, languages, scale and failure, each with the decision a product owner must make.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, business-analyst, software-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [ticket, spec, text]
output: [checklist, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [edge-cases, backlog-refinement, boundary-values, product-decisions]
pairs_with:
  prompts: [write-acceptance-criteria, refine-backlog-ticket, define-non-functional-requirements]
args:
  - name: feature_description
    description: The feature as written - the user story, ticket or spec section, with any rules and limits already decided.
    type: text
    required: true
  - name: context
    description: Product context that changes the answers - markets and languages, user roles, payment or legal constraints, expected scale, existing system behaviour.
    type: text
output_contract:
  format: markdown
  sections: [Decisions needed, Edge cases by area, Already covered, Suggested out of scope]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most defects in new features are not coding mistakes but decisions nobody made: what happens at exactly the limit, across midnight in another time zone, when two people edit at once, when a refund splits a discounted amount. In refinement, the goal is not a list of hundreds of theoretical cases but the short list of situations that are likely or costly, each turned into a decision the product owner can make now. Edge-case lists fail when they are generic checklists unrelated to the feature, when they bury the important decisions among trivia, and when they propose answers as if they were already agreed.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Identify the feature's inputs, states, actors, limits and dependencies.
2. Walk each area and keep only cases that apply to this feature:
   - input boundaries: empty, minimum, maximum, just over and under each limit, special characters, duplicates, very long values;
   - time: time zones and which one rules, daylight saving changes, midnight and month or year ends, leap days, expiry exactly at the boundary, clock differences between devices;
   - concurrency and repetition: double submits, two users editing the same item, retries after timeouts, actions from several devices, ordering of events;
   - permissions and lifecycle: each role, losing access mid-action, deleted or archived related items, invited but not yet registered users, account deletion;
   - money and quantities: currency, rounding rule and where it is applied, partial refunds, discounts and taxes interaction, negative or zero amounts;
   - language and region: translations, right-to-left text, name and address formats, local number and date formats;
   - scale: the largest customer, many items, long histories, rate limits, exports;
   - failure: a dependency down or slow, partial success, notifications that fail, data migration of existing records;
   - abuse: actions that could be exploited for gain or to harm other users.
3. For each case write a concrete example with values, the question the product owner must answer, a recommended default with a one-line reason, and a likelihood and impact rating (high, medium, low).
4. Put the decisions with high likelihood or high impact first under Decisions needed; at most about 12, so the list fits a refinement meeting.
5. List cases the feature description already answers, so they are not reopened.
6. Suggest cases to explicitly put out of scope for this release, with the risk of doing so.
</task>

<constraints>
- Every case must be specific to this feature with concrete values; drop generic items that do not apply.
- Recommended defaults are proposals, not decisions; never present them as agreed rules.
- Do not invent business rules or legal requirements; where a rule depends on law or contracts (tax, consumer rights, data retention), say who to check with.
- If the feature description is too thin to find real edge cases, ask the three to five questions that would unlock them instead.
</constraints>

<output_format>
## Decisions needed
Numbered: question, example, recommended default, likelihood and impact.
## Edge cases by area
A checklist grouped by area: "- [ ] case - example - proposed behaviour".
## Already covered
Bullets quoting the rule from the description.
## Suggested out of scope
Bullets with the risk.
</output_format>
