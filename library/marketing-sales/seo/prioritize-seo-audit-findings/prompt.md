---
schema: 1
id: prioritize-seo-audit-findings
kind: prompt
title: Prioritise SEO audit findings into tickets
description: Turns a long SEO audit or crawler report into a ranked fix list by impact, effort and risk, written as developer-ready tickets with acceptance checks.
category: seo
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, product-manager, consultant, tech-lead]
requires: [none]
inputs: [document, dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [audit-triage, backlog, developer-tickets, impact-effort, technical-debt]
pairs_with:
  prompts: [audit-technical-seo, audit-on-page-seo, write-search-ranking-report]
  personas: [seo-strategist]
args:
  - name: audit
    description: The audit or crawler report, as pasted text or an export of issues with counts and example URLs.
    type: text
    required: true
  - name: context
    description: Site type and size, which page types bring revenue, the platform, dev capacity (for example "one sprint a month"), and the ticket format your team uses. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What matters, Ranked list, Tickets, Ignore or defer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an SEO lead who gets audits implemented. Crawler tools report hundreds of "issues" with alarming colours, and most audits fail because nobody can tell which five matter. Experienced leads rank by: how many important pages are affected (revenue pages over tag archives); how directly the issue blocks crawling, indexing or understanding (a noindex on product pages beats long meta descriptions); confidence that fixing it will change outcomes; effort and who must do it; and risk of breaking something. Many reported issues are cosmetic or false alarms: missing meta descriptions on paginated pages, H1 length, multiple H1s in modern templates, "low word count" on legitimately short pages, or redirects that are correct.

They also group issues by root cause, since one template fix often clears thousands of URL-level warnings, and write tickets developers can act on: the problem in one sentence, the affected template or pattern, examples, the exact expected behaviour, and an acceptance test.
</context>

<task>
Prioritise this audit.

<audit>
{{audit}}
</audit>

{{#context}}<context_notes>
{{context}}
</context_notes>{{/context}}

1. **What matters:** in three to five sentences, the issues that actually limit this site's search performance and why, and how many of the reported issues are noise.
2. **Ranked list:** group issues by root cause (template, configuration, content, links) and score each group on impact, confidence, effort and risk, then rank. Mark quick wins.
3. **Tickets:** for the top groups (up to about ten), a ticket each: title, problem, affected templates or URL patterns with examples, expected behaviour, implementation notes, acceptance checks (how to verify in a crawl, URL Inspection or HTML), owner type (dev, content, SEO), and size.
4. **Ignore or defer:** issues that do not need action or can wait, with a one-line reason, so nobody spends time on them.
</task>

<constraints>
- Use the audit's own counts and examples; do not invent affected URL counts.
- Do not rate cosmetic warnings as high priority because the tool did.
- When the audit lacks data to judge impact (for example traffic per page type), say so and state the assumption.
- Tickets must be specific enough to implement without a meeting; avoid "improve SEO of X".
</constraints>

<output_format>
## What matters
A short paragraph.

## Ranked list
A table: Rank | Root cause | Issues covered | Impact | Confidence | Effort | Risk | Quick win?

## Tickets
One block per ticket with the fields listed.

## Ignore or defer
Bullets: issue, reason.
</output_format>
