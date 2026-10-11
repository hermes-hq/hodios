---
schema: 1
id: publish-rust-crate
kind: prompt
title: Publish a Rust crate to crates.io
description: Gets a Rust crate ready for crates.io with complete Cargo.toml metadata, a deliberate feature set, a declared MSRV, docs.rs settings, a packaged-file check, semver checks and shared ownership.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, maintainer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crates-io, cargo, msrv, cargo-features, docs-rs, package-publishing]
pairs_with:
  prompts: [publish-package-from-ci, write-versioning-policy, write-changelog]
args:
  - name: crate
    description: The crate name, whether it is a library, binary or both, whether it is part of a workspace with other crates, its features, any unsafe code or native dependencies, and the oldest Rust version you intend to support.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Name and ownership, Cargo.toml changes, Features and MSRV, Package check, Publishing steps, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A crates.io release is permanent: versions can be yanked but never deleted or overwritten, and a crate name, once taken, stays. First releases often miss required metadata (description, licence), publish with path dependencies that crates.io rejects or with git dependencies that are not allowed, ship features that are not additive (enabling one breaks another, which Cargo's feature unification will eventually trigger in someone's build), or include large test fixtures because there is no `include` or `exclude`. docs.rs builds with default features unless told otherwise, so feature-gated APIs vanish from the docs. Declaring `rust-version` tells users and the resolver the minimum supported Rust version, and it should be tested in CI rather than guessed. In a workspace, crates must be published in dependency order with versions on every internal dependency. Adding a second owner prevents a crate from becoming orphaned, and `cargo-semver-checks` catches accidental breaking changes in later releases.

{{> guardrails/investigate-before-answering}}

Crate:
<crate>
{{crate}}
</crate>
</context>

<task>
1. Name and ownership: check the name on crates.io (say how), note naming conventions, and recommend a second owner or a team owner.
2. Read Cargo.toml (and the workspace manifest if any). Fix: `description`, `license` as an SPDX expression, `repository`, `readme`, `keywords` (at most five), `categories` from the crates.io list, `documentation` if not docs.rs, `include` or `exclude`, and versions on all path dependencies.
3. Features and MSRV: check every feature is additive, document what each enables, decide the default set, and set `rust-version` from a real build on that toolchain, or mark it as a value to confirm. Add `[package.metadata.docs.rs]` settings so docs build with the right features.
4. Package check: run `cargo package --list` and `cargo publish --dry-run`, `cargo doc` with the docs.rs features, and the tests with no default features and all features. Fix what fails.
5. Publishing steps: the order for workspace crates, the exact commands, setting up trusted publishing or a scoped token for CI, adding owners, and running `cargo-semver-checks` before future releases.
</task>

<constraints>
- Do not run `cargo publish` without `--dry-run`, `cargo yank` or `cargo owner`; give those commands for the user to run.
- Do not claim an MSRV you did not test; mark it unconfirmed if you could not build with that toolchain.
- Do not invent crates.io categories; tell the user to check the published list.
- Never put a crates.io token in the repository.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. Cargo.toml changes as a diff. Package check as the file list and the dry-run result. Publishing steps as exact commands in a fenced block. Verified lists commands run and their results.
</output_format>
