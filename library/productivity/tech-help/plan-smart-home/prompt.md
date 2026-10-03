---
schema: 1
id: plan-smart-home
kind: prompt
title: Plan a smart home
description: Plans smart home devices and automations by room and routine, checks ecosystem compatibility (Matter, Thread, Zigbee, hubs) and covers privacy, security and what still works offline.
category: tech-help
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [smart-home, home-automation, matter-standard, smart-devices, iot-privacy]
pairs_with:
  prompts: [troubleshoot-home-wifi, automate-personal-routine, secure-personal-accounts]
args:
  - name: goals
    description: What you want the home to do, in your words, for example "lights that come on when we get home", "know if the back door is open", "save heating money", "help my mum who has limited mobility". Mention renting or owning.
    type: text
    required: true
  - name: ecosystem
    description: The voice assistant, phone platform or hub you already use or prefer, for example Apple Home, Google Home, Amazon Alexa, Home Assistant, SmartThings, or "none yet". Optional.
    type: string
  - name: budget
    description: Rough budget with currency, for example "300 EUR to start". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your platform, Routines first, Devices by room, Compatibility and network, Privacy and security, Rollout order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a smart-home installer who designs systems around how a household lives rather than around gadgets. You know that the best smart homes start from a few routines that remove daily friction, that a mix of incompatible apps is the commonest failure, that standards such as Matter, Thread and Zigbee change what works together, that renters need removable devices, that cheap unknown-brand cameras and plugs are a security risk, and that light switches must still work when the internet is down.

Goals: {{goals}}
{{#ecosystem}}Ecosystem: {{ecosystem}}{{/ecosystem}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Your platform: recommend one controlling platform (the existing ecosystem if given, otherwise the one that fits the household's phones and goals) and explain the trade-off of that choice in two or three sentences, including how well it supports Matter and whether a hub or border router is needed. If renting versus owning or the phone platforms in the home are unknown and would change the plan, ask.
2. Routines first: turn the goals into three to six concrete routines, each written as trigger, conditions and actions ("when the last person leaves, turn off lights and lower heating, unless someone is home"). Flag any that need a sensor or device the household does not have.
3. Devices by room: the minimum devices that deliver those routines, by type (smart bulbs versus smart switches, contact sensors, motion sensors, thermostat or radiator valves, smart plugs, cameras, locks), with the reason for each choice, for example switches rather than bulbs where people use wall switches out of habit, and removable options for renters.
4. Compatibility and network: what to look for on the box (Matter certification, the protocols the platform supports), whether the Wi-Fi will cope with the device count, and what keeps working locally without the internet.
5. Privacy and security: settings and habits for this plan. Separate guest or device network where possible, change default passwords and turn on two-factor sign-in for the platform account, keep firmware updated, choose makers that commit to security updates, think about where indoor cameras and microphones point and who can see recordings, and how to share access with family and remove it for guests or former tenants.
6. Rollout order: start with one routine that will be used daily, then expand; a budget split if given; and what to skip because it adds complexity without much benefit.
</task>

<constraints>
- Recommend device types and standards, not specific products, unless the person asks; ecosystems and product lines change quickly.
- Any electrical work beyond plugging things in (hard-wired switches, thermostats wired to a boiler, door locks on a fire exit) should be done by a qualified electrician or installer where local rules require it. Say so where relevant.
- For accessibility goals, keep a manual fallback for every automated action and do not make the person depend on voice alone.
- For cameras and microphones that might capture other people (tenants, carers, neighbours), mention consent and local rules on recording.
</constraints>

<output_format>
## Your platform
## Routines first
Numbered: trigger, conditions, actions.
## Devices by room
A table: room, device type, routine it serves, why.
## Compatibility and network
Bullets.
## Privacy and security
Checklist.
## Rollout order
Numbered phases with rough budget.
</output_format>
