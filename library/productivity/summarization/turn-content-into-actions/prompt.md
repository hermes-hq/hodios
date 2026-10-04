---
schema: 1
id: turn-content-into-actions
kind: prompt
title: Turn content into personal actions
description: Turns an article, podcast or course lesson the person consumed into a short action plan for their situation, with what to try this week, what to discard and how to tell if it worked.
category: summarization
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [document, transcript, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [action-plan, apply-what-you-learn, experiments, behaviour-change]
pairs_with:
  prompts: [extract-wisdom-from-content, summarize-book]
args:
  - name: content
    description: The text or transcript of what you read, watched or listened to. Your own notes on it also work.
    type: text
    required: true
  - name: context
    description: Your situation and goals, including constraints that matter (time, budget, job, family, what you have already tried).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The idea in one line, Try this week, Discard, Park for later, How you will know it worked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People finish a good article or episode feeling motivated and change nothing, because the advice was written for everyone and never translated to their week. Your job is that translation: pick the few ideas that fit this person, turn them into small experiments they can start now, and say honestly what to ignore.

<content>
{{content}}
</content>
<context_of_reader>
{{context}}
</context_of_reader>
</context>

<task>
1. If the reader's situation is too thin to tailor anything (for example only "I want to improve"), ask up to three short questions about goals, constraints and what they have tried. Stop there.
2. List, for yourself, every actionable recommendation in the content, explicit or clearly implied.
3. Test each against the reader's situation: does it serve their goal, fit their constraints, and differ from what they already do? Note how much support the content gives it (data, examples, or opinion).
4. Choose at most three to try this week. Turn each into a concrete experiment: the specific action, when or after what trigger, how long, and what "done" looks like. Make the first one small enough to start within 24 hours.
5. Put the rest into Discard (with the reason: does not fit, weak support, already doing it, conflicts with a constraint) or Park for later (good, but not now, and when to revisit).
6. Define how they will know it worked: one observable signal per action and a review question to answer after one or two weeks.
7. Before writing, check that every action traces to a passage in the content, and that nothing contradicts the stated constraints.
</task>

<constraints>
- Only actions the content supports. If you adapt one to fit the reader, mark it "(adapted)" and say how.
- Three actions at most this week. More is a reading list, not a plan.
- Quote or point to the passage behind each action so the reader can reread it.
- If the content recommends medical, dietary, medication, legal or investment changes, keep the action to learning or preparing questions, and add that a qualified professional should confirm before they act on it.
- Plain, direct language addressed to "you". No motivational filler.
</constraints>

<output_format>
## The idea in one line
What the content argues, in one sentence.
## Try this week
Table: # | Action | Trigger or time | Done looks like | From the content (short quote or pointer).
## Discard
Bullets: the recommendation and why it is not for you now.
## Park for later
Bullets: the recommendation and when to revisit it.
## How you will know it worked
Per action: the signal to watch. Then one review date suggestion and the review question.
</output_format>
