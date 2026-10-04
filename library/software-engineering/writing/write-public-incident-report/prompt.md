---
schema: 1
id: write-public-incident-report
kind: prompt
title: Write a public incident report
description: Writes a public, customer-facing incident report from the internal postmortem, explaining impact, cause and fixes honestly, without blame, speculation or sensitive internal details.
category: writing
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, engineering-manager]
requires: [none]
inputs: [document, notes]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [incident-report, status-page, customer-communication, transparency, rca]
pairs_with:
  prompts: [write-postmortem, write-incident-update]
args:
  - name: postmortem
    description: The internal postmortem or incident notes, including timeline, customer impact, root cause, contributing factors and action items. Internal details will be filtered out.
    type: text
    required: true
  - name: audience
    description: "customers: an email or help-centre article for affected customers. status-page: a concise final update on the status page. blog: a detailed engineering post for a technical audience."
    type: enum
    enum: [customers, status-page, blog]
    default: customers
output_contract:
  format: markdown
  sections: [Report, Removed or generalised, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A public incident report rebuilds trust only if it is specific and honest. Customers lose trust when a report minimises impact ("some users may have experienced"), hides behind passive voice, blames a vendor or a named employee, promises "this will never happen again", or is so vague that nothing seems to have been learned. It also must not leak what the internal postmortem legitimately contains: employee names, internal hostnames, IP addresses, security weaknesses that are not yet fixed, customer names, or details that legal and security have not cleared.
</context>

<task>
Turn this internal postmortem into a public incident report for the {{audience}} audience.

<postmortem>
{{postmortem}}
</postmortem>

1. Extract the facts customers need: what they experienced, which products, regions or features were affected, start and end times with time zone, duration, and the scale of impact (as precise as the postmortem allows: percentage of requests, number of accounts, data affected or not).
2. Explain the cause in plain language at the right depth for {{audience}}: a sentence or two for status pages, a short paragraph for customers, a technical but non-sensitive explanation for an engineering blog.
3. Say what was done to resolve it and what is changing to prevent a recurrence or reduce impact, drawn from the action items, with honest timing ("by the end of next month", "completed") rather than vague promises. Only include action items that are committed in the postmortem.
4. Take ownership: one plain apology in the company's voice, with no blame on individuals, and no blame shifted to a vendor even if a vendor was involved (state the vendor's role factually only if the postmortem says it is cleared to share).
5. If customers need to do anything (retry failed payments, rotate a key, check data), say exactly what, prominently, at the top.
6. Remove or generalise sensitive details: people's names, internal system names and hostnames, IP addresses, unfixed vulnerabilities, customer names, and anything marked internal. List each removal so the reviewer can check.
7. Before answering, check every number, time and claim against the postmortem, and make sure nothing in the report contradicts it or overstates the fixes.

If the postmortem does not state the customer impact or whether data was lost or exposed, do not guess: write the report with a clearly marked placeholder and put the question under Facts to confirm.
</task>

<constraints>
- No speculation, no "some users may have", no "never again". Use active voice: "We deployed a change that...".
- If any personal data was exposed, say so plainly and note under Facts to confirm that legal or privacy review is required before publishing.
- Length: status-page about 150 to 250 words; customers about 300 to 500; blog as long as the technical story needs.
</constraints>

<output_format>
## Report
The report in Markdown, with a title, a one-paragraph summary up top (including any customer action), then: What happened, Impact, Cause, Resolution, What we are changing, and a closing line with where to get help.

## Removed or generalised
| Internal detail | Treatment |

## Facts to confirm
Questions and placeholders for the reviewer, or "None".
</output_format>
