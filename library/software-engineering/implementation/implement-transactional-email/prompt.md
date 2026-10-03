---
schema: 1
id: implement-transactional-email
kind: prompt
title: Implement transactional email
description: Implements transactional email with templates, a provider integration, retries, bounce and complaint handling, and deliverability settings. Use when an app must send receipts, resets or alerts.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer, founder]
stack: []
requires: [repo-read, file-write]
inputs: [text, repo]
output: [code, tests, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [transactional-email, deliverability, spf-dkim-dmarc, bounces, outbox]
pairs_with:
  personas: [backend-engineer]
  prompts: [implement-background-job, build-webhook-handler, plan-secrets-management]
args:
  - name: stack
    description: Language, framework, database, job queue if any, and the email provider if already chosen (for example Amazon SES, Postmark, SendGrid, Resend, Mailgun).
    type: text
    required: true
  - name: emails_needed
    description: The emails to send, with trigger, recipient and content, for example "password reset, order receipt, weekly digest".
    type: text
output_contract:
  format: markdown
  sections: [Design, Templates, Code, Bounces and complaints, Deliverability setup, Tests, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Transactional email fails silently: a reset link that lands in spam, a receipt sent twice because a request retried, an email sent for an order whose transaction then rolled back, a provider outage that drops messages, or a bounced address the app keeps mailing until the provider suspends the account. Since 2024, large mailbox providers require SPF, DKIM and a DMARC policy for bulk senders, alignment between the visible From domain and the signing domain, and one-click unsubscribe for marketing mail. Transactional and marketing mail belong on separate streams or subdomains so one cannot damage the other's reputation.
</context>

<task>
Implement transactional email for:
<stack>
{{stack}}
</stack>
{{#emails_needed}}
Emails needed:
<emails_needed>
{{emails_needed}}
</emails_needed>
{{/emails_needed}}

1. If the stack is unclear, ask once and stop. Read existing mail, job and config code if you can.
2. **Design.** Send from a background job, never inside the web request. Enqueue the email in the same database transaction as the business change (an outbox table, or the job system's transactional enqueue) so no email is sent for a rolled-back change and none is lost. Give each message an idempotency key derived from the event (for example `order-receipt:<order_id>`) and skip duplicates. Wrap the provider behind a small interface so tests use a fake and the provider can change.
3. **Templates.** One template per email with HTML and plain-text parts, variables escaped, a clear subject, the sender name, and localisation hooks if the app is multilingual. Keep secrets and long-lived tokens out of URLs except single-use, expiring tokens (password reset, magic link) that are invalidated on use.
4. **Sending and retries.** Use the provider's official SDK or HTTP API. Retry transient failures (timeouts, 429, 5xx) with exponential backoff and jitter up to a limit, then mark the message failed and alert. Do not retry permanent failures (invalid address, suppressed recipient). Log message id, template, recipient hash and status, never the full body of sensitive emails.
5. **Bounces and complaints.** Handle the provider's bounce, complaint and delivery webhooks with signature verification. Hard bounces and complaints add the address to a suppression list checked before sending; soft bounces are retried by the provider. Show a "we could not reach your email" state where it matters (password reset).
6. **Deliverability setup.** List the DNS records to create (SPF include, DKIM keys, DMARC starting at `p=none` with reporting and a plan to move to `quarantine` or `reject`, a custom return-path domain for alignment), a dedicated sending subdomain for transactional mail, and when a marketing stream needs one-click unsubscribe headers.
7. **Tests.** Unit tests with the fake provider for rendering, idempotency and suppression; a test that no email is sent when the transaction rolls back; and a local mail catcher for manual checks.
</task>

<constraints>
- Use the provider's documented API; if unsure of a method, header or webhook field for the version in use, say so rather than guessing.
- Do not invent DNS values, API keys or domains; use placeholders such as `mail.example.com`.
- Never send marketing content through the transactional stream.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Bullets plus a short sequence of the send flow.
## Templates
One template in full as an example, then a table of the others with subject and variables.
## Code
Code blocks with file paths: interface, provider adapter, job, outbox or enqueue.
## Bounces and complaints
Webhook handler code and suppression logic.
## Deliverability setup
A table of DNS records with placeholder values and purpose.
## Tests
Code blocks with file paths, then the real result of running them, or a plain statement that they were not run.
## Open questions
Numbered, or "None".
</output_format>
