---
schema: 1
id: review-cognitive-accessibility
kind: prompt
title: Review cognitive accessibility
description: Reviews a built flow against the WCAG 2.2 cognitive criteria and W3C COGA patterns, covering login, time limits, redundant entry, errors and plain language, with code and copy changes.
category: accessibility
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, fullstack-engineer, designer, product-manager]
requires: [none]
inputs: [file, spec, text]
output: [report, copy, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coga, accessible-authentication, plain-language, timeouts, error-prevention, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-form-accessibility, audit-web-accessibility, write-accessibility-acceptance-criteria]
args:
  - name: flow_description
    description: The flow as built - steps, screen copy, form fields, login and verification method, time limits, error messages and help options. Paste code, copy or a step-by-step description.
    type: text
    required: true
  - name: users
    description: Who uses it and in what situation, for example "benefit claimants, often stressed, many on phones" or "older patients booking appointments". Leave empty for a general public audience.
    type: text
    default: general public
output_contract:
  format: markdown
  sections: [Summary, Findings, Changes, Test with people]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People with learning disabilities, dementia, ADHD, brain injury, anxiety or low literacy, and anyone tired, stressed or using a second language, fail at the same places: a login that requires remembering or transcribing something, a session that expires mid-form, a form that asks again for what it already knows, an error message that blames without explaining, help that moves around, and dense jargon. WCAG 2.2 made several of these testable (3.3.7 Redundant Entry, 3.3.8 Accessible Authentication (Minimum), 3.2.6 Consistent Help), alongside older criteria such as 2.2.1 Timing Adjustable and 3.3.4 Error Prevention. The W3C COGA guidance ("Making Content Usable for People with Cognitive and Learning Disabilities") goes further with design patterns. A useful review cites both and returns concrete changes, not "simplify the language".
</context>

<task>
Review this flow for cognitive accessibility. Users: {{users}}.

<flow_description>
{{flow_description}}
</flow_description>

1. Walk the flow step by step as a user with limited working memory, slow reading and high anxiety would, noting where they must remember, calculate, transcribe, decode or hurry.
2. Check the testable criteria and record pass, fail or cannot tell:
   - 3.3.8 Accessible Authentication: no cognitive function test (remembering a password, transcribing a code, solving a puzzle) unless an alternative or mechanism exists. Password fields allow paste and password managers (`autocomplete="current-password"`, `one-time-code`), passkeys or email links are offered, and image CAPTCHAs have an alternative.
   - 3.3.7 Redundant Entry: information already given in this process is filled in or selectable.
   - 2.2.1 Timing Adjustable: a warning at least 20 seconds before timeout with a simple way to extend, or no limit; 2.2.6 for data loss on timeout.
   - 3.2.6 Consistent Help: contact or help in the same relative place on every page.
   - 3.3.1, 3.3.3 and 3.3.4: errors identified in text, with a suggestion, and review, confirm or undo for legal, financial or data-changing actions.
   - 3.2.3 and 3.2.4: consistent navigation and naming.
3. Check COGA patterns that are not WCAG requirements but matter: one main task per page, clear step indicator, plain language (short sentences, common words, active voice, no idioms), numbers and dates in familiar formats, critical information not only in icons, no distracting motion or pop-ups, saved progress, clear purpose of each page in its heading.
4. For each problem, write the change: replacement copy for headings, labels, instructions and errors; code changes for authentication, autocomplete, timeouts and pre-filled fields; and flow changes such as splitting a step.
5. Rank by the chance a user gives up or makes a costly mistake.
</task>

<constraints>
- Rewrite copy in the product's voice and keep legal or regulatory wording intact; where wording is mandated, add a plain-language explanation next to it instead.
- Do not remove security controls; propose accessible alternatives that keep the same assurance (passkeys, magic links, copy-pastable codes, non-puzzle bot checks).
- Do not invent details of the flow; mark anything you could not assess as "cannot tell" and say what is needed.
- Do not speculate about individual users' diagnoses.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
The two or three places users are most likely to give up, in plain words.

## Findings
Table: # | Step | Problem | Criterion (WCAG SC or COGA pattern) | Pass, fail or cannot tell | Impact.

## Changes
Numbered, matching findings: before and after copy, or the code change, ready to paste.

## Test with people
Who to recruit, three tasks to give them, and what to observe.
</output_format>
