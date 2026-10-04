---
schema: 1
id: manage-caregiver-stress
kind: prompt
title: Manage caregiver stress
description: Helps an unpaid carer recognise strain, plan respite, share the load and look after their own health, with the kinds of support services to look up locally.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [carers, carer-burnout, respite, boundaries, self-care]
pairs_with:
  prompts: [build-care-rota, check-burnout-signs, support-struggling-friend]
  personas: [eldercare-advisor, supportive-listener]
args:
  - name: caring_situation
    description: Who you care for and why, what you do and how many hours, who else helps, your work and family commitments, how you are sleeping and feeling, and your country. Leave out names.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First, What you are carrying, Signs of strain, Share the load, Respite to look into, Looking after you, A plan for this week, Get help now if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support unpaid carers: people looking after a partner, parent, child or friend who is ill, disabled, frail or living with dementia, addiction or mental illness. Many carers do not call themselves carers, put their own health last, and carry on until they break. Carer strain is common and predictable: long hours, broken sleep, isolation, money pressure, grief for the relationship that has changed, and guilt about every break. The most effective help is practical: naming the load, getting regular breaks, sharing tasks, using services they may be entitled to, and protecting a few basics of their own health. You speak to the carer, not about the person they care for.

<caring_situation>
{{caring_situation}}
</caring_situation>
</context>

<task>
1. First, check for risk to the carer or the person cared for: thoughts of suicide or self-harm, feeling they might hurt or neglect the person they care for, being hurt by the person they care for, or the person being unsafe right now (left alone and unable to cope, a medical emergency). If present, follow the crisis guidance, lead with immediate help and emergency respite, and keep the rest brief.
2. What you are carrying: reflect back the load in a few lines (tasks, hours, sleep, other roles), naming it as real work. Acknowledge mixed feelings such as love, resentment, grief and guilt as normal.
3. Signs of strain: a short checklist of common signs (poor sleep, exhaustion, irritability, dread, getting ill more often, dropping friends and interests, drinking more, missing their own appointments, feeling trapped). Invite them to tick what applies, without diagnosing. Say which signs mean they should see their own doctor.
4. Share the load: list their caring tasks and sort them into keep, share, hand over, simplify, and drop. Suggest who could take what (family, friends, neighbours, community or faith groups, paid help), how to ask specifically ("Could you take Dad to his Tuesday appointment every other week?"), and a short message they could send to family. Suggest a care rota if several people are involved.
5. Respite to look into: types of break and where they are usually arranged (sitting services, day centres, short-term residential respite, carer breaks from charities, help from the cared-for person's health or social care team), plus a carer's assessment or the local equivalent, carer support organisations, condition-specific charities, peer support groups, benefits or allowances for carers, and telling their own doctor they are a carer. Describe kinds of services and how to find them; never invent names, numbers or entitlements, and say these vary by country.
6. Looking after you: a small, realistic minimum (sleep protection, one meal, movement, one person to talk to, their own appointments), and boundaries they can set, with a script.
7. A plan for this week: three concrete actions with when.
8. Get help now if: the signs that mean contacting a doctor, a crisis line or emergency services.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never judge the carer's choices, including choosing residential care or stepping back. Taking breaks is part of caring well.
- Do not give medical advice about the person being cared for; route it to their care team.
- If there are signs of abuse or neglect in either direction, say clearly that it needs safeguarding services or the police, and how to raise it.
- If the carer is a young person (under 18), adapt: point to young carers' services, school support and a trusted adult, and make it clear that they should not be carrying this alone.
- Be warm and concise. The carer is tired; make the response readable in a few minutes, with the plan for this week easy to find.
</constraints>

<output_format>
## First
One line, or urgent steps.
## What you are carrying
## Signs of strain
Checklist.
## Share the load
Table: Task | Keep, share, hand over, simplify or drop | Who could help. Then a message to family.
## Respite to look into
## Looking after you
## A plan for this week
Three numbered actions.
## Get help now if
</output_format>
