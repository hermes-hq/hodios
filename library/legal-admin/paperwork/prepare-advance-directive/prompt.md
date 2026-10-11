---
schema: 1
id: prepare-advance-directive
kind: prompt
title: Prepare an advance directive
description: Prepares the content of an advance directive or living will - treatments to accept or refuse, values, a healthcare proxy - and how to make it valid, stored and known locally.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law, healthcare]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [advance-directive, living-will, healthcare-proxy, end-of-life, advance-decision, medical-wishes]
pairs_with:
  prompts: [prepare-advance-care-plan-questions, prepare-power-of-attorney-questions, prepare-will-questions, organize-important-documents]
args:
  - name: location
    description: Country and state or region where you live, and anywhere else you spend long periods; validity rules and official forms are local.
    type: string
    required: true
  - name: wishes
    description: What you want recorded, in your own words - situations you are thinking about (dementia, permanent unconsciousness, terminal illness, a stroke), treatments you feel strongly about, religious or personal values, who you would want to speak for you, and any health condition you already have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this document can and cannot do, Decisions to make, Draft wording, Choosing your healthcare proxy, Making it valid, Storing and sharing it, Questions for your doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people turn their wishes about future medical treatment into an advance directive, living will or advance decision that will actually be followed. What makes these documents fail in practice: wording too vague to apply ("no heroic measures"), refusals that do not name the treatment and the situation, a refusal of life-sustaining treatment that does not meet the local formal requirements (some places require it in writing, signed, witnessed and with an explicit statement that it applies even if life is at risk), no named person who knows the wishes, and a document nobody can find in an emergency. Experts separate three things: binding refusals of specific treatments, statements of values and preferences that guide decisions, and appointing a healthcare proxy or attorney, which in some places is a separate document. Many regions publish an official form, and emergency treatment orders (such as do-not-resuscitate orders or physician orders for life-sustaining treatment) are a different, clinician-signed document. You prepare the content and the checklist; local forms and a clinician conversation make it valid.

Location: {{location}}
</context>

<task>
Wishes in the person's words:

<wishes>
{{wishes}}
</wishes>

1. Explain briefly what an advance directive can do in {{location}} as a pattern to verify: refuse treatments, record preferences, appoint a proxy; and what it cannot do, such as demand a specific treatment or request help to die where that is not lawful. Mention that clinician-signed emergency orders are separate.
2. Decisions to make: walk through the situations named and for each ask what they would want regarding resuscitation, mechanical ventilation, artificial nutrition and hydration, antibiotics for life-threatening infection, dialysis, hospital admission versus staying home, and comfort care. Where the wishes already answer a question, record the answer; otherwise list it as an open question. Ask follow-up questions if key situations are unclear.
3. Draft wording: turn the answers into clear statements that name the treatment, the situation it applies to, and whether it applies even if life is at risk; plus a values statement in the person's own voice (what makes life worth living for them, fears, faith, where they would like to be cared for).
4. Choosing a healthcare proxy: qualities to look for, the conversation to have with them, a backup, and whether a separate power of attorney document is needed locally.
5. Making it valid: the official form if one exists, signature, witnesses or notary and who cannot be a witness, the exact wording some places require for refusals of life-sustaining treatment, all marked "to verify".
6. Storing and sharing it: copies to the doctor and proxy, a note in the wallet or phone, any official registry, review after diagnosis, a move, or every few years.
7. Questions for the doctor: what the treatments involve for someone with their health, and whether an emergency treatment order also makes sense.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Record the person's wishes, not yours; do not steer them towards accepting or refusing any treatment.
- Do not give medical predictions about their condition; suggest discussing likely scenarios with their doctor.
- Do not state validity rules or form names unless confident; mark them "to verify" and suggest the official health department form or an adviser.
- Keep a calm, respectful tone; if the person seems distressed or mentions wanting to die now, follow the crisis guidance.
{{> guardrails/crisis-safety}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What this document can and cannot do
Three or four bullets.

## Decisions to make
Table: situation | treatment | your wish | still to decide.

## Draft wording
The draft statements and values statement.

## Choosing your healthcare proxy
Bullets.

## Making it valid
Checklist marked to verify.

## Storing and sharing it
Bullets.

## Questions for your doctor
Bullets.
</output_format>
