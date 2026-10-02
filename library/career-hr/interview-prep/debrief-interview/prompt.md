---
schema: 1
id: debrief-interview
kind: prompt
title: Debrief an interview
description: Debriefs an interview you just had - what went well, weak answers to improve, follow-up to send and lessons for the next round. Use between interview rounds while memory is fresh.
category: interview-prep
version: 1.0.0
status: incubating
stage: [review, learn]
role: [job-seeker]
requires: [none]
inputs: [notes, transcript, text]
output: [report, rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [interview-feedback, self-reflection, star-method, next-round]
pairs_with:
  prompts: [write-interview-thank-you, prepare-star-stories, run-mock-interview]
  personas: [interview-coach]
args:
  - name: interview_recap
    description: What happened, as soon after as you can - the stage and format, who you met, each question you remember with roughly what you answered, moments that went well or badly, signals from the interviewers, what you learned about the role, and next steps they mentioned.
    type: text
    required: true
  - name: role
    description: The role and company type, and the job posting if you have it, so answers can be judged against what they are hiring for.
    type: string
output_contract:
  format: markdown
  sections: [Quick read, What went well, Answers to strengthen, What you learned about the role, Follow-up to send, Prep for the next round]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach running a debrief right after an interview. Memory of what was asked and said fades within a day, and candidates tend to fixate on one awkward moment while missing the patterns that matter for the next round: questions they did not quite answer, evidence they never mentioned, and what the interviewers revealed about their concerns. A good debrief is calm and specific: it captures the facts, separates real weaknesses from imagined ones, turns weak answers into better ones, and plans the follow-up and the next round.

<interview_recap>
{{interview_recap}}
</interview_recap>
{{#role}}Role: {{role}}{{/role}}
</context>

<task>
1. Quick read: in three sentences, how the interview seems to have gone based on the evidence in the recap, not the candidate's mood. Point out signals that are often misread (an interviewer running over time is often positive; a short interview is not always negative) without predicting the outcome.
2. What went well: the two or three moments that gave the strongest evidence for the role, and why, so the candidate repeats them.
3. Answers to strengthen: for each weak or incomplete answer (up to four, most important first), what the interviewer was probably testing, what was missing (a specific example, a result, the candidate's own role, a direct answer to the question), and a stronger answer outline using only experience in the recap or marked as [their example]. Note if the same gap shows up across answers.
4. Unanswered concerns: anything the interviewers seemed worried about (a skill gap, level, motivation, notice period) and how to address it, either in the follow-up note or the next round.
5. What you learned about the role: new information about the team, challenges, expectations and red or green flags, and questions to ask next time.
6. Follow-up to send: whether to send a thank-you note, what it should reference, and whether to use it to complete one weak answer briefly.
7. Prep for the next round: the likely format and focus based on what was said, three priorities to prepare, and the stories to have ready.
</task>

<constraints>
- Use only what is in the recap. Do not invent questions, answers or interviewer reactions; if the recap is thin, ask for the questions they remember and give the structure.
- Do not predict whether they will get an offer. Describe evidence and what is in their control.
- Be honest about weak answers but proportionate: one stumble rarely decides an interview.
- If the recap mentions questions about protected characteristics (age, family plans, health, religion, nationality), note neutrally that such questions are often inappropriate or unlawful, and suggest options without urging a confrontation.
- If the candidate is very distressed about the interview, acknowledge it briefly before the analysis.
</constraints>

<output_format>
## Quick read
## What went well
## Answers to strengthen
For each: The question, What they were testing, What was missing, Stronger answer outline.
## What you learned about the role
## Follow-up to send
## Prep for the next round
Three priorities and the stories to prepare.
</output_format>
