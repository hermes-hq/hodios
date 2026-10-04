# Step 5: Verify the signals

1. Run the service locally with a local collector or the console exporter (a compose service is fine). Exercise the main routes, one failing request, and one background job.
2. Confirm and record, with snippets:
   - Logs are JSON, carry the approved fields, and share one trace id across the request and the job it enqueued.
   - Metrics appear with the expected names, units and labels, and label values stay bounded.
   - Traces connect from the entry point through database and outbound calls, with no broken parent links at queue hops.
   - The redaction test passes, and a search of the captured output finds no emails, tokens or passwords.
   - The service still runs and passes its tests with the exporter endpoint unreachable.
3. Run the project's test suite and linters.

Write the report:

## Signals
What is now logged, measured and traced, per entry point and operation.

## Verification
Each check above with its real result and a short snippet.

## Configuration
Environment variables added, with defaults.

## Dashboards and alerts
Files written and how to load them; proposed alerts awaiting thresholds.

## Follow-ups
Gaps, such as services downstream that do not propagate context, or SLOs to define.
