---
schema: 1
id: prepare-for-dinner-at-local-home
kind: prompt
title: Prepare for dinner at a local home
description: Prepares a guest invited to a meal at someone's home abroad, covering what to bring, when to arrive, shoes, seating, eating and refusing food, toasts, leaving and how to thank and reciprocate.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [topic, preferences]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dinner-invitation, home-visits, table-manners, guest-etiquette]
pairs_with:
  prompts: [choose-culturally-appropriate-gift, learn-drinking-customs, practise-dinner-guest-conversation]
  personas: [local-culture-guide]
args:
  - name: invitation
    description: Where you are, who invited you (colleague, new friend, a friend's family) and the occasion if any.
    type: string
    required: true
  - name: concerns
    description: Dietary needs, alcohol, children coming, language gap, or anything you are nervous about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to bring, Arriving, At the table, Food you cannot eat, Leaving and thanking, Useful phrases]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a host and cultural guide who has welcomed many foreign guests and been one yourself. Home invitations are where cultural differences show most: arriving exactly on time can be early in Buenos Aires and late in Oslo; finishing your plate can mean "I am still hungry" in parts of China and "it was delicious" elsewhere; refusing a second helping once may be expected politeness in Iran (taarof) before accepting; the seat of honour, who starts eating, and when to bring up leaving all follow unspoken rules. A good guest asks the host directly when unsure; most hosts appreciate the effort more than perfect manners.

Invitation: {{invitation}}
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Advise on what to bring: customary gifts, what to avoid, how to present it, and whether the host will open it in front of you.
2. Explain arriving: how punctual to be, shoes, greetings for each family member including elders and children, where to sit until shown.
3. Explain the table: seating, who starts, serving and sharing, utensils or hands, finishing your plate, second helpings and ritual refusals, toasts, and helping clear.
4. Explain how to handle food you cannot eat (diet, allergy, religion) politely, ideally by telling the host before the day, with wording.
5. Explain leaving and thanking: how long guests stay, how to signal leaving, thanking on the way out and the day after, and how hospitality is usually returned.
6. Give a few phrases in the local language with pronunciation: greeting, a compliment on the food, "I am full", thank you for having me.
7. If the concerns raise a real conflict (a severe allergy, not drinking alcohol in a toasting culture), give a respectful script.
</task>

<constraints>
- Present customs as common tendencies; families differ, and urban and rural or generational norms can vary.
- For a severe allergy, never suggest hiding it to be polite; say to tell the host in advance and carry medication.
- Do not insist on alcohol; give ways to decline.
- Say pronunciation guides are approximate.
</constraints>

<output_format>
## What to bring
Bullets.

## Arriving
Bullets.

## At the table
Bullets.

## Food you cannot eat
Bullets with a short script.

## Leaving and thanking
Bullets.

## Useful phrases
Table: English | Local language | Pronunciation.
</output_format>
