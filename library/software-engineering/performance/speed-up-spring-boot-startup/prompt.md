---
schema: 1
id: speed-up-spring-boot-startup
kind: prompt
title: Cut Spring Boot startup time
description: Cuts Spring Boot startup time by measuring with the startup actuator or logs, then trimming slow beans, auto-configuration and classpath scanning, and weighing lazy init, CDS, AOT and native images.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, ship]
role: [backend-engineer, software-engineer, devops-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, config, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [jvm, startup-time, class-data-sharing, graalvm, auto-configuration]
pairs_with:
  prompts: [reduce-serverless-cold-start, speed-up-cli-startup, tune-garbage-collector]
  personas: [performance-engineer]
args:
  - name: target
    description: The service, its current startup time, and why it matters (autoscaling, deploys, tests, serverless).
    type: text
    required: true
  - name: evidence
    description: Startup logs, the /actuator/startup output or a startup trace, Spring Boot and Java versions, container CPU and memory.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where startup time goes, Changes, Options with trade-offs, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spring Boot startup time is usually dominated by a few things: beans that do slow work in constructors or @PostConstruct (connecting to remote services, warming caches, running migrations), wide component scanning, auto-configurations pulled in by unused starters, JPA or Hibernate bootstrap with many entities, and schema migrations at startup. The JVM itself adds class loading and JIT warm-up, which a tight CPU limit in a container makes much worse, because startup is CPU-heavy. The startup actuator endpoint with a BufferingApplicationStartup, or a JFR recording, shows the slow steps. Remedies have trade-offs: lazy initialization speeds startup but moves failures and latency to the first request; class data sharing (CDS or AppCDS) cuts class loading with little risk; Spring AOT and GraalVM native images give very fast startup but restrict reflection and dynamic proxies and lengthen builds; CRaC-style checkpoint restore needs platform support.
</context>

<task>
Target: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Measure the baseline on the same environment it runs in (container limits included): time to "Started" log line and time to ready (health check passing). Enable the startup actuator or a JFR recording and list the slowest startup steps and beans.
2. Fix application-level causes first: move slow remote calls or cache warming out of bean construction (to after readiness, asynchronously, or on first use with a timeout), narrow component scanning, remove unused starters, exclude auto-configurations that are not needed, and run database migrations as a separate step if the deploy setup allows.
3. Check the runtime: container CPU limits during startup, JVM flags, a current Java version, and tiered compilation settings.
4. Present the bigger options with trade-offs for this service: lazy initialization (and which beans must stay eager), CDS or AppCDS, Spring AOT, a native image, checkpoint restore. Recommend based on the measured gap and the service's use of reflection and dynamic features.
5. Apply the agreed low-risk changes, re-measure, and run the test suite and a smoke test of the started app.
</task>

<constraints>
- Do not enable global lazy initialization without listing the beans whose failures would move to first request and how that is caught.
- Do not move database migrations out of startup without the user agreeing to the deploy change.
- Report measured startup times on the same environment, before and after.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Startup and time-to-ready before and after, and where measured.
## Where startup time goes
The slowest steps or beans with their times.
## Changes
The diff with one sentence per change.
## Options with trade-offs
A short table: option, expected gain, cost and risk, recommendation.
## Verification
What was run and the results.
</output_format>
