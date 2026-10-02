---
schema: 1
id: read-textbook-actively
kind: prompt
title: Read a textbook chapter actively
description: Guides active reading of a dense chapter with a preview, questions to answer while reading, recall prompts after each section and a closing self-test. For students who reread without retaining.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
requires: [none]
inputs: [document, text]
output: [plan, questions, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [active-reading, sq3r, retrieval-practice, reading-guide]
pairs_with:
  prompts: [make-study-guide, make-flashcards, build-concept-map]
  personas: [study-coach]
args:
  - name: chapter
    description: The chapter text, or at least its headings, subheadings, figure captions and summary if the full text is too long.
    type: text
    required: true
  - name: purpose
    description: Optional reason for reading, e.g. "exam on chapters 4-6", "seminar discussion", "background for an essay". Shapes which questions matter.
    type: string
  - name: time_available
    description: Optional time for the reading session, e.g. "90 minutes" or "three 30-minute sessions".
    type: string
output_contract:
  format: markdown
  sections: [Preview, Reading plan, Section guide, Closing self-test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rereading and highlighting feel productive because the text becomes familiar, but familiarity is not recall. Active reading gives the reader a purpose before each section (a question to answer), makes them retrieve what they read straight after (book closed), and ends with a self-test that shows what actually stuck. It is the logic of SQ3R: survey, question, read, recite, review.
</context>

<task>
Write a reading guide for this chapter{{#purpose}}, read for: {{purpose}}{{/purpose}}.

<chapter>
{{chapter}}
</chapter>

1. **Preview (5 minutes for the reader).** From the headings, figures, bold terms and summary, write a short orienting overview: the chapter's main question, how its sections build on each other, and 5 to 10 key terms to watch for. Tell the reader to skim headings, figures and the summary before reading.
2. **Reading plan.** Split the chapter into sections of a size that can be read with focus (roughly 5 to 15 minutes each). {{#time_available}}Fit the plan to {{time_available}}, with a short break between blocks; if the time is too short for the whole chapter, say which sections to prioritise for the purpose.{{/time_available}}
3. **Section guide.** For each section:
   - 2 or 3 questions to answer while reading, built from the headings and the purpose. Favour "why" and "how" questions and questions that link to earlier sections over "what is" questions.
   - One thing to look for in any figure or table ("What happens to the curve after the enzyme is saturated?").
   - A recall prompt for straight after reading, book closed: write the section's main points from memory in three bullet points, or explain one diagram out loud, then check against the text and mark what was missed.
4. **Closing self-test.** 8 to 12 questions covering the whole chapter, answered from memory: a mix of short recall, explanation and one or two application questions that connect sections. Put the section each question draws on in brackets. Do not include answers; tell the reader to answer first, then check against the text or paste their answers back for marking.
5. End with a one-line suggestion for when to revisit: a quick re-test of the self-test questions they missed in 2 to 3 days.
</task>

<constraints>
- Base all content on the chapter given. If only headings were given, build questions from them without inventing details of the content, and say the guide is built from headings only.
- Do not summarise the chapter in place of reading it; the preview orients, it does not replace the text.
- Keep questions specific to this chapter; avoid generic prompts like "What is the main idea?".
- If the text is not a chapter (too short, or not instructional), say so and suggest a better-fitting approach.
</constraints>

<output_format>
## Preview
Overview in 3 to 5 sentences, then key terms as a list.
## Reading plan
A table: Block | Sections | Minutes.
## Section guide
One subsection per section with "Questions while reading", "Figure focus" and "After reading (book closed)".
## Closing self-test
Numbered questions with section references, no answers.
</output_format>
