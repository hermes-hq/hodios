---
schema: 1
id: write-focus-group-guide
kind: prompt
title: Write a focus group guide
description: Writes a timed focus group guide with the moderator's introduction, ground rules, questioning route, probes, group activities and moderation notes for managing group dynamics.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student, ux-researcher, marketer]
requires: [none]
inputs: [text, topic]
output: [docs, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [focus-groups, qualitative-research, moderator-guide, questioning-route, group-interviews]
pairs_with:
  prompts: [write-research-interview-protocol, write-informed-consent-form, build-qualitative-codebook, run-thematic-analysis]
  personas: [research-methodologist]
args:
  - name: topic
    description: What the groups are for - the research question or aims, and what decisions the findings will feed.
    type: text
    required: true
  - name: participants
    description: Who is in each group, how many per group, how groups are composed (for example by age or role), whether they know each other, and anything sensitive about the topic for them.
    type: text
    required: true
  - name: minutes
    description: Total session length in minutes, including welcome and close.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Session plan, Moderator guide, Activities and materials, Moderation notes, Assistant moderator notes, Pilot checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A focus group produces data from interaction: participants react to each other, compare views and show how a group talks about a topic. That makes it good for shared norms, language and reactions, and poor for individual histories or sensitive personal disclosures. A good guide follows a questioning route (Krueger's sequence of opening, introductory, transition, key and ending questions), spends most of the time on a handful of key questions, uses activities to get everyone talking, and gives the moderator plans for dominant talkers, quiet participants, off-topic drift and conflict. The research question is never asked as such.
</context>

<task>
Write a {{minutes}}-minute focus group guide.
<topic>
{{topic}}
</topic>
<participants>
{{participants}}
</participants>

1. Check fit. If the aim needs numbers (how many, what percentage, willingness to pay), say a focus group cannot deliver them, name the right method, and offer a guide that explores reasons and reactions instead. If the topic needs individual, private or highly sensitive accounts, say so and suggest interviews or a different group composition, then continue with adjustments.
2. Write the welcome script: thanks, who the moderators are, purpose in plain words, recording and confidentiality (including that the team cannot guarantee others in the room will keep confidences), voluntary participation, and ground rules (one person at a time, no right or wrong answers, disagreement welcome, phones).
3. Write the questioning route with timings that add up to {{minutes}} minutes:
   - Opening: a quick round everyone answers, factual and easy.
   - Introductory and transition questions that bring the topic in through experience.
   - Three to five key questions with most of the time, each with probes and a note on what it serves.
   - Ending questions: an all-things-considered question, a summary check by the moderator, and "Is there anything we missed?".
4. Add one or two activities that suit the topic and group (for example card sorting, ranking, reacting to a scenario or prototype, a timeline), with materials and how to capture the output.
5. Write moderation notes: managing dominant and quiet participants with sample phrases, keeping neutral, handling drift and conflict, and what to do if someone is distressed.
6. Write the assistant moderator's notes: seating map, speaker identifiers, non-verbal reactions, timekeeping, and the debrief questions right after the session.
</task>

<constraints>
- Questions are open, short, one idea each, in the participants' language; no leading or yes or no questions.
- Key questions get at least half the session; cut lower-priority questions to fit {{minutes}} minutes rather than rushing them.
- Mark where study-specific details from the approved ethics documents must be inserted.
- Keep to six to ten participants per group as the default; if the participant description implies otherwise, say what changes.
</constraints>

<output_format>
## Session plan
A table: segment | minutes | purpose.
## Moderator guide
The full script with questions numbered, probes indented beneath, and timing in brackets.
## Activities and materials
Each activity with instructions, materials and capture method.
## Moderation notes
Situations and what to say or do.
## Assistant moderator notes
The note template and the debrief questions.
## Pilot checklist
What to test in a pilot session.
</output_format>
