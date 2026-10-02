---
schema: 1
id: apologize-effectively
kind: prompt
title: Apologise effectively
description: Writes a sincere apology that names the specific impact, owns it without excuses or conditional wording, offers repair and says what will change, fitted to the relationship and channel.
category: interpersonal-communication
version: 1.0.1
status: experimental
stage: [build]
role: [individual, manager, support-agent, parent]
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
tags: [apology, accountability, repair, trust-repair]
pairs_with:
  prompts: [prepare-difficult-conversation, rewrite-for-tone]
args:
  - name: what_happened
    description: What you did or failed to do, who was affected and how, and anything you have already done or are willing to do to make it right.
    type: text
    required: true
  - name: relationship
    description: Who you are apologising to, for example "my partner", "a client", "my team", "a friend I haven't spoken to in a year".
    type: string
    required: true
  - name: channel
    description: Whether you will say it or send it.
    type: enum
    enum: [spoken, written]
    default: written
output_contract:
  format: markdown
  sections: [Apology, What makes it work, Avoided, After you apologise]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Narrowed the banned-wording rule to conditional and deflecting apologies; separated the research finding from practical advice."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Research on apologies (for example Lewicki and colleagues' 2016 study of six components) finds the parts that matter most are acknowledging responsibility and offering to repair; expressing regret, explaining, promising change and asking for forgiveness add less. In practice, an explanation that sounds like an excuse does harm. Apologies fail through conditional or deflecting wording ("I'm sorry if you were offended", "mistakes were made", "I'm sorry, but…"), by centring the apologiser's feelings, by over-explaining, by minimising the impact, by promising changes that will not happen, or by demanding forgiveness.
</context>

<task>
Write a {{channel}} apology to {{relationship}} for this:
<what_happened>
{{what_happened}}
</what_happened>

1. If it is unclear what happened or who was affected, ask and stop.
2. Name the specific action or failure, in plain words, with "I" (or "we" for an organisation).
3. Name the impact on them as concretely as the input allows, without guessing at feelings they have not expressed ("I know you had to explain the delay to your boss" rather than "I know you must be devastated").
4. Take responsibility without qualification. Give a short explanation only if it helps them understand and does not shift blame; leave it out otherwise.
5. Offer repair: what I will do, or have done, to make it right, taken from the input. If the input contains no repair or change, insert `[what you will do: …]` and list it under After rather than inventing a promise.
6. Say what will be different next time, only if the input supports it.
7. Close without demanding forgiveness ("I hope you can forgive me" is acceptable; "Can we move on?" is not). Leave them room to respond in their own time.
8. Size it to the harm: a missed reply needs three sentences; a broken trust needs more care and probably a spoken conversation.
</task>

<constraints>
- Never use a conditional apology ("sorry if…"), a "but" after the apology, "sorry you feel", passive voice for my actions ("mistakes were made"), or comparisons that minimise ("it's not like…").
- Do not over-apologise or repeat "sorry" more than twice.
- For spoken apologies, write natural short sentences to say, not a letter.
- If the input suggests the user is not at fault (for example they are apologising for someone else's behaviour, or for setting a reasonable boundary), say so and offer an alternative that acknowledges the impact without accepting blame they do not hold.
- If an organisation is apologising for an incident with possible legal, safety or regulatory consequences, note once that the wording should be checked by whoever handles legal or compliance before it is sent.
</constraints>

<output_format>
## Apology
The text to send or say.
## What makes it work
A short map: which sentence does each job (names the action, names the impact, owns it, repairs, changes).
## Avoided
Bullets: phrases from the input or common phrasing that were left out and why. "None" if none.
## After you apologise
Two or three bullets: following through on the repair, and what to do if they are not ready to accept it.
</output_format>
