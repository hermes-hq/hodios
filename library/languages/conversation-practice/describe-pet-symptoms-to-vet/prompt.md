---
schema: 1
id: describe-pet-symptoms-to-vet
kind: prompt
title: Describe a pet's symptoms to a vet
description: Teaches words for animal symptoms in the target language, then role-plays a vet visit with history questions, treatment options and costs, so the owner practises asking about prices and aftercare.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
advice_risk: [medical]
tags: [vet-visit, symptoms, aftercare, newcomers]
pairs_with:
  prompts: [practise-teach-back-with-clinician, navigate-automated-phone-menus, explain-car-problem-to-mechanic]
args:
  - name: target_language
    description: Language of the vet practice, with the country.
    type: string
    required: true
  - name: animal
    description: The animal, with age and breed if known, for example "8-year-old female cat" or "young rabbit".
    type: string
    required: true
  - name: situation
    description: What you have noticed, in your own words, for example "eating less for 3 days, hiding under the bed, vomited twice". This shapes the scene; it is not assessed.
    type: text
    required: true
  - name: level
    description: The learner's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
output_contract:
  format: markdown
  sections: [Describe it, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare pet owners to talk to a vet in {{target_language}}. Vets build a picture from the owner's history: what changed, since when, how often (eating, drinking, toileting, vomiting, energy, limping, breathing), anything eaten or changed at home, vaccinations and medicines. Owners in a second language give vague answers and then nod through treatment options and costs. A good visit covers a clear timeline, the options with an estimate for each, what to watch for at home, how to give any medicine, and when to come back or call.

Animal: {{animal}}
<situation>
{{situation}}
</situation>
Learner level (CEFR): {{level}}

This is language practice. The vet in the scene is fictional and gives no real veterinary advice.
</context>

<task>
1. Describe it (in English, or the learner's language):
   - The owner's account rewritten as a short timeline in {{target_language}}: what, since when, how often, what else changed. Use their facts only; mark unknowns as [?].
   - 10-12 words for the animal's body, symptoms and behaviour relevant to the situation, with meanings.
   - Five questions to ask: "What are the options, and roughly what does each cost?", "Is it urgent?", "What should I watch for at home?", "How do I give this, and for how long?", "When should I call you or come back?".
   - How to end: "stop". Then open at reception or in the consulting room.
2. The visit, in {{target_language}}, one turn at a time, never writing the learner's lines: play a kind, busy vet. Ask 4-5 history questions, describe an examination in general terms, offer two options (for example tests now or monitor for two days) with invented round estimates, and give aftercare instructions only in generic terms (for example "the medicine with food, twice a day" for an unnamed product). If the learner does not understand, rephrase once.
3. Debrief (same language as step 1): was the timeline clear; did they ask about costs, urgency and aftercare; did they repeat back the instructions; 5-7 errors with better versions; words to keep.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never diagnose the real animal, name a real medicine or dose, or say whether the real symptoms are serious. Scene findings and costs are invented; say so.
- If the situation includes signs of an emergency (difficulty breathing, collapse, a swollen hard belly in a dog, straining to urinate in a male cat, poisoning, heavy bleeding, seizures), say first to contact a vet or emergency vet now, before any practice.
- Do not give home-treatment advice; refer to the vet.
</constraints>

<output_format>
## Describe it
Timeline (table Line | Meaning); table Word | Meaning; five questions; how to stop; then the first in-character line.
During the scene: only the vet's or receptionist's spoken lines.
## Debrief
Table: Item | Covered? (timeline, options and costs, urgency, aftercare, repeat-back). Errors as You said | Better | Why. Words to keep.
</output_format>
