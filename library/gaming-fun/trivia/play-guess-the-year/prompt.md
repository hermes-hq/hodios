---
schema: 1
id: play-guess-the-year
kind: prompt
title: Play guess the year
description: Describes events, prices, inventions and pop-culture moments from one hidden year, lets the player close in on it with earlier or later feedback, and recaps that year.
category: trivia
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
subject: [history]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [timeline, dates, guessing-game, nostalgia, general-knowledge]
pairs_with:
  prompts: [play-guess-the-country, play-two-truths-and-a-lie]
args:
  - name: era
    description: Range of years to draw from, for example "1900-today", "1960-1999" or "the 1800s".
    type: string
    default: 1900-today
  - name: rounds
    description: Number of mystery years in the game.
    type: number
    default: 8
  - name: theme
    description: The kind of clues. general = world events and everyday life; mixed = a blend of all themes.
    type: enum
    enum: [general, science, music, sport, mixed]
    default: mixed
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a guess-the-year game. Each round you describe a handful of things that all happened in one hidden year, and the player narrows it down. The fun is in the mix of clues, some pinning the decade and one or two pinning the exact year, and the trust that every clue really does belong to that year.

Era: {{era}}
Rounds: {{rounds}}
Theme: {{theme}}
</context>

<task>
1. If the era is too short for {{rounds}} different years, or is not a range you can read, say so and propose a fix.
2. Pick {{rounds}} different years spread across {{era}}. For each, write four clues in the {{theme}} theme: a world or national event, a launch or invention, a culture moment (a hit, a film, a book, a sporting result), and an everyday detail such as a typical price, always naming the country and marking it as approximate.
3. Check every clue against the year: use only things whose date is well established, skip anything commonly misdated or whose year depends on the country or on how you count (premiere versus release, announced versus launched), and never include the year or a phrase that gives it away (an anniversary, a numbered event).
4. Explain the rules in three lines: up to three guesses per year; after a wrong guess you say earlier or later and add one more clue; the round scores on the final guess: exact 10, within 1 year 8, within 2 6, within 5 4, within 10 2, then minus 2 for each extra guess used, never below 0. "Lock" ends the round on the current guess.
5. Show the four clues for round one as a short list and ask for a guess.
6. After each guess, say "Earlier" or "Later" and how far in a band (within 2, within 5, within 10, more than 10), and add one fresh clue that narrows things. After the third guess or a lock, reveal the year.
7. With each reveal, give a three-line recap of that year: one headline event, one thing in daily life, one thing that would surprise a modern reader. Mark approximate figures with "about".
8. After {{rounds}} rounds, show the total out of {{rounds}} x 10 and the player's closest call, and offer another era or theme.
</task>

<constraints>
- All clues in a round belong to the same year; drop any clue you are not sure of instead of hedging it.
- Prices always carry a country and the word "about"; no precise economic statistics.
- Keep events described neutrally; avoid graphic detail of wars or disasters.
- Never reveal the year before the round ends.
</constraints>

<output_format>
Round: `Year n of {{rounds}}` followed by four bulleted clues.
Each verdict: `Earlier` or `Later`, the distance band, the new clue, then `[Guess k of 3]`.
Reveal: the year, its points, the three-line recap, `[Score: s]`.
</output_format>
