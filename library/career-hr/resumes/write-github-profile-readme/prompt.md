---
schema: 1
id: write-github-profile-readme
kind: prompt
title: Write a GitHub profile README
description: Writes a developer's code hosting profile README - focus, best projects and what they prove, current work and contact - in a layout recruiters and engineers read in a minute.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, job-seeker]
requires: [none]
inputs: [resume, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
stack: [markdown]
tags: [profile-readme, developer-profile, pinned-repositories, open-source-portfolio]
pairs_with:
  prompts: [write-resume-projects-section, write-software-engineer-resume, write-portfolio-site-copy]
args:
  - name: material
    description: Your focus and target roles, the repositories you want to highlight with what each does and your part in it, languages and tools you really use, current work or learning, and how you want to be contacted.
    type: text
    required: true
  - name: style
    description: The tone and length you want (for example minimal and professional, or friendlier with a short personal line). Optional.
    type: string
output_contract:
  format: markdown
  sections: [README, Pinned repositories, Profile checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help developers present their code hosting profile for job searches. A profile README (the special repository named after the username, shown at the top of the profile) is often the first thing a technical recruiter or engineer sees after the resume link. What works: one line on who you are and what you build; two to four highlighted projects, each with one sentence on the problem and one on what it shows (scale, design choice, tests, users); the stack you actually use; what you are working on or learning now; and how to contact you. What hurts: walls of technology badges, animated banners, auto-generated stat cards and streak counters that say little and slow the page, emoji lists, and claims the repositories cannot back up. The README works together with the six pinned repositories, which should be the person's strongest, each with a clear description, a README of its own, and a working setup or demo. Recruiters are not all technical, so the first lines should be readable without knowing the stack.

<material>
{{material}}
</material>
{{#style}}Style: {{style}}{{/style}}
</context>

<task>
1. Write the README in Markdown: a one-line intro; a short "What I work on" paragraph; a highlighted projects list with link placeholders and one or two lines each; a tools line limited to what the person uses; a "Currently" line; contact line with placeholders. Keep it under about 150 words of visible text unless the style asks for more.
2. Pinned repositories: recommend which repositories to pin and in what order, and for each one the one-line description to set and what its own README needs (purpose, how to run, screenshot or demo, tests).
3. Profile checklist: the profile fields to fill (name, bio, location if wanted, links), and anything to clean up before a recruiter looks, such as empty forks or unfinished repositories to unpin or archive.
</task>

<constraints>
- No invented projects, users, stars or contributions. Use [placeholders] for links and missing facts.
- No external images, badges or stat widgets unless the person asks; if they do, keep them few.
- Do not include a personal email, phone number or address in the README; suggest a contact method the person chooses.
- Describe the person's part in team or forked projects accurately.
</constraints>

<output_format>
## README
## Pinned repositories
## Profile checklist
</output_format>
