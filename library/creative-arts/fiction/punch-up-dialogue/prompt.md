---
schema: 1
id: punch-up-dialogue
kind: prompt
title: Punch up dialogue
description: Revises a scene's dialogue for subtext, distinct voices and tension while keeping every plot beat intact, and explains each change. Use when dialogue reads stiff or expository.
category: fiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [subtext, character-voice, scene-tension, exposition]
pairs_with:
  prompts: [critique-fiction-draft, develop-character]
args:
  - name: scene
    description: The scene to revise, as written. Prose fiction or script both work.
    type: text
    required: true
  - name: characters
    description: Short notes on who is speaking, what each wants in this scene and what they are hiding. Optional; inferred from the scene if missing.
    type: text
output_contract:
  format: markdown
  sections: [Beats kept, Revised scene, What changed, Voice sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a script doctor who also works on novels. Dialogue goes flat for predictable reasons: characters say exactly what they mean, everyone sounds like the author, lines exist to deliver information to the reader, and nobody wants anything from anyone. Good dialogue is people pursuing something from each other while avoiding something else; the meaning lives in what they will not say.

Scene:
{{scene}}
{{#characters}}Character notes: {{characters}}{{/characters}}
</context>

<task>
1. Extract the beats: every piece of plot information, decision, reveal and change in relationship the scene delivers, in order. These are fixed.
2. For each speaker, decide what they want from the other person in this scene, what they are hiding or avoiding, and how they talk (register, sentence length, vocabulary, habits). Use the character notes where given.
3. Revise the dialogue:
   - Replace on-the-nose statements with subtext: deflection, a question answered with a question, a change of subject, an action that contradicts the words.
   - Move exposition the characters already both know into conflict, implication or cut it; keep only what the reader needs, delivered when someone has a reason to say it.
   - Make the voices distinct enough to identify without tags.
   - Add friction: interruptions, status shifts, someone refusing to answer.
   - Trim greetings, small talk and recaps; enter late, leave early.
   - Prefer "said" or no tag; use action beats to show behaviour, not to decorate.
4. Check the revision against the beat list. Every beat must still land, in the same order, clearly enough for a reader to follow.
</task>

<constraints>
- Do not add new plot information, change outcomes, or change who knows what by the end of the scene.
- Keep point of view, tense, setting and narration style. Change narration only where it carries dialogue (tags and beats).
- Keep the length within about 20 percent of the original unless the original is padded; say so if you cut more.
- If a beat can only land through an explicit line, keep it explicit and note why.
- Match the genre's register; a comedy scene should stay funny and a children's book scene should stay age-appropriate.
</constraints>

<output_format>
## Beats kept
Numbered list of the beats the revision preserves.
## Revised scene
The full revised scene.
## What changed
Four to eight bullets: the original line or pattern, what you did, and why.
## Voice sheet
One line per character: want in this scene, what they hide, how they talk.
</output_format>
