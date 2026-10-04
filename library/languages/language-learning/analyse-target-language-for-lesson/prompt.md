---
schema: 1
id: analyse-target-language-for-lesson
kind: prompt
title: Analyse target language before a lesson
description: Analyses a grammar or lexical item for a lesson the way teacher training asks, covering meaning, form, pronunciation, anticipated problems for these learners and solutions, ready to paste into a plan.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [language-analysis, meaning-form-pronunciation, anticipated-problems, lesson-preparation, weak-forms]
pairs_with:
  prompts: [write-concept-checking-questions, review-trainee-language-lesson-plan, compare-native-and-target-language]
  personas: [language-teacher-trainer]
args:
  - name: target_language
    description: The language being taught, with the variety you model.
    type: string
    required: true
  - name: language_item
    description: "The item or items to analyse in the example sentences you will use in class, plus the class level (for example B1, second conditional, 'If I had more time, I'd learn the guitar.')."
    type: text
    required: true
  - name: learner_languages
    description: The learners' first languages, if known.
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [Meaning, Form, Pronunciation, Anticipated problems and solutions, Board plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher or trainee prepare the language analysis for a lesson, in the meaning, form and pronunciation format used on initial teacher training courses. Teachers who skip this step teach a rule that is too broad, miss the spoken form, cannot answer learners' questions and are surprised by predictable errors. Analyses go wrong when meaning is described with grammar terms instead of what the speaker means, when only the written form is given, and when "anticipated problems" are generic.

Learners' first languages: {{learner_languages}}

<item>
{{language_item}}
</item>
</context>

<task>
1. Meaning: for the item as used in the example sentence (not every use it has), state what the speaker means in plain words, the time reference where relevant, the speaker's attitude or degree of certainty, and register. Give 2-4 concept-checking questions with answers that do not use the item. For lexis, add connotation, collocations and the boundary with a near-synonym. Add a timeline or cline when it helps.
2. Form: the pattern with labels (subject + would + base verb), affirmative, negative and question forms, the contracted spoken form, irregular forms learners need now, and word class and grammar (countable, transitive, dependent preposition) for lexis.
3. Pronunciation: the example sentence with stressed syllables marked in capitals, weak forms in IPA (for example /wəd/, /əv/), contractions, linking and the intonation pattern; for lexis, word stress and any sound that is hard.
4. Anticipated problems and solutions, specific to this item and these learners, each with a concrete classroom solution:
   - meaning (confusion with a similar form, overgeneralising the rule),
   - form (word order, missing auxiliary, wrong verb form),
   - pronunciation (stressing weak forms, missing contractions),
   - first-language interference: if learner languages are given, predict transfer errors with an example of the error a learner might produce; if not, say the prediction is general.
5. Board plan: how the board will look after the clarification stage (the example, the timeline, the form pattern, the stress marks), in text.
</task>

<constraints>
- Analyse only the use shown in the example sentence; mention other uses in one line as "not for this lesson".
- Be accurate about {{target_language}}; if a point varies by region or style, say so, and if you are unsure, say so rather than state a rule.
- Keep each section short enough to paste into a lesson plan form (about 250-400 words in total, plus the board plan).
- If no example sentence is given, write one, mark it as your assumption and analyse that.
</constraints>

<output_format>
## Meaning
Plain explanation, then CCQs with answers, then timeline or cline if useful.
## Form
Pattern table: Affirmative | Negative | Question | Spoken short form.
## Pronunciation
## Anticipated problems and solutions
Table: Area | Problem (with an example error) | Solution.
## Board plan
</output_format>
