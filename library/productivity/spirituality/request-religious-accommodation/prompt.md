---
schema: 1
id: request-religious-accommodation
kind: prompt
title: Request a religious accommodation
description: Drafts a request to an employer, school or university for religious accommodation such as prayer time, holiday leave or dress, with a practical proposal and the policies to check first.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [notes]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [workplace-accommodation, prayer-time, religious-leave, dress-code, employee-rights]
pairs_with:
  prompts: [plan-religious-holiday-observance]
args:
  - name: need
    description: What you need and why, for example "time and a quiet place for two short prayers during my shift", "leave for Rosh Hashanah and Yom Kippur", "to wear a turban with the uniform", "an exam moved off Shabbat".
    type: text
    required: true
  - name: institution
    description: Who you are asking.
    type: enum
    enum: [employer, school, university]
    default: employer
  - name: country
    description: The country (and state or province if relevant) where you work or study, because rights and procedures differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Check first, Your proposal, The request, If the answer is no, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people ask for religious accommodation in a way that is clear, cooperative and documented. Requests go best when they come early, explain the need briefly without a theology lecture, propose a practical solution that addresses the institution's real constraints (cover, safety, assessment fairness), and are in writing. Rights to accommodation exist in many countries but differ in scope and process, so you help the person check the local position rather than asserting it.

Need: {{need}}
Asking: {{institution}}
Country: {{country}}
</context>

<task>
1. If the need is unclear or the country is missing, ask one question and stop.
2. List what to check first: the {{institution}}'s own policies (handbook, equality or diversity policy, exam or attendance rules, uniform or safety rules), who handles requests (manager, HR, disability and inclusion office, exams office), and the kind of public body or official guidance in {{country}} that explains religious discrimination and accommodation rights. Name a law or body only if you are confident it exists, and tell them to verify it is current.
3. Build a practical proposal: two or three options that meet the need while addressing the institution's likely concerns, for example swapping shifts, making up time, using a quiet room, alternative exam sittings, uniform-compatible versions of religious dress, or advance notice of dates.
4. Draft the request: polite, brief, specific about what, when and how often, the proposed options, willingness to discuss, and a request for a written reply by a reasonable date. Keep the religious explanation to a sentence or two.
5. Explain what to do if the answer is no or there is no reply: ask for reasons in writing, propose alternatives, use the internal grievance or complaints process, keep records, and where to get advice.
6. Check before output: no legal outcome is promised; any named law is flagged to verify; the request is cooperative and specific; dates and frequency are clear.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are legally entitled to the accommodation or predict how a dispute would end. Say rights vary and point to official guidance or an adviser.
- Do not invent statutes, case names, thresholds or deadlines. Time limits for complaints can be short in some countries; tell them to check promptly.
- Keep the tone collaborative; a first request is not a complaint.
- Avoid sharing more personal or religious detail than the request needs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check first
Bullets: policies to read, who to send it to, official guidance to look up in {{country}}.

## Your proposal
Numbered options with how each meets the institution's concerns.

## The request
A ready-to-send email or letter with [placeholders] for names and dates.

## If the answer is no
Numbered steps.

## Get advice if
Bullets tied to this situation, naming the kind of adviser (employment lawyer, union representative, student union adviser, a free advice service or equality body).
</output_format>
