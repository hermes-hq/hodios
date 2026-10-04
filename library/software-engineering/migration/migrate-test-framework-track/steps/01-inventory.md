# Step 1: Baseline and inventory

1. Run `{{test_command}}` and save per-file and per-test results (use the old framework's JSON or JUnit XML reporter). This is the parity baseline. Note tests that already fail or are skipped; they must end in the same state, not silently disappear.
2. Inventory every {{from_framework}} feature the suite relies on, with counts and example files: globals and imports, mocking (module mocks, auto-mocking, spies, manual mocks folders), fake timers, snapshots and their serializers, setup and teardown files, custom matchers, fixtures, parametrisation, test discovery patterns, environment (jsdom, node, browser), path aliases and transforms, coverage config, reporters, watch mode, IDE and CI integration.
3. Check whether {{to_framework}} can run the existing tests largely unchanged (for example, pytest collects unittest and nose-style tests, and Vitest offers Jest-compatible globals and APIs). If it can, plan to switch the runner first, prove parity on the unchanged tests, and convert idioms in later batches; this is safer than rewriting and running at the same time.
4. For each feature, write the {{to_framework}} equivalent and whether a codemod handles it. Use an established codemod when one exists for this pair; list what it does not cover. Mark features with no equivalent.
5. Find every place the old framework is wired in: package scripts or task runners, CI workflows, pre-commit hooks, editor configs, docs.

Write the artifact: Baseline (files, tests, passed, failed, skipped), Feature map (Feature | Uses | Equivalent | Codemod | Notes), Wiring, Risks. Continue to step 2.
