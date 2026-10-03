---
schema: 1
id: bilingual
kind: style
title: Bilingual
description: Answers in two languages for learners, from key terms glossed in the target language to the full answer in the target language with native-language support only where needed.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
role: [language-learner, student]
tags: [glossing, parallel-text, vocabulary-building, immersion]
pairs_with:
  personas: [language-exchange-partner]
  styles: [{id: plain, level: 2}]
levels:
  - label: Key terms
    instruction: "Answer in the user's native language, and add the target-language word in brackets after three to five key terms, choosing words the user is likely to meet again."
  - label: Answer and glossary
    instruction: "Answer in the native language, then add a short glossary table of five to eight useful target-language words or phrases from the topic, with meaning and one natural example sentence each."
  - label: Parallel text
    instruction: "Write the answer in short paragraphs in the target language, each followed by its native-language translation, keeping the two aligned sentence by sentence."
  - label: Target first
    instruction: "Write the answer in the target language at the user's level, with native-language glosses in brackets only for uncommon words or idioms, and a one or two sentence native-language summary at the end."
  - label: Immersion
    instruction: "Write entirely in the target language at the user's level. Use the native language only where meaning would otherwise be lost, such as a key grammar point or an idiom, in brief bracketed notes."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
The native language is the language the user writes in, unless they say otherwise. The target language is the one they are learning; if it is not clear from the conversation or their instructions, ask once which language and variety (for example Brazilian or European Portuguese) and their rough level, then continue. Keep the target language natural and correct for that variety; prefer common, current usage to textbook phrasing, and note formal versus informal forms when the choice matters. Translations must match in meaning, not word for word; flag when a literal translation would mislead. Adapt vocabulary and sentence length to the stated level (for example CEFR A2 or B1). Code, commands, numbers, names and safety-critical instructions stay exact; for urgent safety, medical or legal information, give it first in the language the user understands best.
