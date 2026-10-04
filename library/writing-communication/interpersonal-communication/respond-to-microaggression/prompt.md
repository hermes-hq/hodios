---
schema: 1
id: respond-to-microaggression
kind: prompt
title: Respond to a microaggression
description: Offers response options to a microaggression at work, school or in the family, from a quick in-the-moment reply to an educational answer or a later private conversation, with what to document.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [microaggressions, bias, workplace-inclusion, speaking-up, incident-notes]
pairs_with:
  prompts: [set-boundary, prepare-difficult-conversation, handle-workplace-bullying, practice-assertive-responses]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What was said or done, as close to the exact words as you remember, where and when, who else was there, and whether it has happened before.
    type: text
    required: true
  - name: relationship
    description: Who said it and how they relate to you, for example "my manager", "a classmate", "a client", "my mother-in-law", "a teacher".
    type: string
    required: true
  - name: goal
    description: What you want now. stop-it means make clear it should not happen again; educate means help them understand why it landed badly; move-on means let it go while looking after yourself; escalate means report it or put it on record.
    type: enum
    enum: [stop-it, educate, move-on, escalate]
    default: stop-it
output_contract:
  format: markdown
  sections: [Quick read, Your options, Recommended, If they push back, What to document, Look after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A microaggression is a comment or action, often casual and sometimes meant as a compliment, that signals a person is seen through a stereotype about their race, ethnicity, gender, sexuality, disability, age, religion, accent, body or class ("Where are you really from?", "You're so articulate", "You don't look disabled"). One instance can be shrugged off; the weight comes from repetition. People who are on the receiving end often freeze in the moment and replay it for days, and they also face a real cost in deciding whether to respond, because of power, relationships and the risk of being called oversensitive. There is no single right response; there is the response that fits this relationship, this setting and what the person wants.

<what_happened>
{{what_happened}}
</what_happened>
Relationship: {{relationship}}
Goal: {{goal}}
</context>

<task>
1. Quick read: in two or three sentences, name what likely made the comment land badly (the stereotype or assumption underneath), acknowledge that intent and impact can differ without excusing it, and note the power and setting (a manager in a meeting, a relative at dinner) because that shapes which options are safe.
2. Your options, each with exact words to say and when it works best or carries risk:
   - In the moment, light: a question that hands the comment back ("What do you mean by that?", "Why do you ask?") or a brief, calm correction.
   - In the moment, direct: name the impact in one sentence without attacking the person.
   - Educational: a short explanation of why the comment lands badly, for someone likely to listen.
   - Later, in private: an opening line, the specific comment, the impact, and the request, for a calmer conversation.
   - Let it go for now: how to do that without swallowing it, and what would change that decision.
3. Recommended: pick the option that best fits the goal "{{goal}}" and the relationship, and say why in two sentences.
4. If they push back: replies to "I was only joking", "You're being too sensitive", "I meant it as a compliment", "I didn't mean it like that", and silence or tears.
5. What to document: if this is at work or school, or the goal is escalate, or it has happened before, list what to note (date, exact words, setting, witnesses, any pattern, your response) and the internal routes (manager, HR, a diversity or student services office, union) and that a repeated pattern may amount to harassment covered by policy or law, which should be checked locally.
6. Look after yourself: one or two practical suggestions (talking it through with someone who gets it, an affinity or support group, not replaying it alone).
7. Before answering, check that no suggested line insults the person, assumes malice as fact, or minimises the user's experience.
</task>

<constraints>
- Do not tell the user they are overreacting, and do not ask them to prove the comment was offensive. Equally, do not label the other person a bigot; describe the comment and its impact.
- Keep every suggested line short enough to say aloud while calm. Offer variations in tone, from gentle to firm.
- Family and close relationships need different handling from work or school: consider the ongoing relationship, cultural context and who else is present.
- Do not script insults, public shaming or retaliation.
- If the situation includes threats, violence or targeted harassment, or the person feels unsafe, put safety first and point to the relevant authority, HR or support service. If they mention self-harm or not coping, respond with care and point to a crisis line or local emergency services.
- Do not state legal rights as fact; say where to check (HR policy, the official equality body, an advice service).
</constraints>

<output_format>
## Quick read
## Your options
Table: Option | What to say | Works when | Risk.
## Recommended
## If they push back
Table: They say | You say.
## What to document
Only if it applies; otherwise one line saying why it may still help to note it.
## Look after yourself
</output_format>
