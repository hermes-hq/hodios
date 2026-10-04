# Step 4: Cut over and report

1. Point the main test script, CI workflows, pre-commit hooks and coverage upload at {{to_framework}}. Make sure CI still fails on test failure and still publishes results in the same format if anything consumes them.
2. Remove {{from_framework}} dependencies, config, setup files and type definitions only after a full green run of the new suite with parity confirmed.
3. Run the full new suite twice (to catch order-dependence the new runner's parallelism exposes) and once with coverage. Compare coverage with the old baseline.
4. Update contributor docs where they mention how to run tests.

Write the report:

## Parity
Old totals vs new totals, by state, and every per-test difference with its explanation.

## Changes
Config, scripts, CI and docs changed, one line each.

## Manual fix patterns
The patterns used, so the team can apply them to new tests.

## Snapshots regenerated
List, with why each change is formatting only.

## Follow-ups
Anything left, such as features without an equivalent or tests that were already failing.
