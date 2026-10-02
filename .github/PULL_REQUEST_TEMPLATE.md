<!-- Thanks for contributing! Keep each PR to one entry or one change. -->

## What and why

<!-- What does this add or change? For an entry: what goes wrong when you ask the model directly, and how does this entry fix it? -->

## Kind of change

- [ ] New entry (prompt / persona / workflow / rule / style)
- [ ] Improvement to an existing entry (version bumped, changelog item added)
- [ ] Tooling, schema or CI
- [ ] Docs

## Evidence

<!-- For entries: the baseline result vs. this entry's result on the same input, and which tool and model you tried.
     Paste short excerpts, not whole transcripts. Remove secrets and personal data. -->

| | Baseline (plain request) | This entry |
|---|---|---|
| Tool / model | | |
| Result | | |

## Risk

- [ ] read-only
- [ ] edits-files
- [ ] runs-commands
- [ ] network

## Checklist

- [ ] `npm run check` passes locally (or at least `npx hodios validate`).
- [ ] Every commit is signed off (`git commit -s`), certifying the [DCO](https://developercertificate.org/).
- [ ] **Original:** the text is my own work or properly licensed, and I can dedicate it under CC0-1.0.
- [ ] **Not leaked:** it is not copied from a proprietary or leaked system prompt.
- [ ] **Authorship** is set in the frontmatter (`human`, `ai-assisted` or `ai-generated`); AI-written text has a named accountable human in `authors`.
- [ ] No personal data, secrets, internal URLs or product promotion.
