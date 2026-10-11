---
schema: 1
id: reverse-assumptions-for-ideas
kind: prompt
title: Reverse assumptions to find ideas
description: Lists the assumptions everyone in a field or situation takes for granted, reverses each one, and works out which reversals point to a viable new offer, process or approach.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, product-manager, marketer, individual]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [assumption-reversal, rule-breaking, innovation, ideation-technique]
pairs_with:
  prompts: [surface-hidden-assumptions, use-provocations-for-ideas, validate-business-idea]
args:
  - name: subject
    description: The product, service, process or situation to rethink, for example "driving lessons", "our quarterly all-hands", "how I furnish my flat".
    type: text
    required: true
  - name: constraints
    description: Optional - limits any idea must respect (budget, rules, people, time).
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Reversals, Viable reversals, Ideas to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Assumption reversal is an ideation technique: write down what everyone in a field treats as fixed, flip each assumption, and ask what would have to be true for the flipped version to work. Many new offers came from a reversal (flat-pack furniture reversed "the shop assembles it"; budget airlines reversed "meals and luggage are included"). The hard part is listing assumptions that are truly invisible, not obvious complaints. Good assumptions cover who the customer is, who does the work, when and where it happens, how it is paid for, what is included, how long it takes, and what quality means. This differs from testing a plan's risky assumptions: the goal here is new ideas, not risk.

<subject>
{{subject}}
</subject>
{{#constraints}}
Constraints:
<constraints>
{{constraints}}
</constraints>
{{/constraints}}
</context>

<task>
1. If the subject is too vague to list assumptions about, ask up to two questions and stop.
2. List 12 to 15 assumptions about the subject across these angles: customer or user, who does the work, time, place, payment, what is included, duration, quality or success, and the relationship before and after. Write each as a plain statement ("Lessons are booked one at a time").
3. Reverse each assumption into its opposite or a radical alternative ("Lessons are bought as a whole course with a pass guarantee"). One line each.
4. For each reversal, ask what would need to be true for it to work, and who would want it. Rate it viable, maybe or not viable with a short reason{{#constraints}}, applying the constraints{{/constraints}}.
5. For the four to six viable or maybe reversals, write a concrete idea: what it is, who it is for, how it would work and the cheapest test.
6. Note any reversal that appears already to exist in the market as a type of offer, described generally; do not name or describe specific companies as fact unless the user named them.
</task>

<constraints>
- Do not invent statistics, market sizes or claims about real companies.
- Ideas that would break laws, safety rules or professional regulations are marked not viable; where licensing might matter, say what to check locally.
- Keep assumptions specific to the subject, not generic business truisms.
- Label every assumption you make about the user's situation.
</constraints>

<output_format>
## Assumptions
Numbered list grouped by angle.

## Reversals
Table: # | Assumption | Reversal.

## Viable reversals
Table: # | What must be true | Who would want it | Rating | Reason.

## Ideas to test
Numbered list: idea, who it is for, how it works, cheapest test.
</output_format>
