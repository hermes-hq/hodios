---
schema: 1
id: write-why-this-college-essay
kind: prompt
title: Write a "why this college" essay
description: Coaches a "why this college" or "why this major" supplemental essay from the student's own research and goals, specific to the school, in their voice and within the word limit.
category: studying
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student]
requires: [none]
inputs: [text, preferences]
output: [outline, rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [supplemental-essay, college-admissions, why-us-essay, school-research, word-limit]
pairs_with:
  prompts: [coach-personal-statement, plan-university-application, write-college-activities-list]
args:
  - name: prompt_and_limit
    description: The school's exact essay prompt and word limit.
    type: text
    required: true
  - name: school_research
    description: Specific things you found about the school that genuinely draw you - courses, programmes, professors' work, clubs, traditions, structure of the curriculum, what students told you on a visit - each with why it matters to you.
    type: text
    required: true
  - name: about_me
    description: Your interests, experiences and goals that connect to those things - what you have done, what you want to study and why.
    type: text
    required: true
  - name: draft
    description: Optional your draft, for feedback and tightening.
    type: text
output_contract:
  format: markdown
  sections: [What the prompt is testing, Your strongest fit points, Outline, Draft feedback, Specificity check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Admissions readers see thousands of "why us" essays that could be about any school: praise for "world-class faculty", "diverse community" and "beautiful campus", or a list of facts copied from the website. The essays that work pass the swap test (they could not be sent to another school by changing the name) and the "so what" test (each detail is tied to something the student has done or wants to do). Strong essays pick two or three specific connections and go deep rather than listing ten, and show how the student would take part, not just what the school offers. Admissions offices expect the student's own voice and many state that the essay must be the applicant's own work, so the help here is coaching: choosing material, structure and feedback, not a ghostwritten essay.
</context>

<task>
Coach this supplemental essay.

<prompt_and_limit>
{{prompt_and_limit}}
</prompt_and_limit>

<school_research>
{{school_research}}
</school_research>

<about_me>
{{about_me}}
</about_me>
{{#draft}}
<draft>
{{draft}}
</draft>
{{/draft}}

1. Say what the prompt is testing (why the school, why the major, or both; whether it asks about community or academics) and how the word limit shapes the essay (a 150-word answer has room for one or two connections; 400 words for three).
2. Pick the strongest fit points: pair each specific school detail with a specific thing from the student's experience or goals. Rank them and drop generic ones ("great reputation", "beautiful campus") with the reason.
3. Give an outline: an opening rooted in the student's own interest or experience, two or three connection paragraphs (detail, why it matters to the student, what they would do with it), and a close looking forward. Give a word budget per part and one prompt question per paragraph for the student to answer in their own words.
4. If a draft is given, give feedback: what works, where it is generic, where it lists without connecting, sentences that could fit any school, and line-level cuts to meet the limit. Suggest rewrites of specific sentences only by tightening the student's own words. If no draft is given, say so and invite the student to write one from the outline.
5. Run the specificity check: the swap test, the "so what" test for each detail, accuracy of names and facts to verify on the school's site, and the word count.
</task>

<constraints>
- Do not write the essay for the student. Outlines, questions and edits of the student's own sentences only.
- Use only school details the student supplied. Do not add courses, professors, programmes or facts about the school; tell the student to verify every named detail on the school's current pages.
- Do not invent experiences or achievements for the student.
- Keep the student's voice; do not replace plain language with inflated vocabulary.
</constraints>

<output_format>
## What the prompt is testing
## Your strongest fit points
A table: School detail | Your connection | Keep or drop.
## Outline
Parts with word budgets and a question each.
## Draft feedback
## Specificity check
Checkboxes.
</output_format>
