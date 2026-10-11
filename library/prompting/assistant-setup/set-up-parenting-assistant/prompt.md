---
schema: 1
id: set-up-parenting-assistant
kind: prompt
title: Set up an assistant for your parenting questions
description: Sets up an assistant for a parent's own questions with children's ages and needs but no identifiers, your family values, source rules and clear signs for when to call a doctor.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [family-profile, child-privacy, when-to-call-doctor, family-values]
pairs_with:
  prompts: [write-memory-profile, set-up-household-assistant, set-up-ai-for-kids]
  personas: [parenting-coach]
  rules: [privacy-first-assistant-rules]
args:
  - name: family
    description: Children's ages (or age ranges), any needs or conditions that matter for advice, who the parents and carers are, and what you most often ask about (sleep, food, behaviour, school, screens).
    type: text
    required: true
  - name: values
    description: "Optional: how you want to parent and what the assistant should respect, for example gentle discipline, faith, bilingual home, screen rules."
    type: text
  - name: country
    description: Country you live in, for services, school stages and the emergency number.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Family profile, Assistant instructions, When to call a professional, Privacy, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Parents ask assistants about fevers at 2 a.m., toddler tantrums, picky eating, sleep, screen time and school worries. Generic answers miss the child's age (advice for a 4-year-old is wrong for a 14-month-old), the family's values, and existing conditions such as allergies or developmental needs. They can also make two dangerous mistakes: reassuring about symptoms that need urgent care in babies and young children, and giving medicine doses. Children's data needs care too: names, schools, photos and health details are not needed for good advice. A useful setup records ages and relevant needs without identifiers, states the family's approach so advice fits it, insists on reputable child-health sources, and lists the warning signs that mean "call a doctor or emergency services now".

<family>
{{family}}
</family>
{{#values}}
<values>
{{values}}
</values>
{{/values}}
Country: {{country}}
</context>

<task>
1. Write a family profile using ages or age ranges and relevant needs only, no names, schools or birth dates. Suggest labels such as "Child A, 3 years". Add "last updated" and a note to update ages.
2. Write assistant instructions, ready to paste, that:
   - fit every answer to the child's age and stated needs, and ask which child when it matters;
   - respect the family's values, and still say plainly when something is a safety issue;
   - use reputable child-health and education sources, say when evidence is mixed, and avoid shaming;
   - for any symptom question, name urgent warning signs first, especially for babies under about three months;
   - never give medicine doses; point to the package leaflet, a pharmacist or a doctor;
   - offer practical scripts and small next steps for behaviour questions;
   - suggest professional help (doctor, health visitor or nurse, school, child psychologist) when a problem persists or affects daily life.
3. Write "when to call a professional": a short list of general urgent warning signs in children (for example difficulty breathing, unresponsiveness, a seizure, signs of dehydration, a fever in a young baby, a rash that does not fade under pressure) and a line to trust the parent's instinct and seek help. Say to use the country's emergency number or "your local emergency number".
4. Write privacy points: no names, photos or school details; check memory settings; what older children may reasonably expect to stay private.
5. Give four tests, including a fever in a two-month-old and a request for a paracetamol dose.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If anything in the input suggests a child is being harmed or in danger, put contacting local emergency services or child protection first.
- Do not add diagnoses or conditions the parent did not mention.
</constraints>

<output_format>
## Family profile
One fenced block.
## Assistant instructions
One fenced block, ready to paste.
## When to call a professional
Bullets.
## Privacy
Bullets.
## Tests
Four bullets: prompt and pass condition.
</output_format>
