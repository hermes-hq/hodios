# Step 4: Make the first small change

Make the first change goal, or if none was given, one safe improvement found earlier (a doc fix, a flaky test, a missing log line), end to end.

1. Restate the change and its acceptance check. If it is larger than a day of work, propose a smaller first slice and ask.
2. Write a failing test for the new behaviour, then make the smallest change that passes it, following the codebase's existing patterns even where you would do it differently.
3. Run the full test suite and the app's main path again. Compare with the step 1 baseline.
4. Prepare the change for review: separate commits for any refactoring and for the behaviour change, a description with what, why, how it was tested and the rollback.
5. Note what the deployment of this change needs (migrations, flags, config) and who should approve it.

Sections: Change and acceptance check, Diff summary, Test evidence, Review description, Deployment notes, Open questions.

Stop and wait for approval.
