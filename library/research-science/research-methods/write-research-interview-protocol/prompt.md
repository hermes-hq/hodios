---
schema: 1
id: write-research-interview-protocol
kind: prompt
title: Write a research interview protocol
description: Writes a semi-structured research interview protocol with a consent script, question themes, probes, timing and reflexivity notes, tied to the research question. For qualitative researchers.
category: research-methods
version: 1.1.0
status: incubating
stage: [design]
role: [researcher, student, ux-researcher]
requires: [none]
inputs: [text, notes]
output: [script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [qualitative, semi-structured-interview, interview-guide, informed-consent, reflexivity]
pairs_with:
  prompts: [run-thematic-analysis, build-qualitative-codebook, write-ethics-application]
  personas: [research-methodologist]
args:
  - name: research_question
    description: The study's research question or aims, and the qualitative approach if you have one (for example phenomenology, grounded theory, thematic analysis, case study).
    type: text
    required: true
  - name: participants
    description: Who you will interview and how you will reach them, for example "8-12 community nurses in rural clinics, recruited via their professional network". Note anything sensitive about the topic or group.
    type: text
  - name: duration_minutes
    description: Planned interview length in minutes.
    type: number
    default: 60
  - name: mode
    description: How the interviews happen.
    type: enum
    enum: [in-person, video, phone]
    default: video
output_contract:
  format: markdown
  sections: [Protocol overview, Before the interview, Opening and consent, Interview guide, Distress and disclosure procedure, Closing, After the interview, Reflexivity notes, Pilot checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.1.0, note: "Gives the distress and disclosure procedure its own section before the closing, with wording for pausing or stopping and the limits of confidentiality, so it is ready during the interview rather than filed after it."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A semi-structured interview protocol keeps interviews comparable without turning them into a spoken questionnaire. Good guides translate the research question into a few broad themes, ask open, non-leading questions that invite stories about concrete experiences ("Tell me about the last time…"), and rely on probes to go deeper. They start easy and move to sensitive topics once rapport exists, leave room for what the participant raises, and fit the time. The research question itself is never asked directly. Ethics is part of the protocol: consent is an ongoing conversation, participants can skip questions or stop, and the interviewer knows what to do if someone becomes distressed or discloses risk. Reflexivity notes record how the interviewer's own position may shape what is said and heard.
</context>

<task>
Write an interview protocol for a {{duration_minutes}}-minute {{mode}} interview.
<research_question>
{{research_question}}
</research_question>
{{#participants}}
<participants>
{{participants}}
</participants>
{{/participants}}

1. Turn the research question into three to five interview themes, and show which part of the question each theme serves.
2. For each theme, write one or two main open questions and three to five probes: detail ("Can you walk me through that?"), example ("What happened the last time?"), meaning ("What did that mean for you?"), contrast, and clarification. Avoid leading, double-barrelled and yes or no questions, and jargon the participants would not use.
3. Order the themes from easy and descriptive to reflective and sensitive, and give each a time allocation that adds up to {{duration_minutes}} minutes with five to ten minutes for opening and closing.
4. Write the opening script: thanks, purpose in plain language, recording and how data will be stored and anonymised, voluntary participation, the right to skip questions, pause or withdraw, and confirming consent on the recording. Mark where study-specific details from the approved ethics documents must be inserted.
5. Write the closing: an open "anything we have not covered?" question, a short debrief, next steps, and where to get support if the topic is sensitive.
6. Add practical notes for {{mode}} interviews (connection or recording checks, privacy of the participant's location, a backup plan).
7. Write a distress and disclosure procedure the interviewer can use mid-interview: signs to watch for, the words to offer a pause, skip or stop, when to end the interview and not resume, what to do if a participant discloses a risk of harm to themselves or others (follow the study's approved safeguarding and referral procedures, within the limits of confidentiality stated at consent), and placeholders for local support contacts.
8. Write reflexivity prompts for the interviewer to answer before and after each interview.
9. List what to check in a pilot interview.
</task>

<constraints>
- Questions must be open and neutral. Rewrite any that presume an answer.
- Do not invent ethics approval numbers, data-protection details or support-service contacts. Use placeholders such as [ETHICS REF] and [LOCAL SUPPORT CONTACT].
- Keep the number of main questions realistic for the time: roughly one main question per five to eight minutes of interview.
- If the participants are a vulnerable group (children, people in crisis, patients, people in a dependent relationship with the researcher), add the extra safeguards this needs and flag that the ethics committee must approve the protocol.
- If the research question is not suited to interviews (for example it asks for prevalence or effect sizes), say so and suggest a better method before writing the guide.
</constraints>

<output_format>
## Protocol overview
Research question, approach, participants, mode, duration, themes with the part of the question each serves.
## Before the interview
Checklist.
## Opening and consent
Script, with placeholders in square brackets.
## Interview guide
For each theme: a heading with minutes, main question(s) in bold, probes as bullets.
## Distress and disclosure procedure
Numbered steps the interviewer can follow during the interview, with example wording and placeholders for contacts.
## Closing
Script.
## After the interview
Field notes template and data-handling steps.
## Reflexivity notes
Prompts before and after.
## Pilot checklist
Bullets.
</output_format>
