---
schema: 1
id: plan-ai-literacy-lesson
kind: prompt
title: Plan an AI literacy lesson
description: Plans a classroom lesson on how AI chatbots produce answers, where they fail (made-up facts, bias, privacy) and how students can use them honestly for schoolwork, with unplugged activities.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-literacy, chatbots, hallucinations, academic-honesty, digital-citizenship]
pairs_with:
  prompts: [write-class-ai-policy, plan-media-literacy-lesson, design-ai-resistant-assignment]
args:
  - name: grade_level
    description: Grade, year or age of the class, for example "Year 7", "Grade 10" or "ages 9-10".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 50
  - name: setting
    description: Whether students can use an AI tool in class (school-approved tool, teacher demo only, or no devices), the school's AI rules if any, and the subject the lesson sits in.
    type: text
output_contract:
  format: markdown
  sections: [Objective, Hook, How chatbots work, Where they fail, Using AI honestly, Practice task, Exit ticket, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan AI literacy lessons for school classes. Students often believe chatbots look answers up in a database or "know" things, so they trust a fluent answer. The core idea to teach, at an age-appropriate level, is that a language model generates text by predicting likely next words from patterns in its training data. That explains its strengths (fluent writing, summaries, explanations, brainstorming) and its failures: confident made-up facts, quotes and sources; arithmetic and logic slips; out-of-date information; reflecting biases in the data; agreeing with a leading question; and no real understanding of the student's teacher or assignment. It also explains why typing personal information into a chatbot can be risky. Unplugged activities work well: a "predict the next word" game, comparing two plausible but different answers, or checking a chatbot answer with planted errors against a reliable source. Honest use depends on the school's rules; the useful distinction for students is between using AI to help them learn (explain, quiz, give feedback) and using it to do the work they are being assessed on, plus always disclosing use when required. Lessons fail when they preach, when they rely on a live tool that may be blocked or give unpredictable output, or when they suggest AI detectors can reliably catch cheating, which they cannot.

Class: {{grade_level}}
{{#setting}}

<setting>
{{setting}}
</setting>
{{/setting}}
</context>

<task>
Plan a {{minutes}}-minute lesson.

1. Objective: one objective and two or three "I can..." statements about understanding and habits, not about a particular product.
2. Hook (about 5 minutes): a short chatbot-style answer you write that sounds convincing but contains one invented fact or source, and a quick vote on whether students trust it.
3. How chatbots work: an age-appropriate explanation of next-word prediction and training data, with an unplugged activity such as students predicting the next word in sentences, then linking it to why answers can be fluent but wrong.
4. Where they fail: four or five failure types with a short invented example of each (made-up source, wrong calculation, outdated fact, biased assumption, agreeing with a false premise), plus a privacy rule about what never to type in.
5. Using AI honestly: a sorting activity where students place example uses into "helps me learn", "check the rules first" and "not my own work", aligned with the school's rules if given; include how to disclose AI help.
6. Practice task: pairs check a provided chatbot-style answer with planted errors against a reliable source or their own knowledge, recording what they checked and how. If students may use an approved tool, add an optional step to compare its answer; otherwise keep everything unplugged.
7. Exit ticket: two or three questions that test the main idea and one habit.
8. Teacher notes: likely misconceptions, how to adapt for younger or older students, and timings that add up to {{minutes}} minutes.
</task>

<constraints>
- Do not require students to create accounts or use tools the school has not approved; respect minimum age rules and say so if the class is younger than typical terms of use.
- Write all examples yourself and label them as invented for the lesson; do not quote real chatbot outputs as fact.
- Do not claim AI detectors reliably identify AI-written work.
- Keep the tone balanced: neither hype nor fear. Avoid naming or endorsing specific commercial products.
- Match language and examples to the grade level.
</constraints>

<output_format>
## Objective
## Hook
## How chatbots work
## Where they fail
Table: Failure | Invented example | How to check.
## Using AI honestly
## Practice task
## Exit ticket
## Teacher notes
</output_format>
