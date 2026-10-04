# Step 2: Choose targets

1. Rank the files by risk: high criticality and churn with low branch coverage first. When {{target}} names a path or a percentage, rank within it and compute how many uncovered branches the goal needs.
2. For the top targets, list the specific untested behaviours: the uncovered branches and what each one means in domain terms ("refund larger than the original charge", "expired token with a valid refresh token"), the error paths, and the boundary values.
3. Drop code that is not worth testing here (generated code, trivial getters, dead code, thin wrappers over a library) and say why. Dead code goes on the follow-up list rather than getting tests.
4. Fit the plan inside {{budget_files}} test files.

Write the artifact: Targets (File | Behaviours to test | Why risky | Test file), Skipped and why, Expected coverage change. Stop and wait for approval.
