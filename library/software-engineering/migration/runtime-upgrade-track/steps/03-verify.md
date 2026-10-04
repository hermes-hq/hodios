# Step 3: Verify everywhere and report

1. Run `{{test_command}}` in full on {{target_version}}. Compare with the baseline: no new failures, no new skips.
2. Build the production artifact and any Docker image, and run the app or a smoke command inside it to prove the image starts on the new runtime.
3. Run the linters, type checker and build that CI runs. Validate that every CI file you changed is syntactically valid.
4. Confirm no pin was missed: search the repo again for the old version string.

Write the report:

## Result
Commands run on the target version and their real results, compared with the baseline.

## Pins changed
One line per file.

## Code changes
Each breaking change fixed, with its source.

## Dependencies bumped
Package, from, to, why.

## Rollout notes
What must change outside the repo (platform runtime settings, base images in other repos, developer machines) and in what order.

## Left open
Deprecations deferred, warnings remaining, anything not verified.
