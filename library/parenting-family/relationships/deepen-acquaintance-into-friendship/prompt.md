---
schema: 1
id: deepen-acquaintance-into-friendship
kind: prompt
title: Turn an acquaintance into a friend
description: Helps an adult turn an acquaintance into a friend with natural invitations, follow-ups, shared activities and how often to reach out without seeming too keen.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, message, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [adult-friendship, making-friends, invitations, social-confidence, reciprocity, new-city]
pairs_with:
  prompts: [build-connection-plan, plan-long-distance-connection]
args:
  - name: person_context
    description: How you know them and what has happened so far, for example "parent from my son's class, we chat at pickup most days and once had coffee; she's new to the area", "colleague in another team, we joke in meetings".
    type: text
    required: true
  - name: shared_interests
    description: What you have in common or might enjoy together, for example "both run, both into board games, both have toddlers". Optional.
    type: text
  - name: comfort
    description: How comfortable you are reaching out, so suggestions match your style.
    type: enum
    enum: [shy, moderate, outgoing]
    default: moderate
output_contract:
  format: markdown
  sections: [Where things stand, Next invitation, After you meet, How often to reach out, Things to do again and again, Going a bit deeper, If it does not take]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help adults make friends, drawing on research on how friendships form. Adult friendships grow from repeated contact, shared activities and gradual openness, and need more deliberate effort than school friendships did. Most people underestimate how much others like them after a conversation and how welcome an invitation is. The main risks are waiting for the other person to make every move, or one big ask that feels like pressure; the remedy is small, specific, easy-to-accept invitations, repeated.

<person>
{{person_context}}
</person>
{{#shared_interests}}Shared interests: {{shared_interests}}{{/shared_interests}}
Comfort with reaching out: {{comfort}}
</context>

<task>
1. Where things stand: a one-paragraph read of the connection (how often you meet, how warm it is, who has initiated) and the realistic next step.
2. Next invitation: three options from low to higher commitment (for example a walk after drop-off, a coffee, an activity based on a shared interest, joining a group outing), each with a ready-to-send message written for a {{comfort}} person: specific day or activity, easy to say no to, with an alternative offered.
3. After you meet: a short follow-up message (a callback to something they said, a link or photo, a light suggestion for next time) and when to send it.
4. How often to reach out: a rhythm suited to the connection, and a reciprocity rule, for example "if two invitations in a row get no counter-offer, give it a few weeks and let them reach out".
5. Things to do again and again: two or three repeatable shared activities (a weekly class, a running route, a monthly game night) because repetition builds friendship faster than one-off outings.
6. Going a bit deeper: how to move from small talk to real conversation gradually, sharing something a little personal and asking good questions, and noticing whether they reciprocate.
7. If it does not take: how to read a lukewarm response without taking it personally, staying friendly, and where else to meet people with similar interests.
</task>

<constraints>
- Write messages in a natural, casual voice matching the comfort level; no pick-up lines or scripted charm.
- Keep it platonic and respectful of boundaries; if the context is romantic interest, say this prompt is for friendship and keep advice within that.
- If the person mentions persistent loneliness or low mood, acknowledge it and point to build-connection-plan and, if it feels heavy, to talking to a doctor or someone they trust.
- Before answering, check every message is specific, short and easy to decline.
</constraints>

<output_format>
## Where things stand
## Next invitation
Three options, each with a message in quotes.
## After you meet
## How often to reach out
## Things to do again and again
## Going a bit deeper
## If it does not take
</output_format>
