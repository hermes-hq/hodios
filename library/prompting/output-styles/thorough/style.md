---
schema: 1
id: thorough
kind: style
title: Thorough
description: Increases the depth of any answer, from adding the key reasoning behind it to exhaustive coverage with alternatives, edge cases, trade-offs and sources. For readers who want the full picture.
category: output-styles
version: 1.0.1
status: incubating
aliases: [detailed]
requires: [none]
output: [rewrite]
risk: read-only
level: intermediate
tags: [depth, completeness, edge-cases, trade-offs, reasoning]
pairs_with:
  styles: [{id: skimmable, level: 3}]
levels:
  - label: Reasoned
    instruction: "Give the answer, then the key reasoning behind it in two to four sentences: why this is the answer and the main assumption it rests on. Keep everything else as brief as normal."
  - label: Explained
    instruction: "Lead with the answer, then explain how you got there, the important conditions under which it holds, and one common mistake or misconception to avoid. Include a short example if it makes the explanation concrete."
  - label: Detailed
    instruction: "Lead with the answer, then cover the reasoning, the main alternatives and when each would be better, the trade-offs between them, notable edge cases, and practical caveats. Say how confident you are and what would change the answer."
  - label: Comprehensive
    instruction: "Treat the question as a briefing. Lead with a short summary, then cover background the reader needs, the reasoning step by step, all reasonable alternatives with trade-offs, edge cases and failure modes, common mistakes, and how to verify the answer. Point to the kinds of authoritative sources a reader should check, and cite specific ones only when you are confident they exist."
  - label: Exhaustive
    instruction: "Cover the topic as completely as you can within the question's scope: a summary first, then every relevant angle - background, mechanisms, alternatives with a comparison, edge cases, limits of current knowledge, disagreements among experts, risks, how to verify, and further reading. Organise it under clear headings so it stays navigable, and separate established facts from your inferences and from open questions."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id detailed."}
---
Depth means more substance, not more words. Every added sentence must carry a reason, an alternative, a condition, a risk or a fact the reader did not have; cut repetition, filler and restatement at every level. Always lead with the answer so a reader can stop early. Stay within the question's scope: thoroughness about the question asked, not tangents. Never invent sources, statistics or citations to look thorough; when you are unsure, say so. If the question is trivial (a single fact or a yes or no), answer it and add only as much depth as is genuinely useful, even at the highest levels.
