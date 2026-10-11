---
schema: 1
id: review-diet-plan
kind: prompt
title: Review a diet plan
description: Audits a diet plan from an influencer, app or coach for safety, nutritional gaps, evidence and whether you could keep it up, with red flags and safer adjustments.
category: nutrition
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [report, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [diet-review, red-flags, nutrient-gaps, fad-diets, weight-management]
pairs_with:
  prompts: [compare-diet-approaches, check-health-claim, plan-sustainable-weight-loss, plan-nutrition-targets]
  personas: [nutrition-educator]
args:
  - name: plan
    description: "The diet plan as written: meals, rules, calorie or macro targets, supplements or products it sells, and the promised results. Paste it or describe it in detail."
    type: text
    required: true
  - name: about_you
    description: "Your age, rough size, activity, health conditions, medicines, pregnancy or breastfeeding, eating pattern, and any past dieting or eating problems."
    type: text
    required: true
  - name: goal
    description: "What you hope the plan will do for you. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary verdict, Safety red flags, Nutritional gaps, Evidence check, Will it last, Safer adjustments, Ask a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review diet plans the way a registered dietitian would before a client starts one. Most commercial plans produce short-term weight loss from eating less, whatever their theory; the questions that matter are whether it is safe for this person, what it leaves out, whether its claims hold up, and whether they could live with it for a year. Common red flags: energy below about 1,200 kcal a day for women or 1,500 for men without medical supervision; cutting whole food groups without a medical reason; promised loss faster than about 1 kg a week after the first fortnight; "detox", "cleanse" or "reset" language; mandatory supplements, teas, powders or coaching sold by the plan's author; rigid lists of forbidden foods; and guilt-based rules. Predictable gaps by pattern: very low carbohydrate plans run short of fibre; dairy-free plans of calcium and iodine; vegan plans of B12, iodine and sometimes iron and omega-3; juice or soup plans of protein; carnivore plans of fibre and vitamin C. Plans built on strict rules are associated with weight regain and, for some people, disordered eating.

Plan: {{plan}}
About the person: {{about_you}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Summarise the plan in three lines: daily structure, rough energy level (estimate if not given, marked as an estimate), and its central claim.
2. Check safety for this person first: the red flags above, plus their conditions and medicines (for example low-carbohydrate or fasting plans with insulin or sulfonylureas, high-protein plans with kidney disease, plans that conflict with pregnancy). Rank flags as stop, change or watch.
3. Check nutritional gaps: protein, fibre, calcium, iron, B12, iodine, omega-3, vitamin D, fluids, and the food groups it removes, with which foods would close each gap.
4. Check the evidence for the plan's claims in plain words, separating "works because you eat less" from any claimed special mechanism.
5. Judge sustainability: cost, cooking time, social eating, hunger, and what happens when it ends.
6. Give a verdict (reasonable as written, reasonable with changes, not recommended) and the smallest set of changes that would make it safer and more balanced, or a better alternative approach if it is not recommended.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If the person is under 18, pregnant or breastfeeding, underweight, or mentions purging, laxatives, compensating with exercise or a past eating disorder, do not help them adapt a restrictive plan. Say warmly why, and suggest a doctor or registered dietitian and, where relevant, an eating-disorder support service in their country.
- If they take insulin, sulfonylureas, blood pressure or blood-thinning medicines, or have kidney, liver or heart disease, say the plan needs their clinician's agreement before they start.
- Do not invent evidence, study results or credentials for the plan's author. Do not name or attack the author personally; review the plan.
- Do not recommend specific supplements or doses; say which nutrients to ask a pharmacist or dietitian about.
- No moralising about foods or bodies.
</constraints>

<output_format>
## Summary verdict
One verdict line, then the plan in three lines.
## Safety red flags
Table: Flag | Why it matters for you | Stop / change / watch.
## Nutritional gaps
Table: Nutrient or food group | Why short | Foods that close the gap.
## Evidence check
## Will it last
## Safer adjustments
Numbered, smallest changes first.
## Ask a professional if
</output_format>
