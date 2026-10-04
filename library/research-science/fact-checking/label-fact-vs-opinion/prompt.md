---
schema: 1
id: label-fact-vs-opinion
kind: prompt
title: Label fact, opinion and speculation
description: Labels each sentence of a text as checkable fact, opinion, prediction or speculation and explains the clue words, for media literacy practice at primary, secondary or adult level.
category: fact-checking
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [media-literacy, fact-or-opinion, classroom, critical-reading]
pairs_with:
  prompts: [analyze-spin-in-article, play-spot-the-misinformation, plan-media-literacy-lesson]
args:
  - name: text
    description: The text to label, such as a news article, advert, blog post, review or social media post. Up to about 40 sentences works best.
    type: text
    required: true
  - name: level
    description: primary uses three simple labels and short explanations; secondary uses all labels with clue words; adult adds the harder cases such as attributed opinions and statements of fact that are hard to verify.
    type: enum
    enum: [primary, secondary, adult]
    default: secondary
output_contract:
  format: markdown
  sections: [How to read the labels, Labelled sentences, Tricky ones, Try it yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Telling facts from opinions is the first skill of media literacy, and the hard part is that real texts blend them in one sentence. A "fact" here means a statement that could be checked and shown true or false, not a statement that is true: "The Moon is made of cheese" is a checkable claim, and false. Learners need to see the labels applied to real sentences, with the clue words that gave each one away, so they can do it themselves next time.

<text>
{{text}}
</text>
Level: {{level}}
</context>

<task>
1. Split the text into sentences and number them. If it is longer than about 40 sentences, label the first 40 and say so.
2. Label each sentence:
   - **Checkable fact:** could be verified with evidence (numbers, events, places, what someone said).
   - **Opinion:** a judgement, preference or value ("best", "should", "disappointing").
   - **Prediction:** a claim about the future ("will", "is set to").
   - **Speculation:** a guess about the present or past that cannot yet be checked ("may have", "it seems", "probably").
   - **Mixed:** contains more than one kind; show the parts with their labels.
   At primary level use only three labels: fact (can be checked), opinion (what someone thinks or feels), and guess (about the future or something we can't know yet).
3. For each, name the clue words and give a one-line reason. At adult level also note harder cases: attributed opinion ("Experts say the plan is reckless" is a checkable fact that experts said it, wrapping an opinion), facts that are checkable in principle but not in practice, and value judgements disguised as facts ("the unfair tax").
4. Pick the two or three trickiest sentences and explain them more fully.
5. Write three new practice sentences on the same topic, with answers hidden at the end.
6. Before answering, check that no label depends on whether the statement is true.
</task>

<constraints>
- Labels describe the type of statement, not its truth. Do not fact-check.
- Use language suited to the level: short words and friendly examples for primary; precise terms for adult.
- Stay neutral on the topic of the text. Opinions are labelled, not judged.
- If the text is not prose (a table, a list of numbers, code), say what can and cannot be labelled.
</constraints>

<output_format>
## How to read the labels
A short key for the labels at this level.
## Labelled sentences
Table: # | Sentence | Label | Clue words | Why.
## Tricky ones
Two or three short explanations.
## Try it yourself
Three numbered sentences, then **Answers:** with labels and reasons.
</output_format>
