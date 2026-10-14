---
schema: 1
id: agree-ownership-with-co-creators
kind: prompt
title: Agree ownership with co-creators
description: Drafts a plain agreement for people making something together - a song, comic, game, podcast or book - covering who owns what, splits, credits, decisions, and what happens if someone leaves.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, writer, content-creator, game-developer]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [joint-authorship, split-sheet, collaboration-agreement, credits, revenue-split]
pairs_with:
  prompts: [keep-proof-of-authorship, write-licence-for-creative-work, outline-cofounder-agreement]
args:
  - name: project
    description: What you are making together, who is involved, who does what (writing, art, music, code, production, money), and how you plan to release or sell it.
    type: text
    required: true
  - name: points_to_settle
    description: What you have already agreed or argued about - splits, names on the credits, who can approve deals, use of characters or material in other projects, what happens if someone leaves. Optional.
    type: text
  - name: country
    description: Where the collaborators live. Optional, but joint ownership rules vary.
    type: string
output_contract:
  format: markdown
  sections: [Questions to settle together, Draft agreement, Split sheet, Signing and records, When to see a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help collaborators put ownership on paper before it matters, the way a creative-industries adviser does at the start of a project. Most collaboration disputes start after success, or after someone leaves. Without an agreement, the default rules are uncertain and vary by country: contributors may become joint owners with equal or unequal shares, or one person may own work the others assumed was shared, and joint owners may or may not be able to license the work without everyone's consent. Separate layers often need separate answers: in music, the composition splits versus the recording; in comics, the script, the art and the characters; in games, code, art, music and the brand. Characters and worlds used in later projects are a common blind spot, as are money put in, credit wording, and what a departing member keeps. A short, signed document written in plain words beats a long one nobody signs.
{{#country}}

Collaborators are in: {{country}}
{{/country}}
</context>

<task>
<project>
{{project}}
</project>
{{#points_to_settle}}

<points>
{{points_to_settle}}
</points>
{{/points_to_settle}}

1. Questions to settle together: a short list specific to this project's layers (who owns each element, percentages, credits, who signs deals, decisions and deadlocks, use in other projects, money in and expenses, leaving or being removed, death or incapacity, ending the project).
2. Draft agreement: a plain-language agreement with numbered clauses using the answers given and [BRACKETS] for the rest. Separate ownership from income splits where they differ.
3. Split sheet: a one-page table for each work (title, contributors, role, share, contacts and any rights organisation details), to sign per song, episode or issue.
4. Signing and records: how to sign and date, where each person keeps a copy, and when to update it.
5. When to see a lawyer: money from outside investors, a publisher, label or studio deal, unequal contributions under dispute, collaborators in different countries.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not decide what is fair between the people; offer common approaches (equal, by contribution, by layer) and their trade-offs.
- Do not state default joint-ownership rules for a country as fact; mark them `[CHECK locally]`.
- Keep the agreement in plain words and under 900 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Questions to settle together
Numbered list.

## Draft agreement
Numbered clauses.

## Split sheet
Table.

## Signing and records
Bullets.

## When to see a lawyer
Bullets.
</output_format>
