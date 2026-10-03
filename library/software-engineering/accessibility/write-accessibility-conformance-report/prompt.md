---
schema: 1
id: write-accessibility-conformance-report
kind: prompt
title: Write an accessibility conformance report
description: Writes an accessibility conformance report (ACR) in the VPAT format from audit results, with a conformance level and specific remarks per criterion. Use when customers or procurement ask for a VPAT.
category: accessibility
version: 1.0.1
status: incubating
stage: [ship, review]
role: [product-manager, frontend-engineer, technical-writer, qa-engineer]
stack: []
requires: [none]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
tags: [vpat, wcag, section-508, en-301-549, procurement]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, audit-mobile-accessibility]
args:
  - name: audit_results
    description: The audit findings - for each issue the WCAG success criterion, where it occurs, severity and status - plus the evaluation methods used (tools, manual testing, assistive technologies and versions) and what was in scope.
    type: text
    required: true
  - name: product
    description: Product name, version and the platforms or parts covered, for example "Acme Portal 4.2, web app and admin console".
    type: string
    required: true
  - name: edition
    description: Which VPAT edition to follow - WCAG only, Section 508 (US federal), EN 301 549 (EU), or the international edition that combines them.
    type: enum
    enum: [wcag, section-508, en-301-549, international]
    default: wcag
output_contract:
  format: markdown
  sections: [Report, Gaps before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Untested A and AA criteria get a visible placeholder in the table, and 4.1.1 Parsing follows the template note for WCAG 2.2."}
---
<context>
An Accessibility Conformance Report is a vendor's statement of how a product meets an accessibility standard, usually written on the VPAT template. Buyers read the remarks, not just the levels. Reports lose credibility (and can create legal exposure) when they claim "Supports" for criteria that were never tested, use vague remarks like "mostly accessible", omit the evaluation methods, or quietly drop known failures. The VPAT conformance terms are fixed: Supports, Partially Supports, Does Not Support, Not Applicable, and Not Evaluated (allowed only for Level AAA criteria in the WCAG tables).
</context>

<task>
Write an accessibility conformance report for {{product}} on the current VPAT template, edition: {{edition}} (wcag, section-508, en-301-549 or international). Use these results:
<audit_results>
{{audit_results}}
</audit_results>

1. If the audit does not say which WCAG version and level were tested, or what was in scope, ask and stop. Default to WCAG 2.2 Level A and AA if the user confirms no preference.
2. Fill the report header: product name and version, report date, description, contact placeholder, evaluation methods (tools, manual testing, assistive technologies with versions, and who tested), and the applicable standards for the edition.
3. For every success criterion at the levels in scope, in WCAG order, assign one conformance term:
   - **Supports**: tested, and no failures found.
   - **Partially Supports**: some functionality fails; name where.
   - **Does Not Support**: most or all functionality fails.
   - **Not Applicable**: the product has no content the criterion covers (for example no audio, no video); say why.
   Criteria the audit did not cover are not marked Supports: put `[NOT YET EVALUATED]` in the conformance cell and list them under Gaps before publishing, so the report cannot be published as finished. For WCAG 2.2, 4.1.1 Parsing is obsolete; follow the template's note for it instead of evaluating it.
4. Write remarks that a buyer can act on: which screens or components fail, how (for example "Date picker cannot be operated with the keyboard"), and a planned fix only if the user provided one. Keep remarks factual, without marketing language or promises.
5. For editions beyond WCAG, add the extra chapters the edition requires (for example Section 508 chapters 3, 5 and 6, or EN 301 549 clauses for functional performance, software and documentation) and mark the ones the audit does not address as gaps rather than guessing.
</task>

<constraints>
- Never upgrade a level beyond what the audit evidence shows, and never omit a known failure.
- Keep personal names out of the report unless the user supplies them for the contact field.
- The report is the vendor's own statement. Recommend a review by an accessibility specialist and, where the report goes into contracts or public procurement, by legal counsel before publishing.
</constraints>

<output_format>
## Report
The report in Markdown: header fields, evaluation methods, applicable standards, then one table per level or chapter with columns criterion, conformance level, remarks and explanations.
## Gaps before publishing
Numbered list: criteria not evaluated, missing header information, chapters the audit did not cover.
</output_format>
