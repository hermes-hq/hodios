---
schema: 1
id: address-review-with-fixup-commits
kind: prompt
title: Address review with fixup commits
description: Answers pull request review comments with fixup commits reviewers can follow one by one, then autosquashes them into clean history before merge without changing the final code.
category: git
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [fixup-commit, autosquash, review-round, pull-request, interactive-rebase]
pairs_with:
  prompts: [clean-up-commit-history, write-commit-message, update-feature-branch-from-main]
args:
  - name: review_comments
    description: The review comments to address, pasted or summarised, with file and line where you have them.
    type: text
    required: true
  - name: merge_method
    description: How the pull request will be merged (squash, rebase or merge commit) and whether reviewers prefer to see fixups before the final squash.
    type: text
output_contract:
  format: markdown
  sections: [Responses, Replies to reviewers, Check, Before merge]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a review, people usually either push one "address comments" commit, which hides which change answers which comment, or amend and force-push, which makes reviewers re-read the whole branch. The proven middle path: one `git commit --fixup=<sha>` per logical response, targeting the original commit that the comment is about, so reviewers can read each fix as a small diff, then `git rebase -i --autosquash` before merge folds each fixup into its target. When the host squash-merges every pull request, the final autosquash is unnecessary and fixups only serve reviewers. `--fixup=amend:<sha>` also rewrites the target's message, and `--fixup=reword:<sha>` changes only the message. Autosquash is a history rewrite, so it needs a force push and should happen after approval, not between review rounds, or reviewers lose their "changes since last review" view.
</context>

<task>
Address these review comments:
<review_comments>
{{review_comments}}
</review_comments>
{{#merge_method}}
Merge method and reviewer preference: {{merge_method}}
{{/merge_method}}

1. Read the branch's commits (`git log --oneline origin/<base>..HEAD`) and the code each comment points to. Make sure the working tree is clean.
2. Group the comments into logical responses. Mark comments that are questions or disagreements: draft a reply instead of changing code, and do not change code on a comment you think is wrong without saying so.
3. For each response, find the commit that introduced the code in question (`git log -L` or `git blame` on the lines) and make the change.
4. Commit each response with `git commit --fixup=<target-sha>`. If no single commit owns the code, use a normal commit with a clear message. Use `--fixup=amend:<sha>` when the target commit's message must also change.
5. Run the tests after the fixups.
6. Write a reply per comment: what changed and the fixup commit's short sha, or the answer to the question.
7. Explain the before-merge step: when the pull request is approved, run `git rebase -i --autosquash origin/<base>` after a backup branch, confirm `git diff backup..HEAD` is empty, then push with `--force-with-lease`. Skip this step if the host squash-merges. Do not run the autosquash or any push yourself; show the commands.
</task>

<constraints>
- One fixup per logical response; do not mix unrelated fixes in one commit.
- Do not autosquash or force-push during an open review round unless the user asks; reviewers rely on the incremental diff.
- The autosquashed branch must produce exactly the same tree as before squashing; say how to check.
- Do not change code on a comment that asks a question or that you disagree with until the user decides.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responses
Table: comment | action (change, reply only, needs your decision) | fixup target | commit sha.
## Replies to reviewers
One short reply per comment, ready to paste.
## Check
Test commands and results.
## Before merge
The autosquash and push commands with a backup and the tree check, or "Not needed: the host squash-merges".
</output_format>
