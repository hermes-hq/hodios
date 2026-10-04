---
schema: 1
id: name-grammar-you-already-use
kind: prompt
title: Name the grammar you already use
description: Shows heritage and fluent speakers the grammar behind sentences they already produce by ear, names the rules and terms they need for exams, teaching or writing, and tests where intuition fails.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher, student]
requires: [none]
inputs: [text, topic]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [metalanguage, grammar-terminology, heritage-speakers, explicit-knowledge, teacher-training, exam-preparation]
pairs_with:
  prompts: [explain-grammar-point, discover-grammar-rule-from-examples, expand-heritage-register]
  personas: [heritage-language-mentor, language-teacher]
args:
  - name: target_language
    description: The language you speak fluently but have not studied formally.
    type: string
    required: true
  - name: sentences_or_topic
    description: Sentences you say naturally (typed as you say them), or a grammar topic you need to name and explain (for example "when I use the subjunctive", "aspect pairs of verbs", "particles wa and ga").
    type: text
    required: true
  - name: purpose
    description: Why you need the terms; this decides which terminology tradition and which formal-writing checks to use.
    type: enum
    enum: [writing, exam, teaching]
    default: writing
output_contract:
  format: markdown
  sections: [What you already do, The rules behind it, Terms to know, Where intuition can mislead, Check yourself, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help fluent speakers of {{target_language}} who learned it at home or by immersion to name what they already know. They choose the right tense, case, aspect or particle by ear, but freeze when an exam asks them to identify a form, when they train as teachers and must explain a rule, or when formal writing needs something their spoken variety does not use. Their purpose: {{purpose}}. Two things go wrong with ordinary grammar explanations for them: they start from zero and bore them, and they use one country's school terminology without saying so (terms and categories differ between grammar traditions, for example Spanish verb tense names in Spain and Latin America, or how school grammar labels particles or cases in different countries). A good explanation starts from their sentences, names the system, and then tests the edges where speaking intuition and formal norms part ways.

<sentences_or_topic>
{{sentences_or_topic}}
</sentences_or_topic>
</context>

<task>
1. What you already do: from their sentences (or typical sentences for the topic), show three to six things they already do correctly, in plain words, without terms yet.
2. The rules behind it: for each, the form, the name of the grammar involved, and the rule as a fluent speaker would recognise it ("you use X whenever ...; that is why ... sounds wrong").
3. Terms to know: 10 to 15 terms the purpose ({{purpose}}) calls for, in English and in {{target_language}} school terminology, noting where traditions or countries use different names.
4. Where intuition can mislead: four to six cases where spoken or regional usage differs from formal written norms (for example forms the standard requires but speech avoids, hypercorrections, agreement in long sentences), each with an example and the formal choice. Mark which are register differences and which are errors in any register.
5. Check yourself: eight tasks suited to the purpose: identify and name forms, explain a choice as you would to a learner, or correct a formal sentence and say why.
6. Answer key with short reasons.
</task>

<constraints>
- Do not label the learner's natural regional forms as wrong; say "in formal writing" or "in the standard" where that is the point.
- Use terminology correctly; where a term is disputed or used differently in different traditions, say so in a short note.
- If the sentences are not in {{target_language}}, or the topic is too broad to treat in one go (for example "all of grammar"), ask them to narrow it to one area and stop.
- Keep each rule to one or two plain sentences before any technical detail.
</constraints>

<output_format>
## What you already do
Numbered points, each with one of their sentences.
## The rules behind it
Table: your sentence | form | grammar name | rule.
## Terms to know
Table: English term | {{target_language}} term | meaning | note.
## Where intuition can mislead
Table: what speech often does | formal choice | register difference or error.
## Check yourself
Eight numbered tasks.
## Answer key
Eight answers with reasons.
</output_format>
