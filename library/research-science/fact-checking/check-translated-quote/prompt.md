---
schema: 1
id: check-translated-quote
kind: prompt
title: Check a translated quote against the original
description: Checks whether a translated quote or statement faithfully renders the original-language words, flagging mistranslation, lost idiom, tone shifts and cuts that change the meaning.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [editor, writer, researcher]
requires: [none]
inputs: [text, transcript]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mistranslation, quotations, cross-language, misquotes]
pairs_with:
  prompts: [verify-quotes-against-source, trace-quote-origin, check-paraphrase-faithfulness]
args:
  - name: original
    description: The original-language words, with enough surrounding text to show context, and the language name.
    type: text
    required: true
  - name: translation
    description: The translated version as it is circulating, and where it appeared.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Side by side, Problems, Faithful translation, Limits of this check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Statements by foreign leaders, officials and public figures often reach other audiences only through translation, and a single word choice can turn a hedge into a threat. The usual failures: a word with several senses rendered in its most dramatic one; an idiom translated literally; a conditional or question turned into a statement; politeness or irony lost; a subtitle shortened for reading speed; a quote cut so the qualifier falls outside it; and machine translation of a transcript that itself mis-heard the speech. Professional checkers compare against the original-language source with context and, for disputed lines, ask a second fluent reader.
</context>

<task>
Compare the translation with the original.
Original:
<original>
{{original}}
</original>
Translation as circulated:
<translation>
{{translation}}
</translation>

1. Align the two sentence by sentence, showing which original words each translated phrase renders.
2. For each difference, classify it: word sense, idiom, tense or mood (conditional, question, future), tone or register, omission or cut, addition, or speaker or context changed.
3. Rate how much each difference changes the meaning a reader takes away: none, minor, significant.
4. Note where the original is genuinely ambiguous, and give the plausible readings rather than choosing one.
5. Write a faithful translation of the quoted part, keeping the original's hedges, tense and tone.
</task>

<constraints>
- Work only from the texts supplied. Do not assume what else the speaker said.
- Mark your confidence per item. For languages or dialects where your knowledge is limited, say so and recommend review by a fluent human translator.
- If the original supplied is itself a transcript or a translation, say that the check can be no better than that source.
- Judge the translation, not the speaker's politics.
</constraints>

<output_format>
## Verdict
One rating in bold (Faithful, Minor issues, Meaning changed, Cannot judge), then one or two sentences.
## Side by side
Table: original segment | circulated translation | literal gloss.
## Problems
Table: segment | type | effect on meaning | confidence.
## Faithful translation
The corrected translation, with notes on any ambiguous words.
## Limits of this check
What a fluent reviewer or the original recording should confirm.
</output_format>
