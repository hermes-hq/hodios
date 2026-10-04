# Step 1: Measure

1. Run `{{coverage_command}}` and record overall line and branch coverage, and coverage per file or package. If the suite fails, stop and report: a coverage campaign on a red suite measures nothing.
2. Gather risk signals for each source file with low coverage:
   - Churn: commits touching the file in the last six to twelve months (`git log --since=... --name-only`).
   - Bug history: commits or issues mentioning fix, bug or revert for that file.
   - Complexity: branch count or cyclomatic complexity from an existing tool, or a rough count of conditionals.
   - Criticality: money, auth, permissions, data deletion, external integrations, anything the README or architecture docs call core.
3. Note what the existing tests look like: framework, helpers, fixtures, factories, how external services are faked. New tests must match.

Write the artifact: Baseline (overall and per package), Risk table (File | Coverage | Churn | Bug fixes | Complexity | Criticality), Test conventions. Continue to step 2.
