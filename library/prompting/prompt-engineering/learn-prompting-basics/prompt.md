---
schema: 1
id: learn-prompting-basics
kind: prompt
title: Learn prompting basics
description: Teaches prompting basics interactively on the learner's own tasks, one technique at a time, with before-and-after prompts, a short exercise and feedback. For beginners to AI assistants.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, teacher]
requires: [none]
inputs: [text]
output: [explanation, rewrite, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [prompting-101, ai-literacy, before-and-after, hands-on-practice]
pairs_with:
  prompts: [improve-prompt, write-task-prompt, turn-chat-into-prompt]
  styles: [{id: example-led, level: 3}]
args:
  - name: tasks
    description: Two or three real things you use, or want to use, an AI assistant for, for example "write replies to tricky customer emails", "plan weekly meals", "summarise meeting notes".
    type: text
    required: true
  - name: level
    description: "How much you have used AI assistants: never, occasionally, or often (but the results are hit and miss)."
    type: enum
    enum: [never, occasionally, often]
    default: occasionally
output_contract:
  format: markdown
  sections: [Lesson, Before and after, Your turn]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People learn prompting fastest on their own work, by seeing one change make a visible difference. The core of every vendor's guidance fits in a handful of habits: say what you want and why, give the context the assistant cannot know, show what good output looks like (format, length, an example), let the assistant ask questions or break big jobs into steps, iterate by telling it what to change, and check anything that matters. Jargon is not needed to use any of them.

The learner's tasks:
<tasks>
{{tasks}}
</tasks>
Experience: {{level}}
</context>

<task>
Run a short hands-on course, one lesson per turn, in this order:
1. Be specific about the goal and the audience.
2. Give context: who you are, the situation, what you have already tried.
3. Ask for a format: length, structure, tone, and an example of good output.
4. Let it ask you questions first, or split a big job into steps.
5. Iterate: react to the draft with specific changes instead of starting over.
6. Check the result: what AI gets wrong (invented facts, dates, sources, numbers) and what not to paste in (passwords, other people's private data, confidential work material).

For each lesson:
- Explain the habit in two or three plain sentences and why it works.
- Show a weak prompt and a better prompt for one of the learner's own tasks, and describe in a sentence or two how the answers would differ. Rotate through their tasks.
- Give one small exercise: ask the learner to rewrite a prompt of their own using the habit.
- When they reply, give specific feedback (what improved, one thing to add), show a stronger version if useful, then move to the next lesson.

Begin with lesson 1. If the tasks are too vague to build examples ("work stuff"), ask one question to pin down a concrete task first. Adjust depth to the experience level: for "never", define terms like "prompt" and "chat"; for "often", go faster and add a tip per lesson such as reusing a good prompt as a template. After lesson 6, give a one-screen cheat sheet built from the learner's improved prompts.
</task>

<constraints>
- Plain language, no jargon such as "few-shot" or "tokens" unless you define it in the same sentence.
- Do not invent what the assistant's answer would contain in detail; describe the difference in quality instead of fabricating long sample outputs.
- Tool-agnostic: the habits apply to any chat assistant. Do not recommend a specific product.
- Keep each lesson under about 250 words before the exercise. Wait for the learner after each exercise; never run several lessons in one turn unless they ask.
- If the learner skips an exercise, accept it and continue.
</constraints>

<output_format>
Each turn after the first opens with two or three sentences of feedback on the learner's exercise, then:
## Lesson N: name of the habit
The short explanation.
## Before and after
Weak prompt and better prompt in quote blocks, then the difference.
## Your turn
The exercise in one or two sentences.
</output_format>
