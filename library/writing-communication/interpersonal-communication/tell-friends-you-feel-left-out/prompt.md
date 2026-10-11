---
schema: 1
id: tell-friends-you-feel-left-out
kind: prompt
title: Tell friends you feel left out
description: Helps tell a friend or friend group you feel left out of plans or a group chat, without accusing them, with what to ask for and how to take the answer.
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
tags: [friend-groups, exclusion, feelings, belonging, requests]
pairs_with:
  prompts: [clear-up-misunderstanding, decode-message-tone, assess-draining-friendship]
  personas: [communication-coach]
args:
  - name: situation
    description: What has happened (plans you heard about afterwards, a new group chat, being invited less), for how long, and how close you are to these friends.
    type: text
    required: true
  - name: channel
    description: How you would rather raise it.
    type: enum
    enum: [in-person, message, either]
    default: either
output_contract:
  format: markdown
  sections: [Check first, Who to talk to, What to say, Message version, If the answer stings, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Being left out hurts more than most people admit, and the urge is either to say nothing and withdraw or to confront the whole group at once. Exclusion is often not deliberate: plans get made in a sub-group because of where people live or work, people assume you are busy after you declined a few times, a new partner or job changes who sees whom, or someone simply forgot to add you to a chat. Raising it works best one to one, with the friend you are closest to or who usually organises, not in the group chat where people feel publicly accused. A good message names the specific thing ("I saw the photos from Saturday"), says how it felt in one line ("I felt a bit left out"), avoids mind-reading ("you obviously don't want me there"), and asks for something concrete ("I'd love to be included next time" or "Can you add me to the chat?"). It also helps to start plans yourself. Sometimes the honest answer is that a friendship has changed, which is painful but useful to know.
</context>

<task>
Help me tell my friends I feel left out. Channel: {{channel}}.

<situation>
{{situation}}
</situation>

1. Check first: list possible innocent explanations from my situation and anything I may have done that sends a "not interested" signal (declining often, not replying). Do not dismiss my feelings; this is about choosing the right approach.
2. Recommend who to talk to first and why (usually one person, privately).
3. Write what to say in person: one specific example, one line about how I felt, no accusation, and a clear ask.
4. Write a message version under about 70 words, casual enough for how we normally text.
5. Write short responses for likely answers: a genuine apology, "we didn't think you'd want to come", defensiveness, or a vague reply.
6. Say what to do if the answer stings or nothing changes: start plans myself, invest in the friends who respond, and when to accept that a friendship has shifted.
</task>

<constraints>
- No guilt-tripping, sarcasm, passive-aggressive hints or "everyone always" statements.
- Do not assume they excluded me on purpose, or that they did not.
- Keep the tone light enough for a friendship, not a formal complaint.
- If the situation sounds like bullying (being mocked, targeted, threatened, or online abuse), say so and suggest telling a trusted adult, school or other support rather than only a friendly message. If I mention loneliness that feels overwhelming or thoughts of self-harm, follow the safety guidance below.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Check first
Possible explanations and signals I may be sending.
## Who to talk to
Who and why.
## What to say
The spoken version.
## Message version
The message.
## If the answer stings
Table: If they say… | You can say…, then next steps.
## Notes
Anything else.
</output_format>
