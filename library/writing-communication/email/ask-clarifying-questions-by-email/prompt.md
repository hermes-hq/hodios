---
schema: 1
id: ask-clarifying-questions-by-email
kind: prompt
title: Ask clarifying questions by email
description: Replies to a vague task, brief or request with a few numbered questions that change the work, your working assumptions, and when you will start on those assumptions if no answer comes.
category: email
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, designer, consultant, data-analyst]
requires: [none]
inputs: [message, text]
output: [message, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [clarifying-questions, vague-brief, assumptions, requirements]
pairs_with:
  prompts: [acknowledge-request-and-set-timeline, request-information-by-email, reply-to-email]
args:
  - name: request
    description: The task, brief or request exactly as you received it.
    type: text
    required: true
  - name: what_you_know
    description: Anything you already know about the context, the requester, past similar work, or constraints.
    type: text
  - name: requester
    description: Who asked, for example "my manager", "a new client", "the head of sales".
    type: string
output_contract:
  format: markdown
  sections: [Gaps, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A vague request costs more than it looks: the work gets done to the wrong standard, for the wrong audience or by the wrong date, and is redone. But a reply with fifteen questions annoys a busy requester and delays everything. Experienced people ask only the questions whose answers would change what they do (purpose and audience, the deadline and why, the definition of done, constraints such as budget or format, who else must approve), pair each one with the assumption they will use if there is no answer, and say when they will start. That turns an open loop into a default the requester only has to correct, which most people answer in a line. Questions that can be answered by reading the brief again, or by checking a past example, should not be asked.
</context>

<task>
Write a clarifying reply to this request.{{#requester}} Requester: {{requester}}.{{/requester}}

<request>
{{request}}
</request>
{{#what_you_know}}
<what_you_know>
{{what_you_know}}
</what_you_know>
{{/what_you_know}}

1. List the gaps in the request: what is unclear or missing. For each, decide whether the answer would change the work materially (audience, purpose, scope, deadline, format, budget, approval, data source). Drop the ones that would not, and drop any the request or the context already answers.
2. Keep three to five questions at most, ordered by impact. If there are more, put the rest in Notes for a later conversation.
3. For each question, write the default assumption the user will work on if there is no answer. Make defaults reasonable and specific ("A 2-page summary for the leadership team, in the usual template").
4. Write the email:
   - Subject: "Re: [request]: a few quick questions before I start" (or reply in thread).
   - One line confirming you are on it.
   - Numbered questions, each with "If I don't hear back, I'll assume: …".
   - Start line: "I'll start on these assumptions on [day] unless you tell me otherwise." Use `[day]`.
   - Offer a 10-minute call if the questions are easier to talk through.
5. If one question is a blocker (work cannot start without it), mark it clearly and say so.
</task>

<constraints>
- Body under about 160 words.
- No questions the request already answers, no "just to confirm" filler questions.
- Never invent facts about the project or requester; the defaults are assumptions, labelled as such.
- Plain, confident tone; not apologetic about asking.
</constraints>

<output_format>
## Gaps
Bullets: each gap and whether it changes the work (kept or dropped).
## Email
Subject line, then the body.
## Notes
Lower-priority questions for later, and any blocker. "None" if nothing.
</output_format>
