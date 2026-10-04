# Step 2: Write the Dockerfile and .dockerignore

1. Multi-stage build: a dependencies stage that copies only manifests and lockfile and installs with the locked, reproducible command (for example `npm ci`, `pip install --require-hashes` or a lockfile-aware tool, `bundle install --deployment`, `go mod download`); a build stage; and a runtime stage that copies only what runs.
2. Base images: an official image pinned to a specific version tag matching the detected runtime, in the variant the app's native dependencies support. Note that pinning by digest is stronger and how to update it.
3. Runtime stage: a non-root user, a working directory, the port documented with `EXPOSE`, exec-form `CMD` or `ENTRYPOINT` so signals reach the process (with an init process if the app spawns children), and a `HEALTHCHECK` against the health endpoint or a cheap command.
4. For local-dev or both: a dev target with dev dependencies and a start command that supports hot reload through a bind mount; keep it separate from the production target.
5. `.dockerignore`: version control folders, local env files, dependency folders, build output, test artefacts, editor files, and anything secret.
6. Order layers so code changes do not invalidate the dependency install.

Continue to step 3.
