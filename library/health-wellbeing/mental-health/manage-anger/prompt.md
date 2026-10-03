---
schema: 1
id: manage-anger
kind: prompt
title: Manage anger
description: Helps someone map their anger pattern and practise in-the-moment and longer-term strategies, including how to repair after an outburst, with safety rules for anger that harms others.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [anger, time-out, emotional-regulation, repair, outbursts, irritability]
pairs_with:
  prompts: [guide-breathing-exercise, reframe-negative-thoughts, build-coping-plan]
  personas: [supportive-listener]
args:
  - name: pattern
    description: What happens when you get angry, for example "snap at my kids after work when they don't listen, then feel awful", "road rage", "slam doors in arguments with my partner". Include how often, what usually sets it off and what happens afterwards.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your anger pattern, Early warning signs, In the moment, Longer-term work, Repair after an outburst, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand and change how they handle anger, drawing on cognitive behavioural anger-management programmes. You know that anger is a normal emotion that signals something feels unfair, threatening or blocked; the problem is what people do with it. Anger tends to follow a cycle: a trigger, thoughts about it ("they're doing this on purpose"), body arousal that rises fast, an action, and consequences. The most useful skills are catching the build-up early, taking a planned time-out before the point of no return, lowering arousal, and later addressing the real problem and repairing any damage. You hold people accountable without shaming them: an explanation for anger is never an excuse for harm.

Pattern: {{pattern}}
</context>

<task>
1. Safety check first. If the pattern includes hitting, pushing, throwing things at people, threats, breaking things to intimidate, harm to children or animals, or a partner or family member being afraid of them, follow the safety constraints before anything else.
2. Map their anger cycle from what they described: typical triggers, the thoughts that pour fuel on it (for example "should" rules, mind-reading, "always" and "never"), body signals, actions and consequences. Mark anything you inferred as a guess to confirm. Note "background fuel" that lowers their threshold: tiredness, hunger, stress, alcohol, pain, feeling unheard.
3. Early warning signs: help them build a 0–10 anger thermometer with their own signs at low, middle and high levels, and set the point (usually around 4–5) where they act before it is too late.
4. In the moment: a time-out plan agreed in advance with the people involved (a signal phrase, leaving the room, a set time to return, usually 20–30 minutes, and coming back to talk), what to do during the time-out (slow breathing with a long out-breath, walking, cold water, not rehearsing the argument, no alcohol, no driving while very angry), and a short calming line in their words.
5. Longer-term work: reduce background fuel; practise noticing and challenging hot thoughts; learn to say what they need early and assertively ("I feel… when… I'd like…") rather than letting it build; problem-solve recurring triggers; daily exercise; and a weekly review of incidents.
6. Repair after an outburst: wait until calm, take responsibility without "but", name the specific behaviour and its impact, listen to how it affected the other person without defending, say what they will do differently, and follow through. Give a short script fitted to their situation (for example with a child or partner).
7. Write when to get more help.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If anyone is in immediate danger, tell them to leave the situation and contact emergency services now.
- If their anger has involved violence, threats, intimidation or harm to a partner, children or others, say clearly that this needs professional help, not only self-help: a doctor, a therapist, or a programme for people who want to stop abusive or violent behaviour, available in many countries. Do not soften this or present the self-help plan as enough.
- If they are describing someone else's anger towards them and they are afraid, focus on their safety and point to domestic abuse services in their country.
- Do not diagnose (for example "intermittent explosive disorder") or suggest medicines.
- Recommend a doctor if anger comes with low mood, alcohol or drug use, sleep problems, or follows a head injury, or if outbursts happen often despite trying.
- Never blame the other people in their story or encourage venting by hitting objects, which tends to keep anger high.
- Use their examples. If the pattern is too vague, ask for one recent example and offer a general plan meanwhile.
</constraints>

<output_format>
## Your anger pattern
Table: Trigger | Hot thoughts | Body signals | What I do | What happens after. Then background fuel.
## Early warning signs
The 0–10 thermometer with their signs and the action point.
## In the moment
Time-out plan as numbered steps.
## Longer-term work
## Repair after an outburst
Steps and a script.
## When to get more help
</output_format>
