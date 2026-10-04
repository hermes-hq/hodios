---
schema: 1
id: set-up-tandem-language-exchange
kind: prompt
title: Set up a tandem language exchange
description: Sets up a tandem exchange for one pair or a group programme, with matching, a 50/50 time split, task cards by level, kind peer correction, a reflection log and a plan for pairs that fizzle out.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [language-learner, teacher]
requires: [none]
inputs: [preferences, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tandem, language-exchange, peer-correction, learner-autonomy, reflection-log, matching]
pairs_with:
  prompts: [plan-conversation-club-session, practise-conversation-strategies]
  personas: [language-exchange-partner, language-learning-strategist]
args:
  - name: languages
    description: The two languages being exchanged (for example "Portuguese and German"), and anything about the people involved - ages, goals, how they will meet (in person, video call).
    type: string
    required: true
  - name: setup
    description: One pair arranging their own exchange, or an organiser running a programme for many pairs.
    type: enum
    enum: [one-pair, group-programme]
    default: one-pair
  - name: level
    description: The typical CEFR level of the learners in their target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [How the exchange works, Matching, First session, Session task cards, Correcting each other, Reflection log, When it fizzles]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help set up a tandem language exchange: two people who each speak the other's target language meet regularly and teach each other. Setup: {{setup}}. Typical level: {{level}}.

Languages and people: {{languages}}

Tandem works on two principles: reciprocity (each person gets equal time and effort) and autonomy (each learner decides what they want to learn and takes responsibility for it; the partner is a helper, not a teacher). Exchanges usually fail because one language takes over (often the one the stronger speaker knows better), sessions turn into aimless chat, partners either never correct or correct everything, nobody plans, and after three or four weeks it fades without anyone saying so.
</context>

<task>
1. How the exchange works: frequency and length (for example weekly, 60 minutes: 30 minutes in each language, with a timer), switching rules (never mix languages within a half; the helper speaks only the language being practised), and a simple agreement both people sign up to (time split, punctuality, how to cancel, what to do if it is not working).
2. Matching: for a pair, what to check before committing (goals, schedule, level gap, interests, expectations about friendship or not); for a group programme, a short sign-up form (languages, level, goals, availability, interests, preferences for meeting place), matching rules in priority order, and safety basics (first meetings in public or on a moderated platform, reporting route, no pressure to share contact details).
3. First session: a 60-minute script for getting to know each other in both languages, agreeing goals for each person, and filling in the agreement.
4. Session task cards: 8 cards pitched at {{level}}, each with a goal, a task (describe photos from your week, explain a recipe, discuss a short article or video, role-play a situation one partner needs, compare customs), useful phrases for the learner, and a tip for the helper (how to grade their speech, what to listen for).
5. Correcting each other: agree what kind of correction each person wants; default rules: let the speaker finish, note errors and go through 3-5 at the end of their half; recast in the moment only for errors that block meaning; write corrections down in a shared document; explain in simple words, and say "I'm not sure, that's just how we say it" rather than inventing a grammar rule.
6. Reflection log: a short template filled in after each session (what I practised, new words and chunks, one correction to remember, what I want next time).
7. When it fizzles: warning signs (cancellations, one language dominating, no plan), a conversation script to reset, and how to end kindly. For a group programme, add organiser actions: check-ins at week 2 and week 6, a re-matching option, a mid-programme social event and a short end survey.
</task>

<constraints>
- Keep the 50/50 split central; if levels are very unequal, suggest adjustments (more structured tasks for the weaker side) rather than abandoning equality.
- Do not promise outcomes or claim tandem replaces a course for learners who need a qualification.
- For under-18s or school programmes, note that the organisation's safeguarding rules apply and adults should supervise matching and contact.
- If the two languages are not clear, ask for them before writing task cards.
</constraints>

<output_format>
## How the exchange works
Including the agreement as a short checklist.
## Matching
## First session
Timed script.
## Session task cards
Eight cards, each under a ### heading.
## Correcting each other
## Reflection log
Template.
## When it fizzles
</output_format>
