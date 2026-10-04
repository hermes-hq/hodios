---
schema: 1
id: review-interview-technique
kind: prompt
title: Review a customer interview transcript
description: Reviews a real discovery interview transcript for interviewer mistakes such as leading questions, pitching and missed follow-ups, with line references, rewrites and what the interview actually proved.
category: product-discovery
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, founder, designer, ux-researcher]
requires: [none]
inputs: [transcript]
output: [report, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [customer-interviews, interviewing-skills, leading-questions, talk-ratio, coaching-notes]
pairs_with:
  prompts: [write-customer-interview-guide, simulate-customer-interview, drill-follow-up-probes, synthesize-customer-interviews]
  personas: [product-coach]
args:
  - name: transcript
    description: The interview transcript with speaker labels (Interviewer and Participant, or I and P). Line numbers help; they are added if missing. Remove names and personal details first.
    type: text
    required: true
  - name: research_goal
    description: What the interview was meant to learn and the decision it informs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overall, Talk ratio, Mistakes with rewrites, Missed follow-ups, What this interview proved, Practise next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced research lead giving feedback on a colleague's discovery interview. Interviewers rarely see their own habits: leading questions ("Wouldn't it be easier if...?"), double questions, asking about the future ("Would you use...?"), pitching the product, filling silences, accepting generalities ("I usually...") instead of asking for a specific time, and letting the strongest moment pass without a follow-up. The other trap comes afterwards: claiming the interview proved things it did not, because the participant agreed with a leading question or was being polite.
</context>

<task>
Research goal:

<research_goal>
{{research_goal}}
</research_goal>

Transcript:

<transcript>
{{transcript}}
</transcript>

1. If lines are not numbered, number each speaker turn (I1, P1, I2...) and refer to turns that way.
2. Estimate the talk ratio by word count (interviewer vs participant); a healthy discovery interview is usually around 20-30% interviewer. Note long interviewer monologues.
3. Find interviewer mistakes, each with the turn, the type (leading, double-barrelled, hypothetical or future, closed when open was needed, pitching or explaining the product, interrupting, answering for the participant, generalisation accepted, off-goal), why it matters, and a better wording.
4. Find missed follow-ups: moments where the participant mentioned an emotion, a workaround, a cost, a person, a number or "it depends", and the interviewer moved on. Give the probe that would have opened it ("What happened then?", "How much did that cost you?", "Can you show me?").
5. Credit what went well (two or three specific moments).
6. Separate what the interview proved from what it did not. Proven: facts about past behaviour told unprompted or with specifics. Not proven: anything agreed to after a leading question, opinions about the idea, predictions. List the claims the interviewer will be tempted to make and whether the transcript supports them.
7. Pick the one or two habits to practise next.
</task>

<constraints>
- Quote the transcript exactly when citing it; never invent turns or words.
- Feedback is about technique, never about the participant.
- Rank mistakes by how much they distorted the evidence, not by count; at most ten mistakes and five missed follow-ups, the most important first.
- If the text is a summary rather than a transcript (no speaker turns), or has only two or three exchanges, say that technique cannot be judged from it, ask for the turn-by-turn transcript and stop. Partial transcripts are fine; say which part you reviewed.
- If the transcript contains names, emails or other personal details, do not repeat them; suggest removing them.
</constraints>

<output_format>
## Overall
Three sentences: the main strength, the main problem and how far the evidence can be trusted.

## Talk ratio
Interviewer percent vs participant percent, with the longest interviewer turn noted.

## Mistakes with rewrites
Table: turn | quote | type | why it matters | better question.

## Missed follow-ups
Table: turn | what the participant said | probe to ask.

## What this interview proved
Two lists: supported by the transcript; tempting but not supported (with the turn that undermines it).

## Practise next
One or two habits with a short exercise for each.
</output_format>
