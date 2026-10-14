---
schema: 1
id: respond-to-manipulative-tactics
kind: prompt
title: Respond to manipulative tactics
description: Names manipulation tactics such as guilt-tripping, silent treatment, moving goalposts or twisting your words in an exchange you describe, and gives steady responses that do not take the bait.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, parent]
requires: [none]
inputs: [text, message]
output: [explanation, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [manipulation, guilt-tripping, assertiveness, pushback, self-trust]
pairs_with:
  prompts: [set-boundary, decode-message-tone, write-biff-response]
  personas: [communication-coach]
args:
  - name: exchange
    description: What was said or written, as close to word for word as you can, with who said what. Paste messages if you have them.
    type: text
    required: true
  - name: relationship
    description: "Who the other person is, for example \"my mother\", \"my manager\", \"my partner\", \"a friend\", \"my co-parent\"."
    type: string
    required: true
  - name: pattern
    description: How often this happens and anything else that worries you about the relationship. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is happening, How to respond, Lines you can use, What to watch, Getting support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Manipulative tactics work by moving the conversation away from the actual request and onto your guilt, fear or self-doubt: guilt-tripping ("after everything I've done"), silent treatment, moving the goalposts, twisting your words, denying something you both know happened, playing the victim, triangulating ("your sister agrees with me"), love-bombing after a fight, or urgency that leaves no time to think. Naming a tactic to yourself helps; naming it to the person ("you're manipulating me") rarely does and usually escalates. Steady responses are short, calm and repetitive: bring it back to the actual issue, do not defend your character, do not decide under pressure, and hold your position. One-off behaviour under stress is common and not proof of a manipulative person; a repeated pattern that leaves you doubting your memory, isolated or afraid is different and can be a sign of coercive control.
</context>

<task>
Help me understand and respond to this exchange with {{relationship}}.

<exchange>
{{exchange}}
</exchange>
{{#pattern}}
<pattern>
{{pattern}}
</pattern>
{{/pattern}}

1. Safety first. If there is any sign of threats, violence, control over money, phone or movements, isolation from friends, or I say I am afraid, follow the safety guidance below, name it gently as a possible pattern of abuse, and do not coach me to engage more skilfully. Stop there.
2. Go through the exchange and name the tactics that may be present, quoting the line each comes from. For each, say what it seems designed to make me feel or do. Also point out anything that might be ordinary hurt, stress or a fair point, and anything in my own messages that may be fuelling it.
3. Give a short plan for how to respond: what the real issue is, what I want, and the one or two things I will not be drawn into.
4. Write steady responses to the specific lines, each one or two sentences, that return to the issue without accusing, explaining at length or apologising for things I did not do.
5. Say what to watch for over time, and how to keep my own record (dates, what was said) if I start doubting my memory.
</task>

<constraints>
- Do not diagnose the other person (no "narcissist", "sociopath", "personality disorder") and do not call them a manipulator; describe behaviours.
- Be balanced: if the evidence is thin or the other person has a point, say so plainly.
- Do not script counter-manipulation, revenge or ways to make them feel guilty in return.
- Keep responses short enough to text or say calmly.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What is happening
Table: Line | Possible tactic | What it pushes you to do. Then a short balanced note.
## How to respond
The real issue, what you want, what you will not get drawn into.
## Lines you can use
Table: If they say… | You can say…
## What to watch
Signs of a pattern, and how to keep a record.
## Getting support
Who could help, if relevant.
</output_format>
