---
schema: 1
id: customer-complaint-track
kind: workflow
title: Resolve a customer complaint
description: Takes one serious customer complaint through gated steps - intake and facts, remedy decision, reply and agreed next steps, fixing the cause, and follow-up with the lesson logged.
category: customer-support
version: 1.0.0
status: incubating
stage: [discover, plan, build, maintain, review]
role: [founder, operations-manager, manager, support-agent]
requires: [none]
inputs: [message, notes, text]
output: [report, message, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [complaint-handling, service-recovery, root-cause, follow-up, lessons-learned]
pairs_with:
  prompts: [log-customer-complaint-fields, decide-goodwill-refund, critique-draft-support-reply, build-service-recovery-playbook]
  personas: [support-team-lead, guest-relations-manager]
  rules: [support-commitment-rules]
args:
  - name: complaint
    description: The complaint as received - message, call notes or review - with any replies already sent and any deadline the customer set.
    type: text
    required: true
  - name: business_context
    description: Optional. Your business, the product or service involved, what your records show, your refund or compensation policy, and who can approve what.
    type: text
steps:
  - {id: intake, file: steps/01-intake.md, stage: discover, gate: approve, artifact: "complaint/01-intake.md"}
  - {id: remedy, file: steps/02-decide-remedy.md, stage: plan, gate: approve, artifact: "complaint/02-remedy.md"}
  - {id: reply, file: steps/03-reply.md, stage: build, gate: approve, artifact: "complaint/03-reply.md"}
  - {id: fix, file: steps/04-fix-cause.md, stage: maintain, gate: approve, artifact: "complaint/04-fix.md"}
  - {id: close, file: steps/05-follow-up.md, stage: review, gate: none, artifact: "complaint/05-close.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Handles one serious complaint the way a careful owner or manager would: get the facts straight before deciding, choose a remedy that is fair and consistent, reply once and well, fix what caused it, and close the loop with the customer and the team. Use it for complaints that involve money, repeated failure, a public post, a vulnerable customer or a threat to escalate, not for routine questions. Each step writes one artifact and stops for approval.

<complaint>
{{complaint}}
</complaint>

{{#business_context}}
<business_context>
{{business_context}}
</business_context>
{{/business_context}}

Rules for every step:
- Use only facts from the complaint, the business context and what the user confirms. Ask for missing essentials (dates, order or booking reference, what records show, policy, approval limits) and mark gaps as [X].
- Never promise refunds, compensation, dates or outcomes beyond the stated policy or an approval the user confirms.
- Do not blame the customer, a colleague or a supplier by name in anything the customer will see.
- If the complaint involves injury, illness, safety, discrimination, a data breach or a legal threat, say so at once, keep replies factual without admitting liability, and say who to involve (insurer, the relevant authority, a lawyer). Do not predict legal outcomes.
- If the customer mentions being in danger or at risk of harm, put their safety first and point them to local emergency services.
- End each artifact with open questions.
