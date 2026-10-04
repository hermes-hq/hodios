# Step 4: Hygiene and automation

1. Remove unused dependencies (search the code for imports before removing), move misplaced ones between runtime and development, and deduplicate the lockfile with the package manager's own command.
2. Make CI install from the lockfile in frozen or locked mode so drift fails the build.
3. Configure an update bot or scheduled job: weekly grouped patch and minor updates, majors as separate pull requests, security updates immediately, sensible open pull request limits, and auto-merge only for patch updates of development dependencies with passing checks if the team agrees.
4. Add a vulnerability audit step to CI with a policy for what fails the build.
5. Write a short maintenance routine: who reviews update pull requests and how often.

Sections: Clean-up, CI changes, Automation config (code block), Routine, Final summary (packages updated, deferred, replaced, checks).
