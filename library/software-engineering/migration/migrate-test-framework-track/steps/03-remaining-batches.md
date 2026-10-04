# Step 3: Migrate the rest in batches

1. Migrate the remaining files in batches of {{batch_size}}, applying the codemod and the fix patterns approved in step 2.
2. After each batch, run the new suite and the remaining old suite, and check parity for the batch by test name. A test missing from the new run is a blocker, not a footnote.
3. When a file needs a new kind of manual fix not seen in step 2, apply it, record it, and continue; if it would change what a test asserts, stop and ask.
4. Keep a running parity tally: migrated files, tests matched, differences explained.

Continue to step 4 when every file is migrated and parity holds.
