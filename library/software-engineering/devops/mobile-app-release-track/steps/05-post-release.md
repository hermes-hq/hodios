# Step 5: Post-release monitoring and hotfix decision

1. Ask for the current numbers: rollout stage, crash-free rate by version, top new crash groups, ANRs, support tickets and reviews mentioning the release.
2. Compare with the gates. Decide: continue, pause, flag off, or hotfix, with the reason and the evidence that would change it. Separate client causes (only the new version affected) from server or flag causes (older versions affected too).
3. If hotfixing: scope it to the fix only, reuse steps 2 to 4 in short form, and set the release notes.
4. Close out: flags to clean up, adoption of the new version, the minimum supported version decision, and a short retrospective (what slipped, what broke, one process change).

Sections: Status, Decision, Hotfix plan (if any), Close-out, Retrospective notes, Open questions.
