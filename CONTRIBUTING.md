# Contributing to Hodios

Thanks for helping. Hodios gets better one well-tested entry at a time, and a good entry takes about five minutes to submit.

- **Questions and ideas:** [Discussions](https://github.com/hermes-hq/hodios/discussions).
- **Request an entry, report a weak one, or ask for a tool:** [issue forms](https://github.com/hermes-hq/hodios/issues/new/choose).
- **Security problems or unsafe content:** report privately, see [SECURITY.md](SECURITY.md).

By contributing you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Add a prompt in 5 minutes

**1. Fork and clone** (Node 22):

```sh
git clone https://github.com/<you>/hodios && cd hodios
npm ci && npm run build
```

Only need one category? `git clone --filter=blob:none --sparse <url>` then `git sparse-checkout set library/<category> vocab partials`.

**2. Copy the closest example** and rename the folder to your id:

```sh
cp -r library/code-review/review-pull-request library/testing/fix-flaky-test
rm -rf library/testing/fix-flaky-test/examples library/testing/fix-flaky-test/evals.yaml
```

| Example | Kind |
|---|---|
| `library/code-review/review-pull-request/` | prompt (with `evals.yaml` and an example) |
| `library/security/security-auditor/` | persona |
| `library/planning/feature-track/` | workflow (with `steps/`) |

**3. Edit the frontmatter.** At minimum:

```yaml
schema: 1
id: fix-flaky-test            # = the folder name
kind: prompt                  # = the file name (prompt.md)
title: Fix a flaky test
description: Finds why a test passes and fails intermittently and fixes the cause, not the symptom. Use when a test fails only sometimes.
category: testing             # = the parent folder
version: 1.0.0
status: incubating            # new entries start here
```

Then add the facets that apply (`stage`, `stack`, `requires`, `inputs`, `output`, `tags`, `args`). Values come from [`vocab/`](vocab/).

**4. Write the body.** For a prompt: `<context>`, `<task>`, `<constraints>`, `<output_format>`, and optionally `<examples>`. Reference arguments as `{{name}}` and shared guardrails as `{{> guardrails/scope-discipline}}`.

**5. Validate and open a PR:**

```sh
npm run build && npm run validate
git checkout -b add-fix-flaky-test
git add library/testing/fix-flaky-test
git commit -s -m "Add fix-flaky-test prompt"
git push -u origin add-fix-flaky-test
```

CI runs the same checks. A maintainer reviews, and the next daily release ships it.

## The entry format

`library/<category>/<id>/<kind>.md`: YAML frontmatter plus a Markdown body. It is a superset of the Agent Skills `SKILL.md` format. The full field list, with descriptions, is the JSON Schema in [`schema/entry.schema.json`](schema/entry.schema.json).

| Kind | Body |
|---|---|
| `prompt` | `<context>`, `<task>`, `<constraints>`, `<output_format>`, optional `<examples>` |
| `persona` | Who it is, how it works, what it flags, its habits. No task steps and no output format |
| `workflow` | A short purpose. Steps go in `steps/NN-name.md`, listed in `steps:` |
| `rule` | Imperative statements; scope with `applies_to` globs, or leave it out for always-on |
| `style` | Exactly 5 `levels`, lightest to strongest |

**Folder layout.** Only these files are allowed in an entry folder: `<kind>.md`, `evals.yaml`, `examples/*.md`, `references/*.md`, `variants/*.md`, and `steps/NN-*.md` for workflows.

**Ids.** Lowercase kebab-case, at most 64 characters, unique across all kinds, and permanent once released. They never contain the category, kind, status, an author, or a vendor name.

| Kind | Grammar | Example |
|---|---|---|
| prompt | verb-object | `find-root-cause` |
| persona | role noun | `security-auditor` |
| workflow | goal + `-track` | `feature-track` |
| rule | subject + `-rules` | `conventional-commits-rules` |
| style | adjective | `concise` |

**Category tie-break:** the specialist who owns the outcome wins: security > accessibility > performance > specific activity > code-review > generic. Personas go in their discipline's category, workflows in the category of their end goal, rules in `conventions` unless they have a single subject.

**Never author computed fields:** `works_in`, `packs`, `quality`, `tested_on`, `hash`, `created`, `updated`, `license`. The build derives them.

**Status.** New entries start as `incubating`. `experimental` and `stable` need an `evals.yaml` with at least three cases (a happy path, an edge case and a negative case) and must beat the `baseline` prompt.

**Changing an entry.** Bump `version` (MAJOR for changed args, output or intent; MINOR for additions; PATCH for wording) and add a `changelog` item. To rename, create the new id and list the old one in `aliases`.

Run `npm run hodios -- rules` to see every lint rule. Errors name the rule (`PS010`, `PS023`…) so you know exactly what to fix.

## Quality bar

A good entry:

- Solves a problem that a plain request to the model handles badly. Say which in the PR.
- Gives the model a process and a definition of done, not adjectives ("world-class", "expert").
- Has a precise output format the reader can act on.
- Is as short as it can be. Prompts stay under about 1,500 tokens.
- Works without any other entry installed.
- Is stack-agnostic unless it truly is not; if it is, says so in `stack`.

## What we do not accept

- Restatements of what models already do by default.
- A bare "act as an expert X" with no process.
- Product promotion, affiliate links or tracking.
- Jailbreaks, safety bypasses, or anything designed to deceive users or other systems.
- Executable scripts, tool grants or commands that download and run code.
- Copied or leaked proprietary system prompts, or text you cannot dedicate under CC0.
- Personal data, secrets or internal URLs.
- Near-duplicates of an existing entry. Improve the existing one instead.

## Sign-off

Hodios uses the [Developer Certificate of Origin](https://developercertificate.org/) instead of a CLA. Every commit must include a `Signed-off-by` line matching the commit author:

```sh
git commit -s -m "Add fix-flaky-test prompt"
```

Forgot? Fix the whole branch with `git rebase --signoff origin/main && git push --force-with-lease`. Make sure `git config user.email` is the address on your commits (your GitHub noreply address works). Commits made in the GitHub web editor are signed off automatically.

Your sign-off certifies that you wrote the contribution or have the right to submit it under the repository's licenses: **CC0-1.0** for content and **Apache-2.0** for code.

**AI-assisted contributions are welcome**, on the same terms. Set `authorship: ai-assisted` or `ai-generated` and list yourself in `authors`. You review everything you submit and you are the one who signs off; an AI tool never signs off on its own. Mention the tool with an `Assisted-by:` trailer if you like.

## Code changes

`packages/` and `tools/` are TypeScript (strict) on Node 22. Before a PR, run `npm run check`. Keep `packages/core` free of Node-only APIs so it runs in the browser too. Open an issue or discussion before large changes or new features.
