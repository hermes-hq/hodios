---
schema: 1
id: assess-reported-dependency-cve
kind: prompt
title: Assess a CVE reported in your library's dependency
description: Answers a user report that your library pulls in a vulnerable dependency by checking whether the vulnerable code is reachable, deciding whether a release is needed and drafting the reply.
category: open-source
version: 1.0.0
status: incubating
stage: [maintain]
role: [maintainer, security-engineer]
requires: [repo-read, shell]
inputs: [repo, ticket, text]
output: [report, message, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cve, transitive-dependencies, reachability, vulnerability-scanner, vex, version-ranges]
pairs_with:
  prompts: [triage-vulnerability-report, coordinate-security-release, draft-maintainer-issue-replies]
  personas: [open-source-maintainer]
args:
  - name: report
    description: The user's issue or message, the CVE or advisory id and affected versions of the dependency as stated in the advisory, and which scanner raised it if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Facts, Reachability, Decision, Changes, Reply, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scanner reports about dependencies are now a large share of maintainers' security traffic, and most do not mean the library is exploitable. The questions that decide what to do: does the library's allowed version range already permit the fixed version (in which case users can upgrade the dependency themselves and a release only changes the default); does the library pin or bundle the vulnerable version (then only a release fixes it); does the library ever call the vulnerable function or use the affected feature in a way attacker-controlled input reaches; and is the dependency only a development or build dependency that never ships. Bumping is often still the right call because it ends the reports, but the reply should be accurate: claiming "not affected" without checking is as bad as an unnecessary emergency release. Statements in a VEX format or a short security note let users' scanners record the answer. If the vulnerability is exploitable through the library, it becomes the project's own security issue and goes through the private disclosure process.

{{> guardrails/investigate-before-answering}}

Report:
<report>
{{report}}
</report>
</context>

<task>
1. Facts: from the lockfile and manifests, find how the dependency enters (direct or transitive, through which path), the version ranges declared, the version locked, whether it is bundled or vendored, and whether it ships to users or is dev-only. Read the advisory text as given for the affected function and versions; do not guess beyond it.
2. Reachability: search the code for uses of the affected API or feature and trace whether untrusted input can reach it. State the conclusion as exploitable, not reachable, or unclear, with the evidence.
3. Decision: no action, widen or raise the version range, release a patch with the bumped dependency, or treat as a vulnerability in this library (private process). Note whether users can fix it themselves now by updating their lockfile.
4. Changes: if a bump is warranted, make the smallest manifest and lockfile change, run the tests, and draft the changelog line.
5. Reply: a short, accurate answer to the reporter: what was checked, the conclusion, what users can do now, and when a release will include the update if one is planned. Offer a VEX-style statement if the project publishes them.
6. Report what was run.
</task>

<constraints>
- Do not claim "not affected" without showing the code search and reasoning; say "unclear" if you cannot tell.
- If the issue is exploitable through this library, do not discuss details in a public reply; move it to the project's private security channel.
- Do not raise the dependency to a new major version in a patch release without flagging the compatibility risk.
- Do not invent advisory details, affected functions or fixed versions; rely on the advisory text given and say what to confirm.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. Facts as a short table: Item | Value. Reply in a fenced block. Verified lists commands run and results.
</output_format>
