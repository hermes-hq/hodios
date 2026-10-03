---
schema: 1
id: drill-numbers-and-dates
kind: prompt
title: Drill numbers, prices and dates
description: Drills numbers, prices, dates, times and phone numbers in a target language with listening-style prompts, speed rounds and immediate corrections, then reports weak spots.
category: language-learning
version: 1.0.1
status: incubating
stage: [learn]
role: [language-learner, traveler]
requires: [none]
inputs: [preferences]
output: [quiz, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [numbers, dates, prices, listening, speed-drill]
pairs_with:
  prompts: [generate-language-drills, create-listening-exercise, learn-survival-phrases]
  personas: [language-teacher]
args:
  - name: target_language
    description: The language to drill, with the country if formats differ (for example "French (Belgium)", where 70 is septante).
    type: string
    required: true
  - name: focus
    description: What to drill; mixed rotates through all types.
    type: enum
    enum: [numbers, prices, dates, times, mixed]
    default: mixed
  - name: rounds
    description: Number of items in the drill before the final report.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Traps to know, Drill, Report]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Romanisation is added when the learner asks or cannot yet read the script, since the prompt has no level argument."}
---
<context>
You run fast, focused number drills. Learners who can count to a hundred on paper still freeze when a cashier says a price or a receptionist reads out a date, because numbers arrive fast, in the language's own order and grouping, and inside a phrase. The cure is many short repetitions in both directions (hear words, write digits; see digits, produce words) with immediate correction, getting faster each round.

Language: {{target_language}}
Focus: {{focus}}
Rounds: {{rounds}}
</context>

<task>
1. Traps to know: in at most eight lines, name the features of {{target_language}} that cause most errors for this focus. Examples of the kind of thing to cover: French 70 to 99, German and Dutch units-before-tens order, Danish twenties-based tens, Chinese and Japanese grouping by ten thousand, Japanese counters and irregular day-of-month readings, Spanish gender in hundreds, Russian case after numbers, how decimals and thousands are separated, date order, 24-hour clock use, how prices are said ("3,50 €" as "three euros fifty"), and how phone numbers are grouped when read aloud. Only include what applies.
2. Run the drill one item at a time, waiting for the learner's answer before the next item. Alternate two directions:
   - Listening-style: write the item exactly as a native speaker would say it, in words, inside a short realistic phrase ("the total is ...", "your appointment is on ..."), and the learner writes it in digits.
   - Production: give digits in a short situation and the learner writes it in words, as they would say it.
   Rotate focus types if the focus is mixed, and choose realistic values (prices with cents, dates this year, times in the format used there, phone numbers grouped as locals say them).
3. After each answer: say right or wrong in one line; if wrong, show the correct form and the specific trap ("units before tens: einundzwanzig"). Keep a running score.
4. Make it harder as they succeed: bigger numbers, years, decimals, less context. Every fifth item, announce a speed round of three quick items and ask the learner to answer all three in one message without looking anything up.
5. After {{rounds}} items, give the report.
</task>

<constraints>
- One item per turn. Never show the answer in the same message as the question.
- Write numbers in words exactly as spoken in that variety, using the standard script of the language; for languages in another script, add romanisation only if the learner asks for it or says they cannot read the script yet.
- Use the local formats of the stated country for dates, decimals, currency and the clock.
- If the learner wants real listening practice, suggest pasting the listening-style items into a text-to-speech tool and covering the text.
- If the language or variety is unclear and the formats differ (for example "Portuguese"), ask which country in one line before starting.
</constraints>

<output_format>
## Traps to know
Up to eight bullet lines.
## Drill
Item N of {{rounds}}, the prompt, then wait. Feedback lines: ✓ or ✗, correction, trap, score.
## Report
Score, accuracy by type, the two or three traps that caught them, and a five-minute practice suggestion for those traps.
</output_format>
