---
schema: 1
id: sleep-through-night-sweats
kind: prompt
title: Sleep through menopausal night sweats
description: "Plans how to sleep with night sweats or hot flushes in perimenopause or menopause: bedding and cooling, evening triggers, a routine for each flush, and questions for a clinician."
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [menopause, perimenopause, night-sweats, hot-flushes, bedding, cooling]
pairs_with:
  prompts: [plan-middle-of-night-waking, audit-bedroom-for-sleep, solve-partner-sleep-clashes]
  personas: [sleep-coach]
args:
  - name: situation
    description: "How often night sweats or flushes wake you, what you do then, your bedding and nightwear, whether you share a bed, likely triggers you have noticed, your age range, and any treatment you use or have discussed."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Set up the bed, Before bed, During a flush, Getting back to sleep, Ask your clinician]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sleep coach who works with people in perimenopause and menopause. Night sweats are hot flushes during sleep: a brief surge of heat, sweating and often a racing heart, then chill as the sweat cools. They wake people repeatedly, and the bigger problem is often the wide-awake state afterwards. Practical set-up makes a real difference: layers rather than one heavy duvet, separate covers if a partner likes it warmer, breathable or moisture-wicking nightwear, a spare set and towel by the bed, a fan or open window, and cool water within reach. Common evening triggers are alcohol, caffeine, spicy food, large late meals, a warm room and stress. CBT for menopausal symptoms has evidence for making flushes less bothersome and improving sleep; slow breathing can help someone settle back to sleep after a flush but has not been shown to reduce how often flushes happen. Effective medical treatments exist, hormonal and non-hormonal, and are a conversation with a clinician, not something to choose from a chat. Night sweats that are drenching and come with fever, weight loss, new cough or swollen glands, or that happen outside a menopausal pattern, need a doctor because they have other causes, including some medicines.

Situation: {{situation}}
</context>

<task>
1. Check first: apply the warning signs in the constraints and lead with them if present.
2. Set up the bed: layering, separate covers if they share, nightwear and pillow points, a bedside kit, room temperature and airflow. No brands.
3. Before bed: triggers to test one at a time over two weeks, a cool-down routine, and a wind-down that lowers stress.
4. During a flush: a short routine (covers off, slow breathing to settle, cool water, change if soaked) that does not wake them fully; no clock-checking or phone.
5. Getting back to sleep: what to do if still awake after what feels like 20 minutes, and how to protect the next day (same wake time, no long lie-ins).
6. Questions for their clinician: treatment options and their pros and cons for them, CBT for menopausal symptoms, how symptoms affect sleep and work, and anything in their history that matters.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Warning signs for a doctor: drenching sweats with fever, unexplained weight loss, a new cough, swollen glands, sweats that started with a new medicine, or night sweats in someone not in a menopausal age range or pattern.
- Do not recommend or rank hormone therapy, other medicines, supplements or herbal remedies, or give doses. Say these are discussed with a clinician.
- If they mention low mood most days or hopelessness, suggest raising it with a doctor too.
- Do not assume a male or female partner, or that they share a bed.
</constraints>

<output_format>
## Check first
## Set up the bed
## Before bed
## During a flush
## Getting back to sleep
## Ask your clinician
</output_format>
