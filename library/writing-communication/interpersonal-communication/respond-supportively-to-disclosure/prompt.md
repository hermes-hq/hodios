---
schema: 1
id: respond-supportively-to-disclosure
kind: prompt
title: Respond supportively to a disclosure
description: Gives words for when someone tells you something big, such as coming out, an illness, pregnancy loss or abuse, with what to say first, what to avoid and what may help next.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, manager, teacher]
advice_risk: [mental-health]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [disclosure, emotional-support, listening, what-to-say, compassion]
pairs_with:
  prompts: [support-struggling-friend, practice-active-listening, write-condolence-message]
  personas: [communication-coach]
args:
  - name: disclosure
    description: What the person told you, roughly how they said it, and how you responded so far if you already have.
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"my best friend\", \"my 14-year-old\", \"someone on my team\"."
    type: string
    required: true
  - name: channel
    description: Whether you are responding in person or to a message.
    type: enum
    enum: [in-person, message]
    default: in-person
output_contract:
  format: markdown
  sections: [Say first, Then, Avoid saying, If you already said the wrong thing, What they may need next, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
How someone reacts in the first minute after a disclosure shapes whether the person tells anyone else and whether they seek help. The response that helps across almost every kind of disclosure is short: thank them for telling you, show you believe and are with them, and ask what they need rather than assuming. The common harmful reactions are well-meant: making it about yourself ("I always knew", "this is so hard for me"), silver linings ("at least it was early", "everything happens for a reason"), immediate fixing or advice, questions that imply blame ("why didn't you leave?", "were you drinking?"), and promising to keep a secret you may not be able to keep. Some disclosures carry duties: a child or young person disclosing abuse, and anyone at risk of harm, mean the listener should not promise confidentiality and should know where to take it, and anyone working with children, or a manager, should follow their organisation's safeguarding or reporting procedure.
</context>

<task>
Help me respond to {{relationship}}, who just told me something. I am responding {{channel}}.

<disclosure>
{{disclosure}}
</disclosure>

1. Check for risk first. If they mentioned suicidal thoughts, self-harm, current abuse or danger, or a child is being harmed, lead with what to do now and follow the safety guidance below, then give the rest briefly.
2. Write what to say first: two or three short sentences that fit this disclosure and relationship, in the right form for the channel.
3. Write what to do and say next: questions that let them lead ("Do you want to talk about it, or would you rather I just know?"), how to listen, and one or two practical offers that fit.
4. List phrases to avoid for this specific kind of disclosure, with a short reason each.
5. If I have already responded badly according to my input, write a short repair line to say or send.
6. Say what they may need over the coming days and weeks, and how to check in without pressure.
7. If I have a duty because of my role (parent of a minor, teacher, manager, anyone told about a child at risk), say plainly what that means: do not promise secrecy, explain gently who I may need to tell, and follow the relevant procedure or contact the relevant authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the person who disclosed as well as to me.
- Do not tell me how they "really" feel or what they should do. Keep their choices theirs.
- Do not push them to report abuse or seek treatment; offer, and give them information.
- Keep lines short enough to say naturally and warm without being dramatic.
- Do not invent helpline names or numbers; describe the kind of service and how to find one locally.
</constraints>

<output_format>
## Say first
Two or three sentences.
## Then
Questions, listening tips and practical offers.
## Avoid saying
Table: Avoid | Why
## If you already said the wrong thing
A repair line, or "Not needed".
## What they may need next
The coming days and weeks.
## Notes
Duties, support for them and for me.
</output_format>
