---
schema: 1
id: beat-procrastination
kind: prompt
title: Beat procrastination on a task
description: Diagnoses why a specific task is being avoided, then gives a concrete two-minute first step, a plan for the next 25 minutes and a way to keep going. Use when you keep putting something off.
category: habits
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, student]
inputs: [text]
output: [plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [procrastination, task-avoidance, two-minute-start, time-boxing]
pairs_with:
  personas: [productivity-coach]
  prompts: [design-habit-plan]
args:
  - name: task
    description: The task you keep putting off, its deadline and who it is for.
    type: text
    required: true
  - name: why_stuck
    description: Optional - what you feel or think when you try to start, or what you do instead.
    type: text
output_contract:
  format: markdown
  sections: [What is probably going on, Your two-minute start, The next 25 minutes, Keep going, If you stall again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Procrastination is rarely laziness. People avoid tasks for specific reasons, and the fix depends on the reason: a task that is unclear needs a defined next action, a task that feels huge needs to be cut smaller, a task tied to fear of judgement needs a deliberately rough first draft, and a task with a distant reward needs a closer one. Generic advice ("just start", "use a timer") fails because it ignores the cause.

<task_avoided>
{{task}}
</task_avoided>
{{#why_stuck}}
<why_stuck>
{{why_stuck}}
</why_stuck>
{{/why_stuck}}
</context>

<task>
1. Diagnose. Check the task against these common causes and pick the one or two that fit best, citing the words that point to them:
   - Unclear next step or missing information or decision.
   - Too big, so starting feels pointless.
   - Unpleasant or boring.
   - Fear of judgement, perfectionism or of finding out it is hard.
   - Reward is far away or the deadline is distant.
   - Doubts that the task is worth doing, or resentment about it.
   - Low energy at the times you try, or competing demands.
   If the cause is unclear, give your best guess and one quick question to confirm it, then continue with the plan.
2. Write the two-minute start: one physical, visible, specific action that can be done right now (open the file and type the heading; put the three receipts on the desk). It must be smaller than the user expects.
3. Plan the next 25 minutes: a single focus block with a clear finish line that matches the diagnosed cause (a rough "bad first draft", a list of the five sub-steps, the one email that unblocks the decision).
4. Plan how to keep going: break the rest into steps of 25 to 50 minutes, schedule the next two blocks, add one form of accountability and a small reward after each block, and remove the main distraction.
5. Prepare for a stall: an if-then plan for the most likely derailment, and a reset rule that avoids guilt.
</task>

<constraints>
- Match the fixes to the diagnosis. Do not hand out a generic list of productivity tips.
- Keep it short and kind; the user should be able to start within a minute of reading.
- Do not invent details about the task. If something essential is missing (what the task is), ask once and stop.
- If the user describes avoidance that covers most of life, lasting low mood, hopelessness or exhaustion, gently say it may be worth talking to a doctor or counsellor, without diagnosing. If anything suggests they may be in danger, put that first and point them to local emergency services or a crisis line.
</constraints>

<output_format>
## What is probably going on
Two or three sentences naming the cause or causes and the evidence.
## Your two-minute start
One line, in bold.
## The next 25 minutes
The goal and finish line, plus two or three bullets on how.
## Keep going
Table: Block | What | When. Then accountability and reward in one line each.
## If you stall again
One if-then sentence and the reset rule.
</output_format>
