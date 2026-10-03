---
schema: 1
id: decode-message-tone
kind: prompt
title: Decode the tone of a message
description: Reads a message someone received and lays out the plausible readings of its tone and intent, separates what is said from what is inferred, and shows how to check before reacting.
category: interpersonal-communication
version: 1.0.1
status: incubating
stage: [discover]
role: [individual, manager, parent]
requires: [none]
inputs: [message, text]
output: [explanation, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [reading-tone, overthinking, texting, workplace-messaging, anxiety-check]
pairs_with:
  prompts: [reply-to-tricky-message, check-tone-before-sending, clear-up-misunderstanding]
  personas: [communication-coach]
args:
  - name: message
    description: The message you received, pasted exactly, with the one or two messages before it if they matter.
    type: text
    required: true
  - name: relationship_context
    description: Optional, who sent it, how they usually write to you, and anything recent between you that might matter.
    type: text
  - name: your_reading
    description: "Optional, how you are reading it right now, for example \"I think she's angry with me\"."
    type: text
output_contract:
  format: markdown
  sections: [What it actually says, Plausible readings, About your reading, How to check, Not yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Says what the answer looks like when the message is a threat, so it never fills in charitable readings."}
---
<context>
Text strips out tone, so readers fill it in, and anxious or tired readers fill it in negatively. Short replies, a full stop at the end, no emoji, "Can we talk?", "Fine.", "Per my last email" or a slow reply are weak signals: they mean different things from different people, generations, cultures and moods. The most reliable evidence is the difference from how this person usually writes, plus what the message literally asks or states. A good read separates what is said from what is inferred, lists the plausible readings with the cues for and against each, and ends with a cheap way to check before reacting, rather than a verdict on someone else's feelings.
</context>

<task>
Help me read this message before I react.

<message>
{{message}}
</message>
{{#relationship_context}}
<relationship_context>
{{relationship_context}}
</relationship_context>
{{/relationship_context}}
{{#your_reading}}
<your_reading>
{{your_reading}}
</your_reading>
{{/your_reading}}

1. If the message is empty, ask for it and stop.
2. If the message is plainly hostile, threatening, abusive or harassing, say so directly; do not offer charitable readings of a threat. Give practical next steps (do not engage in kind, keep a record, tell someone, report or block, and contact emergency services if I feel in danger) and stop there.
3. State what the message literally says or asks, with no interpretation.
4. List what I might be inferring that the words do not say.
5. Give two to four plausible readings of the tone and intent, from most to least likely given the context. For each: the cues that support it, the cues against it, and a rough likelihood (likely, possible, unlikely). Base likelihood on how this person usually writes if I told you; otherwise say that you lack a baseline.
6. If I gave my reading, say honestly whether the evidence supports it, partly supports it or does not. Do not simply reassure me, and do not confirm a fear that the words do not support.
7. Suggest how to check: a neutral reply or question that works under every plausible reading, or waiting for a conversation that is already planned. Draft one or two such replies in my voice.
8. Name what not to do yet (reply defensively, ask a third person to interpret it in a group chat, over-apologise for something not yet raised).
</task>

<constraints>
- Do not claim to know what the sender feels or intends. Use "may", "could", "one reading is".
- Keep it proportionate; a two-word message does not need an essay.
- Do not invent context about the sender. Generalisations about texting styles must be framed as general tendencies, not facts about this person.
</constraints>

<output_format>
If step 2 applies, give only `## This is a threat` (one or two lines saying so plainly, and why it is not ambiguous) and `## What to do now` (the next steps as bullets), and nothing else.

Otherwise:
## What it actually says
One or two lines.
## Plausible readings
A table: Reading | Cues for | Cues against | Likelihood.
## About your reading
One to three lines, or "You didn't share one."
## How to check
One or two neutral replies in quote blocks, or advice to wait, with why.
## Not yet
One to three bullets.
</output_format>
