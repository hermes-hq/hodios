---
schema: 1
id: tune-waf-false-positives
kind: prompt
title: Tune WAF false positives
description: Tunes a web application firewall that blocks real users, finding the rules that fire, confirming the request is legitimate and writing the narrowest exclusion that does not open a hole.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [security-engineer, devops-engineer, backend-engineer]
requires: [none]
inputs: [logs, config, text]
output: [config, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [waf, modsecurity, owasp-crs, false-positives, rule-exclusions]
pairs_with:
  prompts: [tune-noisy-detection, analyze-web-attack-logs, harden-wordpress-site]
args:
  - name: blocked_requests
    description: WAF log entries for the blocked requests - rule ids and messages, matched data, the URI, method, parameter or header that matched, anomaly scores and the action.
    type: text
    required: true
  - name: waf
    description: The WAF and ruleset, such as ModSecurity or Coraza with OWASP CRS (and paranoia level), AWS WAF managed rules, Cloudflare managed rules or Azure Front Door WAF.
    type: string
    required: true
  - name: app_context
    description: What the blocked feature does and why its input looks the way it does (rich text editor, code snippets, search with SQL-like words, file names, JSON bodies).
    type: text
output_contract:
  format: markdown
  sections: [What is firing, Legitimate or attack, Exclusion, Why it is safe, Test, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WAF false positives get fixed badly under pressure: the rule is disabled site-wide, the whole path is allowlisted, or the WAF is switched to detection-only and never switched back. Each of those removes protection for far more than the feature that broke. Generic rulesets such as OWASP CRS match patterns in specific places (arguments, cookies, headers, body), so a CMS editor posting HTML trips XSS rules, a search box with "select" or "union" trips SQL injection rules, and a field holding a file path trips traversal rules. The right fix is the narrowest exclusion: remove one rule's inspection of one named parameter on one path, rather than turn off the rule or the path. In CRS with anomaly scoring, several rules add up to the blocking score, so the log must be read as a group per transaction. Managed rule services have their own mechanisms (scope-down statements, rule overrides to count, exception or skip rules) with different granularity. An exclusion is also a decision to accept risk on that parameter, so the application must handle that input safely by itself.
</context>

<task>
Tune the WAF for these blocks:

<blocked_requests>
{{blocked_requests}}
</blocked_requests>

WAF: {{waf}}
{{#app_context}}

<app_context>
{{app_context}}
</app_context>
{{/app_context}}

1. What is firing: group the log entries by transaction or request, list the rule ids, what each detects, where it matched (parameter, header, cookie, body) and the score each contributed.
2. Legitimate or attack: decide whether these are real users using the feature or actual attack attempts mixed in. Look at sources, timing, payload content and whether the matched data fits the feature. If attack traffic is mixed in, say so and keep it blocked.
3. Exclusion: write the narrowest exclusion for the stated WAF - for example in CRS a `ctl:ruleRemoveTargetById=<id>;ARGS:<name>` scoped by `REQUEST_FILENAME` in a rule placed before CRS, or the equivalent scope-down or rule override for the managed service. Prefer removing one parameter from one rule over removing a rule, and a rule over a path. Use a local rule id range and comments with the reason and ticket.
4. Why it is safe: what protection remains on the parameter (other rules, application encoding or validation), and what the application must guarantee (for example server-side HTML sanitisation for an editor field). If the app does not guarantee it, say the exclusion moves risk to the app and flag it.
5. Test: the legitimate request now passes; an obvious attack string in the same parameter is still caught by remaining rules or the app; the same attack on other parameters is still blocked.
6. Rollout: apply in detection or count mode first where supported, watch for a day, then enforce, and set a review date.
</task>

<constraints>
- Never recommend disabling the WAF, switching it to detection-only permanently, or allowlisting a whole path or host as the fix.
- Never invent rule ids or their meanings. If a rule id is unfamiliar, ask for its message or mark it `[VERIFY]`.
- Changes to production WAF configuration need approval; present them, do not imply they were applied.
- Do not provide payloads designed to bypass the WAF. Test strings should be well-known, harmless probes.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is firing
Table: Request | Rule id | Detects | Matched in | Score.

## Legitimate or attack
Short verdict with reasons.

## Exclusion
Fenced code block in the WAF's syntax with comments.

## Why it is safe
Bullets, including what the app must guarantee.

## Test
Checklist of requests and expected outcomes.

## Rollout
Numbered steps with review date.
</output_format>
