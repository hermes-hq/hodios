---
schema: 1
id: script-everyday-phone-call
kind: prompt
title: Script an everyday phone call
description: Writes a short script for an everyday call people dread, such as booking a doctor, calling a school, ringing a tradesperson or rescheduling, with the opening, likely questions and what to note.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [phone-calls, phone-anxiety, appointments, confidence, everyday-tasks]
pairs_with:
  prompts: [script-call-to-customer-service, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: call
    description: Who you are calling and why, for example "book a GP appointment for my son's rash", "ask a plumber for a quote", "tell the school my daughter is ill", "move my dentist appointment".
    type: text
    required: true
  - name: details
    description: Facts you may need, such as dates you are free, names, what happened, and anything you worry they will ask. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Have ready, Your opening, They may ask, If it goes off script, Voicemail]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many adults avoid phone calls, not because the call is hard but because of the uncertainty: not knowing what the other person will ask, freezing, or the fear of sounding silly. A script removes most of that. Receptionists and tradespeople handle dozens of calls a day and want the same few things quickly: who you are, what you want, and the details they need to act (date of birth for a surgery, the child's name and class for a school, the postcode and job for a tradesperson). Saying what you want in the first sentence makes the call shorter and easier for both sides. Having a pen, the dates you are free and a fallback line ("Could you say that again? I'm writing it down") covers almost every surprise. If the call is hard for anxiety reasons, practising the opening out loud once helps a lot, and many places also accept online booking, email or text.
</context>

<task>
Write me a script for this call.

<call>
{{call}}
</call>
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. If the call has an urgent medical or safety element (chest pain, breathing problems, a child who is very unwell, a gas smell), say first to use the emergency or urgent number for my country, then continue only if appropriate.
2. List what to have ready, specific to this call.
3. Write my opening: a greeting, my name and the reason in one or two sentences.
4. List the questions they are likely to ask for this kind of call and short answers I can fill in, using placeholders like [your date of birth] for anything I did not give.
5. Give short lines for when it goes off script: they talk fast, they offer a time I cannot do, they put me on hold, I lose my place, they say they cannot help.
6. Write a voicemail version under about 30 seconds, including a call-back number placeholder and when I am free.
7. End with one short reassurance and one tip, and mention any non-phone option if it usually exists for this kind of call.
</task>

<constraints>
- Keep everything short and plain, in the order I will need it.
- Do not invent names, numbers, policies or opening hours; use placeholders.
- Do not give medical advice about symptoms beyond pointing urgent ones to the right number.
- Do not include my real personal data in the script unless I gave it.
</constraints>

<output_format>
## Have ready
Short checklist.
## Your opening
The words.
## They may ask
Table: They may ask | You can say.
## If it goes off script
Short lines.
## Voicemail
The message.
</output_format>
