---
schema: 1
id: write-media-policy
kind: prompt
title: Write a staff media policy
description: Writes an organisation's media policy - who speaks for it, how staff route press enquiries, expert commentary approvals, personal social media and crisis rules - with a one-page staff guide.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [executive, manager, marketer, operations-manager]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [media-policy, spokesperson, press-enquiries, staff-guidance, governance]
pairs_with:
  prompts: [build-crisis-comms-plan, reply-to-journalist-request]
args:
  - name: organisation
    description: What the organisation does, size, sector, country or countries, whether it is public sector, listed or regulated, and how media enquiries are handled today.
    type: text
    required: true
  - name: concerns
    description: What prompted the policy (for example staff quoted without approval, experts wanting to comment publicly, a past incident). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Policy, Staff quick guide, Enquiry routing, Notes for leaders and HR]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a communications director drafting a media policy. Good policies are short and practical: staff know what to do in the thirty seconds after a reporter calls ("thank them, take their name, outlet, deadline and question, and pass it to the press office"), experts know how to get approval to comment in their field, and spokespeople know their limits. Bad policies try to forbid all contact with media and all mention of work online, which staff ignore and which can conflict with employment law: in many jurisdictions staff have protected rights to speak about some matters, such as raising concerns as whistleblowers, union activity, or discussing pay and conditions. Public bodies often have extra rules on political neutrality and freedom of information; listed companies have disclosure rules about who may speak on results and deals.

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
1. Policy, about 600 to 1,000 words, with headings: purpose and scope; who may speak on behalf of the organisation and on what topics; how media enquiries are handled; expert commentary in a personal professional capacity (approval route, how to describe one's role, what is off limits); personal social media when it touches work (identify personal views as personal, no confidential information, respect for colleagues and clients); crises and sensitive matters (refer everything to the press office); special rules for the sector (election periods for public bodies, disclosure for listed companies, patient or client confidentiality); what the policy does not restrict, stated plainly; training; and breaches, described proportionately and referring to existing HR procedures.
2. Staff quick guide: one page, plain language: what to do when a journalist contacts you, a script of two or three sentences, what to post and not post, and who to call.
3. Enquiry routing: a simple flow from first contact to response, with response-time targets and an out-of-hours route, using role names.
4. Notes for leaders and HR: points to confirm with legal or HR advisers for the country (protected disclosures, union and collective rights, rules on discussing pay, public-sector obligations), and how to roll out the policy.
</task>

<constraints>
- Do not write rules that ban all staff contact with media or all mention of the employer online; say that such rules may be unlawful in some jurisdictions and unenforceable in practice.
- State explicitly that nothing in the policy prevents protected disclosures or other legally protected speech, and leave the specifics for legal review in the user's country.
- Use role names, not personal names or phone numbers.
- Keep consequences proportionate and tied to existing HR procedures; no threats.
- Plain language a new starter can follow without asking.
</constraints>

<output_format>
## Policy
## Staff quick guide
## Enquiry routing
Numbered steps or a simple text flow.
## Notes for leaders and HR
</output_format>
