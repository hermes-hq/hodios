---
schema: 1
id: learn-words-for-feelings-and-mood
kind: prompt
title: Learn words for feelings and mood
description: Builds the vocabulary to describe emotions, mood, sleep and stress precisely in a target language, with intensity scales, idioms and sentence starters for a doctor, counsellor, friend or workplace.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [preferences]
output: [table, explanation, quiz]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [emotions, mood, emotional-vocabulary, intensity-scales, idioms, help-seeking]
pairs_with:
  prompts: [learn-health-vocabulary-for-appointments, learn-idioms-in-context, explain-politeness-register]
args:
  - name: target_language
    description: The language, with the country if you know it (for example "Swedish", "Spanish (Mexico)").
    type: string
    required: true
  - name: level
    description: Your CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: setting
    description: Who you most need to talk to about how you feel.
    type: enum
    enum: [doctor, counsellor, friends-and-family, work]
    default: doctor
  - name: native_language
    description: The language for translations.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Feeling words, How strong, Body, sleep and energy, Sentence starters, Idioms and everyday ways to say it, If you need help now, Quick practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach the language of feelings in {{target_language}} to someone whose first language is {{native_language}}, at level {{level}}.

Who they need to talk to (setting): {{setting}}

Second-language speakers often say "I'm fine", "I'm stressed" or "bad" because they lack precise words, and are then misunderstood by doctors, counsellors, friends or managers. The useful vocabulary is not a long list of emotions but: a set of feeling words grouped by family with near-synonyms of different strength, ways to say how strong and how long, the body and sleep words people use for mood, sentence starters for the setting, and the everyday idioms people actually use. Cultures also differ in how directly feelings are named and what is said to whom; good teaching names that. This is a language lesson, not therapy.
</context>

<task>
1. Feeling words: 25 to 40 words (fewer at A1) in families such as sad, worried or anxious, angry or irritated, overwhelmed, lonely, ashamed or guilty, numb or flat, calm, hopeful, happy. Mark near-synonyms by strength (mild, medium, strong).
2. How strong: phrases for intensity, frequency and duration ("a bit", "very", "all the time", "most days for two weeks", "it comes and goes"), and how to give a number on a 0 to 10 scale.
3. Body, sleep and energy: 12 to 18 words and phrases for sleep, appetite, energy, concentration, tension, panic sensations and tearfulness.
4. Sentence starters: 10 to 15 starters suited to the setting above and its register (for example with a doctor, "Since ... I have been feeling ..."; with a manager, how to say you are under strain without oversharing), plus two or three phrases to ask the other person to slow down or explain.
5. Idioms and everyday ways to say it: six to ten common expressions, with meaning and register, and one note on how directly feelings are usually discussed in that culture and setting.
6. If you need help now: phrases in {{target_language}} for "I need help now", "I am not safe", "I am having thoughts of hurting myself", "Please call someone for me", and asking for an interpreter. Say in {{native_language}} that in an emergency they should contact local emergency services or a crisis line in their country, and that many services offer interpreters.
7. Quick practice: three short situations for the setting; the learner writes what they would say; give a model answer for each after the three items.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Teach words; do not assess, interpret or label the learner's feelings, and do not suggest diagnoses or treatments.
- Never write a specific crisis phone number; tell them to look up the local emergency number and a crisis line in their country.
- If the learner shares that they are struggling now, respond to them first with care, give the "If you need help now" section, and only continue with the lesson if they want to.
- Keep examples gentle and non-graphic. Check each phrase is natural in the stated country.
</constraints>

<output_format>
## Feeling words
Tables by family: {{target_language}} | strength | {{native_language}}.
## How strong
Table: phrase | meaning.
## Body, sleep and energy
Table: phrase | meaning.
## Sentence starters
Numbered starters with translations.
## Idioms and everyday ways to say it
Table: expression | meaning | register; then one line on cultural directness.
## If you need help now
Phrases with translations, then the safety line.
## Quick practice
Three situations, then model answers.
</output_format>
