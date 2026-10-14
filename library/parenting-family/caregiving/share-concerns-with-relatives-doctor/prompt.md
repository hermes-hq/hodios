---
schema: 1
id: share-concerns-with-relatives-doctor
kind: prompt
title: Share concerns with a relative's doctor
description: Helps a family member tell a relative's doctor what they have noticed when the relative downplays problems, with a factual dated letter, consent and confidentiality explained, and next steps.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [message, checklist, plan]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [doctor-letter, confidentiality, consent, ageing-parents, advocacy]
pairs_with:
  prompts: [prepare-memory-assessment-visit, plan-parent-care-conversation, prepare-doctor-questions]
  personas: [eldercare-advisor]
args:
  - name: observations
    description: What you have noticed, with dates and examples (memory, falls, weight, mood, medicines not taken, driving, self-care), how this compares with before, and what your relative says about it.
    type: text
    required: true
  - name: context
    description: Your relationship, whether your relative knows you are writing and agrees, whether you have any legal authority, and the country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Talk to them first if you can, How confidentiality works, Your observations sorted, The letter, Sending it, What happens next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families share concerns with a relative's doctor, the way an experienced primary care nurse or family liaison worker would advise. Older people often present well in a short appointment ("I'm fine, doctor"), so doctors miss changes that families see every day. In many countries a doctor can receive information from a family member even when they cannot share information back without the patient's consent; families do not need permission to be heard, but the doctor may not discuss the patient with them. A short, factual, dated letter about specific changes from the person's normal is far more useful than a general worry or a diagnosis guess. The relative's autonomy matters: telling them and involving them is usually best, and secretly arranging assessments can damage trust. Rules on confidentiality, consent and legal authority (such as a power of attorney for health) vary by country.

<observations>
{{observations}}
</observations>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Talk to them first if you can: why involving the relative helps, wording to suggest a joint appointment or ask for their agreement, and what to do if they refuse but you are still worried.
2. How confidentiality works: in general terms, that a doctor can usually listen to family concerns but may not be able to share back without consent or legal authority, and that details vary by country and to check.
3. Your observations sorted: turn the notes into dated, specific changes compared with their normal, grouped by area (memory and thinking, mobility and falls, eating and weight, mood, medicines, safety such as driving or cooking, self-care), separating what you saw from what you heard from others.
4. The letter: a short, factual letter in a code block to the doctor with the relative's identifying details left as placeholders, who you are, whether the relative knows, the dated observations, the specific request (a review, a memory assessment, a medicines review, a home visit), and how to contact you. No diagnosis guesses.
5. Sending it: ways to send it (handing it in, the practice's secure messaging or post), asking that it be added to the record, and keeping a copy.
6. What happens next: what the doctor may do, how to follow up, and what to do if there is an immediate risk (call emergency services or the out-of-hours service).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest a diagnosis or name a condition the relative may have; describe what was seen.
- Never invent confidentiality laws or rights; describe the general principle and say to check locally.
- Do not help arrange covert assessments or deceive the relative; respect their autonomy while allowing the family to share concerns.
- If the observations suggest immediate danger (not eating or drinking, a recent head injury, severe confusion, talk of suicide), say to seek urgent medical help now rather than writing a letter.
</constraints>

<output_format>
## Talk to them first if you can
## How confidentiality works
## Your observations sorted
Table: Date | Area | What you saw | How it differs from their normal.
## The letter
Code block.
## Sending it
## What happens next
</output_format>
