---
schema: 1
id: answer-why-career-change
kind: prompt
title: Answer "Why are you changing careers?"
description: Prepares a convincing career-change story for interviews - why switch, why now, why you can do it - with transferable proof, how you closed the gaps and replies to doubtful follow-ups.
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [career-switch, transferable-skills, pivot-story, credibility-gap]
pairs_with:
  prompts: [reframe-for-career-change, write-tell-me-about-yourself, answer-motivation-questions]
  personas: [interview-coach]
args:
  - name: from_and_to
    description: Your previous career and the new field or role you are moving into.
    type: text
    required: true
  - name: your_story
    description: The honest reasons for the change, what triggered it, and everything you have done toward it - courses, projects, volunteering, side work, people you talked to.
    type: text
    required: true
  - name: target_role
    description: The job posting or description of the role you are interviewing for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The doubts to answer, Core answer, Transferable proof, Gaps and how you closed them, Follow-ups, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who specialises in career changers. Interviewers hiring a career changer worry about three things: is this a considered move or an escape, can this person really do the work, and will they go back or get bored. A strong answer is a pull toward the new field with a specific trigger, shows action already taken (projects, study, real exposure), and translates previous experience into evidence for the new role, not as a list of soft skills but as concrete situations. Weak answers dwell on what was wrong with the old career, claim "transferable skills" without examples, or are apologetic. Changers also have an advantage worth naming: perspective from the previous field that native candidates lack.

<from_and_to>
{{from_and_to}}
</from_and_to>

<your_story>
{{your_story}}
</your_story>
{{#target_role}}
<target_role>
{{target_role}}
</target_role>
{{/target_role}}
</context>

<task>
1. The doubts to answer: the three concerns an interviewer is most likely to have about this particular change.
2. Core answer: 60 to 90 seconds spoken, in four beats: what drew the candidate to the new field (a specific trigger), what they have done about it, what they bring from the old career that helps here, and why this role is the right next step.
3. Transferable proof: two or three situations from the old career mapped to the new role's tasks, each one sentence of evidence.
4. Gaps and how you closed them: the honest skill gaps, what the candidate has already done, and how to say "I am still building X" with a plan.
5. Follow-ups: short replies to "Why not stay where you were?", "Aren't you taking a step back in pay or level?", "What if you don't like it?" and one question specific to this move.
6. Avoid: three phrases to avoid, with better alternatives.
</task>

<constraints>
- Use only the candidate's facts. Mark missing projects, courses or results as [placeholder]; never invent them.
- Frame reasons as a pull toward the new work; negative reasons about the old field may appear only briefly and neutrally.
- Do not overclaim readiness. If the gap to the target role is large, say so and suggest a more realistic entry role or what to add first.
- Keep the core answer under about 200 words.
</constraints>

<output_format>
## The doubts to answer
## Core answer
The script, then "Words: N".
## Transferable proof
## Gaps and how you closed them
## Follow-ups
## Avoid
</output_format>
