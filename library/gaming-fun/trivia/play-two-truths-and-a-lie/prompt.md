---
schema: 1
id: play-two-truths-and-a-lie
kind: prompt
title: Play two truths and a lie
description: Gives three surprising statements on a chosen topic, one of them false, asks the player to spot the lie, then explains all three, including why the lie sounded believable.
category: trivia
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student, teacher]
requires: [none]
inputs: [topic, preferences]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [two-truths-and-a-lie, fact-or-fiction, misconceptions, spot-the-lie, general-knowledge]
pairs_with:
  prompts: [play-guess-the-year, host-trivia-night]
args:
  - name: topic
    description: The subject of the statements, for example "animals", "the human body", "space" or "the Roman Empire".
    type: string
    default: animals
  - name: rounds
    description: Number of rounds.
    type: number
    default: 8
  - name: difficulty
    description: easy = the lie is fairly clear to a careful thinker; medium = all three sound plausible; hard = the truths are startling and the lie is a well-known misconception or a near-miss of a real fact.
    type: enum
    enum: [easy, medium, hard]
    default: medium
  - name: age_group
    description: Sets vocabulary and which facts are suitable. kids = simple words and nothing gruesome; teens; adults.
    type: enum
    enum: [kids, teens, adults]
    default: adults
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run two truths and a lie as a trivia game. Each round has three statements on the topic: two true facts that sound unlikely and one false statement that sounds right. The game is a quiet lesson in checking claims, so the truths must be solid and well documented, and the explanation of the lie matters as much as the reveal.

Topic: {{topic}}
Rounds: {{rounds}}
Difficulty: {{difficulty}}
Age group: {{age_group}}
</context>

<task>
1. If the topic is too narrow for {{rounds}} rounds of solid facts, say so and suggest a broader angle.
2. For each round, before writing, decide which position (A, B or C) holds the lie, varying it across the game so there is no pattern.
3. Write the two truths: well-established facts found in standard references, surprising to most people, stated precisely (with "about" or "up to" where the exact figure varies). Do not use facts that are themselves popular myths, contested findings, or claims that rest on a single study.
4. Write the lie: plausible, the same length and tone as the truths, built on a common misconception or a small, wrong change to a real fact. It must be clearly false, not merely unproven.
5. Check all three: each truth is something you are confident a reference work would confirm; the lie is definitely false; no statement gives the answer away by being vaguer, longer or oddly worded.
6. Show the three statements labelled A, B and C and ask which is the lie.
7. After the player answers, say if they were right, then explain all three in one or two sentences each: why each truth is true, what is actually true instead of the lie, and why the lie sounded believable. Update the score.
8. After {{rounds}} rounds, give the score, the lie that fooled them best, and offer a new topic or a turn where the player writes three statements for you to judge.
9. If the player writes statements for you, reason out loud briefly and commit to one answer; if one of their "truths" is actually false, say so kindly.
</task>

<constraints>
- No invented studies, statistics or quotations, in the truths or the explanations.
- If you are unsure whether a fact is true, do not use it as a truth.
- For kids, avoid gruesome, frightening or adult facts.
- Keep each round to the three statements; save explanations for after the guess.
</constraints>

<output_format>
Each round: `Round n of {{rounds}}` then lines `A. ...`, `B. ...`, `C. ...` and `Which is the lie?`.
After the guess: a verdict line, then `A:`, `B:`, `C:` explanations, the lie marked `(the lie)`, then `[Score: s/n]`.
</output_format>
