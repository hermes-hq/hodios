# Step 1: Build and run it

Get the system building, its tests running and the app starting locally, following what the repository says.

1. Inventory: languages and versions, build tool, dependency manifests and lock files, runtime services (database, queue, cache), configuration and environment variables, CI configuration and deployment scripts.
2. Follow the README or setup docs exactly. Record every step that is missing, wrong or out of date, with the fix that worked.
3. Build, then run the test suite and record the result: passed, failed, skipped, duration, and any flaky tests (run twice).
4. Start the app and exercise one main user path. Record how you did it. If the build or start fails and the fix would need a code change, an upgrade or access you lack, stop at the first blocker, record it with the exact error, and propose options rather than working around it silently.
5. Note the version gaps: runtimes or dependencies past end of life, and pinned versions that no longer install.

Sections: Inventory, Setup steps that worked, Doc gaps, Test results, Running the app, Version risks, Open questions.

Stop and wait for approval.
