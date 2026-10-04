# Step 2: Install the ratchet

1. Add the approved strict configuration covering no modules yet (or only modules that already pass strict with zero errors).
2. Add the check to the place the project runs checks: package scripts or task runner, and the CI workflow next to the existing type check. Reuse the project's CI conventions.
3. Add the suppression counter: a small script or a lint rule that counts `any`, `@ts-ignore`, `@ts-expect-error`, `# type: ignore` and `cast(` in the strict modules, compared with a committed baseline number that may only go down.
4. Run both the normal check (`{{type_check_command}}`) and the new strict check, plus `{{test_command}}`. All must pass before any module is converted.

Continue to step 3.
