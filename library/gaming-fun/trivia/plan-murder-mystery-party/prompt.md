---
schema: 1
id: plan-murder-mystery-party
kind: prompt
title: Plan a murder mystery party
description: Plans a murder mystery party sized to the guest count, with a premise, character sheets, timed clue rounds, a fair solution that can be deduced, and a host's running guide for the night.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, gamer]
requires: [none]
inputs: [preferences]
output: [plan, script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [murder-mystery, dinner-party, party-game, whodunit, character-sheets, host-guide]
pairs_with:
  prompts: [host-trivia-night, create-escape-room-puzzles]
  personas: [quizmaster]
args:
  - name: guests
    description: Number of guests who will play a character, not counting the host if the host is not playing.
    type: number
    required: true
  - name: theme
    description: Setting or era, for example "1920s speakeasy", "country house weekend", "space station", "school reunion". Add the vibe (spooky, comic, glamorous), the guests' ages, and whether it is a dinner. Optional.
    type: string
    default: a 1920s country house weekend with a comic touch
output_contract:
  format: markdown
  sections: [The mystery, The truth, Characters, Clues, Running the night, The reveal, Prep checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design murder mystery parties that hosts can run from one document. A good party mystery is fair: a careful player can deduce the murderer from the clues, and the solution rests on a chain of three or four clues rather than a lucky guess. Every guest has a character with a secret, a motive or a reason to look guilty, and something to do in every round, so nobody is a spectator. The murderer is a guest and does not need to know the full solution in advance to play well, only that they did it and what to hide. Red herrings mislead without lying, and the host has everything they need to keep the night on track.

Guests: {{guests}}
Theme: {{theme}}
</context>

<task>
1. The mystery: a title, the premise and setting, the victim (a character who is not played by a guest, or played by the host if they want), how and where the body is found, and the opening speech the host reads to start the game.
2. The truth (host only): who did it, how, why and when; the timeline of the night of the murder; and the three or four key clues that, taken together, prove it. Check that the clues point to the murderer alone and that no clue contradicts another.
3. Characters: exactly {{guests}} characters, each with a name, a one-line costume suggestion, a public description to send with the invitation, and a private sheet: their secret, their relationship to the victim and to two other characters, what they know, what they must hide, and a goal for the evening. Give each innocent character a motive or a suspicious secret so suspicion spreads. Make characters gender-flexible where possible.
4. Clues: organise the game into three rounds (for example, arrival and introductions, the investigation, and accusations), and for each round list which clues are released, how (a note found, an item, an announcement, a character's instruction to reveal something), and which character carries or reveals them. Mark which are key clues and which are red herrings.
5. Running the night: a timeline from arrival to the reveal, fitting a dinner if there is one; the host's job in each round; what to do if guests are stuck (a nudge clue held in reserve) or if someone forgets their part; and how accusations work (each guest names a suspect, a motive and the method on a card).
6. The reveal: a short script for the host or the murderer to read, walking through the key clues in order so everyone sees how it could have been solved.
7. Prep checklist: what to print, props, a suggested invitation text, and what to send each guest before the party and what to keep sealed until the night.
</task>

<constraints>
- The solution must be deducible from clues released during the game. Before writing the output, check the chain of key clues; if a clue would be ambiguous, fix it.
- Size everything to {{guests}} guests: every guest gets a character and at least one clue to reveal or a role in a round. If the number is very small (under 4) or very large (over 16), adapt the format (for example teams, or several characters with smaller parts) and say how.
- Original characters and plot only; do not reuse a published mystery's solution.
- Keep the content suitable for the guests: no graphic violence; for children or mixed ages, make the "crime" a theft or a disappearance instead, and say so.
- Avoid stereotypes based on real-world identities; characters' flaws come from the story.
- Keep the private sheets short enough to read in a few minutes.
</constraints>

<output_format>
## The mystery
Including the opening speech in quotes.
## The truth
Host only: the solution, timeline and key clue chain.
## Characters
A table of public descriptions, then one private sheet per character.
## Clues
A table: Round | Clue | How it appears | Who reveals it | Key or red herring.
## Running the night
## The reveal
## Prep checklist
</output_format>
