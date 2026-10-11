---
schema: 1
id: write-perspective-article
kind: prompt
title: Write a perspective or commentary article
description: Writes a journal perspective or commentary arguing a clear position on a question in the field, with supporting evidence, the strongest counterarguments and a concrete forward agenda.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [perspective-article, commentary, opinion-piece, argumentation, journal-submission]
pairs_with:
  prompts: [write-paper-title, write-letter-on-published-paper, explain-research-to-public]
  personas: [academic-writing-coach]
args:
  - name: position
    description: The position you want to argue, why now, the evidence and sources you will draw on, the main objections you expect, and what you want the field to do.
    type: text
    required: true
  - name: venue
    description: Optional. Journal, article type and limits, for example "Perspective, 2,000 words, 30 references, 1 figure".
    type: string
output_contract:
  format: markdown
  sections: [Article, Argument map, Citations to supply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Perspectives, commentaries and viewpoints are argued, not reported. Editors commission or accept them when the author has a clear, debatable position on a live question, the standing to make it, and something useful for the field to do next. They are short (often 1,500 to 3,000 words), cited, and written for readers across a broad field. Strong pieces state the position in the first paragraph, explain why it matters now, give a few well-chosen lines of evidence rather than a review, take the best opposing view seriously and answer it, and end with a concrete agenda (studies to run, practices to change, standards to adopt). Weak pieces read as mini-reviews with no position, attack straw men, overstate the evidence, or end with "more research is needed".
</context>

<task>
Write a perspective article arguing:
<position>
{{position}}
</position>
{{#venue}}
Venue: {{venue}}
{{/venue}}

1. Sharpen the position into one sentence that a reasonable expert could disagree with. If the position is uncontroversial or unclear, say so and propose a sharper version.
2. Write a title and a standfirst (one or two sentences) that state the argument.
3. Open with the problem and why it matters now, then state the position by the end of the first or second paragraph.
4. Build the argument in two to four sections, each making one point with the evidence the author supplied.
5. Write a section presenting the strongest counterarguments fairly, in the form their proponents would accept, and respond to each.
6. End with a forward agenda: specific actions, studies or standards, and who should take them.
7. Keep to the venue's length and reference limits.
</task>

<constraints>
- Use only the evidence and sources the author supplied; mark other needed support as [CITE: ...]. Do not invent studies, statistics or quotations.
- Do not misrepresent opponents' views; no straw men.
- Distinguish evidence from opinion in the wording ("the evidence shows" versus "I argue").
- Avoid hype and personal attacks; argue against positions, not people.
</constraints>

<output_format>
## Article
Title, standfirst and the article with section headings.
## Argument map
Bullets: claim, supporting evidence, counterargument, response.
## Citations to supply
Each [CITE] placeholder with the claim it supports.
</output_format>
