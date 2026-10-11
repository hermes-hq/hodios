---
schema: 1
id: write-statement-of-purpose
kind: prompt
title: Write a statement of purpose
description: Coaches a graduate school statement of purpose that links past work, the research or career question, fit with the programme and named faculty, and future goals.
category: studying
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student, researcher]
requires: [none]
inputs: [text, resume]
output: [outline, rewrite, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [graduate-admissions, statement-of-purpose, masters-application, phd-application, programme-fit]
pairs_with:
  prompts: [plan-phd-application, email-prospective-supervisor, prepare-recommender-packet, coach-personal-statement]
args:
  - name: programme
    description: The programme and university, the exact prompt and word or page limit, and what you know about the faculty or research groups you want to work with and why.
    type: text
    required: true
  - name: background
    description: Your relevant experience - degree, research projects, theses, jobs, publications or presentations, technical skills - with what you did yourself and what you learned. A CV is fine.
    type: text
    required: true
  - name: goals
    description: The questions or problems you want to work on, and what you want to do after the degree.
    type: text
    required: true
  - name: draft
    description: Optional your current draft, for feedback.
    type: text
output_contract:
  format: markdown
  sections: [What the committee looks for, Narrative spine, Outline, Fit paragraph, Draft feedback, Final checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A statement of purpose is not a personal statement: committees, usually faculty, read it to judge whether the applicant can do graduate-level work in this programme and whether someone there wants to supervise or teach them. They look for a clear direction (a question or problem area, not "I have always loved science"), evidence of preparation shown through what the applicant actually did on projects (the methods, the problems solved, what they would do differently), honest fit with named faculty or the programme's structure, and realistic goals. Common failures are childhood-origin openings, a CV retold in prose, flattering lists of famous professors with no link to the applicant's work, and goals too vague to evaluate. Research programmes weight research experience heavily; professional master's programmes weight career goals and practical preparation. The statement must be the applicant's own; the help here is structure, selection and feedback.
</context>

<task>
Coach this statement of purpose.

<programme>
{{programme}}
</programme>

<background>
{{background}}
</background>

<goals>
{{goals}}
</goals>
{{#draft}}
<draft>
{{draft}}
</draft>
{{/draft}}

1. Say what this committee is likely to look for given the programme type (research or professional), the prompt and the limit, and how to split the word budget.
2. Find the narrative spine: one or two sentences linking the applicant's past work to the question they want to pursue and to the programme. Offer two candidate spines if the material supports more than one direction, and ask which is true for them.
3. Outline the statement: the opening (the question or a concrete moment from their own work, not a childhood origin), one or two experience paragraphs (what they did, methods, a problem they solved, what they learned), the fit paragraph, goals, and a close. Give a word budget and a prompt question per paragraph for the applicant to write.
4. Shape the fit paragraph: link each named faculty member, lab or programme feature the applicant supplied to their own interests specifically. Tell them to check each named person is active and accepting students, and that naming two or three is usually enough.
5. If a draft is given, give feedback: where it tells instead of shows, CV repetition, vague goals, generic praise, weak opening, and edits of the applicant's own sentences to meet the limit. If no draft, say so.
6. Final checks: the prompt fully answered, every name and fact checked, the programme name correct in this version, the limit met, and a reader in the field asked to review it.
</task>

<constraints>
- Do not write the statement for the applicant. Outlines, questions and edits of their own sentences only.
- Do not invent research experience, results, publications, skills or faculty names. Use only faculty and programme details the applicant supplied, and tell them to verify those.
- Do not overstate the applicant's contribution to group work; ask what they did themselves if unclear.
- If the background does not support the stated goal, say so kindly and suggest how to address the gap honestly.
</constraints>

<output_format>
## What the committee looks for
## Narrative spine
## Outline
Paragraphs with word budgets and a question each.
## Fit paragraph
## Draft feedback
## Final checks
Checkboxes.
</output_format>
