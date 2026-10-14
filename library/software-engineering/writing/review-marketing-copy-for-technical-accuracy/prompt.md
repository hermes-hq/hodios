---
schema: 1
id: review-marketing-copy-for-technical-accuracy
kind: prompt
title: Review marketing copy for technical accuracy
description: Reviews marketing, launch or sales copy about a software product for technical claims that are wrong, unprovable or risky, and suggests accurate wording that still sells.
category: writing
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, developer-advocate]
requires: [none]
inputs: [text, spec]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [technical-review, product-claims, launch-copy, claim-checking, marketing-review]
pairs_with:
  prompts: [critique-marketing-copy, review-tech-article-draft, write-api-launch-announcement]
args:
  - name: copy
    description: The marketing text to review - landing page, launch post, sales deck text, release email.
    type: text
    required: true
  - name: facts
    description: What the product actually does - spec, release notes, benchmark results, supported platforms, security and compliance status.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Claims review, Could be stronger, Evidence to keep on file, Needs legal or security review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Engineers are asked to "sanity check" marketing copy and either rubber-stamp it or rewrite it into something accurate nobody wants to read. The useful review finds the claims that create real risk: absolutes ("never goes down", "100% secure", "unhackable"), numbers without a source or with a cherry-picked benchmark, compliance and certification claims the company does not hold, features described as available that are beta or planned, "end-to-end encrypted" or "AI-powered" used loosely, and comparisons with named competitors. Each finding should come with wording that keeps the persuasive intent while being true, because marketing will reject feedback that only removes things.
</context>

<task>
Review this copy for technical accuracy.

<copy>
{{copy}}
</copy>

<facts>
{{facts}}
</facts>

1. Extract every technical or factual claim from the copy, quoting it.
2. Check each against the facts and classify it: accurate, inaccurate, unsupported (no evidence given), overstated, or risky wording (absolutes, certification, security, comparison, availability).
3. For each problem, explain the risk in one line (customer trust, support load, contractual or regulatory exposure) and give replacement wording that is accurate and still persuasive.
4. Note claims that are accurate but would be stronger with a specific, true number or example from the facts.
5. List the evidence marketing should keep on file for claims that stay.
6. Give an overall verdict: ready, ready with edits, or needs rework.
</task>

<constraints>
- Judge only technical and factual accuracy; leave style and tone to marketing except where wording creates a false impression.
- Do not invent product facts, numbers or certifications in suggested wording; use only the facts given.
- Flag security, privacy, compliance and competitor claims for legal or security review even if they look accurate.
- Be concise; a table is preferred.
</constraints>

<output_format>
## Verdict
## Claims review
Table: claim, status, risk, suggested wording.

## Could be stronger
## Evidence to keep on file
## Needs legal or security review
</output_format>
