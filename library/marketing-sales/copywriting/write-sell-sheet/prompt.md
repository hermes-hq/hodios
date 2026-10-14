---
schema: 1
id: write-sell-sheet
kind: prompt
title: Write a sell sheet
description: Writes a one-page sell sheet or leave-behind for a product or service, aimed at one type of buyer, with the problem, benefits, proof, specs or ordering details, and one clear contact.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, marketer, copywriter, founder]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sell-sheet, leave-behind, one-pager, trade-buyers, sales-collateral]
pairs_with:
  prompts: [write-brochure-copy, write-wholesale-line-sheet, write-case-study, translate-features-to-benefits, write-board-game-sell-sheet]
  personas: [copywriter]
args:
  - name: offering
    description: The product or service, what it does, key features, price or pricing basis, and what makes it different.
    type: text
    required: true
  - name: buyer
    description: Who will read the sheet and in what situation (for example "independent pharmacy buyers at a trade show", "facilities managers after a site visit", "IT director after a demo").
    type: string
    required: true
  - name: proof
    description: Results, customer quotes with names, certifications, awards or sales figures you can publish. Optional.
    type: text
  - name: specs
    description: Specifications or ordering details (sizes, SKUs, case pack, minimum order, lead time, warranty, compatibility, service levels). Optional.
    type: text
  - name: contact
    description: The name, role and contact route to print on the sheet. Optional; a placeholder is used otherwise.
    type: string
output_contract:
  format: markdown
  sections: [Sheet strategy, Sell sheet copy, Layout notes, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write sell sheets: the single page a salesperson hands over, attaches to a follow-up email or leaves on a trade show table. The reader scans it in about 30 seconds, often days later, without the salesperson there to explain. It has to stand on its own: what this is, why it matters to this buyer, proof, the details they need to act, and who to call.

Experts write for one buyer type at a time, because buyers judge different things. A retail or wholesale buyer cares about margin, sell-through, what support comes with it (displays, samples, marketing) and ordering terms. An operations or facilities buyer cares about cost, downtime, safety and installation. A technical buyer wants specs and compatibility. Common failures: cramming everything onto the page, a feature list without outcomes, no ordering or next-step details, and no named contact.
</context>

<task>
<offering>
{{offering}}
</offering>

Buyer: {{buyer}}

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

{{#specs}}<specs>
{{specs}}
</specs>{{/specs}}

{{#contact}}Contact: {{contact}}{{/contact}}

1. If you cannot tell what the offering is or who the buyer is, ask up to three short questions and stop.
2. Sheet strategy: the buyer's top three decision criteria, the one message the sheet must land, and the proof that best supports it.
3. Write the sheet: a headline with the outcome for this buyer, a two-sentence problem and solution, three to five benefit bullets each tied to a feature, a proof block (quote, result or certification), a specs or ordering table relevant to this buyer, one call to action with the next step, and the contact block.
4. Keep the total to what fits on one side of a page (about 250 to 350 words plus the table).
5. Give layout notes: hierarchy, where an image or diagram should go and what it should show, and what to cut if space runs out.
6. List facts to confirm before printing.
</task>

<constraints>
- One page, one buyer type, one call to action.
- Use only supplied facts, proof and specs. Mark gaps as [CONFIRM: ...]; never invent margins, certifications, prices or results.
- No unprovable superlatives.
- Specs table contains only what this buyer needs to decide or order.
- Prices and terms that change often should carry a "valid until" date or be left for a separate price list.
</constraints>

<output_format>
## Sheet strategy
Bullets: decision criteria, core message, best proof.

## Sell sheet copy
Headline, problem and solution, benefits, proof, specs or ordering table, call to action and contact block, ready to lay out.

## Layout notes
Bullets.

## Facts to confirm
Bullets. "None" if everything is confirmed.
</output_format>
