---
schema: 1
id: respond-to-an-apology
kind: prompt
title: Respond to an apology
description: Helps decide and word a response to an apology, whether accepting, accepting with a request, not ready yet or declining a non-apology, without pretending it was fine.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager, parent]
requires: [none]
inputs: [text, message]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [apology, forgiveness, reply, trust-repair, repair]
pairs_with:
  prompts: [apologize-effectively, rebuild-trust-after-breaking-it, set-boundary]
  personas: [communication-coach]
args:
  - name: apology
    description: The apology you received, word for word if you can, and how it was given (in person, text, letter).
    type: text
    required: true
  - name: what_happened
    description: What they did and how it affected you.
    type: text
    required: true
  - name: relationship
    description: "Who apologised, for example \"my sister\", \"a colleague\", \"my ex\"."
    type: string
    required: true
  - name: how_i_feel
    description: Optional. Where you are now, for example "mostly over it", "still angry", "want to stay friends but need something to change".
    type: string
output_contract:
  format: markdown
  sections: [Reading the apology, Your options, Suggested response, If they push, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Accepting an apology, forgiving, trusting again and returning to how things were are four different things, and people often feel pushed to do all four at once. The reflex reply "it's fine" or "don't worry about it" tells the other person nothing happened, which can leave resentment behind and invites a repeat. Honest options include: thanking them and accepting it; accepting it and saying what would help from now on; acknowledging it while saying you need time; and, when the apology is not really one ("sorry you were upset", "sorry, but…"), naming calmly what you still need to hear. Thanking someone for an apology does not mean agreeing it was enough. A good response is usually short; the conversation about the hurt can come later.
</context>

<task>
Help me respond to this apology from {{relationship}}.

<apology>
{{apology}}
</apology>

<what_happened>
{{what_happened}}
</what_happened>
{{#how_i_feel}}Where I am: {{how_i_feel}}{{/how_i_feel}}

1. If the input mentions abuse, threats or a pattern of harm followed by apologies, do not write a reconciliation reply. Say so with care, follow the safety guidance below and stop.
2. Read the apology: does it name what they did, own it without "if" or "but", acknowledge the impact, and offer repair or change? Say plainly which parts are there and which are missing, without being harsh about it.
3. Lay out my realistic options (accept, accept with a request, not ready yet, ask for a real apology, no reply), with one line each on when it fits.
4. Recommend one option based on how I feel and the relationship, and write the response for the same channel they used, under about 60 words. Write a second version for the next most likely option.
5. Write short replies if they push for more than I am ready to give ("so are we OK?", "I said sorry, what more do you want?").
</task>

<constraints>
- Never write "it's fine", "no worries" or similar unless I say it really is fine.
- Do not tell me I should forgive, or that I should not. It is my decision.
- Keep the response calm and without sarcasm or a lecture, even when declining.
- If I am a manager responding to a staff member, or a parent to a child, adjust: be warm, close the matter clearly and say what happens next.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Reading the apology
What it does and does not do.
## Your options
One line per option.
## Suggested response
The recommended reply, and a second version.
## If they push
Table: If they say… | You can say…
## Notes
Anything to consider, such as having the fuller conversation later.
</output_format>
