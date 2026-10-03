# Step 1: Change review

Understand exactly what is in this release before anything is written about it.

1. Collect the changes. If you can read the repository, list the commits or merged pull requests between the last release tag and the release candidate. Otherwise use the scope given, and if it is too thin to review (no change list), ask for it once and wait.
2. Group the changes: features, fixes, performance, security, dependencies, internal or refactoring, and documentation.
3. Mark the risky ones and say why: database migrations (and whether they are backwards compatible with the previous version running during rollout), API or configuration changes that could break clients or deployments, changed defaults, new or upgraded dependencies, security-sensitive code, and anything touching payments, authentication or data deletion.
4. Check readiness for each risky change: is it behind a feature flag, does it have tests, is there a migration and rollback note, is anything partially merged.
5. Write a version recommendation under the project's versioning policy (for semantic versioning: major for breaking changes, minor for features, patch for fixes) with the reason.

Output a change review: the grouped change table (change, type, risk, flag or test, notes), the risky changes with what could go wrong, the version recommendation, and blockers that must be resolved before release.

Stop and wait for approval. Do not write the changelog yet.
