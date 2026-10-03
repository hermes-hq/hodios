---
schema: 1
id: end-relationship-kindly
kind: prompt
title: End a relationship kindly
description: Helps someone say clearly and kindly that a dating relationship, friendship or business partnership is ending, with what to say, what not to say and how to handle the reaction.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [breakups, ending-friendships, business-partnerships, kind-honesty, closure]
pairs_with:
  prompts: [prepare-difficult-conversation, set-boundary, rehearse-difficult-conversation]
  personas: [communication-coach]
args:
  - name: relationship_type
    description: The kind of relationship that is ending.
    type: enum
    enum: [dating, friendship, business, other]
    required: true
  - name: situation
    description: How long it has lasted, why you are ending it, whether you have decided for sure, what you share (home, friends, clients, money), and how you expect them to react.
    type: text
    required: true
  - name: channel
    description: How you plan to tell them.
    type: enum
    enum: [in-person, call, message]
    default: in-person
output_contract:
  format: markdown
  sections: [Before you talk, What to say, What not to say, If they react, Loose ends, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ending a relationship kindly means being clear. The cruel endings are often the "nice" ones: vague hints, slow fading, a reason that invites a counter-argument, or "maybe someday" said to soften the blow, which keeps the other person hoping. A kind ending says early and plainly that it is over, gives a short, honest reason that is about the speaker's decision rather than a list of the other person's faults, acknowledges what was good, does not reopen negotiation, and leaves both people with dignity. The right channel depends on the depth and safety of the relationship: after a few dates a message is normal; after a long relationship, in person is usually kinder, unless meeting would be unsafe.
</context>

<task>
Help me end this {{relationship_type}} relationship kindly, by {{channel}}.

<situation>
{{situation}}
</situation>

1. If anything suggests the other person has been controlling, threatening, violent, or might harm me or themselves when told, put safety first: do not recommend a private in-person conversation; suggest a public place, a call or a message, telling someone I trust beforehand, and specialist support, and follow the safety guidance below. Then continue with the plan adapted to that.
2. If I sound undecided, say so in one line and suggest what to clarify first, because a hesitant ending invites bargaining. Then continue, since I may be decided and just anxious.
3. Check the channel against the relationship. If it is likely to feel wrong to them (for example a text after two years together), say why and offer the alternative, but write for the channel I chose.
4. Before you talk: timing and place (not before their big event, not in public where they cannot react, not when either of us has been drinking), and what to decide in advance (what I will say about the reason, logistics, contact afterwards).
5. What to say, as a short script in my voice:
   - an opening that signals a serious conversation without a long run-up;
   - the decision, stated clearly in the first minute ("I've decided to end our relationship");
   - one honest reason in "I" terms, without a list of their faults;
   - acknowledgement of what was good, only if true;
   - what happens next (contact, practical matters), stated not negotiated.
6. What not to say: phrases that cause false hope, blame, or debate, each with a better alternative.
7. If they react: lines for tears, anger, bargaining ("we can fix it"), asking "why" repeatedly, silence, and asking to stay friends. Keep the decision firm and stay kind; it is fine to end the conversation if it turns abusive.
8. Loose ends for this relationship type: belongings, shared home or bills, shared friends, social media; for business, the agreement, clients, staff, money and who announces what.
9. Afterwards: contact rules, what to tell mutual friends, and looking after myself.
</task>

<constraints>
- Clear beats soft. Do not write lines that leave the door open unless I said I want that.
- No lies, invented reasons, or ghosting advice for a relationship of any depth.
- For business partnerships, do not advise on legal or financial terms; say to review the partnership or shareholder agreement with a lawyer before the conversation, and keep the script free of commitments about money or ownership.
- Write in the way I write in the situation, and keep spoken lines short enough to say naturally.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Before you talk
Three to five bullets.
## What to say
The script, as short quoted lines in order, or the full message if the channel is a message.
## What not to say
A table: Avoid | Why | Say instead.
## If they react
Bold reaction label, then one or two lines to say, for each likely reaction.
## Loose ends
Bullets for this relationship type.
## Afterwards
Three to five bullets.
</output_format>
