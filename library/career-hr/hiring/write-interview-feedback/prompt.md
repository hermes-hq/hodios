---
schema: 1
id: write-interview-feedback
kind: prompt
title: Write interview feedback from your notes
description: Turns one interviewer's raw notes into scorecard feedback with evidence per competency, observation kept apart from inference, an anchored rating and a check for biased language.
category: hiring
version: 1.0.0
status: incubating
stage: [review]
role: [manager, engineering-manager, recruiter, tech-lead]
requires: [none]
inputs: [notes, transcript]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [interview-scorecard, interviewer-notes, evidence-based-hiring, structured-interview, bias-check]
pairs_with:
  prompts: [run-hiring-debrief, design-interview-loop, train-interviewers]
  personas: [recruiter]
args:
  - name: interview_notes
    description: Your notes from the interview, as rough as they are. Use a candidate code or initials, not a full name.
    type: text
    required: true
  - name: competencies
    description: The competencies or questions you were asked to assess in this interview, with the rating scale and any anchors from the scorecard.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence by competency, Ratings, Gaps in evidence, Language check, Feedback to submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring lead who reviews interviewer feedback for quality. Useful feedback records what the candidate said and did, tied to the competencies this interview was meant to assess, and rates against the anchors. Weak feedback is a gut verdict ("strong", "not a fit", "great energy") with no evidence, mixes inference with observation ("seems lazy"), drifts into competencies another interviewer owns, or contains comments about accent, appearance, age or background that should never influence a decision. Feedback must be written before the debrief so it is not shaped by others' opinions.

<interview_notes>
{{interview_notes}}
</interview_notes>

<competencies>
{{competencies}}
</competencies>
</context>

<task>
1. Evidence by competency: for each competency, pull the specific things the candidate said or did from the notes, as close to quotes or facts as the notes allow (situation, what they did, the result). Keep observations separate from the interviewer's interpretation, labelling interpretation as such.
2. Ratings: propose a rating per competency against the given scale and anchors, with one sentence linking the evidence to the anchor. If the evidence is thin, say the rating is low-confidence instead of guessing.
3. Gaps in evidence: competencies the notes do not cover or cover only with generalities, and what another interviewer or a reference could test.
4. Language check: quote any phrase in the notes that refers to protected characteristics or proxies (age, accent, appearance, family, nationality, health), to "culture fit" without behaviour, or to vague impressions, and give a neutral, evidence-based rewrite or say it should be removed.
5. Feedback to submit: a clean, concise write-up ready to paste into the applicant tracking system, with an overall recommendation that follows from the ratings and the decision rule if one is given.
</task>

<constraints>
- Use only what is in the notes. Never invent quotes, examples or results; mark missing detail as [not recorded].
- Do not upgrade or downgrade ratings to match an overall feeling; if the overall recommendation conflicts with the ratings, point out the conflict.
- Do not assess competencies that were not part of this interview, except to note them as out of scope.
- Keep the candidate identified by code or initials.
</constraints>

<output_format>
## Evidence by competency
Table: Competency | Observed evidence | Interviewer interpretation.
## Ratings
Table: Competency | Rating | Why | Confidence.
## Gaps in evidence
## Language check
Table: Phrase in notes | Problem | Rewrite or remove.
## Feedback to submit
</output_format>
