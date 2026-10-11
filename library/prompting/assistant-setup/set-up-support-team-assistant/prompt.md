---
schema: 1
id: set-up-support-team-assistant
kind: prompt
title: Set up a shared assistant for a support team
description: Sets up a shared assistant for a customer support team with help-centre knowledge files, tone, refund and escalation rules, reply templates and a check that every answer cites a source.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [support-agent, operations-manager, manager]
requires: [none]
inputs: [document, text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [help-centre, refund-policy, escalation-rules, reply-templates, customer-data]
pairs_with:
  prompts: [prepare-knowledge-files, roll-out-team-assistant, build-project-instructions]
  personas: [support-team-lead]
args:
  - name: support
    description: What the company sells, channels (email, chat, phone), common ticket types, where the help-centre content and internal policies live, and the team's size.
    type: text
    required: true
  - name: policies
    description: Refund, replacement and compensation rules with limits per role, escalation paths, and things agents must never say or promise.
    type: text
    required: true
  - name: tone
    description: "Optional: the brand's support tone, with two or three good past replies."
    type: text
output_contract:
  format: markdown
  sections: [Knowledge files, Assistant instructions, Policy and escalation table, Reply templates, Customer data, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A support team's shared assistant can cut handling time by drafting replies, summarising long threads and finding the right article. Its failure modes cost money and trust: it invents a refund the policy does not allow, quotes an outdated help article, promises a callback no one will make, apologises with an admission of liability, or answers a legal threat or safety complaint that should have gone to a lead. The fix is to make the help centre and policy documents the only sources, require the assistant to cite which article it used, encode authority limits per role, list the cases that must escalate, and keep the team's tone in a few concrete traits. Support tickets are full of personal data, so the setup also says what may be pasted and which tool is approved.

<support>
{{support}}
</support>
<policies>
{{policies}}
</policies>
{{#tone}}
<tone>
{{tone}}
</tone>
{{/tone}}
</context>

<task>
1. Plan knowledge files: which help-centre and policy documents to load, how to split them by topic, a "last reviewed" date on each, and who owns updates.
2. Write assistant instructions, ready to paste, that:
   - answer only from the knowledge files and cite the article or policy name used; if nothing covers it, say so and suggest escalating rather than guessing;
   - never offer refunds, credits or compensation beyond the agent's limit; draft the request to a lead instead;
   - never promise dates, callbacks or fixes the agent cannot guarantee;
   - acknowledge the problem without admitting legal liability;
   - mark escalation cases at the top of the draft (legal threats, safety or injury, data breaches, press or regulator mentions, vulnerable customers, abuse);
   - match the tone traits, keep replies short, and end with a clear next step;
   - treat every reply as a draft the agent checks and sends.
3. Write a policy and escalation table: situation, what an agent may do, limit, who to escalate to. Use only the policies given; mark gaps [CONFIRM].
4. Write reply templates for the three to five most common ticket types, with placeholders for customer details.
5. Write customer data rules: paste the minimum, remove payment and ID details, use the approved tool, and do not paste attachments with other people's data.
6. Give five tests, including a refund above the limit, a question the help centre does not cover and a customer mentioning a lawyer.
</task>

<constraints>
- Do not invent policies, limits, SLAs or product facts; mark gaps [CONFIRM].
- Do not give the customer legal or regulatory statements; escalate.
- Keep the instructions under about 2,500 characters; detail lives in the knowledge files.
</constraints>

<output_format>
## Knowledge files
Bullets.
## Assistant instructions
One fenced block, ready to paste.
## Policy and escalation table
Table: Situation | Agent may | Limit | Escalate to.
## Reply templates
One fenced block per ticket type.
## Customer data
Bullets.
## Tests
Five bullets: prompt and pass condition.
</output_format>
