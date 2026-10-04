# Step 2: Structured logging and correlation

1. Configure the existing logger (or the standard structured logger for {{stack}} if there is none) to emit one JSON object per line to stdout with the approved fields.
2. Add or reuse middleware that accepts an incoming W3C `traceparent` (and an existing request id header if the platform uses one), creates one when missing, puts it in the logging context, and returns the request id in the response.
3. Carry the context into background jobs and queue messages so a job's logs link to the request that enqueued it.
4. Add the redaction filter from the plan at the logger level and a test that proves a sample secret and email are removed.
5. Replace prints and string-built log lines on the main paths with structured calls carrying fields, not interpolated text. Log each request or job once at completion with outcome and duration, and errors once with the stack trace where they are handled.

Continue to step 3.
