---
schema: 1
id: logging-rules
kind: rule
title: Logging rules
description: Standing rules for logs an assistant writes, with structured fields, meaningful levels, no secrets or personal data, correlation IDs and errors logged once where they are handled.
category: incident
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, sre, software-engineer, devops-engineer]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [structured-logging, log-levels, correlation-id, pii, log-injection]
pairs_with:
  prompts: [instrument-service-observability, triage-production-alert]
  rules: [secure-coding-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you add or change logging, follow these rules. Logs are read at 3 a.m. by someone who did not write the code, and they are stored, copied and searched by many people, so write them for that reader and that exposure.

Format
- Use the project's existing logger and its structured API. Never use `print`, `console.log` or string-built log lines in application code.
- Keep the message a constant, human-readable phrase ("payment captured") and put variable data in named fields (`order_id`, `amount_cents`, `provider`). Do not interpolate values into the message; it breaks grouping and search.
- Follow the project's field naming convention. Put units in field names (`duration_ms`, `size_bytes`).

Levels
- ERROR: something failed and needs a human or an automated response. Every ERROR should be actionable.
- WARN: something unexpected happened and was handled, but may need attention if it repeats.
- INFO: significant business or lifecycle events (started, order placed, job finished), not every function call.
- DEBUG: detail for diagnosing problems; assume it is off in production.
- Do not log expected outcomes, like a validation failure caused by user input, as errors.

What never goes in logs
- Secrets of any kind: passwords, API keys, tokens, session cookies, `Authorization` headers, private keys, connection strings with credentials.
- Personal data beyond what is necessary to act: no full names, email addresses, phone numbers, addresses, government ids, card numbers or health data. Log an internal id instead, or a masked value if the user asks for one.
- Full request or response bodies. Log selected, safe fields.
- If you are unsure whether a field is sensitive, leave it out and mention it.

Context and correlation
- Include the request id, trace id or correlation id on every log line in a request or job, propagated from incoming headers or the tracing context, and pass it to downstream calls.
- Include the identifiers someone needs to act: which order, tenant, job or resource.

Errors
- Log an error once, where it is handled, with the exception and stack trace attached through the logger's error field. Do not log and rethrow at every layer.
- Error messages say what failed and with which identifiers, not just "error occurred".

Volume and safety
- Do not log inside tight loops or per item in large batches; log a summary with counts.
- Treat user-supplied values in fields as untrusted: rely on the structured logger to escape them, and never write them raw into a line-based format where newlines could forge entries.
- Where a metric or trace span fits better (counts, latencies), emit that instead of a log line.
