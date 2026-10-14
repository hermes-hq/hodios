---
schema: 1
id: spec-content-reporting-and-moderation
kind: prompt
title: Specify content reporting and moderation tools
description: Specifies how users report content or accounts and how moderators review them, with reasons, queues and priority, enforcement actions, notices, appeals, repeat-offender rules and audit.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer, support-agent]
stack: []
requires: [none]
inputs: [spec, document, notes]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trust-and-safety, user-reports, enforcement, requirements]
pairs_with:
  prompts: [apply-moderation-policy-to-comments, moderate-user-content, spec-support-admin-tools]
args:
  - name: product_context
    description: What users post or do (comments, listings, profiles, messages, uploads), the audience, and volume.
    type: text
    required: true
  - name: policy
    description: The community guidelines or content policy, team size, countries served, and known abuse patterns.
    type: text
output_contract:
  format: markdown
  sections: [Reporting flow, Report reasons and routing, Moderator queue, Actions and enforcement, Notices and appeals, Audit and metrics, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Products that let people post things need a way to deal with what gets posted, and the system matters as much as the policy. Without a spec, teams build a "report" button that sends an email to a shared inbox. Then: the same post is reported 300 times and floods the queue; urgent reports (threats, self-harm, child exploitation) wait behind spam; moderators see no context and decide inconsistently; a removed post gets no explanation and the user reposts it; there is no appeal; a banned user returns the next day with a new account; and when a regulator, a court or the press asks why something was removed, there is no record. Several jurisdictions now set rules for notices, statements of reasons and appeals on online platforms, so the design also needs a legal check. A good spec covers the reporter's flow, reasons mapped to policy clauses, deduplicated and prioritised queues, a graded set of actions, notices with reasons, appeals reviewed by someone else, repeat-offender rules and a complete audit trail.
</context>

<task>
<product>
{{product_context}}
</product>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Specify the reporting flow: what can be reported (content, accounts, messages), where the report entry point appears, the steps and optional details, confirmation to the reporter, hiding content for the reporter, and protection against report abuse.
2. Define report reasons mapped to policy clauses and route each to a queue with a priority; reasons involving imminent harm or illegal content go to an urgent path with an escalation owner and target response time (as proposals).
3. Specify the moderator queue: grouping duplicate reports into one case, the context shown (content, history, prior actions, reporter count), assignment, second-review for severe actions, moderator wellbeing measures for graphic content (blur by default), and service targets.
4. Specify actions and enforcement: graded actions (no action, label, limit reach, remove, suspend, ban), what each does technically, temporary versus permanent, strike or repeat-offender rules, detection of ban evasion, and preserving removed content for appeals and legal requests for a set period.
5. Specify notices and appeals: what the affected user is told (what, which rule, what action, how to appeal), what the reporter is told, appeal window and reviewer independence, and outcomes.
6. Specify audit and metrics: logged fields for every decision, transparency counts the business may need to publish, and quality checks on moderator decisions.
7. List open questions with a recommended default marked as a proposal, including where legal review is needed for the countries served.
</task>

<constraints>
- Never specify that users are punished automatically on report count alone; reports trigger review, not enforcement.
- Do not write the content policy itself unless asked; use the policy given or mark reasons as placeholders.
- Do not state specific legal obligations as facts; flag that platform and illegal-content rules vary by country and must be checked.
- Content suggesting someone is in immediate danger or child sexual abuse material must have a defined urgent escalation path and must not wait in the normal queue.
</constraints>

<output_format>
## Reporting flow
Numbered steps.
## Report reasons and routing
Table: reason, policy clause, queue, priority, target response (proposal).
## Moderator queue
Bullets.
## Actions and enforcement
Table: action, effect, duration, who can apply, needs second review.
## Notices and appeals
Bullets.
## Audit and metrics
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
