---
schema: 1
id: decide-whether-to-raise-an-issue
kind: prompt
title: Decide whether to raise an issue or let it go
description: Decides whether to raise a grievance with a friend, colleague, partner or relative or let it go, by testing how much it matters and whether it will recur, then plans how to raise it if so.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
inputs: [text, message]
output: [report, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [grievances, speaking-up, letting-go, resentment, relationships-at-work]
pairs_with:
  prompts: [raise-awkward-personal-issue, raise-recurring-issue-with-partner, assess-conflict-fairly]
args:
  - name: issue
    description: What happened, with whom, how often, and how it left you feeling.
    type: text
    required: true
  - name: relationship
    description: Who the person is to you, how much the relationship matters, any power difference (for example your manager), and how they usually react to feedback.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is really bothering you, The tests, Verdict, If you raise it, If you let it go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether to speak up about something that bothered them. Both mistakes are common. People who always let things go accumulate resentment that leaks out later as coldness, sarcasm or a blow-up over something small, and the other person never got a chance to change. People who raise everything wear out relationships and can come across as keeping score. Useful tests: Is it a one-off or a pattern? Will I still care in a week or a month? Is it about the behaviour, or about something else I have not said (feeling unappreciated, unequal effort)? Can the other person actually change it? Am I able to let it go genuinely, or will I just stew? What is the cost of saying nothing for me and for the relationship? Is now the right moment, or am I still too angry? Power and safety matter: speaking up to a manager, landlord or someone who has been aggressive needs more care, and some issues (harassment, discrimination, safety) should go to the right channel rather than be handled privately. Letting go is a legitimate choice when it is a real decision, not avoidance.

Issue:
<issue>
{{issue}}
</issue>

Relationship:
<relationship>
{{relationship}}
</relationship>
</context>

<task>
1. Name what is really bothering the person: the specific behaviour, and any underlying need or pattern behind it. Ask one question if this is unclear.
2. Run the tests: one-off or pattern, will it matter in a month, can they change it, can I genuinely let it go, cost of silence, power and safety, timing. Give a short answer for each.
3. Give a verdict: raise it, let it go, or wait and watch (with what would tip it into raising it).
4. If raising it: the best setting and timing, an opening line that describes the behaviour and its effect without blaming, the request, and how to respond if they get defensive. Keep it to a short script.
5. If letting it go: how to let go in practice (what to tell yourself, what boundary to keep quietly), and the signal that would mean it needs raising after all.
</task>

<constraints>
- Base the verdict on the person's answers to the tests, not on a general rule like "always communicate".
- Do not diagnose the other person or assign motives; work from behaviour.
- If the issue involves harassment, discrimination, threats, abuse or safety, say that it should go to the appropriate channel (HR, a manager, a support service or emergency services) and do not frame it as something to let go.
- Keep scripts short, plain and honest, with no passive-aggressive phrasing.
</constraints>

<output_format>
## What is really bothering you
Two or three lines.

## The tests
Bullets, one line each.

## Verdict
Raise it, let it go, or wait and watch, with the reason.

## If you raise it
When, where, opening line, request, if they get defensive.

## If you let it go
How, and the signal to revisit.
</output_format>
