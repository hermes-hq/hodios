---
schema: 1
id: build-coping-plan
kind: prompt
title: Build a coping plan
description: Builds a one-page personal coping plan for stress triggers with early warning signs, helpful actions, people to contact and professional support in green, amber and red tiers. Use on a calm day.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [stress-management, wellness-plan, early-warning-signs, self-care]
pairs_with:
  prompts: [guided-journaling, reframe-negative-thoughts, prepare-for-therapy]
  personas: [supportive-listener]
args:
  - name: triggers
    description: Situations that tend to set off stress or low mood for you, for example "deadlines, conflict with my sister, Sunday evenings".
    type: text
    required: true
  - name: what_helps
    description: Things that have helped before, even a little, for example "running, music, talking to a friend". Optional.
    type: text
output_contract:
  format: markdown
  sections: [My coping plan, How to use this plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write a personal coping plan while they feel calm enough to think clearly, so that when stress builds they can follow it instead of having to decide what to do. Good plans, like the wellness and recovery plans used in mental-health services, are short, written in the person's own voice, start from what has already worked for them, and escalate in tiers: what keeps me well, what I do when I notice early signs, and who I contact when I cannot manage alone.

Triggers: {{triggers}}
{{#what_helps}}What has helped before: {{what_helps}}{{/what_helps}}
</context>

<task>
1. For each trigger, suggest the early warning signs people commonly notice (thoughts, feelings, body signals, behaviour changes such as withdrawing, snapping or sleeping badly), phrased as options to keep or cross out.
2. Build the actions from what already helps first, then add a few evidence-informed options matched to the trigger:
   - quick (under 2 minutes): slow breathing with a longer out-breath (in for 4, out for 6), a 5-4-3-2-1 grounding exercise, stepping outside;
   - short (15 minutes): a walk or other movement, music, writing the worry down, a shower, texting someone;
   - for problems they can change: break the next step down and schedule it; for ones they cannot: acceptance, distraction and self-compassion;
   - steady habits for the green tier: sleep routine, regular meals, movement, time with people, limits on alcohol and caffeine.
3. Organise the plan into three tiers:
   - Green, "when I am well": the habits that keep me steady;
   - Amber, "when I notice early signs": my signs and the specific actions;
   - Red, "when I feel overwhelmed": people to contact, professional support, and crisis contacts.
4. Leave clearly marked blanks for names and phone numbers. Never invent contacts or numbers.
5. Add a short "how to use this plan" section.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Write the plan in the first person ("When I notice…, I will…") so it reads as theirs. Keep it to roughly one page.
- In the red tier, include a GP or family doctor, a therapist or counsellor if they have one, any workplace or student support service, and a line for the local emergency number and a crisis line, with a note to look up and fill in the numbers for their country.
- Name less helpful coping habits (drinking more, avoiding everything, doom-scrolling) gently as things to watch for, without shame.
- If the triggers or what they write mention thoughts of self-harm or suicide, follow the crisis guidance first, and recommend making a safety plan together with a clinician or crisis service rather than alone.
- If stress seems constant or has lasted weeks and affects sleep, work or relationships, recommend talking to a doctor.
</constraints>

<output_format>
## My coping plan
### My triggers
### Green: when I am well
### Amber: when I notice early signs
Table: Early sign | What I will do.
### Red: when I feel overwhelmed
Table: Who or what | How to reach them | When. Blanks shown as "[ ]".
## How to use this plan
Three to five bullets: where to keep it, sharing it with one trusted person, and reviewing it in about four weeks or after a hard week.
</output_format>
