---
schema: 1
id: write-paper-reading-notes
kind: prompt
title: Write reading notes on a paper for later writing
description: Turns a research paper into structured reading notes with located quotes, the argument and evidence, the reader's own critique kept separate, links to other sources and how to cite it.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [student, researcher]
requires: [none]
inputs: [document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-notes, papers, thesis, plagiarism-prevention]
pairs_with:
  prompts: [summarize-paper, build-literature-matrix, write-annotated-bibliography]
  personas: [research-librarian]
args:
  - name: paper
    description: The paper's full text, with page numbers if you have them, or the sections you read.
    type: text
    required: true
  - name: project
    description: Your project or question, for example "thesis chapter on teacher burnout and school leadership", so the notes highlight what you will use.
    type: text
  - name: my_thoughts
    description: Your own reactions or highlights so far, which are kept and marked as yours.
    type: text
  - name: citation_style
    description: Your citation style, for example APA 7 or Harvard.
    type: string
    default: APA 7
output_contract:
  format: markdown
  sections: [Reference, Takeaway, Argument and evidence, Quotes worth keeping, My critique, Links, How I might use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notes taken while reading decide how good the literature review written months later will be. Researchers who keep only highlights end up rereading papers, and those who mix the author's words, their own paraphrase and their own opinions in one note risk accidental plagiarism and misattribution. Good research notes are built for later writing: a full reference, a one-line takeaway in the reader's own words, the argument and the evidence for it (design, sample, key numbers), verbatim quotes with page or section locations, the reader's critique clearly marked as their own, links to other sources, and a note on how the paper might be cited (as evidence, method model, definition, counterpoint). This entry makes notes for one paper in depth, for a thesis or article, rather than atomic notes from general reading.
</context>

<task>
Write reading notes on this paper.
{{#project}}My project: {{project}}{{/project}}
<paper>
{{paper}}
</paper>
{{#my_thoughts}}
My own reactions so far (keep and mark as mine):
{{my_thoughts}}
{{/my_thoughts}}

1. Write the reference in {{citation_style}} from the details in the text; mark missing details as [missing: …].
2. Write a one-sentence takeaway in plain words.
3. Lay out the argument and evidence: question, design, sample and setting, key findings with numbers as reported, and the authors' conclusion, each with its location (page or section).
4. Pick three to six quotes worth keeping, copied exactly, with their page or section. Choose definitions, key claims and well-put statements of limitations.
5. Draft critique points as prompts for the reader to confirm or reject (strengths, weaknesses, questions), clearly separated from the paper's content. Keep the reader's own reactions, marked as theirs.
6. Suggest links: concepts, debates or kinds of sources this paper connects to, and any works it cites that look worth following (marked as leads to verify).
7. Note how it might be used in the project: as core evidence, method model, definition, counterpoint or background, with an example sentence that paraphrases rather than copies.
</task>

<constraints>
- Quotes must be verbatim from the text with a location. If page numbers are not in the text, use section names and add [p. ?] to remind the reader to fill them.
- Never mix voices: paper content, verbatim quotes, and the reader's critique each live in their own section, with quotes in quotation marks.
- Copy numbers exactly. Do not add details from memory about the paper or its authors.
- The example paraphrase must be genuinely reworded and still cite the paper.
- If only an abstract is given, say so and keep the notes to what the abstract supports.
</constraints>

<output_format>
## Reference
The formatted reference.
## Takeaway
One sentence.
## Argument and evidence
Bullets, each with a location.
## Quotes worth keeping
Numbered quotes in quotation marks with location and one-line note on why.
## My critique
Bullets labelled "Me:" for the reader's own points and "To consider:" for suggested ones.
## Links
Bullets.
## How I might use it
Role in the project and an example sentence.
</output_format>
