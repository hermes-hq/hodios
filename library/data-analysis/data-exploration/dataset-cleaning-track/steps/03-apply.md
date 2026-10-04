# Step 3: Apply the rules in a pipeline

1. Implement each approved rule as its own named function or step in the script, in the approved order, reading from the raw file every run.
2. After each rule, log the number of rows in and out and values changed, to a structured log the script writes.
3. Keep removed rows in a separate file with the rule that removed them.
4. Make the script deterministic and idempotent: fixed sort orders, explicit types, no dependence on the current date unless parameterised, the same output on every run.
5. Implement the validation checks from step 2 as code that runs at the end of the pipeline and fails loudly when a check fails.

Continue to step 4.
