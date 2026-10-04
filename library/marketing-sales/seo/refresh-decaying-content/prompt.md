---
schema: 1
id: refresh-decaying-content
kind: prompt
title: Refresh decaying content
description: Finds posts and pages losing search traffic in a performance export, diagnoses why each is declining, and writes a refresh brief or a merge, retire or leave-alone decision for each.
category: seo
version: 1.0.0
status: incubating
stage: [maintain]
role: [marketer, content-creator, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [content-decay, content-refresh, content-pruning, blog-maintenance]
pairs_with:
  prompts: [analyze-search-console-data, resolve-keyword-cannibalization, write-seo-content-brief]
args:
  - name: performance_data
    description: Page-level clicks and impressions for two comparable periods (ideally the last 3 months and the same 3 months a year earlier), with average position if available, and the top queries per page if you have them.
    type: text
    required: true
  - name: page_list
    description: Notes on the pages - publish or update dates, what each is for, which ones bring leads or sales, and anything you know changed (new competitor, product change, site redesign). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Triage, Diagnoses, Refresh briefs, Merge and retire, Order of work]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You maintain blogs and content sections for small businesses and freelancers. Content decays for different reasons and each needs a different fix: facts and years go stale, the searcher's intent shifts (the results page now wants a comparison, a tool or a video), stronger competitors arrive, two of your own pages split the same query, or demand for the topic simply falls. Rewriting everything wastes weeks; changing the date without changing the substance fools nobody. The job is to separate real decay from noise and give each page one clear decision.
</context>

<task>
<performance_data>
{{performance_data}}
</performance_data>

{{#page_list}}<page_list>
{{page_list}}
</page_list>{{/page_list}}

1. Data check: confirm the periods are comparable (same months year on year beats month on month for seasonal topics). Flag site-wide drops across all pages, which point to tracking, a technical change or an update rather than per-page decay, and stop to say so if that is what the data shows.
2. Triage: list pages whose clicks fell meaningfully (as a starting rule, 25% or more and at least 20 clicks a month lost) and pages with high impressions but falling CTR. Ignore pages with too little traffic to judge.
3. Diagnose each flagged page from the evidence pattern:
   - impressions steady, CTR down: results page changed (more features, AI answers, ads) or a stale title or year;
   - impressions and position down: competitors or outdated content;
   - queries changed or position fell for the main query but rose for others: intent shift;
   - two URLs alternating for the same queries: cannibalisation;
   - impressions down with steady position: falling demand or seasonality.
   Say how confident each diagnosis is and what to check (look at today's results page for the main query).
4. Decide per page: refresh (same intent, update substance), rewrite (new intent or format), merge into a named stronger page with a 301 redirect, retire (no traffic, no links, no business value: remove and redirect to the closest relevant page or return a gone status), or leave alone.
5. For each refresh or rewrite, write a brief: main query and intent, what to update (facts, prices, screenshots, steps), sections to add from what now ranks, sections to cut, new title and meta description, internal links to add, keep the URL. Update the visible date only after a substantive change.
6. Order the work by business value first (pages that lead to enquiries or sales), then lost clicks.
</task>

<constraints>
- Use only the supplied numbers; show the period comparison you used. Do not invent queries, positions or competitors.
- If the export has only one period, say decay cannot be measured and ask for a comparison period.
- Never recommend deleting a page that has links or conversions without a redirect.
- Mark any diagnosis that needs a look at the live results page as "to confirm".
</constraints>

<output_format>
## Data check
Periods compared, site-wide pattern, data limits.

## Triage
Table: Page | Clicks before | Clicks now | Change % | Impressions change | CTR change | Flag.

## Diagnoses
Per flagged page: likely cause, evidence, confidence, what to confirm.

## Refresh briefs
One brief per refresh or rewrite, using the items in step 5.

## Merge and retire
Table: Page | Decision | Redirect to | Reason.

## Order of work
Numbered list with rough effort per item.
</output_format>
