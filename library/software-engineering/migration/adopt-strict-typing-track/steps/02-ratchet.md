# Step 2: Install the ratchet

1. Add the approved strict configuration, starting with only modules that already pass strict (or, inverse design, with every other module listed as unconverted).
2. Wire the strict check into the project's scripts or task runner and into CI next to the existing type check.
3. Add a suppression counter for converted modules (`any`, non-null assertions, `@ts-ignore`, `@ts-expect-error`, `# type: ignore`, `cast(`) compared with a committed number that may only go down.
4. Prove the ratchet bites: in a scratch change, add one strict error and one suppression to a converted file, confirm the check fails for each, then revert.
5. Run `{{type_check_command}}`, the strict check and the tests. All must pass before any module is converted.

Continue to step 3.
