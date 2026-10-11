---
schema: 1
id: say-no-to-friends-asking-for-free-work
kind: prompt
title: Say no to friends asking for free work
description: Helps say no, name a price or set limits when friends or family ask for free professional work, such as design, photos, a website, legal or accounting help.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, consultant, designer]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [saying-no, friends-and-family, free-favours, mates-rates, scope-creep]
pairs_with:
  prompts: [decline-spec-work-request, decline-request-gracefully, set-boundary]
  personas: [communication-coach]
args:
  - name: request
    description: Who is asking, what they want, how big the job is, and how they asked.
    type: text
    required: true
  - name: my_work
    description: What you do professionally and your usual rate or price for this kind of job, if you have one.
    type: string
    required: true
  - name: what_i_want
    description: What you would like to happen.
    type: enum
    enum: [decline, offer-paid-or-discounted, do-it-free-with-limits, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Your options, Recommended reply, Other versions, If they push, If you do it anyway, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Could you just quickly do my logo / wedding photos / look over this contract?" is one of the most common awkward asks for anyone with a professional skill. Friends usually underestimate the work involved because they see the result, not the hours. The real risk to the friendship is rarely the no; it is the half-hearted yes that turns into endless revisions, resentment and a job neither side is happy with. The workable options are: a clear no; a paid job at the normal rate; a friends-and-family discount stated as a number; a deliberate gift with a defined scope ("one design, two rounds of changes"); a swap; or a smaller thing such as a recommendation or quick advice. For regulated professions (law, accountancy, medicine, financial advice), informal help to friends can carry liability and insurance issues, so pointing them to a formal appointment or another professional is often the safer answer.
</context>

<task>
Help me answer this request for free work. I would like to: {{what_i_want}}.

<request>
{{request}}
</request>

My work: {{my_work}}

1. If it is unclear what they want or how big it is, ask up to two short questions and stop.
2. Lay out my realistic options in a few lines each, with the trade-off for the friendship and my time. If I am unsure, recommend one based on the size of the job and the relationship.
3. Write the recommended reply in the channel they used, warm and clear in the first two sentences, under about 80 words. If it includes a price or discount, use the rate I gave; if I gave none, insert `[your rate]` rather than inventing one.
4. Write short versions of two other options so I can choose.
5. Write responses to likely pushback ("it'll only take you an hour", "I thought we were friends", "can't you do mates' rates?", "I'll give you exposure").
6. If I decide to do it free or cheap, write a short scope message: what is included, how many changes, the deadline, and what happens beyond that.
7. For regulated professional help (legal, financial, medical, accountancy), add a note on informal-advice risk and suggest the safer route.
</task>

<constraints>
- No guilt, sarcasm or lecturing them about the value of my profession.
- Do not invent prices, rates or rules about my profession.
- Do not push me toward working for free or toward refusing; it is my call.
- Keep the tone friendly, as between friends or family.
</constraints>

<output_format>
## Your options
Short list with trade-offs.
## Recommended reply
The message or words.
## Other versions
Two short alternatives.
## If they push
Table: If they say… | You can say…
## If you do it anyway
The scope message.
## Notes
Professional-risk note and anything else.
</output_format>
