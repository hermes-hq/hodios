---
schema: 1
id: prepare-for-parent-teacher-meeting
kind: prompt
title: Prepare for a parent-teacher meeting
description: Prepares a parent for a parent-teacher meeting or parents' evening with priorities, evidence to bring, questions to ask, how to raise a concern and agreed next steps to write down.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, notes]
output: [questions, checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [parent-teacher-conference, parents-evening, school-progress, raising-concerns, home-school-partnership]
pairs_with:
  prompts: [write-email-to-teacher, prepare-for-iep-meeting, complain-to-school-about-bullying]
args:
  - name: child
    description: Child's age, year or grade, how they seem to be doing (reports, homework, mood, friendships), and anything they have told you about school.
    type: text
    required: true
  - name: goals
    description: What you want from the meeting - general progress, a specific worry (falling behind, behaviour, bullying, boredom, a possible learning need), or something the teacher asked to discuss - and how long the slot is.
    type: text
    required: true
  - name: context
    description: Optional. Recent reports or messages from school, previous conversations with the teacher, home circumstances the school should know, and the language you are most comfortable in.
    type: text
output_contract:
  format: markdown
  sections: [Your top priorities, Bring with you, Questions to ask, Raising your concern, Agreeing next steps, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent get the most out of a parent-teacher meeting. These meetings are often short (five to fifteen minutes at a parents' evening), so the parent who arrives with one or two priorities and specific examples gets far more than one who asks "how is she doing?". Teachers respond best to a collaborative opening, concrete observations from home ("he spends an hour on maths homework and gets upset"), and questions about what they see in class. Useful questions go beyond grades: where the child is against expectations for their age, what they find hard, how they behave and who they work well with, what the parent can do at home, and how the parent will hear about progress. If the concern is serious (a possible learning difficulty, bullying, a big drop in progress), a ten-minute slot is rarely enough; the right move is to raise it, agree a follow-up meeting with the right person (special needs coordinator, head of year, counsellor) and write down what was agreed. Parents who are anxious about school, or less confident in the language, benefit from a short written list and from asking for an interpreter in advance where the school offers one.

<child>
{{child}}
</child>

<goals>
{{goals}}
</goals>

{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. Turn the parent's goals into one to three priorities ranked for the time available, and suggest an opening line that sets a collaborative tone.
2. List what to bring: specific examples from home with dates, recent work or reports, questions on paper, and anything the teacher should know (changes at home, health, sleep) at the level of detail the parent is comfortable sharing.
3. Write questions to ask, grouped: progress against expectations, strengths, what is hard, behaviour and friendships, how to help at home, and how progress will be communicated. Mark the three most important for a short slot.
4. If there is a concern, script how to raise it: what the parent has noticed, the impact, a question asking what the teacher sees, and a request for a specific next step; include what to say if the teacher disagrees or time runs out.
5. Explain how to agree next steps: who does what by when, a follow-up meeting with the right person if needed, and how to confirm it.
6. Write a short follow-up email template that confirms what was agreed.
</task>

<constraints>
- Keep the tone collaborative; do not script accusations against the teacher.
- Do not diagnose a learning difficulty or condition; suggest asking the school about an assessment and the relevant specialist.
- If anything suggests the child is unsafe, being harmed or at risk, say to raise it with the school's safeguarding or child protection lead promptly, not just at the meeting.
- Respect the slot length; trim the list if the meeting is short.
</constraints>

<output_format>
## Your top priorities
Numbered priorities and an opening line.

## Bring with you
Checklist.

## Questions to ask
Grouped questions with the top three marked.

## Raising your concern
Short script, or one line if there is no concern.

## Agreeing next steps
Bullets.

## After the meeting
The follow-up email template.
</output_format>
