---
schema: 1
id: tell-player-not-selected
kind: prompt
title: Tell a player they were not selected
description: Writes what a coach says to tell a player, and a youth player's parents, that they were not selected, with honest specific feedback, a path forward and calm answers to pushback.
category: sports
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [team-selection, tryout, difficult-conversation, player-feedback, parent-communication, club-coach]
pairs_with:
  prompts: [run-tryout-evaluations, respond-to-playing-time-complaint]
args:
  - name: situation
    description: The selection decision - what team or squad, what the player was trying out for, and whether it is a cut from the squad, a move to a lower team or being left out of a match-day squad.
    type: text
    required: true
  - name: player
    description: Age, how long they have been with the club, and your honest notes from tryouts or recent matches - strengths and the main gaps. Use a first name or initials only.
    type: text
    required: true
  - name: channel
    description: How you will deliver it - in person, phone call, email or message. Optional; defaults to a short conversation plus a written follow-up.
    type: string
  - name: options
    description: What is available to the player next, such as another team, a development squad, training sessions or trying again mid-season. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you deliver it, The message, If they push back, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches deliver selection news well. Players remember how they were told long after they forget the decision. What works: telling them personally and promptly, before a list goes public; stating the decision clearly in the first sentence or two rather than burying it; giving one or two specific, honest reasons tied to the selection criteria; naming real strengths; offering a concrete path forward; and not reopening the decision. What goes wrong: vague reasons ("it was close"), comparisons with named teammates, promises the coach cannot keep, and long justifications that invite argument. With children, the conversation is with the child in an age-appropriate way, and parents get the same message.

Decision:
{{situation}}

Player:
{{player}}
{{#channel}}

Delivery: {{channel}}
{{/channel}}
{{#options}}

Options available: {{options}}
{{/options}}
</context>

<task>
1. Before you deliver it: when and where (privately, before the list is published), who should be present for a minor, and what to have ready.
2. Write the message in the chosen channel: the decision stated plainly early on, one or two specific reasons tied to the criteria, one or two genuine strengths, the next step and how to take it, and a warm close. Keep spoken versions under about two minutes.
3. If the player is a child, write a short note for parents that matches what the child was told.
4. If they push back: three or four likely reactions (tears, anger, "but I'm better than X", a parent demanding a meeting) with calm, short responses that acknowledge feelings without reopening the decision.
5. Follow-up: what to send afterwards, and when to check in with a player moving to another team or squad.
</task>

<constraints>
- Never compare the player with a named teammate or share other players' scores.
- Do not soften the decision into something it is not, and do not promise a place later unless the user says one exists.
- Keep feedback specific and about skills or behaviour the player can work on, never about body, family or personality.
- If the notes contain no real reason for the decision, say so and ask the coach to clarify before writing a vague message.
- Follow the club's process for selection appeals if the user mentions one.
</constraints>

<output_format>
## Before you deliver it
## The message
Ready to say or send. Then a parent note if the player is a minor.
## If they push back
Table: Reaction | What to say.
## Follow-up
</output_format>
