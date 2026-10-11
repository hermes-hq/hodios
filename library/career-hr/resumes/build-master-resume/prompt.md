---
schema: 1
id: build-master-resume
kind: prompt
title: Build a master resume
description: Builds a long master resume holding every role, project, result and skill with its evidence, so each tailored resume is cut from it in minutes. Interviews you to fill the gaps.
category: resumes
version: 1.0.0
status: incubating
stage: [plan, build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes, document]
output: [rewrite, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [master-document, achievement-inventory, evidence-bank, reusable-content]
pairs_with:
  prompts: [tailor-resume-to-job, rewrite-resume-bullets, write-brag-document]
  personas: [resume-writer]
args:
  - name: materials
    description: Everything you have - old resumes, LinkedIn text, performance reviews, project lists, award notes. Rough and duplicated is fine.
    type: text
    required: true
  - name: target_directions
    description: The one to three kinds of role you expect to apply for, so achievements can be tagged for each. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Master resume, Evidence gaps, Tag index, How to cut a version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer setting up a master resume: a private, deliberately long document (often six to ten pages) that is never sent to anyone. It holds every role with full dates, every achievement written as a finished bullet with its source of proof, alternative phrasings for different audiences, and every skill, certification, course, publication and volunteer role. Experienced job seekers use it because tailoring from a two-page resume means rewriting from memory each time, and memory loses numbers. A good master resume is organised for cutting: each bullet stands alone, carries the figures and how they are known, and is tagged with the role types it serves.

<materials>
{{materials}}
</materials>
{{#target_directions}}Likely target directions: {{target_directions}}{{/target_directions}}
</context>

<task>
1. Merge and deduplicate the materials into one chronology. Where sources disagree on dates or titles, list both and flag the conflict rather than choosing.
2. For each role write: employer, location, exact title(s), start and end month and year, a one-line context (team size, what the organisation does) and every achievement as a finished bullet. Keep all variants that are genuinely different; merge true duplicates.
3. After each bullet, add in brackets the source of the figure ("performance review 2024", "own estimate") so the person knows what they can defend.
4. Collect sections for skills (grouped, with where each was used), certifications with dates, education, training, publications or talks, volunteering, languages, awards.
5. Ask questions for the biggest gaps, a few at a time: roles with no results, results with no numbers, missing dates. Update the document as answers arrive.
6. Tag each bullet with short labels for the target directions (for example [ops] [people] [finance]) and build an index.
</task>

<constraints>
- Never invent results, numbers, dates or titles. Gaps stay as [placeholders] with a question.
- Keep conflicting facts visible until the person resolves them; background checks compare dates and titles.
- Length is not a problem here; completeness and accuracy are. Do not trim achievements because they seem small.
- Ask no more than five questions per turn.
</constraints>

<output_format>
## Master resume
Full document in markdown, newest role first.
## Evidence gaps
Table: Item | What is missing | Question.
## Tag index
Each tag with the bullets that carry it.
## How to cut a version
Five short steps for producing a two-page tailored resume from this document.
</output_format>
