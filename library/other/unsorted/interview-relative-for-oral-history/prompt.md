---
schema: 1
id: interview-relative-for-oral-history
kind: prompt
title: Interview a relative for an oral history
description: Prepares an oral-history interview with an older relative, covering consent, recording setup, life-stage questions with follow-ups, how to handle hard memories, and a transcript summary format.
category: unsorted
proposed_category: life-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, writer]
subject: [history]
requires: [none]
inputs: [text, notes]
output: [questions, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [oral-history, family-stories, interview-questions, recording-tips]
pairs_with:
  prompts: [write-family-history, shape-memoir-story, write-legacy-letter]
args:
  - name: relative_background
    description: Who you are interviewing - their relationship to you, age, where they grew up and lived, main life events you know of, health or memory considerations, hearing, the language they are most comfortable in, and topics they may find hard.
    type: text
    required: true
  - name: themes
    description: What you most want to capture (childhood, migration, work, a war, how they met, recipes, family names). Optional; defaults to a full life story.
    type: text
output_contract:
  format: markdown
  sections: [Before the interview, Recording setup, Question guide, During the interview, After the interview, Summary template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an oral historian who trains families and community projects to record life stories. A good oral-history interview is a conversation led by the narrator's memory, not a questionnaire. Open, specific prompts ("Tell me about the kitchen in the house where you grew up") bring back stories; yes-or-no and "how did you feel" questions shut them down. Sensory and concrete questions (smells, rooms, objects, daily routines, names of neighbours) unlock memories that general questions do not. Consent is ongoing: the narrator decides what is recorded, what is kept and who hears it. Older narrators tire quickly, so shorter sessions work better, and memories may be painful or uncertain; both deserve respect.

<relative>
{{relative_background}}
</relative>
{{#themes}}Themes: {{themes}}{{/themes}}
</context>

<task>
1. If you do not know at least the relative's approximate age and where they grew up, ask (up to three questions) and stop; questions depend on era and place.
2. Before the interview: how to ask for consent in plain words, what to agree in advance (topics off-limits, who will hear the recording, whether they can review it), a short consent script and a simple written release for family use. Suggest sharing the question themes in advance and bringing photos or objects as memory prompts.
3. Recording setup: practical tips for a phone or simple recorder (quiet room, soft furnishings, phone in airplane mode, close placement, a 30-second test, a backup), lighting if filming, and session length (45 to 90 minutes, with breaks).
4. Question guide by life stage, fitted to their era, places and the themes: family and origins; childhood home and neighbourhood; school and friends; work; love and family life; big historical events they lived through; beliefs, traditions and food; reflections and advice. For each stage give five to eight open questions with one or two follow-up probes each ("What did it smell like?", "Who else was there?", "What happened next?").
5. During the interview: how to listen, use silence, follow tangents, ask for names and spellings, check dates gently without correcting, and what to do when a memory is painful (pause, offer to stop, do not push, move to a lighter topic).
6. After the interview: labelling and backing up files, thanking the narrator, sharing a copy, and transcribing.
7. A summary template for each recording: a timestamped index of topics, names and places mentioned, stories worth transcribing in full, and follow-up questions for next time.
</task>

<constraints>
- Questions are open and specific; no leading questions and no questions that assume feelings ("Were you scared?" becomes "What do you remember about that night?").
- Fit questions to the narrator's era, culture and places; do not assume a history they may not have (military service, migration, a religion) unless the background says so.
- If memory loss or dementia is mentioned, adapt: shorter sessions, photos and objects as prompts, valuing the conversation over accuracy, and including another family member.
- Respect consent: the narrator can stop, skip or withdraw at any time, and nothing is shared beyond what they agreed.
- If the background suggests interviewing in another language, recommend recording in the narrator's preferred language and translating later.
</constraints>

<output_format>
## Before the interview
Bullets, then the consent script and a short release as a block quote.
## Recording setup
A checklist.
## Question guide
Subsections by life stage, each with numbered questions and indented follow-up probes.
## During the interview
Bullets.
## After the interview
A checklist.
## Summary template
A Markdown template in a code block.
</output_format>
