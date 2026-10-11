---
schema: 1
id: plan-coming-out-conversation
kind: prompt
title: Plan a coming-out conversation
description: Helps plan coming out to family, friends or colleagues on your own terms, with a safety check, who to tell first, what to say, likely reactions and how to look after yourself.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [coming-out, lgbtq, identity, disclosure, family-reactions]
pairs_with:
  prompts: [announce-unpopular-decision-to-family, respond-supportively-to-disclosure, set-boundary]
  personas: [communication-coach]
args:
  - name: what_sharing
    description: What you want to share, in your own words, for example "I'm gay", "I'm bisexual", "I'm trans and starting to transition", "I'm non-binary".
    type: string
    required: true
  - name: who
    description: Who you are thinking of telling and how you expect each to react.
    type: text
    required: true
  - name: circumstances
    description: Optional. Your age, whether you live with or depend on them for money or housing, your country if you are willing to share it, and who already knows.
    type: text
output_contract:
  format: markdown
  sections: [Safety check, Who and when, What to say, Likely reactions, If it goes badly, Looking after yourself, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coming out is a series of decisions, not one event, and the person coming out decides who, when and how; nobody is owed it. The first question is safety: anyone who depends on others for housing, money or immigration status, is a minor, or lives in a country where same-sex relationships or gender transition are criminalised or heavily stigmatised should plan around what happens if a reaction is bad, and waiting is a legitimate choice. Starting with the person most likely to be supportive builds confidence and an ally. Words can be simple and direct; long justifications are not needed. First reactions are often not final ones: shock, worry, religious objections, "are you sure?" or "it's a phase" frequently soften over weeks or months, while some people react well at first and struggle later. Giving the other person time, telling them who else knows and whether they may tell others, and having a plan for afterwards all help.
</context>

<task>
Help me plan coming out. What I want to share: {{what_sharing}}.

<who>
{{who}}
</who>
{{#circumstances}}
<circumstances>
{{circumstances}}
</circumstances>
{{/circumstances}}

1. Safety check first. Look for dependence on the people I am telling (housing, money, being a minor, immigration), threats or violence in the past, religious or community pressure, and laws in my country if I gave it. If the risk looks high, say so kindly, explain that waiting or telling a safer person first is a valid choice, suggest a back-up plan (somewhere to stay, money, a trusted adult or friend), and point to LGBTQ+ support organisations in my country. If I have not given my circumstances and they matter, ask.
2. Suggest who to tell first and the order, and the setting and timing for each (in person, call, letter or message, and not during a holiday meal or a crisis).
3. Write simple, direct words for each person or group, in my voice, plus a version for a letter or message if that might be safer or easier. Include a line about who else knows and whether they may share it.
4. List likely reactions for these people, including hurtful ones, with short responses that hold my ground without a debate.
5. Plan for a bad reaction: how to end the conversation, where to go, who to call, and that their reaction is not my fault.
6. Suggest how I look after myself before and after, including peer support.
</task>

<constraints>
- Never pressure me to come out or to wait. Present the choice as mine.
- Do not assume my identity, the other people's beliefs or my country beyond what I said.
- Use the words I use for myself.
- When pointing to support services, describe the kind of organisation and say how to find one locally rather than inventing names or numbers.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Safety check
What I noticed and what it means for timing.
## Who and when
Order, setting and timing.
## What to say
Words for each person, and a message or letter version.
## Likely reactions
Table: If they say… | You can say…
## If it goes badly
The back-up plan.
## Looking after yourself
Before and after.
## Notes
Anything else.
</output_format>
