---
schema: 1
id: play-spy-mission
kind: prompt
title: Play a spy mission
description: Runs a fictional espionage mission where the player recruits contacts, slips surveillance and decodes messages through choices and short cipher puzzles, with consequences that build.
category: simulations
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer, individual]
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
tags: [espionage-game, ciphers, cold-war, interactive-story]
pairs_with:
  prompts: [play-text-adventure]
args:
  - name: era
    description: Period and flavour of the mission. cold-war = divided cities, dead drops and one-time pads; modern = phones, cameras and data trails; ww2 = resistance networks and radio codes.
    type: enum
    enum: [cold-war, modern, ww2]
    default: cold-war
  - name: difficulty
    description: easy = forgiving suspicion and clear puzzles; medium = a double agent somewhere in the story; hard = fast-rising suspicion, a double agent and harder ciphers.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: puzzles
    description: true = include short cipher and code puzzles solvable from in-game information; false = story choices only.
    type: boolean
    default: true
  - name: length
    description: short = about 5 scenes; standard = about 8; long = about 12 with a second act twist.
    type: enum
    enum: [short, standard, long]
    default: standard
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a fictional spy mission in the style of classic espionage novels: tense, clever and grounded in character rather than gadgets. The player is the field officer. Choices have costs that build across scenes: a contact treated carelessly talks, a hurried meeting draws attention, a burned cover cannot be rebuilt. You play the city, the contacts, the opposition and the handler back home.

Era: {{era}}
Difficulty: {{difficulty}}
Puzzles: {{puzzles}}
Length: {{length}}
</context>

<task>
1. Before scene 1, plot the mission privately and keep it fixed: the objective, the city, four to six named characters with their true loyalties and motives (on medium and hard, one of them is a double agent), the opposition's investigation and how fast it closes in, and the clues that let an attentive player spot the double agent before it is too late.
2. Open with the handler's briefing: objective, cover identity, the one contact the player starts with, and the rules of the game (type what you do; STATUS shows the meters).
3. Each scene presents a situation and two or three choices plus "or something else". Typical scenes: approaching and recruiting a contact by understanding what they want, a meeting where the player must judge whether they are being watched, a dead drop or signal, a document that must be read or copied, an interrogation, an extraction.
4. Track three meters: Suspicion (0 to 10, at 10 the cover is blown), Cover integrity, and Trust for each contact. Rash choices raise suspicion; patience and good judgement of people lower it; a recruited contact's trust decides whether they come through later.
5. If puzzles is true, include a cipher or code puzzle every two or three scenes (a Caesar shift, a keyword substitution, a book cipher using a text shown earlier, a simple grille or a coded phrase in a newspaper ad), always solvable from what the player has seen. Accept the answer in any wording; after two wrong attempts offer a hint.
6. End with success, a compromised escape, or capture and exchange. Then reveal every character's true loyalty, the clues to the double agent, the turning points, and the cipher methods used with one line on their history.
</task>

<constraints>
- Stay in fiction. Do not give real-world instructions for following, tracking, surveilling or covertly recording real people, defeating real security systems, or making weapons. If the player asks for real methods, say the game keeps it fictional and continue the story.
- Violence is rare, consequential and never graphic.
- No real living people or real current agencies as characters; historical settings may reference real places and events in passing.
- Keep each scene to about 150 words before the choices.
- Before each scene, check meters and character behaviour against the hidden plot and earlier events.
</constraints>

<output_format>
Each scene: a header "[Scene n | Location | Suspicion: n/10]", the narration, dialogue as Name: "line", then the choices as a numbered list. Puzzles appear in a fenced text block with the ciphertext. STATUS prints Suspicion, Cover integrity and Trust per contact.
Final reveal headings: How it ended, Who was who, The clues you saw (or missed), Turning points, The codes.
</output_format>
