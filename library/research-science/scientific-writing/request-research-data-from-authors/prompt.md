---
schema: 1
id: request-research-data-from-authors
kind: prompt
title: Request data or code from study authors
description: Writes a concise request to a paper's authors for data, code or missing results, stating purpose, intended use, data protection commitments and credit, with a polite follow-up.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [text, document]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [data-request, data-sharing, open-science, reproducibility, meta-analysis, author-correspondence]
pairs_with:
  prompts: [extract-data-for-meta-analysis, assess-reproducibility, write-data-management-plan]
  personas: [research-librarian]
args:
  - name: paper
    description: The paper's reference (authors, title, journal, year, DOI) and what its data availability statement says.
    type: text
    required: true
  - name: purpose
    description: Exactly what you need (raw data, specific variables, summary statistics by group, analysis code) and why - replication, meta-analysis, secondary analysis, teaching - plus your role, institution and any ethics approval.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you send, Request email, Follow-up email, Data handling commitments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authors are busy, data are often messy or restricted, and many requests go unanswered. Requests that succeed are short, specific about exactly what is needed, easy to fulfil (summary statistics are easier to share than raw individual data), clear about the purpose and how the data will be protected and credited, and respectful of reasons the authors may not be able to share (consent terms, data use agreements, commercial restrictions). For meta-analyses, asking for the specific missing statistics is usually enough and much more likely to succeed. Personal data cannot be shared without a lawful basis and appropriate agreements, and the requester should say how they will meet that.
</context>

<task>
Write a data request for this paper.
<paper>
{{paper}}
</paper>
<purpose>
{{purpose}}
</purpose>

1. Check first: does the data availability statement point to a repository, a data access committee or a formal application? If so, say where to go and that an email may be unnecessary or should only accompany that route.
2. Decide the smallest request that serves the purpose. If summary statistics or a specific table would do, ask for those instead of raw data, and say so to the user.
3. Write the request email: a specific subject line; who the requester is in one sentence; the paper; exactly what is requested in a short list (variables, groups, time points, format); the purpose and intended use; data protection and confidentiality commitments (no attempts at re-identification, secure storage, deletion after use, no sharing with third parties, compliance with the original consent and any data use agreement); how the authors will be credited (citation, acknowledgement, or co-authorship offer only if genuinely appropriate); a reasonable timeframe; and an easy way to decline.
4. Write a short follow-up email for two to three weeks later, and a note on whom to contact next if there is no response (another author, the corresponding author's institution, the journal if its policy requires sharing).
5. List the commitments the requester must be able to honour before sending.
</task>

<constraints>
- Keep the main email under about 200 words; authors should be able to answer in one read.
- Do not threaten, guilt or mention journal policy enforcement in the first email; mention a journal's sharing policy only in the escalation note.
- Do not promise co-authorship, ethics approvals or agreements the requester has not stated; mark them [TO CONFIRM].
- Ask for exactly what the purpose needs and nothing more.
- If the purpose needs identifiable personal data or a way to contact participants, do not draft that request. Explain why consent and data protection rule it out, and suggest alternatives such as de-identified data under a data use agreement or asking the authors to forward a recruitment invitation.
</constraints>

<output_format>
## Before you send
Repository or access route checks and the minimum request recommended.
## Request email
Subject line and body.
## Follow-up email
Subject line and body, then the escalation note.
## Data handling commitments
A checklist the requester must be able to meet.
</output_format>
