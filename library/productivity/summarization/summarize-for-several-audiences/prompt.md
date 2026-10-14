---
schema: 1
id: summarize-for-several-audiences
kind: prompt
title: Summarise one source for several audiences
description: Writes separate summaries of one document or update for different readers - leadership, the team, customers, the public - each with its own lead, detail level and wording, all consistent on facts.
category: summarization
version: 1.0.0
status: incubating
stage: [ship]
role: [manager, product-manager, project-manager, executive]
requires: [none]
inputs: [document, text]
output: [summary, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [audience, stakeholder-updates, internal-comms, consistency]
pairs_with:
  prompts: [summarize-long-document, write-executive-summary, plan-change-communications]
args:
  - name: source
    description: The document, report or update to summarise.
    type: text
    required: true
  - name: audiences
    description: The readers, each with what they care about if you know (for example "board - money and risk; engineering team - what changes in their work; customers - what changes for them").
    type: text
    required: true
  - name: not_for_sharing
    description: Anything in the source that must not go to some audiences (for example "named staff", "unannounced pricing"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fact sheet, Summaries by audience, Consistency and sharing checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write versions of the same summary for different readers, a job communications leads do every time something big happens. You know each audience reads for a different question: leadership wants the decision, risk and cost; the team wants what changes in their work and when; customers want what changes for them and what to do; the public needs plain language and no internal jargon. You also know the main danger of multiple versions: they drift. Numbers, dates and commitments end up slightly different between versions, or internal-only details leak into an external one. So you start from a single fact sheet and build every version from it.

<source>
{{source}}
</source>

Audiences: {{audiences}}
{{#not_for_sharing}}Not for sharing: {{not_for_sharing}}{{/not_for_sharing}}
</context>

<task>
1. Build a fact sheet from the source: key facts, numbers, dates, decisions and commitments, each with where it appears. This is the single source for all versions.
2. For each audience, decide the one question they read for, the lead sentence that answers it, the right length and the level of detail.
3. Write each summary from the fact sheet only, in wording that suits the audience (no internal acronyms for external readers), ending with what the reader should do, if anything.
4. Apply the not-for-sharing list and remove anything clearly internal (names, unannounced plans, internal disputes) from external versions; say what you removed.
5. Run a consistency check: every number, date and commitment that appears in more than one version must match the fact sheet.
</task>

<constraints>
- Do not add facts, reassurances or promises the source does not contain, even if they would make a version more appealing.
- Tailoring changes emphasis and wording, not substance: no version may contradict another.
- Do not spin bad news differently per audience in a way that would mislead; it can be framed for relevance but must stay accurate.
- If an audience's summary would require information the source does not have, say what is missing.
- If the source describes an incident that may carry reporting duties (a data breach, a safety issue), note in the checks that notification rules may apply and vary by country, without stating what they require.
</constraints>

<output_format>
## Fact sheet
Table: Fact | Value | Where in source.

## Summaries by audience
One subsection per audience: the summary, ready to use, with its intended length noted.

## Consistency and sharing checks
Bullets: what was removed from which version and why, and confirmation that shared facts match or a list of what to fix.
</output_format>
