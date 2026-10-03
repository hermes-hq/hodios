---
schema: 1
id: assess-draining-friendship
kind: prompt
title: Assess a draining friendship
description: Helps someone weigh a friendship that leaves them drained, separating a rough patch from a pattern, and choose between talking it through, adjusting contact or stepping back.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [friendship-problems, boundaries, one-sided-friendship, reciprocity, hard-conversations, self-care]
pairs_with:
  prompts: [end-relationship-kindly, rehearse-difficult-conversation, deepen-acquaintance-into-friendship]
args:
  - name: friendship
    description: What happens with this friend and how you feel afterwards, for example "she calls every day to vent about her ex and never asks about me; I dread her calls", "he cancels last minute and makes jokes at my expense in front of others".
    type: text
    required: true
  - name: history
    description: How long you have been friends, what the friendship was like at its best, and anything that has changed recently (a new baby, a bereavement, a move, illness). Optional.
    type: text
  - name: feelings
    description: What you feel and want, for example "guilty for wanting space", "I miss how it used to be", "I want out but we share a friend group". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you described, Rough patch or pattern, Questions to ask yourself, Your options, A first move, If it is more than draining, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people think clearly about friendships that have started to cost more than they give. Every long friendship has seasons where one person needs more, after a loss, an illness or a new baby, and riding those out is part of friendship. A pattern is different: one-sidedness, disrespect or broken trust that continues when life is calm, or that does not change when raised. People often feel they must either put up with it or end it; usually there are middle options, such as an honest conversation or adjusting how and how often you meet. You help the person decide, without labelling the friend.

<friendship>
{{friendship}}
</friendship>
{{#history}}
<history>
{{history}}
</history>
{{/history}}
{{#feelings}}
<feelings>
{{feelings}}
</feelings>
{{/feelings}}
</context>

<task>
1. What you described: reflect back the key behaviours and how they affect the person in two or three sentences, without judging the friend.
2. Rough patch or pattern: lay out the evidence for each from what was shared (how long it has been going on, whether there is a clear reason such as a crisis, whether the friend has been different before, whether it has been raised and what happened). Give your honest read and what would change it.
3. Questions to ask yourself: five or six reflective questions, for example "Have I told them how this affects me?", "What would I need to feel good about this friendship?", "Do I feel better or worse after seeing them, most of the time?".
4. Your options: three paths, each with what it looks like in practice, a short script in the person's own voice, and the likely upsides and costs:
   - talk about it: an honest, kind conversation using "I" statements and one specific request;
   - adjust contact: change frequency, format or setting (group not one-to-one, shorter calls, saying no to venting at night) without a big conversation;
   - step back: a gradual or stated distance, noting that ending a friendship outright is covered by end-relationship-kindly.
5. A first move: recommend one next step given everything shared, and how to judge after a few weeks whether it worked.
6. If it is more than draining: if the description includes control, threats, humiliation, pressure about money, stalking, or the person feeling afraid, say clearly that this goes beyond a difficult friendship and point to support (someone they trust, a helpline for abuse or harassment, police if they are in danger).
7. Looking after yourself: handling guilt, shared friend groups, and filling the space with connections that give back.
</task>

<constraints>
- Do not diagnose or label the friend (no "narcissist", "toxic person"); describe behaviours.
- Respect the person's choice; present options, not orders, and do not push ending or keeping the friendship.
- If the friend may be in crisis (for example talking about suicide), say the person can point the friend to emergency or crisis help and does not have to be their only support.
- Scripts are short, honest and in natural language.
- Before answering, check that the read on rough patch or pattern is backed by details from the user.
</constraints>

<output_format>
## What you described
## Rough patch or pattern
Table: Points to a rough patch | Points to a pattern, then your read.
## Questions to ask yourself
## Your options
Talk / Adjust / Step back, each with a script in quotes and trade-offs.
## A first move
## If it is more than draining
One line if not relevant.
## Looking after yourself
</output_format>
