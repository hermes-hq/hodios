---
schema: 1
id: write-use-case-page
kind: prompt
title: Write an industry or role use case page
description: Writes a solution page for one industry or role, built on that segment's own problems, workflow, vocabulary, objections and peer proof, rather than the homepage with a new name swapped in.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, product-manager, founder]
requires: [none]
inputs: [text, notes, transcript]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [solution-page, segment-marketing, vertical-marketing, b2b, website-copy]
pairs_with:
  prompts: [write-landing-page-copy, write-case-study, build-ideal-customer-profile, write-homepage-copy, write-sales-faq]
  personas: [copywriter]
args:
  - name: segment
    description: The industry or role the page is for (for example "dental practices", "HR managers at manufacturers", "freelance video editors").
    type: string
    required: true
  - name: product
    description: What the product or service does, the features that matter most to this segment, and pricing if relevant.
    type: text
    required: true
  - name: segment_knowledge
    description: What you know about this segment - their workflow, pains in their own words, terms they use, tools they use today, rules they must follow, why they bought or did not. Sales call notes, interviews or reviews are ideal. Optional but the page is much stronger with it.
    type: text
  - name: proof
    description: Customers from this segment you can name, their quotes or results, and certifications or integrations this segment cares about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Segment brief, Use case page copy, Proof plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B copywriter who writes industry and role pages ("for restaurants", "for finance teams"). These pages exist because buyers trust what looks made for them: their problems named precisely, their workflow shown, their vocabulary used correctly and proof from peers in the same line of work. The most common failure is the fill-in-the-blank page: the homepage copy with the industry name pasted into the headline. Readers spot it at once, and it performs worse than no segment page at all.

Experts start from the segment's day: what triggers the need, which step in their workflow hurts, what a bad week looks like, which rules or tools shape their choices, and which objections are specific to them (for example data residency for healthcare, seasonality for hospitality, approval chains for public sector). They show the product inside that workflow and lead with proof from the same segment.
</context>

<task>
Segment: {{segment}}

<product>
{{product}}
</product>

{{#segment_knowledge}}<segment_knowledge>
{{segment_knowledge}}
</segment_knowledge>{{/segment_knowledge}}

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

1. If the product or the segment is unclear, ask up to three short questions and stop. If no segment knowledge is supplied, say the page will rely on assumptions, mark each one, and list what to learn from real customers.
2. Write a segment brief: their trigger moments, the two or three workflow steps where the product helps, the pains in their words, the vocabulary to use and to avoid, the segment-specific objections, and the proof that would persuade them.
3. Write the page: a hero that names the segment's problem or outcome in their terms, a short "sound familiar" problem section, "how teams like yours use it" showing the product inside their workflow (three or four steps), two to four benefits mapped to segment features, segment proof, a block answering their specific objections, relevant integrations or standards (only those confirmed), and a call to action that fits how this segment buys.
4. Run a swap check: list any line that would still be true if you replaced the segment name with another; rewrite it or cut it.
5. List the proof to collect for this segment.
</task>

<constraints>
- Do not invent industry statistics, regulations, certifications or customer names. Mark them as [CONFIRM: ...] or [PROOF NEEDED: ...].
- Never claim compliance with a sector rule (for example a health-data or financial regulation) unless the inputs state it; such claims carry legal weight.
- Use the segment's terms correctly; if unsure what a term means in that trade, ask or leave it out.
- Proof from another segment can support but must not be presented as if it came from this one.
- Plain language, "you" more than "we", no generic superlatives.
</constraints>

<output_format>
## Segment brief
Bullets: triggers, workflow steps, pains (with source or "assumed"), vocabulary, objections, proof needed.

## Use case page copy
Each section under its own label (Hero, Problem, How teams like yours use it, Benefits, Proof, Objections, Integrations and standards, CTA), ready to paste, followed by the swap-check results.

## Proof plan
A table: Claim or placeholder | Proof to collect | From whom.

## Open questions
Bullets to confirm with sales, product or customers. "None" if none.
</output_format>
