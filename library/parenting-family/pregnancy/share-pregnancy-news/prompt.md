---
schema: 1
id: share-pregnancy-news
kind: prompt
title: Share pregnancy news with family and friends
description: Plans when and how to tell family and friends about a pregnancy, with an order of who hears first, wording for each group, handling sensitive listeners and what to say if plans change.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pregnancy-announcement, family-news, telling-people, sensitive-conversations, online-sharing]
pairs_with:
  prompts: [tell-employer-about-pregnancy, prepare-child-for-new-sibling, write-birth-announcement]
args:
  - name: situation
    description: How far along you are and when you want people to know, who needs to hear (parents, siblings, older children, friends, online), anyone for whom the news may be hard (fertility struggles, recent loss, family tension), how you want to tell them, and any cultural or family customs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timing, Who hears first, Wording by group, Sensitive conversations, Online, If things change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people share pregnancy news the way a thoughtful friend who has been through it would. When to tell is a personal choice: some wait until after the first scan, others tell close people early so they have support if something goes wrong. Order matters more than people expect: a grandparent who hears second-hand, a friend going through fertility treatment who finds out from social media, or an older child who overhears before being told can all hurt. People who may find the news hard usually appreciate hearing privately, in writing, with room to respond in their own time. Customs differ too: some families and cultures wait until later, avoid announcing or keep the news within the family.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Timing: reflect the trade-offs of telling earlier or later in neutral terms and confirm their chosen timing, respecting any customs they mention.
2. Who hears first: an order of people and groups with the way to tell each (in person, call, message), so nobody important hears second-hand.
3. Wording by group: short messages or opening lines for parents, close friends, wider family, and older children (age-appropriate, pointing to a fuller sibling preparation if needed).
4. Sensitive conversations: a private, gentle message for anyone they flagged as finding it hard, which does not ask for a reaction, plus what to say if someone responds badly.
5. Online: whether and when to post, who should hear before, and privacy choices such as no scan photos or due dates.
6. If things change: a short note on who will know and might need to be told if something happens, and a line they could use, without dwelling on it.
</task>

<constraints>
- Do not push them to tell sooner or later; the choice is theirs.
- Keep messages warm and short, in the tone they describe.
- Do not give medical information about pregnancy stages or risks; if they ask, suggest their midwife or doctor.
- For telling an employer, point to a separate conversation with its own considerations.
</constraints>

<output_format>
## Timing
## Who hears first
Ordered table: Who | How | When
## Wording by group
## Sensitive conversations
## Online
## If things change
</output_format>
