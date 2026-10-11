---
schema: 1
id: write-data-protection-policy
kind: prompt
title: Write an internal data protection policy
description: Drafts an internal data protection policy telling staff how to handle personal data - principles in practice, roles, handling rules, sharing, retention, requests, breaches, new projects and training.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-protection, staff-policy, data-handling, personal-data-breach, subject-access-requests, privacy-by-design]
pairs_with:
  prompts: [write-information-security-policy, write-employee-privacy-notice, plan-data-breach-response, write-data-retention-schedule]
args:
  - name: organisation
    description: What the organisation does, staff numbers and roles, whose personal data it handles (customers, patients, pupils, members, staff), any sensitive data, the main systems and tools, remote or office working, and who leads on data protection.
    type: text
    required: true
  - name: jurisdiction
    description: The data protection law that applies, for example UK GDPR, EU GDPR in a named country, or another national law.
    type: string
    required: true
  - name: existing
    description: Any existing policies, data map, retention schedule or breach procedure to link to and stay consistent with. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and scope, Principles in practice, Roles, Handling rules, Sharing and transfers, Retention and disposal, Requests from individuals, Breaches, New projects, Training and compliance, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft an internal policy that tells staff what to do with personal data day to day. It is different from the privacy notice, which tells the public what the organisation does. Regulators expect organisations to have appropriate policies and to show staff follow them. Most internal policies fail because they restate the law's principles in abstract language and never tell staff what to actually do with a customer list on a USB stick, a request from a caller claiming to be a customer's relative, or an email sent to the wrong person. A useful policy turns each principle into concrete rules for the organisation's real tools and situations: what data staff may collect, where it may be stored (approved systems only, not personal email or unapproved apps or AI tools), how to send it securely, clean desk and screen rules, printing and paper disposal, working from home and travelling, verifying identity before disclosing anything, sharing only with approved recipients and under agreements, how long things are kept and how to delete them, recognising and forwarding requests from individuals immediately (the clock usually starts when anyone in the organisation receives them), reporting a suspected breach to the named lead at once because there may be a short deadline to tell the regulator, checking new projects and suppliers early, and training. It should name who is responsible and say that breaches of the policy can lead to disciplinary action.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>
{{#existing}}

Existing documents:
<existing>
{{existing}}
</existing>
{{/existing}}

1. Purpose and scope: who the policy applies to (staff, contractors, volunteers) and what data and systems it covers.
2. Principles in practice: each core data protection principle in one line, followed by what it means for staff here.
3. Roles: senior responsibility, the data protection lead or officer, managers, all staff, with [NAME] placeholders.
4. Handling rules: concrete rules for the organisation's own tools and situations, including approved systems, email and messaging, devices and removable media, remote working, paper, phone and in-person disclosures with identity checks, and use of AI tools with personal data.
5. Sharing and transfers: when sharing is allowed, approval, agreements with suppliers, and transfers abroad.
6. Retention and disposal: link to the retention schedule or set placeholders, and secure deletion and destruction.
7. Requests from individuals: how to recognise one, forward it the same day to [ROLE], and what not to do.
8. Breaches: examples, report immediately to [ROLE], do not try to cover up or investigate alone, and how the lead decides on notifying the regulator and individuals.
9. New projects: when a privacy check or impact assessment is needed and who to ask.
10. Training and compliance: training on joining and periodically, monitoring, consequences, review date and owner.
11. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Write rules staff can follow; avoid quoting the law at length.
- Do not state deadlines or thresholds as fact unless confident; mark "confirm for {{jurisdiction}}".
- Keep consistent with any existing documents provided and flag conflicts.
- Do not include monitoring of staff beyond what is proportionate and disclosed in the employee privacy notice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and scope
Short paragraph.

## Principles in practice
Table: principle | what it means here.

## Roles
Table: role | person | responsibilities.

## Handling rules
Grouped do and do-not lists.

## Sharing and transfers
Bulleted list.

## Retention and disposal
Bulleted list.

## Requests from individuals
Numbered steps.

## Breaches
Numbered steps with examples.

## New projects
Bulleted list.

## Training and compliance
Bulleted list, with review date and owner.

## Points to confirm
Numbered list.
</output_format>
