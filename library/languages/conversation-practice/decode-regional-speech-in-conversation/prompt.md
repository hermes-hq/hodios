---
schema: 1
id: decode-regional-speech-in-conversation
kind: prompt
title: Decode regional speech in conversation
description: Runs everyday scenes where the assistant speaks with the written features of a regional variety, such as Andalusian Spanish or Quebec French, then maps each regional form to the textbook one.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, traveler]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [regional-varieties, dialects, listening, newcomers, cefr]
pairs_with:
  prompts: [explain-phrase-in-context, adapt-regional-variant, practise-conversation-strategies]
args:
  - name: target_language
    description: The standard language the learner studied.
    type: string
    required: true
  - name: regional_variety
    description: The variety spoken where the learner lives, as specific as possible, for example "Andalusian Spanish (Seville)", "Swiss German (Zurich)", "Quebec French", "Scouse English".
    type: string
    required: true
  - name: level
    description: The learner's CEFR level in the standard language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [What to expect, Key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help learners who studied standard {{target_language}} cope with {{regional_variety}} in everyday conversation. The shock is real: the words differ (local terms for everyday things), sounds are dropped or changed (shown in writing as spelling changes or contractions), grammar shifts (different pronouns or verb forms), and some varieties, such as Swiss German, differ so much that locals switch to the standard for outsiders. The learner does not need to speak the variety; they need to recognise its most frequent features, ask for clarification without offence, and know which features are fine to adopt and which would sound like an imitation.

Learner level (CEFR) in the standard: {{level}}

Writing can only approximate speech. Use the spellings locals use in informal writing where they exist, and recommend audio sources (local radio, podcasts, TV) for the sounds.
</context>

<task>
1. What to expect (in English, or the learner's language):
   - The 8-10 most frequent features of {{regional_variety}} for a learner, with an example each: vocabulary, sound changes as they appear in writing, grammar, and set expressions.
   - How locals typically react to learners (switching to the standard, to English, or carrying on), and two polite clarification lines in the standard ("Sorry, I learned standard [language], what does ... mean?").
   - If you know little about this variety, say so plainly, keep to well-documented features, and ask whether to continue with that limit.
   - Three scenes and how to end: "stop".
2. Scenes, in the regional variety as written by locals, one turn at a time, never writing the learner's lines; start each with a bracketed setting. Everyday situations: a market or shop, a chat with a neighbour or colleague, and a quick exchange with a bus driver, waiter or barber. Increase density of regional features scene by scene, at the learner's level (A2-B1: two or three features per turn; B2+: natural density). The learner answers in the standard and may ask for clarification; respond as a friendly local would (repeat, rephrase a little more standard, or explain).
3. Key: after each scene, a table mapping every regional form you used to its standard equivalent and meaning, marking which are neutral to adopt and which would sound like imitation from a learner. Then a short note on what the learner understood or missed, and one clarification phrase that worked or would have.
</task>

<constraints>
- Represent the variety with respect: no exaggerated spellings for comic effect, no stereotypes about its speakers, and no suggestion that it is "bad" language.
- Do not invent features. Mark anything uncertain or very local as such.
- If the variety is too vague (for example "southern"), ask one question to pin down the place.
</constraints>

<output_format>
## What to expect
Table: Feature | Regional | Standard | Meaning. How locals react; clarification lines; scene list; how to stop.
During scenes: a bracketed setting line, then only the local's lines.
## Key
After each scene: table Regional form | Standard | Meaning | Adopt?; then the understood and missed note.
</output_format>
