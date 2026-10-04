---
schema: 1
id: decode-voicemail-messages
kind: prompt
title: Understand voicemail messages
description: Runs a listening-style drill of realistic voicemails in a target language from clinics, schools, couriers, landlords and employers, where the learner picks out who, what, when and the action needed.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [preferences]
output: [quiz, explanation, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [voicemail, phone-calls, listening-drill, key-word-listening, newcomers, scam-awareness]
pairs_with:
  prompts: [practice-phone-call-in-language, drill-numbers-and-dates, practise-spelling-out-personal-details, decode-transport-announcements]
args:
  - name: target_language
    description: The language, with the country if you know it (for example "French (France)", "Norwegian", "English (Australia)").
    type: string
    required: true
  - name: level
    description: Your CEFR level. Lower levels get slower, simpler messages and guided questions; higher levels get fast, rambling or noisy messages.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: include_script_after
    description: After each answer, show the message again with the key phrases and formulas marked.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Voicemail formulas, Message drill, Report]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train people to get the essentials from voicemails in {{target_language}} at level {{level}}. Voicemails are among the hardest listening tasks: no face, no chance to ask, often a poor line, and the important parts (the caller's name, a reference number, a time, a phone number) are said fast, once, and usually at the end. They also follow predictable formulas: who is calling and from where, the reason ("regarding your appointment", "about your parcel"), the request, a deadline, and a call-back number read in local groupings. Learners who know the formulas and listen for the five slots (who, what, when, action, number) catch far more.
</context>

<task>
1. Voicemail formulas: 10 to 14 fixed phrases used in voicemails in {{target_language}} (introducing the caller, giving the reason, asking for a call back, office hours, "at your earliest convenience", reading out a number, "if you have any questions"), with meaning and the slot each introduces.
2. Run the drill one voicemail at a time. Rotate callers: a clinic or dentist, a school, a delivery company, a landlord or building manager, an employer or agency, a bank or utility, and at B1 and above a suspicious message that pressures them to call a number or pay. Write each message as spoken: fillers, self-corrections, numbers in words grouped as locals say them, the name possibly spelled. From B1, add [line breaks up] over a non-essential word or a rambling detour.
3. After the message, ask for the five slots: who called, what about, when (date, time, deadline), what they must do, and any number or reference. At A1 and A2, ask these as separate short questions with options where useful.
4. After the learner answers: mark each slot right or wrong, give the correct details, and{{#include_script_after}} show the message again with the formulas in bold and the slot answers underlined or marked, and{{/include_script_after}} name the one listening tip that would have helped. For the suspicious message, explain the warning signs and say never to call back numbers or pay from a voicemail, but to use the organisation's official contact details.
5. Keep a score by slot. After about eight messages or when the learner stops, give the report.
</task>

<constraints>
- One voicemail per message; never answer the slot questions yourself before the learner replies.
- Invent all names, numbers and companies, and make them sound local but clearly fictional; never use real organisations' phone numbers.
- Use the country's real formats for times, dates and phone-number grouping; if the country is unknown and formats differ, ask in one line or state your assumption.
- Suggest pasting each message into a text-to-speech tool at normal or faster speed and listening without looking, then answering.
- Keep messages realistic in length: 20 to 40 seconds of speech at A1 and A2, up to about 60 seconds at C1 and C2.
</constraints>

<output_format>
Your first reply holds Voicemail formulas and the first message only; each later reply holds the feedback and the next item; the Report comes once, at the end.
## Voicemail formulas
Table: phrase | meaning | slot it introduces.
## Message drill
"Message N", the voicemail in a quote block, then the slot questions, then wait. Feedback per slot with ✓ or ✗ and the correct detail, then the marked-up script if enabled, and one tip.
## Report
Score by slot (who, what, when, action, number), the formulas they missed, and a three-step routine for real voicemails (listen once for the reason, again for numbers, write the call-back number before calling).
</output_format>
