---
schema: 1
id: rewrite-email-bottom-line-first
kind: prompt
title: Rewrite an email bottom line first
description: Rewrites a long email or message bottom-line-first for a senior reader, with the ask and deadline up top and only the needed context, keeping every fact and listing what moved.
category: email
version: 1.0.0
status: incubating
stage: [review]
role: [manager, project-manager, consultant, individual]
requires: [none]
inputs: [message, text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bluf, executive-communication, email-rewrite, concise-writing, senior-audience]
pairs_with:
  prompts: [write-professional-email, tighten-prose, request-approval-by-email]
args:
  - name: email
    description: The draft email or message to rewrite, including its subject line if it has one.
    type: text
    required: true
  - name: reader
    description: Who will read it and what they care about, for example "our CFO, reads on her phone, cares about cash" or "client's managing director". Defaults to a busy senior reader.
    type: string
  - name: ask
    description: What you want the reader to do, if the draft does not make it clear, for example "approve the extra 12k by Friday".
    type: text
output_contract:
  format: markdown
  sections: [Rewrite, Fact check, What changed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most long work emails are written in the order the writer thought: background, history, analysis, and finally the ask in the last paragraph. Senior readers read in the opposite order of importance and often stop after two lines. Bottom line up front (BLUF) puts the ask or the conclusion, with its deadline, in the first sentence, then the two or three reasons that support it, then only the context the reader needs to act. The risk in rewriting is losing information: a figure, a caveat or a name dropped while cutting changes the meaning. So a good rewrite also accounts for every fact in the original.
</context>

<task>
Rewrite this email bottom line first.{{#reader}} Reader: {{reader}}.{{/reader}}{{#ask}} Ask: {{ask}}.{{/ask}}

<email>
{{email}}
</email>

1. Find the bottom line: the ask (decision, approval, input, action) with its deadline, or, if the email is informational, the single most important conclusion. If an ask was supplied and it conflicts with the draft (a different amount, date or option), do not choose silently: use `[confirm: …]` in the rewrite and explain under What changed. If neither the draft nor the ask reveals any point, ask what the reader should do or know and stop.
2. Inventory the facts in the original: every figure, date, name, commitment, caveat, risk and attachment reference.
3. Write the rewrite:
   - Subject line with a tag and the bottom line: "Decision needed by Fri: …", "Action: …", or "FYI: …".
   - First sentence: the bottom line, with the deadline and its reason if the original gives one.
   - Then up to three short bullets or sentences with the reasons or key facts that support it.
   - Then a short "Background" or "Details" part for the remaining context the reader needs to act or that the original included and must not be lost.
   - Close with the reply path ("Reply 'yes' to proceed").
4. Keep the sender's relationship cues (greeting, thanks, a sensitive acknowledgement) but cut throat-clearing, repetition, hedging and narrative ("As you may recall…", "I just wanted to reach out…").
5. Fit emphasis to the reader if given (cost, risk, time, customers) without changing any fact.
</task>

<constraints>
- Keep every fact from the inventory unless it is pure filler; never add facts, figures or opinions that are not in the original or the ask.
- Aim for no more than about 60% of the original's length, unless the original is already short. Facts beat length: if keeping every substantive fact makes the rewrite longer, keep the facts, move them into Background, and say so under What changed.
- Plain words, active voice, figures as numerals.
- Do not change the meaning, the commitments or the level of certainty (a "probably" stays a probably).
</constraints>

<output_format>
## Rewrite
Subject line, then the email.
## Fact check
A table: fact from the original, where it is in the rewrite (first line, bullets, background), or "dropped: filler" with a reason. Nothing substantive may be dropped.
## What changed
Two to four bullets: what moved to the top, what was cut, any conflicts or placeholders.
</output_format>
