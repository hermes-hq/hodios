# Step 5: Mock and contract tests

Give consumers something to build against and the team a check that keeps the implementation honest.

1. **Mock.** Recommend how to serve a mock generated from the approved contract and keep it in sync. Include realistic data for every operation and a way for consumers to trigger each catalogued error (for example a test header or magic id).
2. **Contract tests** that fail when the implementation drifts: every response, including errors, validated against the contract; per operation, the happy path, a validation error, an authorization failure and, where relevant, idempotent retry, pagination to the last page and a concurrency conflict; and a CI check that fails on breaking changes against the last released contract. Use the project's test framework if named; otherwise pick a common one and say which.
3. If consumers are internal teams, propose consumer-driven contract tests in the provider's pipeline.
4. **Hand-off checklist:** contract reviewed and versioned, mock published, contract tests in CI, error catalogue and changelog published, rate limits documented, owner and support channel named.

This is the last step. List the open questions that still block a first release, each with an owner.
