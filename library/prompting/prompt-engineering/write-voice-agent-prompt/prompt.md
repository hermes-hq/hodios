---
schema: 1
id: write-voice-agent-prompt
kind: prompt
title: Write a system prompt for a voice agent
description: "Writes a system prompt for a voice assistant or phone agent with short spoken turns, confirmation of key details, recovery from mishearing and silence, tool use and a graceful handoff to a human."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [ml-engineer, designer]
requires: [none]
inputs: [text, spec]
output: [prompt, tests]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voice-agent, phone-bot, conversational-ai, human-handoff, speech]
pairs_with:
  prompts: [design-voice-interaction, write-system-prompt, build-prompt-test-set, harden-prompt-against-injection]
  styles: [{id: speakable, level: 5}]
args:
  - name: purpose
    description: "What the agent is for and who calls or talks to it, for example 'answer calls for a dental clinic: book, move and cancel appointments, answer opening hours and parking questions'. Include the organisation's facts it may state."
    type: text
    required: true
  - name: handoff_rules
    description: "When and how the agent must pass the caller to a human: triggers, opening hours of the human team, what to do out of hours, and what the human needs to receive."
    type: text
    required: true
  - name: tools
    description: "Optional: the actions or lookups the agent can call, with what each needs and returns, for example 'find_slots(date_range, practitioner)'."
    type: text
  - name: channel
    description: "Where the agent speaks. Phone calls have no screen and noisy audio; smart speakers and in-app voice may have a screen or companion app."
    type: enum
    enum: [phone, smart-speaker, in-app-voice, kiosk]
    default: phone
  - name: languages
    description: "Languages the agent should handle, and what to do with others."
    type: string
    default: "English only"
output_contract:
  format: markdown
  sections: [Assumptions and open questions, System prompt, Placeholders to fill, Test calls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A voice agent fails in ways a chat assistant does not. Its words are turned into speech, so Markdown, lists, links and long answers become noise; the caller cannot scroll back; speech recognition mishears names, numbers and email addresses; callers interrupt, go silent or talk over the agent; tool calls create dead air; and there is no visual way to show options. A good voice prompt keeps turns short, asks one thing at a time, reads back every detail that matters, recovers from errors in a fixed number of tries, says what it is doing while it waits, never makes up policy, and hands off to a person cleanly, with a summary so the caller does not repeat themselves.

Channel: {{channel}}
Languages: {{languages}}

<purpose>
{{purpose}}
</purpose>

<handoff_rules>
{{handoff_rules}}
</handoff_rules>
{{#tools}}
<tools>
{{tools}}
</tools>
{{/tools}}
</context>

<task>
1. If the purpose or handoff rules are too vague to write safe behaviour (for example no scope, or no answer to "what happens when no human is available"), ask up to three questions and stop.
2. List the assumptions you are making and the facts you still need.
3. Write the system prompt with these parts:
   - Identity and scope: who the agent is, what it handles, what it does not, and that it says it is an automated assistant at the start of the conversation and whenever asked.
   - Speaking style: plain spoken sentences, no visual formatting or symbols, one question per turn, short turns, numbers, dates, times and prices said the way people say them, options offered two or three at a time.
   - Conversation flow: greeting, finding the caller's goal, collecting the details each task needs, reading key details back for a yes before acting, and a clear close that says what happens next.
   - Recognition problems: when unsure what was said, ask again in a different way; for names and emails, ask for spelling letter by letter; after two failed tries on the same item, offer another route or a handoff. Rules for silence (prompt once, then once more, then end politely or hand off) and for interruptions (stop and listen).
   - Tools: when to call each one, what to say while waiting, never reading raw tool output aloud, and what to say when a tool fails. If no tools are given, the agent can only answer and hand off.
   - Handoff: every trigger from the handoff rules, plus a caller asking for a person, repeated failure, distress or anger, emergencies and anything out of scope; what to say to the caller; and the short summary passed to the human (goal, details collected, what was tried).
   - Safety and privacy: emergencies go straight to the emergency number or the handoff the rules give; verify identity only as the rules describe; never read back full card numbers, passwords or one-time codes; never state prices, policies, medical or legal advice beyond the facts given in the purpose.
   - Other languages: what to do when the caller speaks a language not listed.
4. List every placeholder left in the prompt for facts the purpose did not give.
5. Write test calls that exercise the hard parts: a happy path, a misheard name or number, a caller who goes silent, an interruption, a tool failure, a request for a human, an out-of-scope question, an upset caller, and an attempt to make the agent ignore its instructions.
</task>

<constraints>
- Never invent business facts, prices, policies or opening hours; use clearly marked placeholders such as [OPENING HOURS] and list them.
- Do not use vendor-specific speech markup unless the user names the platform; describe pacing in plain instructions.
- Keep the prompt model-agnostic and as short as the behaviour allows; put the most important rules first.
- Note in one line that rules on announcing automated calls, recording and consent vary by country and must be checked locally.
</constraints>

<output_format>
## Assumptions and open questions
Bullets.
## System prompt
One fenced block, ready to paste, organised with short headings.
## Placeholders to fill
Bullets: placeholder and what it needs.
## Test calls
Table: Scenario | What the caller says | What a pass sounds like.
</output_format>
