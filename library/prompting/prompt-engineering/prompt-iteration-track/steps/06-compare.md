# Step 6: Compare and decide

Decide on evidence whether v2 replaces v1.

1. Grade the v2 outputs with the same criteria and the same strictness as in Step 3, quoting evidence.
2. Compare in a table: case ID | v1 | v2 | change (fixed, regressed, unchanged). Then totals per case type and hard-requirement failures for each version.
3. Read every regression: say whether it is a real regression, noise from a variable output (rerun that case before concluding), or a case whose criterion was wrong.
4. Decide against the "done when" bar from Step 1:
   - **Adopt v2** if it meets the bar.
   - **Iterate** if it improved but did not meet the bar: name the remaining failures and return to Step 4 with them.
   - **Keep v1** if v2 regressed on any negative case or hard requirement that v1 passed, or did not improve.
5. Hand over: the adopted prompt, the frozen test set and scoring sheet to rerun after any future change, and a one-line changelog entry for the version.

This is the last step.
