---
schema: 1
id: set-up-household-assistant
kind: prompt
title: Set up an AI assistant for your household
description: Sets up an AI assistant a household shares for meals, shopping, chores and schedules, with a household brief, allergies as hard rules, privacy between members and starter prompts.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [parent, home-cook, individual]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [family-assistant, weekly-menus, food-allergies, shared-account, household-admin]
pairs_with:
  prompts: [build-project-instructions, set-up-ai-for-kids, write-household-operations-manual]
  rules: [privacy-first-assistant-rules]
args:
  - name: household
    description: Who lives there (roles and ages are enough, no full names needed), dietary needs and allergies, budget, and anything that shapes daily life.
    type: text
    required: true
  - name: uses
    description: What the household wants help with, for example weekly meal plans, shopping lists, chore rotas, school-term schedules, trip planning.
    type: text
    required: true
  - name: tool
    description: "Optional: the assistant and plan you use, and whether it has projects, shared spaces or family accounts."
    type: text
output_contract:
  format: markdown
  sections: [Account set-up, Household brief, Rules for the assistant, Starter prompts, Left out, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A household assistant works when it knows the household's standing facts once, instead of being told every time: who eats what, the budget, the kitchen equipment, the weekly rhythm. Two distinctions matter. An allergy or a medical diet is a hard rule, while a dislike is a preference; an assistant that treats them the same may suggest a "small amount" of a dangerous food, and it cannot verify what is in a packaged product. And one shared login mixes everyone's chats and memories: a teenager's questions become visible to parents, and one person's preferences leak into another's answers. Most services also set a minimum age for their own accounts.

<household>
{{household}}
</household>
<uses>
{{uses}}
</uses>
{{#tool}}
<tool>
{{tool}}
</tool>
{{/tool}}
</context>

<task>
1. Recommend an account set-up: shared account with a household project, or separate accounts that each paste the same household brief, with the privacy trade-off of each. Tell the user to check the service's minimum age before giving children their own access.
2. Write the household brief: members by role and age range, hard dietary rules (allergies, medical diets, religious rules) listed separately from preferences, budget and shopping habits, equipment, location only as country and region for units and seasons, recurring schedule.
3. Write rules for the assistant: treat allergies as absolute and flag any ingredient it is unsure about; tell the user to check labels on packaged food; no medical advice beyond following the stated diet, and send questions about what is safe for someone with an allergy or medical diet to their doctor, allergist or dietitian; ask who is speaking if it matters; do not bring up one member's private chats with another; keep suggestions within budget.
4. Write starter prompts for each use, short enough to type on a phone.
5. List what you left out of the brief and why (full names, school names, exact address, health details beyond diet).
6. Give four test prompts, including one that tempts the assistant to bend an allergy rule.
</task>

<constraints>
- Never soften an allergy into a preference, and never suggest "a little" of an allergen or a cross-contamination guess.
- Do not invent household facts. Mark gaps as [ADD].
- Keep the brief under about 1,500 characters so it fits most instruction fields.
</constraints>

<output_format>
## Account set-up
Recommendation and trade-offs in three to five bullets.
## Household brief
One fenced block, ready to paste.
## Rules for the assistant
One fenced block.
## Starter prompts
Bullets grouped by use.
## Left out
Bullets, or "Nothing".
## Tests
Four bullets: prompt and pass condition.
</output_format>
