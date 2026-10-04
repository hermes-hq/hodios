# Step 2: Upgrade in one consistent change

1. Install {{runtime}} {{target_version}} locally with the project's version manager, without changing the system default.
2. Update every approved pin to the same version. Keep major-only pins where the project uses them, and match the base image variant (slim, alpine, distroless) already in use.
3. Bump the approved dependencies and regenerate the lockfile with the target version, so resolution reflects it. Do not upgrade unrelated packages.
4. Fix the breaking changes from step 1 in the code, one kind at a time.
5. Turn deprecation warnings into visible output for the test run (for example `--trace-deprecation` or `NODE_OPTIONS` for Node, `-W error::DeprecationWarning` for a check run in Python, `-Xlint:deprecation` for Java, `RUBYOPT=-W:deprecated` for Ruby, analyzers for .NET, `go vet` for Go) and fix the ones introduced by the target version.
6. Run `{{test_command}}` after each kind of fix.

Continue to step 3.
