---
schema: 1
id: conventional-commits-rules
kind: rule
title: Conventional Commits rules
description: Makes the assistant write every commit in Conventional Commits 1.0.0 format, one logical change per commit, with honest breaking-change footers. Use in repos that release from commits.
category: git
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, maintainer]
stack: [git]
requires: [none]
output: [commit-message]
risk: read-only
invocation: user
model_tier: small
level: beginner
tags: [conventional-commits, commit-message, semver]
pairs_with:
  prompts: [write-commit-message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write a commit message, follow Conventional Commits 1.0.0.

- Write the header as `type(scope): description`. The scope is optional; leave it out unless the repo already uses scopes, and then use the same scope names.
- Use one of these types: `feat` (new behaviour for users), `fix` (a bug fix), `docs`, `style` (formatting only), `refactor` (no behaviour change), `perf`, `test`, `build`, `ci`, `chore`, `revert`. Do not invent new types unless the repo's commitlint config lists them.
- Write the type and scope in lowercase. Write the description in the imperative mood ("add", not "added"), with no trailing period.
- Keep the header under 72 characters.
- Put one logical change in each commit. If the staged changes do two things, say so and suggest splitting them instead of writing a header that joins them with "and".
- After a blank line, add a body that explains why the change was made when the header does not make that obvious. Wrap it at 72 characters. Do not narrate the diff.
- Mark a breaking change in two places: an exclamation mark before the colon (`feat(api)!: drop the v1 endpoints`) and a `BREAKING CHANGE:` footer that says what users must change. Write `BREAKING CHANGE` in uppercase.
- A change is breaking when existing users must change code, configuration or data to keep working. Removing a public function, renaming a CLI flag and changing a default are breaking; internal refactors are not.
- Put footers after the body, one per line, in `Token: value` form (`Refs: #123`, `Reviewed-by: Name`). Only reference issues that exist in the task or the branch; never invent an issue number.
- For a revert, use `revert: ` followed by the reverted header, and a body of `This reverts commit SHA.` with the real sha.
- Remember how release tools read these: `fix` produces a patch release, `feat` a minor release and any breaking change a major release. Choose the type by its effect on users, not by the size of the diff.
- Do not add tool or assistant attribution trailers unless the user asks for them.
