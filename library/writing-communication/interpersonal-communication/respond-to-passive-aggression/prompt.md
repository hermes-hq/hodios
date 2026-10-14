---
schema: 1
id: respond-to-passive-aggression
kind: prompt
title: Respond to passive aggression
description: Gives calm responses to passive-aggressive comments, notes or messages from a colleague, relative or housemate that name the issue without drama and invite the person to say it directly.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, parent]
requires: [none]
inputs: [text, message]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [passive-aggression, indirect-conflict, directness, awkward-situations, workplace]
pairs_with:
  prompts: [decode-message-tone, reply-to-tricky-message, clear-up-misunderstanding]
  personas: [communication-coach]
args:
  - name: comment
    description: The comment, note or message, word for word if possible, plus the situation around it.
    type: text
    required: true
  - name: relationship
    description: "Who said it, for example \"a colleague\", \"my mother-in-law\", \"a housemate\", \"my manager\"."
    type: string
    required: true
  - name: history
    description: Whether this is a one-off or a pattern, and what you think might be behind it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What may be going on, Options, What to say, If they deny it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Passive aggression is hostility expressed indirectly: "per my last email", "must be nice to leave at five", a note on the fridge, sighing, "fine", sarcastic praise, deliberate lateness, or "I'm just joking". It usually signals a real grievance the person does not feel able to raise openly. Responding in kind feeds it; ignoring a pattern lets it grow. The effective middle path is to take the comment at face value or name it lightly and calmly, then invite the direct version ("It sounds like the deadline is bothering you. Do you want to talk about it?"). That makes the indirect route unrewarding without attacking. Context matters: a one-off from a stressed colleague may be best let go, while a recurring pattern deserves a private, direct conversation. Some comments that feel passive-aggressive are not; workplace phrases and cultural styles vary.
</context>

<task>
Help me respond to this from {{relationship}}.

<comment>
{{comment}}
</comment>
{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. Say what may be going on: the plausible grievance underneath, and whether the comment may be less hostile than it felt. Be honest if it reads as fairly neutral.
2. Give three options, with when each fits: let it go, a light in-the-moment reply, or a private direct conversation. Recommend one for this case.
3. Write the in-the-moment reply (one sentence, calm, no sarcasm) and, if a pattern, the opener for the private conversation that names the behaviour with an example and asks what is going on.
4. For a written comment (note, email, chat), write a reply in the same channel that answers the surface point and, if useful, offers to talk.
5. Write replies for when they deny it ("I was only joking", "you're too sensitive"), staying calm and not arguing about intent.
</task>

<constraints>
- No sarcasm, mirroring their tone, or labelling them ("you're being passive-aggressive").
- Keep every line short and natural.
- With a manager or someone with power over me, keep it about the work and suggest a calm one-to-one; with family, account for the longer relationship.
- If I may have caused the grievance, say so and include acknowledging it.
</constraints>

<output_format>
## What may be going on
Two or three sentences.
## Options
Let it go / light reply / direct talk, and which I recommend.
## What to say
The reply, and the private-conversation opener if needed.
## If they deny it
Table: If they say… | You can say…
</output_format>
