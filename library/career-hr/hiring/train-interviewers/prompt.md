---
schema: 1
id: train-interviewers
kind: prompt
title: Train interviewers
description: Builds interviewer training on structured questions, evidence-based scoring, common biases, calibration and legal no-go questions, with practice. Use before people join interview panels.
category: hiring
version: 1.0.0
status: incubating
stage: [plan, build]
role: [recruiter, manager, engineering-manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, script, quiz]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interviewer-training, structured-interviewing, hiring-bias, scorecards, calibration]
pairs_with:
  prompts: [design-interview-loop, run-hiring-debrief, write-phone-screen-script]
  personas: [recruiter]
args:
  - name: organisation_context
    description: Your organisation, the country or countries you hire in, how interviews work today (structured or not, scorecards, debriefs), who will attend, and any problems you have seen.
    type: text
    required: true
  - name: roles_hiring
    description: The roles you are hiring for, so examples and exercises can use them. Optional.
    type: text
  - name: minutes
    description: Length of the session in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Learning outcomes, Session plan, Facilitator notes, Practice exercises, Questions not to ask, Quick reference card, Certification check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design interviewer training for organisations of all sizes. Research on selection consistently finds that structured interviews predict job performance better than unstructured ones. Structure means the same job-related questions for every candidate, behavioural or situational formats, and scoring against anchored scales before discussing a candidate with others. Untrained interviewers ask whatever comes to mind, rate on impressions and "culture fit", anchor on the first strong opinion in the debrief, and occasionally ask questions that are unlawful. Training changes behaviour only when people practise. Lectures on bias alone have little lasting effect, while practice with real scorecards, written evidence and calibration does.

<organisation_context>
{{organisation_context}}
</organisation_context>
{{#roles_hiring}}
<roles_hiring>
{{roles_hiring}}
</roles_hiring>
{{/roles_hiring}}
Session length: {{minutes}} minutes
</context>

<task>
1. Learning outcomes: four or five observable things attendees can do afterwards (for example, write an evidence note that separates what the candidate said from the interviewer's judgement, or score independently against an anchored scale).
2. Session plan: a timed agenda that fits {{minutes}} minutes, with at least half the time spent on practice. Cover why structure matters; the interviewer's role in the loop (one competency per interviewer, no repeated questions); asking behavioural and situational questions and probing for specifics ("What did you do?", "What happened next?"); taking notes as evidence; scoring before the debrief; common biases with a counter-habit for each (first impressions, halo and horns, similarity or "culture fit", contrast effects, confirmation bias, and unequal standards across groups); the candidate experience; and legal no-go topics.
3. Facilitator notes: key messages, examples tailored to the roles being hired for, and how to handle pushback such as "I can tell in five minutes", "structure feels robotic" or "culture fit matters".
4. Practice exercises: (a) rewrite three weak questions into structured ones; (b) a short mock answer transcript to score independently against an anchored scale, then compare and discuss; (c) sort evidence notes from opinion notes; (d) spot the bias in three short debrief comments. Provide the materials for each, written for the roles given or for a generic role if none is given.
5. Questions not to ask: topics generally off limits (age, pregnancy or family plans, religion, national origin beyond work authorisation, marital status, sexual orientation, disability or health beyond the ability to perform essential duties with or without adjustments, union membership, and salary history where banned), with lawful alternatives and how to respond if a candidate volunteers such information. Note that the specifics depend on the country where they hire and should be confirmed with HR or legal.
6. Quick reference card: one page an interviewer reads before each interview.
7. Certification check: a short quiz of five to eight questions plus a shadow-then-reverse-shadow plan before someone interviews alone.
</task>

<constraints>
- Fit the session to the time; if {{minutes}} is too short for the outcomes, cut content rather than practice, and say what to cover in a follow-up.
- Ground claims in established selection practice, without citing statistics you are not sure of.
- Do not present legal points as definitive for their jurisdiction.
- Never teach ways to screen out people for protected characteristics, including through proxies such as "energy" or vague "fit". If asked, decline and redirect to job-related criteria.
- Use only the context given; mark assumptions and ask about missing facts at the end.
</constraints>

<output_format>
## Learning outcomes
## Session plan
Table: Minutes | Segment | Method | Output.
## Facilitator notes
## Practice exercises
## Questions not to ask
Table: Avoid | Ask instead.
## Quick reference card
## Certification check
</output_format>
