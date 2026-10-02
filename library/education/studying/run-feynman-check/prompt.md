---
schema: 1
id: run-feynman-check
kind: prompt
title: Run a Feynman check
description: Reviews a learner's plain-language explanation of a concept, finds gaps, jargon used as a crutch and wrong steps, and asks targeted follow-up questions. Use to test real understanding.
category: studying
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student, individual]
requires: [none]
inputs: [text]
output: [questions, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [feynman-technique, self-explanation, metacognition, illusion-of-competence]
pairs_with:
  prompts: [build-concept-map, explain-concept-at-level, quiz-me-interactively]
  personas: [study-coach, socratic-tutor]
args:
  - name: concept
    description: The concept being explained, e.g. "opportunity cost", "how vaccines produce immunity", "the derivative".
    type: string
    required: true
  - name: learner_explanation
    description: The learner's own explanation, written as if to someone who has never studied the subject. Not edited or looked up while writing.
    type: text
    required: true
  - name: level
    description: Optional course or level the concept is studied at, e.g. "high school biology", "first-year economics". Sets how complete the explanation needs to be.
    type: string
output_contract:
  format: markdown
  sections: [What holds up, Gaps, Follow-up questions, Your next attempt]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rereading creates a feeling of knowing that collapses the moment you have to explain. The Feynman technique exposes that: explain the idea simply, notice where you stall or reach for a technical word you cannot unpack, go back to the source, and try again. The useful feedback is precise about where the explanation breaks, not a model answer to copy.
</context>

<task>
Check this explanation of {{concept}}{{#level}} at the {{level}} level{{/level}}.

<explanation>
{{learner_explanation}}
</explanation>

Before replying, privately write the essential chain of ideas a complete explanation at this level needs (usually 4 to 8 links), and the common misconceptions about the concept. Then compare the learner's explanation against it, looking for:
- **Wrong:** a statement that is false or a step that does not follow.
- **Missing step:** a link in the chain that is skipped, so the explanation jumps from cause to effect.
- **Jargon crutch:** a technical term doing the explaining without being explained ("the antigen triggers the immune response"). Test each technical term by asking whether the learner showed what it means.
- **Vague or circular:** words like "affects", "deals with" or "basically", or an explanation that restates the term ("inflation is when things inflate").
- **Misconception:** a known wrong model, even if phrased confidently.
- **Unsupported example:** an analogy or example that does not actually fit and would mislead.

Then:
1. Name what holds up, specifically, quoting the learner's words.
2. List each problem with the exact phrase it is in, its type, and why it matters for understanding. Order by importance; list at most 6.
3. Ask 3 to 5 follow-up questions that target the weakest links. Each should be answerable in a sentence or two and should force the missing reasoning ("Why does the second exposure produce a faster response than the first?"), not invite a definition to be recited.
4. Give one instruction for their next attempt: which part to look up again and which part to rewrite.
5. Wait for their answers or their second attempt. When they reply, check again in the same way and say clearly when the explanation is complete and correct.
</task>

<constraints>
- Do not write a model explanation of the concept in the first reply; the learner's next attempt is the point. If they ask for one after a second attempt, give a concise one and point out what it has that theirs lacked.
- Do not invent errors. If the explanation is complete and correct for the level, say so and ask one stretch question about an edge case or application.
- Judge completeness at the stated level; do not mark a school explanation down for missing university detail.
- Correct factual errors clearly; do not soften a real misconception into "almost right".
</constraints>

<output_format>
## What holds up
2 to 4 bullets quoting the learner.
## Gaps
A table: Phrase | Problem type | Why it matters.
## Follow-up questions
Numbered, 3 to 5.
## Your next attempt
One or two sentences.
</output_format>
