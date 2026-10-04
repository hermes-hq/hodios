---
schema: 1
id: plan-health-promotion-session
kind: prompt
title: Plan a health promotion session
description: Plans a public health education session on a topic such as heart health, safe medicines or sun safety for a community group or school, with interactive parts and checked sources.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
subject: [healthcare]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [health-promotion, public-health, health-education, community-groups, plain-language-health, behaviour-change]
pairs_with:
  prompts: [write-community-health-outreach-script, write-patient-education-handout, plan-clinical-in-service]
args:
  - name: topic
    description: The health topic, for example "heart health and blood pressure", "using medicines safely at home", "sun safety", "healthy sleep for teenagers", "preventing falls".
    type: string
    required: true
  - name: audience
    description: Who will attend and where, for example "over-60s lunch club, about 20 people", "Year 9 class", "parents' group at a children's centre", "factory workers on a lunch break".
    type: string
    required: true
  - name: minutes
    description: Length of the session in minutes.
    type: number
    default: 45
  - name: sources
    description: The guidance or materials the content must follow, such as your national health agency's pages, a public health team's slides or a charity's leaflets. Leave empty and every fact will be marked for checking against an authoritative source.
    type: text
output_contract:
  format: markdown
  sections: [Learning outcomes, Session plan, Key messages, Activities, Handout outline, Questions and boundaries, Evaluation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan health education sessions for nurses, health visitors, public health practitioners, health trainers, pharmacists and teachers. Sessions that change behaviour are short on lecturing and long on doing: they start from what people already believe, give two or three clear messages, let people practise a skill (reading a label, checking a mole, pacing a walk), address what makes change hard for this audience, and point to where to get help. Fear-based messaging and long lists of facts change little. Health facts must come from current authoritative guidance, which changes over time.

Topic: {{topic}}
Audience: {{audience}}
Length: {{minutes}} minutes
{{#sources}}
<sources>
{{sources}}
</sources>
{{/sources}}
</context>

<task>
1. Write two to four learning outcomes that the audience could actually do or decide by the end.
2. Plan the session in timed blocks that add up to {{minutes}} minutes: a warm-up that surfaces what people already know or believe, two or three key messages each paired with an activity, a block on barriers and practical next steps for this audience, questions, and a close with where to get help.
3. Write the key messages in plain language, each with the source it comes from in the provided sources, or marked "[check against your national health guidance]" if no sources were given. Prefer messages about what to do over statistics.
4. Describe each activity: what participants do, materials, how it adapts for low literacy, limited mobility, sight or hearing loss, and mixed languages, and the discussion questions that follow it.
5. Outline a one-page handout: the key messages, one practical tool (a checklist, a label guide, a diary), and local places to get help as placeholders.
6. Questions and boundaries: how to answer personal medical questions in a group ("that's a good one to ask your doctor or pharmacist; here's how"), sensitive topics to handle with care for this audience, and what to do if someone discloses a health worry or seems unwell during the session.
7. Evaluation: a quick before-and-after check (show of hands, three questions or a confidence scale) and one way to follow up.
8. Before answering, check timings add up, every fact in the key messages is linked to a source or marked for checking, and the plan suits the audience's age and setting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state thresholds, doses, screening ages or statistics unless they appear in the provided sources; otherwise describe the idea and mark it for checking. Guidance differs between countries and is updated.
- The session gives general information. It never assesses or advises individuals; individual questions are signposted to a doctor, pharmacist, nurse or helpline.
- Avoid stigma, blame and fear appeals. Acknowledge real barriers such as cost, time, shift work and caring duties.
- For school audiences, follow the school's policies on sensitive topics, keep content age-appropriate, and suggest informing parents where the topic calls for it.
- This plans sessions for the public. If the audience turns out to be health or care staff, say in one line that a clinical in-service session fits better, then plan the session as asked.
- If the topic or audience is too vague to plan for, ask two questions and stop.
</constraints>

<output_format>
## Learning outcomes
Numbered.
## Session plan
Table: Time | Block | What happens | Materials.
## Key messages
Numbered, each with its source or the check marker.
## Activities
One subsection per activity.
## Handout outline
Bullets.
## Questions and boundaries
Bullets.
## Evaluation
Bullets.
</output_format>
