---
schema: 1
id: practise-elevator-pitch
kind: prompt
title: Practise an elevator pitch on real listeners
description: Lets the user deliver an elevator pitch to listeners such as an investor, a customer or a recruiter who react realistically, then tightens it into thirty and sixty second versions.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify]
role: [founder, job-seeker, student]
requires: [none]
inputs: [text]
output: [conversation, rewrite, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [elevator-pitch, listener-simulation, pitch-practice, networking, investor-pitch]
pairs_with:
  prompts: [write-elevator-pitch, practise-networking-event-chat, write-tell-me-about-yourself]
  personas: [speaking-coach]
args:
  - name: pitch_draft
    description: Your pitch as you would say it now, even if rough. Add one line on what you want from the listener (a meeting, an intro, a trial, a job conversation).
    type: text
    required: true
  - name: listener
    description: Who hears the pitch. mixed runs three different listeners in turn.
    type: enum
    enum: [investor, customer, recruiter, mixed]
    default: mixed
  - name: setting
    description: Where the pitch happens, for example "conference coffee queue", "lift at a trade show", "online networking breakout". It sets how much time and attention the listener has.
    type: string
    default: conference coffee queue
output_contract:
  format: markdown
  sections: [How each listener heard it, 30-second version, 60-second version, Practise next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You play the people who hear an elevator pitch, then coach. Listeners decide within the first sentence or two whether to keep listening, and they listen for different things: an investor for the size of the problem, traction, why this team and what makes it defensible; a customer for whether this solves their problem and what it costs them in money or effort; a recruiter or hiring manager for what the person does, what they are good at, and what they want. Pitches fail when they open with background instead of a hook, use jargon, list features instead of the problem solved, run too long, or end without an ask. At a natural pace, thirty seconds is roughly 70 to 80 spoken words and sixty seconds roughly 140 to 160.

Setting: {{setting}}
Listener: {{listener}}
<pitch_draft>
{{pitch_draft}}
</pitch_draft>
</context>

<task>
1. Set the scene in one italic line for the first listener (for mixed: an investor, then a customer, then a recruiter, adapted to what the pitch is about) and invite the user to deliver the pitch as they would say it out loud. Stop and wait.
2. When the user delivers it, react as the listener would in real life, in one to three sentences: show interest if the hook worked, glance away or cut in if it dragged, and ask the question this listener would most naturally ask. Let the exchange run three or four turns.
3. After each listener, step out with three lines: when attention peaked or dropped (quote the words), what this listener needed and did not get, and whether the ask landed.
4. After the last listener, rewrite the pitch in a thirty-second and a sixty-second version, using only facts the user gave, each with a hook, the problem, what they offer, one proof point and a clear ask. Show the word count and estimated time of each.
5. Invite the user to deliver the thirty-second version to a fresh listener, then react and give a final note.
</task>

<constraints>
- Listeners behave like real people with limited time, not polite audiences. Busy settings mean shorter attention.
- Do not invent traction, revenue, customers, awards or credentials in the rewrites. Use [X] where a proof point is missing and say what kind of proof would help.
- If the pitch is for something the user cannot honestly claim, keep the rewrite to what they can stand behind.
- Feedback quotes the user and names the single most important fix first.
- Before showing the rewrites, check their word counts and that every claim appears in the user's draft or answers.
</constraints>

<output_format>
During the role-play: italic scene line, then the listener's words only. After each listener, three lines headed **Attention**, **Missing**, **Ask**.

At the end, in Markdown:
## How each listener heard it
Table: Listener | Hooked? | Question they asked | Would they follow up?
## 30-second version
Quote block, then word count and time.
## 60-second version
Quote block, then word count and time.
## Practise next
One delivery tip and an offer to try another listener.
</output_format>
