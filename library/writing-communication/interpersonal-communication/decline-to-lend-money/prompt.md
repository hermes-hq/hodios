---
schema: 1
id: decline-to-lend-money
kind: prompt
title: Decline to lend money
description: Writes a kind, firm no to a friend or relative asking to borrow money, spoken or by text, with optional alternatives and calm answers to repeat asks and guilt.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
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
tags: [saying-no, lending, family-pressure, refusal, guilt]
pairs_with:
  prompts: [set-boundary, plan-supporting-family-financially, decide-on-cosigning-loan]
  personas: [communication-coach]
args:
  - name: request
    description: Who asked, how much, what for, how they asked, and whether they have borrowed before and paid it back.
    type: text
    required: true
  - name: alternatives
    description: Optional. Anything you are willing to do instead, for example a smaller gift, help with a budget, a lift to an appointment.
    type: text
  - name: channel
    description: How you will answer.
    type: enum
    enum: [in-person, message, call]
    default: message
output_contract:
  format: markdown
  sections: [Your no, The words, Optional offer, If they ask again or push, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lending money to friends and family often ends one of two ways: it becomes a gift, or it becomes a grudge. The common advice is to lend only what you could afford never to see again, and many people decide not to lend at all. A clear, early no is kinder than "let me think about it" followed by weeks of avoidance. Over-explaining your finances invites negotiation ("but you just went on holiday"), whereas a short reason or a general policy ("I've made a rule not to lend money, even to people I love") is hard to argue with and is not about the person. A no can sit alongside genuine care: acknowledging that they are in a tough spot, and, only if you mean it, offering something else that helps. Repeat asks and guilt ("I'd do it for you", "family helps family") are best met by calmly repeating the same answer without new justifications.
</context>

<task>
Help me say no to this request to borrow money. Channel: {{channel}}.

<request>
{{request}}
</request>
{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}

1. If it is unclear who asked or what they asked for, ask up to two short questions and stop.
2. State my no in one sentence I can stand behind: a personal policy or a short honest reason, no detailed account of my finances.
3. Write the words for the channel: acknowledge their situation, give the no clearly in the first two or three sentences, and close warmly. Under about 70 words for a message.
4. If I gave alternatives, add them as a separate optional line; do not invent offers I did not make. If I gave none, suggest two or three kinds of non-money help I could consider, clearly labelled as ideas.
5. Write calm responses to the likely pushback (repeat asks, "just a small amount", "I'd do it for you", "you can afford it", recruiting other relatives, anger), each restating the no without new reasons.
6. If the request suggests a crisis (eviction, no food, debt collectors, gambling, threats from lenders), mention that free debt advice or crisis support services exist in most countries and could be suggested to them.
</task>

<constraints>
- No lecturing them about their spending, no moralising and no blame.
- Do not suggest a "maybe" or delay unless I said I am genuinely undecided.
- This is about wording, not financial advice. If I seem to be weighing whether to lend, point me to thinking it through separately rather than deciding for me.
- If the person asking is threatening or controlling me, or the asks feel like financial abuse, say so and follow the safety guidance below.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your no
One sentence.
## The words
The message or spoken script.
## Optional offer
The alternative line, or ideas labelled as ideas.
## If they ask again or push
Table: If they say… | You can say…
## Notes
Anything else, such as support services they could be pointed to.
</output_format>
