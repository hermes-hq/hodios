---
schema: 1
id: announce-unpopular-decision-to-family
kind: prompt
title: Announce an unpopular decision to family
description: Plans how to tell family about a decision they may oppose, such as moving abroad, changing careers or leaving a religion, and how to handle their reactions.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [life-decisions, family-reactions, announcements, independence, extended-family]
pairs_with:
  prompts: [prepare-difficult-conversation, set-boundary, navigate-family-gathering-tension]
  personas: [communication-coach]
args:
  - name: decision
    description: What you have decided, how settled it is, when it happens, and the main reasons.
    type: text
    required: true
  - name: family
    description: Who needs to know, how each is likely to react and why, and anything about your family's culture or expectations that matters.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to tell and in what order, Opening, The announcement, Open and not open for discussion, Likely reactions, After the conversation, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Announcing a decision is a different conversation from asking for advice, and confusion between the two causes most of the trouble. If the decision is made, presenting it as a discussion invites people to argue you out of it and then feel misled; if it is still open, presenting it as final shuts out people who may have useful views. Families often react to what the decision means for them (losing closeness, worry, a sense of rejection of their values) rather than to the decision itself, so naming that loss directly lowers the temperature. People closest to the decision should hear it first and in person, before they hear from others or online. Reactions often come in waves: shock, objections, then a slower adjustment over weeks, so the first conversation is rarely the last. Holding steady means listening to feelings without reopening the decision each time, while staying open on genuinely open things such as timing, visits or how to stay in touch.
</context>

<task>
Help me tell my family about this decision.

<decision>
{{decision}}
</decision>

<family>
{{family}}
</family>

1. If it is unclear whether the decision is final or who needs to know, ask up to two short questions and stop. If the input suggests I am still deciding, say so and suggest asking for views first rather than announcing.
2. Recommend who to tell, in what order, and how (in person, call, together or separately), with reasons, so nobody important hears it second-hand.
3. Write an opening that signals I am sharing news, not asking permission, and that I care about their reaction.
4. Write the announcement: the decision in one or two sentences, a short reason that does not over-justify, an acknowledgement of what it may mean for them, and what will stay the same.
5. List what is not open for discussion (the decision) and what is (timing, practical details, how we stay close), with a line to say for each.
6. Write calm responses to their likely reactions (worry, anger, guilt, "after everything we did for you", religious or cultural objections, the silent treatment), restating the decision without arguing the case again.
7. Plan the following weeks: when to check in, how to handle a second round of objections, and what to do if someone refuses to accept it.
</task>

<constraints>
- Respect the family's culture and values in the wording, even where my decision goes against them. Do not mock or lecture them.
- Do not make my decision sound more or less certain than I said it is.
- Keep spoken lines short and natural.
- If telling them could put me at risk (threats, being cut off from money or housing I depend on, being forced to stay, violence, so-called honour-based abuse), prioritise my safety, say so plainly and follow the safety guidance below.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Who to tell and in what order
Order, channel and reasons.
## Opening
The first words.
## The announcement
The words.
## Open and not open for discussion
Two short lists with a line to say for each.
## Likely reactions
Table: If they say… | You can say…
## After the conversation
The next weeks.
## Notes
Anything else.
</output_format>
