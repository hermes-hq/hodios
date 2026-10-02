---
schema: 1
id: explain-research-to-public
kind: prompt
title: Explain research to the public
description: Turns a research paper into an accurate plain-language summary, press release, blog post or social thread without hype, keeping caveats, study type and effect sizes. Use for science communication.
category: scientific-writing
version: 1.0.0
status: experimental
stage: [build]
role: [researcher, writer, content-creator]
requires: [none]
inputs: [document]
output: [article, post, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [science-communication, plain-language, press-release, anti-hype]
pairs_with:
  prompts: [summarize-paper, write-abstract]
args:
  - name: paper
    description: The paper's text, or at least its abstract, methods and results.
    type: text
    required: true
  - name: format
    description: What to produce.
    type: enum
    enum: [summary, press-release, blog, social]
    default: summary
output_contract:
  format: markdown
  sections: [Accuracy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Studies of science news have traced much of the exaggeration in health and science coverage back to the press releases themselves: correlations reported as causes, animal results applied to humans, and advice the study never tested. Readers understand risk better as absolute numbers and natural frequencies ("8 in 100 people instead of 10 in 100") than as relative changes ("a 20% drop"). Good public writing is accurate first and engaging second: it says what was studied, in whom, what was found and how sure we can be, in words a curious 14-year-old could follow.
</context>

<task>
Write a {{format}} about this paper for a general audience:
<paper>
{{paper}}
</paper>

1. Before writing, extract: the question, the study type, who or what was studied (humans, animals, cells, models) and how many, the main finding with its numbers, the main limitations, and whether the paper is peer-reviewed or a preprint.
2. Lead with what was found, in plain words, with the study type and population in the same sentence or the next.
3. Give the size of the effect in absolute terms or natural frequencies when the paper provides the numbers; if it only reports relative figures, say so rather than converting them yourself.
4. Keep the caveats in the body, not in a final line: what the study cannot show, and what would need to happen next.
5. Shape it for the format:
   - summary: 150 to 250 words.
   - press-release: headline, subheading, "[CITY, DATE]" dateline placeholder, about 400 to 500 words, a "[QUOTE FROM RESEARCHER: …]" placeholder describing what the quote should cover, and Notes to editors with the citation and study details.
   - blog: 600 to 900 words with a headline and short subheadings.
   - social: a thread of 3 to 5 posts of at most 280 characters each, where the first post already carries the main caveat.
</task>

<constraints>
- Use only the paper. Do not add facts, statistics or context from memory; if background is needed, mark it "[BACKGROUND: …]" for the author to source.
- Match claims to the design: associations stay associations, animal and cell findings are labelled as such, and models and simulations are called predictions.
- Avoid hype words such as "breakthrough", "cure", "miracle", "game-changer" and "proves", and headlines that the body has to walk back.
- Never invent quotes. Use the quote placeholder.
- Do not tell readers to change their health, diet, medicines or money based on one study. When the topic touches health, add one sentence that they should talk to a doctor or other qualified professional before acting on it.
- If the paper text is missing or too thin to report the finding accurately, say what is needed instead of writing.
</constraints>

<output_format>
The piece in the requested format, then:
## Accuracy check
A table: claim in the piece | the sentence or number in the paper that supports it. Add a row for every number used.
</output_format>
