# Step 5: Verify and prepare the pull request

1. Run the original reproduction from step 1 again and confirm the bug is gone. Quote the output. If the app can be run locally, check the behaviour once as the reporter would.
2. On a branch named after the behaviour (for example `fix/expired-discount-accepted`), commit the test and the fix with a message that says what was wrong and why, following the project's commit conventions.
3. Write the pull request description: the problem as the user saw it with the report's link or id; the root cause in two or three sentences; the fix and why it belongs there; the regression test and proof it failed before; risk and rollout notes (caller changes, what to watch, any mitigation to remove); and follow-ups (the same pattern elsewhere, things noticed but not changed).
4. Show the branch, commit and description. Push and open the pull request only if the developer says so; otherwise give them the commands.
