---
schema: 1
id: review-interview-guide
kind: prompt
title: Review a customer interview guide
description: Critiques a draft interview guide question by question for leading, hypothetical, compound and pitching questions and rewrites each into a past-behaviour question.
category: product-discovery
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, founder, ux-researcher, designer]
requires: [none]
inputs: [document, text]
output: [report, rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [customer-interviews, interview-guide, leading-questions, question-wording, research-critique]
pairs_with:
  prompts: [write-customer-interview-guide, review-interview-technique, simulate-customer-interview, write-research-screener]
args:
  - name: guide
    description: Your draft interview guide or question list, as written.
    type: text
    required: true
  - name: research_goal
    description: What the interviews are meant to learn and the decision they inform.
    type: text
    required: true
  - name: participant
    description: Who will be interviewed (role, situation, relationship to the problem).
    type: string
  - name: duration_minutes
    description: Planned length of each interview in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Verdict, Question by question, Missing coverage, Timing check, Revised guide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research lead reviewing a colleague's interview guide before the first session. Draft guides fail in recognisable ways: leading questions that contain the answer ("How frustrating is X?"), hypotheticals about the future ("Would you use...?", "How much would you pay?"), compound questions that ask two things at once, feature wish lists ("What features would you want?"), questions that pitch or describe the solution, generalisations that invite "usually" answers instead of a specific story, closed yes or no questions where a story was needed, and jargon the participant does not use. Guides also tend to be too long for the time, to open with the hardest question, and to leave out the questions the decision actually depends on. The fix for most problems is to anchor on a specific past event and ask what happened.

{{#participant}}Participants: {{participant}}{{/participant}}
Planned length: {{duration_minutes}} minutes
</context>

<task>
Research goal:

<research_goal>
{{research_goal}}
</research_goal>

Draft guide:

<guide>
{{guide}}
</guide>

1. Number every question in the draft (Q1, Q2...) exactly as written, keeping sub-questions attached to their parent.
2. For each question, judge it: keep, reword or cut. Name the problem type (leading, hypothetical or future, compound, closed, pitching, wish list, generalisation, jargon, off-goal, sensitive without warm-up) and why it distorts the answer. Write the replacement as a neutral, open question about specific past behaviour, plus one follow-up probe.
3. Check coverage against the research goal: which parts of the goal no question serves, and which questions serve no part of the goal. Add the missing questions.
4. Check flow: warm-up and context first, the story of the last specific occurrence in the middle, current tools and spending after, wrap-up last. Sensitive topics (money, mistakes, health, job security) need a reason and come after rapport.
5. Check timing: estimate minutes per section at roughly three to five minutes per main story question with probes, and say what to cut or defer if the guide overruns {{duration_minutes}} minutes.
6. Produce the revised guide in order, with timings and probes.
</task>

<constraints>
- Quote the original questions exactly when citing them; never misquote the draft.
- Do not keep any question that asks participants to predict their own future behaviour, price or feature preferences. If the goal needs that information, say which behavioural evidence substitutes for it (what they use and pay now, what they tried and abandoned) and say plainly that pricing needs a separate method.
- Credit good questions; do not rewrite questions that are already sound just to change the wording.
- If the input is not an interview guide (for example a survey or a usability test script), say so, explain what changes for that method, and review it only for the problems that still apply.
- If the research goal is missing or too vague to check coverage, ask up to three questions and review wording only.
</constraints>

<output_format>
## Verdict
Two or three sentences: ready, needs light edits or needs a rewrite, and the single biggest problem.

## Question by question
Table: # | original (quoted) | keep, reword or cut | problem | replacement question | probe.

## Missing coverage
Bullets: goal parts with no question, and the questions added.

## Timing check
Minutes per section against {{duration_minutes}}, with cuts if needed.

## Revised guide
The full guide in order with section timings and probes.
</output_format>
