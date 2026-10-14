---
schema: 1
id: respond-to-paid-feature-request
kind: prompt
title: Respond to a company offering to pay for a feature
description: Helps a maintainer handle a company offering money for a feature or fix, by checking project fit, choosing a form (contract, bounty, sponsorship), protecting project neutrality and drafting the reply.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [maintainer, founder]
requires: [none]
inputs: [message, text]
output: [report, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [paid-development, bounties, maintainer-income, scope-control, client-communication]
pairs_with:
  prompts: [evaluate-large-feature-contribution, choose-oss-funding-model, write-sponsorship-ask]
  personas: [open-source-maintainer]
args:
  - name: offer
    description: The company's message or a summary of it, what they want, any amount or deadline mentioned, and whether they want exclusivity, priority or private changes.
    type: text
    required: true
  - name: context
    description: The project's scope and roadmap, how the maintainer is employed (a job with an IP clause, self-employed, a company behind the project), whether the project has a fiscal host, and how much time is realistic. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit, Options, Recommendation, Terms to agree, Reply draft, Points to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Paid feature requests are one of the few direct ways maintainers get paid, and they go wrong in recognisable ways. The feature does not fit the project, but money makes it hard to refuse, and the project carries the maintenance for years after the cheque. The price covers building it but not reviewing, documenting and maintaining it. The company expects priority support, a private fork or a say over the roadmap, which other users will notice. The deadline is the company's, and the maintainer's day job or employment contract may restrict paid side work or claim the IP. Money paid to an individual for work on a project with other maintainers can cause resentment if it was not discussed. Workable forms: a contract for a scoped deliverable merged upstream under the project's licence, paid through the maintainer, their company or a fiscal host; a public bounty; sponsorship earmarked for a roadmap item; or a referral to a consultant if the maintainer cannot take it. The feature still goes through normal review, and the company should be able to accept that it may be reshaped.

Offer:
<offer>
{{offer}}
</offer>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Fit: does the feature belong in the project? Consider scope, users who benefit beyond the company, maintenance cost, and whether it could be a plugin or extension point instead.
2. Options: decline, reshape (an extension point the company builds on), a scoped contract, a bounty, earmarked sponsorship, or referral. Note what each means for neutrality, time and income.
3. Recommend one with the reason.
4. Terms to agree: scope and acceptance criteria, that work is merged publicly under the project licence, normal review applies, who owns maintenance afterwards, price that includes review, docs and a maintenance allowance, payment route (individual, company, fiscal host), timeline the maintainer can meet, and no exclusive or private features unless the maintainer explicitly wants a separate commercial arrangement.
5. Draft the reply to the company: friendly, clear about what the project can and cannot do, and with the next step.
6. Points to check: employment contract and IP, tax and invoicing, and telling co-maintainers.
</task>

<constraints>
- Do not suggest a specific price as a market rate; give a way to calculate it from hours and the maintainer's rate, and say rates vary widely.
- Do not give legal or tax advice; flag employment, IP and invoicing questions for the maintainer to check with a professional.
- Do not recommend accepting features that conflict with the project's scope just because they are paid.
- Keep the reply under 250 words.
</constraints>

<output_format>
Use the contract's section headings in order. Options as a table: Option | Fit | Time | Neutrality | Income. Terms to agree as a checklist. Reply draft in a fenced block.
</output_format>
