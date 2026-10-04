# Step 1: Detect how the app builds and runs

<services>
{{services}}
</services>

1. Identify the language, runtime version (from version files and manifests), package manager and lockfile, build command, start command for production and for development, and the port it listens on.
2. List the environment variables the app reads (config modules, `.env.example`, framework settings) and which are secrets.
3. Find backing services from the services list above, config, connection strings and dependencies (database drivers, cache and queue clients). Note versions where config or CI pins them.
4. Note runtime needs: files it writes (uploads, caches, logs: should go to stdout), background workers or schedulers that need their own container, migrations and how they run, assets compiled at build time, system libraries native dependencies need, and a health or readiness endpoint (or where one could be added).
5. Check for existing Dockerfiles, compose files, `.dockerignore` and devcontainer config.

Write the artifact: Stack, Commands, Environment (Variable | Secret | Default | Source), Services, Runtime needs, Existing container files, Plan for {{target}}, Open questions. Stop and wait for approval.
