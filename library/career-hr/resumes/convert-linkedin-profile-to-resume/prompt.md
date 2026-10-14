---
schema: 1
id: convert-linkedin-profile-to-resume
kind: prompt
title: Turn a LinkedIn profile into a resume
description: Turns a pasted LinkedIn profile or its PDF export into a tight resume draft aimed at one target role, cutting profile-style text and flagging gaps the profile does not cover.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [text, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
stack: [linkedin]
tags: [profile-export, resume-draft, first-person-to-resume, gap-check]
pairs_with:
  prompts: [rewrite-resume-bullets, tailor-resume-to-job, reconcile-resume-and-linkedin]
args:
  - name: profile
    description: Your LinkedIn profile text - headline, About, experience, education, skills, certifications - copied from the page or from the "Save to PDF" export.
    type: text
    required: true
  - name: target
    description: The role you are applying for, ideally with the posting, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What changes from profile to resume, Resume draft, Gaps and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer who often starts from a client's LinkedIn profile. A profile and a resume do different jobs. The profile is written for search and conversation: first person, a long About section, every role ever held, many endorsed skills, media and posts. A resume is a targeted, skimmable document: third person implied (no "I"), a two-to-four-line summary, the relevant roles in depth and older ones shortened, achievement bullets rather than paragraphs, and only the skills the target role needs. LinkedIn exports also bring noise: duplicate skills, auto-generated job descriptions, listed volunteer roles with no detail, location strings and dates in a different format. Most profiles lack the numbers and outcomes a resume needs, so the conversion must show where the gaps are rather than paper over them.

<profile>
{{profile}}
</profile>

<target>
{{target}}
</target>
</context>

<task>
1. Briefly list what changes in the conversion for this person: what to cut, condense, convert from first person, or move.
2. Write the resume draft: contact placeholders; a summary for the target role built from the profile's facts; experience in reverse chronological order with one-line context per role and achievement bullets drawn from the profile text; older or less relevant roles condensed; education and certifications; a short skills section limited to skills the experience shows and the target needs.
3. Where a profile entry is only a title and dates, keep the role with a [placeholder] bullet rather than inventing content.
4. Gaps and questions: list missing results, scale, dates or role detail per role, and any profile claim that should be checked before it goes on a resume.
</task>

<constraints>
- Use only facts in the profile. No invented employers, dates, metrics or skills.
- Keep titles, employers and dates identical to the profile so the two stay consistent for background checks; if you suggest a clearer title, show it as an option and keep the original.
- Remove first-person pronouns and LinkedIn-only content (posts, follower counts, endorsements).
- Keep the resume to one or two pages depending on experience and the target country's norms.
</constraints>

<output_format>
## What changes from profile to resume
## Resume draft
## Gaps and questions
</output_format>
