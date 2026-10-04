# Step 3: Fix in small commits

1. Fix one source per change, following the approved plan: native elements in place of clickable divs, labels and names, focus management in dialogs and route changes, visible focus styles, live regions for async status, contrast through design tokens rather than one-off colours.
2. After each fix, re-check the affected flow with the keyboard and the accessibility snapshot, and rerun the scan for the affected routes.
3. Add a regression test where the project has a place for it: an axe assertion in component or end-to-end tests, a keyboard interaction test for the widget, or a contrast check on tokens.
4. Keep each commit to one issue type so a reviewer can verify it. Do not mix in unrelated refactors or visual redesign.
5. Run the project's existing tests and linters after each fix.

Continue to step 4.
