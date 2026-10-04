# Step 1: Find every pin and every breaking change

1. Confirm the current version and that {{target_version}} is a released, supported version of {{runtime}} (check the official release schedule). If it is not, say so and stop.
2. Find every place the version is pinned or assumed. Search for all of these that apply:
   - Version files: `.nvmrc`, `.node-version`, `.python-version`, `.ruby-version`, `.tool-versions`, `.sdkmanrc`, `global.json`, `rust-toolchain`-style files.
   - Manifests: `engines` in package.json, `requires-python` and classifiers in pyproject or setup files, `ruby` in the Gemfile, `go` and `toolchain` directives in go.mod, Maven or Gradle toolchain and release level, `TargetFramework` in project files.
   - Images and environments: Dockerfile `FROM` lines, compose files, devcontainer config, CI matrices and setup actions, serverless and platform runtime settings, Helm values and infrastructure code.
   - Docs: README, CONTRIBUTING, onboarding notes.
3. Read the release notes and migration guides for each version crossed and list the breaking changes and removals that could touch this code. Search the code for each one.
4. Check dependencies: packages with native extensions or engine constraints, minimum versions known to support the target, and any dependency pinned to the old runtime.
5. Run `{{test_command}}` on the current version to record the baseline, including deprecation warnings.

Write the artifact: Baseline, Pins (File | Current | Change), Breaking changes (Change | Source | Where it hits | Fix), Dependencies to bump (Package | From | To | Why), Risks. Stop and wait for approval.
