---
schema: 1
id: plan-career-fair
kind: prompt
title: Plan a career fair
description: Plans a career fair visit with tiered target employers, a 30-second pitch, questions for each booth, a materials list and a same-week follow-up routine. Use before an in-person or virtual fair.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker, student]
requires: [none]
inputs: [preferences, resume, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [career-fair, networking, elevator-pitch, follow-up, graduate-jobs]
pairs_with:
  prompts: [research-company, write-networking-message, write-tell-me-about-yourself]
args:
  - name: fair
    description: The fair - its name, date, in-person or virtual, how long you can stay, and the exhibitor list if you have it.
    type: string
    required: true
  - name: goals
    description: What you want from the fair - internship, graduate job, specific roles or industries, contacts, information - and any constraints (location, visa sponsorship, start date).
    type: text
    required: true
  - name: background
    description: Optional resume or a few lines about your studies, experience and strongest selling points.
    type: text
output_contract:
  format: markdown
  sections: [Targets, Pitch, Booth questions, Day plan, Materials, Notes template, Follow-up routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a university careers adviser who has run dozens of career fairs and debriefed the recruiters afterwards. Recruiters at a booth talk to hundreds of people in a day. They remember the few who had a clear target, asked a question that showed homework, and followed up within a day or two. Most visitors wander, ask "So what does your company do?", hand over a resume and are forgotten. A fair rewards preparation more than charm.

Fair: {{fair}}

<goals>
{{goals}}
</goals>
{{#background}}
<background>
{{background}}
</background>
{{/background}}
</context>

<task>
1. Targets. If an exhibitor list is in the fair details, sort the employers that fit the goals into tiers: A (top 3 to 5, research deeply), B (5 to 8, light research), C (warm-up or exploratory). If no list is given, explain how to tier it once the list is published and leave a table with [employer] placeholders. Flag constraints to ask about early (sponsorship, location, graduation date).
2. Pitch. Write a 30-second pitch (about 70 to 80 words, spoken): who the candidate is, what they are looking for, one piece of proof, and a question that hands the conversation to the recruiter. Then a 10-second version for a busy booth and, if the fair is virtual, a two- or three-sentence written version for a chat queue.
3. Booth questions. For each A-tier employer (or as templates), write two or three questions that only a prepared candidate would ask: about a team, programme, project or challenge the candidate can look up beforehand, and about the hiring process and timeline. Include a closing ask: the best way to apply, the right contact, or permission to follow up.
4. Day plan. Route and timing: arrive early, one or two C-tier booths to warm up, A-tier before queues peak, buffer time, a two-minute note after each conversation. Adapt for a virtual fair (booking slots, chat queues, camera and connection check).
5. Materials and a notes template for each conversation (name, role, contact, what they said, next step, promised follow-up).
6. Follow-up routine: within 24 to 48 hours, a short message for each contact that references something specific from the conversation, then the online application and a reminder to check in after one to two weeks. Write one follow-up message template.
</task>

<constraints>
- Use only facts given. Do not state what an employer does, hires for or sponsors unless it was given; write [research: ...] for what the candidate should look up.
- Keep the pitch conversational and honest; no exaggerated titles or skills.
- Keep the plan realistic for the time the candidate can stay.
- If the goals are too broad to target ("any job"), ask two or three narrowing questions at the top and still give a usable plan.
</constraints>

<output_format>
## Targets
Table: Tier | Employer | Why it fits | What to research | Constraint to ask.
## Pitch
30-second, 10-second, and (if virtual) written versions.
## Booth questions
## Day plan
Timed list.
## Materials
Checklist.
## Notes template
## Follow-up routine
Steps with timing, then the message template.
</output_format>
