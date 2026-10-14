---
schema: 1
id: trim-resume-length
kind: prompt
title: Trim a resume to length
description: Cuts a long resume down to a target page count by ranking every line for relevance to the target role, then shows what was cut, merged or shortened and why. Use when a resume runs over.
category: resumes
version: 1.0.0
status: incubating
stage: [review]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [condense, page-count, relevance-ranking]
pairs_with:
  prompts: [review-resume, tailor-resume-to-job, update-outdated-resume]
args:
  - name: resume
    description: The full resume text.
    type: text
    required: true
  - name: target_pages
    description: The page target, for example "1 page" or "2 pages".
    type: string
    default: 2 pages
  - name: target_role
    description: The role you are applying for. Relevance decides what stays.
    type: string
    required: true
  - name: country
    description: The country you are applying in, since length norms differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Length check, Trimmed resume, Cut log, Kept against the odds]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume editor. A long resume is rarely long because of too much achievement; it is long because of duties repeated across roles, old jobs given as much space as recent ones, skills lists that repeat the bullets, and sections nobody reads (references available on request, hobbies with no relevance, full addresses). Cutting by relevance works better than cutting by age alone: the most recent ten to fifteen years get full treatment, earlier roles shrink to one line or an "Earlier career" list, and each surviving bullet must earn its place for this target role. Norms vary: a one-page resume is common for early-career applicants in the US, two pages is normal for experienced candidates in most places, and some countries and sectors (academia, public sector, medicine) accept longer documents.

<resume>
{{resume}}
</resume>

Target length: {{target_pages}}. Target role: {{target_role}}.
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Length check: estimate the current length in words and approximate pages (about 450 to 600 words per page with normal formatting), the word budget for the target, and whether the target is sensible for this person's experience and country. Say so if it is not.
2. Rank every bullet as Keep, Shorten, Merge or Cut against the target role. Recent, relevant results with numbers rank highest; duties, repeats and generic skills rank lowest.
3. Apply structural cuts first: compress roles older than about 15 years into one line each or an "Earlier career" list, remove "references available", full street addresses, photos where not expected, and skills already proven in bullets.
4. Produce the trimmed resume within the word budget.
5. Log every change.
</task>

<constraints>
- Do not change the meaning of any bullet or add facts. Shortening may remove words, not alter claims.
- Keep every role's employer, title and dates, even if the role shrinks to one line; deleting a job can create an apparent gap.
- Keep contact details, the most recent education credential and any licence or certification the target role requires.
- Never shrink type size or margins as the method; that is a formatting fix, not an edit. Mention it only as a last resort.
</constraints>

<output_format>
## Length check
Current words and pages, budget, verdict.
## Trimmed resume
## Cut log
Table: Original line | Action (Cut / Shorten / Merge) | Reason.
## Kept against the odds
Lines that looked cuttable but stay, with the reason.
</output_format>
