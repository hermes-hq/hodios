---
schema: 1
id: design-volunteer-induction-training
kind: prompt
title: Design volunteer induction training
description: Designs induction training for nonprofit or community volunteers in one role, covering day-one essentials, safeguarding and boundaries, shadowing, short modules and a sign-off sized to unpaid time.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [manager, operations-manager]
subject: [nonprofit, social-care]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [volunteer-management, induction, safeguarding, shadowing, boundaries, charities]
pairs_with:
  prompts: [design-onboarding-curriculum, write-reading-volunteer-guide, design-microlearning-series]
args:
  - name: role
    description: The volunteer role, e.g. "food bank warehouse and client-facing shifts", "befriender visiting older people at home", "youth club helper".
    type: string
    required: true
  - name: organisation_context
    description: What the organisation does, who volunteers meet (children, adults at risk, the public), how many volunteers join and how often, who supervises, existing policies, and any training you already run.
    type: text
    required: true
  - name: hours
    description: Total induction time you can reasonably ask of a new volunteer before their first independent shift, in hours.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Day-one essentials, Induction plan, Safeguarding and boundaries, Shadowing and sign-off, Materials, Keeping volunteers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Volunteers give unpaid time and leave quickly when induction is a long slideshow of policies, or when they are thrown in with no idea what to do. They also put people at risk when nobody explains boundaries, confidentiality and what to do with a worry. Good induction separates what a volunteer must know before their first shift from what they can learn on the job, teaches it through real situations from the role, uses shadowing, and checks readiness before anyone works unsupervised.

Role: {{role}}. Induction budget: about {{hours}} hours.
</context>

<task>
<organisation_context>
{{organisation_context}}
</organisation_context>

1. **Day-one essentials:** list what the volunteer must know and be able to do before their first shift for {{role}}: purpose and values, who to report to, health and safety for this role, safeguarding and how to raise a concern, confidentiality and data, boundaries, emergencies, and the two or three core tasks. Everything else goes to "learn on the job".
2. **Induction plan:** fit the essentials into {{hours}} hours, split into short modules (15-40 minutes) that can run as a group session, one-to-one or self-paced online. Each module: purpose, method (scenario discussion, demonstration, practice), and a quick check. If the essentials cannot fit, say what to cut or move into a second session.
3. **Safeguarding and boundaries:** realistic scenarios from this role (for example a client offers a gift, asks for a phone number, discloses abuse, a volunteer is asked to do something outside their role), with the right response for each. Use the organisation's policies; where none are given, write [insert your policy] and name the role of the safeguarding lead.
4. **Shadowing and sign-off:** how many shadow shifts, what the volunteer observes and then does under supervision, and a readiness checklist the supervisor signs. Include pre-start checks to confirm (references, background checks where the role needs them, marked [check local law and policy]).
5. **Materials:** a one-page role card, a "who to call" card, and a short welcome message.
6. **Keeping volunteers:** first-month check-ins, refresher for policy changes, recognition, and an easy way to give feedback or step back.
</task>

<constraints>
- Respect unpaid time: no module longer than 40 minutes, no content that is not needed for the role.
- Plain, warm language; no jargon or legal wording in volunteer-facing materials.
- Never invent the organisation's policies, legal requirements or background-check rules; mark them [check] and say who to ask.
- Volunteers never investigate or counsel; they listen, record and pass concerns to the named lead the same day (immediately if someone is in danger, contacting local emergency services).
- Include accessibility: varied formats, timing that suits working volunteers, adjustments on request.
- If the organisation context does not say who volunteers will meet or who supervises them, ask for that and stop.
</constraints>

<output_format>
## Day-one essentials
Two lists: Before first shift, Learn on the job.
## Induction plan
Table: Module | Minutes | Format | Method | Quick check. Total row.
## Safeguarding and boundaries
Table: Scenario | What to do | Who to tell.
## Shadowing and sign-off
Bullets and the readiness checklist.
## Materials
Role card, who-to-call card and welcome message drafts.
## Keeping volunteers
Bullets.
</output_format>
