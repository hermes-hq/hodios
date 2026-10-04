# Step 2: Set up and migrate a first batch

1. Install {{to_framework}} and write its config so it mirrors the old behaviour: discovery patterns limited to migrated files, environment, aliases, setup files, coverage paths. Add a separate script to run it.
2. Pick a first batch of five to ten files that is representative: include the hardest features from the inventory (module mocks, timers, snapshots, custom matchers), not only the easy files.
3. Run the codemod on the batch, then fix by hand what it missed. Regenerate snapshots only after checking that the diff is formatting (serializer differences), never content; list every regenerated snapshot.
4. Run the batch under the new framework and compare per test with the baseline: every test present by name, same pass, fail or skip state. Explain each difference.
5. Remove the batch from the old framework's discovery so no file runs twice, and confirm the old suite still passes for the rest.

Write the artifact: Config decisions, Batch files, Manual fixes by pattern, Parity table (File | Old counts | New counts | Differences explained), Snapshot changes. Stop and wait for approval; the patterns approved here are reused for every later batch.
