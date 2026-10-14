---
schema: 1
id: check-voting-record-claim
kind: prompt
title: Check a claim about how a politician voted
description: Checks a claim about how a politician voted or what they said against official voting records, bill texts and transcripts, accounting for procedural votes, amendments and changed bills.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, individual, researcher]
subject: [public-sector]
requires: [web]
inputs: [text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [voting-records, political-claims, legislatures, attack-ads, primary-sources]
pairs_with:
  prompts: [check-claim-about-law, verify-quotes-against-source, trace-quote-origin]
  personas: [fact-checker]
args:
  - name: claim
    description: The claim in the words used and who made it, for example "Senator X voted against funding for veterans' health care".
    type: text
    required: true
  - name: legislature
    description: The country and the body (national parliament, state legislature, city council, European Parliament).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, What the claim says, The record, Context that changes the meaning, Accurate version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"X voted against Y" is the backbone of attack adverts, and it is often literally true and still misleading. Legislators vote on many things that are not the final bill: procedural motions, amendments, cloture or closure motions, motions to send a bill back to committee, and versions that later changed. A vote against a large package can be described as a vote against any item inside it. Absences get described as votes. Recorded votes may not exist at all where a vote was by voice or show of hands, and some parliaments record party-line divisions where the individual had little choice. The fair check finds the specific vote (date, division or roll-call number, the question put), what was in the text at that stage, how the member voted, and any explanation they gave at the time. For "said" claims, the official transcript (Hansard, the Congressional Record or the equivalent) or the full recording is the source, not a clip.
</context>

<task>
Check this claim about the {{legislature}}.
<claim>
{{claim}}
</claim>

1. Restate the claim: who, which vote or statement, when, and what it implies about their position.
2. Find the specific vote or statement in the official record: the legislature's voting records or division lists, the bill or amendment text at that stage, and the official transcript. Use reputable vote-tracking sites only to find the record, then confirm it in the official source.
3. Identify what was actually voted on: final passage, amendment, procedural motion or another stage, and what else was in the text.
4. Check the member's explanation at the time (floor speech, statement, explanation of vote) and any later votes on the same issue.
5. Give a verdict and an accurate version of the claim.
</task>

<constraints>
- Report votes and quotes only from records you opened in this session, with the division or roll-call number, date and link. Never state how someone voted from memory.
- If you have no web access, say so, give no verdict, and name the official records to search and what to look for.
- Treat absences, abstentions and voice votes as what they are; never describe them as votes for or against.
- Stay neutral: check the claim, not the politician's merits. Apply the same standard whichever party made the claim.
- Quote statements in full enough context that their meaning is not changed.
</constraints>

<output_format>
## Verdict
One of: accurate, accurate but missing context, misleading, false, or cannot be verified. Then two sentences.
## What the claim says
## The record
Table: date | vote or statement | question put or context | how they voted or what they said | source (linked).
## Context that changes the meaning
Bullets.
## Accurate version
One sentence.
</output_format>
