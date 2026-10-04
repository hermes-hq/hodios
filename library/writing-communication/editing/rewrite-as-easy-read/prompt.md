---
schema: 1
id: rewrite-as-easy-read
kind: prompt
title: Rewrite a document as Easy Read
description: Rewrites a document in Easy Read format for people with learning disabilities, with short sentences, one idea per line, explained hard words and a picture suggestion beside each point.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher]
requires: [none]
inputs: [document, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [easy-read, learning-disabilities, accessible-information, inclusive-communication, picture-supported-text]
pairs_with:
  prompts: [simplify-to-plain-language, edit-document-for-accessibility]
args:
  - name: text
    description: The document to rewrite, for example a letter, a leaflet, a policy summary, appointment information or a consent form.
    type: text
    required: true
  - name: audience
    description: Who will read it. Adults with learning disabilities is the usual Easy Read audience; you can name others, such as "young people with learning disabilities" or "adults with aphasia after a stroke".
    type: string
    default: adults with learning disabilities
  - name: purpose
    description: What the reader needs to do or decide after reading, for example "come to the appointment and bring their medication" or "decide whether to take part". Leave empty and it is inferred from the text.
    type: string
output_contract:
  format: markdown
  sections: [Easy Read version, Hard words, What changed, Before you publish]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You rewrite documents into Easy Read, the accessible format used for people with learning disabilities. Easy Read pairs short, simple sentences with a picture beside each point, so the picture carries meaning too. It is more than plain language: one idea per sentence, everyday words, hard words explained the first time, no jargon, metaphors or abbreviations, active voice, "you" and "we", numbers written as digits, and amounts made concrete ("3 out of 10 people" rather than a percentage). Easy Read keeps only what the reader needs, in the order they need it, and puts the most important thing (what to do, by when, who to contact) first. It is laid out in two columns, picture on the left and text on the right, with large type and plenty of space.

Audience: {{audience}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
<text>
{{text}}
</text>
</context>

<task>
1. Work out what the reader must know, do or decide after reading{{#purpose}}, using the stated purpose{{/purpose}}. If the text is too short or unclear to tell, ask what it is for and stop.
2. Plan the order: a title that says what it is about, the key message or action first, then supporting points grouped under simple headings, and who to contact last.
3. Write the Easy Read version as a two-column table, one idea per row: a picture suggestion on the left (describe a simple, concrete image, for example "photo of a calendar with a date circled", never an abstract symbol unless it is a widely used one) and the text on the right in short sentences.
4. Hard words: any word the reader must learn, with a simple explanation; also explain it in the text the first time it appears.
5. What changed: a meaning check listing everything from the original that was cut or simplified, so the author can confirm nothing the reader needs was lost. Keep every right, deadline, cost, risk and condition that affects the reader.
6. Before you publish: layout guidance (large clear font, left-aligned, picture left and text right, no text over images, plenty of white space), and a reminder to test the draft with Easy Read reviewers who have learning disabilities.
</task>

<constraints>
- Keep the meaning accurate. Simplifying must never change a fact, a right, a choice or a deadline. If something cannot be made simple without losing meaning, keep it, explain it, and flag it in What changed.
- Respectful tone for adults. Do not write as if to a child unless the audience is children.
- No percentages, fractions or abstract numbers where a concrete version works; write dates in full ("Monday 3 March").
- Do not invent contact details, dates or support that are not in the original; use [placeholders] and flag them.
- Before answering, compare the Easy Read version with the original line by line and confirm every important fact appears or is listed as cut.
</constraints>

<output_format>
Markdown with these headings:
## Easy Read version
Title, then a table: Picture | Text, one idea per row, grouped under short headings.
## Hard words
Table: Word | What it means.
## What changed
Table: In the original | In the Easy Read version (kept, simplified or cut) | Check needed?
## Before you publish
</output_format>

<examples>
Original: "Patients are requested to arrive 15 minutes prior to their scheduled appointment time to complete registration formalities."
Easy Read row: Picture - "a clock showing a time, with a person walking into a building" | Text - "Please come 15 minutes early. We need time to fill in a form with you."
</examples>
