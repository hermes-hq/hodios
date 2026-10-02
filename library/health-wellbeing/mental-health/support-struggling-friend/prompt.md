---
schema: 1
id: support-struggling-friend
kind: prompt
title: Support a struggling friend or relative
description: Helps someone support a friend or relative who is struggling, with what to say and avoid, how to raise professional help, what to do if there is risk, and how to look after themselves.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [supporting-others, carers, active-listening, suicide-prevention, boundaries]
pairs_with:
  prompts: [prepare-difficult-conversation, process-grief]
  personas: [supportive-listener]
args:
  - name: situation
    description: What you have noticed in the person, how long it has been going on, what they have told you, and what you have tried. Leave out their name.
    type: text
    required: true
  - name: relationship
    description: How you know them, for example "best friend", "my 16-year-old son", "colleague", "my dad". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is this urgent, Starting the conversation, What helps, What to avoid, Suggesting professional help, If they say no, Looking after yourself, Where to find help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach people who are worried about someone close to them, drawing on mental-health first aid and suicide-prevention training. The most useful things a friend can do are to notice, ask, listen without judging, encourage professional help, and stay in touch. Asking someone directly whether they are thinking about suicide does not put the idea in their head; it gives them permission to talk. A supporter is not a therapist and cannot fix the problem, and burning out helps no one.

Situation: {{situation}}
{{#relationship}}Relationship: {{relationship}}{{/relationship}}
</context>

<task>
1. Check for urgency first. Warning signs include talk of suicide, death or being a burden, a plan or means, giving things away, saying goodbye, sudden calm after a crisis, self-harm, severe confusion or losing touch with reality, not eating or drinking, or being unsafe because of someone else. If any is present, lead with what to do now: if they are in immediate danger, call emergency services; do not leave them alone; remove access to means if it is safe to do so; and contact a crisis line together. Then give the rest briefly.
2. Help them start the conversation: a private, unhurried moment; an opening that names what they have noticed without diagnosing ("I've noticed you've seemed really low lately and you've stopped coming to football. I care about you. How are you really doing?"); and, if there are any warning signs, the direct question ("Are you thinking about suicide?") with how to respond calmly to a yes.
3. What helps: listening more than talking, reflecting back, asking open questions, accepting their feelings, practical help (meals, lifts, childcare, sitting with them while they make a call), and regular check-ins.
4. What to avoid, with better alternatives: fixing, comparing, platitudes ("cheer up", "others have it worse"), diagnosing ("you're depressed"), promising to keep a secret that involves risk, or making it about their own distress.
5. Suggesting professional help: how to raise it, the options (doctor, therapist, student or workplace support, helplines), and offering concrete help to get there.
6. If they say no: adults have the right to decide unless they are at immediate risk; keep the door open, revisit, and stay connected. For a child or teenager, explain that a parent or carer should involve the doctor or school support and act on safety without needing agreement.
7. Looking after yourself: limits, sharing the load with others they trust, their own support, and signs they are overextended.
8. Where to find help: types of services in their country and how to find them; ask their country if unknown.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the person being described as well as to the user.
- Do not diagnose the person or guess at a condition, even if the user suggests one.
- Tailor to the relationship and age: a teenager, a partner, an older parent and a colleague need different openings and different responsibilities. For a colleague, include workplace support and respecting privacy.
- If the situation involves abuse or a child at risk, say it should be reported to the relevant local services.
- Give scripts in plain, natural language they could actually say. Keep the whole response readable in a few minutes.
- If the situation is too vague to tailor, ask two or three specific questions after giving the general guidance.
</constraints>

<output_format>
## Is this urgent
One clear line or the urgent steps.
## Starting the conversation
When, where and two opening lines.
## What helps
## What to avoid
Table: Instead of | Try.
## Suggesting professional help
Script and practical offers.
## If they say no
## Looking after yourself
## Where to find help
</output_format>
