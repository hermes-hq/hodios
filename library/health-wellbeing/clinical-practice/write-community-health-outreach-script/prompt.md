---
schema: 1
id: write-community-health-outreach-script
kind: prompt
title: Write a community health outreach script
description: Writes outreach scripts for community health workers inviting people to screening, vaccination or clinics, in plain language with cultural adaptations and honest answers to common worries.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [community-health-workers, health-outreach, screening-uptake, vaccination, health-equity, plain-language]
pairs_with:
  prompts: [plan-health-promotion-session, write-clinic-phone-scripts, write-patient-education-handout]
args:
  - name: programme
    description: What people are being invited to, for example "cervical screening catch-up clinic", "childhood vaccinations", "free blood pressure checks at the mosque", "diabetes eye screening".
    type: string
    required: true
  - name: community
    description: Who you are reaching - languages spoken, cultural or faith context, common barriers you already know about (work hours, transport, trust, childcare, past bad experiences), and who the community trusts.
    type: text
    required: true
  - name: channel
    description: How the outreach happens. door-to-door is in person at people's homes; phone is a call; text is an SMS or messaging app message; event is a stall or talk at a community event.
    type: enum
    enum: [door-to-door, phone, text, event]
    default: phone
  - name: approved_materials
    description: Key facts from the programme's approved materials - who is eligible, what happens at the appointment, cost, dates, location, how to book, and the answers to frequently asked questions. The script uses only these facts. Leave empty and facts will be left as placeholders.
    type: text
output_contract:
  format: markdown
  sections: [Script, Common worries, Cultural and language notes, Do and don't, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write outreach scripts for community health workers, promotoras, health champions and outreach staff. Outreach works when it comes from someone trusted, is short, respects the person's right to say no, removes practical barriers, and answers worries honestly instead of arguing. It fails when it sounds like a sales call, hides what the appointment involves, or answers a question with something the worker made up. Every health fact in the script comes from the programme's approved materials.

Programme: {{programme}}
Channel: {{channel}}
<community>
{{community}}
</community>
{{#approved_materials}}
<approved_materials>
{{approved_materials}}
</approved_materials>
{{/approved_materials}}
</context>

<task>
1. Write the script for the channel:
   - phone: introduce yourself and who you work with, check you are speaking to the right person and that it is a good time and private enough to talk, the reason for the call in one sentence, the key facts, the invitation, help with booking and practical barriers, and a respectful close whether they say yes, maybe or no.
   - door-to-door: the same, plus showing ID, staying on the doorstep unless invited, and a leave-behind card.
   - text: one or two short messages that name the sender and programme, the invitation, how to book, and how to opt out; no sensitive health details in the message.
   - event: a 30-second opener for passers-by, a two-minute talk, and how to sign people up on the spot.
2. Write answers to the five to eight worries most likely for this programme and community (for example cost, pain, time off work, safety, privacy, gender of the clinician, immigration status, faith questions). Each answer acknowledges the worry, gives facts only from the approved materials, and says where to get more. If the materials do not cover a worry, write "[answer from programme FAQ or clinician]" and a line the worker can say: "That's a good question. I don't want to guess; I can ask the nurse to call you."
3. Cultural and language notes: plain-language wording, words to avoid, how to adapt for the languages and context given, using trained interpreters rather than family members (especially not children), and trusted messengers or places to partner with.
4. Do and don't for the worker: respect a no, never pressure or shame, keep what people tell them confidential within programme rules, record only what the programme asks, and pass health questions or urgent symptoms to a clinician.
5. List facts to confirm: every placeholder and any fact the script needs that the materials did not give.
6. Before answering, check that every health claim in the script and answers appears in the approved materials and that the language reads at around a primary-school level.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts from the approved materials. Never state eligibility, risks, benefits, side effects, statistics or costs that are not given; use placeholders.
- Do not counter misinformation with invented facts or argue. Acknowledge, share the approved fact if there is one, and offer a conversation with a clinician.
- Respect autonomy. The person can decline, and the script ends warmly either way.
- If someone describes symptoms that sound urgent during outreach, the script tells the worker to direct them to urgent care or emergency services, not to advise them.
- Avoid stereotyping: use only the community details provided and frame cultural notes as things to check with community members.
- If the programme or community is too vague to write for, ask two questions and stop.
</constraints>

<output_format>
## Script
The script with the worker's lines and short notes in italics on what to do.
## Common worries
Table: Worry | What to say | Source (materials or "to confirm").
## Cultural and language notes
Bullets.
## Do and don't
Two short lists.
## Facts to confirm
Bullets.
</output_format>
