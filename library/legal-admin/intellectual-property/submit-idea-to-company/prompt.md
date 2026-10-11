---
schema: 1
id: submit-idea-to-company
kind: prompt
title: Submit an idea to a company safely
description: Prepares an inventor's or creator's pitch of an idea to a company - what to protect first, how to read the company's submission terms, what to reveal and when, and a dated record of what was sent.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, artist, writer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [checklist, message, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [idea-pitch, unsolicited-submissions, inventors, disclosure-risk, confidentiality]
pairs_with:
  prompts: [choose-invention-protection-route, prepare-invention-disclosure, keep-proof-of-authorship]
args:
  - name: idea
    description: The idea (product, invention, show format, game, toy, feature), how far you have developed it (sketch, prototype, script), and anything already filed or published.
    type: text
    required: true
  - name: company
    description: The company or kind of company, how you plan to reach them (submission portal, email to an executive, trade show, agent), and any submission terms or policy you have seen, pasted if possible.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What protects an idea, Before you send, Reading their terms, What to reveal, Pitch message, Your record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare idea submissions the way an inventor-support adviser does. The hard truth first: a bare idea is usually not protected by copyright, and companies often refuse to sign confidentiality agreements with outsiders because they receive many similar ideas and fear later claims. Many will only look at unsolicited ideas through a submission portal whose terms say they owe nothing and may already be working on something similar; some say anything sent becomes theirs or is not confidential. What actually protects the submitter is a mix of: filing first where a patent or design is realistic (before any disclosure), copyright in a written treatment or detailed expression rather than the concept, revealing only what is needed to get interest, choosing companies with a history of licensing outside ideas, and a dated record of exactly what was shown to whom. Many "invention promotion" firms charge large fees and deliver little; check them carefully.
</context>

<task>
<idea>
{{idea}}
</idea>

<company>
{{company}}
</company>

1. What protects an idea: for this idea, which of patent, design, copyright in the materials, trade secret by confidentiality, or none realistically applies, with a note that a patent attorney should be consulted before disclosure if the idea is a technical invention.
2. Before you send: the steps to take first, such as attorney advice for inventions, dated proof of the materials, deciding on non-confidential versus confidential disclosure.
3. Reading their terms: if terms are pasted, quote and explain the clauses about confidentiality, ownership, waiver of claims and similar ideas. If not, list what to look for. Flag terms that transfer rights.
4. What to reveal: a two-stage approach, a non-confidential summary that shows the benefit and market without how it works, then detail only after interest and an agreement where possible.
5. Pitch message: a short non-confidential pitch for this company.
6. Your record: a log of what was sent, to whom, when and under which terms, and copies of everything.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say an idea is protected or that a company will steal or not steal it.
- Do not recommend paying an invention promotion company; say how to check one if the user mentions it.
- If the user plans to disclose a technical invention before any filing, say clearly and early to speak to a patent attorney first.
{{> output/uncertainty}}
</constraints>

<output_format>
## What protects an idea
Short paragraphs.

## Before you send
Checklist.

## Reading their terms
Quoted clauses with plain explanations, or a checklist.

## What to reveal
Two stages.

## Pitch message
Under 180 words.

## Your record
Table template: date | company | contact | what was sent | terms accepted.
</output_format>
