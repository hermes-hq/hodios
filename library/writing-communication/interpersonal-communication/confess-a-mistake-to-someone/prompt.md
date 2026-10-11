---
schema: 1
id: confess-a-mistake-to-someone
kind: prompt
title: Tell someone about a mistake they do not know about
description: Plans how to tell someone about a mistake they have not found out about yet, with whether and when to tell, opening words, the facts they need and what you will do.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [disclosure, honesty, owning-up, accountability, mistakes]
pairs_with:
  prompts: [apologize-effectively, rebuild-trust-after-breaking-it, share-bad-news-in-person]
  personas: [communication-coach]
args:
  - name: mistake
    description: What you did, what it means for them, how likely they are to find out, and anything you have already done to fix it.
    type: text
    required: true
  - name: person
    description: "Who you need to tell, for example \"my flatmate\", \"my dad\", \"a friend whose car I borrowed\"."
    type: string
    required: true
  - name: channel
    description: How you expect to tell them.
    type: enum
    enum: [in-person, call, message, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [When to tell, Opening words, The facts to give, What you will do, Their reaction, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Telling someone about your mistake before they discover it protects trust far better than being found out, and the longer the wait, the more the delay itself becomes part of the offence ("you knew for a month?"). People dread these conversations and so tend to bury the news under a long preamble, minimise it, or confess in a way that asks the other person to comfort them. What works: tell them soon, lead with the fact in the first two sentences, give the information they need to protect themselves or decide what to do (cost, deadlines, who else knows), say what you have already done and will do to fix it, then stop talking and let them react. The exception worth thinking about is disclosure that would only relieve your guilt while hurting them, with no ongoing effect on their choices; that is a judgement call, and the person's right to make decisions with full information usually wins.
</context>

<task>
Help me tell {{person}} about this mistake. Channel: {{channel}}.

<mistake>
{{mistake}}
</mistake>

1. If it is unclear what the mistake is or how it affects them, ask up to two short questions and stop.
2. Say whether to tell them and how soon, with the reason. If there is a deadline that affects them (a bill, an insurance claim, a health risk, a decision they are about to make), say that timing is urgent. If the case for not telling is real, set out both sides honestly and leave the choice to me; never help me deceive them.
3. Recommend the channel if I am unsure: in person or a call for anything serious, a message only for small things or as a heads-up ("Can I call you tonight? I need to tell you something I messed up").
4. Write the opening: one line of warning and the fact itself within the first two sentences. No long preamble.
5. List the facts they need, in order, using only what I gave. Mark gaps as `[check: …]`.
6. Write what I will do: the fix, any cost I will cover, and what changes, from my input. Where I have given nothing, insert `[what you will do: …]` instead of inventing it.
7. Describe likely reactions (anger, silence, questions, "why didn't you tell me sooner") and a short, non-defensive response to each.
</task>

<constraints>
- Do not minimise ("it's not a big deal, but…"), blame circumstances or ask them to reassure me.
- Do not invent amounts, dates or consequences.
- If the mistake may have legal, insurance, safety or health consequences (a car accident, lost documents, a missed medication, data shared), say once which kind of professional or organisation to contact and that they may need to be told quickly.
- For a mistake at work, note that an employer's own reporting process may apply alongside this conversation.
</constraints>

<output_format>
## When to tell
Recommendation, timing and channel.
## Opening words
The first two or three sentences.
## The facts to give
Numbered list.
## What you will do
Short paragraph or bullets.
## Their reaction
Table: If they… | You can say…
## Notes
Anything else, such as professionals to contact.
</output_format>
