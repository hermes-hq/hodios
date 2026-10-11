# Step 3: Guardrails

1. Propose the agent permission configuration for {{goal}}: allow the build, test and lint commands from step 2 without approval; require approval for installing dependencies, network access beyond package registries, pushing and anything outside the repository; deny reading the sensitive paths from step 1 and editing the agent's own configuration.
2. Add an ignore configuration for the noisy paths, keeping readable any generated file the code imports. State that ignore files do not protect secrets from shell access.
3. If a sensitive file holds a real secret in the working tree, do not move or rotate it yourself; list it for the team with the recommendation.
4. Where the audit showed slow or missing feedback, propose the smallest fix, for example a script that runs tests for changed files or a fast lint target, and add it only if approved.
5. Optionally propose one or two hooks with clear value (format after edit, block commands touching protected paths). Keep each fast.

Show the configuration files and any new scripts as diffs, each with one line on why. Mark keys you are not sure of "check against the tool's documentation". Stop and wait for approval.
