---
schema: 1
id: explain-license-obligations-for-use
kind: prompt
title: Explain the licence obligations of using a library
description: Explains what you must actually do to use an open-source library in your product, by how you ship it, covering notices, source offers, copyleft scope and network use, and when to ask a lawyer.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, tech-lead, founder, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [explanation, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [copyleft, agpl, gpl, attribution, license-compliance, distribution]
pairs_with:
  prompts: [audit-dependency-licenses, generate-third-party-notices, choose-software-license]
args:
  - name: library
    description: The library or component, its licence as stated (SPDX id or the licence text name), and the version you use. Mention any extra files such as NOTICE or a licence exception.
    type: text
    required: true
  - name: use
    description: How your product uses it and how the product reaches people, for example a SaaS backend never distributed, a mobile app, an on-prem install, firmware, a library you publish, statically or dynamically linked, modified or not.
    type: text
    required: true
  - name: jurisdiction
    description: Where the company is based and sells, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, What triggers obligations, Obligations for your use, What you do not have to do, Grey areas, Checklist, Ask a lawyer when]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Licence obligations depend far more on how the code reaches people than on the licence name. Most obligations are triggered by distribution (shipping binaries, apps, firmware, on-prem installs, a published package), not by internal use. Permissive licences (MIT, BSD, ISC, Apache-2.0) mainly require keeping copyright and licence text with what you ship; Apache-2.0 adds carrying forward any NOTICE file and marking modified files, and grants a patent licence that ends for anyone who sues claiming the work infringes their patents. Weak copyleft (LGPL, MPL-2.0, EPL-2.0) applies to the library's own files or the library itself: MPL is file-level, LGPL also expects that users can replace or relink the library, which static linking and locked-down devices make awkward. Strong copyleft (GPL) extends to the combined work when you distribute it, and what counts as one combined work is a contested question. AGPL adds network use: if users interact with a modified version over a network, they must be offered its source. SaaS use of GPL code that is never distributed usually triggers nothing; the same use of modified AGPL code does. Source-available licences (BSL, SSPL, Commons Clause, Elastic) are not open source and often restrict competing hosted use. Dual licences, licence exceptions (such as the GCC runtime or Classpath exception) and the licences of transitive dependencies all change the answer.

{{> guardrails/professional-limits}}

Library:
<library>
{{library}}
</library>
How it is used and shipped:
<use>
{{use}}
</use>
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
1. Restate the licence as you understand it (SPDX id, version, any "or later" wording, exceptions). If the licence name is ambiguous ("GPL", "BSD", "open source"), say which readings are possible and how the answer changes.
2. Classify the use: internal only, network service, distributed binary or app, distributed source, embedded device, or a library others will redistribute. Note whether the code is modified, and how it is combined (separate process, dynamic link, static link, copied source).
3. State which licence conditions this use triggers and which it does not, each with the reason.
4. List the concrete obligations: what text to ship and where (about screen, NOTICE file, docs, package metadata), whether a source offer or source release is needed, for which code and for how long, marking of modifications, relinking or replacement for LGPL, and AGPL network source offers.
5. Say plainly what the person does not need to do, to stop over-compliance (for example, releasing your whole app's source because of an MIT dependency).
6. Name the grey areas for this case (combined-work boundaries, static linking, plugins, containers that bundle GPL tools, licence changes in newer versions) and how cautious companies usually handle them.
7. Give a short compliance checklist and the situations where a lawyer should review before shipping.
</task>

<constraints>
- Do not invent licence clauses. If you are unsure of a licence's exact wording or of a version difference, say so and tell the person to read the licence text or its SPDX entry.
- Do not declare a use "safe" or "compliant"; describe obligations and risk levels.
- Treat source-available and custom licences as not open source and flag them for review rather than guessing their terms.
- Remind the person that transitive dependencies carry their own licences and the answer here covers only the named library.
- Note that interpretation and enforcement differ by country and that a lawyer should confirm anything that affects a release.
</constraints>

<output_format>
Use the contract's section headings in order. Obligations for your use as a table: Obligation | Applies? | What to do. Checklist as checkbox lines. Keep the short answer to three sentences.
</output_format>
