---
schema: 1
id: explain-state-of-evidence
kind: prompt
title: Explain the state of the evidence
description: Explains what the evidence currently shows on a contested question, separating consensus, active debate and fringe claims, with the kinds of studies behind each and honest uncertainty.
category: fact-checking
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, student]
requires: [none]
inputs: [topic]
output: [explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [scientific-consensus, evidence-quality, uncertainty, contested-questions]
pairs_with:
  prompts: [evaluate-source-credibility, fact-check-claims, brief-me-on-topic]
args:
  - name: question
    description: The question, as specific as possible, for example "Does screen time harm teenagers' mental health?" or "Is nuclear power safer per unit of energy than coal?".
    type: string
    required: true
  - name: depth
    description: quick = the short answer, the three layers and what to check; full = adds the evidence types in detail, why experts disagree, and what would change the picture.
    type: enum
    enum: [quick, full]
    default: quick
output_contract:
  format: markdown
  sections: [Short answer, Broad agreement, Active debate, Fringe or rejected, What the evidence is made of, What would change the picture, Check for newer evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People meet contested questions through headlines and arguments, where every side cites "the science". What they rarely get is a map: what most researchers in the field accept, what is genuinely unsettled and why, and which claims have been tested and rejected. You give that map from your own knowledge, which means two honesty duties: never invent a study, statistic or author, and say clearly that newer evidence may exist that you do not know about.

Question: {{question}}
Depth: {{depth}}
</context>

<task>
1. If the question is vague or mixes several questions ("Is sugar bad?"), restate it as one or two precise, answerable questions and say which you are answering. If it cannot be made precise without the user, ask. If it is a question of values rather than evidence ("Should we ...?"), say which parts evidence can inform and answer those.
2. Write the short answer: what the evidence shows, in two to four sentences, with a calibrated confidence word (well established, likely, uncertain, contested, unknown).
3. Sort the claims people make about this question into three layers:
   - **Broad agreement:** what most researchers in the relevant field accept, and the kind of evidence or bodies that reflect that (large systematic reviews, national scientific academies, major professional bodies) where you are confident they exist.
   - **Active debate:** what qualified researchers genuinely disagree about, and why: conflicting results, measurement problems, different definitions, effect sizes too small to resolve, or not enough data yet.
   - **Fringe or rejected:** claims that circulate widely but have been tested and not supported, or lack any credible evidence, with the reason in a sentence.
4. With full depth, explain what the evidence is made of: the types of studies (randomised trials, cohort studies, natural experiments, modelling, lab or mechanistic work, expert surveys), what each can and cannot show here, and where the gaps are. Then say what new evidence would change the picture.
5. End with how to check for newer evidence: the kinds of sources to look for and search terms, without inventing specific titles.
6. Before answering, remove or reword any specific study, figure, date or institution you are not confident is real and accurately described.
</task>

<constraints>
- Never invent studies, authors, journals, years or numbers. Describe evidence by type ("several large cohort studies") when you cannot name a source with confidence.
- Avoid false balance: do not present a fringe view as an equal side. Avoid false certainty: do not present an active debate as settled.
- Distinguish "no evidence of an effect" from "evidence of no effect", and statistical significance from practical size.
- Say plainly that your knowledge has a cutoff and the field may have moved.
- Describe the evidence; do not give personal medical, legal or financial advice. If the question is about the user's own health, money or legal situation, explain the evidence in general and suggest they discuss their case with a qualified professional.
- Use the same standard whatever the political or cultural sensitivity of the question.
</constraints>

<output_format>
## Short answer
Two to four sentences with a confidence word.
## Broad agreement
Bullets.
## Active debate
Bullets: the open question and why it is open.
## Fringe or rejected
Bullets: the claim and why it is not supported. Write "None notable" if none.
## What the evidence is made of
Full depth only. Evidence type -> what it shows -> its limits here.
## What would change the picture
Full depth only.
## Check for newer evidence
Bullets: kinds of sources and search terms, plus a one-line reminder about your knowledge cutoff.
</output_format>
