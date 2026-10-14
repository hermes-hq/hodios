---
schema: 1
id: draft-opening-statement
kind: prompt
title: Draft a trial opening statement
description: Drafts a trial opening statement that tells the case as a story through the evidence, with a theme, a promise list of what the evidence will show, weaknesses addressed and a timing plan.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional, student]
subject: [law]
requires: [none]
inputs: [notes, text, document]
output: [script, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [opening-statement, trial-advocacy, case-theme, storytelling, mock-trial]
pairs_with:
  prompts: [prepare-cross-examination-outline, draft-jury-instructions, prepare-moot-court-argument]
args:
  - name: case_facts
    description: The facts you expect to prove, with the witness or exhibit that will prove each, and the facts the other side will rely on.
    type: text
    required: true
  - name: side_and_forum
    description: Who you act for, the court or tribunal, jury or judge alone, the jurisdiction, and any time limit for the opening.
    type: string
    required: true
  - name: theme
    description: Your theory of the case or theme, if you have one. Optional; the prompt will propose options if blank.
    type: text
output_contract:
  format: markdown
  sections: [Theme options, Opening statement, Evidence promise list, Risks to check, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An opening statement is a preview of the evidence, not an argument, and the line matters: most courts restrict argument, characterising credibility and stating law in the opening, and opponents object. Within that limit, the strongest openings tell a story in chronological or thematic order from the client's point of view, give the fact-finder a short theme they can remember, introduce the people, and confront the worst fact before the other side does. The most damaging mistake is promising evidence that never arrives, because the opponent will remind the jury in closing. Every factual claim in the opening should therefore map to a witness or exhibit that is likely to be admitted.

Side and forum: {{side_and_forum}}

Facts and proof:
<case_facts>
{{case_facts}}
</case_facts>
{{#theme}}
Theme: {{theme}}
{{/theme}}
</context>

<task>
1. Theme options: two or three short themes (one sentence each) that fit the facts and the jury or judge, and which one the draft uses.
2. Draft the opening: a strong first minute that starts with the story, not with thanks or a definition of opening statements; the people; what happened in order; the key disputed points framed through the evidence ("you will hear", "the document will show"); the bad facts addressed honestly; and a close that tells the fact-finder what you will ask them to decide.
3. Keep it within the stated time limit, estimating about 130 spoken words per minute.
4. Evidence promise list: every factual statement in the draft, the witness or exhibit that proves it, and a risk rating if admission is uncertain.
5. Risks to check: lines that may draw an objection as argument, statements of law, or references to evidence subject to a pending motion.
6. Delivery notes: where to pause, which exhibit to show, and what to cut first if time runs short.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts supplied. Never promise evidence that is not listed with a witness or exhibit; mark such lines [UNSUPPORTED] and suggest cutting them.
- No personal opinion on credibility or guilt, no appeals to prejudice, no references to inadmissible matters such as insurance or settlement talks unless the attorney confirms they are admissible.
- Rules on what openings may contain differ by court; flag doubtful lines for the attorney.
- For a mock trial or moot, follow the competition rules the user gives.
{{> output/uncertainty}}
</constraints>

<output_format>
## Theme options
## Opening statement
The full spoken text, with stage notes in [brackets].
## Evidence promise list
Table: Statement | Proved by | Risk.
## Risks to check
Bullets.
## Delivery notes
Bullets.
</output_format>
