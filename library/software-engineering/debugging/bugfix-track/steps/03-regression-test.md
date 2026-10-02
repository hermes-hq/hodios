# Step 3: Regression test

Write the test that proves the bug, before changing the code under test.

1. Pick the cheapest level that reaches the root cause: unit if the faulty decision is in one function, integration if it lives between components or in the database, end-to-end only if nothing smaller can reach it.
2. Follow the project's test conventions; read a neighbouring test first.
3. Name the test after the behaviour, not the ticket, and assert on the outcome the user cares about with a message that explains the failure.
4. Make it deterministic: fixed clocks, seeds and data, no sleeps. For an intermittent bug, force the bad timing instead of hoping to hit it.
5. Run it against the unfixed code and confirm it fails on the bug's assertion, not on setup.

Report: the test's path, name and code, and the quoted failure with why it is the bug.

Stop and wait for approval before changing the code under test.
