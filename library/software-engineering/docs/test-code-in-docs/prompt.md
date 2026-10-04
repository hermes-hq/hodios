---
schema: 1
id: test-code-in-docs
kind: prompt
title: Test the code in docs
description: Makes the code samples in docs and READMEs run in CI with doctests, extracted snippets or compiled example files, plus fixtures for secrets and network, so broken samples fail the build.
category: docs
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [maintainer, technical-writer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text, config]
output: [plan, code, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [doctest, code-samples, snippet-testing, docs-as-code, continuous-integration]
pairs_with:
  prompts: [write-code-samples, sync-docs-with-code-change, docs-site-overhaul-track]
args:
  - name: docs_sample
    description: Two to five representative docs pages or README sections with their code blocks as they appear in the source (Markdown, MDX, reStructuredText, docstrings or notebooks).
    type: text
    required: true
  - name: stack
    description: Language, package manager, docs tool and CI system, for example "TypeScript library, pnpm, Docusaurus, GitHub Actions".
    type: string
    required: true
  - name: constraints
    description: Anything that makes samples hard to run - calls to a paid API, credentials, long-running jobs, platform-specific steps, multiple language versions.
    type: text
output_contract:
  format: markdown
  sections: [Sample inventory, Approach, Implementation, Fixtures and isolation, CI job, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code samples rot silently: an API changes, the sample still renders, and the first person to notice is a user copying it. The fix is to make samples executable in CI, but teams fail in predictable ways: they test only the README, they test snippets that are not what the page shows (so the test passes while the page is wrong), they hit live services and get flaky builds, or they make every sample carry boilerplate that hurts readability. The stack here is {{stack}}.
</context>

<task>
<docs_sample>
{{docs_sample}}
</docs_sample>
{{#constraints}}
<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. Inventory the samples by type: complete runnable program, fragment that needs setup, shell commands, expected-output blocks, configuration files, and illustrative pseudo-code that should never run. Say how each type will be handled.
2. Choose one primary approach that fits the stack, and say why:
   - native doctests where the language has them (Python doctest or pytest --doctest-glob, Rust doc tests, Go Example functions, Elixir doctests);
   - snippet extraction from Markdown code fences into test files, with fence info strings to mark setup, skip or expected output;
   - single-source examples: real files in an `examples/` folder that compile and run in CI, included into the page by the docs tool, so the page shows exactly what was tested;
   - notebook execution for notebook-based docs.
   Prefer single-source includes for long samples and doctests or extraction for short ones.
3. Show the implementation on the given pages: the changed code fences or include directives, any hidden setup (and how it stays hidden from readers), and how expected output is asserted, with normalisation for timestamps, ids and ordering.
4. Isolate the samples: fake or recorded HTTP responses, a local container or emulator where the real service matters, test credentials from CI secrets with a safe default, a fixed random seed and clock. Samples must pass with no network unless explicitly marked.
5. Write the CI job: when it runs (every pull request touching code or docs), the matrix of supported language versions if samples promise them, caching, and a clear failure message pointing to the page and line.
6. Plan the rollout: mark existing broken samples as known failures with an issue each rather than blocking everything, then ratchet so no new untested sample can merge.
</task>

<constraints>
- Keep samples readable: boilerplate needed only for testing goes in hidden setup or fixtures, not in what readers copy.
- Never put real credentials or customer data into samples or fixtures.
- Do not claim a tool supports a feature you are unsure of; name the tool, mark "(check the docs for this version)" and give a fallback.
- If the stack or CI system is missing or ambiguous, ask for it before writing configuration.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Sample inventory
Table: page, sample, type, handling (run, run with setup, compare output, compile only, skip with reason).
## Approach
The chosen approach in three to five sentences, plus the rejected alternatives in one line each.
## Implementation
The changed docs source and any test harness code, in code blocks with file paths.
## Fixtures and isolation
Bullets: each external dependency and how it is faked or contained.
## CI job
The CI configuration in a code block, then one line on what a failure looks like.
## Rollout
Numbered steps from first job to enforced gate.
</output_format>
