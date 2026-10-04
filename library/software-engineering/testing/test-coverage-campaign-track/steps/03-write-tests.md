# Step 3: Write behaviour tests

For each approved target:

1. Write one test per behaviour, named for the behaviour in the project's style. Arrange the minimum setup with existing factories and fakes; assert on the observable outcome, including error types and messages where callers depend on them.
2. Cover the boundaries listed in step 2, not only the happy path.
3. Avoid assertion-free tests, snapshot tests of large structures that nobody reads, tests that assert mocks were called as a stand-in for outcomes, and sleeps.
4. Run the new tests and the surrounding suite. Each new test must pass for the right reason: temporarily break the behaviour (flip a condition locally, never committed) and confirm the test fails, at least for the riskiest ones.
5. Keep count of test files touched against {{budget_files}}.

Continue to step 4.
