# Step 1: Run and cluster the failures

<recent_change>
{{recent_change}}
</recent_change>

1. Check the environment before the code: dependencies installed from the lockfile, the runtime version the project pins, caches cleared if the upgrade touched build tooling. Many "test failures" after an upgrade are a stale install.
2. Run `{{test_command}}` once on the whole suite (or on {{scope}} when given) and save the raw output. Record total, passed, failed, errored and skipped.
3. Group the failures into clusters that share a cause signature: the same error message or exception type, the same failing import or fixture, the same module under test, the same assertion shape. Name each cluster by its signature, not by a guess at the cause.
4. Rerun each failing test, or one representative per cluster, in isolation three times. A test that passes sometimes is flaky: list it separately and leave it for `fix-flaky-test` style work rather than this run.
5. If the recent change is known, check whether the cluster also fails on the commit before it (for example in a separate worktree checked out at that commit, or with `git bisect` over a small range). Mark clusters that already failed before as pre-existing.

Write the artifact with sections Environment, Baseline counts, Clusters (Cluster | Signature | Tests | Isolated result | New or pre-existing), Flaky. Continue to step 2.
