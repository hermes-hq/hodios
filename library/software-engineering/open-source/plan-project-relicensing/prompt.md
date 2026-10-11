---
schema: 1
id: plan-project-relicensing
kind: prompt
title: Plan relicensing an open-source project
description: Works out whether an open-source project can change its licence, who holds copyright, how to gather consent or replace code, and what the change means for users and forks.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, founder, legal-professional]
subject: [law]
requires: [none]
inputs: [text, repo]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [relicensing, copyright-holders, contributor-consent, copyleft, license-compatibility]
pairs_with:
  prompts: [choose-software-license, audit-dependency-licenses]
  personas: [open-source-maintainer]
args:
  - name: project
    description: Current licence, the licence or goal you want, project age, number of contributors, whether there is a CLA (and what it grants) or a DCO, contributions made by people on company time, and who owns the repository.
    type: text
    required: true
  - name: contributors
    description: A contributor summary if you have one, such as a list of authors with commit or line counts and employers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Can you relicense, Copyright holders, Consent plan, Code you cannot clear, Change checklist, Community impact, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A project can only relicense code its owners hold the rights to. Without a contributor agreement that grants the project broad rights, every contributor (or their employer, for work done on the job) keeps copyright in their contribution, so changing the licence needs their consent, or their code must be removed or rewritten. Whether a tiny contribution is protected by copyright at all is a legal judgement that varies by country. Some moves need less: code under a permissive licence can often be included in a project under a more restrictive one while keeping the original notices, which is different from relicensing it. Past releases stay available under the old licence forever, so anyone may fork the last version. Moving from open source to a source-available licence often triggers forks and lost trust, and the result should not be described as open source.

{{> guardrails/professional-limits}}

Project:
<project>
{{project}}
</project>
{{#contributors}}
Contributors:
<contributors>
{{contributors}}
</contributors>
{{/contributors}}
</context>

<task>
1. Can you relicense: state the goal, whether the change is relicensing or something simpler (adding a licence to new code, dual licensing, an exception), what the CLA or DCO in place does and does not allow, and the main obstacle. Give a provisional answer with its assumptions.
2. Copyright holders: explain how to build the list from version history (authors of surviving code, not just commit counts), how employers own work done on company time, and how to treat bots, generated files and vendored third-party code{{#contributors}}, applying this to the summary given{{/contributors}}.
3. Consent plan: the request message (what changes, why, what you are asking them to agree to, how to answer), how to record consent in a durable, public or verifiable way, deadlines, reminders, and how to find people who have moved on.
4. Code you cannot clear: options per contributor who refuses or cannot be reached (remove, rewrite by someone who has not studied the original closely, or keep that part under the old licence if compatible), with the effort each implies.
5. Change checklist: LICENSE file, SPDX identifiers and headers, package metadata, notices for third-party code, docs, the release where the change takes effect, and a note that earlier releases keep the old licence.
6. Community impact: how users, downstream packagers and companies are affected, fork risk, and an honest announcement outline.
7. Questions for a lawyer: the specific questions this situation raises, to take to a lawyer who knows copyright and open-source licensing in the relevant country.
</task>

<constraints>
- Never suggest changing the licence of other people's contributions without their permission or a valid agreement, or hiding the change from contributors.
- Do not state whether a specific contribution is copyrightable or whether a specific clause is enforceable; flag it for the lawyer.
- Describe licences only from well-known terms and mark anything uncertain for checking against the licence text.
- Do not call a source-available or restricted licence open source.
</constraints>

<output_format>
Use the contract's section headings in order. Copyright holders as a table: Holder or group | Basis | Consent needed | Notes. Consent request as a fenced block. Change checklist as a checklist.
</output_format>
