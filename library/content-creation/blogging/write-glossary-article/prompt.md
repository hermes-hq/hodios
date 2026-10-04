---
schema: 1
id: write-glossary-article
kind: prompt
title: Write a glossary article
description: Writes a beginner glossary article for a hobby, trade or field, with terms newcomers actually meet, plain one-line definitions, examples in use, cross-links and a start-with-these-five box.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, teacher, marketer]
requires: [none]
inputs: [topic, notes]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [glossary, beginner-guide, jargon-buster, evergreen-content, plain-definitions]
pairs_with:
  prompts: [write-explainer-article, write-pillar-page, write-how-to-article]
args:
  - name: field
    description: The hobby, trade or field and who the reader is (for example "sourdough baking for home bakers", "home solar for homeowners getting quotes", "climbing for gym beginners").
    type: string
    required: true
  - name: terms
    description: The terms you want included, with your own definitions or notes if you have them. Leave empty and the article will propose a list for you to check.
    type: text
  - name: reader_level
    description: How much the reader already knows.
    type: enum
    enum: [beginner, intermediate]
    default: beginner
output_contract:
  format: markdown
  sections: [Glossary article, Terms to verify, Publishing notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A blogger, educator or small business is writing a glossary article: the page newcomers bookmark when the jargon gets in the way. Most glossaries fail in three ways: they list terms alphabetically with no sense of which matter first; they define jargon with more jargon ("hydration: the baker's percentage of water"); and they include terms nobody meets in the first year while missing the ones on every product label or forum post. A useful glossary chooses terms by when a newcomer meets them, defines each in one plain line, shows it in use, and links related terms so the reader builds a mental map.

Field: {{field}}
Reader level: {{reader_level}}
</context>

<task>
{{#terms}}
<terms>
{{terms}}
</terms>
{{/terms}}

1. Choose the terms. Use the supplied list as the core; if none is given, propose 20 to 30 terms a {{reader_level}} actually meets in this field (on labels, in shops, in forums, from instructors, in quotes or invoices), and list them under Terms to verify for the writer to confirm. Leave out terms they will not meet for months.
2. Group the terms by when or where the reader meets them (for example "Buying equipment", "Your first session", "Reading a quote") rather than one long alphabetical list; add an A to Z index at the end for lookup.
3. For each term: the term in bold; a definition of one sentence (under 25 words) using only words a newcomer knows, or terms defined earlier with a link; an example sentence showing it in real use; a "not to be confused with" note where a mix-up is common; and "See also" cross-links to related terms.
4. Write a "Start with these five" box at the top: the five terms that unlock the most of the rest, each with one line on why.
5. Write a short intro (under 80 words) saying who the glossary is for and how to use it, and a closing line pointing to a next-step article if the writer has one.
6. Note numbers, units, standards, safety terms and regulated terms whose exact definitions the writer must check against an authoritative source.
</task>

<constraints>
- Use the writer's own definitions where given; improve clarity but keep the meaning. Never contradict them silently; if one looks wrong, flag it.
- Do not invent statistics, standards, brand names or regional variants. Where terms differ by country (units, trade names, regulations), say so and ask which country the reader is in.
- For safety, health, legal or financial terms, define neutrally and suggest the reader check with a qualified professional or official source.
- Plain international English; no jokes that depend on idioms.
- If the field is missing or too broad to define (for example "science"), ask the writer to narrow it and stop.
</constraints>

<output_format>
## Glossary article
Title, intro, the Start with these five box, the grouped terms as described, then the A to Z index (term with anchor link).

## Terms to verify
Table: term | why to check (proposed by the assistant, number or standard, regional variant, regulated term) | suggested source type.

## Publishing notes
Bullets: anchor links for each term, a suggested meta description under 155 characters, internal links to add, and how to keep it updated.
</output_format>
