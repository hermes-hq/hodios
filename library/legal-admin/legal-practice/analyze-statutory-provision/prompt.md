---
schema: 1
id: analyze-statutory-provision
kind: prompt
title: Analyse a statutory provision
description: Breaks a statute or regulation into elements, definitions, cross-references, exceptions and ambiguous words, applies it to a fact pattern and lists the interpretive questions to research.
category: legal-practice
version: 1.0.0
status: incubating
stage: [review, learn]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [statutory-interpretation, statute-analysis, legislative-drafting, elements-test, regulations]
pairs_with:
  prompts: [draft-legal-research-memo, brief-court-case, build-law-course-outline]
  personas: [law-school-tutor]
args:
  - name: provision
    description: The full text of the section, with the definitions section and any provisions it cross-refers to, and the date of the version.
    type: text
    required: true
  - name: question
    description: The fact pattern or question you need to answer with the provision.
    type: text
    required: true
  - name: jurisdiction
    description: The legal system, because interpretation methods differ (for example US federal, England and Wales, an EU member state, Australia).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Structure, Elements test, Application to the facts, Ambiguities and interpretive arguments, Research to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reading a statute well is a discipline. Experienced lawyers start with the text and its structure: who the provision applies to, what it requires or prohibits, the conditions, the exceptions and provisos, and the consequences. They look up every defined term in the definitions section instead of using its ordinary meaning, follow cross-references, notice "and" versus "or", "may" versus "shall", "including" versus "means", and the scope of each list. Only then do they turn to interpretive tools, which vary by system: plain meaning and canons of construction, purpose, legislative history, and in some systems official explanatory material or the treaty or directive a provision implements. Novices skip the definitions, read the section in isolation, and forget that the version in force on the relevant date is the one that matters.

Jurisdiction: {{jurisdiction}}

Provision:
<provision>
{{provision}}
</provision>

Question:
<question>
{{question}}
</question>
</context>

<task>
1. Structure: restate the provision as a short outline (applies to, requirement, conditions, exceptions, consequence), listing every defined term with its definition as supplied and every cross-reference.
2. Elements test: turn the operative rule into numbered elements that must all be met, noting "or" alternatives and where the burden of proving an exception probably lies, marked to confirm.
3. Application: apply each element to the facts, saying met, not met or unclear, and why, quoting the words that decide it.
4. Ambiguities: each word or phrase that could reasonably be read two ways, both readings, the textual and structural arguments for each, and which interpretive tools in this legal system might resolve it.
5. Research to do: case law interpreting the provision, the version in force on the relevant date, amendments, commencement and transitional provisions, related regulations or guidance, and any cross-referenced text not supplied.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the text supplied. Do not quote case law, legislative history or other sections from memory; name them as things to research.
- Use the definitions supplied before ordinary meanings, and say when a needed definition is missing.
- Do not give a final answer to the question where an element is unclear; show both outcomes.
- For students, this is analysis to learn from, not a submission to hand in.
{{> output/uncertainty}}
</constraints>

<output_format>
## Structure
## Elements test
Numbered.
## Application to the facts
Table: Element | Met? | Reason | Words that decide it.
## Ambiguities and interpretive arguments
One block per ambiguity.
## Research to do
Checklist.
</output_format>
