---
schema: 1
id: remove-ai-writing-tics
kind: prompt
title: Remove machine-sounding writing tics
description: Edits machine-sounding text by removing stock phrases, empty intensifiers, formulaic structures and over-hedging, keeping the author's meaning and facts, and matching a voice sample if given.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, marketer, individual]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ai-assisted-writing, stock-phrases, voice-matching, de-slop]
pairs_with:
  prompts: [tighten-prose, rewrite-for-tone, proofread-text]
  personas: [editor]
args:
  - name: text
    description: The draft to edit, such as an AI-assisted email, post, report section or article.
    type: text
    required: true
  - name: voice_sample
    description: "Optional: a few paragraphs you wrote yourself, without AI help, so the edit can match your sentence length, vocabulary and tone."
    type: text
output_contract:
  format: markdown
  sections: [Edited text, What changed, Check these]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text drafted with language models often shares recognisable habits that make readers skim or distrust it, whoever wrote it:
- **Stock openers and closers:** "In today's fast-paced world", "Let's dive in", "In conclusion", "I hope this helps", "Feel free to reach out".
- **Inflated vocabulary:** delve, tapestry, testament, landscape, realm, robust, seamless, leverage, unlock, elevate, game-changer, pivotal, crucial, navigate (for non-physical things), foster, embark.
- **Empty intensifiers and hedges:** truly, incredibly, really, deeply, arguably, it's worth noting that, it's important to remember, generally speaking, may potentially.
- **Formulaic structures:** "It's not just X, it's Y"; "Whether you're A or B…"; reflexive groups of three; every paragraph ending in a neat summary sentence; rhetorical questions answered at once; headings and bullets where prose would read better; bolded phrases scattered for emphasis.
- **Over-balancing:** "on the one hand… on the other" with no conclusion; caveats on claims that need none.
- **Typography tics:** dense em dashes, colons before every list, emoji in professional prose, Title Case Headings.
The fix is not a word swap. It is saying the specific thing plainly, in the author's voice, and cutting what says nothing.
</context>

<task>
Edit this text so it reads as if a thoughtful person wrote it.

<text>
{{text}}
</text>
{{#voice_sample}}
The author's own writing, to match:
<voice_sample>
{{voice_sample}}
</voice_sample>
{{/voice_sample}}

1. If there is a voice sample, note its traits first: average sentence length, contractions, formality, how it opens, favourite words, punctuation habits, use of humour. Match them. Otherwise aim for plain, direct, conversational prose suited to the text's purpose.
2. Find every instance of the patterns above. For each, cut it if it carries no meaning, or replace it with the specific claim, example or plain word it stands in for.
3. Vary sentence length and rhythm. Merge or remove bullets and headings that break up what should be a paragraph, and keep lists only where items are truly parallel.
4. Remove hedges unless the uncertainty is real; where it is real, say what it depends on.
5. Keep every fact, figure, name, claim, link and commitment. Keep the structure the purpose needs (an email still has its ask; a report still has its sections).
6. Where a generic sentence needs a concrete detail you do not have, write `[specific example: …]` rather than inventing one.
</task>

<constraints>
- Do not add new facts, opinions, examples or anecdotes.
- Do not swap one cliché for another, and do not introduce deliberate errors or slang to seem human.
- Keep technical terms that are correct and needed, even if they appear on the lists above in other contexts (for example "robust" in statistics).
- Keep roughly the same length or shorter; never pad.
- This edit is for clarity and voice. Do not promise or imply that the result will pass any AI detector; those tools are unreliable and that is not the goal.
</constraints>

<output_format>
## Edited text
The full edited text.
## What changed
A table of the most significant edits (up to 12): Before | After | Pattern. Then one line counting the remaining minor edits.
## Check these
Each `[specific example: …]` placeholder and any place where a cut might have changed nuance. "None" if none.
</output_format>
