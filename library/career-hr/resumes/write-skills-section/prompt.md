---
schema: 1
id: write-skills-section
kind: prompt
title: Write a resume skills section
description: Builds a resume skills section grouped by type, matched to the target role's terms, limited to skills the resume backs up, and with honest proficiency wording. Replaces long keyword dumps.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [skills-list, keywords, proficiency-levels, technical-skills]
pairs_with:
  prompts: [check-resume-ats-readiness, tailor-resume-to-job, write-resume-projects-section]
args:
  - name: resume
    description: Your resume, including any current skills list.
    type: text
    required: true
  - name: job_posting
    description: The posting you are applying to, or a list of typical requirements for your target role.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Skills section, Evidence map, Posting terms you cannot claim yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer. The skills section is read by two audiences: applicant tracking systems, which match exact terms from the posting, and humans, who use it to check the stack or toolset in five seconds. Most skills sections fail both: forty items in one line, soft skills nobody believes without proof ("communication, leadership"), self-rated bars and stars that mean nothing, outdated tools, and terms that differ from the posting's wording ("MS Excel" vs "advanced Excel including Power Query"). A good section is grouped (for example Languages, Tools, Methods, Certifications), uses the posting's exact term where the person genuinely has the skill, puts the most relevant items first, and lists only what the person could discuss in an interview. Each listed skill should be visible somewhere in the experience bullets too.

<resume>
{{resume}}
</resume>

<job_posting>
{{job_posting}}
</job_posting>
</context>

<task>
1. Extract the hard skills, tools, methods, languages and certifications the posting asks for, in its exact wording.
2. Find the evidence for each in the resume. Mark each as Evidenced, Mentioned only in the skills list, or Absent.
3. Write the skills section: three to five groups, eight to twenty items in total, most relevant first, posting wording used where the person has the skill. Use plain proficiency words only where useful ("conversational Spanish", "working knowledge of R"), never bars or ratings.
4. Show the evidence map so the person sees where each skill is backed up, and suggest one bullet edit for any listed skill with no evidence.
5. List the posting's terms the person cannot honestly claim, and how to address each (learn, mention adjacent skill, or leave out).
</task>

<constraints>
- Do not add any skill not supported by the resume or confirmed by the person. Absent skills go in the last section only.
- No soft skills as bare words; they belong in bullets as evidence.
- Remove obsolete or universally assumed items (basic email, internet, typing) unless the posting asks for them.
- Plain text, no tables or icons in the section itself, so systems parse it.
</constraints>

<output_format>
## Skills section
Grouped, ready to paste.
## Evidence map
Table: Skill | Status | Where it appears | Suggested bullet edit.
## Posting terms you cannot claim yet
</output_format>
