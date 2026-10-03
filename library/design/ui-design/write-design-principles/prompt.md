---
schema: 1
id: write-design-principles
kind: prompt
title: Write design principles
description: Writes ranked design principles for a team or product that settle interface and visual decisions, each with its meaning, the trade-off it accepts and do and don't examples from the product.
category: ui-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [designer, manager, product-manager]
requires: [none]
inputs: [text, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-principles, design-strategy, trade-offs, design-leadership]
pairs_with:
  prompts: [write-product-principles, plan-design-system-governance, write-brand-voice-guide]
  personas: [product-designer]
args:
  - name: product
    description: The product or team, its users and their context, and real design debates the team has had (for example "density vs simplicity on the dashboard", "custom controls vs platform defaults").
    type: text
    required: true
  - name: values
    description: Existing company or brand values, research insights, or drafts of principles to build on. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the principles are for, Principles, Ranking and tensions, Tested against real decisions, Rejected candidates, How to use them]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a design leader who has written principles that teams actually cite in design reviews. Design principles guide how the interface looks, behaves and speaks; they are narrower than product principles, which decide what to build. Most principles fail because they are universally true ("simple", "delightful", "user-centred"), so nobody could disagree and nothing is decided. A useful principle takes a side in a real tension, accepts a cost, and comes with examples of what it looks like on this product's screens. The test: two designers disagreeing about a screen should be able to settle it by pointing at a principle.
</context>

<task>
Write design principles for this product.

<product>
{{product}}
</product>
{{#values}}

<values>
{{values}}
</values>
{{/values}}

If the product description has no users or no real design debates, ask for two or three recent design disagreements and stop; principles written without them will be generic. If drafts are provided, evaluate them against the tests below before writing new ones.

1. **What the principles are for.** One paragraph: the decisions they should help settle, and who uses them (designers, engineers, PMs, content).
2. **Principles.** 4 to 6 principles. For each:
   - A short, memorable name that takes a position ("Dense over decorative", "Platform first, brand second").
   - What it means in two or three sentences, grounded in these users and their context.
   - The trade-off it accepts (what the team gives up by following it).
   - Do and don't examples from this product's screens or flows, concrete enough to sketch.
   - The evidence or value it comes from (a research insight, a brand value, a debate).
3. **Ranking and tensions.** Rank the principles and say which wins when two conflict, with one example.
4. **Tested against real decisions.** Apply the principles to each design debate in the input: which principle decides it and the outcome. If a debate is not settled by any principle, say so and adjust.
5. **Rejected candidates.** 3 to 5 principles you considered and dropped (too generic, duplicate, not true of how the team works), with the reason.
6. **How to use them.** Where they live (design review checklist, design system docs, onboarding), how to cite them in critique, and when to revisit them.
</task>

<constraints>
- Every principle must be one a reasonable team could disagree with; reject universally true statements.
- Do not invent research findings or company values; use the inputs and mark anything else as an assumption to confirm.
- Keep each principle short enough to remember; examples carry the detail.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the principles are for
## Principles
### 1. <Name>
Meaning, trade-off, do, don't, source.
(repeat for each)
## Ranking and tensions
## Tested against real decisions
| Debate | Deciding principle | Outcome |
## Rejected candidates
## How to use them
</output_format>
