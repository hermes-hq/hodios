---
schema: 1
id: write-guest-interview-questions
kind: prompt
title: Write guest interview questions
description: Writes researched interview questions for a podcast guest from their bio and work, with follow-ups, a question path and topics to avoid. Use when preparing to interview a guest.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer]
inputs: [text, document, topic]
output: [questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [interviewing, follow-up-questions, guest-research, question-path]
pairs_with:
  prompts: [plan-podcast-episode, write-show-notes]
args:
  - name: guest_bio
    description: The guest's bio plus anything you have on their work (books, talks, articles, past interviews, notable projects). The more specific, the better the questions.
    type: text
    required: true
  - name: episode_angle
    description: What this episode is about and what listeners should get from it.
    type: text
    required: true
  - name: count
    description: How many main questions to write (follow-ups are extra).
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Angle and research gaps, Question path, Handle with care, Verify before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interview producer. Guests who do many interviews have stock answers to stock questions ("How did you get started?", "What's your advice for beginners?"), and those answers make forgettable episodes. Memorable interviews come from questions that show the host did the homework: they reference a specific decision, a contradiction between two things the guest said or did, or a moment the bio skips over, and they ask for stories and specifics rather than opinions in general. Good questions are open, ask one thing at a time, and are short; the follow-up is often where the real answer comes out.
</context>

<task>
Write {{count}} main interview questions.

<guest_bio>
{{guest_bio}}
</guest_bio>

<episode_angle>
{{episode_angle}}
</episode_angle>

1. Summarise the angle in one sentence and list research gaps: what you would need to know about the guest to ask sharper questions that the bio does not tell you.
2. Write the questions as a path in five stages, with roughly this share of the total:
   - Warm-up (10%): easy, specific, and still interesting; not "tell us about yourself".
   - Context (20%): the background the listener needs for the angle, asked through a specific moment or decision from the bio.
   - Depth (35%): the core of the angle: how they actually do the thing, the decisions, trade-offs and failures, with requests for stories and examples.
   - Tension (15%): respectful challenges, such as counter-arguments, contradictions in their record, or what critics say, framed so the guest can answer well.
   - Practical and close (20%): what a listener can do, and a closing question that is not "Where can people find you?" (save that for the outro).
3. For each question give: the question (under 25 words, one question only), why you are asking it (what it should draw out, and the bio detail it references), and one or two follow-ups that dig deeper ("What did that cost you?", "What would you do differently?"). Mark the three to five questions you must not skip.
4. List topics to handle with care or avoid, based only on what the bio and angle suggest (for example a recent setback, a legal matter, private life), with how to approach each if at all.
5. List facts about the guest to verify before recording.
</task>

<constraints>
- Use only facts from the bio and angle. Do not invent books, companies, quotes, dates or events in the guest's life; if a question would need a fact you do not have, put it under research gaps instead.
- No double-barrelled questions, no yes/no questions in the depth stage, no leading questions that answer themselves.
- Avoid the stock questions above unless reframed around something specific.
</constraints>

<output_format>
## Angle and research gaps
## Question path
Grouped by stage. Each item: the question in bold, then "Why:" and "Follow-ups:" lines. Mark must-ask questions with (must-ask).
## Handle with care
## Verify before recording
</output_format>
