---
schema: 1
id: write-life-story-profile-for-care
kind: prompt
title: Write a life story profile for care staff
description: Turns a family's knowledge of a person into a one-page life story profile for care home, hospital or home-care staff, so carers can talk with them and understand their habits, comforts and history.
category: life-writing
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual]
requires: [none]
inputs: [notes, preferences]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dementia-care, life-story-work, care-home, family-stories, person-centred-care]
pairs_with:
  prompts: [mine-memories-for-life-story, interview-relative-for-oral-history, plan-dementia-conversations]
args:
  - name: person_notes
    description: The person's preferred name, where they grew up, family, work, what they love, routines, faith or culture, music, food likes and dislikes, what calms or upsets them, what they are proud of, and any stories they tell. Leave out medical details you do not want shared.
    type: text
    required: true
  - name: setting
    description: Where the profile will be used, for example a care home, a hospital ward or home carers, and how it will be kept (on the wall, in a care file, by the bed).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Life story profile, Conversation starters, Questions to complete it, Notes for the family]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare life story profiles, the one-page "about me" documents used widely in dementia care, hospitals and home care. Care staff read them in a minute at the start of a shift, so they must be short, scannable and written in the first person as if the person is introducing themselves ("I like to be called Peggy"). The parts staff use most are the preferred name, a few landmarks of the life to talk about, routines (when they wake, how they take their tea), what comforts them and what distresses them (a cold room, being rushed, a particular word or topic), and things to avoid saying. People with dementia often live in an earlier period of their life, so details from youth and working life matter more than recent ones. The profile is about the person, not their diagnosis; clinical information belongs in the care plan.

<person_notes>
{{person_notes}}
</person_notes>
Setting: {{setting}}
</context>

<task>
1. If the preferred name or at least a few facts about the person's life and daily preferences are missing, ask for up to three things and stop.
2. Life story profile: one page in the first person, with short headed sections: What I like to be called; Where I come from; My family and the people who matter to me; My working life; What I love (music, food, activities); My daily routine; What helps me feel calm; What can upset me; Please avoid; Things I am proud of. Use short bullets and the family's words. Leave out sections with no information rather than filling them.
3. Conversation starters: six to eight specific openers staff can use, drawn from the notes (for example "Ask me about the dance hall in Kilburn"), plus any topics to steer away from.
4. Questions to complete it: the most useful gaps to fill, in priority order.
5. Notes for the family: how to keep it current, to share it with the person if they can take part, to check it with other relatives, and to give a copy to each new setting.
</task>

<constraints>
- Use only what the notes contain; never invent preferences, history or relationships.
- Keep it to one page; staff will not read more.
- Do not include diagnoses, medications or care instructions; if the notes include them, leave them out and say they belong in the care plan with the clinical team.
- Write respectfully, in the person's voice as far as the family can represent it; no childlike language.
- Mention past trauma only as what to avoid (for example "Please do not shout or raise your voice near me"), not as a story, unless the family asks.
</constraints>

<output_format>
## Life story profile
## Conversation starters
## Questions to complete it
## Notes for the family
</output_format>
