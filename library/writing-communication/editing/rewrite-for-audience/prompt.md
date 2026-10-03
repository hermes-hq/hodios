---
schema: 1
id: rewrite-for-audience
kind: prompt
title: Rewrite for a different audience
description: Rewrites the same content for a different audience, such as expert to general, adult to child or internal to customer, changing depth, terms and examples while keeping the facts true.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, technical-writer, teacher, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [audience-adaptation, knowledge-transfer, explain-like-im-five, customer-facing]
pairs_with:
  prompts: [simplify-to-plain-language, rewrite-for-tone, adapt-message-for-culture]
  personas: [editor]
args:
  - name: text
    description: The text to rewrite.
    type: text
    required: true
  - name: current_audience
    description: "Who it was written for, for example \"cardiologists\", \"our engineering team\", \"adult investors\"."
    type: string
    required: true
  - name: target_audience
    description: "Who it is for now, as specifically as you can, for example \"9-year-olds in a school assembly\", \"customers affected by the outage\", \"city councillors with no finance background\"."
    type: string
    required: true
  - name: length
    description: Length of the rewrite relative to the original.
    type: enum
    enum: [shorter, same, longer]
    default: same
output_contract:
  format: markdown
  sections: [Rewrite, Audience shift, What changed, Accuracy check, Check with the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rewriting for another audience changes what the reader knows, cares about and will do with the text, so it changes depth, vocabulary, examples, order and framing. It must not change the facts. The classic failures are simplifications that become false ("antibiotics kill viruses"), analogies that mislead, expert rewrites padded with invented technical detail, and customer-facing versions that leak internal names, blame or unconfirmed causes, or quietly add promises.
</context>

<task>
Rewrite this text, written for {{current_audience}}, for {{target_audience}}. Target length relative to the original: {{length}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If the target audience is vague ("general public"), assume an interested adult with no specialist background, say so, and continue.
2. Profile both audiences in a few words each: prior knowledge, what they care about, what they need to do after reading, how they will read it (skim on a phone, read aloud, study), and any sensitivity (worried customers, children).
3. Inventory the content: every claim, number, condition, caveat and action. For each, decide: keep as is, explain, or leave out because this audience does not need it. Leave something out only if its absence cannot mislead; never drop a safety warning, a deadline, an obligation or an action the reader must take.
4. Rewrite:
   - lead with what this audience cares about most;
   - replace jargon with everyday words, or keep the term and define it once if the reader will meet it again;
   - swap examples and analogies for ones from the reader's world, and check each analogy does not imply something false;
   - for a less expert audience, cut depth, not truth: say "usually" or "in most cases" rather than stating an exception-ridden rule as absolute;
   - for a more expert audience, add precision and correct terms and cut over-explanation, but mark any missing detail as `[add: …]` instead of inventing it;
   - for customers or the public, remove internal names, internal blame, confidential figures and unconfirmed causes, and do not add apologies, compensation or commitments the original does not make.
5. Accuracy pass: compare the rewrite with the inventory. Fix any sentence that is now false, overstated or more certain than the original.
</task>

<constraints>
- Keep every number exact unless rounding helps the audience; if you round, keep it true ("about 40%" for 38.6%).
- Match the reading level and sentence length to the target: short sentences and concrete words for children, no condescension for adult non-specialists.
- Keep the original's language variety.
- Length: "shorter" means at most about 70% of the original, "longer" means room for explanation and examples, not filler.
</constraints>

<output_format>
## Rewrite
The rewritten text, ready to use.
## Audience shift
A table: Dimension (knowledge, motivation, what they will do, reading context) | Current audience | Target audience.
## What changed
Bullets grouped as: terms replaced or defined, examples swapped, content cut and why, content added and why.
## Accuracy check
Bullets: each simplification and its limit ("'usually' covers the exception for…"), and anything removed that a different audience might need.
## Check with the author
Placeholders, rounded figures or judgement calls to confirm. "None" if none.
</output_format>
