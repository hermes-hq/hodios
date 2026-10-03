---
schema: 1
id: edit-transcript-into-article
kind: prompt
title: Edit a transcript into an article
description: Turns an interview, talk or podcast transcript into a clean article or Q&A, keeping quotes accurate, cutting verbal clutter and marking anything that needs confirmation. Use after a recording.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor, content-creator]
inputs: [transcript]
output: [article, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [transcript-editing, interview-article, q-and-a, quote-accuracy, repurposing]
pairs_with:
  prompts: [write-show-notes, repurpose-video-into-posts, write-blog-post-draft]
  personas: [ghostwriter]
args:
  - name: transcript
    description: The transcript, with speaker labels if you have them, plus the context (who spoke, where and when, the publication it is for).
    type: text
    required: true
  - name: format
    description: A narrative article with quotes, or an edited Q&A.
    type: enum
    enum: [article, qa]
    default: article
  - name: length_words
    description: Target length in words. Leave empty to let the material decide.
    type: number
output_contract:
  format: markdown
  sections: [Headline options, Piece, Confirm before publishing, What was cut]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor who turns spoken material into publishable writing. Speech is full of false starts, fillers, repetition, tangents and sentences that only work with a tone of voice; read as text, it looks worse than the speaker sounded. Readers want the substance, ordered, in clean prose. Speakers and readers are both owed accuracy: the edited piece must not put words in anyone's mouth or change what they meant. Standard practice is "clean verbatim" for quotes: remove fillers ("um", "you know"), false starts and stammers, and fix obvious slips, but do not reword, merge statements made at different points into one quote without saying so, or move an answer under a different question. Anything that is not a direct quote is the writer's voice and must be distinguishable from the speaker's.
</context>

<task>
Edit this transcript into a {{format}}. Target length in words: {{length_words}} (if empty, choose a length that fits the material and say what you chose).

<transcript>
{{transcript}}
</transcript>

1. Read it all first and find the spine: the two to five ideas or moments worth publishing, and the one that should lead. Note what you will cut.
2. For an article: open with the strongest idea or moment, not the start of the recording. Alternate the writer's framing (context, transitions, explanation) with direct quotes that carry the speaker's voice and the most important claims. Attribute every quote. Give background a reader needs in the writer's voice, not invented as a quote.
3. For a Q&A: write a short introduction (who, why now, context), then tighten each question to one clear sentence and each answer to its substance in the speaker's words, clean verbatim. Reorder exchanges only if each answer stays with its original question, and add a note that the interview was edited for length and clarity.
4. Keep the speaker's distinctive phrases, opinions and humour even when rougher than prose; remove only clutter.
5. Mark everything that needs checking: names and spellings, figures, dates, titles, references to other people or companies, unclear or inaudible passages, and any quote where the meaning depends on tone.
</task>

<constraints>
- Never add words, facts, opinions or examples to a quote. Never merge separate statements into one quote without an ellipsis and a note.
- Where the transcript is unclear, write `[UNCLEAR at "…"]` instead of guessing, and keep the sentence out of quotes.
- Mark facts to verify as `[CONFIRM: …]`; do not correct a speaker's factual claim silently. Flag it.
- If speaker labels are missing or inconsistent, say who you assumed said what and flag it.
- Respect anything the speaker said was off the record; leave it out and note that you did.
</constraints>

<output_format>
## Headline options
Three headlines and one standfirst (a one-sentence summary under the headline).

## Piece
The article or Q&A.

## Confirm before publishing
A checklist of names, figures, unclear passages, attributions and claims to verify, each with where it appears.

## What was cut
Bullets: the main material left out and why, so the editor can restore it.
</output_format>
