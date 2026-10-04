---
schema: 1
id: act-on-marked-feedback
kind: prompt
title: Turn marked feedback into targets
description: Translates tutor comments on marked essays or coursework into a few concrete targets, shows what each looks like done well, and builds a checklist for the next assignment.
category: studying
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [checklist, explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [feedback-literacy, written-feedback, coursework, improvement-targets]
pairs_with:
  prompts: [analyze-exam-mistakes, understand-assignment-brief, prepare-office-hours-questions]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: feedback
    description: The tutor's comments, margin notes and rubric scores, copied as written. Include the mark and the marking criteria if you have them.
    type: text
    required: true
  - name: work_extract
    description: Optional paragraphs of your work that the comments refer to, so the targets can point to your own writing.
    type: text
output_contract:
  format: markdown
  sections: [What the feedback says, Your targets, What good looks like, Next-assignment checklist, Ask your tutor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students often read written feedback once, look at the mark and file it away, partly because comments such as "more analysis needed", "too descriptive" or "develop your argument" do not say what to do differently. Feedback only helps when it becomes a few concrete moves applied to the next piece of work. The job here is translation and prioritisation, not rewriting the student's work.

Typical translations (adapt to the subject):
- "Too descriptive" or "narrative": you report what happened or what a source says, without saying why it matters for your argument.
- "More analysis": after each piece of evidence, explain how it supports your point, and what follows from it.
- "Be more critical" or "evaluate": weigh strengths and limitations, compare sources or views, and reach a judgement.
- "Structure" or "signposting": each paragraph opens with its point and links back to the question.
- "Referencing" or "academic style": follow the required style consistently; this is usually quick to fix.
</context>

<task>
<feedback>
{{feedback}}
</feedback>
{{#work_extract}}

<work_extract>
{{work_extract}}
</work_extract>
{{/work_extract}}

1. List every comment, then group comments that point to the same underlying issue.
2. Prioritise 3 to 5 targets by likely effect on the mark: issues tied to high-weight criteria and issues that recur across comments come first; small presentation fixes come last.
3. For each target, write: the tutor's words, what they most likely mean in plain terms, and the concrete move ("End each paragraph with a sentence that answers 'so what?' for the essay question").
4. Show what good looks like for each target: if the work extract is given, quote one sentence of the student's own and annotate what is missing, then give a short illustration on a different, neutral topic of the same type. Do not rewrite the student's paragraph.
5. Turn the targets into a checklist the student can tick on the next draft, phrased as yes or no questions.
6. List comments that are genuinely ambiguous, with a specific question to ask the tutor about each.
7. Note one thing the feedback says went well, so the student keeps doing it.
</task>

<constraints>
- Base every target on the actual comments. Do not invent criticisms or guess at a rubric that was not given.
- Give alternative readings when a comment could mean more than one thing, and send it to Ask your tutor.
- Do not rewrite or improve the student's submitted text; illustrations use a different topic.
- If the feedback is only a mark with no comments, say there is not enough to work from and suggest asking the tutor for two or three specific points.
- Non-judgemental tone; low marks are information, not a verdict on ability.
</constraints>

<output_format>
## What the feedback says
Table: Comment | Underlying issue. Then one line on what went well.

## Your targets
Numbered 3 to 5: tutor's words, what it means, the concrete move.

## What good looks like
For each target: the annotated sentence from the student (if available) and a short neutral-topic illustration.

## Next-assignment checklist
5 to 10 yes or no questions.

## Ask your tutor
Bullets: ambiguous comment and the specific question. "None" if all comments are clear.
</output_format>
