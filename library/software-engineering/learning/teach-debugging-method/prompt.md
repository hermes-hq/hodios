---
schema: 1
id: teach-debugging-method
kind: prompt
title: Teach me to debug my own bug
description: Teaches a learner to debug their own real bug systematically, by asking for observations, a hypothesis and a test one step at a time instead of fixing it for them.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [student, software-engineer]
stack: []
requires: [none]
inputs: [text, stack-trace]
output: [questions, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [debugging-skills, scientific-method, error-messages, rubber-ducking]
pairs_with:
  prompts: [draft-help-request-for-stuck-problem, trace-program-execution, explain-stack-trace]
  personas: [coding-mentor]
args:
  - name: problem
    description: What is going wrong, in your own words.
    type: text
    required: true
  - name: code
    description: The relevant code.
    type: text
  - name: error
    description: The exact error message or wrong output, and what you expected instead.
    type: text
output_contract:
  format: markdown
  sections: [What we know, Next step, Debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Beginners debug by changing things until the error goes away, and an assistant that fixes the bug for them reinforces that. The method that transfers to every future bug is the scientific one: reproduce it reliably, read the whole error message (the last line says what, the traceback says where, the first line of your own code in it is usually where to look), compare expected and actual precisely, form one hypothesis, run one small experiment to test it (a print or log of the value, a breakpoint, a smaller input, commenting out half), and narrow down. The most common blockers are not reading the error, testing several changes at once, and assuming a value instead of checking it.
</context>

<task>
Help the learner debug this themselves.

Problem: {{problem}}
{{#code}}

```
{{code}}
```
{{/code}}
{{#error}}
Error or wrong output: {{error}}
{{/error}}

1. Find the bug privately so your questions lead somewhere real. Do not reveal it.
2. Start with observation: ask the learner to state expected versus actual behaviour precisely, and if there is an error, to read it to you: what type, what message, which line of their own code. Explain how to read a traceback once, briefly, if they struggle.
3. Ask them for a hypothesis: what could cause the difference? If they have none, offer a way to narrow it down rather than a guess (which value would you check first?).
4. Suggest one small experiment to test their hypothesis: printing or logging a specific value at a specific line, a breakpoint, a smaller input, or isolating a part. Ask them to predict the result before running it.
5. After they report back, compare the result with their prediction and ask what it tells them. Repeat steps 3 and 4, narrowing each time. If they go off track twice, give a stronger nudge toward the right area.
6. When they find the cause, let them propose the fix. Confirm it, and ask how they would check it does not break something else.
7. Debrief: the steps that worked, the one habit to keep, and how to describe the bug in one sentence.
</task>

<constraints>
- Do not give the fix or point to the exact line unless the learner explicitly asks for it (for example, they say they only want the fix or are out of time), or the bug could cause harm (data loss, a security problem). Then give the fix with a short explanation of the cause and one line on how to spot it next time.
- One question or experiment per turn. Keep turns short.
- Treat every wrong hypothesis as useful information, not a failure.
- If the problem description is missing the error or code needed to reason about it, ask for it first.
</constraints>

<output_format>
Each turn:
## What we know
Bullets of confirmed facts so far.
## Next step
One question or one experiment, with "predict the result first" where relevant.
At the end:
## Debrief
What worked, one habit, the bug in one sentence.
</output_format>
