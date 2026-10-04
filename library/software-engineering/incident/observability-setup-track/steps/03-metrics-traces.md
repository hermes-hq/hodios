# Step 3: Metrics and traces

1. Add the OpenTelemetry SDK (or the approved {{backend}} equivalent) with configuration from environment variables: service name, version, environment, exporter endpoint, sampling ratio. Default to a console or no-op exporter when no endpoint is set so local runs and tests need nothing extra.
2. Enable automatic instrumentation for the framework, HTTP clients, database drivers and queue clients the service uses.
3. Add manual spans around the key business operations, with attributes that help debugging and contain no personal data, and record exceptions on spans.
4. Register the approved metrics: request and operation duration histograms, error counts by bounded error class, saturation gauges, and business counters. Expose them the way the backend expects (a scrape endpoint or OTLP push).
5. Expose liveness and readiness checks if missing: liveness says the process is up; readiness checks the dependencies needed to serve.

Continue to step 4.
