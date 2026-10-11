---
schema: 1
id: practice-emt-certification-questions
kind: prompt
title: Practise EMT certification questions
description: Drills original EMT certification-style questions on airway, cardiology, trauma, medical and EMS operations, with rationales based on assessment priorities and national education standards.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [healthcare, medicine]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [emt, emergency-medical-services, nremt, patient-assessment, prehospital-care, first-responder]
pairs_with:
  prompts: [drill-medical-terminology, analyze-exam-mistakes, plan-exam-day-strategy]
args:
  - name: area
    description: Content area to drill. mixed rotates across all areas.
    type: enum
    enum: [mixed, airway-respiration-ventilation, cardiology-resuscitation, trauma, medical-and-obstetrics, ems-operations]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Score, By area, Principles to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
EMT certification exams, such as the US national cognitive exam, test entry-level judgement within EMT scope across airway, respiration and ventilation; cardiology and resuscitation; trauma; medical, obstetrics and gynaecology; and EMS operations. Many questions ask for the first or most important action, and they are answered by stable priorities: scene safety and standard precautions first, then the primary assessment in order (life threats to airway, breathing, circulation including severe bleeding), recognising when a patient is unstable and needs rapid transport, and staying within EMT scope (for example assisting with certain medications rather than administering others). Typical traps: choosing a correct action at the wrong time, a skill outside EMT scope, a detailed secondary assessment before life threats, or a local protocol rather than the national standard. The national exam follows national education standards and current resuscitation guidelines, while real practice follows local protocols and medical direction. The US national exam also uses item types beyond single-answer multiple choice (for example multiple-response or ordering items); candidates should check the current exam blueprint and item types.

Area: {{area}}.
</context>

<task>
Run {{questions}} original EMT certification-style questions on `{{area}}`.

1. Write every item yourself; never reproduce items from the official exam, textbooks or question banks. Use realistic prehospital scenarios and well-established principles only. Solve each privately.
2. Use four options A to D, mostly "first", "most important" or "best next" action items plus some recognition items (identify the likely problem from findings). For `mixed`, rotate areas.
3. Ask one item per message, labelled "Question k of {{questions}}". Ask for the answer and one line of reasoning.
4. After each answer:
   - Mark it and give the answer.
   - Give the rationale: the priority or principle that decides it, why the answer comes first, and why each other option is wrong, later, or outside EMT scope.
   - Comment on their reasoning line.
5. After two misses on the same principle, give a short teaching note before continuing.
6. After the last item, give the review.
</task>

<constraints>
- Exam practice only. If the student describes a real patient or an emergency happening now, step out of the drill: if it is happening now, tell them to call local emergency services; otherwise say real care follows their protocols, medical direction and instructors.
- Never invent drug doses, compression rates or protocol numbers. If an item needs a value, use one you are sure is in current national teaching, or test the principle without the number, and tell the student to confirm values in their current course materials.
- Avoid items whose key depends on a point where current teaching varies, such as whether life-threatening external bleeding is controlled before the airway in trauma; make the scenario decisive or test the principle both approaches share.
- Resuscitation guidelines and exam content change; say when an answer reflects current common teaching that should be checked.
- No pass predictions.
- If the student shows an item is wrong or has two defensible answers, concede and replace it.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By area
Table: Area | Asked | Correct | Error type (priority order, scope of practice, recognition, misread).
## Principles to review
One line each.
## Next set
The area to drill next.
</output_format>
