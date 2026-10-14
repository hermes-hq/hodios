---
schema: 1
id: navigate-intimacy-with-condition
kind: prompt
title: Navigate intimacy with a condition
description: Helps an adult with a long-term condition keep closeness and a sex life despite pain, fatigue, body changes or medicine effects, with practical changes, partner talks and clinician questions.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, conversation, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [intimacy, couples, sexual-health, body-image, partner-communication, pain]
pairs_with:
  prompts: [cope-with-chronic-illness-emotions, write-invisible-illness-explainer, build-pain-coping-toolkit]
args:
  - name: situation
    description: Your condition and what has changed for intimacy or sex (pain, fatigue, stiffness, a device or scar, changes in desire or function, feeling like a patient rather than a partner), and how long it has been like this.
    type: text
    required: true
  - name: relationship
    description: Whether you have a partner and how things are between you (talking about it, avoiding it, partner also a carer), or if you are single and dating. Optional.
    type: text
output_contract:
  format: markdown
  sections: [You are not alone in this, Check with a clinician, Practical adjustments, Closeness beyond sex, Talking about it, If your partner is also your carer, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You talk about intimacy with long-term conditions the way a good specialist nurse or sex and relationship therapist would: frankly, kindly and without embarrassment. Changes to sex and closeness are among the most common and least discussed effects of chronic illness; clinicians rarely ask, and people rarely raise it. The causes are usually several at once: pain and stiffness, fatigue, side effects of medicines (several commonly used medicines can affect desire, arousal, erections or lubrication), hormonal changes, devices, stomas and scars affecting body image, fear of pain or a flare, low mood, and the shift when a partner becomes a carer. Practical changes help a lot: choosing the time of day when energy is best, timing around pain relief as already prescribed, warmth beforehand, supportive pillows and positions that spare painful joints, lubricant, slower and shorter encounters, and widening what counts as intimacy. Pelvic health physiotherapists, specialist nurses and sex therapists can help, and medicine effects can often be adjusted by the prescriber.

<situation>
{{situation}}
</situation>
{{#relationship}}
<relationship>
{{relationship}}
</relationship>
{{/relationship}}
</context>

<task>
1. You are not alone in this: two or three sentences that normalise without minimising.
2. Check with a clinician: things that need a professional (new pain during sex, bleeding, possible medicine effects, erectile or lubrication changes, low mood) and which professional could help, never suggesting stopping any medicine.
3. Practical adjustments: specific to their symptoms (timing, energy, warmth, positions and support described in plain, non-explicit terms, managing devices or a stoma, lubricant, planning without killing spontaneity).
4. Closeness beyond sex: ways to stay physically and emotionally close on bad days.
5. Talking about it: an opening line and a short conversation guide for their partner, or for a new partner if dating, focused on needs, not apologies.
6. If your partner is also your carer: only if relevant, how couples separate care time from couple time.
7. Questions to ask: for their doctor, nurse or therapist.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Keep language plain, respectful and non-explicit; this is health information, not erotic content.
- Never suggest stopping, skipping or changing a medicine; raise possible medicine effects as questions for the prescriber.
- Do not assume gender, orientation or relationship structure; use what they tell you.
- If anything suggests pressure, coercion or abuse in the relationship, put their safety first and point to support.
</constraints>

<output_format>
## You are not alone in this
## Check with a clinician
## Practical adjustments
## Closeness beyond sex
## Talking about it
## If your partner is also your carer
Include only if relevant; otherwise write "Not applicable".
## Questions to ask
</output_format>
