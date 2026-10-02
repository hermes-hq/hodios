---
schema: 1
id: write-status-report
kind: prompt
title: Write a project status report
description: Writes a project status report with an evidence-based RAG status, progress, risks, decisions needed and next steps, formatted as an email, a document or a single slide.
category: business-writing
version: 1.1.0
status: experimental
stage: [operate]
role: [project-manager, product-manager, manager, operations-manager]
requires: [none]
inputs: [notes, text]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rag-status, project-update, stakeholder-communication]
pairs_with:
  prompts: [write-executive-summary, write-internal-announcement]
args:
  - name: updates
    description: Raw notes for this period, such as what got done, what slipped, blockers, dates, budget figures and anything you need from others. Bullet fragments are fine.
    type: text
    required: true
  - name: audience
    description: Who reads it, for example "steering committee" or "my team and partner teams".
    type: string
    default: project stakeholders
  - name: format
    description: Email for a weekly update, doc for a fuller written report, slide for one slide in a review deck.
    type: enum
    enum: [email, doc, slide]
    default: email
output_contract:
  format: markdown
  sections: [Status report, Status rationale, Missing information]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.1.0, note: "Spelled out the section order for each format and the placeholder for a missing project name or period."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A status report exists so that people outside the work can spot trouble early and make the decisions only they can make. The classic failure is the "watermelon" report: green on the outside, red inside, because the author reports activity instead of progress against the plan, or softens bad news. Readers want the status and the reason in one line, then what needs their attention.

RAG definitions to apply:
- **Green:** on track for the committed scope, date and budget; no help needed.
- **Amber:** at risk; the team has a credible recovery plan within its own control, or a decision is needed soon to stay on track.
- **Red:** will miss scope, date or budget without intervention, a decision or extra resources from outside the team.
</context>

<task>
Write a {{format}} status report for {{audience}} from these updates:
<updates>
{{updates}}
</updates>

1. If the updates contain no information about progress against a goal or date, ask what the milestones and dates are and stop.
2. Set the overall RAG status from the evidence using the definitions above, not from the tone of the notes. If the notes imply green but contain a slipped milestone, an unresolved blocker past its date or a budget overrun, rate it accordingly and explain why in Status rationale.
3. Separate progress (outcomes delivered against plan) from activity (meetings held, work started). Report progress.
4. List risks and issues with impact, owner and the next action with its date. An issue is happening now; a risk might happen.
5. Pull out every decision or help needed from the readers, with who must decide and by when. If none, say "None this period".
6. List next steps for the coming period with owners.
7. Render for the format:
   - email: a subject line in the form "[Project] status: <RAG> – <period>", then in this order: one line with the status and the reason; Decisions needed; Progress (three to five bullets); Risks and issues; Next steps. A reader should absorb it in 60 seconds.
   - doc: short headings in this order: Summary (status, reason, and the change since last period) · Decisions needed · Milestones (table: Milestone | Planned date | Forecast date | Status) · Progress · Risks and issues (table: Item | Risk or issue | Impact | Owner | Next action and date) · Next steps.
   - slide: an assertion-style title that states the status and the reason (for example "Amber: content migration is 30 points behind; decision needed by Friday"), then at most six bullets, decisions first.
   If the project name or reporting period is missing, use `[need: project name]` or `[need: period]` rather than guessing.
</task>

<constraints>
- Use only facts from the updates. Missing owners, dates or figures become `[need: …]`; never invent them.
- Lead with status and decisions; no "Hope everyone had a great week".
- Name problems plainly and without blame: describe what happened and its impact, not who failed.
- Keep it short: under 250 words for email and slide, under 500 for doc.
</constraints>

<output_format>
## Status report
The report in the chosen format.
## Status rationale
Two or three sentences: why this RAG status, citing the evidence, and whether it differs from what the notes implied.
## Missing information
Bullets: each `[need: …]` placeholder. "None" if complete.
</output_format>
