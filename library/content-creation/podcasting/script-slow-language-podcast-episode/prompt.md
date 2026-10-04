---
schema: 1
id: script-slow-language-podcast-episode
kind: prompt
title: Script a slow language podcast episode
description: Scripts a learner podcast episode at a set CEFR level with slow natural speech, controlled vocabulary, a recurring structure, glossed key words, comprehension questions and a learner transcript.
category: podcasting
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
inputs: [topic]
output: [script, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [language-teaching, cefr, comprehensible-input, graded-listening, learner-podcast]
pairs_with:
  prompts: [plan-classroom-podcast-project, write-solo-episode-script]
args:
  - name: language
    description: The target language the episode is in, for example Spanish, German or Japanese, and the variety if it matters (Mexican Spanish, European Portuguese).
    type: string
    required: true
  - name: level
    description: The learners' CEFR level. A1 and A2 are beginners; B1 and B2 are intermediate.
    type: enum
    enum: [A1, A2, B1, B2]
    required: true
  - name: topic
    description: The episode topic, for example "a market in my town", "how people celebrate New Year", "my first job".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Episode plan, Script, Key words, Comprehension questions, Learner transcript notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write learner podcast episodes in {{language}} for {{level}} listeners about {{topic}}. Learners understand most when the input is slightly above their level: they already know the great majority of the words (research on reading and listening often points to roughly 95 percent or more) and can guess the rest from context. Learner podcasts fail when they are simply native speech read slowly (unnatural and still too hard), when vocabulary is uncontrolled, when they lecture about grammar in the learners' first language, or when the structure changes every week so learners cannot predict what comes next.

Guidance by level:
- A1: present tense, very short sentences (up to about 8 words), high-frequency words, lots of repetition, about 300 to 450 words of script (3 to 5 minutes at slow pace).
- A2: simple past and near future, sentences up to about 12 words, everyday topics, about 450 to 700 words.
- B1: connected narrative, opinions with reasons, common idioms explained, about 700 to 1,000 words.
- B2: natural pace close to normal, complex sentences, nuance and some colloquial language, about 900 to 1,300 words.
Slow speech means clear articulation and pauses between sentences, not distorted words.
</context>

<task>
1. Episode plan: the recurring structure (greeting and topic in one line; a short story or monologue; a slower replay or recap of key sentences; questions; goodbye with a preview), the target length in minutes, and six to ten key words or phrases chosen for the level and topic.
2. Script: fully in {{language}}, written for the ear, at the level's sentence length and grammar. Introduce each key word in a clear context and repeat it at least three times across the episode. Use one or two named speakers if a dialogue suits the topic. Mark pauses with [pause] and stressed words in bold sparingly.
3. Key words: a table with the word or phrase, a simple explanation in {{language}} (for A1 and A2 also a short English gloss), and the example sentence from the script.
4. Comprehension questions: five questions in {{language}}, moving from detail to gist to one personal response question; give the answers. For A1 and A2 include multiple-choice or true or false items.
5. Learner transcript notes: how to lay out the published transcript (speaker names, line breaks per sentence, key words bolded, timestamps per section) and two follow-up activities.
</task>

<constraints>
- Stay inside the level: no grammar or vocabulary clearly above it except the glossed key words.
- Natural, idiomatic {{language}} as a native teacher would speak it slowly; avoid word-for-word translation from English.
- Culture and facts about the topic must be accurate and general; avoid stereotypes. If unsure about a regional custom, keep it as a personal story rather than a claim about everyone.
- If the language or variety is ambiguous, state the variety you chose.
- Do not include grammar lectures in the script; one short "notice this" line in the notes is enough.
</constraints>

<output_format>
## Episode plan
Structure with minutes per part, key word list.
## Script
The full script with speaker labels and [pause] marks.
## Key words
Table: Word or phrase | Explanation | Example from the script.
## Comprehension questions
Numbered questions, then answers.
## Learner transcript notes
Layout bullets and two activities.
</output_format>
