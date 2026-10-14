---
schema: 1
id: write-social-media-policy
kind: prompt
title: Write a social media policy for employees
description: Writes a plain-language social media policy for staff covering personal accounts, confidentiality, disclosing who you work for, speaking for the company, harassment and how to escalate.
category: social-media
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, founder, operations-manager, marketer]
inputs: [text, preferences]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [staff-policy, confidentiality, personal-accounts, employer-disclosure, escalation]
pairs_with:
  prompts: [plan-employee-advocacy, handle-social-media-backlash, write-community-guidelines]
args:
  - name: organisation
    description: What the organisation does, size, country or countries, sector (and whether regulated, for example finance, health, public sector, schools), and who runs official accounts.
    type: text
    required: true
  - name: concerns
    description: "Optional: what prompted the policy (an incident, a launch, new staff), and specific worries such as client confidentiality, political posts or staff being targeted online."
    type: text
output_contract:
  format: markdown
  sections: [Before you adopt this, Policy, Quick guide for staff, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most organisations only write a social media policy after something goes wrong: a confidential screenshot, an employee arguing with a customer online, a post read as the company's view. Good policies are short, specific and fair. They separate official accounts from personal ones; protect confidential and client information; ask staff to disclose their employer when they talk about the company's products (endorsement rules in many countries require it); say who may speak for the organisation; cover harassment of and by staff; and tell people what to do when they see a problem or are targeted. They avoid overreach: in many countries employees have rights to discuss pay and working conditions, to engage in lawful political activity, and to privacy in their personal lives, and blanket bans on criticising the employer can be unlawful. Regulated sectors add their own rules.

<organisation>
{{organisation}}
</organisation>
{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Before you adopt this: say that employment and speech rules differ by country and the policy needs review by HR or an employment lawyer, and list the points most likely to need local review (monitoring of accounts, limits on criticising the employer, political activity, disciplinary consequences, sector rules).
2. Write the policy with these sections: purpose and scope; official accounts (who runs them, approvals, logins and access); personal accounts (it's your account; when you mention work, say views are your own; no confidential, client or colleague information; disclose your employer when promoting company products); speaking for the organisation (who may, what to do with media or customer queries); respect and harassment (towards and from staff, and support for staff targeted online); mistakes and escalation (what to do and who to contact); related policies; review date.
3. Add sector rules if the organisation is regulated, as points to confirm rather than stated law.
4. Write a one-page quick guide for staff: do, don't, and who to contact.
5. Rollout: how to introduce it (explain the reasons, give examples, invite questions), training for official account holders, and when to review.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not write rules that ban discussing pay or working conditions, require access to personal accounts or passwords, or forbid lawful off-duty activity outright; if the user asks for these, explain the risk.
- Do not state law for any country; mark local points [CHECK LOCALLY].
- Plain language; the policy under about 1,200 words.
</constraints>

<output_format>
## Before you adopt this
Bullets.
## Policy
The policy with numbered sections.
## Quick guide for staff
Do, don't, contacts.
## Rollout
Bullets.
</output_format>
