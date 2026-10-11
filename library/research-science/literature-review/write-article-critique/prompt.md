---
schema: 1
id: write-article-critique
kind: prompt
title: Write a critique of a journal article
description: Helps a student write a critical review of one journal article to an assignment brief, covering summary, methods, strengths, weaknesses and contribution, as an outline, draft or feedback.
category: literature-review
version: 1.0.0
status: incubating
stage: [build, review]
role: [student]
requires: [none]
inputs: [document, text]
output: [article, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [article-critique, critical-appraisal, coursework, assignment]
pairs_with:
  prompts: [summarize-paper, identify-study-design, appraise-study-quality]
  personas: [academic-writing-coach]
args:
  - name: article
    description: The article's full text, or at least the abstract, methods, results and discussion. A critique cannot be written from the abstract alone.
    type: text
    required: true
  - name: brief
    description: The assignment brief, including word count, required headings, marking criteria and citation style.
    type: text
    required: true
  - name: mode
    description: What you want back. Choose outline or feedback if your course limits AI-written text.
    type: enum
    enum: [outline, full-draft, feedback-on-my-draft]
    default: outline
  - name: my_draft
    description: Your own draft, for feedback-on-my-draft mode.
    type: text
  - name: discipline
    description: Your subject and level, for example "second-year nursing" or "MSc psychology".
    type: string
output_contract:
  format: markdown
  sections: [The article in brief, Critique plan, Draft or feedback, Check before submitting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The article critique is a staple assignment in health, social science and science degrees, and it is usually marked down for the same reasons: too much summary and too little evaluation, criticism that is generic ("the sample was small") rather than tied to consequences ("with 24 participants the study could only detect large effects, so the null result on anxiety is inconclusive"), strengths ignored, no use of a recognised appraisal framework when the brief expects one (for example CASP for qualitative studies), and no wider literature to judge the paper's contribution. A good critique takes a position on how far the paper's conclusions follow from its methods and results, balances strengths and weaknesses, and follows the brief's structure and word count exactly. Many courses restrict AI-written text; the student is responsible for checking their course policy, and outline or feedback modes keep the writing the student's own.
</context>

<task>
Help with a critique of this article in "{{mode}}" mode.
{{#discipline}}Course: {{discipline}}{{/discipline}}
<brief>
{{brief}}
</brief>
<article>
{{article}}
</article>
{{#my_draft}}
<my_draft>
{{my_draft}}
</my_draft>
{{/my_draft}}

1. Read the brief and list its required sections, word limit, criteria and any named appraisal framework. Follow them over the default structure below.
2. Summarise the article in about 100 words: aim, design, sample, main findings, authors' conclusion.
3. Plan the critique section by section: the research question and rationale; design and whether it fits the question; sampling and recruitment; measures or data collection; analysis; ethics; results and how they are presented; whether the discussion's conclusions follow; contribution to the field. For each, note one or two specific strengths or weaknesses, the evidence in the article (with page or section), and what it means for trusting the conclusions.
4. Name the appraisal framework that fits the design if the brief does not, and use its questions to make sure nothing important is missed.
5. Mode outline: give the plan as a paragraph-by-paragraph outline with word budgets and topic sentences to write in the student's own words. Mode full-draft: write the critique to the word count in an academic register, with [cite: …] markers where the student must add wider literature. Mode feedback-on-my-draft: mark the student's draft against the brief and criteria, quoting their sentences, and give the five changes that would raise the mark most.
6. End with a checklist against the brief.
</task>

<constraints>
- Use only the article text given; quote or point to sections for every strength and weakness. Never invent page numbers; use section names if pages are not shown.
- Every criticism must state its consequence for the findings. No generic criticism without a reason.
- Do not invent sources for the wider literature. Use [cite: what kind of source is needed] markers instead.
- If the article text is missing or only an abstract, say a critique is not possible yet and ask for the full text.
- Keep to the brief's word limit, structure and citation style. If the brief and these steps disagree, the brief wins.
- Remind the student once to check their course's rules on AI use and to write the final text in their own words where required.
</constraints>

<output_format>
## The article in brief
About 100 words.
## Critique plan
Table: section | strength or weakness | evidence in the article | what it means.
## Draft or feedback
The outline, the full draft, or the feedback, depending on mode.
## Check before submitting
Checklist against the brief.
</output_format>
