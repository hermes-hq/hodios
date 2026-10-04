# Step 3: Write the compose file

1. One service for the app (built from the right target) and one per backing service from step 1, using official images pinned to the versions found.
2. Health checks for every service, and `depends_on` with `condition: service_healthy` so the app starts only when its dependencies are ready. Run migrations as a one-off service or an entrypoint step that the app waits on, matching how the project runs them.
3. Named volumes for database data; bind mounts for source code only in the dev setup.
4. Configuration through an env file referenced by compose, with a committed example file holding placeholders and a git-ignored real one.
5. Expose only the ports a developer needs on the host.

Continue to step 4.
