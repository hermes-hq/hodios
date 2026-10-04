---
schema: 1
id: practise-spelling-out-personal-details
kind: prompt
title: Practise spelling out personal details
description: Drills spelling out and catching names, email addresses, postcodes, house numbers and dates of birth in a target language, with the local spelling alphabet, symbols and speed rounds.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [preferences, text]
output: [quiz, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [spelling-alphabet, email-addresses, phone-calls, counter-service, newcomers, listening-drill]
pairs_with:
  prompts: [drill-numbers-and-dates, practice-phone-call-in-language, learn-survival-phrases, decode-voicemail-messages, learn-form-filling-vocabulary]
args:
  - name: target_language
    description: The language and the country you use it in, since spelling words and formats differ (for example "German (Austria)", "French (Canada)", "English (UK)").
    type: string
    required: true
  - name: details_to_practise
    description: The kinds of details you need to give, for example "my surname with an umlaut, a Gmail address with a dot and an underscore, a UK postcode". Use made-up or partly changed details rather than your real ones. Optional; empty means a mix of all types.
    type: text
  - name: level
    description: Your CEFR level, which sets how fast and clipped the clerk's speech is.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A1
output_contract:
  format: markdown
  sections: [Spelling kit, Drill, Report]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach newcomers through the moment every counter and phone call starts with: "Can you spell that?" Learners who speak well still fail here, for three reasons. They say letter names the way their first language does (English "e" sounds like German "i", French "g" and "j" swap with English ones). They do not know the local way to make a letter unmistakable, whether an official spelling table (such as the German one in DIN 5009), common first names ("B comme Bernard") or an international alphabet. And email addresses, postcodes and house numbers have spoken conventions nobody teaches: how "@", ".", "-" and "_" are said, "all lower case, all one word", "double s", accents and umlauts, letters inside postcodes, "12a" or "12 bis". The fix is drilling both directions, saying your own details and catching the clerk's read-back, at increasing speed.

Language and country: {{target_language}}
Level: {{level}}
{{#details_to_practise}}
<details_to_practise>
{{details_to_practise}}
</details_to_practise>
{{/details_to_practise}}
</context>

<task>
1. Spelling kit, compact: the letter names that trap learners in {{target_language}}, the spelling words locals actually use (say whether they come from an official table or are informal custom, and that any clear word works), how to say "@", dot, hyphen, underscore, slash, capital and lower case, double letters, accents or special letters, how postcodes, house numbers with letters and flat numbers are read aloud, and the local order and wording for a date of birth. Add the five clarifying phrases a learner needs: "Could you spell that?", "Could you read it back, please?", "No, not B, P as in ...", "Shall I spell it?", "Was that with one or two ...?"
2. Run the drill one item at a time and wait for the answer each time. Rotate three round types:
   - Say it: give a detail (from the learner's list, or invented and realistic for the country) and the learner writes how they would spell it aloud, word for word.
   - Catch it: write a clerk's spoken spelling in words exactly as it would sound ("Müller, M wie Martha, U-Umlaut, Doppel-L, E, R"), and the learner writes the result.
   - Fix it: the clerk reads back a detail with one mistake (a swapped letter, a missing dot, the wrong date order) and the learner must notice and correct it politely using a spelling word.
3. After each answer: one line right or wrong; if wrong, the correct version and the exact trap (letter name, symbol word, date order). Keep a running score.
4. Speed-ups: after every four items, announce a speed round where the clerk runs letters together in groups of three or four, drops the spelling words, or interrupts with "sorry, was that ...?" If the level is B1 or above, use clipped counter speech and occasional mishearings from the start.
5. Stop after about 12 items or when the learner says stop, and give the report.
</task>

<constraints>
- One item per message; never show the answer in the same message as the item.
- Use only conventions you are confident are current for that country. Where usage varies (for example whether people use an official table or improvise), say so instead of presenting one version as the rule.
- Spell every spoken item in the standard script of the language; add a simple pronunciation hint only for letter names that are known traps.
- If the learner pastes real personal details, say once that practising with slightly changed versions is safer, then drill with versions you alter yourself (same letters and symbols that are hard, a few characters changed), and never repeat back full real addresses or dates of birth.
- If {{target_language}} names a language spoken in several countries with different conventions and no country is given, ask which country in one line before starting.
- Suggest pasting "Catch it" items into a text-to-speech tool and covering the screen for real listening practice.
</constraints>

<output_format>
Your first reply holds Spelling kit and the first item only; each later reply holds the feedback and the next item; the Report comes once, at the end.
## Spelling kit
Short tables: letter or symbol | how it is said | trap or tip. Then the five clarifying phrases with a translation.
## Drill
"Item N (Say it / Catch it / Fix it)", the prompt, then wait. Feedback: ✓ or ✗, correction, trap, score.
## Report
Score by round type, the letters or symbols that caught them, and a two-minute daily routine (spell your own name, email and postcode aloud with spelling words).
</output_format>
