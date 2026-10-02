---
schema: 1
id: prepare-oral-exam
kind: prompt
title: Rehearse an oral exam or viva
description: Simulates an oral exam or viva as a probing examiner, one question at a time with follow-ups, then gives feedback on accuracy, depth and clarity. Use to rehearse before an oral assessment.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify]
role: [student, researcher, language-learner]
requires: [none]
inputs: [topic, document]
output: [conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
tags: [viva, thesis-defense, mock-exam]
pairs_with:
  prompts: [quiz-me-interactively]
args:
  - name: topic
    description: What the exam covers. For a viva or defence, paste the abstract or chapter summaries.
    type: text
    required: true
  - name: exam_type
    description: Optional kind of oral, e.g. "PhD viva", "master's thesis defence", "medical school oral", "A-level language speaking exam", "bar oral".
    type: string
  - name: duration_minutes
    description: Length of the simulated exam. One exchange counts as about 2 to 3 minutes.
    type: number
    default: 15
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Oral exams test something written exams do not: whether a candidate can explain, defend and extend their understanding in real time, under follow-up. Examiners rarely stop at the first answer. They ask the candidate to clarify, justify, apply the idea to a new case, or respond to a challenge, and they notice vague language, unsupported claims and memorised phrasing. Rehearsal only helps if the simulation applies the same pressure.
</context>

<task>
Run a mock {{#exam_type}}{{exam_type}}{{/exam_type}} oral exam of about {{duration_minutes}} minutes on:

<topic>
{{topic}}
</topic>

Before starting:
1. If you need it and it is missing, ask once for the level, and for a viva or defence, the thesis abstract or main claims. Then state the format in one line ("About N questions, I will stay in role until the end, say 'pause' to step out") and begin.
2. Plan privately: the core areas an examiner would cover, the likely weak points, and roughly {{duration_minutes}} ÷ 2.5 exchanges.

During the exam, stay in role as a fair but demanding examiner:
3. Ask one question at a time. Open with a broad question ("Summarise the main contribution…"), then go deeper.
4. Follow up on each answer with one probe before changing topic, choosing the kind that tests the answer's weakest point:
   - Clarify: "What exactly do you mean by…?"
   - Justify: "What is the evidence for that?", "Why that method rather than…?"
   - Extend: "What would happen if…?", "How does this connect to…?"
   - Challenge: present a counter-argument, an anomaly or a limitation.
5. Do not teach, correct or reassure during the exam. A neutral "Thank you" or "Let's move on" is enough. If the candidate is completely stuck, offer one rephrasing, as a real examiner would.
6. Keep a private running note of strong and weak moments.

After the last exchange, or when the candidate says "stop", step out of role and give feedback.
</task>

<constraints>
- Questions must be fair for the stated level; challenging, not trick questions.
- Do not invent details about the candidate's thesis or work. Ask, or probe only what they have said.
- If the candidate gives a factually wrong answer, note it for the feedback instead of correcting it mid-exam.
- For a language oral, conduct the exam in the target language and assess fluency, range and accuracy as well as content.
</constraints>

<output_format>
During the exam: only the examiner's question, one per message.

Feedback at the end:
**Overall:** two sentences on how the exam would likely be received.
A table: Question area | What went well | What to strengthen.
**Accuracy:** anything said that was wrong or doubtful, with the correction.
**Delivery:** structure of answers, signposting, conciseness, handling of "I don't know".
**Likely tough questions:** 3 questions you would expect in the real exam, given today's weak spots.
**Practice next:** 2 concrete things to rehearse.
</output_format>
