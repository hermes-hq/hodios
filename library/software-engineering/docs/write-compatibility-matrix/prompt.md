---
schema: 1
id: write-compatibility-matrix
kind: prompt
title: Write a supported versions and compatibility page
description: Writes the supported platforms and versions page for a library, SDK or product, separating what is tested, supported and best-effort, with end-of-support dates and how the policy is applied.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [maintainer, technical-writer, software-engineer]
stack: []
requires: [none]
inputs: [config, text, repo]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [supported-versions, compatibility, support-policy, end-of-life]
pairs_with:
  prompts: [write-migration-guide, write-release-notes, write-readme]
args:
  - name: evidence
    description: What the project actually runs and declares - the CI test matrix, package metadata (engines, python_requires, minimum SDK versions), build targets, release branches and any existing policy or promises.
    type: text
    required: true
  - name: dimensions
    description: What readers need to check, for example "language runtime, operating systems, browsers, database versions, our server versions for this SDK".
    type: string
---
<context>
You write the page readers check before installing or upgrading: which versions and platforms work. The page is a promise, so it must match reality. Projects routinely claim support for versions they never test, list runtimes that reached end of life, or forget to say what "supported" means. Experienced maintainers separate three levels: tested in CI on every change, supported (bugs will be fixed) and best effort or community. They tie support to the upstream lifecycle (for example dropping a runtime when it reaches end of life upstream, with notice), state which product versions still get fixes, and say how a version is dropped. Declared metadata (engines fields, minimum OS versions) must agree with the page, or package managers will tell readers something different.

<evidence>
{{evidence}}
</evidence>

{{#dimensions}}Dimensions to cover: {{dimensions}}{{/dimensions}}
</context>

<task>
1. Extract what is tested (from the CI matrix), what is declared (from package metadata), and what is promised (existing docs or policy). Show where they disagree.
2. Define the support levels used on the page in one line each.
3. Build the matrix for each dimension: version or platform, support level, and notes such as known issues or required flags. Only list something as tested if the CI evidence shows it.
4. Add a product versions table if the project has release lines: which versions get features, security fixes only, or nothing, with dates only if given.
5. Write the support policy: how new versions are added, how and with how much notice old ones are dropped, and how this relates to semantic versioning (dropping a runtime as a major or minor change, as the project decides).
6. Add a short "how to check your version" section with the relevant commands.
7. List the fixes needed so metadata, CI and the page agree, and decisions the maintainers must make.
</task>

<constraints>
- Never label a version as tested or supported without evidence; mark unclear ones as [decide].
- Do not invent end-of-life or release dates; tell the user to take upstream dates from the upstream project's own lifecycle page.
- Keep the matrix readable: one table per dimension, no more columns than needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Disagreements found
Table: item | tested | declared | promised.
## Support levels
Bullets.
## Compatibility
One table per dimension.
## Release lines
Table, or "Not applicable".
## Support policy
Short text.
## Check your version
Commands.
## Fixes and decisions
Bullets.
</output_format>
