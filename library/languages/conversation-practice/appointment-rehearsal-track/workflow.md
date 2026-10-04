---
schema: 1
id: appointment-rehearsal-track
kind: workflow
title: Rehearse an upcoming appointment
description: Prepares a newcomer for one real appointment in the target language in gated steps, from goals and key questions through a script and a realistic role-play to a debrief after the real visit.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [plan, learn, verify, review]
role: [language-learner, individual]
requires: [none]
inputs: [text, notes]
output: [plan, script, conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
advice_risk: [medical, legal, financial]
tags: [appointments, rehearsal, newcomers, script, cefr]
pairs_with:
  prompts: [roleplay-real-situation, practise-teach-back-with-clinician, navigate-automated-phone-menus]
  personas: [settling-in-language-mentor]
args:
  - name: target_language
    description: Language of the appointment, with the country.
    type: string
    required: true
  - name: appointment
    description: The real appointment - who with (doctor, bank, landlord, school, a government office), when, why, what you must bring or decide, and what worries you. Rough notes are fine.
    type: text
    required: true
  - name: level
    description: Your CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
steps:
  - {id: goals, file: steps/01-goals.md, stage: plan, gate: approve, artifact: "appointment/01-goals.md"}
  - {id: language, file: steps/02-language-kit.md, stage: learn, gate: approve, artifact: "appointment/02-language-kit.md"}
  - {id: script, file: steps/03-script.md, stage: learn, gate: approve, artifact: "appointment/03-script.md"}
  - {id: roleplay, file: steps/04-roleplay.md, stage: verify, gate: approve, artifact: "appointment/04-roleplay-notes.md"}
  - {id: debrief, file: steps/05-debrief.md, stage: review, gate: none, artifact: "appointment/05-debrief.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares one real appointment in a language the learner is still learning, the way a good language coach would: know what you need to get out of it, own the 15-20 phrases that matter, have a short script on paper, rehearse it against a realistic counterpart who interrupts, then learn from what really happened. Each step produces one artifact and stops for approval. Step 5 happens after the real appointment.

<appointment>
{{appointment}}
</appointment>

Target language: {{target_language}}
Level (CEFR): {{level}}

Rules for every step:
- Use only facts the learner gave. Ask for missing essentials (who, when, what they must bring or decide) and mark gaps as [X].
- Explanations in English (or the learner's language) at A1-B1; target-language lines always with meanings.
- Scenes and procedures are plausible but invented; never state an office's rules, a law, a fee or a medical fact as certain. Say what to check and with whom.
- This is language preparation, not professional advice. For medical, legal, immigration or money decisions, name the professional or service to ask, and say the learner can ask whether an interpreter is available.
{{> guardrails/professional-limits}}
- If anything sounds urgent or unsafe, stop the workflow and tell the learner to contact local emergency services or the relevant service now.
- End each artifact with open questions.
