---
schema: 1
id: write-grade-appeal
kind: prompt
title: Write a grade appeal or regrade request
description: Drafts a student's regrade request or course-level grade appeal to the instructor that cites the rubric, states what is contested and why, and follows the course's process.
category: studying
version: 1.0.0
status: incubating
stage: [review]
role: [student]
requires: [none]
inputs: [text, document]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [regrade-request, rubric, marking-error, instructor-email, coursework-marks]
pairs_with:
  prompts: [act-on-marked-feedback, self-check-draft-against-rubric, appeal-university-decision]
args:
  - name: assessment_and_feedback
    description: The assessment, the mark and the feedback received, and the rubric or mark scheme. Paste the relevant parts of your answer if the dispute is about specific questions.
    type: text
    required: true
  - name: dispute
    description: What you think was marked wrongly and why, question by question or criterion by criterion.
    type: text
    required: true
  - name: policy
    description: Optional regrade rules from the syllabus - the window (for example "within 7 days"), how to submit, whether the whole work can be re-marked up or down.
    type: text
output_contract:
  format: markdown
  sections: [Is this worth contesting, Points to contest, Regrade request, What to attach, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regrade requests succeed when they point to something checkable: an addition error, a correct answer marked wrong, a part of the answer the marker missed, or the rubric applied inconsistently with what it says. They fail when they argue effort ("I worked really hard"), compare with a friend's mark without specifics, or ask for points without saying where. Many courses have a short window and a set process, and some re-mark the whole piece, so the mark can go down as well as up. This is the first, informal stage with the instructor or teaching assistant; formal university appeals against a final grade have narrower grounds and their own deadlines.
</context>

<task>
Help the student decide whether to ask for a regrade and draft the request.

<assessment_and_feedback>
{{assessment_and_feedback}}
</assessment_and_feedback>

<dispute>
{{dispute}}
</dispute>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Judge whether it is worth contesting: for each point, classify it as a clear error (arithmetic, a correct answer marked wrong, a missed section), a rubric mismatch (the work meets a band's wording but got a lower band), or a judgement difference (the marker's view of quality). Say plainly which are strong and which are weak, and warn if the policy allows the mark to go down.
2. For each point worth contesting, set out the evidence: the rubric or mark-scheme wording, where in the student's answer it is met, and the points at stake.
3. Draft a short, respectful request in the process the policy names (email, form or portal): the assessment, each point with its evidence and the change requested, and an offer to discuss in office hours. No emotional appeals or comparisons with other students.
4. List what to attach or reference: the marked work, the rubric, page or question numbers.
5. Say what to do if the answer is no: accept and use the feedback, ask for clarification of the standard to apply next time, or, for a final course grade where a procedural error is involved, check the institution's formal academic appeal process and its deadline.
</task>

<constraints>
- Do not invent rubric wording, policy rules or deadlines. If no policy is given, tell the student to check the syllabus for the window and process.
- Do not include points the student cannot support with the rubric or their answer; leave weak points out and say why.
- Do not exaggerate or misstate what the student's answer says.
- Keep the request under about 250 words unless several questions are involved.
</constraints>

<output_format>
## Is this worth contesting
A table: Point | Type | Strength | Points at stake.
## Points to contest
## Regrade request
## What to attach
## If the answer is no
</output_format>
