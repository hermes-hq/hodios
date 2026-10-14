---
schema: 1
id: stop-skipping-meals
kind: prompt
title: Stop skipping meals
description: Builds a routine for someone who forgets or skips meals when busy, with eating anchors, low-effort default meals, a stocked fallback stash and a check for deliberate restriction.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [regular-eating, meal-routine, low-effort-meals, adhd-friendly, busy-schedule]
pairs_with:
  prompts: [plan-filling-snacks, fix-afternoon-energy-crash, plan-shift-work-eating, manage-emotional-eating]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Which meals you skip and why (forget, no time, not hungry, no food around), your daily schedule, where you are at mealtimes, what happens later (crash, overeating, headaches), and any conditions or medicines that affect appetite."
    type: text
    required: true
  - name: resources
    description: "Kitchen access, budget, cooking skills and what food you like. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Why meals are getting skipped, Your eating anchors, Default meals, Fallback stash, Making it stick, Check with a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who mean to eat but don't. Skipping is usually a systems problem, not a willpower one: hunger signals get missed during focused work or stress, ADHD and some medicines (stimulants in particular) blunt appetite, there is no food within reach, or deciding what to eat feels like one decision too many. The usual consequences are an energy and mood dip mid-afternoon, headaches, then overeating in the evening, which people then misread as a willpower problem. What works: anchoring meals to things that already happen (a meeting ending, the school run, a medication time) rather than to hunger; a reminder that is hard to dismiss; a short list of "default meals" needing no decisions and under five minutes (a protein, a carbohydrate and a fruit or vegetable, for example yoghurt, granola and a banana); a fallback stash in the bag, desk, car or bedside; and lowering the bar so that "something" counts as a meal. Deliberate skipping to control weight is a different problem and needs different help.

Situation: {{situation}}
{{#resources}}Resources: {{resources}}{{/resources}}
</context>

<task>
1. Name why meals are being skipped from what they said, and whether it is forgetting, time, low appetite, no access, or deliberate. If it is deliberate restriction for weight or driven by fear of eating, follow the constraints.
2. Set eating anchors: tie each meal and one or two snacks to an existing event, with a reminder method they will not ignore, and a maximum gap of about four to five hours while awake.
3. Write five to eight default meals and snacks that take under five minutes, need no cooking or very little, fit their budget and likes, and each include a protein source.
4. Plan a fallback stash for each place they spend time, with shelf-stable items and a restock cue.
5. Make it stick: preparing one thing the night before, putting food in sight, starting with the one meal skipped most, and a weekly check of what worked.
6. Close with when to check with a professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If they skip meals on purpose to lose weight, feel guilty eating, or describe restriction, bingeing or purging, do not frame this as a productivity fix; say warmly what you noticed and suggest a doctor or an eating-disorder support service in their country.
- If appetite loss is new, comes with weight loss, low mood or other symptoms, or started with a new medicine, suggest checking with a doctor or pharmacist; do not advise changing or timing medicines.
- If they take insulin or other glucose-lowering medicines, say skipping meals can cause low blood sugar and to agree a plan with their diabetes team.
- No calorie targets and no moralising about food quality; a simple meal eaten beats a perfect one skipped.
- Do not recommend meal-replacement products as the main solution.
</constraints>

<output_format>
## Why meals are getting skipped
## Your eating anchors
Table: Meal | Anchor | Reminder | Default option.
## Default meals
## Fallback stash
Checklist by place.
## Making it stick
## Check with a professional if
</output_format>
