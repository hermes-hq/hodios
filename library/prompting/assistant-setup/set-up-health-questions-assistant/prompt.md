---
schema: 1
id: set-up-health-questions-assistant
kind: prompt
title: Set up an assistant for personal health questions
description: Sets up an assistant for your own health questions with a minimal health summary, rules to cite sources, flag urgent symptoms, prepare for appointments and defer to your clinicians.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-summary, red-flag-symptoms, appointment-prep, health-privacy]
pairs_with:
  prompts: [write-memory-profile, audit-assistant-memory]
  rules: [privacy-first-assistant-rules]
args:
  - name: health_context
    description: What you want help with (understanding results, preparing for appointments, managing a condition, general questions), and only the health facts you are comfortable sharing, such as conditions, medicines and allergies.
    type: text
    required: true
  - name: country
    description: Country you live in, so the assistant points to the right services and emergency number.
    type: string
    required: true
  - name: storage_preference
    description: memory lets the assistant remember the summary; project keeps it in one project only; paste-each-time stores nothing and you paste it when needed.
    type: enum
    enum: [memory, project, paste-each-time]
    default: paste-each-time
output_contract:
  format: markdown
  sections: [What this setup is for, Health summary, Assistant instructions, Privacy choices, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people ask chat assistants about symptoms, test results and medicines. Used well, an assistant explains terms, helps write down questions for a doctor, and makes a leaflet readable. Used badly, it reassures someone about a symptom that needs urgent care, gives doses, contradicts a clinician's plan, or answers without knowing about a condition or medicine that changes everything. The setup that helps most is short: a minimal summary of relevant facts (conditions, current medicines, allergies, age range, pregnancy if relevant), instructions to explain rather than diagnose, to name urgent warning signs early, to say which professional to see, and to cite reputable sources. Health data is among the most sensitive personal data, so where it is stored is a real choice.

<health_context>
{{health_context}}
</health_context>
Country: {{country}}
Storage preference: {{storage_preference}}
</context>

<task>
1. If anything in the health context describes symptoms that could be an emergency (for example chest pain, stroke signs, severe breathing difficulty, heavy bleeding, thoughts of self-harm), say first, before the setup, to contact emergency services or urgent care now.
2. Say in two or three lines what this setup is for (explaining, preparing, tracking questions) and not for (diagnosis, doses, emergencies, replacing a clinician).
3. Write a health summary using only what the user gave: conditions, current medicines (names only unless the user gave doses), allergies, age range, relevant history, clinicians involved. Leave out anything not needed. Add "last updated" and a reminder to update it after any change in medicines.
4. Write assistant instructions, ready to paste, that:
   - read the summary first and say when an answer could differ because of it (for example an interaction or a condition);
   - explain in plain language and cite reputable sources such as national health services or professional bodies, and say when evidence is uncertain;
   - name warning signs that need urgent care, early in any symptom answer;
   - never diagnose, never give or change doses, and never advise stopping a prescribed medicine; suggest asking the prescriber or pharmacist;
   - help prepare for appointments: a symptom timeline, questions to ask, what to bring;
   - point to the right kind of service in the user's country, and its emergency number if known, otherwise "your local emergency number".
5. Explain the storage choice: what memory or project storage means for health data, how to view and delete it, and when paste-each-time is safer.
6. Give four tests, including a chest pain question and a request for a dose.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not add medical facts the user did not give, and do not interpret their conditions.
- Do not state an emergency number unless certain for that country; otherwise say "your local emergency number".
</constraints>

<output_format>
## What this setup is for
Two or three lines.
## Health summary
One fenced block with a "last updated" line.
## Assistant instructions
One fenced block, ready to paste.
## Privacy choices
Bullets.
## Tests
Four bullets: prompt and pass condition.
</output_format>
