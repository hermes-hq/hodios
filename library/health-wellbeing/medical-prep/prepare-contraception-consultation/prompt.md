---
schema: 1
id: prepare-contraception-consultation
kind: prompt
title: Prepare for a contraception appointment
description: Prepares for a contraception appointment with your priorities, the health details that affect which methods are suitable, an overview of method types and questions on side effects and switching.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [contraception, birth-control, long-acting-contraception, sexual-health, womens-health]
pairs_with:
  prompts: [prepare-doctor-questions, build-medication-list, explain-medication-leaflet]
  personas: [health-navigator]
args:
  - name: priorities
    description: What matters to you, for example "nothing daily", "no hormones", "lighter periods", "want children in about two years", "something I control myself", "problems with my current pill".
    type: text
    required: true
  - name: health
    description: Health details that may matter, for example age, smoking or vaping, migraines (with or without aura), blood pressure, blood clots in you or family, recent birth or breastfeeding, epilepsy or other medicines, weight. Optional but it makes the preparation much more useful.
    type: text
  - name: country
    description: Country, because which methods are available, who prescribes them and the cost differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your priorities, Health details to mention, Method types to ask about, Questions for the clinician, Practical points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a contraception appointment with a doctor, nurse, pharmacist or sexual health clinic. Clinicians decide which methods are safe for a person using medical eligibility criteria (such as the WHO criteria and national versions of them), so certain details change the options: migraine with aura, smoking at age 35 or over, high blood pressure, a history of blood clots, recent childbirth or breastfeeding, some cancers and liver conditions, and medicines that reduce hormonal contraceptive effectiveness (such as some epilepsy medicines, some HIV and TB medicines, and St John's wort). People who know their priorities (daily or not, hormonal or not, effect on bleeding, how quickly fertility returns, how much control they want) get a better match. Effectiveness differs mostly by how much depends on daily use: long-acting methods (implant, hormonal and copper IUDs) are the most effective in typical use, while pills, patch and ring depend on consistent use, and condoms are the only method that also protects against sexually transmitted infections.

Priorities: {{priorities}}
{{#health}}Health details: {{health}}{{/health}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Urgent check: if their notes mention unprotected sex in the last few days, say emergency contraception is time-sensitive and to contact a pharmacy or clinic today; if they mention pregnancy symptoms or a possible pregnancy, suggest a test first.
2. Your priorities: restate {{priorities}} as a short ranked list they can read out, and add any priority they may not have considered (effect on periods, return to fertility, privacy, cost, needing a procedure to start or stop).
3. Health details to mention: list the details from their notes that clinicians use to check eligibility, plus a short "also tell them if" list of the common ones above that they did not mention. Explain in one line each why it matters, without saying any method is ruled out.
4. Method types to ask about: a table of the main types (implant, hormonal IUD, copper IUD, injection, combined pill, patch and ring, progestogen-only pill, condoms and other barriers, fertility awareness, and sterilisation or vasectomy where relevant), with how it is used, how often, typical-use effectiveness as a broad tier (most effective / effective with consistent use / less effective in typical use), common bleeding effects, and return of fertility. Mark the ones that seem to fit their stated priorities "worth asking about", without recommending one.
5. Questions for the clinician: top three first, then the rest, including which options are safe for me and why, common side effects and how long to give it, what to do if I miss or am late with a dose, interactions with my medicines, how and where it is started and removed, and what follow-up is needed.
6. Practical points: when a new method becomes effective and whether backup is needed (ask), condoms for STI protection, how to switch if it does not suit them, and cost or coverage to check in their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific method or say a method is safe or unsafe for them. Eligibility is the clinician's decision.
- Do not give exact failure-rate percentages unless you are confident they match widely published figures; prefer the broad tiers.
- Use neutral, non-judgemental language about sex, relationships and choices; do not assume the gender of partners.
- Do not give dosing or "how to take" instructions beyond what to ask.
</constraints>

<output_format>
## Your priorities
## Health details to mention
## Method types to ask about
Table: Method | How it is used | Effectiveness tier | Bleeding effects | Return of fertility | Fits your priorities?
## Questions for the clinician
Top 3, then the rest.
## Practical points
</output_format>
