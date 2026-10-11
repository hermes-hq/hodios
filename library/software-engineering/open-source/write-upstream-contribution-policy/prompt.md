---
schema: 1
id: write-upstream-contribution-policy
kind: prompt
title: Write a company policy for contributing to open source
description: Writes a company's policy for employees contributing to and releasing open source, covering IP, approval levels, CLA signing, personal projects, accounts, security and how contributions are credited.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, tech-lead, legal-professional]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ospo, contributor-agreement, employee-ip, upstream-contributions, open-sourcing]
pairs_with:
  prompts: [write-open-source-usage-policy, choose-cla-or-dco, prepare-code-for-open-sourcing]
args:
  - name: company
    description: What the company does, its size, which open-source projects engineers already contribute to or need fixes in, who owns legal and security, and whether the company releases its own projects.
    type: text
    required: true
  - name: constraints
    description: Anything that limits the policy, such as an employment contract IP clause, patents the company cares about, competitors' projects, or export or customer confidentiality rules. Optional; paste relevant clauses if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Contribution levels, CLAs and sign-offs, Personal projects, Accounts and identity, Security and confidentiality, Policy text, Points for legal review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Without a policy, engineers either keep fixes to upstream libraries in private patches forever, which costs the company every upgrade, or contribute freely with unclear rights, sometimes signing a project's CLA on the company's behalf without authority. Good contribution policies have tiers: small fixes and documentation to existing projects under an approved licence are pre-approved; substantial features, contributions touching the company's core technology, or projects under unusual licences need a quick review; releasing a new company project needs a fuller process. Corporate CLAs should be signed once by someone with authority and then cover employees listed under them; individuals should not sign CLAs that grant rights in company-owned work. Personal side projects are a separate, sensitive issue: employment contracts and local law differ on who owns work done on personal time, and a vague policy damages trust. Practical details matter too: whether people use personal or company accounts, the commit email, and never contributing anything that reveals confidential information or unreleased security fixes.

{{> guardrails/professional-limits}}

Company:
<company>
{{company}}
</company>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Goals: why the company wants contributions (less patch maintenance, influence, hiring, giving back) and what it must protect.
2. Contribution levels as a table: what is pre-approved, what needs a light review and by whom, and what needs full approval, with examples matching this company's situation.
3. CLAs and sign-offs: who may sign corporate CLAs, how employees are added to them, that individuals do not sign CLAs for company work, and how DCO sign-offs apply.
4. Personal projects: a fair position on work done on personal time and equipment that is unrelated to the business, how to ask for a written release, and a note that the contract and local law decide the actual ownership.
5. Accounts and identity: personal or company accounts, commit email, two-factor authentication, and affiliation in profiles.
6. Security and confidentiality: no internal code, names, customer data or unreleased vulnerabilities; how to handle fixing a security issue found in an upstream project (private disclosure first).
7. Write the policy text, one to two pages, in plain language engineers will read.
8. List the points for legal review, especially IP assignment, patents and personal-project ownership.
</task>

<constraints>
- Do not state who owns an employee's personal-time work as fact; it depends on the contract and the jurisdiction. Present the policy position and send the question to legal review.
- Do not draft CLA text; point to signing established corporate CLAs through an authorised signer.
- Keep the pre-approved tier genuinely useful; a policy where every typo fix needs approval will be ignored.
- Do not invent contract clauses or laws. Quote only from the constraints the user pasted.
</constraints>

<output_format>
Use the contract's section headings in order. Contribution levels as a table: Level | Examples | Approval | Turnaround. Policy text in a fenced markdown block. Points for legal review as a numbered list.
</output_format>
