---
schema: 1
id: draft-jury-instructions
kind: prompt
title: Draft proposed jury instructions
description: Drafts proposed jury instructions from the pattern instructions and authorities supplied, tailored to the claims and defences, with a source for each, objection risks and a verdict form outline.
category: legal-practice
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [jury-instructions, pattern-instructions, verdict-form, trial-preparation, charge-conference]
pairs_with:
  prompts: [outline-motion-argument, draft-legal-research-memo, draft-opening-statement]
args:
  - name: claims
    description: The claims and defences going to the jury, with the elements as you understand them and the key factual disputes.
    type: text
    required: true
  - name: pattern_instructions
    description: The text of the pattern or model instructions for this court and the cases or statutes you rely on to tailor them. The prompt drafts only from what is supplied here.
    type: text
    required: true
  - name: court
    description: The court and jurisdiction, and whether you act for plaintiff, defendant or the prosecution or defence.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Instruction list, Proposed instructions, Verdict form outline, Objection risks, Gaps to research]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Jury instructions decide what the jury is allowed to find, and errors in them are a common ground of appeal. Courts prefer the jurisdiction's pattern instructions and are wary of argumentative departures from them, so the skill lies in choosing the right patterns, filling the bracketed options correctly, adding a tailored instruction only where a pattern does not fit and an authority supports it, keeping the language neutral, and making sure the verdict form asks the questions the instructions set up. A party that wants an instruction usually must request it in writing with its authority and object on the record to its refusal, so each proposed instruction needs a numbered source note.

Court and side: {{court}}

Claims and defences:
<claims>
{{claims}}
</claims>

Pattern instructions and authorities supplied:
<pattern_instructions>
{{pattern_instructions}}
</pattern_instructions>
</context>

<task>
1. Instruction list: the instructions this case needs, in the usual order (preliminary and general, burden and standard of proof, each claim's elements, each defence, damages or sentencing-related matters where the jury decides them, deliberation), saying for each whether a supplied pattern covers it.
2. Draft each proposed instruction, numbered, in plain neutral language, using the pattern text where supplied, filling its options for this case, and marking every change from the pattern.
3. After each instruction, a source note: the pattern number or authority it rests on, and for any tailored language, why it is needed.
4. Verdict form outline: the questions the jury answers, in an order that matches the instructions, including special interrogatories if the claims call for them.
5. Objection risks: instructions or wording the other side is likely to oppose, and the strongest version of their objection.
6. Gaps to research: elements or defences for which no pattern or authority was supplied.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Draft only from the patterns and authorities supplied. Never quote a pattern instruction or case from memory; where one is needed and not supplied, write [PATTERN NEEDED] or [AUTHORITY NEEDED].
- Keep instructions neutral; do not argue the facts or comment on the evidence. If the input asks for an argumentative or improper instruction, leave it out and explain why under Objection risks.
- Mark every departure from the pattern text clearly so the attorney can defend it.
- This is a draft for attorney review before filing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Instruction list
Table: No. | Topic | Pattern supplied? | Notes.
## Proposed instructions
Each numbered instruction, then "Source:" and "Changes from pattern:".
## Verdict form outline
Numbered questions.
## Objection risks
Bullets.
## Gaps to research
Bullets.
</output_format>
