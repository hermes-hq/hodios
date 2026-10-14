---
schema: 1
id: explain-data-flows-to-legal
kind: prompt
title: Explain a system's data flows to legal or privacy
description: Answers a legal or privacy team's questions about a system as an engineer - what personal data it collects, where it flows, which vendors process it, where it is stored and for how long.
category: writing
version: 1.0.0
status: incubating
stage: [design]
role: [software-engineer, backend-engineer, architect]
requires: [repo-read]
inputs: [repo, config, schema, message]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [personal-data, data-inventory, privacy-review, subprocessors, data-retention]
pairs_with:
  prompts: [audit-data-protection-compliance]
  personas: [data-privacy-engineer]
args:
  - name: questions
    description: The questions legal or privacy sent, or the questionnaire (for example a DPIA or vendor review).
    type: text
    required: true
  - name: system
    description: The system to describe - repo or service names to read, schema, config, vendor list, architecture notes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings to flag, Data inventory, Data flows, Answers to your questions, Not verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Privacy and legal teams depend on engineers for facts, and the failures are usually in the facts: a field list that misses logs, analytics events and backups; "we don't store card numbers" when the payment provider's tokens, IP addresses and device ids are still personal data; retention described as policy when the code keeps data forever; a vendor left off because it was added by another team as an SDK. Engineers also drift into legal conclusions ("this is GDPR compliant") that are not theirs to make. A good answer is a factual inventory that legal can reason from, with every uncertainty flagged.
</context>

<task>
Answer the legal or privacy team's questions about this system.

<questions>
{{questions}}
</questions>

<system>
{{system}}
</system>

1. If you can read the code, schema or config, read them first: data models, request handlers, logging, analytics and error tracking calls, third-party SDKs and clients, background jobs, backups and retention jobs.
2. Build a data inventory: each category of personal data, its source, purpose as used in the code, where stored, who and what can access it, which vendors receive it, region where known, and retention as implemented.
3. Include the places teams forget: logs, metrics labels, analytics events, error reports, caches, search indexes, backups, data warehouse copies, support tools and test environments.
4. Describe the main flows in order (collection, processing, sharing, deletion) and include a simple text diagram if helpful.
5. Answer each question directly, citing where in the system the answer comes from.
6. List what you could not verify and who would know.
</task>

<constraints>
- State facts about the system, not legal conclusions; do not say the system is or is not compliant with any law.
- Mark every item as "verified in code/config", "from documentation" or "assumed".
- Do not include actual personal data, secrets or credentials in the answer, even if found while reading.
- If you find personal data going somewhere it plausibly should not (for example passwords or full card numbers in logs), report it at the top as a finding.
</constraints>

<output_format>
## Findings to flag
Anything urgent, or "None".

## Data inventory
Table: data category, source, purpose, storage, access, vendors, retention, confidence.

## Data flows
## Answers to your questions
## Not verified
</output_format>
