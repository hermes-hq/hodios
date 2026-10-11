---
schema: 1
id: write-humanities-article
kind: prompt
title: Write a humanities journal article
description: Drafts or restructures a humanities journal article around a thesis-driven argument, close reading of primary sources and engagement with scholarship, rather than the IMRaD format.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes, document, text]
output: [article, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [history, literature, philosophy, art-history]
tags: [humanities, close-reading, thesis-statement, primary-sources, argumentation]
pairs_with:
  prompts: [choose-target-journal, write-paper-title, turn-thesis-chapter-into-paper]
  personas: [academic-writing-coach]
args:
  - name: material
    description: Your argument as you currently see it, the primary sources or texts with the passages you will analyse (quoted exactly), the scholarship you engage with and how, and any draft text.
    type: text
    required: true
  - name: journal
    description: Optional. Target journal, word limit (often 7,000 to 10,000 words including notes) and citation style, for example Chicago notes and bibliography or MLA.
    type: string
output_contract:
  format: markdown
  sections: [Argument, Structure, Draft, Revision notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Humanities articles in history, literature, philosophy, art history and related fields are essays with a thesis, not reports of a study. Editors and reviewers ask: is there an argument that changes how we read this text, period or problem; is it stated early and precisely; is it built through sustained close analysis of primary sources rather than summary; and does it intervene in a named scholarly conversation, saying who has argued what and where this article departs? The introduction typically opens with a scene, passage or problem, sets out the critical conversation, states the claim and the stakes, and gives a roadmap. Sections each advance the argument a step, and each analysis paragraph moves from evidence (quoted and contextualised) to interpretation to its bearing on the claim. Common faults: a thesis that is a topic, sections that summarise sources in turn, quotation without analysis, straw-man treatment of other scholars, and a conclusion that only restates.
</context>

<task>
Develop a humanities article from:
<material>
{{material}}
</material>
{{#journal}}
Target: {{journal}}
{{/journal}}

1. State the argument in two or three sentences: the claim, what it revises in existing scholarship, and why it matters. If the material gives a topic rather than an arguable claim, propose two or three possible claims and pick the best supported, saying why.
2. Map the scholarly conversation from the supplied scholarship: positions, who holds them as given, and where the article intervenes.
3. Design the structure: introduction, three to five sections each with the step of the argument it makes and the sources analysed, and conclusion.
4. Draft the introduction in full, and for each section a model analysis paragraph using the supplied passages (evidence, contextualisation, interpretation, link to the claim), plus a topic sentence for each remaining paragraph.
5. Draft a conclusion that extends the argument's implications rather than restating it.
6. Give revision notes: weak links in the argument, sources that need closer reading, and counter-readings to address.
</task>

<constraints>
- Quote primary and secondary sources only as supplied, word for word, with the author's reference details; never invent quotations, page numbers, archives or scholars' positions. Mark gaps as [CITE: ...] or [SOURCE: ...].
- Do not impose IMRaD headings or social-science conventions.
- Represent other scholars fairly; disagree with arguments, not people.
- Use the stated citation style for any reference formatting, or ask which one.
</constraints>

<output_format>
## Argument
The claim, its intervention and its stakes.
## Structure
Numbered sections with the argumentative step and sources for each.
## Draft
Introduction, model paragraphs, topic sentences and conclusion.
## Revision notes
Bullets.
</output_format>
