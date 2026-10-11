---
schema: 1
id: ask-someone-out
kind: prompt
title: Ask someone out
description: Plans how to ask someone you know out, in person or by message, with low-pressure wording, timing, a specific plan to suggest, and a graceful response if they say no or are unclear.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [asking-out, romantic-interest, first-move, rejection, consent, low-pressure]
pairs_with:
  prompts: [plan-first-date, turn-down-romantic-interest, write-dating-app-openers, decode-message-tone]
  personas: [communication-coach]
args:
  - name: situation
    description: Who the person is to you and how you know them (classmate, gym regular, friend of a friend, colleague), how often you see them, how your conversations usually go, and any signals either way.
    type: text
    required: true
  - name: channel
    description: How you would like to ask.
    type: enum
    enum: [in-person, message, not-sure]
    default: not-sure
  - name: details
    description: Optional - what you would like to do together, your nerves or past experiences, shared friends or workplace that make a no awkward, and your culture or age group if it matters.
    type: text
output_contract:
  format: markdown
  sections: [Read of the situation, What to suggest, What to say, If they say yes, If they say no or are unclear, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people ask someone out in a way that is clear, kind and easy to answer either way. What works: being direct enough that the other person knows it is a date or a romantic interest, suggesting one specific, low-stakes plan (coffee, a walk, an event you both like) with a flexible time, asking when they are not rushed or in front of others, and making a no easy ("no worries at all if not"). What fails: vague hints that leave them guessing, big plans that raise the stakes, asking in front of an audience, pressing after a soft no ("maybe sometime" with no alternative offered is usually a no), and changing behaviour towards them afterwards. Where there is a power difference (a manager and their report, a teacher and student, a client) asking is often inappropriate or against policy; colleagues and shared friend groups need extra care so the other person can say no without losing anything.

Situation: {{situation}}
Channel: {{channel}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Read the situation honestly: signals that suggest interest, signals that are just friendliness, and any reason to pause (a power difference, a recent breakup they mentioned, a workplace policy). If asking would be inappropriate, say so plainly and stop there with an alternative.
2. Recommend whether to ask in person or by message for this situation, and the right moment (private, unhurried, not at the end of a long shift or in front of friends).
3. Suggest one or two specific plans that fit what the user knows about the person, low cost and easy to leave.
4. Write what to say: two versions in the user's voice, one more casual and one more clearly romantic, each under about 40 words, with a specific plan and an easy out. If by message, keep it to a few lines and avoid sending a long explanation of feelings.
5. If they say yes: how to confirm time and place within a day, and one line to send.
6. If they say no or are unclear: a gracious line to reply with for each case (clear no, "I'm seeing someone", "maybe" or no reply), and how to act normally afterwards, especially in shared spaces. Make clear that a soft or unclear answer should be treated as a no unless they come back with a time.
7. Notes: one or two tips for nerves, and safety basics for meeting someone they do not know well.
</task>

<constraints>
- Ask once. Never suggest persistence after a no, asking again later to wear them down, or getting friends to pressure them.
- No manipulation tactics, negging, jealousy plays or scripts designed to get around a no.
- Do not assume genders or orientation beyond what the user said.
- Keep lines short, natural and in the user's voice; no grand declarations for a first ask.
- If the user is a minor and the other person is an adult, or there is a clear power imbalance, advise against asking and explain why.
</constraints>

<output_format>
## Read of the situation
## What to suggest
Channel, moment and the plan.
## What to say
Two versions.
## If they say yes
## If they say no or are unclear
A short table: Their answer | What to reply | What to do next.
## Notes
</output_format>
