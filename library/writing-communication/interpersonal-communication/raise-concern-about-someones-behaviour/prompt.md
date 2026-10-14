---
schema: 1
id: raise-concern-about-someones-behaviour
kind: prompt
title: Raise concern about someone's behaviour
description: Plans how to tell a friend or relative you are worried about their drinking, gambling, a controlling partner or their health, without lecturing, and what to do next.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
advice_risk: [mental-health]
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
tags: [concern, addiction, worried-about-someone, caring-conversation, family-support]
pairs_with:
  prompts: [support-struggling-friend, set-boundary, prepare-difficult-conversation]
  personas: [communication-coach]
args:
  - name: concern
    description: What you have noticed, with specific examples and dates, and why it worries you.
    type: text
    required: true
  - name: relationship
    description: "Who the person is to you, for example \"my brother\", \"my closest friend\", \"my dad, who lives alone\"."
    type: string
    required: true
  - name: history
    description: Optional. Anything already said, how they reacted, and what you know about their situation.
    type: text
output_contract:
  format: markdown
  sections: [Before you talk, Opening, What to say, If they deny or get angry, What not to say, After the conversation, Help for them and for you, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Confrontational "interventions" and labels ("you're an alcoholic") tend to produce denial and distance. Approaches with better evidence for drinking, drugs or gambling, such as Community Reinforcement and Family Training (CRAFT), teach families to raise concern calmly when the person is sober and receptive, describe specific behaviour and its effect, say why you care, listen more than talk, and keep the relationship warm so the person is more likely to accept help later. One conversation rarely changes anything; it plants a seed and shows you are safe to come to. When the worry is a controlling or abusive partner, criticising the partner usually pushes the person closer to them; the goal is to stay connected, believe them, and let them know you are there without conditions. For health worries in an older relative, respecting their autonomy and asking what they think is happening works better than instructions. In every case, look after yourself too; family members of people with addictions benefit from their own support.
</context>

<task>
Help me raise my concern with {{relationship}}.

<concern>
{{concern}}
</concern>
{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. Check for urgency first. If the input suggests the person is in immediate danger (overdose, suicidal talk, serious injury, violence from a partner, a medical emergency), lead with what to do now and follow the safety guidance below, then give the rest briefly.
2. If it is unclear what I have seen or why I am worried, ask up to two short questions and stop.
3. Plan the setting: when they are sober and calm, private, not during a crisis or argument, one to one rather than a group ambush.
4. Write an opening that leads with care and asks permission to talk about it.
5. Write what to say: two or three specific observations in "I" form ("I noticed you…", "I felt worried when…"), why I care, and an open question about how they see it. Tailor it to the type of concern.
6. Write calm responses to denial, anger, minimising or turning it back on me, without arguing or repeating evidence.
7. List what not to say for this situation, with a short reason each.
8. Plan what comes after: checking in, what to do if things get worse, what I will and will not do (for example not covering for them or lending money), and how to stay connected.
9. Describe the kinds of help for them (doctor, specialist services, peer groups, domestic-abuse services) and for me (family support groups, counselling), without inventing names or numbers.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the person I am worried about as well as to me.
- Do not diagnose them or use labels such as "addict", "alcoholic" or "abuser" in the scripts.
- For a controlling or abusive partner: never suggest confronting the partner, and keep the person's safety and choices central.
- Respect that adults make their own decisions, even ones I disagree with.
- Keep lines short enough to say naturally.
</constraints>

<output_format>
## Before you talk
Setting and timing.
## Opening
The first words.
## What to say
Observations, why I care and an open question.
## If they deny or get angry
Table: If they say… | You can say…
## What not to say
Table: Avoid | Why
## After the conversation
Follow-up, limits and what to do if it gets worse.
## Help for them and for you
Kinds of support.
## Notes
Anything else.
</output_format>
