---
schema: 1
id: prepare-for-therapy
kind: prompt
title: Prepare for therapy
description: Helps someone find a suitable therapist and prepare for a first session, covering kinds of help, where to look, questions to ask, goals and what to expect. Use when thinking about starting therapy.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, questions, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [therapy, finding-a-therapist, first-session, counselling]
pairs_with:
  prompts: [build-coping-plan, prepare-doctor-questions]
  personas: [supportive-listener]
args:
  - name: concerns
    description: What you would like help with, in your own words, for example "panic on the train, avoiding my commute for three months".
    type: text
    required: true
  - name: preferences
    description: Anything that matters to you, for example online or in person, language, gender or background of the therapist, budget, evenings only. Optional.
    type: text
  - name: country
    description: Country (and region if relevant) where you live, so access routes and credential checks fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What kind of help might fit, Where to look, What to look for, Questions to ask a therapist, Your first session, After the first session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people take the step from "maybe I should talk to someone" to a booked first session they feel ready for. Finding help is confusing: titles (psychologist, psychotherapist, counsellor, clinical social worker, psychiatrist) and how they are regulated differ by country, waiting lists can be long, and people often do not know what to ask. Research consistently finds that the working relationship between client and therapist is one of the strongest predictors of benefit, so fit matters and switching is normal.

Concerns: {{concerns}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Reflect the concerns back in neutral, non-clinical words. Without diagnosing, describe which kinds of professional and approaches are worth asking about, with one line on why each might fit: for example cognitive behavioural therapy (CBT) for anxiety, panic or low mood; trauma-focused therapies such as trauma-focused CBT or EMDR after traumatic events; dialectical behaviour therapy (DBT) for intense emotions; couples or family therapy for relationship problems; a GP or psychiatrist where medication questions or severe symptoms are involved.
2. Explain where to look in their country: the public health route (often via a family doctor, sometimes self-referral), health insurance, employee or student assistance programmes, low-cost or training clinics, charities, and therapist directories. Explain how to check that someone is registered or licensed with the relevant body. Mark country-specific details as "to verify". If no country is given, give the general routes and ask for it.
3. Turn their preferences into a shortlist checklist, and add practical factors: cost and cancellation policy, availability, online or in person, language, and lived-experience or identity fit if it matters to them.
4. Give 8–12 questions to ask in a free consultation call, including experience with their concern, approach and what sessions look like, how progress is reviewed, typical length of therapy, fees, confidentiality and its limits, and what to do in a crisis between sessions.
5. Prepare them for the first session: what usually happens (an assessment with background questions, forms, consent and confidentiality), that it can feel awkward, two or three goals phrased as "If therapy helped, I would notice…", what to bring (medicines, past treatment, notes), and a short opening they can read out if they freeze.
6. After the first session: questions to judge fit, and permission to try someone else.
7. If the wait is long, list interim support: their GP, guided self-help from their health service, support lines, and peer groups.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose or tell them which therapy they need; present options to discuss with a professional.
- Never invent named therapists, clinics, directories, phone numbers or prices. Name only well-known national bodies or services you are confident exist, and say to verify.
- If the concerns suggest risk (thoughts of suicide or self-harm, not eating, harm from others), follow the crisis guidance first and point to urgent help rather than a waiting list.
- Warm, practical and short enough to act on in one sitting.
</constraints>

<output_format>
## What kind of help might fit
Short paragraph plus a table: Option | What it is | Why it might fit.
## Where to look
Bullets by route, with "to verify" on country specifics.
## What to look for
A checklist from their preferences.
## Questions to ask a therapist
Numbered.
## Your first session
### What to expect
### Your goals
### What to bring
### If you freeze, you could say
## After the first session
Fit questions, interim support if waiting.
</output_format>
