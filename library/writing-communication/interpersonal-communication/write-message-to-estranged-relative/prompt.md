---
schema: 1
id: write-message-to-estranged-relative
kind: prompt
title: Write to an estranged relative or friend
description: Helps draft a first message to an estranged relative or friend with realistic hopes, no blame, an honest acknowledgement and a low-pressure opening they can answer or ignore.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [message, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [estrangement, reconciliation, family-dynamics, reaching-out]
pairs_with:
  prompts: [apologize-effectively, reconnect-with-old-contact, write-personal-letter]
  personas: [communication-coach]
args:
  - name: relationship
    description: "Who they are to you, for example \"my older brother\", \"my daughter, now 28\", \"my best friend from university\"."
    type: string
    required: true
  - name: what_happened
    description: Optional, what led to the estrangement as you understand it, including your part in it if you see one, and whether either of you asked for no contact.
    type: text
  - name: hopes
    description: "What you hope for, honestly, for example \"just to know she's okay\", \"to meet for a coffee\", \"to apologise whether or not he replies\"."
    type: text
    required: true
  - name: time_apart
    description: "Optional, how long it has been, for example \"six years\"."
    type: string
output_contract:
  format: markdown
  sections: [Before you send, Draft message, Another version, Why it is written this way, If they reply or do not]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A first message after estrangement has one job: to open a door without pushing anyone through it. The messages that close doors are long, relitigate the past, explain at length why the sender was right, apologise conditionally ("if you were hurt"), ask for something big (forgiveness, a meeting, a reply), or arrive with guilt ("Mum isn't getting any younger"). The ones that work are short, honest about the sender's own part without demanding the same in return, say why they are writing now, and make it easy to reply or not reply. Estrangement often has serious causes, so the sender's hopes need to fit what the other person can give, and some people have asked not to be contacted, which must be respected.
</context>

<task>
Help me write a first message to {{relationship}}{{#time_apart}}, after {{time_apart}} apart{{/time_apart}}.

<hopes>
{{hopes}}
</hopes>
{{#what_happened}}
<what_happened>
{{what_happened}}
</what_happened>
{{/what_happened}}

1. If they have clearly asked me not to contact them, or there was a court order or abuse on my part, do not draft a message that seeks contact. Say kindly that respecting their request is the way to show change, and suggest alternatives: an unsent letter to process my feelings, talking with a therapist or family mediator, or, where appropriate, letting a trusted intermediary know I am open to contact if they ever want it. Stop there.
2. If what happened suggests they harmed me, gently check that reaching out is safe and that it is what I want, then continue if it is.
3. Expectation check: compare my hopes with what one message can achieve. If my hopes depend on their response (an apology, things going back to how they were), reframe them into something within my control, such as saying what I want to say and leaving the door open, and say why.
4. Draft the message, about 80 to 180 words:
   - a simple greeting by name;
   - why I am writing now, in one sentence, without guilt or pressure;
   - an honest acknowledgement: my specific part if I see one, owned without "but" or "if", or a recognition that things have been hard between us if I do not; no blame and no account of their faults;
   - what I would welcome, kept small (a reply, news, a coffee one day);
   - an explicit low-pressure close: they can answer whenever they want, or not at all, and I will respect that.
5. Write another version with a different opening or level of warmth, so I can choose what sounds like me.
6. Explain the main choices briefly so I can adjust them without breaking what works.
7. Prepare me for the responses: no reply (how long to wait, whether to send one more message, and when to stop), an angry reply (do not defend; acknowledge and keep the door open), and a warm reply (go slowly; suggest a small next step).
</task>

<constraints>
- No blame, no relitigating, no justifying, no guilt or deadlines ("before it's too late").
- Do not invent memories, events or feelings. Use `[a memory you share]` placeholders if a detail would help.
- Keep my voice; avoid therapy-speak unless I write that way.
- Suggest a channel that fits (letter, email, text) and mention that a letter gives them time and space.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Before you send
The expectation check in two to four bullets, and the suggested channel.
## Draft message
In a quote block.
## Another version
In a quote block.
## Why it is written this way
Three to five bullets.
## If they reply or do not
Bold labels for no reply, angry reply and warm reply, with what to do for each.
</output_format>
