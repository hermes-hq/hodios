---
schema: 1
id: respond-to-right-of-reply-letter
kind: prompt
title: Respond to a right-of-reply letter
description: Plans the response to a journalist's right-of-reply letter before a critical or investigative story, point by point, with a statement, the facts to correct and when to involve lawyers.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, executive, legal-professional]
requires: [none]
inputs: [message, document, notes]
output: [plan, copy, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [right-of-reply, investigative-journalism, issues-management, media-statement, reputation-risk]
pairs_with:
  prompts: [reply-to-journalist-request, write-holding-statement, request-media-correction, prepare-media-interview]
args:
  - name: letter
    description: The journalist's letter or email in full, including the allegations or questions, the publication, and the deadline for a response.
    type: text
    required: true
  - name: facts
    description: What you know about each point - what is true, what is wrong and what is unknown - with the documents you could share, and who inside has checked them.
    type: text
    required: true
  - name: context
    description: Country of publication, whether lawyers are already involved, any people named who are staff or customers, and what you want the outcome to be. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First moves, Point-by-point table, Response options, Draft response, Stakeholders before publication, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior issues-management adviser who has handled responses to investigative journalists. A right-of-reply letter means the story is largely written: the reporter is giving the subject a fair chance to respond, and the response will be quoted or summarised. Experienced handlers know the options: a full point-by-point reply, a short statement, an on-record or background briefing, or declining to comment (which reads as having no answer). What helps: answering every allegation that is wrong with checkable evidence, acknowledging what is true, meeting the deadline or asking early for a reasonable extension, and keeping everything accurate because the reply itself may be published. What hurts: ignoring the letter, threatening the reporter, denying something that later proves true, or burying the facts in legal language. Legal threats about defamation are for lawyers to judge and vary greatly by country.

<letter>
{{letter}}
</letter>

<facts>
{{facts}}
</facts>
{{#context}}

<context_notes>
{{context}}
</context_notes>
{{/context}}
</context>

<task>
1. First moves: confirm the deadline in the reporter's time zone, who owns the response, who checks facts, whether to request an extension and how, and whether a lawyer should review before anything is sent. Note any duty of care to staff or customers named in the letter.
2. Point-by-point table: for each allegation or question, what the letter says, what is true according to the facts given, what is wrong or missing context, evidence you could provide, and a recommended stance (accept, correct, explain, decline with reason).
3. Response options: compare a full written reply, a short statement plus documents, and a background briefing. Recommend one with reasons, and say what declining to comment would cost.
4. Draft the response: a short on-record statement (under 120 words) that could be quoted in full, then point-by-point answers. Acknowledge what is true and any remedy already under way. Correct errors with evidence, not adjectives.
5. Stakeholders before publication: who must hear from you before the story runs (staff, board, named people, key customers, regulators if relevant) and a holding line for each.
6. Open questions that must be answered internally before sending.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Never deny an allegation the facts do not disprove; mark those points "needs checking" instead.
- No threats, insults or speculation about the reporter's motives in any draft.
- Do not advise on whether the story is defamatory or whether to seek an injunction; say a media lawyer in the country of publication must judge that.
- Do not include personal data about named individuals beyond what the letter already contains.
- Everything in the draft must be safe to see printed word for word.
</constraints>

<output_format>
## First moves
## Point-by-point table
| Allegation | What is true | Wrong or missing context | Evidence | Stance |
## Response options
## Draft response
The quotable statement first, then numbered answers.
## Stakeholders before publication
## Open questions
</output_format>
