---
schema: 1
id: write-session-recap
kind: prompt
title: Write a session recap
description: Turns a game master's rough notes into an in-world recap of the last tabletop session to read aloud or share, with a clean out-of-character summary and hooks for the next session.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer, writer]
requires: [none]
inputs: [notes, transcript]
output: [summary, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [session-recap, game-mastering, campaign-journal, read-aloud, story-hooks]
pairs_with:
  prompts: [create-npc, design-one-shot-adventure]
  personas: [dungeon-master]
args:
  - name: session_notes
    description: Your notes from the last session in any form (bullets, shorthand, a transcript), plus the campaign name, the player characters' names and anything the players must not learn yet.
    type: text
    required: true
  - name: tone
    description: The voice of the recap, for example "a bard's tale", "a newspaper report", "a grim chronicle", "a sarcastic narrator", "a detective's case notes".
    type: string
    default: an epic bard's tale with a touch of humour
output_contract:
  format: markdown
  sections: [Previously on, The quick version, Loose threads, Hooks for next session, Check before sharing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help game masters start each session strong. A recap read at the table reminds players what happened, makes their characters' choices feel important, and builds anticipation; a clean summary helps the player who missed the session. The best recaps are told in a voice that fits the campaign, spotlight every player character at least once, remember the funny moments players still talk about, and end on the open question that drives the next session. They never reveal what the characters do not know.

Session notes: {{session_notes}}
Tone: {{tone}}
</context>

<task>
1. Read the notes and identify the key events in order, the decisions the players made, the memorable moments (a critical hit, a terrible plan that worked, a joke), what was gained or lost, and where the session ended.
2. Write the in-world recap in the requested tone, to be read aloud in about one to two minutes (around 150 to 300 words). Give every player character at least one moment, focus on the players' choices rather than the game master's plot, and end on the cliffhanger or the decision ahead.
3. Write the quick version: five to eight plain, out-of-character bullets for players who missed the session or need a reminder, including loot, injuries, promises made and named NPCs met.
4. List loose threads: unanswered questions, unfulfilled promises, NPCs who will remember the party, and consequences the party set in motion.
5. Suggest hooks for next session: two or three ways to open it that follow from the loose threads, each with a short line the game master could use.
6. Check before sharing: list anything in the notes marked secret, or that only the game master knows (hidden motives, what is behind the door, a traitor), and confirm it was kept out of the recap and the quick version. List any names or facts that were unclear in the notes so the game master can confirm them.
</task>

<constraints>
- Use only what is in the notes. Do not invent events, outcomes, loot or dialogue. Small connecting descriptions are fine; anything that changes what happened is not.
- Never reveal secrets or information the characters have not learned, even as foreshadowing, unless the notes say to tease it.
- Keep names exactly as in the notes; if a name is spelled several ways, pick one and list it under Check before sharing.
- Match the content level of the campaign; keep gore and mature themes at the level the notes suggest.
- If the notes are too sparse to recap, write what you can and ask three questions that would fill the gaps.
</constraints>

<output_format>
## Previously on
The read-aloud recap, then (word count, about N minutes).
## The quick version
## Loose threads
## Hooks for next session
## Check before sharing
</output_format>
