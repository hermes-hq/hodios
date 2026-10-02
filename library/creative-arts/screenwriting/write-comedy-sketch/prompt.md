---
schema: 1
id: write-comedy-sketch
kind: prompt
title: Write a comedy sketch
description: Writes a comedy sketch with a clear game, a grounded base reality, escalating heightening beats, a button ending and staging notes. Use for sketch shows, improv troupes, videos and revues.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [text, topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sketch-comedy, game-of-the-scene, heightening, comedy-writing]
pairs_with:
  prompts: [write-comedy-bit, format-screenplay-scene]
args:
  - name: premise
    description: The idea or situation, e.g. "a job interview where the interviewer is clearly the candidate's mum", plus the audience and venue (live stage, online video, school revue) and any tone limits.
    type: text
    required: true
  - name: cast_size
    description: Number of performers available, including any who can double.
    type: number
    default: 3
  - name: runtime
    description: Target length, e.g. "2 minutes", "3 to 4 minutes". A page of sketch script runs roughly a minute.
    type: string
    default: 3 minutes
output_contract:
  format: markdown
  sections: [The game, Beat outline, Script, Staging notes, Alternate buttons]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A sketch works when it has a game: one unusual thing in an otherwise normal world, played straight, then heightened in a pattern the audience can predict and still be surprised by. The base reality must be clear in the first few lines, someone (usually a straight person) must react as a normal person would, and each beat must escalate the unusual thing rather than introduce new, unrelated jokes. Sketches die from a game that is never defined, a pile of random gags, a premise explained instead of played, heightening that stays flat, or an ending that trails off because nobody wrote a button.
</context>

<task>
Write a comedy sketch for {{cast_size}} performers, running about {{runtime}}.

<premise>
{{premise}}
</premise>

1. **The game:** state in one sentence the base reality and the first unusual thing, then the game as "If this is true, what else is true?" Name the straight person and the source of the comedy (status, character, logic, escalation, language). If the premise could support very different games, pick the strongest, say why, and give one alternative game in a line.
2. **Beat outline:** the initial reveal of the unusual thing (within the first 30 seconds), then three or more heightening beats, each topping the last in stakes, scale or absurdity while staying true to the game's logic; a possible "turn" or twist on the game; and the button.
3. **Script:** at the target length (about a page per minute). Use clear stage-play format: character names in capitals, dialogue, and brief stage directions in parentheses. Get into the scene fast with no warm-up chit-chat, let the straight person ground each beat, keep jokes inside the game, and give lines rhythm (short setups, the funny word at the end of the line).
4. **Staging notes:** set, props and costume (keep them cheap and quick for live shows), which performer plays what and any doubling, sound or lighting cues, and where a laugh is expected to need a pause.
5. **Alternate buttons:** three other endings (a callback, a reversal, a final topper) with a line on what each does.
</task>

<constraints>
- Stay within {{cast_size}} performers; doubling is fine if costume changes are possible in the time.
- Punch up, not down: do not build the game on mocking people for race, ethnicity, religion, disability, gender identity, sexuality or poverty. Satire of public figures and institutions is fine; avoid putting false statements of fact about real people in a form that could be mistaken for real.
- Keep content suitable for the audience and venue described; if none is given, aim for a general adult audience without explicit content.
- Write original material; do not reproduce sketches from existing shows.
</constraints>

<output_format>
## The game
## Beat outline
Numbered beats.
## Script
Title, cast list, then the script.
## Staging notes
## Alternate buttons
</output_format>
