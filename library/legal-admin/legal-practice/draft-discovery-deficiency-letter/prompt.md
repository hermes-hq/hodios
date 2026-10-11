---
schema: 1
id: draft-discovery-deficiency-letter
kind: prompt
title: Draft a discovery deficiency letter
description: Reviews the other side's discovery responses request by request, sorts boilerplate objections and missing documents, and drafts a meet-and-confer letter with specific cures and a deadline.
category: legal-practice
version: 1.0.0
status: incubating
stage: [review, build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [discovery-deficiency, meet-and-confer, boilerplate-objections, motion-to-compel, document-production]
pairs_with:
  prompts: [draft-discovery-requests, draft-privilege-log, index-case-documents]
args:
  - name: requests
    description: Your discovery requests as served, numbered.
    type: text
    required: true
  - name: responses
    description: The other side's written responses and objections, and a description of what was actually produced (volume, date ranges, custodians, format, any privilege log).
    type: text
    required: true
  - name: jurisdiction
    description: The court and the rules that govern discovery and the conferral requirement, with any rule text you want relied on.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Response review, Priorities, Deficiency letter, Record for a motion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many courts (US federal and state courts among them) require parties to confer in good faith before a motion to compel, and judges read the deficiency letter later to decide who was reasonable. Letters that win are specific: they go request by request, quote the response, say exactly what is wrong (a general objection not tied to the request, an objection without saying whether documents are being withheld, "will produce" with no date, a production that skips a custodian or date range, missing privilege log, unusable format), say exactly what would cure it, and propose a reasonable deadline and a call. Letters that lose are angry, global and vague, or demand more than the requests asked for.

Jurisdiction: {{jurisdiction}}

Our requests:
<requests>
{{requests}}
</requests>

Their responses and production:
<responses>
{{responses}}
</responses>
</context>

<task>
1. Response review: go through every request, quote the response, classify the problem (no problem, boilerplate or general objection, unclear whether withholding, incomplete answer, incomplete production, no privilege log, wrong format, evasive), and state the cure you would ask for.
2. Priorities: rank the deficiencies by importance to the case and likelihood a court would order a cure, and note any that are probably not worth pressing.
3. Draft the letter: courteous and firm, a short summary, then each deficiency by request number with the quoted response, the problem, the requested cure, and a reasonable deadline; an offer of specific dates for a call; and a closing that preserves the right to seek relief from the court.
4. Record for a motion: a log of what was asked, when, and what response is needed, so the conferral history is ready if a motion follows.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Ask only for what the requests actually sought; if a request was too narrow to reach something, say so and suggest a new request instead of stretching it.
- Rely only on rule text supplied; otherwise describe obligations generally and mark them to confirm under the jurisdiction's rules.
- No threats, insults or accusations of bad faith; keep it suitable for a judge to read.
- Draft for attorney review and signature. Use [BRACKETS] for names and dates not given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Response review
Table: Request | Response (quoted) | Problem | Cure sought.
## Priorities
Numbered.
## Deficiency letter
The full letter.
## Record for a motion
Table: Date | Step | Status.
</output_format>
