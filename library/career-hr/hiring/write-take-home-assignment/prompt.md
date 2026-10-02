---
schema: 1
id: write-take-home-assignment
kind: prompt
title: Design a take-home assignment
description: Designs a fair take-home or work-sample task with realistic scope, a time box, a scoring rubric, accommodations and what candidates receive afterwards. Use when adding a work sample to hiring.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [manager, engineering-manager, recruiter, founder]
requires: [none]
inputs: [spec, job-posting, text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [work-sample, take-home, scoring-rubric, candidate-experience, accommodations]
pairs_with:
  prompts: [design-interview-loop, write-job-description, write-candidate-rejection]
  personas: [recruiter]
  workflows: [hiring-track]
args:
  - name: role
    description: The role and level, the team, and what the person will actually do in their first months.
    type: text
    required: true
  - name: skills_to_assess
    description: The two to four skills the task must give evidence of, and which other stages already cover. Rough notes are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design choices, Candidate brief, Materials to prepare, Scoring rubric, Reviewer guide, Fairness and accommodations, After the task]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design work-sample assessments for hiring teams. A well-designed work sample is one of the better predictors of job performance, because it shows how someone does the actual work. Badly designed ones cost candidates whole weekends, favour people with free time over people with caring responsibilities or second jobs, test trivia instead of the job, and are scored by gut feeling. Some candidates also worry, sometimes rightly, that their work will be used for free. A fair task is short, realistic, clearly briefed, scored against anchors written before anyone submits, and followed by a conversation where the candidate explains their choices.

<role>
{{role}}
</role>

<skills_to_assess>
{{skills_to_assess}}
</skills_to_assess>
</context>

<task>
1. Design choices: pick the format and justify it in a few sentences: a take-home with a strict time box, a live working session, or a review or critique of existing material (often the fairest and shortest option). Explain how it complements the other stages and why it tests the stated skills rather than something else.
2. Candidate brief: write the brief exactly as candidates will receive it: realistic scenario using fictional data, the task, what to deliver and in what form, the time box (aim for two hours; never more than four without paying candidates), what will not be judged (for example polish, perfect formatting, full test coverage), whether tools and AI assistants may be used and how to disclose their use, how and when to submit, and the follow-up discussion.
3. Materials to prepare: the fictional data, files, starter code or documents the team must create, kept small and self-contained.
4. Scoring rubric: three to five criteria tied to the skills, each with anchors for 1 (concern), 2 (below the bar), 3 (meets the bar) and 4 (strong), written before any submission arrives, and a pass rule.
5. Reviewer guide: how to score independently before discussing, how to avoid rewarding time spent over quality, how to handle partial submissions, and five follow-up questions for the debrief conversation that test understanding and decision-making.
6. Fairness and accommodations: a flexible deadline window (for example any time within a week), alternative formats on request (live session instead of take-home, extra time), accessibility of materials, and a note on not penalising candidates who could not use all the time.
7. After the task: what candidates receive (acknowledgement within a set number of days, a decision, brief feedback against the rubric where possible), and a statement that their work will not be used commercially.
</task>

<constraints>
- The task must mirror real work in the role at the stated level, using fictional data and no real customer information or unsolved company problems.
- Do not ask for unpaid work the company could use. If the task resembles real deliverables, change the scenario.
- Keep the expected effort honest: estimate the time a competent candidate at this level would need and adjust scope until it fits the time box.
- If the skills to assess are vague or already covered by other stages, say so and propose a better focus or no take-home at all.
</constraints>

<output_format>
## Design choices
## Candidate brief
The brief ready to send.
## Materials to prepare
## Scoring rubric
Table: Criterion | 1 | 2 | 3 | 4. Then the pass rule.
## Reviewer guide
## Fairness and accommodations
## After the task
</output_format>
