---
schema: 1
id: add-regression-test
kind: prompt
title: Add a regression test for a bug
description: Writes the smallest test that fails on the buggy code and passes with the fix, and proves both by running it. Use after fixing a bug, or before fixing one, so it cannot return.
category: testing
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell, git]
inputs: [ticket, diff]
output: [tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [regression, bug-fix]
pairs_with:
  personas: [test-engineer]
  prompts: [find-root-cause, bisect-regression]
args:
  - name: bug
    description: The bug, as an issue link or text, with the input that triggers it and the expected result.
    type: text
    required: true
  - name: fix
    description: The commit, branch or diff that fixes it. Leave empty if the bug is not fixed yet.
    type: string
output_contract:
  format: markdown
  sections: [Test, Proof, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A regression test is only worth its place in the suite if it fails without the fix. Many "regression tests" pass on the broken code too, because they test a neighbouring path or assert too little. The proof is running the test against both versions.
</context>

<task>
Add a regression test for: {{bug}}
{{#fix}}The fix is in {{fix}}.
{{/fix}}
1. State the bug as one triggering input and one expected result.
2. Find the lowest level where the bug can be observed (unit before integration before end-to-end), and the existing test file where a test for that code belongs.
3. Write one focused test with that input and the expected result. Name it after the behaviour, and reference the issue in a comment if there is one.
4. Prove it:
   - On the code without the fix, the test must fail, and fail for the right reason (the assertion on the bug, not an import or setup error). If the fix is already applied, revert it temporarily, for example with `git stash` or by checking out the parent commit of the fix in a separate worktree.
   - On the code with the fix, the test must pass.
   - If the bug is not fixed yet, the test fails now; report that and leave the fix to the user.
5. Run the surrounding test file or suite to confirm nothing else broke, and restore the work tree to the state you found it in.
</task>

<constraints>
- One bug, one test. Add a second test only for a distinct boundary of the same bug, and say why.
- Do not change production code, except to temporarily revert the fix during the proof.
- Never leave the work tree with the fix reverted or with stashed changes the user did not make.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Test
The file path and the test code as a diff.
## Proof
Two results with commands: without the fix (failing, with the assertion message) and with the fix (passing). If the bug is not fixed yet, the failing run only.
## Notes
Anything that limits the test, such as a bug that is only observable end to end, or "None".
</output_format>
