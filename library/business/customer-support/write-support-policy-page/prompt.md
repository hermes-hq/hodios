---
schema: 1
id: write-support-policy-page
kind: prompt
title: Write a public support policy page
description: Writes the public page explaining how a product's support works - channels, hours, response targets by priority, what is in and out of scope, and how to escalate.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, support-agent, product-manager]
requires: [none]
subject: [saas]
inputs: [notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [support-scope, response-targets, priority-levels, support-hours, expectation-setting]
pairs_with:
  prompts: [design-escalation-process, write-ticket-auto-acknowledgement, design-help-center-structure, plan-out-of-hours-support]
  rules: [support-commitment-rules]
args:
  - name: product
    description: The product, customers and plans, and who the page is for (end users, admins, developers).
    type: text
    required: true
  - name: how_support_works
    description: Channels per plan, hours and time zones, holidays, current realistic response times, priority definitions if any, languages, and how escalation works today.
    type: text
    required: true
  - name: scope
    description: What support helps with and what it does not (custom code, third-party tools, training, data recovery, consulting), and anything offered as paid services. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Page, Notes for the owner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write public support policy pages for software and online products. Without one, every customer assumes support covers everything, instantly, on every channel, and agents spend time saying no to requests the business never meant to cover. A good page sets expectations customers can plan around: which channel to use for what, hours with time zones, first-response targets by priority (not resolution promises, which nobody controls), plain definitions of priority with examples, what support does not cover and where to go instead, what information speeds things up, and how to escalate when something is going wrong. The numbers must be ones the team actually hits on a bad week, because a public target that is regularly missed generates more complaints than a modest one that is kept.
</context>

<task>
<product>
{{product}}
</product>

<how_support_works>
{{how_support_works}}
</how_support_works>

{{#scope}}
<scope>
{{scope}}
</scope>
{{/scope}}

1. Write the page with these parts, in this order, using headings customers scan:
   - how to get help: channels and which to use for what, by plan if it differs;
   - hours, time zones and holidays;
   - priority levels with plain definitions and one or two examples each (for example "Urgent: the product is down or you cannot take payments");
   - first-response targets by priority and plan, as a table, stating they are targets for a first human response;
   - what we help with, and what we do not, with where to go instead;
   - how to get a faster answer: details to include;
   - escalation: what to do if a ticket is not progressing or the issue is critical;
   - security issues and status page placeholders, if applicable.
2. Keep the language plain and second person ("you"), with no legal tone. Use placeholders for links.
3. In Notes for the owner, flag any target that looks optimistic given the hours described, any gap (no route for urgent issues out of hours, unclear priority for billing), and whether contractual SLAs for some customers should be kept separate from this page.
</task>

<constraints>
- Use only the times and rules given; do not invent stricter targets, channels or 24/7 cover.
- Do not describe response targets as guarantees or attach credits unless the user says they exist.
- Keep the page under about 600 words.
</constraints>

<output_format>
## Page
The full page in markdown with its own subheadings.

## Notes for the owner
Bullets: risks, gaps and decisions needed.
</output_format>
