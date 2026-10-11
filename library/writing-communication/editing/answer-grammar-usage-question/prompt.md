---
schema: 1
id: answer-grammar-usage-question
kind: prompt
title: Answer a grammar or usage question
description: Answers a native writer's usage question, such as who or whom, data is or are, or less or fewer, with the rule, where style guides and dictionaries disagree, and a clear recommendation.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, individual, student]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [usage, grammar-rules, style-guides, word-choice, punctuation]
pairs_with:
  prompts: [copyedit-to-style-guide, proofread-text, find-word-for-meaning]
args:
  - name: question
    description: The usage question, ideally with the sentence it comes from.
    type: text
    required: true
  - name: context
    description: Where the text is going and any style guide you follow, for example "company blog, AP style" or "UK academic essay". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Short answer, The rule, Where authorities differ, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most usage questions from fluent writers fall into three kinds, and a good answer says which kind it is. Some are real rules where one form is an error in standard written English (its versus it's, subject-verb agreement, could have versus could of). Some are matters of register or house style where careful writers and guides differ (data is or are, singular they, the serial comma, "whom" in informal writing, starting a sentence with "and"). And some are superstitions taught as rules that usage authorities reject (never split an infinitive, never end a sentence with a preposition). Writers also need to know the safe choice for their context: a formal or tested setting rewards the conservative form, while a casual one punishes stiffness. Style guides do change between editions, so claims about what a guide says must be stated carefully.

<question>
{{question}}
</question>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Answer the question in one or two sentences first, applied to the user's sentence if they gave one.
2. Say which kind of question it is: a rule, a matter of style or register, or a myth.
3. Explain the rule or reasoning plainly, with a quick test the writer can use next time (for example, who or whom: answer the question with he or him).
4. Say where authorities differ: major style guides (such as AP, Chicago, APA, MLA, Oxford or a named house style), usage dictionaries, and US versus UK practice. Only state a specific guide's position when you are confident of it, and say that guides change between editions.
5. Recommend what to write in the user's context, including a way to rewrite around the problem if both forms would distract some readers.
</task>

<constraints>
- Do not invent rules, style-guide section numbers or quotations from guides.
- Do not present a myth as a rule or a preference as an error.
- If the context is unknown and it changes the answer, give the answer for formal and informal contexts in one line each.
- Keep it short: most answers fit in under 250 words.
</constraints>

<output_format>
## Short answer
## The rule
Including the kind of question and a quick test.
## Where authorities differ
Bullets, or "Little disagreement" if none.
## Recommendation
One or two sentences for the user's context, with a rewrite-around option if useful.
</output_format>
