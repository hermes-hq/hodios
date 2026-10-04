# Step 4: Validate, export and write the log

1. Run the pipeline end to end from the raw file. All validation checks must pass; if one fails, report it and do not export.
2. Run it a second time and confirm the output is identical (compare a checksum or the data).
3. Reconcile counts: raw rows minus each rule's removals equals the final rows.
4. Spot-check five rows by key from raw to clean, including rows touched by the riskiest rules.
5. Export the clean data as {{output_format}} with explicit types preserved as far as the format allows (dates as dates, ids as text so leading zeros survive), and write a data dictionary for the clean columns.

Write the cleaning log:

## Inputs and outputs
Raw file, how it was read, output files, and the command that rebuilds them.

## Rules applied
Table: Rule | Action | Rows affected | Values changed.

## Row reconciliation
Raw rows through each step to final rows.

## Flags left for review
Table: Flag | Count | Meaning.

## Validation
Each check with its real result, and the rerun comparison.

## Data dictionary
Where it is, and a summary of derived and flag columns.
