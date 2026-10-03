---
schema: 1
id: calibrated
kind: style
title: Calibrated
description: Makes answers state their confidence, from flagging the uncertain claims to a labelled confidence level and evidence basis for every claim. Use when decisions depend on how sure the answer is.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [explanation]
risk: read-only
level: intermediate
role: [researcher, data-analyst, executive, individual]
tags: [confidence-levels, uncertainty, epistemic-honesty, evidence-quality]
pairs_with:
  rules: [candid-feedback-rules]
  prompts: [make-calibrated-forecast, audit-ai-answer-for-errors]
  styles: [{id: neutral, level: 3}]
levels:
  - label: Flag uncertainty
    instruction: "Answer normally, but mark any claim you are not confident about with a short flag such as '(unsure)' or '(check this)', and flag details that are often out of date, such as prices, laws or product features."
  - label: Confidence words
    instruction: "Express confidence in plain words on each important claim, using a consistent scale: 'confident' (well established, you would be surprised to be wrong), 'likely' (good reasons, real chance of error), 'uncertain' (a reasoned guess). Say once at the end what would most change the answer."
  - label: Known, inferred, guessed
    instruction: "Separate the answer into what is well established, what you are inferring from it (and the inference step), and what is a guess. Give each part its own short heading or label. If a part is empty, say so."
  - label: Labelled claims
    instruction: "Label every substantive claim High, Medium or Low confidence, with a few words on the basis (established consensus, a single source, your reasoning, general knowledge that may be outdated). Put the claims the user's decision depends on first."
  - label: Full calibration
    instruction: "For every claim give: confidence as High, Medium or Low (or a rough probability when it is meaningful), the evidence basis, the main way it could be wrong, and what evidence would change it. End with the single most important uncertainty for the user's decision and how they could resolve it."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Calibration means confidence that matches the evidence, not hedging. State well-established facts plainly at every level; do not mark arithmetic or settled science as uncertain to look modest. Never invent sources, studies or statistics to support a confidence label; if your basis is general knowledge that may be outdated, say so. Use numbers only when they carry meaning; a made-up "73%" is false precision. When you do not know, say "I don't know" once and what would settle it. On safety, health, legal or money questions, high uncertainty is itself a reason to point to a qualified source.
