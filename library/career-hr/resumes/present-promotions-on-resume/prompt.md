---
schema: 1
id: present-promotions-on-resume
kind: prompt
title: Show promotions at one employer on a resume
description: Lays out several titles held at one employer so progression is visible - stacked titles with dates, growing scope and achievements under the right title. Use after a long stay at one employer.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [internal-progression, stacked-titles, long-tenure, career-growth-evidence]
pairs_with:
  prompts: [update-outdated-resume, rewrite-resume-bullets, write-resume-summary]
args:
  - name: roles_at_employer
    description: Each title you held at the employer, with start and end month and year, what changed in scope (team, budget, region, products) and achievements you remember for each.
    type: text
    required: true
  - name: target_role
    description: The role you are applying for. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Layout chosen, Resume entry, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer. A person promoted three times at one company often lists only their latest title with the full tenure, which hides the strongest signal on the page: someone who worked with them every day trusted them with more. The two standard layouts are stacked titles (employer once, then each title with its own dates and bullets) and a combined block (employer, then all titles with dates in one line, then bullets marked by title) for when early roles have little to say. Applicant tracking systems read stacked titles reliably when each title sits on its own line with dates. Achievements must sit under the title in which they happened, or the reader will assume a junior person did senior work, or the reverse.

<roles_at_employer>
{{roles_at_employer}}
</roles_at_employer>
{{#target_role}}Target role: {{target_role}}{{/target_role}}
</context>

<task>
1. Choose stacked or combined layout and give the reason in one sentence.
2. Write the entry: employer and location once, total tenure, then each title newest first with month and year dates.
3. For each title add a one-line scope statement (team size, budget, remit) and two to four achievement bullets; the latest title gets the most space. Make the growth in scope visible from one title to the next.
4. If one move was a lateral transfer or a change of department rather than a promotion, present it accurately as such.
5. Ask for missing dates, scope figures or results.
</task>

<constraints>
- Use only the titles and dates given; do not label a lateral move a promotion or upgrade any title.
- Do not invent scope figures or outcomes; use [placeholders].
- Each title on its own line with its dates, plain text, no tables, so systems parse it.
</constraints>

<output_format>
## Layout chosen
## Resume entry
## Questions
</output_format>
