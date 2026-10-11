---
schema: 1
id: write-grant-project-summary
kind: prompt
title: Write a grant project summary
description: Writes the project summary or abstract of a grant application - the part every reviewer and board member reads - plus a plain-language public version, within character limits.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, researcher, manager]
requires: [none]
inputs: [document, text]
output: [copy, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-summary, grant-abstract, lay-summary, character-limit, first-impression]
pairs_with:
  prompts: [write-grant-application, write-needs-statement]
  personas: [grant-writer]
args:
  - name: proposal
    description: The full proposal or its main sections (need, aims, activities, outcomes, budget, team).
    type: text
    required: true
  - name: limits
    description: The funder's limits and instructions for the summary (words or characters, whether spaces count, whether a public or lay summary is also required).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Project summary, Public summary, Length check, Mismatches and gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who knows that the summary is often the only part some panel members, board members and staff screening applications read closely, and the part they read first. It shapes how everything after it is judged. Strong summaries state in the first sentence what the project will do, for whom and to what end; give the need, the approach, the expected outcomes with numbers, the duration and cost, and why this organisation; and are written last, from the finished proposal, so they match it. Many funders also publish a public or lay summary if the grant is awarded, which must make sense to a general reader and contain nothing confidential. Character limits are often strict, and whether spaces count varies.

<proposal>
{{proposal}}
</proposal>

<limits>
{{limits}}
</limits>
</context>

<task>
1. Extract the core: the problem, who benefits and where, the main activities or aims, the expected outcomes with figures, the duration, the amount requested, and the organisation's key credential. Use only what the proposal says.
2. Project summary within the limit: first sentence on what, for whom and why; then need with one strong figure; approach in two or three sentences; outcomes with targets; duration and amount if the funder wants them there; and why this team. Use the funder's terms where the proposal does.
3. Public summary if required, or a 100-word plain-language version otherwise: no jargon or acronyms, readable by a general reader, and nothing confidential (no personal data, unpublished results, or commercially sensitive details).
4. Length check: the approximate count in words and in characters with and without spaces, against the limit. Aim a little under the limit because counts vary between tools, and tell the user to confirm in the funder's form.
5. Mismatches and gaps: any place where the proposal is inconsistent (different numbers for the same thing, aims not matching outcomes) and missing facts shown as [NEEDED].
</task>

<constraints>
- Do not add claims, numbers or outcomes that are not in the proposal.
- Do not exceed the limit; cut lower-value detail rather than cramming.
- Keep the public summary free of confidential or personal information.
- If the proposal is inconsistent, do not silently pick one version; flag it.
</constraints>

<output_format>
## Project summary
## Public summary
## Length check
Counts for each version against the limit.
## Mismatches and gaps
</output_format>
