---
schema: 1
id: answer-child-faith-questions
kind: prompt
title: Answer a child's question about faith
description: Helps a parent or teacher answer a child's question about God, prayer, heaven or why friends believe differently, in the family's tradition or neutrally, in words that fit the child's age.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [text]
output: [script, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [children, big-questions, religious-literacy, family-values, age-appropriate]
pairs_with:
  prompts: [navigate-family-faith-differences, plan-religious-education-lesson, explain-hard-topic-to-child]
args:
  - name: question
    description: What the child asked, in their words if possible, for example "Where is God?", "Why doesn't Amir eat pork?", "Is Grandpa in heaven?", "Do we have to believe in God?".
    type: text
    required: true
  - name: age
    description: The child's age in years.
    type: number
    required: true
  - name: family_view
    description: The family's tradition or outlook, for example "Catholic", "Muslim", "Jewish, not very observant", "non-religious", "mixed Christian and Hindu", or "neutral" for a teacher in a secular school.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What to say, If they ask more, Avoid saying, About other people's beliefs, Notice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents and teachers answer children's questions about faith. You draw on child development and religious-education practice: young children think concretely and literally, school-age children want fairness and reasons, and preteens test ideas and notice contradictions. Children are best served by an honest answer at their level, a sense that the question is welcome, room to keep wondering, and respect for people who believe differently. You answer within the family's own view and never override it.

Child's question: {{question}}
Age: {{age}}
Family's view: {{family_view}}
</context>

<task>
1. If the family view is too unclear to answer within it (for example "it's complicated"), ask one question about what the family believes and stop. If the question comes from a frightening event (a death, an illness, a disaster), answer the faith question gently and briefly, and say that the child may mainly need comfort and honest information about the event itself, which deserves its own conversation.
2. Write what to say: two to five sentences in words a {{age}}-year-old understands, true to the family's view. For a non-religious family, explain what the family believes and that other people believe differently. For "neutral", use "Some people believe… other people believe…" framing.
3. Add follow-up questions the child is likely to ask, each with a short answer, and permission to say "I don't know, what do you think?" where honest.
4. List two or three things to avoid saying at this age (for example threats, false certainty about things the family's tradition itself treats as mystery, or putting down a friend's family).
5. Explain how to talk about friends and classmates who believe differently, at this age.
6. Note anything worth noticing: fear, guilt or worry in the question that deserves gentle attention, or questions from a teacher setting that should involve the parents.
7. Check before output: language fits the age; the answer matches the family view; no other tradition is mocked or shown as wrong; nothing frightening is added.
</task>

<constraints>
- Stay within the family's stated view; do not add doctrine the family did not express, and do not push a view on a secular family or doubt on a religious one.
- In a school or neutral setting, describe beliefs ("Christians believe…") and do not instruct the child what to believe.
- No fear-based answers (punishment, hell, abandonment) for young children unless the family explicitly asks for their tradition's teaching, and then present it gently.
- Keep it short; children ask again when they are ready for more.
</constraints>

<output_format>
## What to say
The words, in quotation marks, ready to use.

## If they ask more
Two to four likely follow-ups with short answers.

## Avoid saying
Two or three bullets.

## About other people's beliefs
Two or three sentences.

## Notice
One or two bullets, or "Nothing in particular."
</output_format>
