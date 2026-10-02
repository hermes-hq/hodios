---
schema: 1
id: build-investor-pipeline
kind: prompt
title: Build an investor pipeline
description: Builds an investor pipeline for a raise - fit criteria, target list structure, warm-intro paths, outreach messages, a tracker and a weekly cadence. Use when a founder is starting a fundraise.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [investor-outreach, warm-intros, fundraising-crm, venture-capital, angel-investors]
pairs_with:
  prompts: [write-pitch-deck-outline, prepare-investor-qa, write-elevator-pitch, explain-term-sheet]
  personas: [startup-mentor]
args:
  - name: company
    description: What the company does, sector, location, traction and key metrics, team, and the story for this round.
    type: text
    required: true
  - name: round
    description: Round type, target amount, instrument if decided, and timing (for example "seed, 1.5m, priced round, want to close by March").
    type: string
    required: true
  - name: network
    description: Who you know - existing investors, advisors, founders you know who raised, former colleagues at funds, accelerators. Leave empty if you are starting cold.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Investor fit criteria, Target list structure, Intro paths, Outreach messages, Tracker, Process and cadence, Research to do]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders run a fundraise as a structured sales process. Raises go best when the founder qualifies investors hard before reaching out (stage, cheque size, sector, geography, and whether they lead), approaches through warm introductions where possible, runs meetings in a compressed window so interest builds at the same time, and tracks every conversation. Raises go badly when founders spray a deck at a long unqualified list, take meetings over many months, or cannot say what the money will achieve.
</context>

<task>
Build the investor pipeline.

<company>
{{company}}
</company>

Round: {{round}}
{{#network}}
<network>
{{network}}
</network>
{{/network}}

1. Readiness check: is the company ready to raise this round on this timeline? Check that the story for the round is clear (what the money achieves and the milestone it reaches), the materials needed (deck, data room basics, financial model, cap table), and the metrics investors at this stage usually look at. Flag gaps to fix before outreach.
2. Investor fit criteria: define the ideal investor for this round: type (angels, micro-funds, seed funds, corporate investors, sector funds), stage focus, cheque size range relative to the round, whether they lead or follow, sector thesis, geography, and portfolio conflicts to avoid. Explain why a lead matters for a priced round.
3. Target list structure: a tiered list format (tier 1 best fit, tier 2 good fit, tier 3 practice and backups) with the columns to fill and a target size for each tier. Give the sources and search methods to build it (fund websites and portfolio pages, public investment announcements, databases, founder communities, portfolio founders of target funds). Do not name specific investors or funds unless they appear in the network input.
4. Intro paths: for each tier, how to get a warm introduction: map the network input to target investors, ask portfolio founders, use advisors and existing investors. Write a forwardable intro email the founder sends to the connector, short enough to forward unchanged.
5. Outreach messages: a cold email for investors with no warm path (personalised first line, what the company does in one sentence, traction, the round, a specific ask), and a follow-up message after no reply.
6. Tracker: columns (investor, partner, tier, fit notes, intro path, status, last contact, next step, date, interest level, concerns raised, committed amount) and status stages from research to committed or passed.
7. Process and cadence: a week-by-week plan: preparation, a practice round with tier 3, tier 1 and 2 meetings compressed into a few weeks, follow-ups, partner meetings, term sheet and close. Include a weekly routine (number of new intros requested, meetings, follow-ups sent, tracker review) and how to keep the existing business running during the raise.
8. Research to do: a checklist for each target before the first meeting.
</task>

<constraints>
- Do not invent investor names, fund sizes, cheque sizes or portfolio companies. Use only names from the network input and describe how to research the rest.
- Use only the company facts given; mark missing metrics as [NEEDED: …].
- Messages are short (under 150 words) and specific; no hype.
- Securities rules restrict how some raises may be advertised and who may invest, depending on the country. Recommend the founder confirms with a lawyer before any public announcement of the raise or outreach to non-professional investors.
</constraints>

<output_format>
## Readiness check
Checklist with gaps.
## Investor fit criteria
Table: Criterion | Ideal | Acceptable | Exclude.
## Target list structure
Table template, tier sizes, and sourcing methods.
## Intro paths
Mapping from network to targets, then the forwardable email.
## Outreach messages
Cold email and follow-up.
## Tracker
Column list and status stages.
## Process and cadence
Table: Week | Focus | Targets. Then the weekly routine.
## Research to do
</output_format>
