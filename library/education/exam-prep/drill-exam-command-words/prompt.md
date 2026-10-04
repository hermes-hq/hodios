---
schema: 1
id: drill-exam-command-words
kind: prompt
title: Drill exam command words
description: Runs a points game on exam command words such as state, describe, explain, analyse and evaluate, where the student answers on their own topic and sees what each word demanded.
category: exam-prep
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student]
requires: [none]
inputs: [topic]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [command-words, exam-technique, mark-allocation, answer-structure, revision-game]
pairs_with:
  prompts: [analyze-past-papers, write-model-exam-answer, grade-practice-answers]
args:
  - name: subject
    description: Subject and level, such as "GCSE geography", "A-level economics", "IB biology". Add the exam board if you know it.
    type: string
    required: true
  - name: topic
    description: The topic all questions will be on, such as "coastal erosion", "price elasticity of demand", "the cardiac cycle".
    type: string
    required: true
  - name: rounds
    description: Number of rounds; each round uses one command word.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Scoreboard, Command word cheat sheet, Your weakest word]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students often know the content but lose marks by answering a different command word from the one asked: describing when asked to explain, explaining one side when asked to evaluate, writing a paragraph when "state" wanted one word. The general pattern across exam boards:
- State, give, name, identify: a fact or short answer, usually 1 mark each, no explanation needed.
- Describe: what something is like or what happens, with detail, but no reasons.
- Explain: why or how, with linked reasoning ("because", "this leads to", "therefore"); marks per developed point.
- Compare: similarities and differences, with a comparative word in each point.
- Analyse: break into parts and show chains of cause and effect.
- Evaluate, assess, discuss, to what extent: weigh both sides with evidence, then reach a supported judgement; the judgement carries marks.
- Suggest: apply knowledge to an unfamiliar context; reasonable answers accepted.
- Calculate: a numerical answer with working and units.
Definitions and mark allocations vary by board and subject, so the student should check their board's published command word list.
</context>

<task>
Play the command word game for {{rounds}} rounds on {{topic}} in {{subject}}.

1. Open with the rules in four lines: each round gives a question on {{topic}} with a command word and a mark total; they answer in their own words; they score points for meeting the command word (not only for the content); a streak bonus starts after two full-mark rounds.
2. Choose {{rounds}} command words in rising demand, starting with state or describe and ending with evaluate or to what extent. Include at least one describe/explain pair on the same idea so the difference is felt.
3. Each round, in one message: the question with its command word in bold and a realistic mark total (state 1, describe 2 to 3, explain 2 to 4, evaluate 6 to 9). Then wait.
4. After each answer:
   - Award marks out of the total, with a separate "command word met" verdict: yes, partly, no.
   - Show what the command word demanded: the structure that earns the marks, and a short model answer at that length on {{topic}}.
   - Name the mismatch if there was one ("you described, but explain needs a reason linked with because").
   - Update the scoreboard: round score, streak, running total.
5. If they overwrite a short-answer word (a paragraph for "state"), note the time that would cost in a real exam.
6. After the last round, give the debrief.
</task>

<constraints>
- Keep content on {{topic}} accurate to the level; if unsure of a fact, choose a different question.
- Mark totals are typical, not official; say so once.
- If the student says they only want the list, not the game, respect that: give the Command word cheat sheet table for the common words (noting lists differ by board), then offer one optional round on {{topic}}. Do not push.
- If they ask for a word their board does not use, or a word not on this list, say what it usually demands and that their board's published list is the authority.
- Keep it light and encouraging: points and streaks, not a test report. No sarcasm.
</constraints>

<output_format>
Each round: marks and command word verdict, what the word demanded, the model, the scoreboard line, then the next question.

At the end, under these headings:
## Scoreboard
Final score and longest streak.
## Command word cheat sheet
A table: Command word | What it demands | Typical marks | Signal words to use, for every word played.
## Your weakest word
The word they found hardest and one drill to practise it.
</output_format>
