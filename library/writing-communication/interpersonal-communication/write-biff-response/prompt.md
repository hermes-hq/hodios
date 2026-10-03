---
schema: 1
id: write-biff-response
kind: prompt
title: Write a BIFF response
description: Writes a brief, informative, friendly and firm (BIFF) reply to a hostile message from an ex, co-parent, neighbour or colleague, removing emotional hooks and keeping to facts.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, manager]
requires: [none]
inputs: [message, text]
output: [message, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [biff, high-conflict, co-parenting, hostile-messages, de-escalation]
pairs_with:
  prompts: [reply-to-tricky-message, respond-to-angry-email, set-boundary]
  personas: [communication-coach]
args:
  - name: hostile_message
    description: The message you received, pasted exactly.
    type: text
    required: true
  - name: facts_to_convey
    description: The facts or decision you need to get across in your reply, for example "pickup stays at 5pm Friday as agreed; I can do 6pm only on the 14th".
    type: text
    required: true
  - name: relationship
    description: "Who sent it, for example \"my ex and co-parent of our two children\", \"the neighbour next door\", \"a colleague in another department\"."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Do you need to reply, BIFF reply, Hooks left out, BIFF check, If they escalate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
BIFF is a method from Bill Eddy of the High Conflict Institute for replying to hostile or blaming messages: Brief, Informative, Friendly and Firm. Brief means a short paragraph, because long replies give more to attack. Informative means straight facts about the issue, not a defence against every accusation. Friendly means a calm, polite opening or closing line, not warmth that is not felt. Firm means it closes the topic or, if a decision is needed, offers clear choices with a date. The method also avoids admonishments, advice and unneeded apologies, which invite escalation. In co-parenting and other disputes, it helps to write every message as if a judge, mediator or HR officer might read it later.
</context>

<task>
Write a BIFF reply to this message from {{relationship}}.

<hostile_message>
{{hostile_message}}
</hostile_message>
<facts_to_convey>
{{facts_to_convey}}
</facts_to_convey>

1. If the message contains threats of violence, threats to take the children unlawfully, stalking or blackmail, say so first: do not argue; keep the message as evidence; contact the police or emergency services if anyone is in danger; and for co-parents, contact their lawyer or a family law service about any court order. Follow the safety guidance below. Write a BIFF reply only if a reply is still needed, and keep it to the bare facts.
2. Decide whether a reply is needed at all. If the message asks nothing and needs no correction that matters, say that not replying is a valid choice. If inaccurate claims could matter later (for example in a dispute), suggest one neutral correcting sentence.
3. Separate the hooks (insults, accusations, sarcasm, old grievances, threats to tell others) from the actual issue and requests.
4. Write the reply:
   - Brief: one short paragraph, about 40 to 120 words.
   - Informative: only the facts I need to convey, stated neutrally. Correct a false claim once, plainly, only if it matters.
   - Friendly: one courteous line, such as thanks for raising it or a brief acknowledgement of a shared goal (for example "the kids").
   - Firm: close the topic, or give two clear choices and a date to reply by, and stop.
5. Show which hooks were left out on purpose and why.
6. Check the draft against BIFF and against the avoid-list: no admonishments ("you should know better"), no advice, no unneeded apology, no sarcasm, no character comments, no emotional words.
7. Give one line for if they escalate: usually the same facts, shorter, or no reply.
</task>

<constraints>
- Use only the facts I gave. Do not invent agreements, dates, court orders or events.
- No legal advice. If the conflict involves a court order, custody arrangements or legal claims, say once that a family lawyer or legal advice service should check anything that affects their rights.
- Write in plain, neutral language that would read well to a neutral third party.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Do you need to reply
One or two lines.
## BIFF reply
The reply in a quote block, ready to send.
## Hooks left out
A table: Hook in their message | Why it is left out.
## BIFF check
A table: Brief | Informative | Friendly | Firm, each with pass and a short note.
## If they escalate
One or two lines.
</output_format>
