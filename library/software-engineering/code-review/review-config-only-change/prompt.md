---
schema: 1
id: review-config-only-change
kind: prompt
title: Review a config-only change
description: Reviews YAML, JSON, env, feature flag or Helm values changes for blast radius, environment mix-ups, type and unit mistakes, missing rollback and validation gaps. Use when a config PR looks harmless.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [sre, devops-engineer, software-engineer]
stack: []
requires: [none]
inputs: [diff, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [configuration, blast-radius, feature-flags, rollback, helm-values]
pairs_with:
  prompts: [review-diff-for-risks, review-pull-request]
args:
  - name: diff
    description: The config diff with file paths, plus the schema or the code that reads the changed keys if you have it.
    type: text
    required: true
  - name: environment
    description: Which environments the change reaches and how it is deployed, for example "prod EU and US via Argo CD on merge" or "staging only, manual apply". Leave empty if unknown.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Verdict, Blast radius, Findings, Rollback, Guardrails to add]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Config changes are a common cause of outages because they look trivial, skip the tests code changes get, and often deploy everywhere at once. A one-character edit can change a timeout a thousand-fold, point production at a staging database, or turn a flag on for every customer. You review them with the same care as code, focusing on what the values mean at runtime. Environment: {{environment}} (if empty, say the blast radius is unknown and review under the worst plausible case).
</context>

<task>
<diff>
{{diff}}
</diff>

1. For each changed key, state what it controls at runtime and which services, regions, tenants or users read it. Note whether the change applies on deploy, on restart, or live (hot-reloaded flags and remote config apply immediately).
2. Check:
   - **Environment mix-ups:** a production file pointing at staging hosts, buckets, queues or credentials, or the reverse; values copied between environment files without adjusting; overrides that silently win (precedence order of base, environment and secret files).
   - **Types and units:** ms versus s, bytes versus MB, percentages as 0-1 versus 0-100, strings where numbers or booleans are expected (`"false"` is truthy in many loaders), YAML gotchas (`no`, `on`, `08` octal, unquoted times, indentation moving a key to another parent), durations without units.
   - **Magnitude:** values changed by more than about 10x, limits set to 0 or unlimited, replicas or connection pool sizes that exceed what downstream systems allow, timeouts longer than the caller's timeout.
   - **Feature flags:** default state, targeting rules, percentage rollouts, flags flipped for all tenants at once, dependencies between flags, and a stale flag that should be removed instead.
   - **Kubernetes and Helm values:** resource requests and limits, probes that will kill healthy pods, selectors and labels, image tags (`latest`), and values the chart does not read (typos are silently ignored).
   - **Secrets:** secret values committed in plain text, or references to secrets that do not exist in the target environment.
   - **Rollback:** whether reverting the commit restores the old state, or the change triggers a one-way effect (a data migration, a cache flush, a TTL that already expired data, a key rotated).
   - **Validation:** whether a schema, type check, linter or dry-run would have caught each finding.
3. Rate each finding: critical (outage, data exposure, wrong environment), high (degradation for many users), medium, low.
</task>

<constraints>
- Each finding cites `path:line` and key, what happens at runtime, and the corrected value or the question to answer.
- Do not assume what a key means if the code reading it is not shown; say what to check.
- At most 8 findings, ranked by severity.
- Never echo secret values found in the diff; refer to them by key and recommend rotation.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, with the main risk.
## Blast radius
Two or three bullets: what reads the changed values, which environments and users, and when the change takes effect.
## Findings
Numbered. Each: severity, `path:line` key, the problem, runtime effect, the fix.
## Rollback
How to undo it, how long it takes to propagate, and anything that cannot be undone.
## Guardrails to add
Bullets: the schema rule, validation, canary or staged rollout that would catch this class of mistake next time.
</output_format>
