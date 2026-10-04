# Step 1: Survey and plan

1. Find what exists: logging library and format, any metrics or tracing libraries, request id handling, health endpoints, existing dashboards or alert files, and how config and secrets reach the service.
2. List the entry points (HTTP routes, RPC handlers, queue consumers, scheduled jobs, CLI commands) and the outbound calls (databases, caches, HTTP clients, queues, third-party APIs).
3. Name the key business operations from the code and docs (for example "order placed", "payment captured", "export completed") and what success and failure mean for each.
4. Propose the plan:
   - Log schema: the fields every line carries (timestamp, level, service, environment, version, trace and span id, request or job id, operation, outcome, duration) and the levels policy.
   - Metrics: request rate, errors and duration per route or operation (histograms with explicit buckets around the latency that matters); saturation for pools, queues and workers; the business metrics; each with name, unit, type and its bounded labels, plus a cardinality estimate.
   - Traces: automatic instrumentation for the framework and clients in use, manual spans around key operations, propagation across queues and background jobs, sampling choice.
   - Data protection: fields that must be redacted or dropped.

Write the artifact: Current state, Entry points and dependencies, Business operations, Log schema, Metrics (Name | Type | Unit | Labels | Cardinality | Question it answers), Traces, Redaction list, Sampling. Stop and wait for approval.
