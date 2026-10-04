# Step 2: Propose cleaning rules

<business_rules>
{{rules}}
</business_rules>

1. For each problem from step 1, propose a rule: what it matches, the action (standardise, convert, impute, flag, drop), the evidence that justifies it, and how many rows and values it affects.
2. Turn the business rules above into checks and actions. When a business rule conflicts with what the data shows (for example a "unique" key with duplicates), do not resolve it silently: show the conflict with counts and examples by key, and propose options.
3. Prefer reversible actions: standardise and flag rather than drop; keep the original value in a column when overwriting matters; never impute values that will be used as if observed without a flag column.
4. Order the rules so each one sees the output of the previous one, and note the dependencies.
5. List the validation checks the clean data must pass: types, allowed values, ranges, uniqueness, not-null, cross-column logic, and row count reconciliation.

Write the artifact: Rules (No. | Problem | Rule | Action | Evidence | Rows affected), Conflicts needing a decision, Validation checks. Stop and wait for approval.
