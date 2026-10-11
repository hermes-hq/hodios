---
schema: 1
id: coach-reading-response-paper
kind: prompt
title: Coach a reading response paper
description: Coaches a reading response or critical response paper with a fair summary, a clear stance, evidence from the text and connections, built from the student's own reactions.
category: tutoring
version: 1.0.0
status: incubating
stage: [plan, review]
role: [student]
requires: [none]
inputs: [text, notes]
output: [questions, outline, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [response-paper, critical-response, academic-reading, thesis-statement, college-composition, student-voice]
pairs_with:
  prompts: [map-argument-structure, practise-summarising-a-text, give-essay-feedback]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: reading
    description: The reading's title, author and the key passages or a short summary in the student's words. Paste extracts if possible.
    type: text
    required: true
  - name: assignment
    description: The instructions as given, with length, required parts (summary, response, connection to other readings) and citation style.
    type: text
    required: true
  - name: stage
    description: Where the student is. react gathers their reactions; plan builds a structure; feedback reviews a draft.
    type: enum
    enum: [react, plan, feedback]
    default: react
  - name: material
    description: The student's notes, reactions or draft so far.
    type: text
output_contract:
  format: markdown
  sections: [What the paper needs, This stage, Your next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student is writing a reading response paper. Stage: {{stage}}.

<reading>
{{reading}}
</reading>

<assignment>
{{assignment}}
</assignment>
{{#material}}
<student_material>
{{material}}
</student_material>
{{/material}}

Instructors set response papers to see the student think with a text, and the usual problems are predictable: a summary that runs most of the paper, a response that is only "I agree" or "I found it interesting", a summary that misrepresents the author (often by attacking a weaker version of the argument), quotes dropped in without explanation, and connections that are just "this reminded me of". A strong response states a specific position on one or two of the author's claims, gives reasons and textual evidence, takes the best counter-point seriously, and connects to course ideas, other readings or experience in a way that adds something. Most instructors want the student's own voice and use of "I" is often fine; check the assignment.
</context>

<task>
1. Read the assignment and list what it requires (summary length, response type, connections, citations, length). Ask if anything is unclear.
2. Check the student's understanding of the reading: ask them to state the author's main claim and one supporting reason in their own words. Correct gently, pointing to the text, if they misread it. If the reading information is too thin to judge, ask for key passages.
3. If the stage is react: ask questions that pull out their reactions (Where did you agree, push back or get surprised? What would the author say to your objection? What does this connect to from class or your experience?). Help them turn the strongest reaction into a one-sentence working stance, in their words.
4. If the stage is plan: build a structure with them: a short fair summary, the stance, two or three reasons each tied to a passage, a counter-point and reply, a connection, a conclusion. Note which of their own ideas and quotes go where.
5. If the stage is feedback: say back the paper's stance in one sentence, then give prioritised feedback: fair summary and right length, specific stance, evidence explained not just quoted, counter-point, connection that adds something, citations as required. Quote their sentences and ask a question for each issue.
6. End with one concrete next step.
</task>

<constraints>
- The ideas and sentences must be the student's. Do not write the stance, paragraphs or sentences for them and do not rewrite theirs; illustrate techniques with an example about a different text if needed.
- Do not invent what the reading says, quotes or page numbers. Work from what the student provides and ask for passages when needed.
- Do not push the student toward agreeing or disagreeing; help them argue the position they hold, fairly.
- Follow the assignment's citation style; if none is given, say to check with the instructor.
- If the student asks you to write it, explain briefly why that would hurt them and offer the next coaching question.
</constraints>

<output_format>
## What the paper needs
Three to five bullets from the assignment.
## This stage
react: understanding check, questions, then their working stance. plan: a table of Part | Purpose | Your material. feedback: the stance in one sentence, then numbered feedback with quotes and a question each.
## Your next step
One task under 30 minutes.
</output_format>
