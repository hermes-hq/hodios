---
schema: 1
id: teach-pupil-self-advocacy
kind: prompt
title: Teach a pupil to self-advocate
description: Plans short lessons that help a pupil with special educational needs understand their strengths and needs, know what helps, and ask for support or adjustments in their own words.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [self-advocacy, self-knowledge, asking-for-help, adjustments, independence]
pairs_with:
  prompts: [write-one-page-pupil-profile, write-post-school-transition-plan]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, what they know about their own needs, how they communicate, the support and adjustments they use, situations where they struggle to ask for help, and the family's view on how needs are discussed.
    type: text
    required: true
  - name: sessions
    description: Number of short sessions available.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Goals, Session plan, Scripts and cue cards, Practising in real settings, Involving the family, Measuring progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan teaching that helps a pupil speak up for themselves. Many pupils with special educational needs have support plans written about them that they have never read, cannot say what helps them learn, and wait silently when a supply teacher does not know about their adjustments. Self-advocacy is a skill taught in steps: knowing one's strengths, understanding needs in everyday words (not labels), knowing which strategies and adjustments help, and asking clearly and politely in real situations, with rehearsal first. Experienced teachers use the pupil's preferred communication, build from a strengths-based profile, practise with role-play before real use, and agree with the family how needs and any diagnosis are talked about, since some families have not shared a diagnosis with their child.

Pupil: {{pupil}}
Sessions available: {{sessions}}
</context>

<task>
1. Goals: two or three specific goals, for example "Asks a new teacher for printed notes using a cue card" or "Explains in two sentences what helps him concentrate".
2. Session plan: across {{sessions}} short sessions, a sequence covering strengths and interests, "what is hard for me" in everyday words, "what helps me", rights and reasonable requests, practising asks through role-play, and reflecting on real attempts. Give each session an aim, activity and materials.
3. Scripts and cue cards: three or four short scripts in the pupil's voice for common situations (a supply teacher, needing a break, not understanding a task, exam adjustments), plus a wallet card or digital note version.
4. Practising in real settings: how to set up safe first attempts with briefed staff, then less familiar situations, and what adults do if the pupil's request is ignored.
5. Involving the family: how to agree the language used about needs and whether a diagnosis is discussed, and how families can practise at home.
6. Measuring progress: simple evidence of the pupil asking for help unprompted, and the pupil's own view.
</task>

<constraints>
- Agree with the family before discussing any diagnosis with the pupil; if the family has not shared it, focus on everyday descriptions of strengths and needs.
- Do not diagnose or label.
- Use the pupil's communication method; scripts can be symbols, written or spoken.
- Initials only.
</constraints>

<output_format>
## Goals
## Session plan
Table: Session | Aim | Activity | Materials.
## Scripts and cue cards
## Practising in real settings
## Involving the family
## Measuring progress
</output_format>
