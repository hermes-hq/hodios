# Step 3: Convert one module (repeat per module)

Take the next module in the approved order.

1. Move the module onto the strict side of the ratchet (add it to the strict list, or remove it from the unconverted list) and run the strict check to list its errors in that module only.
2. Fix them in this order of preference: correct annotations on public functions and exported types; narrowing (type guards, `isinstance`, discriminated unions, early returns) instead of casts; `unknown` plus validation at untyped boundaries such as JSON parsing, environment variables and third-party responses; an explicit annotation at the boundary when a loose type comes from a module not yet converted; stubs for untyped dependencies; a counted, commented suppression only when none of these work.
3. When an error is a real bug, add it to the bug list with file and line, what could go wrong at runtime, and whether you fixed it (with the covering test) or left it for a decision.
4. Run the strict check, `{{type_check_command}}` and the tests. All must pass, and the suppression count must not exceed the step 2 baseline plus the documented new ones.

Append to the module log: Module | Errors fixed | Suppressions added (with reasons) | Bugs found | Checks run and results. Stop and wait for approval before the next module. If the user approves a batch of modules at once, still run all checks and log each module separately.
