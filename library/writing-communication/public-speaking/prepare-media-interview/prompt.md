---
schema: 1
id: prepare-media-interview
kind: prompt
title: Prepare for a media interview
description: Prepares a spokesperson for a press, radio or podcast interview with three key messages, proof points, bridging lines, likely hostile questions and a practice round.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [founder, executive, researcher, individual]
requires: [none]
inputs: [text, notes]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [media-training, key-messages, bridging, soundbites, spokesperson, press-interview]
pairs_with:
  prompts: [prepare-for-tough-questions, handle-social-media-backlash]
  personas: [speaking-coach]
args:
  - name: topic_and_organisation
    description: What the interview is about, who you are and represent, what you want the audience to take away, and the facts, figures and examples you can use.
    type: text
    required: true
  - name: outlet_and_format
    description: "Optional: the outlet, journalist or host, and the format, for example \"live local radio, 4 minutes\", \"print feature, phone interview\" or \"60-minute industry podcast\"."
    type: string
  - name: sensitive_issues
    description: "Optional: topics you expect or fear (a recent incident, layoffs, a lawsuit, criticism) and anything you cannot discuss and why."
    type: text
output_contract:
  format: markdown
  sections: [Interview brief, Key messages, Bridging lines, Tough questions, Traps to avoid, Practice round]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An interview is not a conversation the spokesperson controls, but it is one they can prepare for. Media trainers teach the same core: decide the three messages the audience should remember, back each with a proof point (a number, an example, a story), keep answers to the length the format uses, and when a question goes elsewhere, answer it honestly and briefly, then bridge back to a message. Live broadcast wants 10-to-20-second answers; print journalists quote the most vivid sentence, including careless ones; podcasts allow longer stories but still cut. Spokespeople get hurt by speculation, hypotheticals, repeating a hostile question's loaded words, filling silences, saying "no comment", and assuming anything is off the record.
</context>

<task>
Prepare me for this interview.

<topic_and_organisation>
{{topic_and_organisation}}
</topic_and_organisation>
{{#outlet_and_format}}Outlet and format: {{outlet_and_format}}{{/outlet_and_format}}
{{#sensitive_issues}}
<sensitive_issues>
{{sensitive_issues}}
</sensitive_issues>
{{/sensitive_issues}}

1. If it is unclear what the interview is about or what I want the audience to take away, ask up to three questions and stop. If the format is not given, assume a 10-minute recorded interview and say so.
2. Interview brief: the likely angle of the story, what the journalist or host needs from me, the audience, and the answer length to aim for in this format.
3. Three key messages, each one sentence in plain language, with two proof points from my material and a soundbite version under 20 words.
4. Bridging lines: five or six honest phrases to move from a question back to a message.
5. Tough questions: the eight to ten most likely difficult, hostile or off-topic questions, hardest first, including the sensitive issues. For each, a short honest answer that addresses the question before any bridge, and what not to say.
6. Traps to avoid for this format.
7. Practice round: offer to play the journalist, asking one question at a time and giving brief feedback on length, directness and whether I landed a message.
</task>

<constraints>
- Honesty first: never suggest misleading, denying known facts, or dodging a direct question entirely. Bridging comes after a real answer. Where I cannot discuss something, give an honest reason to say ("It's before the courts, so I can't comment on the details, but what I can tell you is…").
- Use only facts and figures from my material. Mark gaps as `[NEEDED: …]` and do not invent statistics, quotes or examples.
- Plain words, no jargon or corporate filler; messages must make sense to someone hearing them once.
- Do not repeat a hostile question's loaded words in suggested answers.
- If the sensitive issues involve legal exposure, a regulator, an active investigation, safety incidents or harm to people, say once that legal and communications advisers should review the messages before the interview.
- If the interview concerns an incident where people were harmed, lead with acknowledgement of those affected before any organisational message.
</constraints>

<output_format>
## Interview brief
Four or five bullets: angle, what they need, audience, answer length, format notes.
## Key messages
Three numbered messages, each with proof points and a soundbite.
## Bridging lines
Bullets.
## Tough questions
A table: Question | Answer (two to four sentences) | Don't say.
## Traps to avoid
Four to six bullets for this format.
## Practice round
One line offering the practice and how it will work.
</output_format>
