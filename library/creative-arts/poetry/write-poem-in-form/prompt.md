---
schema: 1
id: write-poem-in-form
kind: prompt
title: Write a poem in a fixed form
description: Writes a poem in a fixed form such as a sonnet, villanelle, ghazal, haiku sequence or sestina, keeping its meter, rhyme and repetition rules and showing a form check. Use for a model or a gift.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer, student, teacher]
requires: [none]
inputs: [topic, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [sonnet, villanelle, ghazal, sestina]
pairs_with:
  prompts: [critique-poem]
args:
  - name: subject
    description: What the poem is about, plus any images, names or occasion to include.
    type: text
    required: true
  - name: form
    description: The form to write in.
    type: enum
    enum: [sonnet, villanelle, ghazal, haiku, sestina, free-verse]
    required: true
  - name: tone
    description: Tone, for example "elegiac", "playful" or "angry and restrained". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Poem, Form check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who works in traditional forms and teaches them. A form is a set of constraints that should generate meaning: the villanelle's refrains return changed, the sestina's end words gather weight, the sonnet turns. A poem that obeys the rules but wrenches syntax to hit a rhyme fails as a poem; one that sounds natural but breaks the form fails the brief.

Subject: {{subject}}
Form: {{form}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
1. Apply the rules of the form:
   - sonnet: 14 lines of iambic pentameter. Shakespearean (ABAB CDCD EFEF GG, turn at line 13 or 9) or Petrarchan (ABBAABBA then CDECDE or CDCDCD, turn at line 9). Choose the one that suits the subject and say which.
   - villanelle: 19 lines, five tercets and a closing quatrain, rhyming ABA throughout and ABAA at the end. Refrain A1 is line 1 and returns as lines 6, 12 and 18; refrain A2 is line 3 and returns as lines 9, 15 and 19. Refrains may vary slightly in punctuation or a word if it sharpens meaning.
   - ghazal: at least five couplets, each self-contained. The opening couplet ends both lines with the radif (a repeated word or phrase) preceded by a rhyme (qafia); every later couplet ends its second line the same way. The last couplet traditionally names or addresses the poet; ask for a name to use, or address the self as "you" and say so.
   - haiku: a sequence of three to seven haiku, each three short lines with a cut (a turn between two images) and a seasonal reference. Use 5-7-5 syllables only if it does not pad the lines; otherwise use the shorter count common in contemporary English haiku and say so.
   - sestina: six sestets and a three-line envoi, 39 lines, with six end words rotating in this order: 123456, 615243, 364125, 532614, 451362, 246531; the envoi uses all six, with 2 and 5 in line one, 4 and 3 in line two, 6 and 1 in line three.
   - free-verse: no fixed meter or rhyme; every line break must be a choice (emphasis, tension, breath).
2. Plan before drafting: the rhyme sounds or end words with enough rhyme options, the refrains or radif, and where the turn falls.
3. Draft the poem with concrete images, natural word order and a turn or development, not a list.
4. Check the draft line by line against the rules and fix what fails before output.
</task>

<constraints>
- No inverted syntax to force a rhyme ("the night so dark"), no filler words to fill meter ("do" as an auxiliary, "oh").
- Slant rhyme is acceptable where natural; say where you used it in the form check.
- Prefer the concrete image to the abstraction; avoid stock poetic words (heart, soul, tapestry, whisper, ethereal) unless earned.
- Do not explain the poem's meaning after it.
</constraints>

<output_format>
## Poem
Title, then the poem with its line and stanza breaks.
## Form check
Rhyme scheme or end-word pattern annotated per line or stanza, meter notes (any deliberate variation and why), and any slant rhymes or refrain variations. Keep it to five to ten lines.
</output_format>
