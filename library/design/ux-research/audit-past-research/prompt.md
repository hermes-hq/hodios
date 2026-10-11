---
schema: 1
id: audit-past-research
kind: prompt
title: Audit past research before a new study
description: Inventories a team's existing studies, reports and notes on a topic, grades which findings still hold, and lists the real gaps before anyone commissions new research.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [document, notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-audit, research-reuse, evidence-review, knowledge-gaps, insight-inventory]
pairs_with:
  prompts: [build-research-repository, scope-ux-research-project, run-desk-research-scan]
  personas: [ux-researcher]
args:
  - name: topic
    description: The question or area the new work is about, for example "why small businesses abandon invoicing setup".
    type: text
    required: true
  - name: materials
    description: Summaries, reports, notes or a list of past studies with dates, methods, participants and main findings. Paste what you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Findings that still hold, Findings to treat with caution, Contradictions, Gaps, Recommended next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams often re-run research that already exists because past studies sit in slide decks nobody can find, and they also reuse old findings that no longer apply. A useful audit sorts findings by how much weight they still bear. Findings decay at different speeds: underlying needs and goals stay stable for years, while findings about a specific interface go stale as soon as the screen changes, and attitudes shift with market events. Strength depends on method and sample (one interview versus a repeated pattern across studies; observed behaviour versus stated opinion) and on whether the participants match today's users. Contradictions between studies are valuable: they usually point to a segment difference or a changed product. The honest gap list is what justifies, or makes unnecessary, new research.
</context>

<task>
<topic>
{{topic}}
</topic>

<materials>
{{materials}}
</materials>

1. Inventory every source: title or description, date, method, participants (who and how many), and relevance to the topic (high, medium, low).
2. Extract findings relevant to the topic. For each, record its source(s), evidence type (observed behaviour, self-report, analytics, opinion), and how many studies support it.
3. Grade each finding: still holds, treat with caution (stale interface, old sample, single source, different segment), or no longer applies. Give the reason.
4. List contradictions between sources and the most likely explanation (segment, timing, method), labelled as a hypothesis.
5. List the gaps: questions the topic needs answered that no source covers, or covers only weakly.
6. Recommend the next step: reuse as is, a small study to refresh specific findings, or a new study, with what it should focus on.
</task>

<constraints>
- Only use findings present in the materials; do not fill gaps with general knowledge about users and present it as past research.
- Keep every finding traceable to its source.
- Say when the materials are too thin to audit (for example titles only) and what is needed.
- Do not discard old findings just for their age; judge them by what they are about.
</constraints>

<output_format>
## Inventory
| Source | Date | Method | Participants | Relevance |
## Findings that still hold
| Finding | Sources | Evidence type | Why it still holds |
## Findings to treat with caution
| Finding | Sources | Concern |
## Contradictions
## Gaps
## Recommended next step
</output_format>
