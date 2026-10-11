---
schema: 1
id: choose-cla-or-dco
kind: prompt
title: Choose a CLA, a DCO or neither
description: Decides whether an open-source project should ask contributors for a CLA, a DCO sign-off or nothing beyond the licence, then plans the rollout, contributor text and past contributions.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, founder, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [report, docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contributor-agreement, sign-off, inbound-outbound, contributor-experience]
pairs_with:
  prompts: [choose-software-license, write-contributing-guide, set-up-commit-signing]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project's licence, who owns or runs it (individuals, a company, a foundation), contributor numbers and how many come from companies, any plans for dual licensing, commercial editions or relicensing, and what you use today.
    type: text
    required: true
  - name: concerns
    description: What is driving the question, for example a company's legal team asking for a CLA, contributors refusing to sign one, or worry about code of unclear origin. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Options compared, Recommendation, Rollout, Text for contributors, Points for legal review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are three common ways to handle the rights in incoming contributions. Inbound equals outbound: contributors license their work under the project's own licence, which some licences such as Apache-2.0 state explicitly, with no extra paperwork. A Developer Certificate of Origin (DCO): each commit carries a Signed-off-by line certifying the contributor has the right to submit it under the project licence; it is light, per commit, and grants nothing beyond the licence. A Contributor Licence Agreement (CLA): a separate signed agreement granting the project or a company a broader licence, sometimes a copyright assignment, which makes later relicensing or commercial dual licensing possible but adds friction, needs a signing system and corporate agreements for employees, and makes some contributors distrust the project's intentions. The right choice follows from who runs the project and what they may want to do with the code later, and it is much harder to change once many people have contributed.

{{> guardrails/professional-limits}}

Project:
<project>
{{project}}
</project>
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Goals: state what the project needs from contributions now and may need later (clean provenance, relicensing, dual licensing, a foundation's requirements), and who would benefit from extra rights.
2. Compare inbound equals outbound, DCO, an individual and corporate CLA licence grant, and a copyright assignment on: rights granted, contributor friction, trust, tooling needed, effect on future relicensing, and what companies' legal teams usually accept.
3. Recommend one with reasons tied to the goals{{#concerns}} and the concerns given{{/concerns}}. If a CLA is recommended, recommend starting from a widely used template rather than a custom text, and say which kind.
4. Rollout: how to enforce it (a status check on pull requests, a bot only if they already use one, or a manual review step), what happens to contributions made before the change, how to fix a missing sign-off, and how to tell existing contributors.
5. Text for contributors: the section for the contributing guide explaining what is asked and why, in plain words, plus a short pull request comment for a missing sign-off or signature.
6. Points for legal review: the questions a lawyer should answer before adoption, especially for a CLA or assignment and for employees contributing on company time.
</task>

<constraints>
- Do not draft a custom CLA or assignment text; point to established templates and legal review.
- Explain that a DCO sign-off is not a cryptographic signature and is different from commit signing.
- Do not present the choice as purely legal: name the community cost of each option honestly.
- If the project's real aim is to relicense later, say so plainly rather than hiding it in the rationale for contributors.
</constraints>

<output_format>
Use the contract's section headings in order. Options compared as a table: Option | Rights granted | Friction | Future relicensing | Notes. Text for contributors in fenced blocks.
</output_format>
