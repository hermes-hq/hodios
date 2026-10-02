# Governance

Hodios is maintained by the Hermes IDE team as an open project for every developer, in every tool.

## Roles

- **Lead maintainer:** sets direction, owns releases, the schema and the vocabularies, and has the final say when consensus fails.
- **Category owners:** contributors who have earned review rights for one or more categories through sustained, high-quality contributions. Listed in `.github/CODEOWNERS`.
- **Security team:** reviews entries whose `risk` is not `read-only` and handles private reports (see [SECURITY.md](SECURITY.md)).
- **Contributors:** everyone who opens an issue, discussion or pull request.

## How decisions are made

- **Content** (new entries and changes): lazy consensus. A pull request that passes CI and gets a code owner's approval is merged. Entries with `risk` above `read-only` need two approvals, one from the security team.
- **Vocabularies and schema:** a vote among maintainers, open for at least 7 days, for adding a category, removing or renaming a facet value, or any breaking schema change. Adding a stack value or tag synonym is ordinary content.
- **Promotions** (`incubating` → `experimental` → `stable`) follow the gates in [CONTRIBUTING.md](CONTRIBUTING.md): evals that beat the baseline, on models from more than one vendor, plus maintainer approval.

## Licensing promise

Content is dedicated under CC0-1.0 and code is licensed under Apache-2.0. Contributions come in under the same terms through the DCO sign-off, and there is no CLA, so the project cannot be relicensed to more restrictive terms.

## Repository rules

- `main` is protected: changes land through pull requests that pass `check` and `dco`, are squash-merged and keep history linear. Force pushes and deletion are blocked.
- Releases are cut by the release workflow from `main` only, with signing keys held in a protected environment.
- AI agents work on branches and open pull requests like anyone else. A named human is accountable for, and signs off on, every change.

## Labels

| Label | Meaning |
|---|---|
| `type: prompt`, `type: persona`, `type: workflow`, `type: rule`, `type: style` | Entry kind |
| `type: bug`, `type: quality` | Something is wrong or weak |
| `type: tool-support` | A new or changed AI tool or export format |
| `type: docs`, `type: infra` | Documentation, CI, tooling and dependencies |
| `status: needs-review` | Waiting for a maintainer |
| `status: accepted` | Agreed; ready for a pull request |
| `good first issue`, `help wanted` | Good places to start |

## Code of Conduct

Everyone in the project follows the [Code of Conduct](CODE_OF_CONDUCT.md).
