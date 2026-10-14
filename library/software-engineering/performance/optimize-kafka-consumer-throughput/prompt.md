---
schema: 1
id: optimize-kafka-consumer-throughput
kind: prompt
title: Raise Kafka consumer throughput and cut lag
description: Raises Kafka consumer throughput and cuts lag by measuring where time goes, then tuning fetch and poll settings, batching, commits, partition counts and in-partition parallelism without losing order.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, data-engineer, sre]
stack: [kafka]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [consumer-lag, throughput, partitions, batching, message-ordering]
pairs_with:
  prompts: [implement-message-queue-consumer, speed-up-batch-job, tune-connection-pool]
  personas: [performance-engineer]
args:
  - name: consumer
    description: The consumer service, client library (Java client, librdkafka, kafkajs, Sarama, franz-go, Spring Kafka), what each message triggers, and the ordering guarantee the business needs.
    type: text
    required: true
  - name: metrics
    description: Current lag per partition, produce rate, consume rate, partition count, consumer instance count, processing time per message and any rebalance logs.
    type: text
  - name: config
    description: The consumer configuration (fetch, poll, commit and session settings).
    type: text
output_contract:
  format: markdown
  sections: [Bottleneck, Changes, Ordering and delivery, Expected capacity, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Consumer lag grows when the consume rate stays below the produce rate, and the cause is almost always one of three places: fetching (small fetches, long round trips), processing (a slow downstream call or database write per message), or coordination (frequent rebalances, synchronous commits after every message). Parallelism across a group is capped by the partition count: a sixth consumer on a five-partition topic sits idle. Adding partitions to a keyed topic changes which partition a key maps to, which breaks per-key ordering during the change. When processing is the bottleneck, the bigger wins are usually batching the downstream work (one bulk insert per poll instead of one per message) and processing keys in parallel inside a partition, keeping order per key rather than per partition. Long processing between polls exceeds max.poll.interval.ms, the consumer is kicked out, the group rebalances and the same messages are reprocessed, which looks like slowness but is a loop. Committing offsets before the work is done risks loss; committing after makes duplicates possible, so handlers must be idempotent.
</context>

<task>
Consumer: {{consumer}}
{{#metrics}}
Metrics:
{{metrics}}
{{/metrics}}
{{#config}}
Configuration:
{{config}}
{{/config}}

1. Read the consumer code and configuration. Find the poll loop, how messages are processed (one at a time, batched, async), where offsets are committed, and what each message calls downstream.
2. Locate the bottleneck with numbers: compare produce and consume rates, check whether lag is spread across partitions or stuck on a few (a hot key or a stuck message), measure processing time per message against fetch time, and look for rebalance messages in the logs. If metrics are missing, say which ones to collect and how, and mark conclusions as unverified.
3. Fix the actual bottleneck first:
   - Processing: batch downstream writes per poll, reuse connections, and if needed process in parallel keyed by message key so per-key order is kept.
   - Fetching: raise fetch.min.bytes and fetch.max.wait.ms, max.poll.records and max.partition.fetch.bytes to match batch processing.
   - Coordination: move to asynchronous or batched commits after processing, set max.poll.interval.ms above the worst batch time, and use cooperative rebalancing where the client supports it.
4. Only if one consumer per partition is still too slow, propose more partitions and instances, with the ordering impact on keyed data and the migration steps spelled out.
5. Make the code changes in the smallest steps, keep handlers idempotent, run the tests, and measure the consume rate and lag in a test or staging environment before and after.
</task>

<constraints>
- Never trade away the ordering or delivery guarantee the user stated without saying so plainly and getting agreement.
- Do not change partition counts, reset offsets or delete consumer groups yourself; give the commands and wait for confirmation.
- Report measured rates, not expected ones, and label any estimate.
- A lag concentrated on one partition is a skew or poison-message problem; do not answer it with more consumers.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Bottleneck
Fetch, processing or coordination, with the numbers that show it.
## Changes
The diff and configuration changes, one sentence each.
## Ordering and delivery
What ordering and delivery guarantees hold after the change, and what the handlers must tolerate.
## Expected capacity
Messages per second per instance and in total, measured or labelled as estimated.
## Verification
What was run, the rates and lag before and after, and what to watch in production.
</output_format>
