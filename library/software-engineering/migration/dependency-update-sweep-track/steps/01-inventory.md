# Step 1: Inventory and risk-rank

1. Detect the package manager and confirm the lockfile is in sync with the manifest. Run the baseline checks and record results, including existing failures and warnings.
2. List outdated direct dependencies with the package manager's outdated command (and audit command for known vulnerabilities). Separate runtime from development dependencies.
3. For each: current, wanted (within range), latest, update type (patch, minor, major), majors crossed, known advisories, whether it is still maintained, and how widely the code uses it.
4. Risk-rank: security fixes first; then patch and minor updates (usually safe as one batch if tests are decent); then majors ordered by dependency (frameworks and their plugins move together; type packages with their libraries); flag unmaintained packages for replacement rather than upgrade.
5. Note runtime constraints: packages whose latest version needs a newer language runtime than the project uses.

Sections: Baseline, Inventory (table: package | current | latest | type | advisories | usage | risk), Plan order, Replacements to consider, Open questions. Stop and wait for approval.
