---
schema: 1
id: plan-graduate-job-search
kind: prompt
title: Plan a graduate job search
description: Plans a final-year student's or recent graduate's search for a first full-time job around graduate scheme deadlines, the careers service and entry-level channels, with a timeline and weekly targets.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [student, job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [graduate-jobs, graduate-schemes, entry-level, early-careers, first-job]
pairs_with:
  prompts: [plan-internship-search, plan-career-fair, write-cover-letter]
  personas: [career-coach]
args:
  - name: graduate_profile
    description: Degree subject, expected or actual graduation date, country, grades if relevant, experience (internships, part-time jobs, projects, societies), and work authorisation if you studied abroad.
    type: text
    required: true
  - name: target
    description: Fields or kinds of jobs you are considering (or "not sure"), location limits, and whether you want a structured graduate programme, a direct entry-level role, or either.
    type: text
    required: true
  - name: current_month
    description: The current month, so the timeline starts from now.
    type: string
    required: true
  - name: hours_per_week
    description: Hours per week you can spend on the search.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Where you stand, Two routes, Calendar, Using your university, Materials and practice, Weekly targets, If nothing lands by graduation, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a university careers adviser. Graduates find first jobs through two very different routes. Structured graduate programmes (common at large employers, some public bodies and professional firms) recruit up to a year ahead, often open in the autumn of the final year, close early or fill on a rolling basis, and use online tests, video interviews and assessment centres. Direct entry-level roles at small and mid-sized employers are advertised a few weeks before the start date, all year round, and are filled by whoever is available now; these are most of the jobs in many countries. Students who only chase schemes often graduate with nothing; students who ignore them miss the deadlines. Careers services, alumni, and employers that already took the student as an intern are under-used. Calendars and norms differ by country (some markets have a single national recruiting season), so the plan states its assumptions.

<graduate_profile>
{{graduate_profile}}
</graduate_profile>
<target>
{{target}}
</target>
Current month: {{current_month}}
Hours per week: {{hours_per_week}}
</context>

<task>
1. Where you stand: what the graduate can already show employers, the one or two gaps that matter for the target, and any work authorisation question to resolve first (for example post-study work rights for international students, to verify).
2. Two routes: explain graduate programmes versus direct entry-level roles for this person's target, say which deserves more effort and why, and whether they are early, on time or late for programmes given {{current_month}}. If the target is "not sure", give a short way to narrow it to two or three directions within two weeks.
3. Calendar: a month-by-month plan from {{current_month}} through graduation and the first months after, covering programme applications, entry-level applications closer to graduation, and exam periods as low-capacity months if mentioned.
4. Using your university: careers service appointments and CV checks, job boards for graduates, employer events, alumni networks, academic staff with industry contacts, and asking past internship employers about graduate roles.
5. Materials and practice: a graduate resume that leads with degree, relevant projects and experience; a cover letter base; answers to common application questions; practice for online tests, video interviews and assessment centres where the route uses them.
6. Weekly targets sized to {{hours_per_week}} hours: applications per route, conversations, practice sessions, with a weekly review.
7. If nothing lands by graduation: graduate-level temporary or contract work, related roles that build experience, further study only if it serves a clear goal, and keeping a structured routine; note that many graduates find work in the months after graduation.
</task>

<constraints>
- Do not state specific employers' deadlines, programme names or salaries as facts; describe patterns and say where to confirm.
- Do not invent visa or work-rights rules; say what to check and with whom.
- Be honest if the target is very competitive or the person is late for the main cycle, and give the best alternative.
- Fit the plan to study load and the stated hours.
</constraints>

<output_format>
## Where you stand
## Two routes
Table: Route | How it hires | Timing pattern | Effort share.
## Calendar
Table: Month | Actions.
## Using your university
Checklist.
## Materials and practice
## Weekly targets
## If nothing lands by graduation
## Open questions
Missing facts that would change the plan, each with the assumption used, or "None".
</output_format>
