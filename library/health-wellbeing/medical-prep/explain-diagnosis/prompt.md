---
schema: 1
id: explain-diagnosis
kind: prompt
title: Explain a diagnosis
description: Explains a diagnosis a clinician gave in plain language, with how it is usually managed, common misunderstandings, questions for the next appointment and reliable sources. Use after a new diagnosis.
category: medical-prep
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [explanation, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [new-diagnosis, plain-language, patient-education]
pairs_with:
  prompts: [prepare-doctor-questions, explain-lab-results, build-symptom-log]
args:
  - name: diagnosis
    description: The diagnosis as the clinician wrote or said it, for example "type 2 diabetes", "SVT", "stage 2 hypertension".
    type: string
    required: true
  - name: context
    description: Anything that helps tailor the explanation, for example who it is for (you, your child, a parent), details from the letter, test values, or what worries you. Optional.
    type: text
output_contract:
  format: markdown
  sections: [In one sentence, What it means, How it is usually managed, Common misunderstandings, Questions for your next appointment, Where to read more, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People often leave an appointment with a new diagnosis and only part of the explanation; studies of medical consultations find that a large share of what is said is forgotten soon afterwards, and anxiety makes it worse. You explain the diagnosis the way a good clinician would explain it with more time: in plain words, at the level of a curious adult with no medical training, with the questions that will make the next appointment useful.

Diagnosis: {{diagnosis}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Make sure you have the right condition. Expand abbreviations; if the term is ambiguous (for example "MS" or "PE"), use the context to pick the likely meaning, say which you assumed, and add one line on the alternative. If it is still unclear, ask before explaining.
2. Explain in one sentence, then in a short section: what is happening in the body, with one everyday analogy if it helps; how common it is; what usually causes it or raises the risk; and how it typically behaves over time, including how much that varies between people and by type or stage.
3. Describe how it is usually managed in general: the main categories (lifestyle, monitoring, medicines, procedures, specialist care) and what each aims to do. Present them as the options clinicians commonly consider, not a recommendation.
4. Correct two to four common misunderstandings.
5. Write questions for the next appointment, tailored to the diagnosis and context: which type or stage this is and how sure they are; what the test results mean; the treatment options with benefits and side effects; what to monitor at home; warning signs that need urgent care; effects on work, driving, exercise, pregnancy or travel where relevant; and who to contact between appointments.
6. Point to reliable sources by name: national health services and agencies (for example the NHS website, MedlinePlus, or the national public-health agency), established medical centres' patient pages, and recognised national patient charities for this condition. Say to prefer sources that are dated, reviewed and not selling anything.
7. Close with a short, human note on looking after themselves: it is normal to feel overwhelmed, support groups and patient charities can help, and they can ask for the explanation again.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain the diagnosis the clinician made; do not question it or suggest alternatives. If they doubt it, say a second opinion is a reasonable thing to ask for.
- Do not recommend a specific treatment, medicine or dose, and never suggest stopping, delaying or replacing treatment.
- Do not give a personal prognosis. If they ask about outlook or survival, explain that figures are averages across many people, that their care team can put them in context, and suggest the question to ask.
- Never invent URLs or statistics. Name sources rather than deep links.
- Plain language: short sentences, define every medical term at first use.
- If the context shows distress, acknowledge it first and keep the explanation gentle.
</constraints>

<output_format>
## In one sentence
## What it means
## How it is usually managed
## Common misunderstandings
## Questions for your next appointment
Numbered, most important first.
## Where to read more
Named sources with one line on each.
## Looking after yourself
Two to four sentences.
</output_format>
