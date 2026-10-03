---
schema: 1
id: write-public-roadmap
kind: prompt
title: Write a public roadmap
description: Turns an internal roadmap into a public one with themes, now-next-later items in customer language, careful commitments, a holdback list and a way for customers to give feedback.
category: roadmapping
version: 1.0.1
status: incubating
stage: [ship]
role: [product-manager, founder, marketer]
requires: [none]
inputs: [text, document]
output: [docs, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [public-roadmap, now-next-later, customer-communication, transparency]
pairs_with:
  prompts: [build-outcome-roadmap, write-roadmap-update, write-monthly-product-update, close-feedback-loop]
args:
  - name: roadmap
    description: The internal roadmap. Items with status, rough timing, confidence, the problem each solves, and anything sensitive (partnerships, pricing, security work, items reacting to a competitor).
    type: text
    required: true
  - name: audience
    description: Who will read the public roadmap, which sets the language and level of detail.
    type: string
    default: existing customers and prospects
output_contract:
  format: markdown
  sections: [Holdback list, Public roadmap, Maintenance notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Asks for the internal roadmap when no items are given."}
---
<context>
You are a product manager who runs a public roadmap that customers trust. You know the trade-off: a public roadmap builds confidence, reduces "is this coming?" tickets and attracts useful feedback, but every item reads as a promise to customers and sales will quote it. Good public roadmaps talk about problems and themes rather than specifications, commit firmly only to what is in progress, avoid dates beyond the near term, and leave out anything sensitive or uncertain.
</context>

<task>
<internal_roadmap>
{{roadmap}}
</internal_roadmap>

Audience: {{audience}}.

If the input has no roadmap items to work from, ask for the internal roadmap with each item's status and confidence, and stop.

1. **Sort every internal item** into: publish, publish in softened form, or hold back. Hold back by default: security fixes before they ship, unannounced partnerships, pricing and packaging changes, anything reacting to a named competitor, items with low confidence, internal tooling, and anything that reveals customers' names or contracts. List the hold-backs with the reason, for the user only.
2. **Group published items into three to five themes** named after customer outcomes ("Faster month-end close", not "Reporting v2").
3. **Place each item in Now, Next or Later:**
   - Now: in progress, high confidence; a quarter or month is acceptable if the internal roadmap is confident.
   - Next: planned, design or discovery under way; no dates.
   - Later: exploring; framed as problems you are looking into, not features you will ship.
4. **Rewrite each item for customers:** a short title, one or two sentences on the problem it solves and who benefits, and a status label (In progress, Planned, Exploring). No internal codenames, ticket numbers, team names or technical jargon.
5. Add a short **Recently shipped** section if the input includes shipped items, which shows momentum.
6. Write the **intro** (what this roadmap is and how often it changes), a **feedback section** (how to vote, comment or request, with a [LINK] placeholder, and what happens to feedback), and a plain **disclaimer** that plans can change and the roadmap is not a contractual commitment.
7. Add **maintenance notes**: update cadence, who approves changes, how to handle an item that moves back or is dropped (say so openly in the next update), and how sales should talk about Next and Later items.
</task>

<constraints>
- Never add items, dates or details that are not in the internal roadmap. If asked to publish a date or status that the item's real status does not support, keep the honest status and explain why in the maintenance notes.
- Use cautious, honest verbs for anything not in progress ("we're exploring", "we plan to"), never "coming soon" without a confirmed timeframe.
- Keep each item to two sentences at most; the whole public roadmap should be readable in three minutes.
- If an item's sensitivity is unclear, hold it back and ask.
</constraints>

<output_format>
## Holdback list
For you only. | Item | Reason held back |
## Public roadmap
Ready to publish: intro, themes, then Now / Next / Later with items under each, Recently shipped, How to share feedback, disclaimer.
## Maintenance notes
</output_format>
