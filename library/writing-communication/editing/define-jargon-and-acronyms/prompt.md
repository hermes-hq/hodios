---
schema: 1
id: define-jargon-and-acronyms
kind: prompt
title: Define jargon and acronyms for a reader
description: Finds every acronym and specialist term a named reader will not know, adds a short definition at first use or replaces it with a plain word, and builds a glossary, keeping the technical text intact.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [technical-writer, researcher, consultant, writer]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [jargon, acronyms, glossary, first-use-definitions, audience-fit]
pairs_with:
  prompts: [simplify-to-plain-language, run-readability-check, rewrite-for-audience]
  personas: [editor]
args:
  - name: text
    description: The text with jargon in it.
    type: text
    required: true
  - name: reader
    description: "Who will read it and what they already know, for example \"new hires in the finance team, no accounting background\" or \"council members, not engineers\"."
    type: text
    required: true
  - name: known_definitions
    description: Optional definitions for in-house terms and acronyms the text uses.
    type: text
output_contract:
  format: markdown
  sections: [Terms found, Edited text, Glossary, Terms I could not define]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Specialist texts often have to stay specialist: a technical report, policy or contract needs its precise terms. What the reader needs is the terms explained, not removed. Writers stop seeing their own jargon, especially acronyms used daily and ordinary words with a special meaning in their field ("material" in law, "significant" in statistics, "exposure" in finance). Good practice: spell out an acronym at first use with the short form in brackets, then use the short form; skip acronyms used only once or twice; give a short in-line gloss for a term the reader needs once; use a glossary for terms that recur; replace jargon with a plain word when nothing precise is lost. Acronyms are ambiguous across fields (PM, ROI, SLA, CRM can each mean different things), and in-house acronyms cannot be guessed.
</context>

<task>
Make this text understandable for the reader below without dumbing it down.

Reader: {{reader}}

<text>
{{text}}
</text>
{{#known_definitions}}
<known_definitions>
{{known_definitions}}
</known_definitions>
{{/known_definitions}}

1. If the text is empty or the reader is not described, ask and stop.
2. List every acronym, abbreviation and specialist term, including everyday words used in a special sense. Decide for each whether this reader knows it.
3. For each unknown term choose a treatment: spell out at first use; short in-line gloss; replace with a plain word (only if no precision is lost); glossary only (for frequently repeated terms); or drop an acronym used once or twice in favour of the full form.
4. Define terms from the supplied definitions or from their standard meaning in the text's field. If a term is in-house or ambiguous and not supplied, do not guess; mark it `[DEFINE: TERM]` and list it.
5. Apply the treatments and return the edited text. Keep every definition consistent with how the text uses the term.
6. Build a glossary of the recurring terms, in alphabetical order.
</task>

<constraints>
- Do not change the technical meaning or replace a precise term with a looser one.
- Do not guess what in-house or ambiguous acronyms stand for.
- Keep in-line definitions short (a few words in brackets or a short clause); move longer explanations to the glossary.
- Do not define terms the stated reader already knows.
</constraints>

<output_format>
## Terms found
A table: Term | Known to this reader? | Treatment.
## Edited text
The full edited text.
## Glossary
Alphabetical: **Term**: definition in one sentence.
## Terms I could not define
Bullets with where each appears. "None" if none.
</output_format>
