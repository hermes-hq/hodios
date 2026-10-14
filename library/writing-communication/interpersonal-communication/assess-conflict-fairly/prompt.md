---
schema: 1
id: assess-conflict-fairly
kind: prompt
title: Assess a conflict fairly
description: Gives an honest, non-flattering read of a conflict from chat logs or your account, showing each side's part, what was reasonable, where it went wrong and what you could do now.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, manager]
requires: [none]
inputs: [text, message, transcript]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [conflict-resolution, honest-opinion, self-reflection, perspective-taking, arguments]
pairs_with:
  prompts: [apologize-effectively, clear-up-misunderstanding, decode-message-tone]
  personas: [communication-coach, workplace-mediator]
args:
  - name: conflict
    description: The messages, as pasted chat or email (label who is who), or your account of what happened, including what led up to it.
    type: text
    required: true
  - name: question
    description: What you want to know, for example "was I out of line?", "who should apologise?", "how do I fix this?". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Their side, Your side, Where it turned, Verdict, What to do now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who ask "was I wrong?" usually want reassurance, and AI assistants have a strong pull to give it. A useful read does the opposite of flattering: it treats the other person as a reasonable adult with their own pressures and reads their messages charitably, quotes the exact lines where things turned, and names the user's part as plainly as the other person's. Most conflicts are mixed: one person's original grievance is fair, but the way it was raised, or the reply to it, escalated. Common turning points are a sarcastic line, a "you always", bringing up old issues, replying while angry, going quiet, or involving other people. An account from one side is always partial, so a fair verdict says what it is based on and what it cannot know.
</context>

<task>
Give me an honest, fair assessment of this conflict.

<conflict>
{{conflict}}
</conflict>
{{#question}}My question: {{question}}{{/question}}

1. Safety first. If the account shows abuse, threats, coercive control or fear of the other person, do not split responsibility as if this were an ordinary disagreement. Say so gently, follow the safety guidance below and stop.
2. Summarise what happened neutrally in a few sentences, as an outside observer would.
3. Give the other person's side at its most reasonable: what they likely wanted, felt and were reacting to, based on their own words.
4. Give my side the same way, then name specifically what I did that helped and what made it worse, quoting my lines.
5. Identify the turning points where it escalated, quoting the line, and what could have been said instead.
6. Give a clear verdict on my question: who had a fair point about what, and where each crossed a line. Say plainly if I was mostly in the wrong, mostly in the right or it was shared, and how confident you are given one-sided information.
7. Recommend what to do now (apologise for something specific, clarify, let it settle, or hold my ground), with a short first message if useful.
</task>

<constraints>
- Do not flatter me or soften a fair criticism; do not pile on either. Be as direct about me as about them.
- Do not diagnose either person or label them ("toxic", "narcissist").
- Base the read on the words given; mark guesses about motives as guesses.
- If the logs look incomplete or edited, say what is missing.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What happened
Neutral summary.
## Their side
Their most reasonable reading.
## Your side
What helped and what made it worse, with quotes.
## Where it turned
Table: Line | Why it escalated | Better option.
## Verdict
A direct answer, with confidence and limits.
## What to do now
The recommendation and a first message if useful.
</output_format>
