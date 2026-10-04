---
schema: 1
id: remove-stale-feature-flags
kind: prompt
title: Remove stale feature flags safely
description: Finds feature flags that are fully rolled out or dead, removes each flag and its losing branch with tests passing, and leaves a cleanup list for the flag service. Use to pay down flag debt.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [diff, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-flags, flag-debt, dead-code, kill-switch]
pairs_with:
  prompts: [add-feature-flag, remove-dead-code]
args:
  - name: flag_system
    description: How flags are defined and evaluated, for example LaunchDarkly, Unleash, OpenFeature with a provider, a config table, or environment variables.
    type: string
    required: true
  - name: test_command
    description: The command that runs the test suite.
    type: string
    required: true
  - name: flag_list
    description: Flags to consider, ideally with their current state from the flag service (on for everyone since when, off, partial rollout, last evaluated). Leave empty to discover flags in the code and ask for their states.
    type: text
output_contract:
  format: markdown
  sections: [Flags found, Removed, Kept, Flag service cleanup, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every flag left in the code doubles the paths someone has to reason about and test. Removing one goes wrong when the state in the code is guessed instead of read from the flag service, when the flag is also evaluated by a mobile app or another service that still ships old versions, when the flag key is built dynamically so a search misses it, or when the flag is deleted in the service before every deployed version stops asking for it, which flips those versions to the default.
</context>

<task>
Remove stale feature flags from this repository. Flag system: {{flag_system}}.

<flags>
{{flag_list}}
</flags>

1. Find every flag reference in the code: the SDK calls and wrappers for {{flag_system}}, flag key constants, config files, test overrides, and dynamic keys (string concatenation or lookups from tables). List each flag with every location.
2. Get each flag's real state from the list above. For any flag with no stated state, ask for it (an export from the flag service is ideal) and do not remove that flag until you have it. Never infer the state from code defaults.
3. Classify each flag:
   - **Fully on**: on for every user and environment, long enough that rollback is no longer expected. Remove; the new path wins.
   - **Fully off or dead**: off everywhere, or never evaluated recently. Remove; the old path wins, and the new path's code goes.
   - **In rollout or experiment**: keep.
   - **Permanent by design**: operational kill switches, permission or entitlement flags, configuration. Keep, and say so.
   - **Shared**: also evaluated by other services, clients or released mobile apps. Remove from this repository only if safe for this codebase, and flag that the service entry must stay until all consumers are clean.
4. For each flag to remove, one flag per commit:
   a. Replace the evaluation with the winning branch and delete the losing branch.
   b. Delete code that only the losing branch used (functions, components, styles, translations, config keys), checking with a search that nothing else references it.
   c. Update tests: delete tests that only covered the losing path, and keep or adjust tests of the winning path so they no longer set the flag.
   d. Remove the flag's key constant, default value and local config entries.
   e. Run `{{test_command}}` and the linter or type checker. If something fails, fix the removal or revert that flag and record why.
5. Write the flag service cleanup list: for each removed flag, archive (rather than delete) the flag in the service only after the release containing this change is deployed everywhere it runs, and after other consumers are clean.
</task>

<constraints>
- Do not change the behaviour of the winning path. If removing the flag reveals that the winning path is broken or untested, stop for that flag and report it.
- Do not change the flag service itself; you only change code and write the cleanup list.
- Keep each flag's removal in its own commit with a message naming the flag and the winning path.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Flags found
Table: Flag | Locations | State (source) | Class.

## Removed
Table: Flag | Winning path | Files changed | Code deleted | Tests changed | Commit.

## Kept
Table: Flag | Why kept | Suggested next step.

## Flag service cleanup
Checklist per removed flag: archive after which release, other consumers to clean first, owner placeholder.

## Verification
Test, lint and type-check runs after the last removal, with real results, and a search showing no references remain to each removed flag key.
</output_format>
