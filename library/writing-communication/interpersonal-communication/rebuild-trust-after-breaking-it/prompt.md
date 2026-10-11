---
schema: 1
id: rebuild-trust-after-breaking-it
kind: prompt
title: Rebuild trust after breaking it
description: Plans how to rebuild trust after breaking it, with what to own, consistent actions over months, how to answer doubts without defensiveness and signs that it is working.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, manager]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [trust-repair, accountability, betrayal, consistency, making-amends]
pairs_with:
  prompts: [apologize-effectively, repair-after-argument-with-partner, confess-a-mistake-to-someone]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What you did that broke their trust, how they found out, and what has happened since, including whether you have apologised.
    type: text
    required: true
  - name: relationship
    description: "Who they are to you, for example \"my wife\", \"my best friend\", \"my teenage daughter\", \"my business partner\"."
    type: string
    required: true
  - name: their_reaction
    description: Optional. What they have said they need, feel or will not accept.
    type: text
output_contract:
  format: markdown
  sections: [What you are owning, What they may need, Actions over time, Answering their doubts, Signs of progress, What to avoid, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An apology starts trust repair; it does not finish it. Trust comes back through behaviour that matches words, repeated over a long time, often months and after serious betrayals such as an affair, a year or more. The person who was hurt sets the pace and decides whether trust returns at all. What helps: owning the whole of it rather than the minimum that was discovered, volunteering transparency instead of waiting to be checked, keeping small promises reliably, answering the same painful questions again without irritation, and noticing their triggers. What sets it back: pushing for forgiveness ("how long are you going to punish me?"), defensiveness when they doubt you, partial disclosures that come out later, grand gestures in place of steady ones, and treating a good week as the end. Couples researchers describe stages of atoning, attuning to each other's needs and then reattaching; skipping the first is the common failure.
</context>

<task>
Help me rebuild trust with {{relationship}}.

<what_happened>
{{what_happened}}
</what_happened>
{{#their_reaction}}
<their_reaction>
{{their_reaction}}
</their_reaction>
{{/their_reaction}}

1. If it is unclear what I did or whether they know all of it, ask up to two short questions and stop. If they do not yet know everything, say that further disclosures discovered later usually do more damage than telling now, and point me to planning that disclosure first.
2. If I have not apologised yet, say so and recommend doing that first; keep the rest of the plan for after.
3. Write what I am owning: the act, the deception or broken promise around it if any, and the impact, in plain words without excuses.
4. Describe what this person may need, based on the relationship and what they have said. Mark guesses as guesses.
5. Plan actions over time in a table: the action, why it rebuilds trust, how often, and for how long. Prefer small, verifiable, repeatable actions (being where I said I would be, offering information before being asked, keeping every small commitment) over gestures. Include any change to the situation that made the breach possible.
6. Write calm answers to their likely doubts and repeated questions, each one or two sentences, that acknowledge their feeling and do not defend me.
7. List signs of progress and setbacks, and what to do after a setback (own it quickly, do not restart the argument).
8. List what to avoid.
</task>

<constraints>
- Never tell me to pressure them to forgive, set a deadline on their feelings, or suggest that trust is owed after a certain time.
- Do not promise that trust will return. Say honestly that it may not, and that it is their choice.
- Do not invent details about what they feel; use what I reported.
- For a breach involving an affair, addiction, money taken or anything recurring, suggest once that a couples counsellor or specialist support can help, without making it the whole answer.
- If what happened involves a crime, safeguarding of a child or money owed, note that there may be obligations beyond the relationship and suggest the right kind of professional.
</constraints>

<output_format>
## What you are owning
Two to four sentences.
## What they may need
Bullets, guesses marked.
## Actions over time
Table: Action | Why it helps | How often | For how long
## Answering their doubts
Table: If they say… | You can say…
## Signs of progress
Progress, setbacks and how to handle a setback.
## What to avoid
Bullets.
## Notes
Outside help and anything else.
</output_format>
