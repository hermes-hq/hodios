---
schema: 1
id: unpack-dense-theory-passage
kind: prompt
title: Unpack a dense theory passage
description: Walks a student through a hard theory or philosophy passage sentence by sentence, glossing terms, reconstructing the claim and checking the student's own paraphrase.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [philosophy, social-sciences, literature]
requires: [none]
inputs: [text]
output: [explanation, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [close-reading, critical-theory, paraphrase, academic-reading, key-terms, primary-texts]
pairs_with:
  prompts: [read-textbook-actively, map-argument-structure, practise-summarising-a-text]
  personas: [philosophy-tutor, sociology-tutor]
args:
  - name: passage
    description: The passage to unpack, pasted as text (ideally one to three paragraphs).
    type: text
    required: true
  - name: source
    description: Author, work and, if known, the translation or edition, for example "Foucault, Discipline and Punish, trans. Sheridan".
    type: string
  - name: course
    description: The course and what the reading is for, for example "second-year sociological theory seminar".
    type: string
output_contract:
  format: markdown
  sections: [What the passage is doing, Sentence by sentence, Key terms, Your paraphrase]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student is stuck on a dense passage of theory or philosophy.
{{#source}}Source: {{source}}{{/source}}
{{#course}}Course: {{course}}{{/course}}

<passage>
{{passage}}
</passage>

Dense theory is hard for specific reasons: authors use everyday words as technical terms (discourse, power, the subject, ideology, being), sentences carry long chains of qualification, the author is often arguing against someone unnamed, and translations add their own layer. Skilled readers do not read faster; they slow down in a particular way. They find the main claim of each sentence by stripping qualifiers, note which words are terms of art, ask "who is this against?", and test their understanding by restating it in plain words and checking that restatement against the text. Summaries from the internet often flatten exactly the nuance a seminar will ask about.
</context>

<task>
1. Give a two- or three-sentence orientation: what this passage seems to be doing (defining, arguing, objecting, illustrating) and, if the source is known and you are confident, where it sits in the work. Say plainly if you are unsure.
2. Go sentence by sentence (or clause by clause for very long sentences). For each: quote it, give the core claim in plain words, flag terms used in a technical sense, and note any implied opponent or contrast.
3. After every two or three sentences, stop and ask the student to restate the last part in their own words. Wait for their reply, then say what their paraphrase gets right and what it misses or overstates, pointing back to the exact words.
4. Gather the key terms into a short glossary with the meaning in this passage (not a general dictionary meaning), noting where the author's usage differs from everyday usage.
5. Ask the student for a one-paragraph paraphrase of the whole passage and give feedback on it against the text.
6. End with one question a seminar leader might ask about this passage, for the student to think about.
</task>

<constraints>
- Work from the passage as given. Do not attribute ideas to the author that are not in the text or that you cannot support; mark general background as background.
- Do not invent quotations, page numbers or claims about the wider work. If the source is unfamiliar or the edition matters, say so.
- Where the passage is genuinely ambiguous or scholars disagree, say that and give the main readings rather than one confident answer.
- Do not write the student's essay or seminar paper; this is about understanding the text.
- Keep the plain-language versions plain, without replacing one jargon with another.
</constraints>

<output_format>
## What the passage is doing
Two or three sentences.
## Sentence by sentence
For each: the quoted sentence, then "In plain words:", terms flagged, and the implied opponent if any. Pause for the student's paraphrase every two or three sentences.
## Key terms
| Term | Meaning in this passage | How it differs from everyday use |
## Your paraphrase
Feedback on the student's paraphrase, then one seminar question.
</output_format>
