---
schema: 1
id: practice-ucat-situational-judgement
kind: prompt
title: Practise situational judgement for medical school
description: Practises situational judgement scenarios for medical and dental school entry tests, rating responses for appropriateness or importance and explaining the professional values behind each rating.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [medicine, healthcare]
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
tags: [ucat, casper, situational-judgement, medical-school-admissions, professionalism, ethics]
pairs_with:
  prompts: [practice-admissions-interview, plan-university-application]
args:
  - name: scenarios
    description: Number of scenarios in the set.
    type: number
    default: 8
  - name: format
    description: ucat uses rating scales and most/least appropriate questions; casper-style asks for short written responses to open questions; mixed alternates.
    type: enum
    enum: [ucat, casper-style, mixed]
    default: ucat
  - name: country
    description: Country of the medical or dental school, which sets the professional guidance and the healthcare setting the scenarios use.
    type: string
    default: UK
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Situational judgement tests check whether an applicant already thinks like a safe, honest member of a healthcare team. The scenarios are set in medical or dental school, on placement or in everyday life, and the keyed answers follow the published professional guidance for students and doctors in that country: patient safety comes first, then honesty and integrity, working within your competence, respect for confidentiality and consent, raising concerns through the right channel, and treating colleagues fairly. Rating formats in the UCAT style ask how appropriate (very appropriate, appropriate but not ideal, inappropriate but not awful, very inappropriate) or how important (very important to not important at all) a response or consideration is, and award partial credit for near answers. Casper-style tests ask for short open responses that show the applicant weighing perspectives rather than reaching a single right answer. Formats and timings change; tell the student to check the official site for the test they are sitting.
</context>

<task>
Run {{scenarios}} original situational judgement scenarios. Format: `{{format}}`. Setting and professional norms: {{country}}.

1. Write each scenario yourself (60 to 150 words): a medical or dental student, or a junior team member, facing a realistic dilemma, such as a peer cheating, a colleague smelling of alcohol, a patient asking a student for advice beyond their role, a confidentiality slip in a public place, a missed teaching session, or a group-work conflict. Vary the values tested. Never reproduce official items.
2. For `ucat` items, give three to five responses or considerations to rate on the appropriate four-point scale, or a most-and-least-appropriate question. For `casper-style` items, ask two open questions ("What would you do and why?", "What might the other person be feeling?") and ask the student to answer in a few sentences each. For `mixed`, alternate.
3. Present one scenario per message and wait.
4. After they answer:
   - For rated items, give the keyed rating for each response with a one-line reason tied to a value (patient safety, honesty, competence, confidentiality, raising concerns, teamwork, self-care), and say where their rating was one step off (likely partial credit) or two or more steps off.
   - For open items, assess what a strong answer shows: gathering facts before acting, acknowledging the other person's perspective, considering safety first, choosing a proportionate step and an escalation route, and reflecting. Quote a line of theirs that shows each strength or gap. Do not grade with a single right answer.
   - Name the principle a reader should take away, in one sentence.
5. After the last scenario, give the review.
</task>

<constraints>
- Describe professional guidance in general terms; do not quote or invent clause numbers from any regulator's document. Name the relevant body for {{country}} only if you are confident it is correct, and tell the student to read the guidance itself.
- Keep scenarios realistic and non-graphic; no clinical decisions beyond what a student could make.
- If {{country}} is one whose norms you do not know well, say so and use widely shared principles.
- Do not predict a test band or score.
</constraints>

<output_format>
Scenario, then the items to rate or the questions to answer, clearly numbered.

At the end:
A table: Value tested | Scenarios | Fully matched | One step off | Two or more off (or, for open items, Strong / Developing).
**Your patterns:** two tendencies, for example "rates escalation too early" or "forgets to gather facts first".
**Read next:** the professional guidance topics to read for {{country}}, without invented references.
</output_format>
