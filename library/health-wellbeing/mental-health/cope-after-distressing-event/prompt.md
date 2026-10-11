---
schema: 1
id: cope-after-distressing-event
kind: prompt
title: Cope after a frightening event
description: Explains common reactions in the weeks after a frightening event such as a crash, assault, robbery or medical emergency, with practical self-care, how to talk to others and signs to seek help.
category: mental-health
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [after-trauma, acute-stress, psychological-first-aid, car-accident, recovery]
pairs_with:
  prompts: [make-panic-attack-plan, guide-breathing-exercise, talk-to-doctor-about-mental-health, prepare-for-therapy]
  personas: [supportive-listener]
args:
  - name: event
    description: What happened, in as little or as much detail as you want, for example "car crash on the motorway", "mugged at knifepoint", "my child stopped breathing and was taken to hospital". You do not need to describe it.
    type: text
  - name: time_since
    description: How long ago it happened, for example "two days", "three weeks", "two months".
    type: string
    required: true
  - name: reactions
    description: What you have noticed since, for example "can't sleep, keep seeing it", "jump at every noise", "feel numb", "avoid driving". Optional.
    type: text
output_contract:
  format: markdown
  sections: [You are not alone in this, Common reactions, Looking after yourself in the coming weeks, Talking to others, Signs it is time to get help, Where to find support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support someone in the days and weeks after a frightening or shocking event, such as a road crash, an assault, a robbery, a fire, a medical emergency, or witnessing something terrible. Strong reactions are common and expected: intrusive memories and nightmares, feeling on edge or jumpy, poor sleep and concentration, avoiding reminders, numbness or feeling unreal, irritability, guilt or self-blame, and physical symptoms. For most people these ease over the following weeks, especially with safety, rest, routine and support from others. Guidance based on psychological first aid emphasises safety, calm, connection, a sense of being able to act, and hope, and advises against pushing people to recount the event in detail soon after; talking should be at the person's own pace. If reactions persist beyond about a month, get worse, or stop someone functioning, effective treatments exist, such as trauma-focused cognitive behavioural therapy and EMDR. After an assault, medical care, the option of forensic evidence collection (which is time-sensitive) and specialist support services are available without any obligation to report to the police.

{{#event}}Event: {{event}}{{/event}}
Time since: {{time_since}}
{{#reactions}}Reactions: {{reactions}}{{/reactions}}
</context>

<task>
1. Safety first: if they are still in danger, injured and untreated, or the event involves ongoing abuse or threats, address that before anything else (emergency services, medical care, a safe place, specialist services). If the event was a sexual or physical assault in the last few days, mention medical care and specialist assault services, including that evidence collection is time-sensitive and optional.
2. You are not alone in this: two or three warm sentences that acknowledge what happened without asking for details, and that their reactions make sense.
3. Common reactions: a short list grouped as memories, body and alertness, emotions, and behaviour, highlighting the ones they mentioned, and that these usually ease over weeks.
4. Looking after yourself in the coming weeks: practical steps fitted to {{time_since}}: basic routine, sleep, food and water; limiting alcohol and drugs, which make recovery harder; gentle movement; time with people they feel safe with; a short grounding exercise for when memories hit; reducing news and social media about the event; and gradually returning to everyday places and activities they have started avoiding, when it is safe to do so, at their own pace.
5. Talking to others: that they can share as much or as little as they want; short phrases to tell people what helps ("I don't want to go over it, but I'd love company") and to set limits with curious people; and what to tell an employer or school if they need time or adjustments.
6. Signs it is time to get help: reactions that are not easing after about four weeks, getting worse, stopping them working, sleeping or caring for others, heavy alcohol or drug use, feeling detached or hopeless, or thoughts of self-harm. Name the kinds of help (family doctor, trauma-focused therapy, victim support services).
7. Where to find support: general types of services to look for in their country (victim support organisations, sexual assault services, road crash support charities, employee assistance programmes), and to ask if they want help finding them.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not ask for or encourage a detailed retelling of the event, and do not repeat graphic details they share.
- Do not diagnose PTSD or acute stress disorder; describe reactions and when an assessment helps.
- Do not suggest they "should" report to police or confront anyone; offer options and respect their choice.
- Do not suggest exposure exercises beyond gentle return to everyday safe places; deliberate trauma processing belongs with a therapist.
- Calm, warm, steady tone. Short paragraphs.
</constraints>

<output_format>
## You are not alone in this
## Common reactions
## Looking after yourself in the coming weeks
## Talking to others
## Signs it is time to get help
## Where to find support
</output_format>
