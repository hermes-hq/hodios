---
schema: 1
id: personalize-cold-email-openers
kind: prompt
title: Personalise cold email openers
description: Writes evidence-backed personalised first lines for a pasted list of prospects, flagging rows with too little real context to personalise and suggesting a role-based line instead.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, marketer]
requires: [none]
inputs: [dataset, text]
output: [table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [cold-email, personalization, first-lines, outbound, prospect-list]
pairs_with:
  prompts: [write-cold-outreach, write-outbound-sequence, audit-cold-email-sequence]
args:
  - name: prospects
    description: The prospect list as pasted rows or CSV, one prospect per row, with name, role, company and whatever context you have (recent post, news, job openings, tech used, how you found them).
    type: text
    required: true
  - name: offer
    description: What you sell and the problem it solves for these roles, in one or two sentences, so each opener can bridge to it.
    type: text
    required: true
  - name: email_body
    description: The rest of the email the opener will sit above, so the line flows into it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Openers, Flagged rows, Patterns used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the first line of cold emails for an outbound team. The first line is what shows in the inbox preview, so it decides whether the email gets read. A good opener states one specific, checkable fact about the prospect or their company and hints at why it matters for their role, in under about 25 words. A bad opener is flattery ("loved your post"), a fact with no relevance ("saw you went to Leeds University"), or fake intimacy.

Personalisation at scale fails quietly: when a row has nothing real, writers invent something plausible, and one invented detail sent to the wrong person costs more credibility than a plain line. The honest fallback is a role-and-industry line that names a common problem for people in that seat.
</context>

<task>
Write a personalised opener for every prospect.

<prospects>
{{prospects}}
</prospects>

<offer>
{{offer}}
</offer>
{{#email_body}}
<email_body>
{{email_body}}
</email_body>
{{/email_body}}

1. For each row, pick the single most relevant fact for the offer. Prefer, in order: a dated trigger (new role, hiring, funding, launch, expansion), something the person wrote or said publicly about a problem near the offer, then a company fact that implies the problem.
2. Write one opener per row, 25 words or fewer, that states the fact and points toward the problem. It must flow into the email body if one is given.
3. Grade each row's evidence: strong (specific and relevant), weak (specific but loosely relevant), or none.
4. For rows graded none, do not invent: write a role-based opener instead and mark it clearly as role-based.
5. Note the patterns you used so the user can spot-check and reuse them.
</task>

<constraints>
- Use only the facts in each row. Never invent posts, quotes, awards, mutual contacts, events or numbers.
- No compliments as the whole opener, no "I hope this finds you well", no "I noticed that you're the X at Y" restating the obvious.
- Do not use personal-life details (family, health, home, religion) even if present in a row; mark that row and use a business fact.
- Keep the prospect's name and company exactly as given. Keep row order so the output can be pasted back into a sheet.
- Do not repeat the same opener template for more than a third of the rows.
</constraints>

<output_format>
## Openers
Table: # | Name | Company | Fact used | Opener | Evidence (strong, weak, none).

## Flagged rows
Bullets: row number, the issue (no usable context, personal detail, possible stale news, unclear role) and what to research.

## Patterns used
Two to four short bullets.
</output_format>
