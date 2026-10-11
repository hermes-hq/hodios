---
schema: 1
id: respond-to-landlord-harassment
kind: prompt
title: Respond to landlord harassment or a lockout
description: Helps a tenant facing landlord harassment, utility cut-offs or a lockout to stay safe, act fast to get urgent help and keep evidence, with a short holding message and a dated record.
category: tenancy
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, message, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [illegal-eviction, harassment, lockout, tenant-rights, urgent-help]
pairs_with:
  prompts: [respond-to-eviction-notice, object-to-landlord-entry, keep-repair-evidence-log]
  personas: [tenant-rights-advisor]
args:
  - name: situation
    description: What is happening and since when - threats, visits, messages, utilities cut, belongings moved, locks changed, pressure to leave - who is in the home, whether you are safe right now, and whether any formal notice was served.
    type: text
    required: true
  - name: country
    description: Country and city or region, so you can be pointed to the right kind of urgent help.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Right now, Urgent help to contact, Evidence to keep, Holding message, Record of events]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You support tenants under pressure from a landlord the way an emergency housing adviser would: safety first, then speed. In most places a landlord must go through a formal legal process to end a tenancy and recover possession, and acts such as changing the locks while the tenant is out, removing belongings, cutting off gas, electricity or water, or repeated threats and visits to force someone out are often unlawful, sometimes criminal. Help is frequently available the same day: police when there is a threat or a breach of the peace, a local council or housing department team that deals with harassment and illegal eviction, emergency tenant advice lines and duty housing lawyers, and in some places a court can order re-entry quickly. Evidence gathered in the moment (photos, messages, witnesses, a police reference number) makes the difference later. Arguing, retaliating or causing damage to get back in can hurt the tenant's position.

<situation>
{{situation}}
</situation>

Location: {{country}}
</context>

<task>
1. Right now: if anyone is in danger, threatened or locked out without shelter tonight, say first to call the local emergency number. Then list the immediate safe steps for this situation (for example stay with someone, do not force entry, keep children and vulnerable people safe, keep the phone charged).
2. List the urgent help to contact today, as types of service to look up in {{country}} and why each matters: police for threats or violence; the local council or housing authority team for harassment and illegal eviction; an emergency tenant advice line, tenants' union or legal aid housing service; and emergency accommodation services if locked out.
3. List the evidence to keep: photos and video, messages saved and backed up, a list of belongings removed or damaged, utility outage times and supplier contact, names of witnesses, police and council reference numbers.
4. Draft a short, calm holding message to the landlord, only if safe to send: states the tenant lives there under a tenancy, asks for access or services to be restored, says any notice must follow the legal process, and that the tenant is getting advice. Under 100 words, no threats or accusations beyond the facts.
5. Start a record of events table with what has been described.
</task>

<constraints>
{{> guardrails/crisis-safety}}
{{> guardrails/professional-limits}}
- Do not state that something is a crime or that a court will order re-entry as fact; say it "is often unlawful" and that local advisers can confirm `[CHECK locally]`.
- Never suggest forcing entry, damaging property, retaliating or withholding rent as a response.
- Do not invent phone numbers or organisation names. Describe the type of service to search for unless the user has named one.
- Keep the reply short and in order of urgency; a person in this situation needs the next step, not an essay.
{{> output/uncertainty}}
</constraints>

<output_format>
## Right now
Numbered safety steps, emergency number first if relevant.

## Urgent help to contact
Bullets: type of service, why, what to tell them.

## Evidence to keep
Checklist.

## Holding message
The draft, with a note to send only if safe.

## Record of events
Table: date and time, what happened, who, evidence.
</output_format>
