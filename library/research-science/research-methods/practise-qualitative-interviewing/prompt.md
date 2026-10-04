---
schema: 1
id: practise-qualitative-interviewing
kind: prompt
title: Practise a qualitative research interview
description: Lets a researcher practise a semi-structured research interview with a simulated participant, then reviews their probing, neutrality, consent language and missed follow-ups with examples.
category: research-methods
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [researcher, student, ux-researcher]
requires: [none]
inputs: [document, text]
output: [conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [qualitative-interviewing, rehearsal, probing, interviewer-training, research-ethics]
pairs_with:
  prompts: [write-research-interview-protocol, run-thematic-analysis, write-informed-consent-form]
  personas: [research-methodologist]
args:
  - name: protocol
    description: Your interview guide - the research question, consent script, main questions and planned probes.
    type: text
    required: true
  - name: participant_type
    description: Who you will interview in the real study, for example "night-shift nurses", "small farmers who stopped using a subsidy scheme" or "parents of autistic teenagers".
    type: string
    required: true
  - name: sensitivity
    description: How sensitive the topic is. low is everyday experience; moderate touches personal or work difficulties; high touches distress, trauma, illness or loss, and the participant may become upset so you can practise your distress protocol.
    type: enum
    enum: [low, moderate, high]
    default: low
output_contract:
  format: markdown
  sections: [Set-up, Interview, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Interview skill comes from practice, and most researchers first practise on real participants. Common problems are reading the guide like a questionnaire, asking leading or double-barrelled questions, filling silences, agreeing with or reassuring the participant in ways that steer answers, missing the follow-up that would have produced the richest data, rushing consent, and freezing when a participant becomes upset. A realistic rehearsal partner gives the interviewer short answers, tangents, vague generalities and an emotional moment to work with, then gives specific feedback tied to what was actually said. Rehearsal does not replace supervision, ethics training or the study's approved distress protocol.
</context>

<task>
Run a practice interview. I am the interviewer; you play a participant who is one of: {{participant_type}}. Sensitivity: {{sensitivity}}.

<protocol>
{{protocol}}
</protocol>

Set-up (first turn only):
1. Describe the participant you will play in three or four lines: a fictional composite (not a real person), with an age range, circumstances relevant to the research question, and one or two traits that make interviewing them realistic (for example guarded at first, talks in generalities, goes off on tangents). Keep their full story hidden so I have to draw it out.
2. Remind me that I can type "pause" to step out of the role-play and "end interview" to finish and get the debrief. Then wait for me to begin with my introduction and consent.

During the interview:
3. Stay in character. Answer as this participant would, with realistic length: short answers to closed questions, richer answers only when I probe well, the occasional "I don't know, it's just how it is" that needs a follow-up, and a few concrete stories available only to good probes.
4. React to how I ask: become more guarded after a leading or judgemental question, more open after a good open question or reflective listening.
5. At moderate sensitivity, include one moment of discomfort. At high sensitivity, become upset once at a point that fits the topic, so I can practise pausing, checking in, offering a break or to stop, and following the protocol. If I handle it well, recover gradually; never escalate to danger or self-harm content.
6. On "pause", answer my out-of-role question briefly, then return to character.

Debrief (on "end interview"):
7. Assess consent: whether I covered the purpose, voluntary participation, the right to skip or stop, recording, confidentiality and its limits, and checked understanding.
8. Assess the interview against the protocol: coverage of main questions, the talk ratio (roughly how much I spoke), open versus closed and leading questions, probing (quote two or three moments where a follow-up was missed and suggest the follow-up), neutrality (reassurance, agreement or interpretation that could steer), silences, and the closing.
9. At moderate or high sensitivity, assess how I handled the difficult moment against good practice and my protocol.
10. Give the three changes that would most improve my next interview, and rewrite up to three of my questions.
</task>

<constraints>
- The participant is fictional; never present them as a real person or base them on one.
- Quote my actual words in the debrief; do not invent things I said.
- Keep in-character replies to the length a real participant would give, not paragraphs of ideal data.
- Keep distress realistic but bounded; if I seem distressed myself, step out of the role-play and check in.
- If the protocol has no research question or questions, ask for them before starting and stop.
</constraints>

<output_format>
## Set-up
First turn: the participant sketch and the commands.
## Interview
In-character replies only, no headings or commentary, until I type "pause" or "end interview".
## Debrief
Consent, Interview technique (with quoted examples and suggested follow-ups), Handling the difficult moment (if applicable), Three changes, Rewritten questions.
</output_format>
