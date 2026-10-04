---
schema: 1
id: learn-idioms-in-context
kind: prompt
title: Learn idioms in context
description: Teaches idioms on a theme through a short story that uses them naturally, then explains each one's meaning, register and region, with a plain alternative and a quick self-check.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [topic, preferences]
output: [article, explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [idioms, figurative-language, register, regional-variation, story-based-learning]
pairs_with:
  prompts: [explain-phrase-in-context, learn-english-phrasal-verbs, build-vocabulary-list]
  personas: [language-teacher]
args:
  - name: language
    description: The language, with the variety you want (for example "Spanish, Argentina", "English, UK", "Portuguese, Brazil"). Idioms differ a lot by region.
    type: string
    required: true
  - name: theme
    description: The area of life the idioms come from or are used in (for example "work", "money", "relationships", "weather", "food").
    type: string
    default: work
  - name: level
    description: The learner's CEFR level; sets the story's language and how transparent the idioms are.
    type: enum
    enum: [b1, b2, c1]
    default: b1
  - name: count
    description: How many idioms to teach.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Story, Idioms, Use with care, Check yourself, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach idioms the way they are actually met: inside a situation. A list of idioms with translations gets forgotten, and worse, learners then drop them into the wrong context, at the wrong register, or use one that is dated or only said in another country. A short story shows each idiom doing its job, and the notes that follow tell the learner whether they should use it themselves or only understand it.

Language: {{language}}
Theme: {{theme}}
Level (CEFR): {{level}}
Number of idioms: {{count}}
</context>

<task>
1. If {{language}} names no variety and idioms differ a lot between its regions, choose the most widely understood variety, say which in one line, and mark idioms that are regional.
2. Choose {{count}} idioms that native speakers of that variety use today in situations around "{{theme}}". Prefer common, current idioms over colourful rare ones. At B1, include more transparent idioms whose image helps the meaning; at C1, include some opaque ones.
3. Write a short story or dialogue in {{language}}, a few paragraphs long, at {{level}}, set in a believable situation around "{{theme}}", using each idiom once, naturally, in **bold**. The context around each idiom should give a clue to its meaning.
4. For each idiom give: the idiom, a word-for-word translation, the actual meaning, the register (neutral, informal, slang, vulgar), where it is used if regional, a plain alternative that is always safe to use, and one more example sentence.
5. Use with care: note any idiom that is easy to misuse (sounds rude in some contexts, is dated, means something else in another region, or looks like an idiom in the learner's language but means something different).
6. Check yourself: five gap-fill sentences in new contexts using idioms from the story, with answers in a separate section.
7. Before answering, check each idiom: is it real, current in the stated variety, and used correctly in the story? Replace any you are not confident about rather than include it.
</task>

<constraints>
- Never invent idioms or alter fixed wording. If a well-known idiom has variants, give the common one and mention the other.
- Avoid offensive idioms unless they are very common, and then label them clearly.
- The story's language stays at {{level}} apart from the idioms themselves.
- Explanations in English unless the learner writes in another language.
</constraints>

<output_format>
## Story
The story with idioms in bold.
## Idioms
Table: Idiom | Word for word | Meaning | Register | Region | Safe alternative | Another example.
## Use with care
Short bullets.
## Check yourself
Five numbered gap-fill sentences.
## Answers
Numbered answers.
</output_format>
