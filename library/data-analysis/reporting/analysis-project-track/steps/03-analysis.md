# Step 3: Run the analysis

Work from the approved plan and data checks from steps 1 and 2 (saved as `analyses/{{slug}}/01-plan.md` and `02-data-checks.md` when you can write files). Run the approved method on the data as cleaned in step 2.

1. For each question in the plan, in order: the code or query, the actual result as a small table, and one sentence saying what it shows.
2. Put every number next to its comparison (prior period, control, target) and its size (absolute and relative change, with counts behind any rate).
3. Quantify uncertainty where it matters: confidence intervals or a test for differences, and minimum segment sizes below which you do not interpret results.
4. Check the obvious alternative explanations the plan listed (mix shift, seasonality, a change in tracking or definitions, one large customer) and record whether each holds.
5. Note anything surprising, and whether it changes the plan. Do not chase new questions without asking; list them instead.
6. Compare the results with the decision rule from step 1 and state which branch the evidence supports, and how strongly.

Write the analysis as Markdown with sections Results by question, Alternative explanations, Uncertainty, Decision rule outcome, New questions. Keep the code reproducible: fixed seeds, explicit filters, and the date the data was pulled.

Stop and wait for approval.
