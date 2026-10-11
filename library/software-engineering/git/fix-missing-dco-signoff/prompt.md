---
schema: 1
id: fix-missing-dco-signoff
kind: prompt
title: Fix a failing DCO sign-off check
description: Adds missing Signed-off-by lines to a pull request's commits so the DCO check passes, keeping authorship, co-authors and commit signatures intact and never signing for others.
category: git
version: 1.0.0
status: incubating
stage: [review, ship]
role: [software-engineer, maintainer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dco, sign-off, rebase, force-with-lease, open-source-contribution]
pairs_with:
  prompts: [choose-cla-or-dco, fix-commit-author-identity, set-up-commit-signing, open-first-pull-request-to-project]
args:
  - name: check_output
    description: What the DCO check reports, for example the list of commits it flagged and the message it shows.
    type: text
    required: true
  - name: base_branch
    description: The branch the pull request targets.
    type: string
    default: main
output_contract:
  format: markdown
  sections: [What failed, What I did, Next step, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Developer Certificate of Origin check looks for a `Signed-off-by: Name <email>` trailer in every commit of a pull request, and most implementations require the email to match the commit's author email. The sign-off is a personal statement by the author that they have the right to submit the code, so it can only be added by that author. Adding it means rewriting the commits, which changes their hashes and needs a force-push of the pull request branch. Common mistakes: signing off with a different email than the author's, so the check still fails; adding a sign-off to a colleague's commit; losing existing `Co-authored-by` trailers or GPG and SSH signatures in the rewrite; flattening merge commits by accident; and using plain `--force`, which can overwrite a maintainer's pushed fixups. Some projects allow a remediation commit instead of a rewrite; check the project's contributing guide.

<check_output>
{{check_output}}
</check_output>
Base branch: {{base_branch}} (use main if this is empty)
</context>

<task>
1. Read the project's contributing guide for its DCO rules and whether remediation commits are accepted.
2. List the pull request's commits against the base (`git log --format='%h %an <%ae> | %(trailers:key=Signed-off-by,valueonly,separator=%x2C )' <base>..HEAD`). Mark which lack a sign-off and whether the author email matches `git config user.email`.
3. If any unsigned commit was authored by someone else, stop for those commits and tell the user that author must sign off their own commits.
4. If the author email in the commits is wrong (for example a machine hostname address), say so and point to fixing the identity first, because a sign-off with a mismatched email still fails.
5. Create a backup branch (`git branch backup/<branch>-before-signoff`).
6. Add the sign-offs with `git rebase --signoff <merge-base>`, keeping existing trailers. This signs every rewritten commit as the current user, so use it only when all commits in the range are the user's; otherwise use `git rebase -i <merge-base>` and add the sign-off (`git commit --amend --no-edit -s`) only after the user's own commits. Use `--rebase-merges` if the branch contains merge commits you must keep. If the commits were signed, re-sign them (`-S`) and say so.
7. Verify: every commit in range now has a sign-off matching its author, the tree is identical to the backup (`git diff backup/<branch>-before-signoff HEAD` is empty), and authors and dates are unchanged.
8. Show the push command `git push --force-with-lease origin <branch>` and wait for the user to confirm before running it.
9. Tell the user how to avoid it next time: `git commit -s`, or a `commit-msg` hook or `format.signOff` setting.
</task>

<constraints>
- Never add a sign-off on behalf of another person, and never change the author of a commit to make the check pass.
- Do not push without explicit confirmation, and never use plain `--force`.
- Do not squash or reorder commits unless the user asks.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What failed
The flagged commits and the reason for each (missing, wrong email, other author).
## What I did
Commands run, and the verification results.
## Next step
The push command and what it does to the open pull request.
## Not fixed
Commits that need another person, or "None".
</output_format>
