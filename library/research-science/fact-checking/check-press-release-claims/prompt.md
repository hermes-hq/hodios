---
schema: 1
id: check-press-release-claims
kind: prompt
title: Check the claims in a press release
description: Checks a company, government or campaign press release before you report it, flagging unsupported firsts, survey-backed PR statistics, cherry-picked comparisons and claims to verify independently.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, content-creator]
requires: [none]
inputs: [document, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [press-releases, churnalism, corporate-claims, newsroom]
pairs_with:
  prompts: [fact-check-claims, check-statistics-in-article, evaluate-poll-in-news]
  personas: [fact-checker]
args:
  - name: release
    description: The full press release, including the boilerplate, notes to editors and any methodology or data attached.
    type: text
    required: true
  - name: planned_story
    description: What you plan to write from it, so the check focuses on the claims you would repeat.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Claims to treat with care, Verification checklist, Questions for the press office, Safe framing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Press releases are advocacy, and stories that reprint them with light edits ("churnalism") pass their claims on unchecked. Typical patterns: "first", "only", "largest" or "leading" with no defined market or period; statistics from a commissioned online survey with no wording or sample published; percentages without base numbers; "up to" figures reported as typical; a comparison with a chosen weak year or competitor; investment "announced" that is a re-announcement or spread over many years; jobs "created" that are projected or include existing roles; and endorsements from people with a financial tie. Notes to editors often contain the caveats the headline drops.
</context>

<task>
Check this release{{#planned_story}} for a story about: {{planned_story}}{{/planned_story}}
<release>
{{release}}
</release>

1. List every factual claim, especially numbers, superlatives, firsts, comparisons, money and jobs figures, and claims about research or surveys.
2. For each, note what support the release itself gives (data, named source, methodology) and whether the notes to editors qualify it.
3. Flag the patterns above where they apply, and any claim that only the issuer can know and nobody independent can confirm.
4. For each claim you would repeat, name the independent source to check against (official statistics, registers, filings, the underlying study, a competitor or regulator) and what to ask the issuer.
5. Suggest framing that attributes claims to the issuer and avoids repeating unverified superlatives as fact.
</task>

<constraints>
- Do not judge any claim true or false from your own knowledge; the job is to show what is supported in the release and what needs independent checking.
- Do not invent the underlying data, survey details or market figures.
- Treat government, company, charity and campaign releases by the same standard.
- If the release makes no factual claims (a pure event notice), say so.
</constraints>

<output_format>
## Verdict
Two or three sentences: how much of the release can be repeated as fact, and the main risk.
## Claims to treat with care
Table: claim | support in the release | pattern | risk if repeated.
## Verification checklist
Checklist: each claim to verify, the independent source to try, and done-when.
## Questions for the press office
Numbered questions asking for wording, samples, base numbers, time spans and definitions.
## Safe framing
Example sentences that attribute claims properly, including a headline that does not overstate.
</output_format>
