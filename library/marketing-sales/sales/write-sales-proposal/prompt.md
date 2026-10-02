---
schema: 1
id: write-sales-proposal
kind: prompt
title: Write a sales proposal
description: Writes a sales proposal tied to the prospect's stated pains and goals, with scope, pricing options, success measures and next steps. Use after discovery, before sending a quote.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, transcript, text]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [proposal, pricing-options, business-case, deal-progression]
pairs_with:
  prompts: [prepare-discovery-call, summarize-sales-call, handle-sales-objections]
args:
  - name: discovery_notes
    description: What the prospect told you, such as their goals, pains in their words, numbers they shared, who decides, timeline, criteria and alternatives they are considering. Call notes or a transcript summary.
    type: text
    required: true
  - name: offer
    description: What you would deliver, such as products, services, implementation, support, timeline and relevant proof (case studies, references, guarantees).
    type: text
    required: true
  - name: pricing
    description: Prices, packages, discounts allowed, payment terms and how long the offer is valid. Optional; without it the proposal uses placeholders.
    type: text
output_contract:
  format: markdown
  sections: [Proposal, Gaps to fill before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an account executive who writes proposals that get signed. A proposal is not a brochure: it confirms in writing what the buyer told you, shows how you will get them to the outcome they want, and makes the decision easy for the people who were not in the room, often the economic buyer or procurement. It should be short, written in the buyer's language, and contain no surprises.
</context>

<task>
Write a sales proposal.

<discovery_notes>
{{discovery_notes}}
</discovery_notes>

<offer>
{{offer}}
</offer>

{{#pricing}}
<pricing>
{{pricing}}
</pricing>
{{/pricing}}

1. Check the discovery notes. If they do not state the buyer's problem and desired outcome, ask for them and stop; a proposal without them is a price list.
2. Write the proposal with these sections:
   - Executive summary: their situation, the problem, the outcome they want, and the recommended option, in half a page someone senior can read alone.
   - What we heard: their goals and pains, quoted or close to their words, with any numbers they shared.
   - Cost of the status quo: only from their own numbers; show the calculation. If they gave none, describe the cost in words and suggest the figure to confirm.
   - Proposed solution: each pain mapped to what you will do about it.
   - Scope: what is included, what is not, and what you need from them.
   - Timeline: milestones from signature to the first result.
   - Success measures: how both sides will know it worked, tied to their goals.
   - Investment: two or three options (for example essential, recommended, complete), the recommended one marked, each with what it includes and its price. With no pricing given, use [price] placeholders and suggest the option structure.
   - Why us: two or three proof points relevant to their pains.
   - Risks and how we handle them: the concerns they raised and the answer to each.
   - Next steps: the specific steps to start, with owners and dates, and how long the offer is valid.
3. List the gaps to fill before sending.
</task>

<constraints>
- Use only facts from the notes and offer. Never invent their numbers, your case studies, prices, discounts or guarantees.
- Each solution item must trace to a pain they stated. Cut features that do not.
- Keep it to what fits on about two to four pages. Plain language, no jargon they did not use.
- Write about them first and you second: "you" more than "we".
- Do not include legal terms; note where the contract or order form will cover them.
</constraints>

<output_format>
## Proposal
The full proposal with the section headings from step 2 as level-3 headings, ready to paste into a document.

## Gaps to fill before sending
Bullets: placeholders, numbers to confirm with the buyer, approvals needed (for example discount sign-off). Write "None" if complete.
</output_format>
