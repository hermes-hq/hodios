---
schema: 1
id: raise-recurring-issue-with-partner
kind: prompt
title: Raise a recurring issue with your partner
description: Plans how to raise a recurring issue with a partner, such as chores, money, phones or time together, with a soft start-up, the need underneath and one specific request.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [couples, soft-start-up, housework, requests, recurring-issues]
pairs_with:
  prompts: [repair-after-argument-with-partner, call-time-out-in-heated-argument, set-boundary]
  personas: [communication-coach]
args:
  - name: issue
    description: What keeps happening, how often, how it affects you and why it matters to you.
    type: text
    required: true
  - name: history
    description: Optional. What you have already said or tried, how your partner usually responds, and anything you know about their side.
    type: text
output_contract:
  format: markdown
  sections: [What this is about, When to raise it, Soft start-up, The request, If they get defensive, Making it stick, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
How a conversation about a sore point starts largely decides how it ends: a "harsh start-up" (criticism, sarcasm, "you always", "you never") gets defensiveness, while a "soft start-up" gets listening. A soft start-up describes a specific situation, says how I feel about it and asks for something positive and concrete: "I feel swamped when I come home to dishes after cooking. Could you do them on the nights I cook?" Most long-running couple disagreements are not fully solvable because they come from differences in personality or values (tidiness, saving versus spending, time alone versus together); the aim is a workable arrangement and understanding of the need underneath, not converting the partner. For chores, the hidden issue is often the mental load of noticing and planning, so the fix is handing over a whole task, including remembering it, with a shared idea of "done". For money, the values each person attaches to it matter more than the numbers. Raising it in the middle of the irritation, or by hints and sighs, rarely works.
</context>

<task>
Help me raise this recurring issue with my partner.

<issue>
{{issue}}
</issue>
{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. If I have not said what actually happens or what I want instead, ask up to two short questions and stop.
2. Name what this is probably about underneath (fairness, feeling valued, security, freedom, closeness), as a possibility for me to check, not a verdict. Say whether it looks like a solvable problem or a lasting difference to manage.
3. Say when and how to raise it: a calm moment, not right after the latest incident, with a heads-up if that suits us.
4. Write a soft start-up I can say: one specific recent example, how I felt, and that I want us to sort it out together. No "always", "never" or character words.
5. Turn what I want into one specific, doable request (who, what, how often, what "done" looks like). Offer a second, smaller version if the first is a big ask, and a question that invites my partner's side and their own request of me.
6. Write calm responses to the three or four most likely defensive replies (counter-complaint, "I do do it", "you're nagging", shutting down), each acknowledging their point before returning to the request.
7. Suggest how to make it stick: writing down the agreement if useful, a check-in date, and how to remind without nagging.
</task>

<constraints>
- Work only with what I described. Do not assume who does what at home or why my partner acts as they do.
- No hints, guilt-tripping, scorekeeping lists of past failings or ultimatums I have not said I mean.
- Keep spoken lines short enough to say naturally.
- If the input describes control over money, contact or movement, threats or fear, do not script this; follow the safety guidance below.
- If the issue has been raised many times with no change, or contempt has crept in, mention once that a couples counsellor can help.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What this is about
The likely need underneath and whether it is solvable or a difference to manage.
## When to raise it
Timing and setting.
## Soft start-up
The opening words.
## The request
The specific request, a smaller version and a question for their side.
## If they get defensive
Table: If they say… | You can say…
## Making it stick
Agreement, check-in and reminders.
## Notes
Anything else to consider.
</output_format>
