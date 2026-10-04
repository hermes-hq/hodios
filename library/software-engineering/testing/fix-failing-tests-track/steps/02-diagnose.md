# Step 2: Prove root causes and plan the fixes

For each cluster from step 1, largest first:

1. Read the failing test, the code it exercises and the part of the recent change that touches either. Find the line where expected and actual first diverge.
2. Classify the cause, with the evidence that proves it:
   - **Code regression**: the code no longer does what the test rightly expects.
   - **Intended behaviour change**: the upgrade or merge deliberately changed behaviour, and the test still expects the old one. Cite the upgrade note, changelog or commit.
   - **Test infrastructure**: a fixture, mock, config or helper broke (renamed API in the test framework, changed default, removed global).
   - **Environment**: versions, missing services, time zone, locale, file paths.
   - **Unknown**: you could not prove it. Say what experiment would settle it.
3. Propose the smallest fix for each cluster and list the files it touches. Prefer one fix at the shared cause over many edits at the symptoms.
4. Count the files the whole plan touches.

Write the artifact with a table: Cluster | Cause class | Evidence | Proposed fix | Files | Test changes and justification. Stop and wait for approval. Approval is essential when the plan changes any test's expectations, touches more than five files, or exceeds the {{max_changes}}-file budget; mark those rows clearly.
