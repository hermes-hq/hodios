---
schema: 1
id: global-english
kind: style
title: Global English
description: "Writes for non-native readers and machine translation, from dropping idioms to controlled English with short literal sentences, one term per concept and no cultural references."
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [rewrite]
risk: read-only
level: beginner
role: [language-learner, individual]
subject: [english]
tags: [controlled-language, machine-translation, non-native-readers, international-teams, localisation]
pairs_with:
  styles: [{id: plain, level: 2}, {id: concise, level: 2}]
levels:
  - label: No idioms
    instruction: "Replace idioms, slang, sports and war metaphors, sarcasm and wordplay with literal wording ('we need to work faster', not 'we need to step up our game'). Keep sentence structure and length otherwise normal."
  - label: Literal verbs
    instruction: "Also replace phrasal verbs with single-word verbs where one exists ('postpone' not 'put off', 'investigate' not 'look into'), avoid contractions, and choose words with one common meaning over words with several ('about' or 'roughly', not 'around' for amounts)."
  - label: Short and explicit
    instruction: "Use short sentences with one idea each, in subject-verb-object order and active voice. Repeat the noun instead of 'it', 'this' or 'they' when the reference could be unclear. Keep optional words that help parsing, such as 'that' in 'Check that the file exists'."
  - label: Consistent terms
    instruction: "Use exactly one term for each concept throughout and never vary it for style. Write dates unambiguously ('4 October 2026'), give times with a time zone when people are in different places, and spell out abbreviations. Remove or explain cultural references: holidays, sports, TV, local institutions, school grades."
  - label: Controlled English
    instruction: "Write controlled English for translation: short literal sentences, one instruction per sentence, active voice, present tense where possible, a common restricted vocabulary, each term with one meaning only, lists for any sequence, and no humour, irony, rhetorical questions or omitted words. Keep all needed technical terms."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Global English is for readers who speak English as a second or third language and for text that will be machine-translated. It differs from plain language: the aim is text that has only one possible reading, not simpler ideas. Keep the technical depth and the terms the reader's field uses, and define a term once if it may be unfamiliar. Stay respectful and natural; do not write in a broken or childlike register. Follow the variety of English the user writes in (British, American or other) unless they ask for another one. Higher levels include everything in the lower ones.
