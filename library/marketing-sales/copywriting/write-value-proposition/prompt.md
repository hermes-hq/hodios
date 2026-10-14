---
schema: 1
id: write-value-proposition
kind: prompt
title: Write a value proposition
description: Writes a customer-facing value proposition (headline, subhead, three supporting points, proof) from the customer, their alternatives and real differentiators, with variants by angle.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, product-manager]
requires: [none]
inputs: [text, notes]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [value-proposition, differentiation, swap-test, headline, proof]
pairs_with:
  prompts: [map-value-proposition-canvas, write-positioning-statement, write-landing-page-copy, write-headline-variations, translate-features-to-benefits]
  personas: [copywriter]
args:
  - name: product
    description: What you sell, the main features or deliverables, price range if relevant, and what you believe makes it different.
    type: text
    required: true
  - name: customer
    description: Who buys it, the problem or goal that makes them look for a solution, and how they describe it in their own words if you have that (reviews, sales calls, surveys).
    type: text
    required: true
  - name: alternatives
    description: What the customer would do instead, such as a named competitor, a spreadsheet, hiring someone, a generic tool, or doing nothing. Optional; without it the prompt asks or assumes the status quo.
    type: text
  - name: proof
    description: Evidence you can show, such as numbers, customer quotes with names and roles, ratings, certifications or case results. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Inputs check, Value proposition, Angle variants, Proof gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketer who writes value propositions people understand in five seconds. A value proposition answers one question for a specific buyer: why should I choose this over what I would otherwise do? The comparison is always against an alternative, and the most common alternative is the status quo (a spreadsheet, a person, doing nothing). Weak value propositions describe the category ("an all-in-one platform for teams"), list features, or claim qualities every competitor claims (fast, easy, powerful). A useful test is the swap test: if a competitor could put its name on the line and it would still be true, it does not differentiate.

Strong ones connect a differentiating attribute to an outcome the buyer cares about and back it with proof. They use the buyer's words for the problem, not the company's internal vocabulary.
</context>

<task>
<product>
{{product}}
</product>

<customer>
{{customer}}
</customer>

{{#alternatives}}<alternatives>
{{alternatives}}
</alternatives>{{/alternatives}}

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

1. Check the inputs. If you cannot tell what the product does or who buys it, ask up to three short questions and stop. If the alternatives are missing, assume the status quo and say so.
2. List the differentiators that are true and relevant: what this product does that the alternatives do not, or does measurably better. Drop any that fail the swap test or that the buyer would not care about.
3. For each kept differentiator, write the chain: attribute, what it lets the buyer do or stop doing, and the proof (or "missing").
4. Write the value proposition: a headline (outcome for this buyer, about 10 words or fewer), a subhead (what it is, who it is for and how it differs, under 25 words), three supporting points (each a benefit with its proof or a placeholder), and one line of proof for the hero area.
5. Run the swap test on the headline and subhead against the named alternatives and say whether they pass.
6. Write three variants from different angles (for example outcome, pain avoided, contrast with the alternative, speed or cost), and say which buyer or channel each suits.
</task>

<constraints>
- Use only facts and proof from the inputs. Mark missing proof as [PROOF NEEDED: ...]; never invent numbers, customers or ratings.
- No unprovable superlatives ("best", "leading", "#1") and no claims about competitors that the inputs do not support. State contrasts as facts about this product.
- Plain words at about a grade 7-9 reading level. No buzzwords such as "seamless", "revolutionary", "next-generation" or "synergy".
- Name the buyer's problem in their words when the inputs give them; otherwise mark that the language should be checked with real customers.
- If the inputs show no real differentiator, say so plainly and suggest what to find out, rather than dressing up a generic claim.
</constraints>

<output_format>
## Inputs check
Two to four bullets: the buyer, the main alternative, assumptions made.

## Value proposition
Headline, subhead, three supporting points and the hero proof line, ready to paste, followed by a short table: Differentiator | Benefit | Proof | Swap test (pass or fail).

## Angle variants
A table: Headline | Subhead | Angle | Best for.

## Proof gaps
Bullets: each placeholder or claim to verify and where to get it. Write "None" if nothing is missing.
</output_format>
