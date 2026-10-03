---
schema: 1
id: reply-to-tricky-message
kind: prompt
title: Reply to a tricky message
description: Drafts replies to an awkward personal text or chat, such as a friend's request, a family dig, a date or a group-chat flare-up, in two or three tones and says what each one signals.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [message, text]
output: [message, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [texting, group-chat, awkward-situations, saying-no, family-dynamics, first-dates]
pairs_with:
  prompts: [set-boundary, respond-to-criticism, apologize-effectively]
  personas: [communication-coach]
args:
  - name: message_received
    description: The message you got, pasted exactly, plus the one or two messages before it if they matter.
    type: text
    required: true
  - name: context_and_goal
    description: "Who sent it, your history with them, how you feel about it, and what you want to happen next, for example \"say no without hurting her\", \"not take the bait\" or \"keep it light and see him again\"."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What they might mean, Replies, My pick, Don't send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Awkward personal messages are hard because text strips out tone, the stakes are relational, and the first draft is usually either too long (over-explaining, over-apologising) or sharper than intended. Good replies to personal messages are short, sound like the person sending them, answer the actual question or point, and choose deliberately what to signal: warmth, a firm line, humour, distance. In group chats, the audience is everyone, so the reply that wins the argument often costs more than it gains; moving it to a private message is often the best move.
</context>

<task>
Help me reply to this message.

<message_received>
{{message_received}}
</message_received>
<context_and_goal>
{{context_and_goal}}
</context_and_goal>

1. If the message suggests threats, harassment, stalking, coercion, or someone in danger (including the sender), do not draft a clever reply. Follow the safety guidance below.
2. Read the message: give the most likely meaning and one plausible alternative reading, separating what it says from what I might be reading into it. Note whether it actually needs a reply, a reply now, or a reply in a different place (a call, in person, a private message instead of the group).
3. Write two or three replies in clearly different tones that each serve my goal, for example warm, firm and light, or "yes with a limit", "kind no" and "not now". Each must be something I could send as-is.
4. For each, say what it signals to the other person and the likely reaction or risk.
5. Recommend one, and say what you would avoid sending.
</task>

<constraints>
- Match my texting style from how I wrote the context: length, punctuation, emoji use, formality. A reply to a text reads like a text, usually one to three sentences.
- Answer the actual question or request. A "no" stays a "no"; do not soften it into a maybe unless I want a maybe.
- No over-explaining, no long apologies, no therapy-speak ("I'm holding space", "that's a boundary for me") unless that is how I already talk.
- Do not invent facts or excuses for me to give. If a reply needs a reason I have not given, use a `[reason]` slot or a reply that needs no reason.
- No passive-aggression, guilt-tripping, mind games or lies. If my goal requires one (for example "make her feel bad"), offer an honest reply that protects my interest instead and say why in one line.
- In group chats, assume everyone reads it; flag when a private message or a call is better.
- If the message is from a date or partner and involves pressure for something I do not want, keep the no clear and do not argue against it.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What they might mean
Two or three lines: the likely reading, an alternative reading, and whether to reply now, later, or elsewhere.
## Replies
For each option: a bold tone label, the reply in a quote block, then "Signals:" and "Risk:" in one line each.
## My pick
One or two sentences.
## Don't send
One or two short bullets on the replies that would backfire and why.
</output_format>
