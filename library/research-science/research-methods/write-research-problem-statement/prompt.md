---
schema: 1
id: write-research-problem-statement
kind: prompt
title: Write a research problem statement
description: Writes a thesis or proposal problem statement that links the real-world problem, evidence it exists, the knowledge gap and the cost of leaving it unstudied.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [text, notes]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [problem-statement, thesis-proposal, research-gap, dissertation, research-rationale]
pairs_with:
  prompts: [refine-research-question, write-research-proposal, write-introduction-section]
  personas: [research-methodologist]
args:
  - name: topic
    description: Your topic, the problem you care about, any evidence or sources you already have, and the research question if you have one.
    type: text
    required: true
  - name: level
    description: The kind of document the statement is for.
    type: enum
    enum: [undergraduate-thesis, masters-thesis, phd-proposal, grant-proposal]
    default: masters-thesis
  - name: word_limit
    description: Target length in words, if your programme sets one.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Problem statement, Evidence to find, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Supervisors reject most first-draft problem statements for the same reasons: they describe a topic ("social media and teenagers") instead of a problem, they state a practical problem but never show a gap in knowledge, they assume the gap ("no studies have looked at") without evidence, or they smuggle in the answer ("this study will prove that"). A strong statement runs in a short chain: the ideal or expected situation, the reality that falls short with evidence of scale and who is affected, what is already known and the specific thing that is not known, the consequence of not knowing it, and how this study addresses that gap. The practical problem and the research problem are different things: a study cannot solve teacher burnout, but it can explain which workload factors predict it in a setting where that is unknown.
</context>

<task>
Write a problem statement for a {{level}} from:
<topic>
{{topic}}
</topic>
{{#word_limit}}
Target length: {{word_limit}} words.
{{/word_limit}}

1. Diagnose the input: is it a topic, a practical problem or a research problem? Name the population, setting and phenomenon. If one of these is missing, state an assumption and flag it.
2. Separate the practical problem (what goes wrong in the world) from the research problem (what is not known that stops people acting on it).
3. Build the chain: expected situation, actual situation with the kind of evidence needed to show scale, what prior research has established, the specific gap (population, context, method, mechanism or conflicting findings), the consequence of the gap, and the purpose of this study in one sentence.
4. Write the statement in connected prose at the requested length, with placeholders such as [cite: national statistics on X] wherever evidence is needed. Use the evidence the user gave; never invent figures or authors.
5. List the evidence the user must find to support each claim, and where a claim is likely to be challenged.
6. Check the statement against common failures and say which ones remain.
</task>

<constraints>
- Do not invent statistics, studies, authors or dates. Every factual claim either comes from the user's input or is a placeholder.
- Do not claim "no research exists" unless the user has shown a search; write "little is known about X in Y" with a placeholder for the search that supports it.
- No predicted findings or advocacy in the statement; it states a gap, not a conclusion.
- Keep it to one problem. If the input contains several, pick the most researchable and list the others.
</constraints>

<output_format>
## Diagnosis
Short bullets: what the input is, the practical problem, the research problem, assumptions.
## Problem statement
The finished prose with [cite: ...] placeholders.
## Evidence to find
A table: claim | evidence needed | likely source type.
## Checks
A checklist: topic vs problem, gap shown not assumed, consequence stated, purpose aligned, no answer presupposed.
</output_format>
