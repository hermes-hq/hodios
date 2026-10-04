---
schema: 1
id: brief-me-on-topic
kind: prompt
title: Brief me on an unfamiliar topic
description: Gets someone up to speed on an unfamiliar topic before a meeting or decision, with key terms, main players, live debates, common misconceptions and smart questions, flagging what may be out of date.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, manager]
requires: [none]
inputs: [topic]
output: [summary, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [briefing, meeting-prep, get-up-to-speed, glossary]
pairs_with:
  prompts: [explain-state-of-evidence, synthesize-sources-into-brief]
args:
  - name: topic
    description: The topic, as specific as you can make it, for example "carbon credit markets for corporate buyers" rather than "climate".
    type: string
    required: true
  - name: purpose
    description: Why you need it and what happens next, for example "meeting with a carbon credit vendor on Thursday", "joining the payments team next week".
    type: string
    required: true
  - name: minutes_to_read
    description: How long you have to read the brief. About 230 words per minute.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [In a nutshell, Key terms, Main players, Live debates, Common misconceptions, Questions to ask, Check before relying on this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The reader walks into a meeting or decision soon on a topic they do not know. They do not need a textbook chapter; they need enough to follow the conversation, avoid the obvious mistakes, and ask questions that show they did their homework. They also need to know which parts of your briefing could be stale, because your knowledge has a cutoff and fast-moving topics change.

Topic: {{topic}}
Purpose: {{purpose}}
Reading time: {{minutes_to_read}} minutes (about {{minutes_to_read}} x 230 words).
</context>

<task>
1. If the topic is ambiguous (it could mean two different fields) or too broad to brief in the time, ask one question to narrow it, offering two or three readings. Stop there.
2. Decide what the purpose needs. A vendor meeting needs the pricing and quality debates; joining a team needs vocabulary and who does what; a decision needs the trade-offs.
3. Write the brief, weighted to the purpose:
   - **In a nutshell:** what the topic is and why it matters now, in three or four sentences.
   - **Key terms:** five to ten terms the reader will hear, each defined in one line in plain language. Include any jargon that sounds like everyday language but means something specific here.
   - **Main players:** the kinds of organisations, roles or schools of thought involved, and well-established names only where you are confident they are accurate.
   - **Live debates:** the two to four questions people in the field actually disagree about, with the main positions and why they differ.
   - **Common misconceptions:** what newcomers usually get wrong, and the correct picture.
   - **Questions to ask:** five to eight questions tuned to the purpose, from basic but sharp to the ones that test the other side's claims.
   - **Check before relying on this:** the parts most likely to have changed since your knowledge was current (prices, regulations, market shares, leaders, recent events), and what kind of source to check each against.
4. Fit the length to the reading time. Cut breadth before cutting the debates and questions.
5. Before answering, check every name, figure and date you included. Remove any you are not confident of, or mark it "verify".
</task>

<constraints>
- No invented figures, names, laws or dates. Give a number only if you are confident of it, with its year; otherwise describe the order of magnitude or leave it out.
- Present debates fairly, with each position in terms its holders would accept. Do not pick a winner unless the evidence is lopsided, and then say so plainly.
- Plain language. Define jargon on first use.
- This is a briefing to orient, not a lesson on one concept and not advice. For medical, legal or financial topics, orient the reader and point them to a qualified professional for decisions about their own situation.
</constraints>

<output_format>
## In a nutshell
## Key terms
Bullets: **term** - definition.
## Main players
## Live debates
For each: the question, then the positions in one line each.
## Common misconceptions
Bullets: misconception -> correct picture.
## Questions to ask
Numbered, ordered from foundational to probing.
## Check before relying on this
Bullets: what may be stale -> where to check.
</output_format>
