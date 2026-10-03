---
schema: 1
id: verify-citations
kind: prompt
title: Verify citations and references
description: Checks a reference list or AI-written text for citations that may not exist or do not support their claims, with verification steps per item and no fabricated replacements.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student, editor, writer]
requires: [web]
inputs: [text, document]
output: [table, report, checklist]
risk: network
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [citations, hallucinated-references, doi, academic-integrity, reference-checking]
pairs_with:
  prompts: [format-citations, fact-check-claims, write-introduction-section]
  personas: [research-librarian, fact-checker]
  rules: [source-citation-rules, academic-writing-rules]
args:
  - name: text_with_references
    description: The text with its in-text citations and the reference list, or a reference list alone. Include the sentences each reference is cited for if you want claim support checked.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Reference check, Claim support, How to verify the rest, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Language models and hurried authors produce references that look real but are not: plausible titles attached to real authors, real papers with the wrong year, journal or DOI, DOIs that resolve to an unrelated paper, and genuine papers cited for claims they do not make. Fabricated references often share tells: a title that restates the citing sentence too neatly, a journal outside the author's field, page ranges or volumes that do not fit the year, DOI prefixes that do not belong to the stated publisher, or no trace in any index. Only looking a reference up settles whether it exists; only reading it settles whether it supports the claim.
</context>

<task>
Check these citations.
<text>
{{text_with_references}}
</text>

1. Parse every reference into its parts (authors, year, title, venue, volume, issue, pages, DOI or URL) and match in-text citations to reference-list entries. Flag citations with no entry and entries never cited.
2. Check each reference for internal problems: missing parts, inconsistent year and volume, a DOI that is malformed or whose prefix does not fit the publisher, a title that mirrors the citing sentence, an author outside the venue's field, or a venue that does not publish that article type.
3. If you can search the web in this session, verify each reference: resolve the DOI, search the exact title in quotes in a scholarly index or the publisher's site, and confirm authors, year and venue. Record what you opened. If you cannot search, say so at the top and mark every reference "Not checked".
4. Rate each reference: Verified (found, metadata matches); Exists with errors (found, but some metadata wrong, with the corrections from the source you found); Not found (searched as described, no match); Suspicious (not checked, but internal red flags); Not checked.
5. For claim support: where the citing sentence is given and you can read the source (abstract or full text), say whether it supports, partly supports, does not support, or cannot be judged from the abstract.
6. For anything not Verified, give specific steps to verify it by hand.
</task>

<constraints>
- Never "fix" a missing or false reference by substituting another paper. If you found a real paper that seems to be what was meant, report it as a candidate the author must read and confirm, never as a drop-in replacement.
- Never construct a DOI, URL or page range. Corrections come only from a source you opened in this session.
- "Not found" is not proof that a reference is fabricated (it may be a book chapter, report, thesis or non-indexed venue); say what kind of search would settle it.
- Do not judge whether a claim is true here, only whether the cited source supports it.
- Be explicit about which checks were actually performed.
</constraints>

<output_format>
## Summary
Web access yes or no, number of references, counts by rating, and the most serious problems.
## Reference check
A table: # | reference (short) | rating | what was checked | problems or corrections (with source).
## Claim support
A table: citing sentence | reference | supports? | evidence.
## How to verify the rest
Per reference not Verified: the exact steps.
## What not to do
One short paragraph on not replacing references without reading them.
</output_format>
