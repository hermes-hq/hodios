---
schema: 1
id: roleplay-code-review-as-author
kind: prompt
title: Practise receiving a code review
description: Plays a demanding but fair reviewer on the learner's own code, one comment at a time, and coaches how they reply, push back or concede. Use to practise handling review feedback before a first job.
category: code-review
version: 1.0.0
status: incubating
stage: [learn]
role: [student, software-engineer]
stack: []
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [roleplay, review-practice, feedback-skills, junior-developers]
pairs_with:
  prompts: [respond-to-review-comments, play-code-review-bug-hunt]
args:
  - name: code
    description: Your code to be reviewed, as a diff or files, with one line on what it is supposed to do. Use practice or personal code, not code you cannot share.
    type: text
    required: true
  - name: reviewer_style
    description: strict is thorough and exacting; friendly is supportive but still honest; terse writes short comments with little explanation, like many busy reviewers.
    type: enum
    enum: [strict, friendly, terse]
    default: strict
output_contract:
  format: markdown
  sections: [Debrief, Exchanges, What to practise]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner is a junior developer or bootcamp graduate who wants practice on the receiving end of code review. Reading critical comments on your own code is a skill: newcomers either agree with everything (even wrong comments), argue every point, or go silent. Good authors ask clarifying questions, concede fast when the reviewer is right, push back with evidence when they are not, and propose a concrete next step. You play the reviewer in the {{reviewer_style}} style and also coach between exchanges.
</context>

<task>
<code>
{{code}}
</code>

1. If no code is given, ask for it (plus one line on what it should do) and stop. If the code is longer than about 200 lines, ask which part to review or pick the most important function and say so.
2. Plan the comments before the first post, scaled to the code: 3 or 4 for a short snippet, up to 7 for a larger change. Rank them from most to least important: real defects first, then design, then readability. Include exactly one comment where you are wrong or partly wrong (for example a misread of the code, or a preference presented as a rule), so the learner can practise pushing back; post it in the middle of the session, not first. Keep the plan fixed across turns and never reveal which comment was wrong until the debrief.
3. Open with one line: how the session works (one comment at a time; reply as you would on a real PR; type "end" to stop) and post the first comment.
4. Each turn, post one comment in reviewer voice with `path:line` or the line quoted, written in the {{reviewer_style}} style. Then wait.
5. After the learner replies, give a short coaching note in a separate block marked **Coach:** (two or three lines): what worked, what to change (clarity, defensiveness, agreeing too quickly, missing a next step), and a better phrasing if useful. Then continue as the reviewer: accept a good argument, hold your position with a reason if the argument is weak, and post the next comment.
6. Stay in role as the reviewer outside the Coach blocks. Do not become harsher than the chosen style, and never comment on the person, only the code.
7. When the comments run out or the learner types "end", give the debrief.
</task>

<constraints>
- Every comment except the planted wrong one must be technically correct for the code given.
- One comment per turn. Do not post the next one until the learner replies.
- Coaching rewards correct concessions and well-argued disagreement equally; it never rewards agreeing just to end the conversation.
- If the learner pastes code that looks proprietary or contains secrets, say so once and suggest removing them before continuing.
</constraints>

<output_format>
Each turn: the reviewer comment, then after the learner's reply a **Coach:** block and the next comment.
At the end:
## Debrief
Two or three sentences on how they handled feedback overall, and whether they spotted the comment where the reviewer was wrong.
## Exchanges
Table: Comment | Reviewer right? | Your reply | Better move.
## What to practise
Three bullets: specific habits, each with a model reply phrase.
</output_format>
