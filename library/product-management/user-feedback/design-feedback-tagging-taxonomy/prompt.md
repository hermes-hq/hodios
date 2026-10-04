---
schema: 1
id: design-feedback-tagging-taxonomy
kind: prompt
title: Design a feedback tagging taxonomy
description: Designs a tagging taxonomy for customer feedback from support, sales and surveys, with tag definitions, include and exclude rules, examples, rules for tricky cases and a monthly review.
category: user-feedback
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, support-agent, ux-researcher, operations-manager]
inputs: [notes, text]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feedback-tagging, taxonomy, support-tickets, coding-scheme, inter-rater-consistency]
pairs_with:
  prompts: [analyze-user-feedback, triage-feature-requests, write-voice-of-customer-report]
  workflows: [customer-feedback-loop-track]
args:
  - name: product
    description: What the product does, its main areas or modules, and the customer types or plans you sell to.
    type: text
    required: true
  - name: feedback_sources
    description: Where feedback comes from and who tags it today (for example "support tickets tagged by agents, sales call notes in the CRM, quarterly survey comments, app store reviews"), plus the tool you tag in if it limits tag counts or levels.
    type: text
    required: true
  - name: sample_feedback
    description: Optional. Twenty or more real, anonymised feedback items, so the taxonomy is tested against real wording.
    type: text
  - name: max_tags
    description: The most tags a person should choose from at the second level; long lists get used inconsistently.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Design choices, Taxonomy, Tag definitions, Tricky cases, Sample tagging, Tagging process, Monthly review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research operations lead who designs coding schemes for customer feedback. A tagging taxonomy is only useful if different people tag the same item the same way, and if the tags answer the questions the product team asks ("What are the top usability problems in billing?", "Why do customers on the starter plan churn?"). Most taxonomies fail in one of three ways: too many overlapping tags, tags that mix different dimensions (a product area, a feedback type and a sentiment in one list), or no definitions, so every agent invents their own meaning. A good scheme separates dimensions, keeps each list short, defines every tag with what is in and what is out, and is reviewed on a schedule.
</context>

<task>
Design a feedback tagging taxonomy for this product and these sources.

<product>
{{product}}
</product>

<feedback_sources>
{{feedback_sources}}
</feedback_sources>
{{#sample_feedback}}
<sample_feedback>
{{sample_feedback}}
</sample_feedback>
{{/sample_feedback}}

1. If the product description does not name its main areas or the sources are missing, ask for them and stop.
2. Design choices: state the dimensions you will use and why. Recommend separate dimensions for feedback type (for example bug, feature request, usability, performance, pricing, praise, churn reason), product area (from the product's own modules), and metadata fields that should be captured automatically rather than tagged by hand (source, customer segment, plan, revenue, sentiment if a tool provides it).
3. Taxonomy: the levels and lists for each dimension, with at most {{max_tags}} tags at the most detailed level across the scheme. Use mutually exclusive tags within a dimension where possible. Include one "other" per dimension with a rule that it must stay under about 10 percent of items.
4. Tag definitions: for every tag, a one-line definition, what to include, what to exclude (with the tag to use instead), and one example in customer language.
5. Tricky cases: rules for the cases that cause inconsistency, such as one message with several issues, a feature request that is really a bug, "it's too expensive" when the real problem is missing value, angry tone with no specific issue, feedback about a competitor, and feedback from internal staff.
6. Sample tagging: if sample feedback was given, tag each item with the scheme, and list any item that did not fit well and what that shows about the taxonomy. If no sample was given, say how to pilot the scheme on 50 to 100 real items.
7. Tagging process: who tags at each source, when (at close, weekly batch), a short training note, and a consistency check (two people tag the same 30 items monthly and compare; investigate tags where they disagree).
8. Monthly review: what to look at (tag volumes, "other" share, disagreement), and rules for adding, merging, splitting or retiring tags, including how to handle historical data after a change.
9. Before replying, check that no two tags in the same dimension overlap without an exclude rule, and that the count stays within {{max_tags}}.
</task>

<constraints>
- Build product-area tags from the product description; do not invent modules it does not mention. Mark assumed areas `[confirm]`.
- Keep wording neutral and descriptive; tags describe the feedback, not a judgement of the customer.
- Remove or mask personal data in any examples you write.
- Do not analyse or prioritise the feedback itself; this designs the scheme only.
</constraints>

<output_format>
## Design choices
## Taxonomy
Nested lists per dimension.
## Tag definitions
A table: Tag | Definition | Include | Exclude (use instead) | Example.
## Tricky cases
Numbered rules.
## Sample tagging
A table: Item | Type | Area | Note. Or the pilot plan.
## Tagging process
## Monthly review
</output_format>
