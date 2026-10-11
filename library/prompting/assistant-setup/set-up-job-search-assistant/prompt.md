---
schema: 1
id: set-up-job-search-assistant
kind: prompt
title: Set up an AI assistant for your job search
description: Sets up an AI assistant for a job search with a truthful master career record, rules against invented experience or metrics, country conventions and starter prompts for each task.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [job-seeker]
requires: [none]
inputs: [resume, text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [career-record, truthful-applications, tailored-applications, application-materials]
pairs_with:
  prompts: [build-master-resume, plan-job-search, set-up-job-application-tracker, build-project-instructions]
args:
  - name: background
    description: Your current CV, resume or master resume, or a plain list of jobs, achievements, education and skills.
    type: text
    required: true
  - name: targets
    description: The roles, sectors and countries you are applying to.
    type: text
    required: true
  - name: preferences
    description: "Optional: how you want to come across, things you will not do (for example no exaggeration), and what you want help with most."
    type: text
output_contract:
  format: markdown
  sections: [Master career record, Questions to fill gaps, Project instructions, Starter prompts, Left out, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A job search produces dozens of tailored CVs, cover letters and messages, and assistants are good at tailoring. Their main failure is invention: an inflated title, a metric nobody measured, a skill the person does not have, all of which surface in interviews or reference checks. A second failure is generic text that reads as machine-written. A master career record, the single truthful source of facts, fixes the first; the person's own phrasing and specific stories fix the second. Conventions also differ by country: CV or resume, length, photo, date of birth and other personal details are expected in some places and avoided in others.

<background>
{{background}}
</background>
<targets>
{{targets}}
</targets>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. Build the master career record from the background: each role with dates, scope and achievements; skills with the evidence for each; education and certifications. Mark any achievement without a measurable result [ADD RESULT IF TRUE]. For a regulated profession (for example nursing, teaching, law) targeting another country, note that local registration or recognition of qualifications is usually needed and must be checked with that country's regulator.
2. List questions that would fill the gaps: results, numbers, tools, team sizes, reasons for gaps or moves.
3. Write project instructions: use only facts from the master record; never add titles, numbers, skills or employers not in it; when a job ad asks for something missing, say it is a gap and suggest an honest way to address it; tailor by matching the ad's requirements to evidence; keep the user's own phrasing where possible; follow the conventions of the target country, asking if it is unclear.
4. Write starter prompts for: tailoring a CV to an ad, a cover letter, a recruiter message, interview preparation from the record, and a follow-up after an interview.
5. List what to leave out of the record and the project: national ID numbers, full address, references' contact details, salary history where the user prefers not to share it, and health or family details.
6. Give three tests, including an ad that asks for a skill the user lacks.
</task>

<constraints>
- Do not invent or round up experience, numbers, titles or dates.
- Do not state country conventions as rules that apply everywhere; name the target country's usual practice and say to check local guidance.
- Keep the project instructions under about 1,500 characters; the record goes in a file.
</constraints>

<output_format>
## Master career record
Structured by role, with [ADD RESULT IF TRUE] markers.
## Questions to fill gaps
Numbered.
## Project instructions
One fenced block, ready to paste.
## Starter prompts
Bullets.
## Left out
Bullets, or "Nothing".
## Tests
Three bullets: prompt and pass condition.
</output_format>
