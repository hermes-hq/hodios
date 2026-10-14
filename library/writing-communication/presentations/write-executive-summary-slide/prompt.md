---
schema: 1
id: write-executive-summary-slide
kind: prompt
title: Write an executive summary slide
description: Writes the one slide that sums up a whole deck for executives, with the answer first, three supporting points with their key evidence, and the decision or action asked of them.
category: presentations
version: 1.0.0
status: incubating
stage: [design, review]
role: [manager, consultant, product-manager, business-analyst]
requires: [none]
inputs: [text, document, notes]
output: [summary, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [executive-audience, bottom-line-up-front, pyramid-principle, slide-titles, asks]
pairs_with:
  prompts: [write-executive-summary, build-decision-request-deck, outline-presentation]
  personas: [presentation-designer]
args:
  - name: deck_content
    description: The deck's slide titles and key content, or the document it is based on. The more of the actual numbers and conclusions, the better.
    type: text
    required: true
  - name: audience_and_ask
    description: Who will see the slide and what you want from them, for example "CFO and CEO; approve 400,000 for a new warehouse system".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Executive summary slide, Alternative version, Where each point is supported, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the executive summary slide, the most read page of any business deck and often the only one a senior person reads. It works when it states the answer or recommendation first as a full-sentence title, gives no more than three supporting points each with the single most persuasive piece of evidence (a number, a comparison, a customer fact), and ends with the explicit decision or action needed and by when. It fails when it is an agenda in disguise ("We will cover the market, the options and next steps"), when it lists findings with no conclusion, when it carries ten bullets, or when it includes numbers that appear nowhere else in the deck. A good test: if the executive reads only this slide and says yes, would they know what they agreed to?

<deck_content>
{{deck_content}}
</deck_content>

Audience and ask: {{audience_and_ask}}
</context>

<task>
1. Identify the governing message: the answer, recommendation or main conclusion in the content. If the content does not reach a conclusion, say so and offer the two most defensible candidate conclusions for the user to choose.
2. Choose the three strongest supporting points for this audience, each with its best evidence from the content. Prefer evidence the audience cares about (cost, risk, customers, time).
3. Write the slide: a full-sentence title stating the answer, the three points as short sentences with evidence in bold or brackets, and a final line with the decision or action, the owner and the date if given. Keep it under about 80 words of body text.
4. Write an alternative version with a different emphasis (for example risk-led instead of benefit-led) so the user can choose.
5. Map each point to the slide in the deck where it is supported, and flag any point whose evidence the deck does not show.
6. List gaps: missing numbers, an unclear ask, or a conclusion the evidence does not quite support.
</task>

<constraints>
- Use only facts and numbers in the content; never invent figures, dates or approvals. Use [figure needed] where a number would help but is missing.
- Title is a single full sentence stating a conclusion, not a topic or agenda.
- Three supporting points at most; no sub-bullets.
- The ask is explicit and matches what the user said they want.
</constraints>

<output_format>
## Executive summary slide
Title, three points, the ask, laid out as on the slide.

## Alternative version
Same structure, different emphasis, with one line on when to use it.

## Where each point is supported
Table: Point | Supporting slide or source | Status.

## Gaps
Bullets.
</output_format>
