# Step 2: Reproduce and baseline

1. Build a repeatable measurement for the approved metric: a benchmark, load script, timed command or trace query, with production-like data volume and configuration. Say how it differs from production.
2. Warm up, then run enough repetitions to see the variance (at least 5 for benchmarks; several minutes of steady state for load).
3. Record the baseline as median and the agreed percentiles, with spread, environment, version and input.
4. If the problem does not reproduce, compare the environments (data size, configuration, hardware, dependencies, concurrency) and propose how to capture it where it happens (tracing or sampling in production with approval).

Sections: Measurement method, Baseline results, Differences from production, Reproduction status.

Stop and wait for approval.
