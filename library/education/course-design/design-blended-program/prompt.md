---
schema: 1
id: design-blended-program
kind: prompt
title: Design a blended learning programme
description: Designs a blended programme mixing live sessions, self-paced work and on-the-job practice, with sequencing, weekly time load and support. Use for multi-week training that must change practice at work.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, manager, consultant]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [blended-learning, flipped-learning, learning-transfer, corporate-training, programme-design]
pairs_with:
  prompts: [write-learning-objectives, design-workshop, evaluate-training-effectiveness, convert-course-to-online]
  personas: [instructional-designer, corporate-trainer]
args:
  - name: outcomes
    description: What participants should be able to do by the end, ideally as observable behaviours at work.
    type: text
    required: true
  - name: audience
    description: Who takes part, how many, where they work and how much time they can give, e.g. "30 first-line managers across 3 sites, 3 hours a week".
    type: string
    required: true
  - name: weeks
    description: Programme length in weeks.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Design summary, Modality map, Week-by-week plan, On-the-job practice, Support, Time load, Evaluation, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Blended learning is not "some e-learning plus a workshop". Each modality has a job: self-paced work is best for knowledge people can absorb at their own speed and revisit; live sessions are for practice with feedback, discussion of hard cases and accountability; on-the-job assignments are where transfer happens. A good blend runs a repeating weekly rhythm (prepare, practise together, apply at work, reflect), keeps the weekly time load honest, and involves the participant's manager, because what happens after training predicts whether behaviour changes more than the training itself does.
</context>

<task>
Design a {{weeks}}-week blended programme.

<outcomes>
{{outcomes}}
</outcomes>

Audience: **{{audience}}**

1. If the outcomes are topics rather than behaviours ("communication", "Excel"), rewrite them as 3 to 6 observable outcomes and mark them "rewritten, please confirm". If the time participants can give is unknown, assume about 3 hours a week and say so.
2. **Modality map:** for each outcome decide what goes self-paced, what goes live and what is practised on the job, with a one-line reason tied to what each modality does best.
3. **Weekly rhythm:** define the repeating cycle (for example: self-paced prep early in the week, a live practice session mid-week, an on-the-job assignment, a short reflection or peer check-in at the end).
4. **Week-by-week plan:** for each week the focus, the self-paced items (with minutes), the live session (length, format, main activity), the on-the-job assignment and the reflection prompt. Sequence from foundations to integrated, realistic application, with the last week focused on a capstone application and a plan for continuing.
5. **On-the-job practice:** for each assignment, what the participant does at work, what they bring back, and what the manager does (brief, observe, give feedback).
6. **Support:** facilitator presence, peer groups or learning pairs, how stragglers are noticed and helped (missed live session plan, nudges), and accessibility for self-paced items (captions, transcripts, mobile-friendly).
7. **Time load:** a table of weekly hours per participant, per manager and per facilitator. Flag any week above the stated budget and adjust.
8. **Evaluation:** how you will know behaviour changed at work (observations, work samples, manager ratings, a business measure), not only completion and satisfaction.
</task>

<constraints>
- Every self-paced item has a purpose and a check (a quick retrieval quiz, a submitted reflection, a question to bring to the live session); no "watch this video" with no follow-up.
- Live sessions spend at least half their time on practice or discussion, not presentation.
- Do not exceed the participants' time budget; if the outcomes cannot fit, say what to cut or how many weeks would be needed.
- Do not name specific vendor platforms unless the user did; describe functions (a discussion forum, a video tool).
</constraints>

<output_format>
## Design summary
3 to 5 sentences: the blend, the rhythm and why.
## Modality map
Table: Outcome | Self-paced | Live | On the job | Reason.
## Week-by-week plan
Table: Week | Focus | Self-paced (min) | Live session | On-the-job assignment | Reflection.
## On-the-job practice
Per assignment: task, bring back, manager role.
## Support
Bullets.
## Time load
Table: Week | Participant hours | Manager hours | Facilitator hours.
## Evaluation
Bullets with measures and timing.
## Assumptions
Bullets.
</output_format>
