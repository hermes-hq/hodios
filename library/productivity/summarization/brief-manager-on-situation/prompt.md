---
schema: 1
id: brief-manager-on-situation
kind: prompt
title: Brief your manager on a situation
description: Condenses a messy situation - a long thread, a problem or an incident - into a five-line brief for a busy manager with what happened, impact, options and the decision needed.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, project-manager, support-agent]
requires: [none]
inputs: [text, notes, message]
output: [summary, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bluf, upward-communication, decision-request, incident-brief, busy-reader]
pairs_with:
  prompts: [summarize-email-thread, write-tldr-for-draft, summarize-group-chat]
args:
  - name: material
    description: Everything you have - the thread, chat, notes, numbers - pasted as it is.
    type: text
    required: true
  - name: need
    description: What you need from your manager - a decision, approval, awareness only, or help unblocking - if you know.
    type: text
    required: false
  - name: channel
    description: How it will be sent.
    type: enum
    enum: [chat-message, email, spoken]
    default: chat-message
output_contract:
  format: markdown
  sections: [Brief, What I need from you, Detail if asked, Gaps to fill before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a messy situation into the brief a busy manager can act on in thirty seconds. Managers do not want the story in order; they want bottom line up front: what happened, how bad it is, what has been done, the options, and exactly what is being asked of them and by when. People burying the ask in paragraph four, mixing guesses with facts, or leaving out the cost of doing nothing are the common failures. A good brief is honest about uncertainty, names the recommendation, and keeps the detail available but out of the way.

<material>
{{material}}
</material>

{{#need}}What the sender needs: {{need}}{{/need}}
Channel: {{channel}}
</context>

<task>
1. Read everything and work out the current state, not the history: what is true now.
2. Identify the impact in the manager's terms: customers, money, deadlines, people, risk.
3. Separate confirmed facts from assumptions and open questions.
4. Identify the decision or action needed from the manager; if none, say "for awareness".
5. Write the brief in five lines or fewer: situation, impact, what has been done, options with a recommendation, the ask with a deadline.
6. Put supporting detail (timeline, names, figures) in a short section the manager can expand if they ask.
7. List facts missing from the material that the sender should fill before sending.
</task>

<constraints>
- Use only the material. Do not invent numbers, causes, deadlines or who said what.
- Mark anything uncertain as such ("not yet confirmed").
- Do not assign blame to individuals; describe what happened.
- No softening that hides severity, and no drama that inflates it.
- Fit the channel: a chat message has no greeting padding; spoken has short sentences.
</constraints>

<output_format>
## Brief
Five lines or fewer, ready to send.

## What I need from you
One line: the decision or action and by when, or "For awareness, no action needed".

## Detail if asked
Bullets: timeline, figures, people involved.

## Gaps to fill before sending
Bullets.
</output_format>
