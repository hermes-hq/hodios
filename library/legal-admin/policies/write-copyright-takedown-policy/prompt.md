---
schema: 1
id: write-copyright-takedown-policy
kind: prompt
title: Write a copyright takedown policy
description: Drafts a copyright and notice-and-takedown policy for a platform hosting user uploads - how rights holders send notices, counter-notices, repeat infringers and the internal handling steps.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, operations-manager, legal-professional]
subject: [law]
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
tags: [notice-and-takedown, counter-notice, repeat-infringer, user-uploads, safe-harbour]
pairs_with:
  prompts: [respond-to-copyright-claim, request-content-takedown, write-acceptable-use-policy]
args:
  - name: platform
    description: What users upload (images, video, music, code, documents, listings), volume, whether content is public or private, any existing takedown process, and who handles notices.
    type: text
    required: true
  - name: jurisdictions
    description: Where the company is based and where users and rights holders are, for example "US company, global users".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Regime overview, Policy, Internal handling steps, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Platforms that host user content usually rely on a liability shield that depends on how they handle notices. In the US, DMCA section 512 safe harbour expects a designated agent registered with the Copyright Office, a process for notices with specific elements, expeditious removal, a counter-notice process with a waiting period before restoring content, and a policy for terminating repeat infringers in appropriate circumstances. In the EU, hosting liability rules and the Digital Services Act set notice-and-action duties, statements of reasons and complaint handling, and large content-sharing platforms have extra duties under the copyright directive as implemented nationally. Common failures: no designated contact, accepting incomplete notices or ignoring valid ones, restoring content too early or never, no repeat-infringer policy, and no protection against abusive or fraudulent notices.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Platform:
<platform>
{{platform}}
</platform>

1. Regime overview: which notice regimes likely apply given the jurisdictions and platform type, what each expects in outline, and anything that suggests extra duties (large scale, music or video sharing), each marked to confirm.
2. Policy in plain language:
   - Respect for copyright and that users must own or have rights to what they upload.
   - How to send a notice: the information required (identification of the work, the location of the material, contact details, good-faith statement, accuracy statement, signature), to the designated contact [BRACKETS].
   - What the platform does on receiving a valid notice, and what it does with incomplete ones.
   - Notifying the uploader and the reasons given.
   - Counter-notices: who can send one, what it must contain, and when content may be restored, with waiting periods marked to confirm.
   - Repeat infringers: how strikes work and when accounts end.
   - Abusive or false notices, and that misrepresentation can create liability.
   - Other IP (trademarks) and where to report it.
3. Internal handling steps: intake, completeness check, removal or disabling, user notice, counter-notice handling, restoration, strike recording, logs and reporting.
4. Points to confirm: agent registration, statutory elements, timelines and any transparency reporting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory elements, waiting periods or registration duties as exact legal requirements unless supplied; describe them and mark "confirm for [jurisdiction]".
- Do not design a process that removes content on any complaint without checking completeness, or that never restores content after a valid counter-notice.
- Do not invent agent names, addresses or registration numbers; use [BRACKETS].
- Advise legal review before relying on any safe harbour.
{{> output/uncertainty}}
</constraints>

<output_format>
## Regime overview
Table: regime | applies? | key expectations (confirm).

## Policy
The full policy with headings.

## Internal handling steps
Numbered.

## Points to confirm
Numbered.
</output_format>
