---
schema: 1
id: write-a-resume
kind: prompt
title: Write a resume or CV
description: Writes a resume or CV from scratch or from an old one, asking the target role, your experience and the country you apply in, with achievement bullets, local conventions and no invented facts.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, individual, student]
requires: [none]
inputs: [resume, text, job-posting]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [job-application, ats, achievements, first-job, career-change, lebenslauf]
pairs_with:
  prompts: [tailor-resume-to-job, review-resume, quantify-resume-achievements, convert-cv-to-country-format]
  personas: [resume-writer]
args:
  - name: target_role
    description: The job or field you are applying for, or paste a job ad, for example "junior data analyst", "nursing assistant", "any office admin role".
    type: text
  - name: experience
    description: Your old CV, or your jobs, studies, projects and volunteering with dates and what you did. Rough notes are fine.
    type: text
  - name: region
    description: The country or region you are applying in, which changes the format (for example US resume, UK CV, German Lebenslauf).
    type: text
output_contract:
  format: markdown
  sections: [Your resume, What I assumed, Make it stronger, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes that get interviews. Most resumes list duties ("responsible for…") instead of results, are aimed at no job in particular, use layouts that applicant tracking systems cannot read, and ignore local conventions. Model-written ones add a worse problem: invented numbers, skills and titles that the person then has to defend in an interview. A good resume is aimed at one kind of role, shows results with real evidence, reads cleanly by machine and by a person in 30 seconds, and follows the norms of the country.

{{#target_role}}Target role: <target_role>{{target_role}}</target_role>
{{/target_role}}{{#experience}}Experience:
<experience>
{{experience}}
</experience>
{{/experience}}{{#region}}Applying in: {{region}}
{{/region}}</context>

<task>
1. You need the target role and their experience. If both are given, write it; assume what is missing (international English conventions, one or two pages, no photo or personal details) and say so. If either is missing, ask 2–3 short numbered questions, each with an example answer, for example:
   1. What job or field are you applying for? Pasting a job ad is even better. *e.g. "customer support team lead"*
   2. What have you done so far? Paste your old CV, or list jobs, studies and projects with dates. *e.g. "2021–now, cashier at a supermarket, train new staff"*
   3. Which country are you applying in? *e.g. "Canada"*
   Then stop and wait.
2. Choose the format: reverse-chronological by default; a skills-first layout only for career changers or long gaps, and say why. Apply the country's norms: page length, whether to include a photo, date of birth or address (leave them out in the US, UK, Canada and Australia), resume vs CV naming, and date formats.
3. Write a 2–3 line summary aimed at the target role, using their strongest real evidence.
4. Rewrite each role as 3–5 bullets: action, what they did, and the result. Use numbers only when they gave them; otherwise add a [placeholder] such as "[how many customers a day?]" so they can fill it in honestly. Put the most relevant role and bullets first.
5. Add skills, education, and certifications or volunteering when relevant. Keep only skills their experience supports.
6. Make it machine-readable: standard section headings, no tables, columns, icons or graphics, and plain dates.
7. List what would make it stronger: the placeholders to fill, missing evidence, and gaps an interviewer may ask about with an honest way to address them.
</task>

<constraints>
- Never invent or upgrade employers, titles, dates, degrees, certifications, skills or numbers. If they ask you to, decline briefly and offer an honest framing (for example "coursework toward a degree" or "acting team lead").
- Use plain, active language; no clichés like "hard-working team player" without evidence.
- Length: one page for under about ten years of experience in resume-style countries; two at most unless it is an academic CV.
- Keep their personal data minimal and do not repeat it back outside the resume itself.
</constraints>

<output_format>
## Your resume
The full resume in clean Markdown, ready to paste into a document: name and contact line, summary, experience, education, skills, other sections.

## What I assumed
Bullets: format, country norms, anything inferred.

## Make it stronger
Checklist of placeholders to fill and evidence to add.

## Next steps
One line offering: Tailor a resume to a job, Review a resume, Quantify resume achievements, Convert a CV to another country's format.
</output_format>
