---
schema: 1
id: play-place-value-game
kind: prompt
title: Play a place value game
description: Runs place value games for a child with an adult reading aloud, such as make the biggest number, swap the digit and guess my number, pitched at tens, hundreds, thousands or decimals.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [parent, teacher]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [conversation, summary]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [place-value, number-sense, maths-games, digit-cards, primary-maths]
pairs_with:
  prompts: [practice-mental-math]
  personas: [math-tutor]
args:
  - name: age
    description: The child's age or school year, for example "7", "Year 3", "Grade 4".
    type: string
    required: true
  - name: range
    description: The size of numbers. tens is two-digit, hundreds three-digit, thousands four- to six-digit, decimals tenths and hundredths.
    type: enum
    enum: [tens, hundreds, thousands, decimals]
    default: hundreds
  - name: game
    description: Which game to play. mixed starts with the easiest and switches when the child is ready.
    type: enum
    enum: [biggest-number, swap-the-digit, guess-my-number, place-value-bingo, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [How it went, What to practise]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An adult is playing with a child.
Child's age or year: {{age}}
Number range: {{range}} (tens = two-digit, hundreds = three-digit, thousands = four- to six-digit, decimals = tenths and hundredths)
Game: {{game}}
 Place value is the idea that a digit's value depends on its position: the 3 in 352 is worth 300. Children who can say the number may still not know this, which shows as writing "three hundred and five" as 3005, thinking 0.25 is bigger than 0.3, or not knowing what changes when a digit moves. Games work when the child physically places digits, says the value of each digit out loud ("the 4 is worth 40"), and explains choices. The adult needs short, read-aloud instructions and quick feedback.
</context>

<task>
1. List the materials in one line: paper digit cards 0 to 9 (or a die), a place value chart drawn as columns (for example Hundreds | Tens | Ones; for decimals Ones . Tenths | Hundredths). Ask whether they are ready.
2. Give the rules of the first game as instructions the adult can read aloud to the child in simple words, then start round 1. The games:
   - Biggest number: the adult draws digits one at a time; the child places each in a column before the next is drawn, aiming for the biggest (or smallest) number. Then say the number and the value of each digit.
   - Swap the digit: give a number, change one digit or swap two; the child says the new number and how much bigger or smaller it got ("it went up by 200").
   - Guess my number: think of a number in range and give clues ("my tens digit is 4, my hundreds digit is one more than my ones digit"); the child asks yes/no questions or guesses.
   - Place value bingo: each player writes 6 numbers on a grid; the adult calls clues like "a number with 7 tens"; cover a matching number.
3. After the adult types the child's answer, say if it is right in a phrase the adult can repeat, then one quick "why" question for the child ("How much is the 6 worth?"). If wrong, give a hint that points to the columns, not the answer.
4. Make it easier (fewer digits, use the chart) after two misses, harder (more digits, zero in the middle, smallest number with no leading zero) after three successes. Include zero as a placeholder and, for decimals, comparisons like 0.3 versus 0.25.
5. Play about 6 to 10 rounds (10 to 15 minutes), switch games if {{game}} is mixed, then give the summary.
</task>

<constraints>
- Keep each message short and readable aloud; put the line for the child in bold.
- Keep numbers within the chosen range; for younger children use whole numbers only unless decimals were chosen.
- Check every number and value you state; mistakes confuse both child and adult.
- Praise effort and explanations, not speed. No timers.
- If the child is clearly beyond or below the range, suggest the adult switch range.
</constraints>

<output_format>
Each turn: a short note to the adult, then the line to read out in bold.

At the end:
## How it went
Rounds played, what the child did confidently, which mistakes appeared.
## What to practise
Two quick everyday activities (for example house numbers, prices) and the range to try next time.
</output_format>
