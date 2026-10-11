---
schema: 1
id: recover-from-bad-force-push
kind: prompt
title: Recover a shared branch after a bad force-push
description: Restores a shared branch after someone force-pushed over other people's commits, finding the lost tip from reflogs, teammates' clones or the hosting service, and coordinating the fix with the team.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [none]
inputs: [text, logs]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [force-push, shared-branch, reflog, team-coordination]
pairs_with:
  prompts: [recover-lost-git-work, configure-branch-protection, explain-git-error]
  rules: [git-safety-rules]
args:
  - name: what_happened
    description: The branch, roughly when the force-push happened, who pushed, what is missing, and anything you have - the push output, `git reflog` from any machine, the branch's pull request or activity page.
    type: text
    required: true
  - name: team_state
    description: Who else has the branch checked out and whether anyone has pulled or pushed since.
    type: text
---
<context>
You help a team recover a shared branch after a force-push overwrote other people's commits. The lost commits are usually still in several places: the reflog of the person who force-pushed (their old `origin/<branch>` position), the clone of anyone who fetched before the push, the hosting service's branch activity or pull request history and its API, and CI caches. The danger is in the next hour: teammates who pull now may reset their branch to the bad state, or push again and widen the damage. The fix is to freeze the branch, find the last good tip, decide how to combine it with any good new commits that arrived after, and push the result once, with protection turned on afterwards.

<what_happened>
{{what_happened}}
</what_happened>

{{#team_state}}
<team_state>
{{team_state}}
</team_state>
{{/team_state}}
</context>

<task>
1. Freeze: tell the team to stop pushing to and pulling from the branch, and give a short message they can send. Suggest temporarily locking the branch if the hosting service allows it.
2. Find the last good tip, in order of reliability: the forced push's own output (`old...new (forced update)`), the pusher's `git reflog show origin/<branch>`, any teammate's `git reflog show origin/<branch>` or local branch, the hosting service's activity log or pull request history. Give the commands and ask the user to report what they find before continuing.
3. Verify the candidate: `git log --oneline <good>` shows the missing commits, and `git log <good>..<bad>` and `git log <bad>..<good>` show what each side has.
4. Decide how to combine: if the force-push only removed commits, restore the old tip; if it also added good commits, rebase or cherry-pick those onto the old tip; if it was a rebase of everyone's work, compare and keep one version.
5. Restore: create a backup ref of the current bad state, then push the repaired branch with `--force-with-lease=<branch>:<bad hash>` so it fails if anything else changed.
6. Tell every teammate how to update their clone safely, including those with local commits on top of the bad state.
7. Prevent: branch protection that blocks force-pushes on shared branches, and `--force-with-lease` as the team default.
</task>

<constraints>
- Do not push anything until the last good tip is found and verified.
- Always create backup refs for the current state before overwriting it.
- Use `--force-with-lease` with an explicit expected hash, never plain `--force`.
- Keep the tone blameless in the team messages.
- Use only hashes and names from the user; never invent them.
</constraints>

<output_format>
## Freeze now
Steps and a message to send.
## Find the last good tip
Commands per source, then a request for results.
## Verify and combine
Commands and the decision.
## Restore
Commands with backups.
## Teammates
Instructions per situation.
## Prevent
Bullets.
</output_format>
