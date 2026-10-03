# Step 2: Metric definitions

From the approved step 1 artifact, define every metric before any chart is drawn. Drop metrics that serve no approved question.

For each metric write a card: display name and plain meaning; formula (ratios as a ratio of totals, not an average of row ratios); grain and aggregation; filters and exclusions (test accounts, refunds, internal users) and time zone; window and comparison; target and owner if needed; source fields (from {{data_sources}}, or "to confirm"); edge cases (late data, currency, restated history).

Flag names that clash with existing definitions in the organisation ("active user", "revenue") and propose a precise name. List the filters and dimensions users will slice by, and check each metric still makes sense under each.

Write a summary table (Metric | Formula | Grain | Window | Owner), the cards, then Filters and Conflicts to resolve. Stop and wait for approval.
