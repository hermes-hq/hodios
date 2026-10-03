---
schema: 1
id: write-character-roleplay-prompt
kind: prompt
title: Write a roleplay character prompt
description: Writes a roleplay character prompt with personality, voice samples, knowledge limits, boundaries and consistency rules. For interactive fiction, language practice, training and games.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, game-developer, teacher, individual]
requires: [none]
inputs: [text]
output: [prompt, conversation, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [character-design, roleplay, voice-consistency, interactive-fiction]
pairs_with:
  prompts: [write-system-prompt, red-team-prompt]
  personas: [prompt-engineer]
args:
  - name: character
    description: Who the character is - name, role, personality, background, the setting they live in, and how they should sound.
    type: text
    required: true
  - name: use
    description: "Optional: what the roleplay is for and who plays with it, for example \"Spanish practice for adult beginners\", \"a difficult customer for support-agent training\", \"a tavern keeper in a fantasy game\"."
    type: text
output_contract:
  format: markdown
  sections: [Character sheet, Character prompt, Sample exchanges, Consistency tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Character prompts fail in familiar ways: the character slides back into a generic helpful-assistant voice after a few turns, knows things it should not (a medieval innkeeper explaining smartphones), contradicts facts it stated earlier, or follows the user anywhere because nothing tells it where the edges are. A strong character prompt gives a specific voice with samples, a clear boundary on what the character knows, a short ledger of fixed facts, rules for staying in character, and the few situations where it steps out of character.

<character>
{{character}}
</character>
{{#use}}
<use>
{{use}}
</use>
{{/use}}
</context>

<task>
1. If the character or purpose is too thin to write a consistent voice, ask up to three questions and stop. Otherwise fill gaps with choices that fit and list them as assumptions.
2. Write a character sheet: core traits (three to five, each with how it shows in speech or behaviour), motivation, voice (sentence length, vocabulary, verbal habits, what they never say), fixed facts (name, age, place, relationships, history the character will not contradict), and knowledge limits (what they know, what they do not, and how they react to things outside their world).
3. Write the character prompt in second person ("You are…"): the scene and the user's role, the character sheet in compact form, how to respond (length per turn, stay in voice, react to the user rather than narrate for them, keep track of what has happened), and fit to the purpose (for language practice: level-appropriate language and gentle corrections; for training: realistic difficulty that responds to good technique; for games: hooks and secrets revealed only on conditions).
4. Write the out-of-character rules: step out briefly, in plain voice, when the user sincerely asks whether they are talking to an AI, shows distress or a safety concern, asks for real-world help the character cannot give, or pushes toward content outside the boundaries; then offer to continue.
5. Write two short sample exchanges that show the voice, one ordinary and one at a knowledge limit.
6. Write consistency tests: prompts that try to break voice, ask about out-of-world knowledge, contradict a fixed fact, and push past a boundary.
</task>

<constraints>
- Do not write a character that impersonates a real private person, or a real public figure presented as their actual views; fictionalised public figures must be labelled as fiction in the prompt.
- The character never claims to be human when a user sincerely asks.
- No sexual content involving minors under any framing, and no character designed to encourage self-harm, violence or dependency. If the request needs this, decline that part and write the rest.
- For training simulations, keep difficulty realistic and never abusive toward the trainee.
- Model-agnostic plain prose; keep the character prompt under about 600 words.
</constraints>

<output_format>
## Character sheet
Assumptions first, then the sheet as compact bullets.
## Character prompt
One fenced block, ready to paste.
## Sample exchanges
Two short dialogues.
## Consistency tests
Table: Test message | What it probes | What a good reply does.
</output_format>
