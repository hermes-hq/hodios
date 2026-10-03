---
schema: 1
id: tutor-spelling-and-punctuation
kind: prompt
title: Tutor spelling and punctuation
description: Finds a learner's repeated spelling or punctuation errors, teaches the rule behind each with clear examples and short targeted practice, then rechecks with their own sentences.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student, parent, teacher]
subject: [english]
requires: [none]
inputs: [text]
output: [explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [spelling, punctuation, error-patterns, grammar-rules, targeted-practice]
pairs_with:
  prompts: [give-essay-feedback, tutor-adult-literacy]
  personas: [writing-tutor]
args:
  - name: writing_sample
    description: A piece of the learner's own writing, ideally 150 words or more, unedited, so repeated patterns show.
    type: text
    required: true
  - name: learner_age
    description: Optional age or school year, for example "10", "Year 8", "adult". Sets the language, examples and how many rules to cover.
    type: string
output_contract:
  format: markdown
  sections: [Patterns found, Rule, Practice, Fix your own sentences]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Correcting every error in a piece of writing teaches very little: the learner sees a page of red and fixes nothing next time. What works is finding the few errors that repeat, teaching the rule or test behind each one, practising it on purpose, and then having the learner fix their own sentences. Many repeated errors have a reliable test (substitute "it is" for "it's"; a comma cannot join two complete sentences) or a pattern (double the final consonant before -ing after a short stressed vowel). One-off typos are not worth a lesson.
</context>

<task>
Tutor the learner{{#learner_age}} (age or year: {{learner_age}}){{/learner_age}} on the errors that repeat in this writing.

<writing_sample>
{{writing_sample}}
</writing_sample>

1. Find every spelling and punctuation error, then group them by the rule behind them, for example its and it's, their, there and they're, plurals versus possessive apostrophes, comma splices, missing capital letters, doubling consonants, -y to -ies, homophones, sentence boundaries.
2. Separate repeated patterns (two or more instances, or one rule clearly not known) from one-off slips. Do not count regional spelling differences (colour and color, -ise and -ize) as errors; mention them once only if the writer mixes both in the same piece.
3. Choose the 1 to 3 patterns that matter most, by how often they occur and how much they affect meaning or marks. Choose fewer for younger learners.
4. For each chosen pattern, teach it:
   - The rule in one or two plain sentences, and a quick test or memory aid if a reliable one exists.
   - Two or three correct examples, then the learner's own error quoted with the correction.
   - Exceptions, only if the learner is likely to meet them soon.
5. Give 5 to 8 practice items per pattern, mixing "choose the right one", "correct this sentence" and one "write your own sentence using…". Do not include answers.
6. Ask the learner to rewrite their own sentences that contained these errors.

Then stop and wait. When the learner replies, mark the practice and their rewrites, explain any remaining mistake briefly, and say whether the pattern looks secure or needs one more short round.
</task>

<constraints>
- Do not rewrite or correct the whole piece. Leave one-off slips for a short list at the end of "Patterns found".
- Use language and examples suited to the learner's age; for children, short sentences and familiar words; for adults, an adult tone and everyday contexts.
- Be certain about every rule you state. If usage is genuinely variable (the Oxford comma, "data is" or "data are"), say it is a style choice, not an error.
- If the sample has no repeated errors, say so, name what the writer does well, and suggest one stretch area instead of inventing patterns.
- If the sample is too short to find patterns (under about 50 words), ask for a longer piece.
</constraints>

<output_format>
## Patterns found
A table: Pattern | Times | Example from your writing. Then one line listing one-off slips.
## Rule
One subsection per chosen pattern: rule, test or memory aid, examples, your sentence fixed.
## Practice
Numbered items per pattern, no answers.
## Fix your own sentences
The learner's original sentences, quoted, to rewrite.
</output_format>
