---
schema: 1
id: rework-poem-ending
kind: prompt
title: Rework a poem's ending
description: Diagnoses why your poem's ending falls flat (explaining, summarising, overshooting, abrupt), runs a cut test and offers three ending sketches built on different strategies.
category: poetry
version: 1.0.0
status: incubating
stage: [review]
role: [writer, artist, student]
subject: [literature]
requires: [none]
inputs: [text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [poem-endings, closure, close-reading, redrafting]
pairs_with:
  prompts: [critique-poem, workshop-poem-revision, title-poem]
  personas: [poetry-mentor]
args:
  - name: poem
    description: The whole poem with line breaks; the ending only makes sense in context.
    type: text
    required: true
  - name: concern
    description: What bothers you about the ending, or what you want the reader to feel at the end. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where the poem ends now, Diagnosis, Cut test, Ending sketches, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet and editor who has helped many poets with their last lines. Endings fail in a few recognisable ways: the poem explains itself or states a moral the images already carried; it summarises; it goes one stanza past its real ending; it reaches for a big abstract statement ("and that is what love is"); it lands on a pretty image that has nothing to do with what came before; or it stops abruptly before the turn has happened. Strong endings tend to end on an image that has gathered meaning, return to an earlier image changed, turn outward to something larger without naming it, leave a precise question, or close with sound (a rhyme, a rhythm that settles). Cutting is often the fix: many poems improve when the last line or stanza is removed.

<poem>
{{poem}}
</poem>
{{#concern}}Poet's concern: {{concern}}{{/concern}}
</context>

<task>
1. Say where the poem's energy peaks and where it actually ends now, quoting the line numbers.
2. Diagnose the ending using the failure patterns above, in plain terms and with the exact lines. If the ending already works, say so and why, and keep the rest short.
3. Run a cut test: show the poem's final lines with the last line removed, and with the last stanza removed (if there is more than one), and say what each cut gains or loses.
4. Offer three ending sketches, each built on a different strategy (end on an existing image, return with change, turn outward, a question, closing sound), each replacing only the last one to four lines, written in the poet's own diction and line lengths. Label them as sketches for the poet to rewrite.
5. Ask two or three questions that help the poet decide (what should the reader be left holding? is the speaker changed by the end?).
</task>

<constraints>
- Change only the ending; do not rewrite earlier lines. If an earlier image needs to be planted for an ending to work, say so instead of doing it.
- Match the poem's diction, line length and form (keep the rhyme or metre if the poem has one).
- If the poet wants the ending to state the meaning outright, explain the risk briefly and offer one version that clarifies through an image, but respect their choice.
- Do not add stock words or a moral.
</constraints>

<output_format>
## Where the poem ends now
Two or three sentences with line numbers.
## Diagnosis
Two to four bullets.
## Cut test
The cut versions of the last lines and one line each on the effect.
## Ending sketches
Three labelled sketches with their strategy.
## Questions for you
Two or three questions.
</output_format>
