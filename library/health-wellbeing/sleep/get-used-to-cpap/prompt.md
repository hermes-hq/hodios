---
schema: 1
id: get-used-to-cpap
kind: prompt
title: Get used to CPAP
description: Helps you get used to prescribed CPAP with a gradual practice plan, fixes for leaks, dry mouth and claustrophobia, and questions for your sleep team. Use in the first weeks.
category: sleep
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [cpap, sleep-apnoea-treatment, mask-fit, treatment-adherence, desensitisation]
pairs_with:
  prompts: [prepare-sleep-doctor-appointment]
  personas: [sleep-coach]
args:
  - name: experience
    description: How long you have had CPAP, the mask type, what goes wrong (leaks, dry mouth, pressure feels too strong, pulling it off in your sleep, feeling trapped, noise, skin marks), and how many hours a night you manage.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Practice plan, Fixing what goes wrong, Routines, Questions for your sleep team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support people using continuous positive airway pressure (CPAP) prescribed by their sleep service. Many people struggle in the first weeks, and most problems are fixable: mask fit and size (many people need to try another style), leaks from overtightening as much as from loose straps, dry mouth from mouth breathing, discomfort from the pressure as they fall asleep, and feeling closed in. Gradual practice while awake helps people who feel claustrophobic. Settings such as pressure, ramp and humidity are set or approved by the sleep team or equipment provider, so the right move for pressure problems is to contact them, not to change prescribed settings alone. Benefits often build over weeks, and using it for most of the night on most nights matters.

Experience: {{experience}}
</context>

<task>
1. Check first: apply the screen in the constraints.
2. Practice plan: a two-week plan to build comfort, starting while awake (holding the mask, then wearing it with air on while reading or watching TV for short periods), then naps, then the whole night, with a target that grows gradually. Adjust to what they already manage.
3. Fixing what goes wrong: for each problem they mention, practical things they can try themselves (fitting the mask lying down in sleep position, not over-tightening, washing the face before bed, a chin strap or full-face mask to ask about for mouth breathing, hose management, putting it back on after night wakings) and what needs the provider (mask size or type change, humidifier and ramp settings, pressure).
4. Routines: daily and weekly cleaning as the manufacturer and provider instruct in general terms, replacing parts on the provider's schedule, travel with the machine, and what to do during a cold.
5. Questions for your sleep team: specific questions based on their problems, plus asking what usage data the machine records and how they will review it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not advise changing prescribed pressure or other clinical settings. Comfort settings the provider has shown them how to use are fine; anything else is for the sleep team.
- Screen: if they are still very sleepy, especially while driving, despite using CPAP, tell them not to drive drowsy and to contact their sleep team; follow local rules on driving with sleep apnoea, which differ by country. Chest pain, worsening breathlessness, nosebleeds that do not stop, or ear pain go to a doctor promptly.
- No product or brand recommendations. Do not suggest stopping CPAP or alternative treatments; questions about alternatives go to the sleep team.
- Be encouraging and practical; many people struggle at first.
</constraints>

<output_format>
## Check first
## Practice plan
A table: Days | Practice | Goal.
## Fixing what goes wrong
A table: Problem | Try yourself | Ask your provider.
## Routines
## Questions for your sleep team
</output_format>
