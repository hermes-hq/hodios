---
schema: 1
id: turn-down-friends-sales-pitch
kind: prompt
title: Turn down a friend's sales pitch
description: Helps decline a friend's or relative's MLM invitation, product party or investment pitch kindly and clearly, with replies to follow-ups, while keeping the friendship.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
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
tags: [saying-no, mlm, sales-pressure, friendship-maintenance, refusal]
pairs_with:
  prompts: [decline-request-gracefully, set-boundary, decline-to-lend-money]
  personas: [communication-coach]
args:
  - name: pitch
    description: What they are selling or inviting you to (a product, a party, joining their team, an investment), how they asked, and how many times.
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"an old school friend\", \"my sister-in-law\", \"a mum from nursery\"."
    type: string
    required: true
  - name: support_wanted
    description: Optional. Anything you are happy to do to show support, such as liking posts or buying one small item, or "nothing".
    type: string
output_contract:
  format: markdown
  sections: [Your no, The words, Replies to follow-ups, Keeping the friendship, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sales pitches from friends are hard to refuse because the friendship is used, often unknowingly, as the sales tool. In multi-level marketing (MLM) schemes, recruits are commonly trained to approach their "warm market" of friends and family, to treat no as "not yet", and to follow up with scripts ("Can I ask what's holding you back?", "Just come for the free samples"), and many have put in their own money and feel pressure from their upline. That is why vague replies ("maybe later", "I'll think about it") lead to more follow-ups. What works is a clear, friendly no that is about my choice rather than a critique of their business ("It's not for me, but I hope it goes well"), without reasons they can answer, repeated calmly, followed by moving the friendship back onto non-business ground. If the pitch is for an investment promising high or guaranteed returns or paid for recruiting others, it is worth a brief honest word of caution, since such schemes can be fraudulent and they may be the one at risk.
</context>

<task>
Help me turn down this pitch from {{relationship}} and keep the friendship.

<pitch>
{{pitch}}
</pitch>
{{#support_wanted}}What I am happy to do: {{support_wanted}}{{/support_wanted}}

1. If it is unclear what they are asking me to do, ask one short question and stop.
2. State my no in one sentence: clear, about my choice, no reasons to rebut.
3. Write the reply in the channel they used, under about 60 words: warm, the no in the first two sentences, good wishes only if sincere, and the support I said I am happy to give if any. Do not add offers I did not make.
4. Write calm replies to typical follow-ups ("What's holding you back?", "Just come to the party", "You'd be so good at this", "It's only 30 a month", "I thought you'd support me"), each restating the no.
5. Suggest how to keep the friendship: a non-business plan to propose, and what to say if business keeps coming up when we meet.
6. If the pitch is an investment or scheme with guaranteed returns, payment for recruiting, or pressure to decide fast, add a short, kind way to share concern once and say they can check it with their country's financial regulator; do not accuse them of running a scam.
</task>

<constraints>
- Do not mock or lecture them about MLMs, and do not make claims about their specific company that I have not given.
- No fake excuses ("I'm broke", "my husband won't let me") unless I say they are true; they invite workarounds.
- Keep the tone friendly and short.
</constraints>

<output_format>
## Your no
One sentence.
## The words
The reply.
## Replies to follow-ups
Table: If they say… | You can say…
## Keeping the friendship
Plan and lines.
## Notes
Concern about investments, if relevant, and anything else.
</output_format>
