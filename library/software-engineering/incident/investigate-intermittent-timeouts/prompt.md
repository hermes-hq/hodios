---
schema: 1
id: investigate-intermittent-timeouts
kind: prompt
title: Investigate intermittent timeouts between services
description: Finds the cause of intermittent timeouts between services, such as pool exhaustion, retry amplification, DNS, packet loss, idle-connection resets or one bad host.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [timeouts, connection-pool, retries, keep-alive, flaky-network]
pairs_with:
  prompts: [investigate-latency-spike, collect-incident-evidence, add-retries-and-timeouts]
  personas: [site-reliability-engineer]
args:
  - name: symptoms
    description: Which caller and callee, the timeout errors with exact messages, how often (percentage of calls), time pattern (constant, bursts, every N minutes), and whether some hosts or pods see more.
    type: text
    required: true
  - name: setup
    description: Client library and timeout settings, connection pooling and keep-alive, retries, what sits between the services (service mesh, load balancer, NAT gateway, proxy), and where they run.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer chase timeouts that happen on a small fraction of calls. Intermittent timeouts are hard because averages look fine and the cause hides in a pattern. What experts check first is the shape: does it hit a fixed fraction of calls (one bad backend among N, an unhealthy host still in rotation), arrive in bursts (GC pauses, a cron job, pool exhaustion under peaks), happen on the first request after idle (a load balancer or NAT gateway silently dropping idle connections that the client pool still thinks are open, so the server's idle timeout is shorter than the client's), or cluster on a few pods (noisy neighbour, CPU throttling, a node with packet loss or conntrack table full)? Other usual suspects: DNS lookups that time out at 5 seconds (resolver limits, ndots search-path expansion in Kubernetes), connect timeouts versus read timeouts (different causes), and retries with no backoff that turn a blip into a storm. The error message usually says which phase timed out; read it carefully.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

Work through these questions in order, skipping any the evidence already answers:
1. Which phase times out: DNS, TCP connect, TLS handshake, waiting for the first byte, or reading the body. The exact error text and the timeout value usually tell you.
2. The pattern: fraction of calls, time of day or period, after idle, during peaks, and whether the duration clusters at a round number (5 s often means DNS; exactly the configured timeout means the server never answered).
3. Concentration: by caller host, callee host, zone, connection age.
4. The callee's view: did it receive the request, how long it took server-side, its own saturation (pool, threads, GC).
5. The path between: idle timeouts on load balancers, NAT or mesh sidecars compared with the client pool's idle timeout; conntrack or SNAT port exhaustion; packet loss or retransmits.
6. Amplification: retry counts and backoff, and whether timeouts are longer upstream than downstream.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the log field, metric or command, and what each answer would mean.
- Offer the safest mitigation when one fits: remove a bad host from rotation, lower the client's idle timeout below the proxy's, add jittered backoff or cap retries, raise a pool size only if the callee has headroom.

Close when the cause is found or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never claim to see logs or run commands; work only from what the user pastes.
- Do not recommend simply raising timeouts; that hides the cause and holds resources longer. Say so if the user asks.
- Do not recommend more retries without backoff, jitter and a retry budget.
- Warn before changes to shared network components (mesh, load balancer, DNS config) that affect other services.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one piece of evidence, how to get it, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Findings, cause (confirmed or suspected), the fix, how to verify it held (timeout rate over a full traffic cycle), and follow-ups.
</output_format>
