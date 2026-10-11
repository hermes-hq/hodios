---
schema: 1
id: choose-day-centre
kind: prompt
title: Choose a day centre for a relative
description: Helps a family find and choose an adult day centre or day service, matching the person's needs and interests, with a visit checklist, questions on staffing, transport and cost, and a gentle start.
category: caregiving
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [checklist, questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [day-services, adult-day-care, respite-care, ageing-parents, social-connection]
pairs_with:
  prompts: [plan-respite-break, prepare-care-needs-assessment, write-care-profile]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who would attend, their needs (memory, mobility, continence, communication, behaviour that may challenge), interests and personality, how they feel about going, and the country or region.
    type: text
    required: true
  - name: what_family_needs
    description: What the family hopes for (days a week, hours, transport, a break for the carer, budget), and any centres you have heard of. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to look for, Where to find options, Visit checklist, Questions to ask, Trial and first weeks, If they refuse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose a day centre or adult day service the way an experienced care coordinator would. Day services range from social clubs with lunch and activities, to specialist dementia centres, to services with nursing or personal care, to groups for younger disabled adults; one that suits a sociable person with mild memory loss may overwhelm someone with advanced dementia. What experienced coordinators know: transport and hours often decide whether a centre is workable; the right centre has activities the person would actually choose and staff who can meet their care needs (toileting, eating, medicines, mobility); a trial session, often with the carer staying at first, makes a big difference; and the person often says no to "a day centre" but yes to "a lunch club" or "a men's group". Funding may come through social care assessments, health funding, charities or private payment, and varies by country.

<person>
{{person}}
</person>
{{#what_family_needs}}What the family needs: {{what_family_needs}}{{/what_family_needs}}
</context>

<task>
1. What to look for: the type of day service that fits this person (social, dementia-specific, with personal or nursing care, for younger adults, culturally or language specific) and the must-haves from their needs.
2. Where to find options: kinds of sources to check (the person's social care or health team, a needs assessment, local carer organisations, condition-specific charities, faith and community groups, an official directory) without naming specific providers.
3. Visit checklist: what to notice on a visit, such as atmosphere, whether attendees are engaged or parked in front of a TV, staff ratio and attitude, accessible toilets and quiet space, food, outdoor space, and how they handle someone who gets upset or wants to leave.
4. Questions to ask: inspection or registration status as applicable, staff training (for example dementia), personal care and medicines, transport and pick-up times, what happens if the person is unwell or not collected, cost and what is included, notice periods, and how they communicate with families.
5. Trial and first weeks: how to introduce it (wording that fits their interests), a trial visit with the carer, starting with one day, sending a short profile, and how to judge after four to six weeks.
6. If they refuse: other framings, a different type of group, a home-based alternative such as a sitting service, and checking whether the refusal is about something specific (toileting worries, hearing, transport).
</task>

<constraints>
- Never invent centre names, prices, funding rules or inspection bodies; say they vary and to check locally.
- Keep the person's preferences and dignity central, and present the centre as for them as well as a break for the carer.
- Do not give medical or care technique advice; point care questions to the centre and the person's care team.
- If the carer is at breaking point or the person is unsafe at home, say to contact the person's care team or social care services urgently rather than waiting for a place.
</constraints>

<output_format>
## What to look for
## Where to find options
## Visit checklist
Checklist.
## Questions to ask
Questions.
## Trial and first weeks
## If they refuse
</output_format>
