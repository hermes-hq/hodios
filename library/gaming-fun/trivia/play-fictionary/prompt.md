---
schema: 1
id: play-fictionary
kind: prompt
title: Play the dictionary bluffing game
description: Plays the dictionary bluffing game - a real but obscure word, the player invents a convincing fake definition, the assistant mixes it with the real one and decoys, then scores the bluff and the guess.
category: trivia
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student, language-learner]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [dictionary-game, bluffing, obscure-words, word-learning, word-play, fake-definitions]
pairs_with:
  prompts: [play-two-truths-and-a-lie, play-taboo-word-game]
args:
  - name: rounds
    description: Number of words to play.
    type: number
    default: 6
  - name: language
    description: The language of the words and definitions.
    type: string
    default: English
  - name: mode
    description: solo = you guess among definitions; bluff = you also write a fake definition to fool an imagined panel; group = you run it for players in the room.
    type: enum
    enum: [solo, bluff, group]
    default: bluff
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the dictionary bluffing game. A real but obscure word is announced; players write fake definitions that sound like a dictionary entry; all definitions, real and fake, are read out together and players vote for the one they think is real. A good round hinges on two things: the word must really exist with a definition you are sure of, and the decoy definitions must sound as dry and specific as a real dictionary ("a small iron hook used by thatchers", not "a funny thing").

Rounds: {{rounds}}
Language: {{language}}
Mode: {{mode}}
</context>

<task>
1. Explain the rules in three lines for {{mode}}. Solo: you show four definitions, one real, the player picks. Bluff: the player first writes a fake definition, then you show it among the real one and two of your decoys, and an imagined panel of three voters votes too. Group: you give the word and the real definition privately to the host to read, and help players write and read definitions.
2. Choose {{rounds}} real {{language}} words that are genuinely obscure but well attested in standard dictionaries, with an established meaning. Avoid words with offensive or sexual meanings.
3. Each round: give the word and its part of speech only. In bluff mode, wait for the player's fake definition.
4. Write decoys in true dictionary style: same part of speech, plausible register, specific detail. Shuffle positions so the real one is not always in the same place.
5. Ask the player to vote. Reveal the real definition with a one-line note on the word's origin if you know it confidently.
6. Score in bluff mode: 2 points for picking the real definition, 1 point for each imagined panel vote the player's fake attracted (decide panel votes fairly from how convincing it is and explain in a phrase). Solo: 1 point per correct pick.
7. After {{rounds}} rounds, show the score, the best bluff, and the words learned with their real meanings.
</task>

<constraints>
- Use only real words with meanings you are confident of; never pass off an invented word as real.
- Do not reveal which definition is real before the vote.
- Keep the imagined panel clearly a game device, and be generous but honest about bluffs.
- If {{language}} is one where you are less sure of obscure vocabulary, say so and choose less obscure words.
</constraints>

<output_format>
Each round: `Word n of {{rounds}}: <word> (<part of speech>)`, then the lettered definitions and `Which is real?`
Reveal: the real definition, the origin note, panel votes in bluff mode, `[Score: s]`.
</output_format>
