---
schema: 1
id: relineate-poem
kind: prompt
title: Relineate a poem
description: Offers two or three alternative lineations of your free-verse poem without changing a word, showing what each set of line and stanza breaks does to pace, emphasis and meaning.
category: poetry
version: 1.0.0
status: incubating
stage: [review]
role: [writer, artist, student]
subject: [literature]
requires: [none]
inputs: [text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [line-breaks, enjambment, free-verse, stanza-breaks, redrafting]
pairs_with:
  prompts: [critique-poem, workshop-poem-revision]
  personas: [poetry-mentor]
args:
  - name: poem
    description: The poem exactly as written, with its current line and stanza breaks and its title.
    type: text
    required: true
  - name: intent
    description: What you want the poem to feel like when read (slow and halting, breathless, plain-spoken) or what bothers you about the current breaks. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How the lines work now, Versions, What each version does, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet and editor who treats the line as the unit of attention. In free verse the break is the main tool the poet has: an end-stopped line closes a thought and slows the reader; an enjambed line creates a small suspense and can let a word mean two things across the break ("I could not stop / the car" versus "I could not stop"). The last word of a line gets weight, so lines that end on "the", "and" or "of" either build deliberate tension or simply leak energy. Short lines slow reading and isolate words; long lines carry speech and momentum. Stanza breaks are longer silences. The most common problem in drafts is prose cut at the point where the margin happened to fall, so every break follows syntax and none does any work.

<poem>
{{poem}}
</poem>
{{#intent}}What the poet wants: {{intent}}{{/intent}}
</context>

<task>
1. Check the input. If the poem is in a fixed metre or rhyme scheme where the lines are set by the form, say that relineating would break the form, and offer only stanza-break options or moving the poem to free verse as a deliberate choice; ask before doing the latter.
2. Describe how the lines work now: average line length, how many breaks are end-stopped versus enjambed, which line-end words carry weight and which are weak, and where the stanza breaks fall relative to the turns in thought.
3. Write two or three alternative lineations, each built on a different principle, for example: short lines that isolate key words and slow the poem; long breath-unit lines that read like speech; breaks placed against syntax to create double meanings; regular stanzas (couplets, tercets) versus irregular verse paragraphs. Pick principles that suit the poem and the intent.
4. For each version, point to two or three specific breaks and say what they do that the original did not (a double meaning created, a word given new stress, a pause that lands before a reveal).
5. Recommend one version, or a mix (for example "version B for the first stanza, the original for the ending"), and say why in terms of the intent.
</task>

<constraints>
- Do not change, add, cut or reorder a single word. Only line breaks, stanza breaks, and indentation may change. If a punctuation change seems important, suggest it separately and say so.
- Keep the title unchanged.
- If the poet asks for word-level edits as well, keep this output to lineation and suggest a critique or revision session for the wording.
- Describe effects as a reader's experience, not as rules; a break is not wrong because it ends on a small word.
</constraints>

<output_format>
## How the lines work now
Three to five sentences.
## Versions
Each version as a labelled block (Version A, B, C) with its principle in one line above it.
## What each version does
Per version, two or three specific breaks quoted with their effect.
## Recommendation
Two to four sentences.
</output_format>
