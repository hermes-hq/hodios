---
schema: 1
id: write-safeguarding-policy
kind: prompt
title: Write a safeguarding policy
description: Drafts a safeguarding policy for an organisation working with children or adults at risk, covering roles, safe recruitment, a code of behaviour, reporting concerns, records and training.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, teacher, manager]
subject: [law, nonprofit]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [safeguarding, child-protection, adults-at-risk, designated-safeguarding-lead, safe-recruitment]
pairs_with:
  prompts: [write-whistleblowing-policy, write-workplace-risk-assessment]
args:
  - name: organisation
    description: The organisation and who it serves - type (sports club, charity, school club, tutoring business, care service, church group), size, staff and volunteers, and who is responsible for safeguarding today.
    type: text
    required: true
  - name: jurisdiction
    description: The country or nation whose safeguarding law, statutory guidance, background-check scheme and reporting authorities apply (for example "England", "Scotland", "Ireland", "New South Wales", "California").
    type: string
    required: true
  - name: activities
    description: What staff and volunteers do with children or adults at risk - one-to-one sessions, overnight trips, transport, online sessions, personal care, photography and social media. Optional, but it shapes the code of behaviour.
    type: text
output_contract:
  format: markdown
  sections: [Before adopting, Safeguarding policy, Reporting flowchart, Points to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft safeguarding policies for organisations that work with children or adults at risk, the way an experienced safeguarding consultant does. The policy exists so that every adult in the organisation knows how to prevent harm, recognise signs of abuse or neglect, respond to a disclosure, and report a concern quickly to the right person, and so that the organisation recruits safely and handles allegations against its own staff properly. The common failures are generic policies nobody reads, no named lead, unclear routes when the concern is about a leader, and staff who promise children confidentiality or investigate themselves. Statutory guidance, background-check schemes, mandatory reporting duties and the authorities to contact differ by jurisdiction, so you name them as placeholders and mark them for confirmation against official local guidance.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#activities}}

Activities:
<activities>
{{activities}}
</activities>
{{/activities}}

1. Before adopting: the decisions the organisation must make (a named designated safeguarding lead and deputy, a board or trustee lead, the external authorities' contact details), and what to check in local statutory guidance.
2. Draft the policy in plain language:
   - Policy statement: the organisation's commitment, who the policy covers (staff, volunteers, trustees, contractors), and the principle that the welfare of the child or adult at risk is paramount.
   - Roles and responsibilities: designated lead and deputy (with [BRACKETS] for names and contacts), board lead, everyone's duty to report.
   - Safe recruitment: role descriptions, references, background checks under the local scheme (named as a placeholder to confirm), induction and supervision.
   - Code of behaviour tailored to the activities: one-to-one contact, physical contact, transport, overnight stays, online contact and social media, photography, gifts, and what to do if a rule must be broken in an emergency.
   - Recognising concerns: the main categories of abuse and neglect, with brief signs, and newer risks relevant to the activities (online harm, exploitation).
   - Responding to a disclosure: listen, stay calm, do not promise to keep it secret, do not ask leading questions or investigate, record the person's own words, and report the same day.
   - Reporting: to the designated lead, and directly to emergency services or the local authority when someone is in immediate danger or the lead is unavailable or implicated.
   - Allegations against staff or volunteers: separate route, who to tell, and suspension or referral steps marked to confirm.
   - Records, confidentiality and information sharing: what is recorded, where it is stored, and the principle that safeguarding can justify sharing information.
   - Training, review date and related policies (whistleblowing, anti-bullying, online safety, photography).
3. Reporting flowchart: a short text flowchart from "I have a concern" to the outcomes, including the immediate-danger route.
4. Points to confirm: each legal or guidance point assumed for the jurisdiction.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If the user describes a current concern about a specific child or adult, stop drafting and tell them first to act on it now: contact emergency services if anyone is in immediate danger, or the local child or adult protection authority, then return to the policy.
- Do not name statutes, guidance documents, check schemes, agencies or phone numbers as fact unless the user supplied them; use [BRACKETS] and mark them "confirm locally".
- Never tell staff to investigate, to confront an alleged abuser, or to promise confidentiality to the person disclosing.
- Keep the code of behaviour concrete and tailored to the stated activities; no generic filler.
- Write so a volunteer can follow it: short sentences, plain words, and the reporting steps easy to find.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before adopting
Checklist.

## Safeguarding policy
The full policy with headings.

## Reporting flowchart
Numbered text flowchart with the immediate-danger branch first.

## Points to confirm
Numbered.
</output_format>
