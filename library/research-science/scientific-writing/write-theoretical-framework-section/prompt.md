---
schema: 1
id: write-theoretical-framework-section
kind: prompt
title: Write a theoretical or conceptual framework section
description: Writes the theoretical or conceptual framework section of a thesis or paper, explaining the theory, defining its constructs and showing how it shapes the questions, design and analysis.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [theoretical-framework, conceptual-framework, thesis, dissertation, constructs]
pairs_with:
  prompts: [write-introduction-section, write-literature-review-section, plan-thesis-structure]
  personas: [thesis-advisor]
args:
  - name: study
    description: Your research questions or hypotheses, the design, and what you will measure or analyse.
    type: text
    required: true
  - name: theory
    description: The theory or theories you plan to use (or candidates), the key sources you have read on them, and your notes on why they fit.
    type: text
    required: true
  - name: level
    description: Optional. Thesis level and field, for example "master's in education" or "PhD in public health".
    type: string
output_contract:
  format: markdown
  sections: [Framework section, Construct map, Fit check, Sources to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Examiners and reviewers read a framework section to see whether theory actually does work in the study, not whether the student can summarise a famous theory. The usual weaknesses: a theory named in the introduction and never used again; a long textbook summary of the theory with no link to the research questions; constructs defined differently from how they are measured; and confusion between a theoretical framework (an existing, tested theory applied to the study) and a conceptual framework (the researcher's own map of concepts and expected relationships, often combining theories or literature). A strong section states the theory and its origin briefly, defines each construct used, says which parts are used and which are not, justifies the choice against alternatives, and traces the theory into the questions, the instruments or coding, and the interpretation.
</context>

<task>
Write the framework section for:
<study>
{{study}}
</study>
<theory>
{{theory}}
</theory>
{{#level}}
Level and field: {{level}}
{{/level}}

1. Decide whether this is a theoretical or a conceptual framework, based on the material, and say so with one sentence of reasoning.
2. Introduce the theory: its core proposition, origin and how it has been applied in this field, citing only the sources given and using [CITE: ...] placeholders where support is needed.
3. Define each construct the study uses, in the sense the study uses it, and say how it will be measured, observed or coded.
4. Justify the choice: what this theory explains that a plausible alternative would not, and its known limitations or critiques.
5. Show the link to the study: which research question or hypothesis each construct or relationship informs, and how the theory will guide analysis and interpretation.
6. Describe the diagram of the framework in words (boxes and arrows) so the author can draw it.
7. Check fit: flag any research question that the framework does not address, and any construct defined but not used.
</task>

<constraints>
- Do not attribute claims, dates or definitions to authors unless they are in the supplied material; use placeholders and list them under Sources to verify.
- Keep the theory summary to what the study uses; no textbook overview.
- Do not overstate: a framework guides the study, it is not proven by it.
- Match the conventions of the stated field; if none is given, write for a social or health sciences thesis and say so.
</constraints>

<output_format>
## Framework section
The section in continuous prose with subheadings, then a short paragraph describing the diagram.
## Construct map
Table: construct, definition used, how measured or coded, research question it informs.
## Fit check
Bullets on gaps between theory and questions.
## Sources to verify
Each placeholder and what source is needed.
</output_format>
