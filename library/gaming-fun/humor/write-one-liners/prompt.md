---
schema: 1
id: write-one-liners
kind: prompt
title: Write stand-up one-liners
description: Writes compressed one-liners on a topic using misdirection, double meanings and reversals, trims every word that is not load-bearing, and ranks them for a set or a social post.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [writer, individual, content-creator]
requires: [none]
inputs: [topic, text]
output: [ideas, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [one-liners, stand-up, misdirection, joke-writing, open-mic]
pairs_with:
  prompts: [write-comedy-bit, write-puns]
args:
  - name: topic
    description: What the jokes are about, and any angle or attitude you already have, for example "my dating life at 40" or "self-checkout machines, I hate them".
    type: text
    required: true
  - name: comic_voice
    description: Your stage persona or the voice for the jokes, for example "deadpan, low-energy", "anxious overthinker", "cheerfully dark". Optional.
    type: string
  - name: count
    description: How many finished one-liners to deliver.
    type: number
    default: 12
  - name: use
    description: Where they will be used, for example "open mic set", "social posts", "speech filler". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Angles mined, One-liners, Strongest picks, Cut and why]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write one-liners in the tradition of compressed stand-up: a setup that leads the listener to one picture and a punch that swaps it for another. The craft is in the misdirection and the economy. The surprise word goes last; any word after the reveal kills the laugh. A one-liner fails when the punch is guessable, when it needs a second sentence to explain, or when it is just an observation with no turn. Comics test lines by saying them aloud: if it does not scan in one breath, it is a bit, not a one-liner.

Topic: {{topic}}
{{#comic_voice}}Voice: {{comic_voice}}{{/comic_voice}}
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
1. Mine the topic: list 6 to 10 assumptions, associations and double meanings the audience brings to it (the obvious picture you can then swap), plus any words with two readings.
2. Draft at least twice {{count}} candidate lines using a mix of techniques: misdirection (reinterpreting the setup), double meaning, reversal, literalism, understatement, and the unexpected list item. Label each with its technique.
3. Tighten each: cut every word that does not set up or deliver the turn, move the reveal word to the very end, and keep each under about 25 words.
4. Test each line against three questions: can the listener guess the punch from the setup; does it need explaining; would it work spoken. Drop the ones that fail.
5. Deliver {{count}} finished lines, then pick the three strongest for the stated use with a one-line reason, and list the cut lines with the reason each died.
</task>

<constraints>
- Write original lines. Do not reuse or lightly rework famous one-liners; if a line resembles a well-known joke, cut it and say so.
- Punch at situations, institutions and the speaker, not at groups of people for who they are.
- Keep the voice consistent with {{comic_voice}} when given.
- No explanations inside the joke text; notes go after the list.
- If the topic is too narrow to sustain {{count}} good lines, deliver fewer and say so rather than padding with weak ones.
</constraints>

<output_format>
## Angles mined
Bullets: assumption or double meaning.
## One-liners
Numbered lines, each followed by the technique in brackets.
## Strongest picks
Three lines with a reason each.
## Cut and why
Short list.
</output_format>
