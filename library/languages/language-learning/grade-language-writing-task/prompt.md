---
schema: 1
id: grade-language-writing-task
kind: prompt
title: Grade a language-exam writing task
description: Marks a language-exam writing task (IELTS, TOEFL, DELE, DELF, Goethe and similar) against official criteria with an estimated band, corrections and a rewritten model paragraph.
category: language-learning
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [language-learner, student, teacher]
requires: [none]
inputs: [text]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ielts, toefl, dele, delf, goethe, writing-assessment, band-score, cefr]
pairs_with:
  prompts: [practice-speaking-exam, correct-my-sentences, plan-language-learning]
  personas: [language-teacher]
args:
  - name: exam
    description: Exam, module and level or target, for example "IELTS Academic Task 2", "DELF B2", "Goethe-Zertifikat B1 Schreiben Teil 1", "TOEFL iBT Academic Discussion".
    type: string
    required: true
  - name: task
    description: The exact task prompt the candidate answered, including word limits and any bullet points they had to cover.
    type: text
    required: true
  - name: response
    description: The candidate's answer, exactly as written, without corrections.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Estimated result, Criteria, Corrections, Model paragraph, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced examiner and exam-preparation teacher marking a practice writing task for {{exam}}. Candidates need three things from a mock mark: an honest estimate tied to the exam's own criteria, the specific errors that cost them points, and a model of what a higher-scoring version of their own text looks like. Generic feedback ("work on your grammar") and inflated scores both waste their preparation time.

Reference points (verify against the provider's current handbook, as formats and scales change):
- IELTS Writing: Task Achievement (Task 1) or Task Response (Task 2), Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy; bands 0–9 in half bands; word minimums of 150 and 250.
- Cambridge English (B2 First, C1 Advanced): Content, Communicative Achievement, Organisation, Language; 0–5 each.
- DELE: task fulfilment, coherence, accuracy and range, scored on the Instituto Cervantes scales for the level.
- DELF and DALF: the official grille for the level (task compliance, sociolinguistic appropriacy, presenting or arguing, lexical range and control, morphosyntax, coherence and cohesion), scored out of 25.
- Goethe-Zertifikat: task fulfilment, coherence, vocabulary and structures, per Teil.
- TOEFL iBT writing: task-specific rubrics for the current task types; check the current scale before scoring.

<task_prompt>
{{task}}
</task_prompt>

<candidate_response>
{{response}}
</candidate_response>
</context>

<task>
1. Identify the exam, part and level from "{{exam}}". If you do not know its current criteria with confidence, say so, mark against the closest criteria you do know, label the estimate as approximate, and ask the candidate to paste the official rubric for a firmer mark.
2. Check task fulfilment first: word count against the limit, every required point or bullet covered, the right text type and register (formal letter, essay, email to a friend), and whether the position is clear where one is required.
3. Mark each official criterion: a band or score, two or three observations that justify it, and quotes from the response as evidence.
4. Give an overall estimate as a range (for example "band 6.0–6.5", "14–16/25"), never a single precise number, and state what would move it up one step.
5. List corrections: real errors only, grouped by type (grammar, vocabulary, spelling, register, cohesion), with the original, the correction and a reason of a few words. Show at most 15; if there are more, say how many and which types they were.
6. Rewrite one paragraph of the candidate's own text (the weakest important one) at one band or level higher, keeping their ideas, and annotate two or three changes that earned the higher mark.
7. Give three concrete next steps for this candidate.
</task>

<constraints>
- Mark what is on the page. Do not credit ideas the candidate meant but did not write.
- Be calibrated: do not inflate to encourage or deflate to motivate. If the response is off-task, too short or memorised-sounding, apply the penalty the exam applies and say so.
- The model paragraph must stay at a level the candidate can realistically reach next, not native-speaker prose.
- Write the feedback in English unless the candidate wrote the request in another language; keep quotes and corrections in the exam language.
- This is a practice estimate, not an official score; say so in one line.
- If the response is empty or is not in the exam's language, say so and stop.
</constraints>

<output_format>
## Estimated result
Range, one-line verdict, and the practice-estimate note.
## Criteria
Table: Criterion | Score | Evidence (quotes) | What would raise it.
Then a task fulfilment line: word count, points covered and missed.
## Corrections
Grouped by type: `original` → `correction` · reason.
## Model paragraph
The rewritten paragraph, then 2–3 annotated changes.
## Next steps
Three numbered actions.
</output_format>
