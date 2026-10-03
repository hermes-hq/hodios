---
schema: 1
id: write-tell-me-about-yourself
kind: prompt
title: Answer "tell me about yourself"
description: "Crafts a 60 to 90 second answer to \"tell me about yourself\" tailored to the role, with a present-past-future structure, one proof point and a natural ending that invites the next question."
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [interview-opener, elevator-pitch, personal-pitch, behavioural-interview]
pairs_with:
  prompts: [prepare-phone-screen, prepare-star-stories, run-mock-interview]
  workflows: [interview-prep-track]
args:
  - name: role
    description: The role you are interviewing for, ideally with the posting or the two or three things the employer most needs.
    type: string
    required: true
  - name: background
    description: Your resume or a summary of your experience, plus why you want this role and anything you want the interviewer to remember.
    type: text
    required: true
  - name: seniority
    description: Optional. Your level and the interview stage, for example "new graduate, first round" or "director, final panel with the CEO".
    type: string
output_contract:
  format: markdown
  sections: [Answer, 30-second version, Why it works, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview coach. "Tell me about yourself" is almost always the first question, and it sets the frame for the whole interview. The interviewer is really asking: who are you professionally, why are you here, and why should I keep listening? Weak answers recite the resume from school onward, share personal life details the interviewer did not ask for, run for three minutes, or end with a trailing "so, yeah". Strong answers are 60 to 90 seconds, chosen for this role, built around one memorable proof point, and they end by connecting to the job, which invites the next question.

Role: {{role}}
{{#seniority}}Level and stage: {{seniority}}{{/seniority}}

<background>
{{background}}
</background>
</context>

<task>
1. Pick the thread. From the background, choose the one-line professional identity that best fits this role ("I am a support lead who turns messy queues into systems") and the single proof point that makes it believable (an achievement with scope and result).
2. Write the answer in present-past-future order:
   - Present (about 20 seconds): current role or situation, framed by the identity line, and what the candidate is known for.
   - Past (about 30 seconds): one or two earlier steps that explain how they got here, with the proof point. Skip anything that does not support this role.
   - Future (about 20 seconds): why this role and this employer now, specific to what the role needs, ending with a line that hands the conversation back naturally.
3. Calibrate to the level: new graduates lead with studies, projects or internships and motivation; experienced hires lead with scope and impact; senior candidates speak about the problems they solve and the teams they build. Career changers name the change in one confident line and connect the old skills to the new role.
4. Write a 30-second version for screens and panels that run long.
</task>

<constraints>
- 150 to 220 spoken words for the main answer (about 60 to 90 seconds); 70 to 80 words for the short version. Report the word count of each.
- Write it to be spoken: short sentences, contractions, no lists, nothing that sounds memorised from a resume ("results-driven professional with a proven track record").
- Use only facts from the background. Never invent employers, numbers or motivations. If the reason for wanting this role or a result is missing, write [placeholder] and ask for it in Delivery notes.
- No personal details (family, age, hobbies) unless the candidate asks and they directly support the role.
- Do not explain gaps, layoffs or a career change at length here; one line at most, then move on.
</constraints>

<output_format>
## Answer
The script, then "Words: N".
## 30-second version
Then "Words: N".
## Why it works
Two or three bullets: the thread chosen and why it fits this role.
## Delivery notes
Bullets: placeholders to fill, where to pause, and how to practise it without sounding memorised (learn the three beats, not the words).
</output_format>
