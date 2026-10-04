# Step 4: Check a sample with mutation testing

1. Use the project's mutation tool if it has one, or the standard tool for the stack (for example Stryker, mutmut, cosmic-ray, PIT, cargo-mutants or go-mutesting). If none can be run, apply five to ten manual mutations per sampled file (negate a condition, change a boundary, drop a statement, return early) and run the tests against each, reverting every one.
2. Limit the run to the target files so it finishes in reasonable time.
3. Triage surviving mutants: equivalent (no behaviour change, ignore), unimportant, or important. Strengthen or add tests for the important survivors and rerun.
4. Rerun `{{coverage_command}}` for the final numbers.

Continue to step 5.
