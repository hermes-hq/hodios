---
schema: 1
id: plan-work-wardrobe
kind: prompt
title: Plan what to wear to a new job
description: Works out the real dress norms of a new job or workplace from what you know, then plans a starter work wardrobe for the first month from your clothes, with a buy-later list.
category: personal-style
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [workwear, business-casual, first-day, office-dress, uniform-rules]
pairs_with:
  prompts: [decode-dress-code, build-capsule-wardrobe, prepare-teen-for-first-job]
  personas: [personal-stylist]
args:
  - name: job
    description: The role, industry, country and workplace, for example "junior accountant at a mid-size firm in Manchester, client-facing two days a week" or "nurse on a hospital ward".
    type: text
    required: true
  - name: what_you_know
    description: Anything you have seen or been told about how people dress there - the interview, photos, the written policy, what your manager wore.
    type: text
    required: true
  - name: current_clothes
    description: The clothes you already have that might work for this job.
    type: text
    required: true
  - name: budget
    description: What you can spend before your first pay day - "nothing", "low", "moderate" or an amount.
    type: string
    default: low
output_contract:
  format: markdown
  sections: [The dress norm here, First week, Work wardrobe from what you own, Buy later, Details that matter, Ask or watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people dress for a new job. You know that the written policy and the real norm often differ: "business casual" can mean chinos and a polo at a tech firm and a jacket without a tie at a law firm, and people dress up on client days, down on Fridays, and differently by team. You know the safe strategy for the first week is to match the more formal end of what was seen, then adjust after watching colleagues, and that buying a full new wardrobe before starting is the most common waste. You also know uniformed and safety-critical jobs (healthcare, kitchens, construction, labs) have rules about shoes, jewellery, nails, hair and sleeves that matter more than style.

Job: {{job}}
What you know about how people dress: {{what_you_know}}
Clothes you have: {{current_clothes}}
Budget before first pay: {{budget}}
</context>

<task>
1. State your best reading of the dress norm on a scale from uniform to formal business, how it varies by day or task, and how confident you are. Separate what the person has observed from what you assume about the industry and country.
2. If the job has uniform, hygiene or safety rules (for example closed non-slip shoes, bare below the elbows, no rings, hair tied back), list the common ones as things to confirm, not as fact.
3. Plan the first week, day by day, at the formal end of the norm, using owned clothes wherever possible.
4. Build a starter work wardrobe for the first month from the owned clothes: which pieces work, how to combine them, and how often each can repeat without anyone noticing.
5. Give a buy-later list in priority order, to buy only after a week or two of watching, with item descriptions and cheap routes (secondhand, alterations, staff discounts if offered).
6. Name the details that matter in this kind of workplace: fit, shoes, ironing, coats, bags, grooming, and anything worn on camera if there are video calls.
7. List what to ask HR or the manager, or what to watch for in the first days.
</task>

<constraints>
- Do not invent the company's policy. Present industry norms as typical, and say what to check.
- No brands, shops or links. No comments on the person's body.
- Do not assume gender; offer options for both trouser-based and dress or skirt-based outfits when relevant.
- Cultural and religious dress is valid workwear; never suggest removing it.
- Keep purchases inside the budget; with "nothing", show how to manage with what is owned.
- Before you reply, check that the first week uses owned clothes where possible and that the buy-later list waits for observation.
</constraints>

<output_format>
## The dress norm here
Two to four sentences, with confidence.
## First week
A short table: Day | Outfit | Note.
## Work wardrobe from what you own
Bullets.
## Buy later
Numbered.
## Details that matter
Bullets.
## Ask or watch for
Bullets.
</output_format>
