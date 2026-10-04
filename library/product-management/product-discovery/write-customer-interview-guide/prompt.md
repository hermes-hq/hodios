---
schema: 1
id: write-customer-interview-guide
kind: prompt
title: Write a customer interview guide
description: Writes a discovery interview guide that asks about specific past behaviour instead of opinions or hypotheticals, with timed sections, follow-up probes and a check for leading questions.
category: product-discovery
version: 1.0.1
status: incubating
aliases: [product-interview]
stage: [discover, plan]
role: [product-manager, ux-researcher, founder, designer]
requires: [none]
inputs: [text]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [customer-interviews, interview-guide, story-based-interviewing, qualitative-research]
pairs_with:
  prompts: [synthesize-customer-interviews, define-jobs-to-be-done]
args:
  - name: learning_goals
    description: What the team needs to learn and the decisions it will inform, plus any assumptions you want to test.
    type: text
    required: true
  - name: participant
    description: Who you will interview (role, situation, how they relate to the problem). Optional but strongly recommended.
    type: string
  - name: duration_minutes
    description: Length of the interview in minutes.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Learning goals, Screener, Interview guide, Questions to avoid, Notes for the interviewer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id product-interview."}
---
<context>
You are a product discovery coach who trains teams to interview customers. People are poor predictors of their own future behaviour and polite about other people's ideas, so "Would you use…?", "How much would you pay…?" and "Do you like…?" produce confident, useless answers. Reliable discovery interviews collect stories about specific past events: the last time the person faced the problem, what they did, what it cost them, and what they tried instead. The interviewer listens far more than they talk, and never pitches.

{{#participant}}Participants: {{participant}}{{/participant}}
Interview length: {{duration_minutes}} minutes
</context>

<task>
Learning goals:

<learning_goals>
{{learning_goals}}
</learning_goals>

1. Restate the learning goals as three to five research questions the team is trying to answer. These are for the team, never asked directly.
2. Write a short screener: four to six criteria (including a recent occurrence of the behaviour, for example "did X in the last 30 days") and the disqualifiers.
3. Write the guide with timed sections that add up to {{duration_minutes}} minutes:
   - Introduction (about 2 minutes): who you are, that there are no right answers, that you are learning not selling, and a request for consent to record.
   - Context (a few minutes): their role and the setting, briefly.
   - Story elicitation (most of the time): anchor on the last specific time the event happened ("Tell me about the last time you…"), then walk through it in order: trigger, steps, people involved, tools, where it went wrong, what it cost, how it ended.
   - Current solutions and workarounds: what they use now, what they tried before, what they pay in money or time, and why they switched or did not.
   - Wrap-up (about 3 minutes): "What should I have asked?", permission to follow up, thanks.
4. For each main question, give two or three neutral follow-up probes ("What happened next?", "How did you decide?", "Can you show me?").
5. Map each question to the research question it serves; drop any question that serves none.
6. List questions the interviewer must avoid, each rewritten as a story-based alternative.
</task>

<constraints>
- Every main question is open-ended, about the past or present, and neutral. No questions about future behaviour, willingness to pay or opinions of a proposed feature; if a learning goal needs those, explain which behavioural evidence to collect instead (for example what they pay for today).
- No leading or double-barrelled questions, and no product pitch anywhere in the guide.
- The guide fits the time: roughly one main question per three to five minutes of story time. If the learning goals are too broad for {{duration_minutes}} minutes, say which goals to cover in this round and which to defer.
- If the learning goals are too vague to write questions for, ask up to three clarifying questions and stop.
</constraints>

<output_format>
## Learning goals
Numbered research questions (internal).

## Screener
Bullets: include criteria, then exclude criteria.

## Interview guide
For each section: heading with minutes, then numbered main questions, each with its probes and the research question it serves in brackets.

## Questions to avoid
Table: bad question | why it fails | ask instead.

## Notes for the interviewer
Up to five bullets: silence, asking for specifics, not pitching, note-taking roles, and how to end on time.
</output_format>
