---
schema: 1
id: plan-eating-for-injury-recovery
kind: prompt
title: Plan eating for injury recovery
description: Explains general eating to support healing after a fracture, surgery or sports injury, covering energy, protein and key nutrients, easy meals with limited mobility, and questions for the care team.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [injury-recovery, post-surgery, fracture-healing, protein, rehabilitation]
pairs_with:
  prompts: [reach-daily-protein-target, plan-eating-when-appetite-is-low, increase-fiber-gradually, plan-sports-nutrition]
  personas: [nutrition-educator]
args:
  - name: injury
    description: "The injury or operation, when it happened, how mobile you are now, pain medicines you take, your usual activity level, appetite, and any health conditions."
    type: text
    required: true
  - name: eating
    description: "What you eat now, eating pattern, who cooks, and how much you can stand or move in the kitchen. Optional."
    type: text
output_contract:
  format: markdown
  sections: [What we can help with, Your recovery needs, Foods that cover them, Easy meals while mobility is limited, Supplements to ask about, Ask your care team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain how eating supports healing. Two common mistakes: active people cut food sharply when they stop training, which together with immobility speeds muscle loss; and people focus on supplements while missing the basics. Healing tissue needs enough energy overall (needs drop somewhat with less activity but rise with healing, so a big cut is a bad idea), and protein spread across the day; many sports and clinical sources suggest intakes above the general adult reference during recovery. Bone healing relies on calcium, vitamin D and protein; wound and soft-tissue healing on protein, vitamin C and zinc, all available from ordinary foods. Some early research suggests collagen or gelatin with vitamin C before rehab exercise may help tendons and ligaments, but the evidence is limited. Opioid painkillers and lying still cause constipation, so fluids, fibre and gentle movement matter. Smoking and heavy drinking slow healing. Before and after surgery, the surgical team's instructions on fasting, diet progression and wound care come first.

Injury or operation: {{injury}}
{{#eating}}Current eating and practicalities: {{eating}}{{/eating}}
</context>

<task>
1. State what you can help with, and that surgical diet instructions, wound care and medicines belong to the care team.
2. Explain their recovery needs in plain words: not under-eating, protein at each meal, and the nutrients that matter for their type of injury (bone or soft tissue or wound).
3. List foods that cover each need, fitted to their eating pattern, with household portions.
4. Plan easy meals and snacks for limited mobility: minimal standing, one-hand or no-cook options, batch cooking by someone else, and what to keep within reach. Include fluids and fibre to prevent constipation from painkillers.
5. Note which supplements are sometimes discussed (for example vitamin D, calcium, or collagen with vitamin C), the strength of evidence, and that the doctor or pharmacist decides whether and how much; do not give doses.
6. List questions for the surgeon, GP, physiotherapist or dietitian.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Signs of infection (spreading redness, heat, pus, fever), calf pain or swelling, chest pain or breathlessness, or severe uncontrolled pain need urgent medical attention; put this first if mentioned.
- Do not give supplement doses or recommend brands; do not suggest supplements interact safely with their medicines.
- If they have diabetes, kidney disease or are on a prescribed diet, keep advice general and point to their care team.
- Do not suggest weight-loss dieting during recovery unless their clinician has advised it.
- Do not promise faster healing from any food or product.
</constraints>

<output_format>
## What we can help with
## Your recovery needs
## Foods that cover them
Table: Need | Foods | Easy portion.
## Easy meals while mobility is limited
## Supplements to ask about
Table: Supplement | Why discussed | Evidence | Ask.
## Ask your care team
</output_format>
