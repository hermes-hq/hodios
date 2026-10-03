---
schema: 1
id: audit-ai-answer-for-errors
kind: prompt
title: Audit an AI answer for errors
description: Audits an AI-generated answer claim by claim for factual errors, fabricated sources, invented numbers and unsupported reasoning, and produces a risk-ranked verification plan.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student, writer, individual]
requires: [none]
inputs: [text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ai-hallucination, fabricated-citations, claim-verification, ai-literacy, reference-checking]
pairs_with:
  prompts: [fact-check-claims, verify-citations, evaluate-source-credibility, check-statistics-in-article]
  personas: [fact-checker]
args:
  - name: ai_answer
    description: The AI-generated answer, pasted in full, ideally with the question that was asked and the tool or date if known.
    type: text
    required: true
  - name: topic
    description: The subject area and what the answer will be used for, for example "employment law in Germany, for an HR policy draft" or "biology homework".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Claim audit, Source check, Reasoning problems, Verification plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI answers fail in recognisable ways: references that look real but do not exist or do not say what is claimed, precise-looking numbers with no source, quotations attributed to the wrong person, outdated facts presented as current, rules from one country applied to another, confident answers to questions that have no settled answer, and reasoning that sounds fluent but does not follow. An audit is more useful than a rewrite because it shows which parts can be trusted, which must be checked, and how. The auditor here is also a language model without live access to sources, so it must separate what it can judge from the text itself (internal contradictions, logic, implausibility) from what only checking a primary source can settle.
</context>

<task>
Audit this AI-generated answer.
<ai_answer>
{{ai_answer}}
</ai_answer>
{{#topic}}Topic and intended use: {{topic}}{{/topic}}

1. Break the answer into atomic claims. Number each and classify it: factual statement, number or statistic, date, citation or reference, quotation, legal, medical or financial guidance, definition, causal claim, prediction, or opinion presented as fact.
2. For each claim, rate the risk that it is wrong (high, medium, low) and give the reason: specificity without a source, known weak spot for AI answers, internal contradiction, implausibility, likely outdated, jurisdiction mismatch, or consistent with well-established knowledge. Where you believe a claim is wrong, say so and why, labelled as your assessment to verify.
3. Check every reference for signs of fabrication: missing or malformed identifiers, author and journal combinations that look unlikely, titles that echo the question too neatly, years that do not fit, or claims attributed to a source of the wrong type. Never confirm a reference exists from memory; say what to check.
4. Check the reasoning: conclusions that do not follow, missing caveats, false precision, one-sided treatment of a contested question, and steps skipped.
5. Write a verification plan that starts with the highest-risk claims the intended use depends on, naming for each the kind of primary source that settles it and where to look (for example a DOI resolver or bibliographic database for references, the official statistics agency, the legislation itself, a clinical guideline body).
</task>

<constraints>
{{> output/uncertainty}}
- Do not present your own corrections as verified facts; you are another model and need the same checking.
- Do not rewrite the answer. Note what a corrected version would need.
- For legal, medical or financial content, say that a qualified professional or the official source should confirm anything acted on.
- Keep the audit proportional: group low-risk, well-established claims rather than listing each at length.
</constraints>

<output_format>
## Summary
Two to four sentences: how far the answer can be trusted for the intended use and the biggest problems.
## Claim audit
A table: # | claim (short) | type | risk | reason | your assessment.
## Source check
A table: reference as given | fabrication signals | what to check.
## Reasoning problems
A short list, or "None found".
## Verification plan
A numbered checklist in priority order: claim | source that settles it | where to look.
</output_format>
