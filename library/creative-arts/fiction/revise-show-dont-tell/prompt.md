---
schema: 1
id: revise-show-dont-tell
kind: prompt
title: Revise telling into showing
description: Finds telling in a fiction passage (named emotions, filter words, summary where a scene belongs, explained subtext) and offers shown alternatives in the author's own voice. Use when revising a draft.
category: fiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor]
requires: [none]
inputs: [text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [show-dont-tell, line-editing, author-voice, filter-words]
pairs_with:
  prompts: [critique-fiction-draft, punch-up-dialogue, write-setting-description]
  personas: [fiction-writing-mentor]
args:
  - name: passage
    description: The passage to revise, from a paragraph up to a few pages. Add one line of context (who the characters are and what just happened) if the passage starts mid-scene.
    type: text
    required: true
  - name: pov
    description: Point of view and tense, e.g. "close third, past", "first person present", "omniscient past". Leave as auto to infer it from the passage.
    type: string
    default: auto
output_contract:
  format: markdown
  sections: [Voice profile, Findings, Keep as telling, Revised passage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Show, don't tell" is the most repeated and most misapplied advice in fiction. Telling is not wrong: summary moves time, compresses unimportant events and sets up scenes, and some voices (omniscient, comic, fable-like) rely on it. The problems are specific: emotions named instead of evoked ("she was furious"), filter words that put a pane of glass between reader and experience ("he saw", "she felt", "he noticed"), character traits asserted instead of demonstrated ("he was generous"), subtext explained right after a line of dialogue that already implied it, and an important dramatic moment summarised when it should play out as a scene. Generic "showing" fixes make prose worse: clichéd body language (clenched fists, racing hearts, released breaths), purple description and doubled length. A good revision shows through specific action, choice, dialogue, sensory detail and the character's distinct perception, in the author's voice.
</context>

<task>
Revise telling in this passage. Point of view and tense: {{pov}}.

<passage>
{{passage}}
</passage>

1. **Voice profile:** before suggesting anything, describe the author's voice in three or four lines: point of view and psychic distance, tense, typical sentence length and rhythm, diction (plain, lyrical, wry, clipped), and how they handle interiority. If {{pov}} is auto, state what you inferred. Every alternative must fit this profile.
2. **Findings:** identify the telling that weakens the passage. For each instance:
   - quote it exactly;
   - classify it: named emotion, filter word, asserted trait, explained subtext, summarised scene, or abstract description;
   - say what a reader loses (immediacy, tension, trust in the reader, characterisation);
   - give one or two shown alternatives, each labelled with its technique (action or gesture specific to this character, a choice under pressure, dialogue or what is left unsaid, a concrete sensory detail filtered through this character, an image or comparison from the character's world).
   Rank findings by impact. List at most ten; if there are more, say how many and that the pattern repeats.
3. **Keep as telling:** quote the telling that is doing its job (transitions, time compression, deliberate voice, a reveal after an earned scene) and say why it should stay. Do not convert everything.
4. **Revised passage:** rewrite the passage applying the top alternatives, keeping every plot fact, every line of dialogue that does not change, the paragraph order and the author's sentence patterns. Keep it within about 130 percent of the original length. If the passage is longer than about 800 words, revise only the section with the most findings and say which.
</task>

<constraints>
- Do not use stock physical cues (clenched jaw, racing heart, breath she didn't know she was holding, eyes widening, stomach dropping) unless the voice is deliberately genre-pulp; prefer behaviour only this character would show.
- Do not add plot events, new characters, backstory or a change of point of view.
- Do not correct deliberate stylistic choices (fragments, omniscient commentary, comic narration); note them in Keep as telling if relevant.
- If the passage is too short or has no telling worth changing, say so plainly and give one or two craft observations instead.
</constraints>

<output_format>
## Voice profile
## Findings
Numbered, highest impact first: quote, type, cost, alternatives.
## Keep as telling
## Revised passage
</output_format>

<examples>
<example>
Original: "Maria was nervous about the interview. She felt her hands shaking as she waited."
Finding: named emotion plus filter word. Alternative (action specific to the character): "Maria read the job description a fourth time, then folded it into a smaller and smaller square until it would not fold any more."
</example>
</examples>
