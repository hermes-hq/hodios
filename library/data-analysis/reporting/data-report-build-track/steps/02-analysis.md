# Step 2: Script the analysis and charts

1. Write one analysis script (or a small module) that loads the data read-only, applies the approved definitions, and computes every number the report will use.
2. Write all results to one machine-readable results file (JSON or CSV), each value with a stable key, its definition, the filter used and the row count behind it.
3. Run sanity checks in the script: totals reconcile with the source, subgroup counts sum to the total, no unexpected nulls in metric inputs, date ranges as approved. Fail loudly when one does not hold.
4. Generate each planned chart from the same results, saved as image files (and as native chart data if the output is a deck). Each chart has a title that states the finding, labelled axes with units, a zero baseline for bar charts, colour-blind-safe colours, and a source note.
5. Run the script from scratch and confirm it reproduces the same results file.

Continue to step 3.
