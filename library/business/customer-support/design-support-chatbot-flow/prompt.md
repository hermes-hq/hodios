---
schema: 1
id: design-support-chatbot-flow
kind: prompt
title: Design a support chatbot flow
description: Designs a support chatbot or AI agent flow - intents, answers grounded in help content, escalation triggers, human handover and quality checks. Use when adding automation to a support team.
category: customer-support
version: 1.0.0
status: incubating
stage: [design]
role: [support-agent, manager, product-manager, operations-manager]
inputs: [text, document]
output: [docs, table, prompt]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chatbot, conversation-design, ai-agent, human-handover, deflection, grounding]
pairs_with:
  prompts: [write-help-center-article, design-escalation-process, analyze-support-tickets]
args:
  - name: top_contact_reasons
    description: Your most common contact reasons with rough volumes, and examples of real customer messages for each.
    type: text
    required: true
  - name: help_content
    description: Your help-centre articles, macros or policies, or a list of what exists. The bot may only answer from this content. Leave empty to get a list of what to write first.
    type: text
  - name: constraints
    description: Limits and rules - channels, languages, hours when humans are available, actions the bot may take (look up orders, issue refunds), regulated topics, brand tone.
    type: text
output_contract:
  format: markdown
  sections: [Automation scope, Intent map, Grounded answers, Escalation triggers, Handover design, Bot instructions, Quality checks, Launch plan, Content gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design support automation that customers do not hate. A support bot earns its place by resolving simple, frequent questions accurately and by handing everything else to a human quickly, with the context attached. Bots fail when they answer from guesswork instead of approved content, trap customers in loops with no way to reach a person, take actions without the right checks, or are measured on deflection rather than on resolution and satisfaction.
</context>

<task>
Design the bot flow.

<top_contact_reasons>
{{top_contact_reasons}}
</top_contact_reasons>
{{#help_content}}
<help_content>
{{help_content}}
</help_content>
{{/help_content}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Automation scope: classify each contact reason as automate fully (informational, low risk, answered by existing content), automate with an action (needs a lookup or a transaction with verification), assist then hand over, or route straight to a human (complaints, vulnerable customers, legal or safety, complex billing disputes, anything regulated). Give the reason for each.
2. Intent map: for each in-scope intent, example customer phrasings (including messy ones), the information the bot must collect, and the clarifying question if the intent is ambiguous.
3. Grounded answers: for each automated intent, the answer drafted only from the help content given, with the source article named. If no content covers it, do not write an answer; list it under Content gaps.
4. Escalation triggers: explicit rules for handing over, such as the customer asks for a human, two failed attempts or a repeated question, negative sentiment or frustration, keywords for cancellations, complaints, legal threats, safety or distress, high-value or VIP accounts, low confidence, or any request outside scope.
5. Handover design: what the bot tells the customer (who will reply and when, based on human availability), the summary passed to the agent (intent, details collected, what was tried, customer sentiment), and the out-of-hours path.
6. Bot instructions: a system prompt for the bot, written for a language-model-based assistant, that sets the role and tone, restricts answers to the provided knowledge, requires saying "I don't know" and offering a human when the content does not cover a question, forbids inventing policies, prices or promises, defines allowed actions and their verification steps, and includes the escalation triggers.
7. Quality checks: a test set of 15-20 messages covering each intent, edge cases and adversarial inputs (prompt-injection attempts, requests for other customers' data, angry customers), with the expected behaviour; and live metrics: resolution rate confirmed by the customer, escalation rate, satisfaction on bot conversations, wrong-answer rate from weekly transcript review, and time to human after a handover request.
8. Launch plan: start with the top two or three intents, shadow or limited rollout, weekly transcript review, and criteria to expand.
</task>

<constraints>
- Answers must be grounded in the help content given. Never invent policies, prices, timelines or features.
- A customer must always be able to reach a human (or leave a message when no one is available) within two turns of asking.
- Actions that change accounts, money or personal data require verification and are listed with the checks needed.
- Regulated or sensitive topics (health, financial hardship, legal claims, safety) go to humans by default.
- If the constraints mention a specific platform, describe the design generically and mark platform-specific settings as "check in your tool".
</constraints>

<output_format>
## Automation scope
Table: Contact reason | Volume | Decision | Reason.
## Intent map
Table: Intent | Example phrasings | Info to collect | Clarifying question.
## Grounded answers
Per intent: answer text and source.
## Escalation triggers
## Handover design
## Bot instructions
A copyable system prompt in a code block.
## Quality checks
Test-set table: Message | Expected behaviour. Then live metrics.
## Launch plan
## Content gaps
</output_format>
