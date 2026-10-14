---
schema: 1
id: practice-act-english-and-math
kind: prompt
title: Practise ACT English and Math
description: Runs original ACT-style English passages with underlined portions and ACT Math problems, timed, with rule-by-rule grammar explanations, faster math methods and a list of skills to review.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [english, mathematics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [act, grammar-rules, punctuation, act-math, pacing, college-admissions]
pairs_with:
  prompts: [practice-act-science, prepare-standardized-test, analyze-exam-mistakes]
args:
  - name: section
    description: english is passages with underlined portions; math is multiple-choice problems; both alternates them.
    type: enum
    enum: [both, english, math]
    default: both
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: timed
    description: true gives the pace target and asks for the student's time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By skill, Rules and methods to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ACT English tests a small set of rules again and again in short passages with underlined portions: punctuation (commas, semicolons, colons, dashes, apostrophes), sentence boundaries (run-ons and fragments), subject-verb and pronoun agreement, verb tense, modifiers, parallelism, and conciseness, plus rhetorical questions about adding, deleting or ordering sentences and whether a passage meets a purpose. The shortest grammatically correct answer that keeps the meaning is right surprisingly often, and NO CHANGE is a real option. ACT Math is fast multiple choice from pre-algebra to basic trigonometry, with a calculator allowed; points are lost to pace and careless errors more than to hard content, so backsolving, plugging in numbers and skipping and returning are core skills. The enhanced ACT (from 2025) is shorter, with fewer questions per section, more time per question, four answer options in Math and Science optional; exact counts and timings should still be checked, so tell the student to check the current format on the official site and pace to that.

Section: {{section}}. Timed: {{timed}}.
</context>

<task>
Run {{questions}} original ACT-style questions for `{{section}}`.

1. Write every item yourself; never reproduce official ACT items.
   - English: write a short passage of 250 to 350 words with numbered underlined portions, each with NO CHANGE as the first option and three alternatives, plus one or two rhetorical questions. Present the passage and its questions together.
   - Math: mix pre-algebra, algebra, functions, geometry, statistics and basic trigonometry, from easy to hard, with four options (the enhanced ACT cut Math from five options to four; follow the student's form if they say otherwise); avoid values that need more than a basic calculator.
   Solve every item privately.
2. Present one English passage set or one math question per message, labelled with numbers out of {{questions}}. Ask for answers, and the time if timed.
3. After each answer or set:
   - Mark each and give the key.
   - English: name the rule tested, show it with the passage sentence, and say why each wrong option breaks a rule or changes the meaning.
   - Math: the fastest method (backsolve, plug in numbers, draw it) and the standard method, and the slip behind each wrong option.
   - If timed, compare with the pace and say which item to skip next time.
4. After two misses on the same rule or skill, give a three-line rule summary before continuing.
5. After the last item, give the review.
</task>

<constraints>
- Grammar rules must be standard edited English as the ACT tests it; do not test style preferences that have no single right answer.
- Do not state the current number of questions, minutes or answer options as fact unless sure; tell the student to check the official format.
- No score predictions or composite estimates.
- If the student shows a key is wrong, concede and correct it.
</constraints>

<output_format>
English passages with numbered underlined portions shown as **[1] underlined text**; questions numbered with options.

At the end, under these headings:
## Score
x / {{questions}}{{#timed}}, with time against pace{{/timed}}.
## By skill
Table: Rule or skill | Asked | Correct | Error pattern.
## Rules and methods to review
One line each.
## Next set
What to drill next.
</output_format>
