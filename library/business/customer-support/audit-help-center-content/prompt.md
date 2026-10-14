---
schema: 1
id: audit-help-center-content
kind: prompt
title: Audit help centre content
description: Audits a help centre export for outdated, duplicate, thin and missing articles, using ticket and search data, and returns a ranked list of fixes with owners.
category: customer-support
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [support-agent, manager, operations-manager, technical-writer]
requires: [none]
inputs: [document, dataset, text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [help-center, knowledge-base, self-service, ticket-deflection, article-audit]
pairs_with:
  prompts: [design-help-center-structure, write-help-center-article, analyze-support-tickets]
args:
  - name: help_center_export
    description: "The articles to audit: title, category, last updated date and body text for each, or at least titles with dates and a short summary. Include view counts and article ratings if your tool has them."
    type: text
    required: true
  - name: ticket_data
    description: "Contact reasons with counts for the last one to three months, or a sample of ticket subjects in customers' own words. Optional but strongly recommended."
    type: text
  - name: search_data
    description: "Help centre search terms with counts, especially searches with no results or followed by a contact. Optional."
    type: text
  - name: recent_changes
    description: "Product, pricing or policy changes since the articles were written, so outdated content can be found. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Article findings, Duplicates and merges, Gaps, Ranked fix list, Keeping it current, Data caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit help centres for support teams. A help centre decays quietly: articles describe screens that changed, two articles answer the same question differently, popular topics have no article at all, and searches that return nothing send customers straight to the contact form. The useful signals are not article count but the mismatch between what customers ask (tickets and searches) and what the help centre answers. High views with high contact volume on the same topic usually means the article is wrong or unclear, not missing. Low views on a topic customers ask about often means a findability problem (wrong title, customer words not used), not a content problem. Deleting low-traffic articles is fine only when nobody needs them; some rare articles (account deletion, legal requests) must stay.
</context>

<task>
Audit this help centre.

<help_center_export>
{{help_center_export}}
</help_center_export>
{{#ticket_data}}
<ticket_data>
{{ticket_data}}
</ticket_data>
{{/ticket_data}}
{{#search_data}}
<search_data>
{{search_data}}
</search_data>
{{/search_data}}
{{#recent_changes}}
<recent_changes>
{{recent_changes}}
</recent_changes>
{{/recent_changes}}

1. Check each article against five problems: outdated (old update date plus a related change, or text that contradicts the recent changes given), duplicate or conflicting (same task answered twice, or different answers), thin (no steps, no answer in the first lines, or ends without a next step), findability (title in internal language rather than the customer's words), and orphaned (no clear contact reason it answers). Give each a decision: keep, update, rewrite, merge or retire.
2. Group duplicates and conflicts. For each group, pick the surviving article, say what to move into it, and note that retired URLs should redirect to it.
3. Match contact reasons and search terms to articles. Mark each reason as covered, covered but not working (article exists, contacts still high), findability gap (article exists, searched words do not match), or missing.
4. Rank the fixes by expected effect: contact volume or search count affected, risk of wrong information (billing, security, legal topics first), and effort. Give each fix a suggested owner role.
5. Propose a light maintenance rhythm: an owner and review date per article, a trigger to update articles when the product or policy changes, and a monthly check of searches with no results.
6. State what the data could not show, such as missing view counts or a ticket sample too small to rank.
</task>

<constraints>
- Judge only from the content and data given. Do not invent view counts, contact counts or product facts; when an article may be outdated but you cannot confirm it, say "check" rather than "wrong".
- Never write corrected steps for the product from guesswork; mark unknown details as [X] for the owner to confirm.
- Do not recommend retiring articles on rare but necessary topics (account closure, data requests, safety, legal terms) just because traffic is low.
- Keep customer personal data out of the output; if the export contains any, say so and do not repeat it.
- Do not recommend specific help-centre software.
</constraints>

<output_format>
## Summary
Five lines: overall state, the three biggest problems, and the first fix.
## Article findings
Table: Article | Problems found | Decision | Note.
## Duplicates and merges
## Gaps
Table: Contact reason or search term | Volume | Status (covered, not working, findability gap, missing) | Action.
## Ranked fix list
Numbered, with reason for the rank and owner role.
## Keeping it current
## Data caveats
</output_format>
