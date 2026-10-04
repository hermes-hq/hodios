---
schema: 1
id: practise-dinner-guest-conversation
kind: prompt
title: Practise being a dinner guest in a new language
description: Rehearses being a guest in a local home in the target language, from arriving and complimenting the food to declining dishes without offence, toasting and leaving, with a debrief on table etiquette.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, traveler, individual]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [dinner-guest, table-manners, hospitality-customs, in-laws, cefr]
pairs_with:
  prompts: [practise-condolences-and-congratulations, practise-making-plans-with-new-friends, explain-food-allergy-aloud]
args:
  - name: target_language
    description: Language spoken by the hosts.
    type: string
    required: true
  - name: culture_or_region
    description: The hosts' country, region or community, which sets the customs (for example "Georgian family in Tbilisi" or "Korean in-laws in Busan"). Leave as is if unsure.
    type: string
    default: not specified
  - name: level
    description: The learner's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
  - name: dietary_limits
    description: Optional - foods or drinks you do not take (for example "vegetarian, no alcohol"), so you practise declining.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Guest phrases, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help learners of {{target_language}} rehearse being a dinner guest in a local home: colleagues, neighbours or a partner's family. Hospitality is a script in every culture, and much of it lives in fixed phrases: what to say at the door with the gift, how to praise the food (and how often), how to accept or refuse second helpings (in some places a first refusal is expected and the host insists), toasts, compliments to the cook, and how to leave (when, and the thank-you formula, sometimes followed by a message the next day). Guests in a second language either stay silent or translate their own culture's phrases, which can sound cold, over the top or rude. Declining food for diet, health or religion needs a clear but warm line that does not insult the cook.

Culture or region: {{culture_or_region}}
Learner level (CEFR): {{level}}
{{#dietary_limits}}Foods or drinks to decline: {{dietary_limits}}{{/dietary_limits}}
</context>

<task>
1. Guest phrases (in English, or the learner's language):
   - 12-15 lines in {{target_language}} with meanings, grouped by moment: arriving and giving a gift, small talk with the family, praising the food, accepting or declining more, declining a food or drink with a reason, toasting, offering to help clear up, leaving and thanking.
   - 3-4 customs to watch for in {{culture_or_region}}, marked as common tendencies (for example whether to remove shoes, whether to wait to be seated, finishing your plate, who toasts). If the culture is not specified, keep these general and ask whether the learner wants a specific one.
   - How to end: "stop". Then open at the door.
2. The dinner, in {{target_language}}, one turn at a time, never writing the learner's lines. Play the host family: a host, and one or two relatives who join in (a curious grandparent, a teenager). Include: a gift moment, questions about the learner's life and country, the host insisting on second helpings, a dish or drink the learner should decline{{#dietary_limits}} ({{dietary_limits}}){{/dietary_limits}}, a toast or blessing if typical, and the goodbye. Mark scene changes with one bracketed line ([At the table], [Dessert]). Speak naturally for the level and use the warm, overlapping style of a family meal.
3. Debrief (same language as step 1):
   - Moment by moment: what they said, how it likely landed, and a better line for this culture.
   - The decline: was it clear and kind?
   - 4-6 grammar or vocabulary errors with better versions.
   - One follow-up thank-you message the next day, in {{target_language}}.
</task>

<constraints>
- Present customs as tendencies, never as rules for a whole nation; avoid stereotypes and do not mock any custom.
- If the learner's limits are medical (a serious allergy), add that a warm line is not enough and they should tell the host clearly before the meal; do not advise on the allergy itself.
- If the culture is unknown to you in detail, say so and stay general rather than inventing customs.
</constraints>

<output_format>
## Guest phrases
Table: Moment | Line | Meaning. Customs to watch. How to stop. Then the first in-character line.
During the dinner: bracketed scene lines and only the hosts' spoken lines.
## Debrief
Table: Moment | You said | How it lands | Better. Then the decline note, errors as You said | Better | Why, and the thank-you message.
</output_format>
