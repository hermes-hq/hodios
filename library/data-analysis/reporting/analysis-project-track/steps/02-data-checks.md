# Step 2: Check the data before trusting it

Work from the approved plan from step 1 (saved as `analyses/{{slug}}/01-plan.md` when you can write files). Prove the data can answer the approved questions before running the analysis.

1. Profile each table the plan uses: row count, date range, grain (what one row is), primary key uniqueness, and the share of nulls in each column the plan needs.
2. Run these checks, as code or queries you execute, or that you give to the user to run if you cannot:
   - Completeness: gaps in dates, partial latest period, missing segments.
   - Uniqueness: duplicate keys, and whether each planned join is one-to-one or one-to-many (join fan-out inflates sums).
   - Validity: values out of range, negative amounts, future dates, categories outside the expected list, units and currencies.
   - Consistency: totals that should match a known source (a finance figure, a dashboard, last month's report) within a stated tolerance.
   - Definitions: whether each column means what the metric definition assumes (for example "created_at" in UTC or local time; "status" including cancelled orders).
3. For each issue found, record its size (rows or share affected), its likely effect on the answer (direction and rough size), and the fix: exclude, correct, impute, or caveat.
4. Say whether the data is fit for the plan as written. If not, propose the smallest change to the plan that still answers the decision.

Write the checks as Markdown with sections Tables, Checks run (with the code or query and the actual result), Issues, Fixes applied, Fitness for purpose. Report results only from output you actually saw.

Stop and wait for approval.
