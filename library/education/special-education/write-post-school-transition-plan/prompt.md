---
schema: 1
id: write-post-school-transition-plan
kind: prompt
title: Write a post-school transition plan
description: Drafts a transition plan for a young person with special educational needs moving towards adult life, with their aspirations, outcomes for work, living, community and health, and who does what.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [transition-planning, preparing-for-adulthood, person-centred-planning, life-skills, supported-employment]
pairs_with:
  prompts: [write-iep-goals, write-one-page-pupil-profile, gather-pupil-views-for-review]
  personas: [special-education-advisor]
args:
  - name: young_person
    description: About the young person (initials only) - age, current school or college and year, strengths and interests, what they say they want for their future, needs and current support, family views, and professionals involved.
    type: text
    required: true
  - name: setting
    description: Country or state and system, for example "US, IEP transition plan at 16", "England, preparing for adulthood in an EHC plan", or "Australia, NDIS". Optional; changes terms, ages and services.
    type: string
output_contract:
  format: markdown
  sections: [The young person's aspirations, Where they are now, Outcomes by area, Actions and who is responsible, Skills to build now, Services and agencies to involve, Gaps and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a school or college team, with the young person and family, plan the move from school to adult life. Experienced transition coordinators know that planning starts years before leaving (often from age 14), that the young person's own aspirations lead the plan rather than the services that happen to be available, and that four areas matter, not just the next course: employment or further learning, independent living, friends and community, and health. They also know that adult services are organised differently from children's services, eligibility changes, waiting lists are long, and things fall through the gap unless someone owns each action with a date. Low expectations are the most common barrier: supported internships, supported employment and gradual independence are realistic routes for many young people who are steered towards day services by default.

Young person: {{young_person}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. Aspirations: summarise what the young person wants in their own words where given; if their voice is missing, say so and suggest ways to gather it (see accessible methods such as visual choices or a trusted adult).
2. Where they are now: strengths and current skills in each of the four areas, from the information given.
3. Outcomes by area: for employment or learning, independent living, community and relationships, and health, write one or two outcomes for the next one to three years that are specific, linked to the aspiration and achievable with support.
4. Actions: for each outcome, the steps, who is responsible (school, family, young person, named agency type), and a date. Include work experience or supported internships, travel training, money skills, self-care, and health transition to adult services where relevant.
5. Skills to build now: the few skills to teach in the current year that most unlock the outcomes, with how school will teach and practise them in real settings.
6. Services and agencies to involve: the types of service (careers guidance, adult social care, vocational rehabilitation, supported employment, health transition, benefits advice), when to refer, and the information they will need. Name the system you assume.
7. Gaps and open questions for the review meeting.
</task>

<constraints>
- The young person's aspirations come first. Do not lower outcomes because of a diagnosis; base them on evidence of what they can do and the support available.
- Use initials only. Do not diagnose or interpret medical reports beyond what is written.
- Ages, legal duties, funding and service names differ by country and state. Name the system you assume and say to check local rules and the local offer of services; do not invent named providers.
- Consent and decision-making: if the young person is reaching adulthood, note that rules on who makes decisions change and the team should check how the young person's own consent and any supported decision-making apply locally.
</constraints>

<output_format>
## The young person's aspirations
## Where they are now
Table: Area | Strengths and current skills.
## Outcomes by area
## Actions and who is responsible
Table: Outcome | Action | Who | By when.
## Skills to build now
## Services and agencies to involve
## Gaps and open questions
</output_format>
