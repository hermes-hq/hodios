---
schema: 1
id: read-paper-with-me
kind: prompt
title: Read a research paper together, section by section
description: Reads a research paper with the user one section at a time, explaining terms and methods at their level and asking questions that check understanding before moving on. For learning to read papers.
category: literature-review
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [student, researcher]
requires: [none]
inputs: [document]
output: [explanation, questions, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [papers, guided-reading, critical-appraisal, comprehension-check, glossary]
pairs_with:
  prompts: [summarize-paper, appraise-study-quality, check-science-news-against-paper]
  personas: [research-librarian]
args:
  - name: paper_text
    description: The full text of the paper, or at least the sections you want to read. Figures can be described in words or with their captions.
    type: text
    required: true
  - name: reader_level
    description: student explains every technical term and method from scratch; practitioner assumes field basics and focuses on methods and applicability; expert skips basics and reads critically.
    type: enum
    enum: [student, practitioner, expert]
    default: student
output_contract:
  format: markdown
  sections: [Map of the paper, Section reading, Check your understanding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People learn to read research by doing it with someone who knows how: read the abstract and figures first to get the map, then work through the sections asking what each one is for, what the authors did and why, and whether the evidence supports the claim. A summary skips that learning. A good reading partner explains at the reader's level, checks understanding with questions rather than lectures, separates what the paper says from interpretation, and points out where even experienced readers should slow down (the methods behind the headline result, the comparison actually made, the size and uncertainty of effects, and the limitations the authors underplay).
</context>

<task>
Read this paper with me. My level: {{reader_level}}.
<paper>
{{paper_text}}
</paper>

This is a conversation, one section per turn.

First turn:
1. Give a map: the question the paper asks, the type of study, the main claim, and the list of sections we will read, in a recommended order (for most papers: abstract, figures and tables, introduction, methods, results, discussion).
2. Read the first section with me (step 3), then stop.

Each later turn, for the next section:
3. Explain what this section is for, then go through it in short chunks: what it says in plain words, terms and methods explained at my level (add each new term to a running glossary), and one note on what a careful reader notices here.
4. Ask me one or two questions that check understanding, not memory (for example "Why do you think they used a control group here?" or "What would the result look like if the effect were zero?"). Wait for my answers.
5. When I answer, tell me what I got right, correct misunderstandings kindly and precisely, and then move to the next section only when I say so.

After the last section: summarise what the paper shows and does not show, give the three strongest and three weakest points, show the glossary, and suggest what to read next to understand it better (types of sources, not invented titles).
</task>

<constraints>
- Work only from the text provided. If a section, figure or table is missing, say so and do not guess what it contains.
- If the input is only a title, DOI, link or abstract, say that you cannot read the paper from that and ask for the full text (or offer to read just the abstract, clearly limited).
- Match the level: for student, define every technical term and statistical result in plain words; for practitioner, focus on methods, applicability and effect sizes; for expert, keep explanations short and go straight to design choices, assumptions and alternative explanations.
- Keep each turn short enough to read in two or three minutes. Never dump the whole paper at once.
- Mark your own interpretation and critique as such, separate from what the authors claim.
- Do not invent references, numbers or quotes.
</constraints>

<output_format>
## Map of the paper
First turn only.
## Section reading
The section name as a heading, chunked explanation, a "careful reader notices" note, and the glossary additions.
## Check your understanding
One or two questions, then stop and wait.
</output_format>
