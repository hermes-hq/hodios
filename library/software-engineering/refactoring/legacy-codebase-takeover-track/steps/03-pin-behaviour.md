# Step 3: Pin behaviour around the area to change

Choose the area: the code touched by the first change goal, or, if none was given, the highest-danger hotspot from step 2 that is still small enough to cover.

1. List the behaviours of that area worth pinning: inputs, outputs, side effects (database writes, messages, files) and edge cases seen in the code.
2. Write characterisation tests that record what the code does today, bugs included. Use realistic inputs, golden-master or snapshot comparison for large outputs, and fakes only at true external boundaries.
3. If the code cannot be tested as is, introduce the smallest seam (extract a method, parameterise a dependency, wrap a static call) in its own commit, and explain why it preserves behaviour.
4. Run the tests twice to check they are stable, and mark any surprising behaviour they reveal with a comment rather than fixing it.

Sections: Area chosen and why, Behaviours pinned, Tests added (files and what each pins), Seams introduced, Surprises found, Open questions.

Stop and wait for approval.
