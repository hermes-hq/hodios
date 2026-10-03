---
schema: 1
id: write-accessibility-statement
kind: prompt
title: Write an accessibility statement
description: Writes an honest accessibility statement for a website or app, covering the standard targeted, conformance status, known issues with workarounds, alternatives, feedback contact and review date.
category: policies
version: 1.0.0
status: incubating
stage: [build, ship]
role: [product-manager, designer, frontend-engineer, legal-professional]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [accessibility-statement, wcag, conformance, digital-inclusion, public-sector]
pairs_with:
  prompts: [audit-web-accessibility, audit-mobile-accessibility]
  personas: [accessibility-specialist]
args:
  - name: product
    description: The website, app or service the statement covers (its URL or name and which parts are in scope), and who runs it.
    type: string
    required: true
  - name: conformance_status
    description: What you actually know - the standard and level targeted (for example WCAG 2.2 AA), how and when it was tested (audit, automated scan, user testing), known issues with where they occur, fixes planned with dates, and any content you consider out of scope.
    type: text
    required: true
  - name: jurisdiction
    description: Where the organisation operates or which rules apply (for example "UK public sector", "EU private company under the European Accessibility Act", "US federal agency", "Ontario"). Optional; without it a neutral statement is written and legal requirements are flagged.
    type: string
output_contract:
  format: markdown
  sections: [Before you publish, Accessibility statement, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write accessibility statements that disabled users can rely on. The statement's job is practical: tell people what works, what does not, how to get the content another way, and how to report a problem and get a response. The common failures are overclaiming ("fully accessible", "WCAG compliant" with no testing behind it) and vague known-issues sections. Some regimes prescribe the statement's structure and content (for example public sector bodies in the UK and EU, and organisations within the European Accessibility Act), others do not require one at all; an inaccurate statement can create legal exposure. So every claim traces back to the testing described, and required elements are flagged for confirmation.
{{#jurisdiction}}Jurisdiction or rules: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Product: {{product}}

What is known about accessibility:
<status>
{{conformance_status}}
</status>

1. Decide the honest conformance wording from the evidence: fully conformant, partially conformant, or not conformant to the stated standard and level. "Fully" is only possible if testing covered the whole scope and found no failures. If there is no testing, say so and use "we have not yet assessed" wording.
2. Draft the statement in plain language:
   - Commitment and scope: who runs the service, which parts the statement covers.
   - How accessible it is: a short list of what users can do (for example zoom to 400% without loss, navigate by keyboard, use a screen reader) only where the input supports it, and a short list of what does not work yet.
   - Conformance status with the standard, level and wording from step 1.
   - Known issues: each in user terms (what fails, where, who is affected), with the success criterion if known, a workaround, and the planned fix date if given.
   - Content out of scope and why, only where the input states it.
   - Alternatives: how to get information in another format and how long it takes.
   - Feedback and contact: how to report a problem, the response time the organisation commits to, and [BRACKETS] for contact details.
   - Enforcement or escalation route, only where the jurisdiction requires or provides one, marked to confirm.
   - How it was tested: method, date, who tested.
   - Date prepared and next review date.
3. Gaps and questions: claims you could not make, required elements for the jurisdiction to confirm, and testing that would make the statement stronger.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never write "fully accessible", "fully compliant" or "WCAG compliant" unless the input describes testing that supports it. Overclaiming is worse than admitting issues.
- Do not invent known issues, testing dates, auditors or response times; use [BRACKETS] for missing facts.
- Describe issues in terms of what a user experiences, not only success-criterion numbers.
- Do not state legal requirements as fact; mark required sections and wording "confirm for your jurisdiction".
- Write the statement itself accessibly: short sentences, descriptive headings and link text, no tables for content that reads better as a list.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you publish
Three to five bullets.

## Accessibility statement
The full statement with headings.

## Gaps and questions
Numbered.
</output_format>
