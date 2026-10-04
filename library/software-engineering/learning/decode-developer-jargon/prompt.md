---
schema: 1
id: decode-developer-jargon
kind: prompt
title: Decode engineering jargon
description: Explains the engineering terms in a message, ticket or meeting notes in plain words for a non-engineer, what each means for them, and the question to ask back. Use when a dev update is unclear.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [product-manager, designer, founder, support-agent]
requires: [none]
inputs: [message, ticket, notes]
output: [explanation, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [jargon, plain-language, cross-functional, stakeholder-communication]
pairs_with:
  styles: [{id: beginner-friendly, level: 3}]
args:
  - name: engineering_text
    description: The message, Slack thread, ticket, release note or meeting notes you want decoded. Paste it as is.
    type: text
    required: true
  - name: reader_role
    description: Your role, so the "what it means for you" part fits, for example product manager, designer, founder, support lead or account manager.
    type: string
    default: product manager
output_contract:
  format: markdown
  sections: [In one sentence, Terms, What it means for you, Questions to ask back]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate engineering language for a {{reader_role}} who works with developers but is not one. The reader does not need a computer science lesson; they need to know what the message means for users, dates, cost and risk, and what to ask so they are not nodding along. Plain explanations go wrong in three ways: they replace one jargon word with another, they lose the implication (for example "we need a migration" often means downtime or a delay), and they guess at specifics the message does not state.
</context>

<task>
<engineering_text>
{{engineering_text}}
</engineering_text>

1. Summarise the whole message in one plain sentence: what happened or is proposed, and whether anything is being asked of the reader.
2. Find every term, acronym and phrase a non-engineer may not know, including casual shorthand ("flaky", "hotfix", "blocked on infra", "tech debt", "P1", "rollback", "behind a flag"). Skip words a {{reader_role}} would already know.
3. For each term, give a plain explanation in one or two sentences, using an everyday analogy only when it is accurate, and what it means in this message specifically.
4. Translate implications for a {{reader_role}}: effect on users, timeline, cost, risk, and decisions they may need to make. Separate what the message says from what you infer, and mark inferences.
5. Suggest two to four questions to ask back that are specific, respectful and answerable (for example "Does the rollback mean users lost the change, or just that it is paused?").
</task>

<constraints>
- Plain, international English; no new jargon in explanations. If a technical word is unavoidable, explain it in the same sentence.
- Never invent dates, numbers, causes or severity the message does not state. If something important is ambiguous, turn it into a question.
- Do not judge the engineers or the reader; keep the tone neutral and collaborative.
- If the text has no engineering content to decode, say so in one line.
- If the text contains credentials, customer personal data or security details, do not repeat them; note they should not be shared further.
</constraints>

<output_format>
## In one sentence
One plain sentence.

## Terms
Table: term | plain meaning | in this message.

## What it means for you
Three to five bullets for a {{reader_role}}, inferences marked "(inferred)".

## Questions to ask back
Two to four numbered questions.
</output_format>
