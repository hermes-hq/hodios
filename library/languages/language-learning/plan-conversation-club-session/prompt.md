---
schema: 1
id: plan-conversation-club-session
kind: prompt
title: Plan a conversation club session
description: Plans a volunteer-led conversation club session for mixed-level newcomers, with a daily-life theme, question cards at two levels, rotations and tips on gentle correction and quiet members.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, individual]
requires: [none]
inputs: [topic, notes]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [conversation-club, volunteers, newcomers, mixed-level-group, question-cards, community-library]
pairs_with:
  personas: [esol-volunteer-tutor]
  prompts: [set-up-tandem-language-exchange, practise-conversation-strategies]
args:
  - name: target_language
    description: The language the club practises.
    type: string
    required: true
  - name: theme
    description: The session's theme from daily life (for example food and markets, the weather, work, the doctor, festivals), plus anything you know about who comes.
    type: string
    required: true
  - name: group_size
    description: How many people usually come, and how many volunteers.
    type: string
    default: "8-15"
output_contract:
  format: markdown
  sections: [Session at a glance, Running order, Question cards, Picture and object ideas, Volunteer tips]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a library, charity or community group run a drop-in conversation club in {{target_language}}, led by volunteers who are usually not trained teachers. Participants are adult newcomers at mixed levels, from beginners who know a few words to fluent speakers who want confidence. People come and go, so each session must stand alone. Clubs go wrong when volunteers do most of the talking, when the strongest speakers take over, when beginners sit silent, when volunteers correct every mistake, and when topics touch painful ground (why someone left home, family they lost) without anyone choosing to.

Theme: {{theme}}
Group size: {{group_size}}
</context>

<task>
1. Session at a glance: a 60-90 minute session (assume 75 minutes if not stated), the aim in one line, materials to bring, how to arrange the room (small tables of 3-5 with one volunteer each where possible).
2. Running order with timings:
   - Welcome and name round with a simple, fun question on the theme (everyone can answer with one word or a gesture).
   - Warm-up in pairs (5-10 minutes): a picture or object to describe or a quick "find someone who".
   - Table talk with question cards in two rounds; rotate people (not volunteers) between rounds so they meet new partners.
   - A light whole-group activity (a vote, a "would you rather", sharing one thing learned).
   - Closing: three useful phrases from today written on a board or sheet to take home, and next week's theme.
3. Question cards at two levels on the theme: 10 "Starter" cards (A1-A2: yes/no, either/or, choose from pictures, personal facts) and 10 "Talk more" cards (B1+: experiences, comparisons, opinions, "in your country..." optional). Each Starter card gives 2-3 useful words or a sentence starter. Every question works for someone who does not want to talk about their past.
4. Picture and object ideas: 4-6 things volunteers can bring or show on a phone (packets, a timetable, a map, photos of local places) and a question for each.
5. Volunteer tips, short and practical:
   - Talk less: aim for participants speaking most of the time; count to five after a question.
   - Correct gently: recast once ("You went to the market? Nice!") and do not stop the flow; note words people ask for and write them down for them.
   - Include quiet members: ask them directly with an easy either/or question, let them answer in pairs first, accept gestures and drawings.
   - Balance strong speakers: give them a job (asking a beginner questions, note-taker).
   - Grade your language: short sentences, natural speed with pauses, gestures, write key words.
   - Boundaries: no pressure to share personal stories; if someone becomes distressed or discloses a crisis, stay calm, offer a quiet space, and follow the organisation's safeguarding procedure; volunteers do not give legal, immigration or medical advice but can signpost to the organisation's lead.
</task>

<constraints>
- Questions avoid immigration status, religion, politics, trauma, money and family loss unless the participant brings them up.
- Keep everything usable with no printer if needed (cards can be read aloud).
- Do not invent local services, addresses or phone numbers; say "your local [service]" where needed.
- If the theme could be sensitive (for example "home" or "family"), say so and give safer angles.
</constraints>

<output_format>
## Session at a glance
## Running order
Table: Time | Activity | What volunteers do.
## Question cards
### Starter (10), ### Talk more (10).
## Picture and object ideas
## Volunteer tips
Short bullets, one page at most.
</output_format>
