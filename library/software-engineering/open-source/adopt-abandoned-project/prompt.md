---
schema: 1
id: adopt-abandoned-project
kind: prompt
title: Adopt an abandoned open-source project
description: Plans taking over maintenance of an unmaintained open-source project you depend on, through contact with the owner, the registry's transfer process, or an honest, clearly named fork.
category: open-source
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [maintainer, software-engineer, tech-lead]
requires: [none]
inputs: [text, url]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [unmaintained-dependency, forking, package-registry, maintainer-transfer, supply-chain-trust]
pairs_with:
  prompts: [vet-dependency, retire-open-source-project]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project and where it is published, the evidence it is abandoned (last release, last maintainer activity, unanswered issues or security reports), how you depend on it, and your track record with it.
    type: text
    required: true
  - name: plans
    description: What you want to do - become co-maintainer, take over fully, fork - and whether a company or team is behind you. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is it abandoned, Options, Message to the maintainer, Registry route, If you fork, What you are taking on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Quiet is not the same as abandoned: a finished library may need no releases for years. Abandonment shows as unanswered security reports, broken builds on current runtimes, and open pull requests no one reviews, combined with no reply to direct contact. Users trust a package name, so taking one over is a supply-chain event: attackers have used "I'll maintain it" offers to publish malicious versions. The respectful order is to contact the maintainer through several channels with a specific offer, ask first for co-maintainer access rather than a full transfer, wait a reasonable time, and only then use the package registry's own process for abandoned names, where one exists (its rules, evidence and waiting periods vary by registry), or fork under a new name. A fork must keep the licence and copyright notices and say clearly what it is.

Project:
<project>
{{project}}
</project>
{{#plans}}Plans: {{plans}}{{/plans}}
</context>

<task>
1. Is it abandoned: judge the evidence, list what is missing, and say whether the project might simply be finished.
2. Options: patch locally or vendor, offer help and co-maintainership, request a transfer, use the registry process, or fork; with effort, time and risk for each, and a recommendation{{#plans}} that takes the stated plans into account{{/plans}}.
3. Message to the maintainer: a short, respectful message offering specific help, your track record with the project, what access you ask for and what you will not do (for example no breaking changes without their agreement), with a follow-up after a stated interval and the channels to try.
4. Registry route: what the registry's abandoned-name process generally needs (evidence of contact attempts, your plans), with a note to read the registry's current policy because rules differ.
5. If you fork: naming that is not confusing, README text stating the relationship to the original, keeping the licence and notices, migration instructions for users, and an offer to merge back if the original returns.
6. What you are taking on: security response, release duties, existing issues, and users' trust, with a minimal commitment the user should make publicly.
</task>

<constraints>
- Never suggest publishing under the original name without authorisation, impersonating the maintainer, or gaining access to their accounts; refuse plainly if asked.
- Do not invent registry policies or timeframes; describe the general pattern and point to the registry's current policy.
- Keep the original licence and copyright notices in any fork.
- Treat a quiet but working project as possibly finished, not abandoned.
</constraints>

<output_format>
Use the contract's section headings in order. Options as a table: Option | Effort | Time | Risk. Messages and README text as fenced blocks.
</output_format>
