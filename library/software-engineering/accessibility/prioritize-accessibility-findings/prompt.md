---
schema: 1
id: prioritize-accessibility-findings
kind: prompt
title: Prioritise accessibility findings
description: Turns a long external accessibility audit into a fix plan that deduplicates by shared component, ranks by impact on key journeys, and groups work into sprints with design-system fixes first.
category: accessibility
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, product-manager]
requires: [none]
inputs: [document, dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audit-remediation, triage, design-system-fixes, root-cause, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, write-accessibility-conformance-report, write-accessibility-acceptance-criteria]
  workflows: [accessibility-fix-sweep-track]
args:
  - name: audit_findings
    description: The audit findings, pasted as a table, CSV export or report text. Include for each finding the page or screen, the WCAG criterion, the auditor's severity and the description if available.
    type: text
    required: true
  - name: key_journeys
    description: The user journeys that matter most, in order, for example "sign up, search, checkout, account deletion". Leave empty to infer from page names and confirm.
    type: text
  - name: team_capacity
    description: Who can work on it and for how long, plus any deadline, for example "2 frontend devs at 50% for 3 sprints; procurement deadline 1 March".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Root causes, Sprint plan, Needs a decision, Retest plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An external audit often arrives as a spreadsheet with hundreds of findings, ordered by page. Teams that fix them in that order burn months fixing the same button forty times, polish low-traffic pages while checkout stays blocked, and lose momentum. An experienced accessibility lead first collapses findings to root causes (one `IconButton` without a name may be 120 findings), then ranks by who is blocked on which journey, then puts fixes in the design system or shared layout ahead of page-level patches, and finally plans a retest so the fixes are confirmed rather than assumed.
</context>

<task>
Build a fix plan from these findings:

<audit_findings>
{{audit_findings}}
</audit_findings>

{{#key_journeys}}Key journeys, most important first: {{key_journeys}}{{/key_journeys}}
{{#team_capacity}}Capacity and deadline: {{team_capacity}}{{/team_capacity}}

If key journeys are not given, infer them from the page names (sign-in, search, checkout, forms usually) and list them under Needs a decision for confirmation. If capacity is not given, plan in three tiers (Now, Next, Later) instead of sprints and ask for team size, availability and any deadline.

1. Normalise: count findings, by WCAG criterion and by auditor severity. Note duplicates and anything unclear or likely a false positive (for example a contrast failure on disabled controls, which WCAG exempts); list those for the auditor rather than dropping them silently.
2. Find root causes: group findings that share a component, template, design token or content pattern. For each group, name the likely shared source and the number of findings it would clear. Distinguish code fixes from content fixes (alt text, captions, link text) that need authors.
3. Rank each root cause with a simple score, and show it:
   - Impact: blocker (a user cannot complete a key journey), serious (completes with major difficulty), moderate, minor.
   - Reach: key journey or high-traffic page versus rare page.
   - Breadth: number of findings and pages cleared.
   - Effort: S (under a day), M (a few days), L (a sprint or more), stated as an assumption.
   Blockers on key journeys come first regardless of effort; then high breadth with low effort.
4. Plan sprints (or tiers) within the stated capacity: sprint 1 removes journey blockers and quick shared fixes; later sprints work down the ranking. Put design-system fixes before page fixes that depend on them. Include regression protection (a lint rule or component test) for each shared fix.
5. If the capacity cannot meet the deadline, say so with the numbers and offer the trade-off (which items move, or what extra capacity is needed). Do not shrink estimates to fit.
6. Plan the retest: which items to verify internally, which to send back to the auditor, and when.
</task>

<constraints>
- Do not re-audit or invent findings; work only from the list. If the list lacks pages or criteria, say what is missing and how it limits the plan.
- Do not assess legal risk or compliance status. Where the user mentions a legal or contractual deadline, plan to it and suggest they confirm scope with whoever owns compliance.
- Effort estimates are assumptions for the team to correct; label them so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Four to six sentences: total findings, number of root causes, the blockers, and whether the deadline is realistic.

## Root causes
Table: # | Root cause and likely source | Findings cleared | Journeys affected | Impact | Effort | Score. At most 15 rows, highest score first; group the remaining low-impact items into one final row with their count.

## Sprint plan
Per sprint or tier: goal, items (root cause numbers), owner type (frontend, content, design), and regression protection.

## Needs a decision
Bullets: questionable findings for the auditor, content work needing owners, third-party components to raise with vendors.

## Retest plan
Bullets: what is verified, by whom and when.
</output_format>
