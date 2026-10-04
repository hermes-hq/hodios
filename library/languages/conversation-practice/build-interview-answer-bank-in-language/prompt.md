---
schema: 1
id: build-interview-answer-bank-in-language
kind: prompt
title: Build an interview answer bank in a new language
description: Turns a job seeker's real experience into short spoken interview answers in the target language, chunked at their level, with the grammar each needs and a drill to say them without notes.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [language-learner, job-seeker]
requires: [none]
inputs: [text, resume, job-posting]
output: [script, table, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [job-interview, answer-bank, chunking, working-abroad, spoken-recall]
pairs_with:
  prompts: [practice-interview-in-language, review-speaking-transcript, build-personal-phrasebook]
  personas: [business-english-coach]
args:
  - name: target_language
    description: The interview language, with the country if it matters (for example "German (Austria)", "Spanish (Mexico)").
    type: string
    required: true
  - name: experience
    description: Your real background in any language, rough notes are fine - jobs, dates, tasks, one or two things you are proud of, and why you want this job. A CV pasted in works.
    type: text
    required: true
  - name: target_job
    description: The job you are applying for, ideally with the ad or its key requirements.
    type: string
    required: true
  - name: level
    description: Your CEFR level in the target language; sets sentence length and grammar.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Question map, Answer bank, Grammar you need, Recall drill, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare job seekers to answer interview questions in {{target_language}}, a language they are still learning. The usual mistake is to write long, perfect answers in the first language, translate them and memorise them word for word: in the room the learner forgets one word and the whole answer collapses, or they recite at a level that sets up follow-up questions they cannot understand. What works is a small bank of short answers built from the learner's real facts, made of reusable chunks at their level, practised aloud until each one can be rebuilt from three or four keywords.

Target job: {{target_job}}
Level (CEFR): {{level}}

<experience>
{{experience}}
</experience>
</context>

<task>
1. Check the material. If the experience notes lack what you need for the core answers (current or last job, main tasks, one concrete achievement or example, reason for applying), ask for exactly those items in one short message and stop. Do not invent jobs, numbers or achievements.
2. Question map. List the 10 questions most likely for this job and country: tell me about yourself, why this job, your last job and tasks, a strength with an example, something you are improving, a problem you solved, teamwork, availability and start date, one question specific to {{target_job}}, and the newcomer question most likely locally (language level, work permit, why you moved). Mark the sensitive ones so the learner can decide how much to say.
3. Answer bank. Write answers for the 6 most important questions now (always including "tell me about yourself" and "why this job"); offer the rest after the drill. For each, one spoken answer in {{target_language}}:
   - Length by level: A1-A2 three to four short sentences; B1 four to six; B2 and up 30-60 seconds of speech. Never above the level.
   - Structure: direct answer first, one concrete example from the learner's facts, a closing line that links to the job.
   - Build from chunks the learner can reuse across answers (for example "I was responsible for...", "For example, last year I...", "That is why I would like to..."). Mark each chunk in bold the first time it appears.
   - Prefer words the learner can say with confidence: if a technical term is hard to pronounce or easy to mishear, give a simpler alternative.
   - Under each answer: a 3-4 keyword cue line, and a plain translation in the language the learner wrote to you in.
4. Grammar you need. Only the structures the answers use, usually the past tense used for finished jobs versus ongoing ones, present for current tasks, a conditional or polite form for wishes ("I would like"), and the formal address form for the interviewer. One line of rule and one example from the bank for each.
5. Recall drill. End your first message with the first cue only, then run the drill one step at a time:
   - Show only the cue line for one answer and ask the learner to say (or type) the answer without looking.
   - Compare with the bank: accept any version that is correct and keeps the facts; do not demand word-for-word recall.
   - Give at most two corrections per attempt, the ones that block understanding first.
   - Then ask a short, natural follow-up an interviewer might ask, so the learner practises going off-script.
   - Move to the next answer. After the six, offer to write the remaining answers. Stop when the learner says "stop", then write Next steps.
6. Next steps: which three answers are still weakest, a 10-minute daily routine (say each answer once from cues, record one, listen back), and when to switch to a full mock interview.
</task>

<constraints>
- Use only the learner's facts. Where a detail is missing, write [placeholder] in the answer and list it under Next steps.
- Keep honesty: never inflate titles, dates or skills, and never claim a language level the learner does not have.
- Name the cultural assumption when norms differ by country (how much self-promotion is welcome, whether salary or family questions are normal or even allowed) and say it varies by sector.
- For sensitive questions (visa status, gaps, health, family), give a short neutral answer and note that in many countries some of these questions should not be asked, without giving legal advice.
- Explanations go in the language the learner wrote to you in; answers in {{target_language}}.
</constraints>

<output_format>
## Question map
Table (10 rows): # | Question in {{target_language}} | Meaning | Why they ask | Sensitive?
## Answer bank
Six answers first. Per question: ### heading with the question, the answer, a "Cues:" line, a translation.
## Grammar you need
Bullets: structure, one-line rule, example from the bank.
## Recall drill
One cue at a time during the drill; your feedback in at most three lines per attempt.
## Next steps
Weakest answers, missing facts, daily routine, when to do a mock interview.
</output_format>
