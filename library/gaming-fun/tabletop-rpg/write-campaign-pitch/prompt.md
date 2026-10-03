---
schema: 1
id: write-campaign-pitch
kind: prompt
title: Write a campaign pitch
description: Writes a one-page tabletop campaign pitch for prospective players with the premise, tone, themes and content lines, expected commitment and the kinds of characters that fit.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [post, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [campaign-pitch, recruiting-players, game-mastering, lines-and-veils]
pairs_with:
  prompts: [run-session-zero, design-campaign-arc, build-rpg-character]
args:
  - name: premise
    description: The campaign idea in your own words, plus anything you already know such as tone, length, setting, content you will or won't include, and the player experience you want.
    type: text
    required: true
  - name: system
    description: The game system and edition, for example "dnd-5e", "Blades in the Dark", "Mothership" or "Monster of the Week".
    type: string
    default: dnd-5e
  - name: schedule
    description: Cadence, session length and where you play, for example "weekly, Thursdays 7-10pm, online on voice chat" or "every other Saturday afternoon at my place".
    type: string
    default: weekly
output_contract:
  format: markdown
  sections: [The hook, What play looks like, Tone and touchstones, Content and safety, Commitment, Characters who fit, Rules and setup, Interested?, Notes for the game master]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced game master who recruits players through forums, game-store boards and friend groups. A good pitch does two jobs: it makes the right players excited and it helps the wrong players opt out before session one. Mismatched expectations about tone, content, combat versus roleplay, and commitment are what end campaigns early, so the pitch says those things plainly. This is the pitch itself, read before anyone joins; the session zero comes after.

Premise: {{premise}}
System: {{system}}
Schedule: {{schedule}}
</context>

<task>
1. If the premise is too thin to pitch (for example a single word), ask for the setting, what the characters do, and the tone you want, then stop. If it is thin but workable, fill gaps with clearly marked [placeholders] rather than inventing major facts.
2. Give the campaign a title and a one-sentence logline.
3. Write the hook: a short paragraph in second person that drops a prospective player into the premise.
4. Describe what play looks like: the activities that fill a session and roughly how they balance (for example "about half investigation, a third social, fights are rare but deadly").
5. Set the tone with two or three touchstones from films, books, shows or games ("X meets Y"), and name the themes.
6. State the content plainly: what will be present on screen, what stays off screen, any hard lines you already know, and that the group will set lines and veils together at session zero.
7. State commitment: cadence and session length from {{schedule}}, expected campaign length, attendance expectations and what happens if someone misses a session.
8. Describe the characters who fit and who will struggle (for example "characters with a reason to stay in the city and work as a crew"), and the experience level needed.
9. List system notes: edition and sources allowed, house rules, how characters are made, tools needed.
10. End with how to express interest, then add GM-only notes listing the assumptions you made and the placeholders to fill.
11. Before answering, check the pitch fits on one page, does not invent mechanics of {{system}}, and contains no hidden twists of the campaign.
</task>

<constraints>
- No spoilers of the campaign's secrets; pitch the situation, not the twists.
- If the premise implies teenagers or children, keep content age-appropriate and add a line for parents.
- Be specific about content; vague phrases like "mature themes" do not help players decide.
- Do not invent rules of the system; if unsure, say "per the core rules".
</constraints>

<output_format>
# Title
Logline in italics.
## The hook
## What play looks like
## Tone and touchstones
## Content and safety
## Commitment
## Characters who fit
## Rules and setup
## Interested?
---
## Notes for the game master
Assumptions and [placeholders] to fill before posting.
</output_format>
