---
schema: 1
id: write-teaching-philosophy
kind: prompt
title: Write a teaching philosophy statement
description: Writes a teaching philosophy statement that ties each belief to a concrete classroom example and evidence of learning. Use for school, college or faculty applications that ask for one.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, job-seeker, researcher]
subject: [education-sector]
requires: [none]
inputs: [notes, preferences]
output: [article, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [teaching-statement, academic-job-market, pedagogy, job-application]
pairs_with:
  prompts: [write-academic-cover-letter, prepare-teaching-demo-lesson, write-research-statement]
args:
  - name: beliefs
    description: What you believe about how students learn and what your job as a teacher is. Rough notes are fine, including the ideas or thinkers that shaped you.
    type: text
    required: true
  - name: classroom_examples
    description: Two to four real moments from your teaching - a lesson, activity, assessment, a student you helped, something that failed and what you changed - with any evidence (results, feedback, evaluations).
    type: text
    required: true
  - name: level
    description: The level and setting you are applying for, for example primary school, secondary maths, community college, research university, adult education.
    type: string
    required: true
  - name: word_limit
    description: Maximum length in words. One page is about 500 to 750 words; many universities allow up to two pages.
    type: number
    default: 750
output_contract:
  format: markdown
  sections: [Statement, Evidence map, Gaps and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced teacher educator who has sat on hiring panels for schools and universities. Panels read a teaching philosophy to answer one question: do this person's beliefs actually drive what happens in their classroom? Weak statements fail in predictable ways: platitudes that every candidate writes ("every student can learn", "I am passionate about teaching"), a list of fashionable methods with no evidence they were used, no students in the picture, and no sign that the teacher reflects and changes.

What panels look for depends on the level:
- Schools (primary, secondary, further education): how learning is planned and checked, differentiation and inclusion, classroom climate and behaviour, working with families and colleagues, and alignment with the curriculum or standards.
- Colleges and universities: course design and alignment of outcomes, activities and assessment, active learning in large and small classes, mentoring, inclusive teaching, and how the candidate uses evaluations and peer review to improve.

<beliefs>
{{beliefs}}
</beliefs>

<classroom_examples>
{{classroom_examples}}
</classroom_examples>

Level and setting: {{level}}
Word limit: {{word_limit}}
</context>

<task>
1. Reduce the beliefs to two to four core claims about learning and teaching. Each claim must be specific enough that a colleague could disagree with it ("students learn mathematics by explaining their reasoning to each other" rather than "students should be engaged").
2. Pair each claim with the strongest classroom example: what the teacher did, what students did, and the evidence that it worked (work samples, results, feedback, evaluation comments, a change in a specific student). If a claim has no example, drop it or list it under Gaps.
3. Plan the statement for {{level}}:
   - Opening: one short scene from a real classroom or one plain sentence of the central belief. No quotations from famous educators unless the teacher supplied one and it carries weight.
   - Two or three belief sections, each in the order belief, practice, evidence, and what the teacher learned or adjusted.
   - Assessment and feedback: how the teacher finds out what students understand and acts on it.
   - Inclusion: how the teaching reaches students with different starting points, needs and backgrounds, shown through practice rather than declared.
   - Growth: how the teacher reflects and improves, with one concrete change made after evidence.
   - Close: what students in this setting can expect from the teacher, in one or two sentences.
4. Write in first person and present tense, concrete and warm, in the register of the setting: plain and practical for schools, scholarly but jargon-light for universities. Name a method or theory only where the example shows it in use.
</task>

<constraints>
- Stay within {{word_limit}} words and report the count.
- Use only the beliefs, examples and evidence given. Never invent student outcomes, statistics, evaluation scores, courses or quotations. Where a number or detail would help, write [placeholder] and ask for it.
- No student names or identifying details; describe students by role ("a Year 9 student who...").
- Cut clichés: "passionate", "lifelong learners", "every child is unique", "facilitator not a sage on the stage", unless a specific example earns the idea.
- If the examples are too thin for a credible statement (for example only "I like group work"), write the strongest honest short version you can and put the missing evidence first in Gaps and questions.
</constraints>

<output_format>
## Statement
The statement with no headings unless the teacher's notes suggest the institution expects them, then "Words: N of {{word_limit}}".
## Evidence map
Table: Belief | Classroom example | Evidence of learning | Strength (strong, partial, missing).
## Gaps and questions
Numbered: each [placeholder] to fill and each question whose answer would make the statement stronger.
</output_format>
