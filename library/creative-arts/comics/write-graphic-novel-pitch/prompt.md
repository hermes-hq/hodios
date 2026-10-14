---
schema: 1
id: write-graphic-novel-pitch
kind: prompt
title: Write a graphic novel pitch
description: Writes a graphic novel or comic series pitch for publishers or agents, with a cover letter, full synopsis, format and audience, comps to verify, a sample pages plan and a checklist.
category: comics
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [message, summary, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [comic-pitch, submission-package, synopsis, sample-pages, comparable-titles]
pairs_with:
  prompts: [write-comic-script, write-character-model-sheet-brief]
  workflows: [graphic-novel-track]
args:
  - name: project
    description: Title, logline, genre, audience age group, planned page count or issue count, colour or black and white, the story from start to end, and what is already made (script, character designs, finished pages).
    type: text
    required: true
  - name: creators
    description: Who is on the team (writer, artist, colourist, letterer) with a line of relevant experience each, and whether the writer is seeking an artist. Optional.
    type: text
  - name: target
    description: Who you are sending to and any guidelines you have, for example "literary agents for children's graphic novels", "an open submissions call with its guidelines pasted". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Pitch at a glance, Cover letter, Synopsis, Format and audience, Comparable titles, Sample package plan, Submission checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor who has read many comics pitches. A graphic novel pitch is judged differently from a prose query: the art matters as much as the story, so a package usually pairs a short letter and a synopsis with finished sample pages, character designs and a script for more pages, and a writer without an artist has fewer open doors. Editors want the full story including the ending, a clear audience age category, a page count that fits the category, and recent comparable titles that show where the book sits on a shelf. Every publisher and agent has its own guidelines, and following them exactly is the first filter.

Project: {{project}}
{{#creators}}Creators: {{creators}}{{/creators}}
{{#target}}Target: {{target}}{{/target}}
</context>

<task>
1. Pitch at a glance: title, a one-sentence logline, genre, audience age category, format (graphic novel, series of issues, webcomic collection), page or issue count, colour, and status of the art.
2. Cover letter: under about 300 words, addressed generically (leave a placeholder for the name), with the hook, the logline, format and audience, one or two comparable titles, a short creator bio paragraph, and what is attached.
3. Synopsis: one page in present tense, covering the whole story including the ending, focused on the main character's change.
4. Format and audience: why the page count and colour choice fit the audience and genre, and how the story could be split (volumes, issues) if a publisher asked.
5. Comparable titles: explain what makes a good comp (recent, similar audience and tone, not a giant outlier) and list slots for two or three comps with what each should share with this book. If the creator gives titles, assess their fit; never invent titles or sales facts.
6. Sample package plan: what to include based on what is already made (for example a number of finished pages, character design sheets, a script for further pages, a cover image), what to make first if anything is missing, and how a writer without an artist should approach it.
7. Submission checklist: following each recipient's guidelines exactly, file formats and sizes, naming, tracking submissions, and timing of follow-ups.
</task>

<constraints>
- Never invent comparable titles, publishers, agents, editors, sales numbers or acceptance rates. Use placeholders and tell the creator to research them.
- If the target's guidelines are pasted, they override this structure; say where.
- Do not hide the ending in the synopsis.
- Do not overstate the creators' credits; use only what was given.
</constraints>

<output_format>
## Pitch at a glance
## Cover letter
## Synopsis
## Format and audience
## Comparable titles
## Sample package plan
## Submission checklist
</output_format>
