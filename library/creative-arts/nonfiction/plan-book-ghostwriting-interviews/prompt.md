---
schema: 1
id: plan-book-ghostwriting-interviews
kind: prompt
title: Plan ghostwriting interviews for a book
description: Plans the series of interviews a ghostwriter runs with a client to write their book, session by session, with goals, questions that draw out stories and voice, and a record of what was agreed.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ghostwriting, client-interviews, voice-capture, collaboration, book-planning]
pairs_with:
  prompts: [build-story-bank, outline-nonfiction-book]
args:
  - name: project
    description: What the client's book is, who it is for, the client's background, how much they have already written or said in public, and the deadline.
    type: text
    required: true
  - name: sessions
    description: How many interview sessions you can have, and their length.
    type: string
    default: 8 sessions of 90 minutes
output_contract:
  format: markdown
  sections: [Session plan, Questions by session, Voice capture, Agreements and records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help ghostwriters plan the interviews behind a client's book. A ghostwriter's raw material is the client's talk, so the interviews decide the book. Experienced ghostwriters front-load the big picture (the book's promise and the client's reasons), then go chapter by chapter; ask for specific moments rather than lessons ("tell me about the day you nearly closed the company", not "what did you learn about resilience"); record and transcribe everything; note the client's own phrases, metaphors and jokes, since voice lives there; check facts and names as they go; and agree early what the client will not discuss, who else may be interviewed, and how drafts are reviewed. Clients often give polished talk-circuit answers at first; follow-ups get past them.

<project>
{{project}}
</project>
Sessions: {{sessions}}
</context>

<task>
1. Session plan: a goal for each session within the number given (kick-off on promise, reader and boundaries; life or career arc; chapter-by-chapter sessions; a gaps and fact-check session; a voice review session), with what to prepare and what the client should bring (documents, photos, people to contact).
2. Questions by session: eight to twelve questions per session, open and moment-focused, with follow-up prompts to get beneath rehearsed answers ("what did you actually say?", "who else was in the room?").
3. Voice capture: what to listen and note for (recurring phrases, sentence rhythm, humour, words they never use), and a short voice sheet template.
4. Agreements and records: what to agree in the kick-off (boundaries, other interviewees, review and approval rounds, how the client's name and claims will be checked), and the record to keep after each session (recording file, transcript, quotes, facts to verify, open questions).
</task>

<constraints>
- Do not suggest inventing experiences, quotes or credentials for the client; the book must contain only what the client lived, said or can source.
- Note that terms on credit, confidentiality and fees belong in the written contract; do not draft those terms here.
- Recommend checking consent rules for recording and for interviewing third parties in the relevant country.
- Keep questions neutral; do not lead the client toward a story the ghostwriter prefers.
</constraints>

<output_format>
## Session plan
Table: Session | Goal | Prepare | Client brings.

## Questions by session
One subsection per session.

## Voice capture
Notes and a voice sheet template.

## Agreements and records
Kick-off agreements; post-session record fields.
</output_format>
