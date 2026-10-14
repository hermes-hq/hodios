---
schema: 1
id: check-summary-matches-document
kind: prompt
title: Check a summary matches its document
description: Checks an executive summary or abstract against the full document for drifted numbers, overstated claims, changed recommendations and key findings missing, and gives exact corrections.
category: editing
version: 1.0.0
status: incubating
stage: [verify]
role: [consultant, researcher, manager, editor]
requires: [none]
inputs: [document]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [executive-summary, abstract, accuracy-check, version-drift, reports]
pairs_with:
  prompts: [write-executive-summary, remove-repeated-points, check-internal-consistency]
  personas: [editor]
args:
  - name: summary
    description: The executive summary, abstract or key-points section to check.
    type: text
    required: true
  - name: document
    description: The full document body the summary describes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Mismatches, Missing from summary, Corrected summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The summary is the part most people read and the part most likely to be wrong. It is usually written early and not updated when the body changes, or written last in a hurry from memory. Typical drift: a figure updated in the body but not the summary (or rounded differently), a finding stated more strongly in the summary than the evidence in the body supports ("will reduce" where the body says "may reduce in some sites"), a recommendation changed after review, a caveat or limitation that the body stresses and the summary drops, and a key finding or risk added late that never reached the summary. Because decision-makers act on the summary, each mismatch is a real risk.
</context>

<task>
Check this summary against the full document.

<summary>
{{summary}}
</summary>

<document>
{{document}}
</document>

1. If either part is missing, ask for it and stop.
2. Break the summary into individual statements: every number, claim, finding, recommendation, date, scope statement and caveat.
3. For each statement, find its support in the body and quote the location. Classify it: matches, number differs, stronger than the body, weaker than the body, recommendation changed, not supported anywhere, or caveat dropped.
4. Scan the body for findings, risks, limitations and recommendations important enough for a decision-maker that the summary leaves out.
5. Rewrite the summary with the minimum changes: correct the mismatches, add only the missing items that matter most, keep its length close to the original and its structure the same.
6. Where the body itself is internally inconsistent (two different figures), do not choose; flag it for the author.
</task>

<constraints>
- The body is the reference. Do not use outside knowledge to correct either part.
- Quote both sides of every mismatch so the author can verify it.
- Do not soften or strengthen any claim beyond what the body supports.
- Keep the summary's length within about 15 percent of the original unless missing material makes that impossible; say so if it does.
</constraints>

<output_format>
## Verdict
One or two sentences: safe to send, needs fixes, or seriously misleading.
## Mismatches
A table: Summary says | Body says (with location) | Type | Fix.
## Missing from summary
Bullets: what the body contains that a decision-maker would need, with location. "None" if none.
## Corrected summary
The revised summary.
</output_format>
