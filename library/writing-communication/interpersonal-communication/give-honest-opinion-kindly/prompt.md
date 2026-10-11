---
schema: 1
id: give-honest-opinion-kindly
kind: prompt
title: Give an honest opinion kindly
description: Helps give an honest opinion when a friend or relative asks what you think of their business idea, writing, outfit or plan, so it is kind, truthful and useful.
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
reasoning: recommended
level: beginner
tags: [honesty, opinions, tact, friends-and-family, candour]
pairs_with:
  prompts: [give-feedback-sbi, practise-receiving-criticism, clear-up-misunderstanding]
  personas: [communication-coach]
args:
  - name: what_they_shared
    description: What they showed or told you and exactly what they asked, for example "What do you honestly think of my plan to quit and open a bakery?".
    type: text
    required: true
  - name: what_i_think
    description: Your honest view, including the good parts and what worries you, and why.
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"my best friend\", \"my sister-in-law\", \"my son\"."
    type: string
    required: true
  - name: stage
    description: Whether they are still deciding, have already committed, or you are not sure.
    type: enum
    enum: [deciding, committed, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [What they are asking for, Your view in one line, What to say, If they get hurt or push back, What to leave out, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"What do you honestly think?" can mean "reassure me", "help me improve this" or "help me decide", and answering the wrong question is what causes hurt. Timing matters as much as content: a concern about a plan that is still being decided is useful; the same concern about a dress already bought for tomorrow's wedding, or a book already published, mostly just hurts. Useful honesty is specific (what works, then the one or two most important concerns, not ten), separates taste ("not my style") from substance ("the numbers do not cover rent"), is framed around their goal rather than your preferences, often takes the form of a question that lets them see the gap themselves, and is honest about the limits of your own knowledge and your stake in the outcome (for example worrying because you will miss them). Vague praise is not kind if it lets them walk into a predictable problem; brutal "just being honest" is not helpful if they cannot use it.
</context>

<task>
Help me give my honest opinion to {{relationship}}. Stage: {{stage}}.

<what_they_shared>
{{what_they_shared}}
</what_they_shared>

<what_i_think>
{{what_i_think}}
</what_i_think>

1. Work out what they are probably asking for (reassurance, improvement or a decision) and whether a concern can still change anything. If unclear, suggest a short question to ask them first ("Do you want a gut reaction or a proper critique?").
2. Sum up my honest view in one line, separating taste from substance.
3. Write what to say, short and natural: specific, genuine positives first (only ones I actually hold), then the one or two concerns that matter most for their goal, phrased as observations or questions, then an offer of help or a next step. If they have already committed and the concern can no longer change anything, say so and adjust to support with any useful tip.
4. Note any bias or limit I should own (I am not an expert in their field, I would miss them, I am risk-averse).
5. Write responses if they get hurt, defensive or ask "so you think it's a bad idea?".
6. List what to leave out and why (minor nitpicks, taste points that do not matter, things they cannot change).
</task>

<constraints>
- Do not invent positives or concerns I did not express. If my view is entirely negative, say so and help me find an honest, kind way to put it, not a fake compliment.
- Do not soften a serious concern (money they cannot afford to lose, safety, legality) into nothing; make sure it is heard once, clearly.
- Keep it proportionate to the relationship and how much they asked.
- If the plan involves significant money, health or legal risk, suggest pointing them to the right professional rather than acting as one.
</constraints>

<output_format>
## What they are asking for
Their likely question and whether a concern can still help.
## Your view in one line
One sentence.
## What to say
The words, for in person or by message as fits.
## If they get hurt or push back
Table: If they say… | You can say…
## What to leave out
Bullets with reasons.
## Notes
Bias to own and anything else.
</output_format>
