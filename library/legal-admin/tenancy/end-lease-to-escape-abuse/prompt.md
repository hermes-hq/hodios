---
schema: 1
id: end-lease-to-escape-abuse
kind: prompt
title: End a lease to leave an abusive home
description: Helps a tenant who needs to leave a shared home because of domestic abuse plan safely around the lease - urgent help first, early release routes to check, the rent and deposit, and a short letter.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law, real-estate]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [domestic-abuse, safety-planning, early-lease-exit, joint-tenancy, housing-help]
pairs_with:
  prompts: [plan-early-lease-exit, apply-for-housing-assistance, find-free-legal-help]
args:
  - name: situation
    description: Share only what feels safe - whether you are safe right now, who is on the lease, whether the abuser lives there, children or pets, and how soon you need to leave. You do not need to describe the abuse.
    type: text
    required: true
  - name: country
    description: Country and region of the home. Early-release rules and support services vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Safety first, Help to contact, Lease routes to check, Rent and deposit, Short letter to the landlord, Records to keep safely]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone leaving an abusive home deal with the tenancy, the way a domestic abuse housing adviser does. Safety comes before paperwork. Leaving is often the most dangerous time, so plans are best made with a specialist domestic abuse service, who can also help with refuges, emergency housing and legal protection. On the lease, several routes may exist depending on the country: some places let survivors end a lease early or remove themselves from a joint lease with notice and evidence; some let the abuser be removed from the tenancy or excluded by a court order so the survivor can stay; social landlords may offer emergency transfers; and in other places the ordinary routes apply (surrender by agreement, a replacement tenant). With a joint tenancy, one tenant's notice can sometimes end it for both, which can be a protection or a risk, so advice first matters. Rent liability, the deposit and the landlord's need to keep the survivor's new address confidential all need attention.
</context>

<task>
<situation>
{{situation}}
</situation>

Location: {{country}}

1. Safety first: if there is any immediate danger, say to call emergency services now. Then: tell them that their safety matters, that the abuser could see this conversation on a shared device, and suggest using a private device or browser and clearing history if safe.
2. Help to contact: types of specialist service (national domestic abuse helpline, local support service, refuge network, legal aid, police), and say to look up the official numbers for {{country}}; do not invent numbers. These services can help plan a safe exit.
3. Lease routes to check: for their situation (sole or joint, abuser on the lease or not, social or private), the routes that may exist, each marked `[CHECK locally]`, and the evidence such routes commonly accept (protection order, police report, letter from a support worker or professional).
4. Rent and deposit: what to clarify about rent after leaving, how a joint deposit is commonly handled, and asking the landlord not to share their new address.
5. Short letter to the landlord: a brief, factual letter that does not over-share, asking to end or change the tenancy under the relevant route (bracketed), requesting confidentiality, and giving a safe contact address.
6. Records to keep safely: documents to take or copy (lease, ID, deposit receipt, rent records), stored where the abuser cannot reach them.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Abuse is the reason for this request, so mentioning it does not mean stopping: give the safety and help sections first, then continue with the tenancy plan. Stop and keep to emergency help only if they say they are in danger right now or mention self-harm.
- Do not ask for details of the abuse or make the person justify leaving.
- Do not state early-release rules, notice periods or required evidence as fact.
- Do not suggest any step that alerts the abuser, such as messaging the joint tenant, before the person has talked to a support service.
{{> output/uncertainty}}
</constraints>

<output_format>
## Safety first
Short paragraph.

## Help to contact
Bullets of service types.

## Lease routes to check
Bullets.

## Rent and deposit
Bullets.

## Short letter to the landlord
Under 180 words, with [BRACKETS].

## Records to keep safely
Checklist.
</output_format>
