---
schema: 1
id: run-timed-essay-drill
kind: prompt
title: Run a timed essay drill
description: Sets an essay question, runs planning and writing checkpoints against the clock, then marks the essay against level descriptors and names the one change that would lift it a band.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [history, literature, social-sciences, philosophy]
requires: [none]
inputs: [preferences, text]
output: [conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [timed-essay, level-descriptors, essay-planning, humanities, mock-exam, band-feedback]
pairs_with:
  prompts: [plan-essay-argument, give-essay-feedback, write-model-exam-answer]
args:
  - name: subject
    description: Subject and level, such as "A-level History, Tudors", "IB English Literature Paper 2", "first-year sociology".
    type: string
    required: true
  - name: level_descriptors
    description: Optional. Paste the mark scheme levels or band descriptors and the marks available. Without them, a generic five-level scheme is used and labelled as such.
    type: text
  - name: question
    description: Optional. An essay question to answer; leave blank to have one set.
    type: text
  - name: minutes
    description: Total time for the essay, including planning.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Mark and level, Against the descriptors, Timing, The one change, Next drill]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Timed essays in history, English, religious studies, politics and the social sciences are marked holistically against level descriptors: examiners read the whole answer, decide the best-fit level, then place it within the level. Under time pressure, students most often lose levels by narrating instead of arguing, never reaching a judgement, running out of time before the conclusion or the strongest point, and planning for so long or so little that structure collapses. One targeted change, practised, lifts a band faster than a list of ten.
</context>

<task>
Run one timed essay drill for {{subject}}, {{minutes}} minutes in total.
{{#question}}
<question>
{{question}}
</question>
{{/question}}
{{#level_descriptors}}
<level_descriptors>
{{level_descriptors}}
</level_descriptors>
{{/level_descriptors}}

1. If no question was given, set one in the style of the subject's exams: an evaluative question ("How far...", "To what extent...", "Assess...") the student can answer from normal course knowledge. Ask if they would like a different topic before starting.
2. Give the time plan with actual minute marks worked out from {{minutes}}: planning ends at about 10 to 15 percent of the time, the halfway check comes midway through the writing time, and the last 3 minutes are for checking. You cannot see a clock or message first, so tell the student to start their own timer and send you a message at each checkpoint.
3. Checkpoint one (end of planning): they paste the plan. Reply in under 80 words: is there a clear line of argument answering this question, are the paragraphs points rather than topics, and is there a judgement planned? Then tell them to write.
4. Checkpoint two (halfway, optional): they send how many paragraphs are done. If they are behind, tell them what to cut so they still reach a conclusion. Do not comment on content here.
5. If they skip a checkpoint or paste the essay straight away, do not ask them to redo it; mark what you have and note the missing plan under Timing. When they paste the essay and the time taken, mark it:
   - Use the descriptors if given; otherwise a generic five-level scheme (1 limited, 2 basic, 3 sound, 4 good, 5 excellent) across argument, knowledge and evidence, analysis, judgement and structure, and say it is generic.
   - Give the best-fit level and a mark within it, explaining the placement with quotations from their essay.
   - Tie each descriptor phrase to evidence in their essay, or note its absence.
6. Name the one change that would most lift the band, show it by rewriting one of their own paragraphs (under 120 words), and set the next drill to practise it.
</task>

<constraints>
- The student writes the essay. Never write the full essay for them; one rewritten paragraph is the limit.
- If the essay looks like assessed coursework rather than practice, ask once whether it is for practice before marking it. For work that will be submitted, give feedback on their own draft only, never rewritten text.
- If the subject or level is too vague to set a fair question (for example just "history"), ask for the course, exam board or level and the topics studied.
- Never invent historical facts, quotations or critics when commenting on content; flag a doubtful claim as "check this".
- Never claim a mark is what the real exam would give.
</constraints>

<output_format>
Checkpoint replies are short and do not use the headings.

After the essay, under these headings:
## Mark and level
Level and mark, two sentences on why.
## Against the descriptors
A table: Descriptor or criterion | Evidence in your essay | Met, partly, not yet.
## Timing
Planned versus actual, and where time went.
## The one change
The change, why it matters for the level, and the rewritten paragraph.
## Next drill
The question and focus for the next timed attempt.
</output_format>
