# Step 4: Make code samples tested

1. Inventory the code samples on the rewritten and top pages: runnable programs, fragments needing setup, shell commands, output blocks, pseudo-code.
2. If the language, docs tool or CI system is not known yet, ask before writing configuration. Choose how they run in CI for this stack: native doctests, snippets extracted from code fences, or real example files included into pages so the page shows exactly what was tested.
3. Isolation: fake or recorded external calls, test credentials from CI secrets, fixed clock and seed.
4. A CI job that runs on every pull request touching code or docs, with failures pointing to the page and line, and a ratchet: known broken samples get an issue each, new samples must pass.

Sections: Sample inventory, Approach, CI job, Rollout, Open questions. Stop and wait for approval.
