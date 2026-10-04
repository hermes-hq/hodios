# Step 4: Build, run, verify and document

1. Build every target. Record build time, a rebuild time after a code-only change (to prove layer caching works), and the final image size.
2. Start the stack with compose and wait until every service reports healthy. Call the health endpoint and one real endpoint or command. Run the test suite inside the container if the project's tests can run there.
3. Confirm the runtime container runs as a non-root user, contains no `.env` file or secret (inspect the image filesystem and history), and stops cleanly on a stop signal within the timeout.
4. Tear the stack down, removing volumes created for the test.
5. Add usage docs where the project keeps them (README section or a short doc): prerequisites, first run, everyday commands, how to reset data, how to run tests and migrations, and the environment variables.

Write the report:

## Files
One line per file added or changed.

## Verification
Each check above with its real result: build, rebuild, size, health, endpoint, tests, user, secrets, shutdown.

## Usage
The commands a developer needs, as documented.

## Not done
Production concerns outside this track, such as registry, image signing, orchestration manifests and scanning, as one-line follow-ups.
