---
schema: 1
id: test-email-flows
kind: prompt
title: Test transactional email flows
description: Tests transactional emails such as sign-up confirmation and password reset by capturing messages in a local inbox, asserting content and links, and following the links in end-to-end tests.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [fullstack-engineer, backend-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [transactional-email, password-reset, email-capture, magic-links, e2e]
pairs_with:
  prompts: [implement-transactional-email, write-e2e-test, write-api-endpoint-tests]
  personas: [test-engineer]
args:
  - name: flows
    description: The email flows to test (sign-up verification, password reset, magic link login, invitations, receipts), with the paths to the sending code and templates.
    type: text
    required: true
  - name: stack_details
    description: The framework, mail library and test tools, for example "Django with pytest and Playwright" or "Rails with RSpec and Capybara".
    type: string
output_contract:
  format: markdown
  sections: [Flows to test, Capture setup, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who knows that emails are often the least tested part of an app and the most visible when broken: a reset link that points to localhost, a token that never expires or works twice, a template variable rendered as blank, a plain-text part missing, the wrong recipient, or an email sent twice on retry.

Test at two levels. In-process: most frameworks capture outgoing mail in tests (Django `mail.outbox`, Rails `ActionMailer::Base.deliveries`, Laravel `Mail::fake`, Spring with GreenMail, Phoenix `Swoosh.TestAssertions`), which is fast and checks recipients, subject, both HTML and text bodies and headers. End-to-end: the app sends real SMTP to a local catcher such as Mailpit or MailHog running in a container, and the browser test reads the message through the catcher's API, extracts the link and follows it, proving the whole flow including absolute URLs. Security behaviour belongs in these tests: reset and magic-link tokens are single-use, expire, and the request endpoint does not reveal whether an account exists.
</context>

<task>
Write tests for these email flows{{#stack_details}} using {{stack_details}}{{/stack_details}}:

{{flows}}

1. Read the sending code, templates and token handling. For each flow, list the trigger, recipient, required content (name, link, code, amounts), token lifetime and single-use rule.
2. Set up capture: the framework's in-memory or test backend for in-process tests, and a local mail catcher container for end-to-end tests with SMTP settings pointed at it only in the test environment.
3. In-process tests: the right recipient and subject; both HTML and plain-text parts render with real values and no empty placeholders; links are absolute and use the configured public base URL; nothing is sent on validation failure; exactly one email is sent per action including on retries.
4. End-to-end tests for the critical flows: trigger the email, fetch it from the catcher API (polling with a timeout), extract the link, follow it in the browser and complete the flow. Then check the link fails on second use and after expiry (use a controlled clock, not waiting), and that requesting a reset for an unknown address returns the same response as for a known one.
5. Clear the catcher between tests, run the tests and report results.
</task>

<constraints>
- Tests must never send to real inboxes or a real email provider; point SMTP or the API client at the test backend or local catcher.
- Use reserved example domains such as example.com for test addresses.
- No fixed sleeps while waiting for mail; poll with a timeout.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Flows to test
Table: flow, trigger, recipient, required content, token rules.
## Capture setup
Test mail backend and catcher configuration.
## Tests
In-process tests, then end-to-end tests.
## Check
Commands run and results.
## Gaps
What is not covered, such as rendering in real mail clients or deliverability.
</output_format>
