---
schema: 1
id: write-brand-manifesto
kind: prompt
title: Write a brand manifesto
description: Writes a brand manifesto that starts from a real tension, states beliefs the brand can prove, and ends in a commitment, with a short version, a proof check and where to use it.
category: branding
version: 1.0.0
status: incubating
stage: [design]
role: [copywriter, marketer, founder]
requires: [none]
inputs: [text, document]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [manifesto, brand-voice, brand-purpose, brand-writing, beliefs]
pairs_with:
  prompts: [build-brand-platform, write-brand-story, write-brand-voice-guide, write-taglines]
  personas: [brand-strategist, copywriter]
args:
  - name: brand
    description: What the brand does, for whom, what it believes, what it stands against, and its platform or purpose if one exists.
    type: text
    required: true
  - name: proof
    description: Real behaviour that backs the beliefs - decisions, policies, product choices, things the company refuses to do.
    type: text
    required: true
  - name: use
    description: Where the manifesto will appear (launch film, about page, office wall, staff onboarding) and the voice. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The tension, Belief lines, Manifesto, Short version, Proof check, Where to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A manifesto is a brand's beliefs said out loud with conviction. Most read the same: "We believe in innovation. We believe in people. We believe in doing things differently." They fail because they have no tension (nothing the brand is against), no specifics, and nothing that proves the beliefs. A strong manifesto names what is wrong in its world, takes a side that some people would disagree with, and states beliefs the company already acts on, so customers and staff can check them against reality. It is written to be read aloud: short lines, rhythm, repetition with purpose, plain words.
</context>

<task>
Write a manifesto for this brand.

<brand>
{{brand}}
</brand>

<proof>
{{proof}}
</proof>
{{#use}}Use and voice: {{use}}{{/use}}

1. **The tension.** In two or three sentences, the problem, habit or convention in the brand's world that it pushes against.
2. **Belief lines.** Five to eight candidate beliefs, each specific enough that a competitor could disagree, each linked to a proof point from the input. Drop any belief without proof.
3. **Manifesto.** 120 to 250 words in short lines: open with the tension, move through the beliefs, end with a commitment or a call to the reader. Use the brand's voice; avoid empty words such as innovative, passionate, world-class, journey and solutions.
4. **Short version.** 30 to 50 words for a social post, packaging side panel or the end of a film.
5. **Proof check.** A table of each claim in the manifesto against the proof that supports it, and any claim that needs evidence before publishing.
6. **Where to use it.** Where it fits and where it does not (for example not on a pricing page), and how to keep it alive (onboarding, decisions explained by it).
</task>

<constraints>
- Do not invent facts, numbers, history or commitments the brand has not made; flag unsupported claims rather than writing them.
- Avoid claims that could be misleading, such as environmental or ethical claims without evidence.
- If the input contains no real belief or proof, say so and ask what the company actually does differently before writing.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. The manifesto in short lines with line breaks. Proof check as a table (Claim, Proof, Status).
</output_format>
