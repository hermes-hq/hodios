---
schema: 1
id: learn-form-filling-vocabulary
kind: prompt
title: Learn the vocabulary of official forms
description: Teaches the labels, abbreviations and instructions on official forms in a target language, from surname and marital status to block capitals, with a mock form to fill in and an answer check.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual, parent]
requires: [none]
inputs: [preferences, text]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [official-forms, bureaucracy, newcomers, abbreviations, reading-skills, mock-form]
pairs_with:
  prompts: [handle-foreign-language-letter, learn-health-vocabulary-for-appointments, learn-school-vocabulary-for-parents, practise-spelling-out-personal-details]
  personas: [esol-volunteer-tutor]
args:
  - name: target_language
    description: The language of the forms (for example German, Swedish, Portuguese).
    type: string
    required: true
  - name: country
    description: The country whose forms you deal with, because labels and conventions differ (for example Spanish forms in Spain and Mexico). Optional but recommended.
    type: string
  - name: form_area
    description: The kind of form to focus on.
    type: enum
    enum: [registration, health, school, bank, employment]
    default: registration
  - name: native_language
    description: The language for translations and explanations.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Labels you will see, Instructions and abbreviations, Mock form, Check yourself, Answer key, Where to check the real rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach newcomers to read forms in {{target_language}}{{#country}} as used in {{country}}{{/country}}, focusing on {{form_area}} forms. Translations go into {{native_language}}. Forms defeat people who read well, for predictable reasons: labels are nouns stripped of context ("Familienstand", "Nom d'usage", "Primer apellido"), instructions are compressed ("delete as appropriate", "if applicable", "block capitals", "office use only"), abbreviations are local, and conventions such as name order, name at birth, two surnames, date format and where to sign are assumed. This is a reading lesson: it explains what a field asks, never what a person should answer.
</context>

<task>
1. Labels you will see: 20 to 30 field labels typical of {{form_area}} forms in that country, in the order they usually appear (personal data first). For each: the label as printed, the meaning, and a note on what it really asks where it is not obvious (for example "name at birth" versus "current surname", "nationality" versus "place of birth", "main residence" versus "address for letters").
2. Instructions and abbreviations: 10 to 15 instruction phrases and common abbreviations on such forms (for example equivalents of "tick where applicable", "delete as appropriate", "please use block capitals", "if no, go to question 8", "n/a", "signature of applicant", "date and place"), plus the date format and how to write numbers, decimals and capitals there.
3. Mock form: a short, realistic {{form_area}} form in {{target_language}} with 12 to 15 fields, including at least three traps (a "delete as appropriate" line, a conditional skip, a field for name at birth or second surname, a date in local format, an "office use only" box). Give a fictional person's details in {{native_language}} prose and ask the learner to fill the form for that person.
4. Check yourself: five short questions on the instructions ("Which box do you leave empty?", "Where do you write the date?").
5. Answer key: the completed mock form and the answers, each with a one-line reason.
6. Where to check the real rules: which official sources usually explain a real form (the issuing office's website or help desk, a free advice service, a school office), and the phrase to ask for help at the counter.
</task>

<constraints>
- Explain words, not decisions. Do not advise what to answer on a real form about status, tax, benefits, residence or health; say who to ask instead.
- Never invent official form names, office names, deadlines, fees or legal requirements. Labels can be typical rather than copied from one official form, and say so.
- If the learner pastes a real form, help with the vocabulary and suggest they remove personal numbers and names first.
- If no country is given and the language is official in several countries with different forms, state the country you assume.
- Use the fictional person only; never ask for the learner's real details.
</constraints>

<output_format>
## Labels you will see
Table: label | meaning in {{native_language}} | what it really asks.
## Instructions and abbreviations
Table: phrase or abbreviation | meaning | what to do.
## Mock form
The fictional person's details, then the form as a table: field | space to write.
## Check yourself
Five numbered questions.
## Answer key
The completed form and the five answers with reasons.
## Where to check the real rules
Three or four bullets and the counter phrase with a translation.
</output_format>
