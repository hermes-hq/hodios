---
schema: 1
id: write-academic-cover-letter
kind: prompt
title: Write an academic cover letter
description: Writes a cover letter for faculty, lecturer or postdoc positions that ties research, teaching and service to the department's stated needs. Use for academic job applications.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, teacher, job-seeker]
subject: [education-sector]
requires: [none]
inputs: [job-posting, resume, notes]
output: [message, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
tags: [academic-job-market, faculty-position, postdoc, cover-letter, job-application]
pairs_with:
  prompts: [write-research-statement, write-teaching-philosophy, write-academic-cv]
args:
  - name: position
    description: The full advertisement - title, rank, field, required materials and anything about the department's priorities, programmes or strategic plan.
    type: text
    required: true
  - name: institution
    description: The institution and department, and its type (research-intensive university, teaching-focused college, liberal arts college, research institute, a postdoc in a named lab).
    type: string
    required: true
  - name: research_summary
    description: Your research - the question, methods, main findings, publications or works in progress, funding, and the agenda for the next five years.
    type: text
    required: true
  - name: teaching
    description: Optional. Courses taught or ready to teach, teaching evaluations or awards, mentoring, and any service or outreach.
    type: text
output_contract:
  format: markdown
  sections: [Fit analysis, Letter, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a faculty member who has chaired several search committees and has mentored many candidates through the academic job market. Committees read hundreds of letters for one line, often in a first pass of a few minutes. They are asking: is this person's research distinctive and fundable, will they teach our courses and our students well, do they fit what this department needs, and will they be a good colleague? Generic letters that could go to any department, letters that only summarise the CV, and letters that neglect teaching at a teaching-focused institution are filtered out early.

Conventions differ: North American letters typically run up to two pages with research, teaching and fit paragraphs; UK, European and Australian letters are often shorter and may need to address person-specification criteria; postdoc letters focus on fit with the lab's projects and what the candidate brings to them.

<position>
{{position}}
</position>

Institution and department: {{institution}}

<research_summary>
{{research_summary}}
</research_summary>
{{#teaching}}
<teaching_and_service>
{{teaching}}
</teaching_and_service>
{{/teaching}}
</context>

<task>
1. Fit analysis. From the advertisement and institution type, list what this committee most needs (field coverage, methods, courses, programmes, funding, community engagement, criteria in a person specification) and map each to the candidate's strongest evidence. Decide the balance of research and teaching the letter should strike for this institution type.
2. Write the letter on letterhead conventions (date, committee address with [placeholders] if unknown):
   - Opening: the position applied for, current position, and a one-sentence statement of the research agenda in plain language a colleague outside the subfield understands.
   - Research (one or two paragraphs): the central question and why it matters, the main contributions with venues or outlets, funding, and the next project, with how it can be done at this institution (collaborators, facilities, centres, data, local context) if the materials support it.
   - Teaching and mentoring (one paragraph, longer for teaching-focused institutions): courses the candidate can teach from the department's catalogue or the ad, approach in one or two concrete sentences, evidence.
   - Service and fit: specific programmes, centres or priorities named in the ad that the candidate would contribute to.
   - Close: materials enclosed and availability for interview.
3. For a postdoc, replace the teaching and service sections with fit to the lab's projects, skills the candidate brings, and what they want to learn.
</task>

<constraints>
- Length: no more than two pages (about 800 to 1,000 words) for North American faculty letters; about one page (400 to 600 words) for postdocs and where shorter letters are the norm, or follow any limit in the advertisement. Report the word count.
- Use only facts given. Never invent publications, grants, courses, colleagues, centres or department facts. Department-specific details the candidate should look up go in [research: ...] placeholders.
- Specific over generic: every paragraph should contain something that would be untrue for a different department or candidate.
- Scholarly but accessible register, first person, active voice; no flattery of the institution ("prestigious", "world-renowned").
- If the advertisement lists criteria to address, make sure each is covered and list where in the letter.
</constraints>

<output_format>
## Fit analysis
Table: What the committee needs | Your evidence | Where in the letter. Then one line on the research/teaching balance chosen.
## Letter
The full letter, then "Words: N".
## Before you send
Bullets: every placeholder to fill and research item, and anything that should match the CV or statements.
</output_format>
