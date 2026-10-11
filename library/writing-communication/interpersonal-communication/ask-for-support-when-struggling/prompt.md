---
schema: 1
id: ask-for-support-when-struggling
kind: prompt
title: Ask for support when you are struggling
description: Writes a message telling a friend, partner or relative that you are not okay, with how much to share, one specific doable ask, and a low-pressure way for them to reply.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, parent]
advice_risk: [mental-health]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [asking-for-help, emotional-support, reaching-out, not-okay, vulnerability, support-network]
pairs_with:
  prompts: [support-struggling-friend, talk-to-doctor-about-mental-health, talk-through-a-bad-day, explain-reduced-availability-to-friends]
  personas: [supportive-listener]
args:
  - name: situation
    description: What you are going through, in as much or as little detail as you like, and how long it has been going on.
    type: text
    required: true
  - name: person
    description: Who you want to tell and what they are like, for example "my sister, practical, lives an hour away" or "my best friend from uni, we text most days".
    type: string
    required: true
  - name: details
    description: Optional - what kind of help would actually help (company, a call, practical help with meals or childcare, someone to come to an appointment, just knowing they know), how much you want to share, and how you would prefer to tell them (text, call, in person).
    type: text
output_contract:
  format: markdown
  sections: [First, Message, If you would rather say it, If they respond badly or not at all, Other support, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who are struggling often wait until things are very bad before telling anyone, because they fear being a burden, do not know what to ask for, or worry about the reaction. Messages that get good support are short and honest, say plainly "I'm not doing well" rather than hinting, share only as much as feels right, and include one concrete ask the other person can say yes to ("could you call me tonight?", "can you come with me to the GP on Thursday?", "can we go for a walk this weekend?"). People often do not know how to respond to a vague "I'm struggling" and either panic or reply with advice; a specific ask gives them a way to help. It also helps to tell them what you do not need ("you don't have to fix it"). Spreading asks across a few people protects both the person and their supporters. A friend or relative is support, not a substitute for professional help when distress is lasting or severe.

Situation: {{situation}}
Person: {{person}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. First, check for risk. If the situation mentions thoughts of suicide or self-harm, being unsafe, or not being able to keep going, follow the crisis guidance below before anything else, and make the message to this person an urgent one asking them to be with the user or call now.
2. Write the message in the user's voice, matched to the person and the channel: an honest opening that says they are not okay, as much context as the user wants to share (offer a lighter and a fuller version if unsure), one specific ask with a time, a line about what they do not need to do, and an easy way to reply. Keep it under about 100 words.
3. If the user would rather say it in a call or in person, write three or four opening sentences to say, and a line to use if they freeze.
4. Plan for a disappointing response: what to do if they reply with advice, minimise it, or do not reply within a day, including a gentle follow-up line and a reminder that one person's reaction does not decide whether the user deserves support.
5. Other support: suggest one or two other people or kinds of support the user could add, and when to talk to a doctor or a mental-health professional, described in general terms.
6. Notes: anything to protect the user's privacy (what not to put in writing if they are worried about who sees it).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose the user or label what they are going through.
- Do not invent helpline names or numbers; describe the kind of service and how to find the local one, or ask their country.
- Keep the message honest and in the user's voice. No dramatic phrasing they did not use, and no minimising either.
- Do not pressure the user to share more than they want with this person.
</constraints>

<output_format>
## First
Any urgent step, or "No urgent step needed from what you shared".
## Message
## If you would rather say it
## If they respond badly or not at all
## Other support
## Notes
</output_format>
