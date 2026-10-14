---
schema: 1
id: plan-reviewer-search
kind: prompt
title: Plan the search for suitable reviewers
description: Turns a manuscript into a reviewer search plan for an editor, with expertise slots, search routes, conflict screens, balance checks and checks on author-suggested reviewers.
category: peer-review
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, researcher]
requires: [none]
inputs: [document, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [reviewer-selection, editorial-process, conflict-of-interest, reviewer-diversity]
pairs_with:
  prompts: [write-reviewer-invitation, write-meta-review]
args:
  - name: manuscript_summary
    description: Title, abstract, methods and key references, plus the author list and affiliations for conflict screening.
    type: text
    required: true
  - name: author_suggested_reviewers
    description: Reviewers the authors suggested or asked to exclude, with the contact details they gave.
    type: text
  - name: constraints
    description: Journal rules and practical limits, for example "two reviewers plus one statistician", "no reviewers from the authors' country" or a deadline.
    type: text
output_contract:
  format: markdown
  sections: [Expertise slots, Search plan, Conflict screens, Author-suggested reviewers, Balance checks, Invitation order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Finding reviewers is the slowest part of handling a manuscript, and the usual shortcuts cause problems: always inviting the same senior people (who decline), relying on author-suggested reviewers (who review more favourably, and whose email addresses have been faked in peer-review rings), and missing a methods reviewer because everyone invited shares the authors' topic. A better approach defines the expertise slots the manuscript needs (topic, method, statistics, setting), searches for each slot using the manuscript's own reference list, recent papers on the same question and indexing databases, screens for conflicts, and checks that the panel is not all one region, career stage or school of thought. Reviewer suggestions with personal email domains instead of institutional ones, or identities that cannot be matched to a publication record, need verification.
</context>

<task>
Plan the reviewer search for this manuscript.
<manuscript>
{{manuscript_summary}}
</manuscript>
{{#author_suggested_reviewers}}
<author_suggestions>
{{author_suggested_reviewers}}
</author_suggestions>
{{/author_suggested_reviewers}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Define two to four expertise slots the reviews must cover, each with the specific knowledge needed and why it matters for this manuscript.
2. For each slot, write a search plan: keywords and phrases, which references in the manuscript point to likely experts, recent-literature searches to run, and the indexing or reviewer-finder tools the editor can use.
3. Write conflict-of-interest screens: recent co-authorship with any author, shared institution, supervision, funding links, and competing work, and how to check each.
4. Assess the author-suggested and excluded reviewers: verification steps for identity and email, and whether to use at most one.
5. Write balance checks: geography, career stage, gender, and avoidance of a single lab or school of thought, without lowering the expertise bar.
6. Propose an invitation order and how many to invite at once to get the needed number of reviews by the deadline.
</task>

<constraints>
- Never propose named reviewers; you cannot verify who is active, available or conflicted. Describe profiles and search routes instead. Names the user supplied may be assessed.
- Treat author exclusion requests as legitimate unless they would remove all qualified reviewers; flag that case for the editor's judgement.
- Do not use nationality or affiliation country as a quality proxy; country rules come only from the journal's stated constraints.
- Keep the author list and manuscript confidential in any search: search by topic, not by pasting the manuscript into public tools.
</constraints>

<output_format>
## Expertise slots
A table: slot | knowledge needed | why.
## Search plan
Per slot, bullets.
## Conflict screens
A checklist.
## Author-suggested reviewers
Bullets, or "None given".
## Balance checks
Bullets.
## Invitation order
Short plan with numbers.
</output_format>
