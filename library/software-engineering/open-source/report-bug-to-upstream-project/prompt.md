---
schema: 1
id: report-bug-to-upstream-project
kind: prompt
title: Report a bug to an upstream open-source project
description: Turns a bug you hit in a library or tool into an upstream issue maintainers can act on, with a duplicate search, a standalone minimal reproduction, exact versions and expected versus actual.
category: open-source
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, stack-trace, logs, text]
output: [message, code]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [minimal-reproduction, upstream-issue, bug-report, dependency-bug, issue-template]
pairs_with:
  prompts: [reproduce-bug-report, maintain-patched-fork-of-dependency, write-upstream-feature-proposal]
args:
  - name: problem
    description: What went wrong, the error or stack trace, the library or tool and its version, and where in your project it shows up.
    type: text
    required: true
  - name: issue_template
    description: The upstream project's issue template or contributing rules for bug reports, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is it upstream, Duplicate check, Minimal reproduction, Issue draft, Workaround meanwhile, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Maintainers can fix what they can reproduce. Bug reports that sit unanswered usually paste a stack trace from a large private app, give a vague version ("latest"), describe the problem only through the reporter's own code, or are really a misuse, a configuration issue or a bug in a different package. The most useful thing a reporter can do is reduce the problem to a standalone reproduction: a fresh project with only the failing dependency, the fewest lines that show the bug, and exact versions of the library, runtime, OS and any plugin. Checking the latest release and the main branch often shows it is already fixed. Searching closed issues, the changelog and discussions avoids a duplicate. The report itself should follow the project's template, separate expected from actual behaviour, and keep any private code, credentials or customer data out.

{{> guardrails/investigate-before-answering}}

Problem:
<problem>
{{problem}}
</problem>
{{#issue_template}}
<issue_template>
{{issue_template}}
</issue_template>
{{/issue_template}}
</context>

<task>
1. Is it upstream: read the relevant code in this project and the dependency's version in the lockfile. Rule out misuse, configuration and a different package (a wrapper, a plugin, a transitive dependency) before blaming the library. Say how confident you are.
2. Duplicate check: list the search terms to use on the project's issues (open and closed), changelog and discussions, and what to do if an issue exists (add the reproduction or a reaction, not "+1").
3. Minimal reproduction: in a scratch folder outside the project, create the smallest standalone project that shows the bug with only the needed dependencies, pinned to exact versions. Run it and confirm it fails. Then try the latest release, and say whether it still fails.
4. Issue draft: title that states the behaviour, versions table, reproduction steps or code, expected versus actual, what you already ruled out, and whether you can help with a fix. Follow the template given if any.
5. Workaround meanwhile: a safe way to keep working (pin, guard, patch file) without hiding the bug.
6. Report what you actually ran and the results.
</task>

<constraints>
- Do not post the issue yourself; give the draft to the user to submit.
- Remove private code, internal names, tokens, hostnames and customer data from everything in the draft and the reproduction.
- If you cannot reproduce it standalone, say so plainly and draft the issue as "cannot reduce yet" with the evidence, rather than claiming a cause.
- If the problem looks like a security vulnerability, do not draft a public issue; tell the user to use the project's private security reporting route.
- Do not modify the user's project except for a clearly marked, reversible workaround they approve.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. Put the reproduction files and the issue draft in fenced blocks. Verified lists the commands run and their real results, or "not run" with the reason.
</output_format>
