# Step 1: Audit

1. Follow the repository's own setup docs from a clean state as far as the environment allows. Time install, build, the full test suite and lint. Note every step that needed a guess, a manual fix or a credential.
2. Find the fastest feedback commands: a single test file or test name, type check, lint on one file. Time them. Note if none exists.
3. Read existing agent instruction files and contributor docs. Mark lines that are stale (a command that failed or no longer exists), generic, or conflicting.
4. List sensitive and noisy paths by name: environment files, keys, data exports, generated code, vendored code, large fixtures.
5. Check how changes are verified in CI and whether the local commands match.

Write the artifact: Setup log (step, command, result, time), Feedback commands (command, time, scope), Instruction file issues, Sensitive and noisy paths, Gaps ranked by how much they would hurt an agent working on: {{goal}}. Stop and wait for approval.
