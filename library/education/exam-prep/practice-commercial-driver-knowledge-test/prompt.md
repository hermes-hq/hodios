---
schema: 1
id: practice-commercial-driver-knowledge-test
kind: prompt
title: Practise a commercial driver knowledge test
description: Drills the knowledge test for a commercial or heavy goods vehicle licence, such as CDL general knowledge and air brakes or HGV theory, with original questions, explanations and a weak-area tally.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cdl, hgv-theory, air-brakes, combination-vehicles, truck-driving, professional-driving]
pairs_with:
  prompts: [prepare-driving-theory-test, analyze-exam-mistakes]
args:
  - name: country_and_licence
    description: Country, state or province, and the licence, such as "Texas, CDL Class A", "UK, Category C (HGV)", "Ontario, Class AZ", "Australia, HR".
    type: string
    required: true
  - name: section
    description: Section to drill. For UK HGV theory, use general or mixed.
    type: enum
    enum: [mixed, general, air-brakes, combination, hazmat, passenger]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Score, Weak areas, Facts to check in your manual, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Commercial licence knowledge tests are drawn from an official handbook: in the US, the state's CDL manual (general knowledge, then endorsement and restriction tests such as air brakes, combination vehicles, hazardous materials, passenger, tanker, doubles and triples); in the UK, the official guidance behind the large vehicle theory test (multiple choice plus hazard perception) and the Driver CPC case studies; elsewhere, the licensing authority's handbook. The questions reward exact knowledge of the vehicle inspection sequence, braking systems, stopping distances and following gaps, cargo securement, weight and space management, coupling and uncoupling, skids and emergencies, and the rules for hours and hazardous loads. Figures (air pressures, distances, limits) differ by jurisdiction and edition, and the candidate's own manual is the authority.
</context>

<task>
Run {{questions}} original knowledge test questions for {{country_and_licence}}. Section: `{{section}}`.

1. In one line, name the handbook the candidate should study alongside (for example "your state's CDL manual"). If the section does not exist for that licence (air brakes for a UK HGV theory test), say so and switch to the nearest equivalent.
2. Write every question yourself; never reproduce official question banks or third-party practice apps. Build each on a fact you are confident appears in the standard manual for that jurisdiction. Where an item needs a specific figure (a pressure, a distance, a time), use it only if you are confident it is the standard published figure; otherwise test the principle and add the figure to "Facts to check".
3. Mix knowledge items with "what should you do?" driving scenarios (brake fade on a long downgrade, a jackknife starting, a low air warning, a trailer coupling that does not lock, a passenger carrying a prohibited item).
4. Ask one question per message, labelled "Question k of {{questions}}", with the options in the style of that test.
5. After each answer:
   - Mark it and give the answer.
   - Explain the reason in practical driving terms (what happens to the vehicle or load if this is done wrong).
   - Keep a weak-area tally by topic.
6. After two misses in one topic, give a five-line summary of that topic before continuing.
7. After the last question, give the review.
</task>

<constraints>
- Never invent a regulation, legal limit or figure; when in doubt, teach the principle and list the figure to check in the manual.
- Do not predict a pass.
- If the candidate describes a real defect or unsafe situation on a vehicle they drive, tell them not to drive it until it is checked and to report it to their employer or the authority as their rules require.
- Plain language; many candidates are changing careers or speak English as a second language.
</constraints>

<output_format>
During the set: marking and reason, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## Weak areas
A table: Topic | Asked | Correct | What to reread.
## Facts to check in your manual
Bullets of specific figures and rules to confirm in the official handbook.
## Next set
The section or topic to drill next.
</output_format>
