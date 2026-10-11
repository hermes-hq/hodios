---
schema: 1
id: respond-to-being-blamed-unfairly
kind: prompt
title: Respond to being blamed unfairly
description: Plans a calm response when you are blamed at work for something that was not your fault, with the facts to gather, what to own, what to say in person or in writing and what to document.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager, project-manager]
requires: [none]
inputs: [text, message]
output: [script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [blame, workplace, facts-not-feelings, record-keeping, self-advocacy]
pairs_with:
  prompts: [respond-to-criticism, handle-credit-taking-colleague, handle-difficult-manager]
  personas: [workplace-mediator]
args:
  - name: situation
    description: What went wrong, who blamed you and how (meeting, email, review), what actually happened as you understand it, and what evidence exists (emails, tickets, messages).
    type: text
    required: true
  - name: blamer
    description: "Who is blaming you, for example \"my manager\", \"a peer on another team\", \"a client\"."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The facts, What you own, What to say, In writing, Protect yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When people are blamed unfairly, they usually either defend loudly in the moment, which looks guilty or emotional, or say nothing and let the story stick. What works is slower: avoid arguing on the spot ("I want to look at what happened and come back to you"), gather the timeline and the evidence, separate what was genuinely yours from what was not, own your part if there is one (even a small one, since it makes the rest credible), and then correct the record privately with the person, calmly and with facts, focused on fixing the problem and preventing a repeat rather than on who is guilty. Most failures have several causes; a blameless framing ("the handover had no owner") lands better than counter-blame ("it was Sam's fault"). If blame becomes a pattern or affects your review or pay, written records matter.
</context>

<task>
Help me respond to being blamed by {{blamer}}.

<situation>
{{situation}}
</situation>

1. If key facts are missing (what I was asked to do, what I did, when), ask up to three short questions and stop.
2. Build a short timeline of what happened from what I said, and list the evidence I should gather. Flag gaps where my version may be hard to prove.
3. Honestly separate what was mine, what was someone else's, and what was a process gap no one owned. If part of it was mine, say so.
4. Write a line for the moment if it comes up again before I am ready, that neither accepts nor argues.
5. Write what to say in a private conversation: brief acknowledgement of the impact, the facts in order, what I own, the process fix, and a request to correct the record where it matters (for example with the people who heard the blame).
6. Write a short follow-up email or message that records the facts neutrally, without accusing anyone.
7. Say how to protect myself if this repeats: keeping records, confirming instructions in writing, and when to involve a skip-level manager or HR.
</task>

<constraints>
- Facts and timeline, not feelings or character judgements about the blamer.
- No counter-blaming a named colleague; describe the gap and the fix.
- Do not invent evidence or details I did not give; mark assumptions.
- Keep the in-person version under about 120 words and the email under about 150.
- If the blame could lead to discipline or dismissal, suggest getting advice from HR, a union or an employment adviser.
</constraints>

<output_format>
## The facts
Timeline, evidence to gather, and gaps.
## What you own
Honest split of responsibility.
## What to say
The line for the moment, then the private conversation.
## In writing
The follow-up message.
## Protect yourself
Records and when to escalate.
</output_format>
