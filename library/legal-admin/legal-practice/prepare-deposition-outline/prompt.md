---
schema: 1
id: prepare-deposition-outline
kind: prompt
title: Prepare a deposition outline
description: Prepares a topic-by-topic deposition outline with goals, exhibits to use, funnel questions, admissions to lock in and follow-up prompts, for the examining attorney to review.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [text, document, notes]
output: [outline, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [deposition, examination-outline, admissions, exhibits, litigation-support]
pairs_with:
  prompts: [summarize-deposition-transcript, draft-discovery-requests, index-case-documents, prepare-witness-interview]
  personas: [paralegal]
args:
  - name: witness
    description: Who is being deposed - name or placeholder, role, relationship to the parties, whether adverse, friendly or neutral, whether an individual or a corporate designee on noticed topics, and anything known about their prior statements.
    type: string
    required: true
  - name: case_issues
    description: The claims, defences and disputed facts, what this witness is expected to know about each, and what the attorney most needs from this deposition (admissions, authentication, locking in a story, discovering unknowns).
    type: text
    required: true
  - name: documents
    description: Documents available to use as exhibits, each with an identifier (Bates number or short name), date, author and why it matters. Optional; without it the outline lists documents to gather.
    type: text
output_contract:
  format: markdown
  sections: [Deposition goals, Logistics and preliminaries, Outline by topic, Admissions checklist, Exhibit list, Risks and cautions, Open items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare deposition outlines for trial lawyers the way an experienced litigator does the night before. A deposition has two jobs that pull in different directions: discovering what the witness knows (open questions, funnelling from broad to narrow, exhausting each topic with "anything else?") and locking in testimony for summary judgment and impeachment (short, leading, single-fact questions that produce clean admissions). A good outline is organised by topic, not by chronology of the file, states the goal for each topic, puts the exhibits next to the questions that use them, and leaves the attorney free to listen rather than read. Procedure (time limits, objections, corporate-designee rules) depends on the jurisdiction, so you flag what to confirm instead of asserting it.
</context>

<task>
Witness:
<witness>
{{witness}}
</witness>

Case issues and objectives:
<issues>
{{case_issues}}
</issues>
{{#documents}}

Documents available:
<documents>
{{documents}}
</documents>
{{/documents}}

1. Deposition goals: three to six concrete goals ranked by importance (for example "obtain admission that the March email was received", "authenticate Exhibit 4", "exhaust knowledge of the pricing meeting"). Say for each whether it is a discovery goal or a lock-in goal.
2. Logistics and preliminaries: the standard opening admonitions and background questions to ask (understanding of the oath, medications or anything affecting memory, documents reviewed to prepare, who they met to prepare, without asking for privileged content), adjusted for the witness type. Mark time limits and designee rules "confirm under the governing rules".
3. Outline by topic, ordered strategically (usually background, then neutral topics, then the most important topics before fatigue, with risky topics where the attorney chooses). For each topic:
   - Goal of the topic.
   - Exhibits to use, by identifier, and when to introduce them.
   - Discovery questions: open, funnel from broad to narrow, closing with exhaustion questions.
   - Lock-in questions: short leading questions, one fact each, written so a yes or a no is useful.
   - Follow-up prompts: "If the witness says X, ask Y" for the likely answers, including "I don't recall".
4. Admissions checklist: every admission the attorney wants, as a single-sentence fact, with the topic and exhibit where it is sought and a tick box.
5. Exhibit list in planned order of use.
6. Risks and cautions: topics that could open doors to harmful testimony, privilege lines to avoid crossing, instructions not to answer to expect, and where the witness's prior statements conflict with the file.
7. Open items: documents to gather, facts to confirm, and decisions for the attorney.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a working outline for the examining attorney, who decides what is asked. Mark it "DRAFT - attorney work product".
- Use only the facts and documents supplied. Do not invent exhibits, Bates numbers, dates or prior statements; use [BRACKETS] for anything missing.
- Lock-in questions are single-fact and non-compound. Discovery questions are open and non-leading.
- Never draft questions designed to harass, humiliate or intimidate the witness, to coach a friendly witness's answers, or to elicit privileged communications.
- Do not state legal conclusions as questions ("Isn't it true you breached the contract?"); ask about facts.
- Keep it usable at the table: short lines, no paragraphs inside the question lists.
- If the issues are too vague to set goals, ask up to five specific questions and give only a topic skeleton.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deposition goals
Numbered, each tagged (discovery) or (lock-in).

## Logistics and preliminaries
Bullets and the preliminary questions.

## Outline by topic
### Topic N: [name]
**Goal** · **Exhibits** · **Discovery questions** (numbered) · **Lock-in questions** (numbered) · **Follow-up prompts** (if / then bullets).

## Admissions checklist
Table: [ ] | admission sought | topic | exhibit.

## Exhibit list
Table: order | identifier | description | topic.

## Risks and cautions
Bullets.

## Open items
Checklist.
</output_format>
