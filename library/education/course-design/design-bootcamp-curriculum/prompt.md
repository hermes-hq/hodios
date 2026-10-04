---
schema: 1
id: design-bootcamp-curriculum
kind: prompt
title: Design an intensive bootcamp curriculum
description: Designs an intensive multi-week bootcamp curriculum (coding, data, design or trades) with a daily rhythm, a project spine, assessments, pacing for fatigue and an honest graduate profile.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, teacher, manager]
requires: [none]
inputs: [text, job-posting]
output: [plan, table, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [bootcamp, project-based, intensive-course, career-change, job-readiness, portfolio]
pairs_with:
  prompts: [design-course-outline, design-capstone-project, plan-course-pilot]
  personas: [instructional-designer]
args:
  - name: field
    description: The bootcamp's field, e.g. "full-stack web development", "data analytics", "UX design", "electrical installation pre-apprenticeship".
    type: string
    required: true
  - name: target_roles
    description: The jobs graduates aim for, with real job ads or skill lists if you have them, plus the entry profile of learners (prior skills, full or part time, career changers or graduates).
    type: text
    required: true
  - name: weeks
    description: Length of the bootcamp in weeks.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Graduate profile, Entry requirements, Week-by-week plan, Project spine, Daily rhythm, Assessment and checkpoints, Pacing and support, Honest limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bootcamps compress months of learning into weeks. They fail learners in familiar ways: a syllabus copied from a framework's documentation rather than from job ads, too many tools covered shallowly, lectures in the morning that nobody retains by afternoon, burnout in weeks 4-6, weaker learners silently falling behind until the final project, and marketing that promises job titles the curriculum cannot deliver. Strong bootcamps work back from what a junior in the target role does in their first month, keep a project spine running the whole way, practise daily with fast feedback, assess at checkpoints with a plan for those who miss the bar, and are honest about what graduates can and cannot do.

Field: {{field}}. Length: {{weeks}} weeks.
</context>

<task>
<target_roles>
{{target_roles}}
</target_roles>

1. **Graduate profile:** from the target roles, list 6-10 tasks a junior does in their first months, and turn them into outcomes. Separate must-have from nice-to-have; drop tools that appear rarely in the ads.
2. **Entry requirements:** the prerequisite skills, a pre-work module (hours and content) and an admissions task that predicts success better than an interview alone.
3. **Week-by-week plan:** group the {{weeks}} weeks into phases (foundations, core skills, integration, capstone and job readiness). For each week: focus, skills, the project increment, and the checkpoint.
4. **Project spine:** small daily exercises, weekly mini-projects, a team project that mirrors real workflows (version control, reviews, briefs, site practice), and an individual capstone for the portfolio.
5. **Daily rhythm:** a typical day for full-time or part-time delivery: short input (under 45 minutes at a time), guided practice, independent or pair work, review or stand-up, and a reflection. Include breaks and a lighter day each week.
6. **Assessment and checkpoints:** a checkpoint every two to three weeks with a practical task and rubric, what happens if a learner does not pass (catch-up plan, repeat a phase, deferral), and the final assessment against the graduate profile.
7. **Pacing and support:** where fatigue peaks and what changes then, mentoring and help queues, wellbeing check-ins, support for learners with access needs, and early-warning signs instructors watch.
8. **Honest limits:** what graduates will be able to do, what they will still need on the job, and wording for marketing that does not over-promise.
</task>

<constraints>
- Every topic must trace to a task in the graduate profile; list what you cut and why.
- Do not quote job-placement rates, salaries or market demand; say what to research and how.
- Never write guaranteed-job, guaranteed-salary or "job-ready in X weeks" claims; if asked for them, decline briefly and give honest marketing wording instead.
- For trades or regulated fields, note where licensing, supervised hours or awarding-body rules apply and mark them [check local regulations]; a bootcamp cannot replace them.
- Keep the plan realistic for the hours available; if {{weeks}} weeks cannot reach the target roles from the stated entry profile, say so and propose a narrower role or longer programme.
- If target roles or the entry profile are missing, ask for them and stop.
</constraints>

<output_format>
## Graduate profile
Table: Junior task | Outcome | Must or nice to have.
## Entry requirements
Bullets: prerequisites, pre-work, admissions task.
## Week-by-week plan
Table: Week | Phase | Focus | Skills | Project increment | Checkpoint.
## Project spine
Bullets.
## Daily rhythm
Table: Time | Block | What happens.
## Assessment and checkpoints
Bullets and a sample checkpoint rubric.
## Pacing and support
Bullets.
## Honest limits
Bullets and suggested marketing wording.
</output_format>
