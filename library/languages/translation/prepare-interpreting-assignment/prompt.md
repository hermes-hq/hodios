---
schema: 1
id: prepare-interpreting-assignment
kind: prompt
title: Prepare for an interpreting assignment
description: Builds a prep sheet for a specific interpreting job from the booking details, with topic background, a bilingual glossary, names and acronyms, questions for the client and session briefing points.
category: translation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant]
requires: [none]
inputs: [text, document]
output: [checklist, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interpreting, assignment-prep, glossary, client-briefing]
pairs_with:
  prompts: [build-translation-glossary, practise-consecutive-note-taking, drill-medical-terms-for-interpreters]
  personas: [community-interpreter-mentor]
args:
  - name: language_pair
    description: The working languages and directions, with varieties if they matter, for example "German and English, both directions" or "Dari into English".
    type: string
    required: true
  - name: assignment_details
    description: Everything you know about the booking - setting, date and length, mode, who is speaking, topic, any agenda, slides, speeches or documents sent, and anything the client said. Remove confidential details you are not allowed to share.
    type: text
    required: true
  - name: mode
    description: How you will interpret.
    type: enum
    enum: [dialogue, consecutive, simultaneous, remote-video, phone]
    default: dialogue
output_contract:
  format: markdown
  sections: [Assignment summary, Topic background, Glossary, Names and acronyms, Questions for the client, Session briefing, Prep checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a working interpreter prepare for one specific assignment. Preparation is most of the job: interpreters who know the topic, the people and the terminology can listen for meaning instead of decoding words. Experienced interpreters prepare in layers: the situation (who, where, why, what is at stake), the subject (enough background to follow the logic), the terminology (in both languages and in the register the speakers will actually use), and the logistics (positioning, breaks, equipment, team). The usual gaps are terms prepared in only one direction, names and acronyms nobody checked, and no pre-session briefing, so speakers talk for three minutes without pause.

Language pair: {{language_pair}}
Mode: {{mode}}
</context>

<task>
<assignment_details>
{{assignment_details}}
</assignment_details>

1. Summarise the assignment: setting, participants and roles, purpose, length, mode, and the stakes (what goes wrong for whom if a term or figure is missed).
2. Topic background: the 5 to 8 concepts a listener needs to follow the discussion, each in one or two sentences, and the likely flow of the session (for a medical appointment: history, examination, explanation, plan; for a negotiation: positions, offers, concessions).
3. Glossary: 20 to 40 terms likely to come up, in both languages, both directions. Include the technical term and, where speakers may use it, the everyday or lay equivalent. Mark each term as confident or to verify, and give the kind of source to check (the client's documents, the relevant professional body's glossary, a specialist dictionary).
4. Names and acronyms: every person, organisation, product, place and acronym in the details, with how it is likely to be said in each language. Mark what must be confirmed (spelling, pronunciation, whether an acronym is translated).
5. Questions for the client: what is missing that changes how you work. Typical: speaker list and roles, documents or slides, whether recording is planned, the expected length and breaks, whether a co-interpreter is booked for long or simultaneous work, positioning in the room, and for remote work the platform, audio channel and a test call.
6. Session briefing, adjusted to the setting and mode: for dialogue, phone and remote community work, a short script to say to the parties before starting (introduce yourself, impartiality, everything said will be interpreted, speak to each other in the first person, pause after a few sentences, confidentiality). In court, tribunals and formal hearings the presiding officer controls the procedure, so give instead the points to raise with the clerk or usher beforehand (positioning, how to signal for a pause or repetition, documents to be read out, any oath or affirmation, whose wording varies by jurisdiction). For conference and simultaneous work, give the points to agree with organisers, speakers and the booth partner (scripts, slides, speed, handover times).
7. Prep checklist for the day before and the day itself.
</task>

<constraints>
- Use only the facts in the assignment details. Do not invent speakers, figures, organisations or agenda items; mark gaps as [X] and put them in the questions.
- Never present a glossary entry as verified. Specialist, legal and medical terms must be checked against reliable sources or the client's documents.
- Remind the interpreter once not to paste confidential documents into tools their contract or code of conduct does not allow.
- If the assignment details are only a topic with no setting or participants, ask for the booking details first and stop.
- If you are not confident in one of the languages, say so and mark more terms as to verify.
</constraints>

<output_format>
## Assignment summary
Five to seven bullets.
## Topic background
Numbered concepts, then the likely flow.
## Glossary
Table: Language A | Language B | Lay equivalent | Status (confident or to verify) | Check against.
## Names and acronyms
Table: Item | Expansion or role | How it may be said | To confirm.
## Questions for the client
Numbered, most important first.
## Session briefing
The script or the points to raise, under 120 words.
## Prep checklist
Checkbox list split into "Day before" and "On the day".
</output_format>
