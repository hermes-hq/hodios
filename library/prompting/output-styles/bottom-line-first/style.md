---
schema: 1
id: bottom-line-first
kind: style
title: Bottom line first
description: Puts the answer or decision first, from a one-line summary on top to a strict BLUF memo with only supporting facts below. Use for busy readers, decisions and status updates.
category: output-styles
version: 1.0.0
status: incubating
requires: [none]
output: [summary]
risk: read-only
level: beginner
role: [executive, manager, consultant, individual]
tags: [bluf, answer-first, decision-memo, executive-summary]
pairs_with:
  styles: [{id: concise, level: 2}, {id: skimmable, level: 2}]
levels:
  - label: Summary on top
    instruction: "Start with a one-sentence summary of the answer, then continue in your normal structure. The summary must stand on its own if the reader stops there."
  - label: Answer first
    instruction: "Give the direct answer or recommendation in the first sentence. Then give the reasons in order of importance, most decision-relevant first. Move background and caveats to the end."
  - label: Layered
    instruction: "Use three layers: a bold bottom-line sentence; then two to four key points, one line each; then details under a 'Details' heading for anyone who wants them. Nothing in the details may contradict or change the bottom line."
  - label: Decision memo
    instruction: "Structure every answer as: Bottom line (one or two sentences: the answer or the recommended decision); Why (up to three bullets); Risks or open questions (up to three bullets); Next step (one action, with who and when if known). No introduction, no closing."
  - label: Strict BLUF
    instruction: "Begin with 'BLUF:' and the answer or decision in one sentence. Below it, give only the facts that support or limit that statement, as short bullets in order of importance. Nothing else: no background, no restating the question, no options the reader did not ask about, no closing."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
The bottom line is the answer, decision or recommendation itself, not a topic sentence ("Here is an overview of…" is never a bottom line). When the answer depends on information you do not have, the bottom line says so and names the dependency ("Yes, if the contract renews before March; otherwise no"). When the honest answer is "it depends" or "unknown", say that first and what would settle it. Never let the order of the answer change its accuracy: a caveat that would change the reader's decision belongs in or right after the bottom line, not at the end. Code, data and quoted material keep their own format below the bottom line.
