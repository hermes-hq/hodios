---
schema: 1
id: write-project-governance
kind: prompt
title: Write an open-source project's governance
description: Writes a GOVERNANCE.md that matches how an open-source project really decides things, with roles, decision rules, tie-breaks, joining and leaving, and how the document itself changes.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, tech-lead, founder]
requires: [none]
inputs: [text, document]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [project-governance, decision-rules, steering-committee, succession, community-health]
pairs_with:
  prompts: [write-contributing-guide]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project today - what it is, how many active maintainers and regular contributors, who employs them, who has admin and publishing rights, how decisions are actually made now, any money it holds, and any past disputes.
    type: text
    required: true
  - name: trigger
    description: Why you are writing governance now, for example a company wants to show it does not control the project, a dispute, applying to a foundation, or the founder stepping back. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How the project works today, Recommended model, GOVERNANCE.md, Changes to make, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Governance documents fail in two ways: they describe an imaginary democracy while one person still decides everything, or they copy a large foundation's process onto a three-person project that will never hold a vote. A useful GOVERNANCE.md writes down what already happens, then fixes the gaps that hurt projects in practice: who breaks a deadlock, how someone becomes or stops being a maintainer, what happens when the lead disappears, who controls the repository, package names, domain and money, and how to stop one employer from quietly controlling the project. Common models are a single lead (often called BDFL), a maintainer council deciding by lazy consensus with a vote as a fallback, and a steering committee over several teams. Most small projects need the first or second, plus a clear succession rule.

Project:
<project>
{{project}}
</project>
{{#trigger}}Why now: {{trigger}}{{/trigger}}
</context>

<task>
1. Describe how the project works today from the facts given: who decides what, who holds which access, and where the single points of failure are (one person with publish rights, one employer with most maintainers, no written tie-break). If key facts are missing, list them and state the assumption you make.
2. Recommend a model sized to the project, with one sentence on why the bigger or smaller alternative is not right yet{{#trigger}}, and how it addresses why governance is needed now{{/trigger}}.
3. Write GOVERNANCE.md covering: roles and what each may do; how decisions are made (lazy consensus with a stated waiting period, what needs explicit approval, who breaks ties); how people join a role, step down, become emeritus, or are removed for inactivity or conduct; employer diversity rules if relevant; who holds the project's assets (repository, package names, domain, trademarks, funds) and how they are handed over; how the code of conduct is enforced and by whom; how this document is changed.
4. List the concrete changes needed to make the document true (access to add or remove, a MAINTAINERS file, a funding host, a second person with publish rights).
5. List open questions the maintainers must answer together before publishing.
</task>

<constraints>
- Do not describe a process the project does not follow or has not agreed to adopt. Where you propose something new, mark it "proposed" so maintainers can discuss it.
- Keep it short enough to read in five minutes; a small project's governance should fit on one page.
- Do not invent foundation rules, legal entities or trademark registrations. If the project holds money or trademarks, say who should check the legal side.
- Every role that can block a decision needs a named way to resolve deadlock and a way to leave.
</constraints>

<output_format>
## How the project works today
Bullets, including single points of failure.
## Recommended model
Two or three sentences.
## GOVERNANCE.md
The full file in a fenced markdown block, with "proposed" marked inline.
## Changes to make
A table: Change | Who | Why.
## Open questions
Numbered.
</output_format>
