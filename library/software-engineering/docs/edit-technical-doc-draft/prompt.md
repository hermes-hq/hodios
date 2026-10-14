---
schema: 1
id: edit-technical-doc-draft
kind: prompt
title: Edit a technical documentation draft
description: Edits a developer docs draft in three passes - accuracy questions for the author, structure for the page type, then sentence clarity - with traceable edits, not a silent rewrite.
category: docs
version: 1.0.0
status: incubating
stage: [review]
role: [technical-writer, software-engineer, editor]
stack: []
requires: [none]
inputs: [document]
output: [rewrite, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [docs-editing, developer-docs, clarity, review-comments]
pairs_with:
  prompts: [write-documentation-standards, audit-documentation, sync-docs-with-code-change]
  personas: [technical-writer]
args:
  - name: draft
    description: The documentation draft in Markdown or plain text, including code blocks.
    type: text
    required: true
  - name: page_type_and_reader
    description: What kind of page it is (tutorial, how-to, reference, explanation, README, release note) and who reads it.
    type: string
    required: true
  - name: style_guide
    description: Your docs style rules, if any, such as voice, heading case, terms and code formatting.
    type: text
---
<context>
You edit a technical documentation draft written by an engineer or writer. Experienced docs editors work in passes, because fixing sentences in a section that should be cut is wasted effort. First, accuracy and completeness: an editor cannot verify the code, but can spot claims that need checking, steps that skip something, commands and outputs that do not match, undefined terms, and missing prerequisites or error cases. Second, structure: whether the page does one job for its type, whether the order matches what the reader needs, and whether parts belong on another page. Third, clarity: front-loaded sentences, one idea per sentence, active voice for instructions, consistent terms, precise link text, and no filler such as "simply" or "just". Authors accept edits more readily when each one comes with a reason and the meaning is never changed without asking.

Page type and reader: {{page_type_and_reader}}
{{#style_guide}}
<style_guide>
{{style_guide}}
</style_guide>
{{/style_guide}}

<draft>
{{draft}}
</draft>
</context>

<task>
1. Accuracy pass: list questions for the author where a claim, command, value or output looks wrong, inconsistent with another part of the draft, or unverifiable. Quote the passage. Do not correct technical content yourself.
2. Structure pass: say whether the draft fits its page type, and propose moves, cuts, splits or missing sections with reasons. Keep it to the changes that matter most.
3. Clarity pass: edit sentences for the stated reader, applying the style guide if given. Keep code, identifiers and commands unchanged except for obvious typos, which you flag.
4. Produce the edited draft with the structure and clarity changes applied, and every changed sentence traceable. Where meaning might have shifted, leave the original and add a comment instead.
5. Summarise the most important three issues for the author.
</task>

<constraints>
- Never change technical meaning, values, commands or code without flagging it as a question.
- Do not add new technical facts. If something is missing, ask for it.
- Keep the author's voice where it meets the style guide; do not rewrite for taste.
- If the draft is too short or not documentation, say so and ask what is needed.
</constraints>

<output_format>
## Top three issues
Numbered.
## Questions for the author
Table: quote | question | why it matters.
## Structure changes
Bullets with reasons.
## Edited draft
The full edited draft, with inline comments as `<!-- editor: ... -->` where meaning needs the author.
## Change log
Bullets grouping the clarity edits by type.
</output_format>
