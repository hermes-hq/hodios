---
schema: 1
id: prepare-weight-medication-consultation
kind: prompt
title: Prepare to discuss weight-loss medication
description: Prepares for a talk with a clinician about prescribed weight-loss medicine, with your history, health details that matter, and questions on eligibility, side effects, cost and stopping.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [weight-loss-medication, glp-1, obesity-care, weight-management, prescription-medicine]
pairs_with:
  prompts: [plan-eating-on-weight-loss-medication, plan-sustainable-weight-loss, prepare-doctor-questions, build-medication-list]
  personas: [health-navigator, pharmacist-educator]
args:
  - name: story
    description: Your weight history and why you are asking now, for example "gained 25 kg over ten years, tried several diets, knee pain, prediabetes on last blood test".
    type: text
    required: true
  - name: health
    description: Conditions, medicines, pregnancy or plans to conceive, and any history of pancreatitis, gallbladder problems, thyroid cancer in you or your family, eating disorders or diabetes treatment. Optional but important.
    type: text
  - name: route
    description: How you would get it.
    type: enum
    enum: [public-health-service, insurance, private-clinic, not-sure]
    default: not-sure
  - name: country
    description: Country, because eligibility rules, availability and cost differ widely. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your story in brief, Health details to share, Questions about eligibility and access, Questions about the medicine, Questions about cost and supply, Questions about the long term, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a consultation about prescribed weight-loss medicine, such as the GLP-1 and related medicines given by injection or tablet. Eligibility rules differ by country, health service and insurer, and usually depend on body mass index together with weight-related conditions, sometimes with a requirement to take part in a weight-management programme. Clinicians also check things that make a medicine unsuitable or need extra care: pregnancy, breastfeeding or plans to conceive (these medicines are usually stopped well before trying to conceive), a history of pancreatitis, gallbladder disease, some thyroid cancers in the person or family, eating disorders, diabetes treatment that could cause low blood sugar, and other medicines (absorption of oral medicines, including some contraceptive pills, can be affected). Common realities people are not told: gastrointestinal side effects are frequent, especially as the dose is stepped up; muscle loss can accompany weight loss, so protein intake and strength exercise matter; much of the weight often returns after stopping; supply and cost can be problems; and unregulated or counterfeit products sold online carry real danger. A prepared patient brings a clear history, honest health details and questions about the whole plan, not only the prescription.

Story: {{story}}
{{#health}}Health details: {{health}}{{/health}}
Route: {{route}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Your story in brief: a short summary they can read out: weight history, what they have tried and what happened, how weight affects their health and daily life, and why they are asking now. Use their words; mark gaps with [add].
2. Health details to share: the relevant health details they gave, plus a "tell them if" list of the common factors above they did not mention, one line each on why it matters, without saying anything rules them in or out.
3. Questions about eligibility and access: whether I am eligible on this route and why, whether a programme or other steps come first, how long it takes, and who prescribes and monitors.
4. Questions about the medicine: which options exist and how they differ, how it is taken and stepped up, common and serious side effects and what to do about them, interactions with my medicines and contraception, and how they will judge whether it is working.
5. Questions about cost and supply: what it costs or what is covered for how long, what happens if supply runs short, and why buying outside a licensed pharmacy with a prescription is unsafe.
6. Questions about the long term: how long people usually stay on it, what happens to weight after stopping, how to protect muscle and nutrition, and the plan for pregnancy if relevant.
7. Safety notes: severe persistent abdominal pain, persistent vomiting, signs of dehydration or of low blood sugar are reasons to seek urgent advice; never adjust, share or buy medicine outside the prescriber.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them they are or are not eligible, recommend a brand or medicine, or give doses or step-up schedules.
- Do not give or point to sources of medicine without a prescription, including compounded or "research" products.
- Do not quote average weight-loss percentages, prices or coverage rules as fact; frame them as questions.
- Neutral, non-stigmatising language about weight. Do not moralise about medicine versus lifestyle. If their notes suggest disordered eating, mention it gently as something to raise with the clinician.
</constraints>

<output_format>
## Your story in brief
## Health details to share
## Questions about eligibility and access
## Questions about the medicine
## Questions about cost and supply
## Questions about the long term
## Safety notes
</output_format>
