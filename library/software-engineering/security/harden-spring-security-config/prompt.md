---
schema: 1
id: harden-spring-security-config
kind: prompt
title: Harden a Spring Security configuration
description: Reviews and rewrites a Spring Security filter chain for correct matcher order, deny by default, method security, CSRF, CORS, session policy and Actuator exposure, with tests.
category: security
version: 1.0.0
status: incubating
stage: [build, review]
role: [backend-engineer, software-engineer, security-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [repo, config, file]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [hardening, filter-chain, actuator, access-control]
pairs_with:
  prompts: [review-spring-boot-change, harden-jwt-validation, add-csrf-protection, write-authorization-tests]
  rules: [spring-boot-rules]
  personas: [security-auditor]
args:
  - name: service
    description: The Spring service, how clients authenticate (session login, JWT resource server, OAuth client, API keys), and the Spring Boot version.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Tests, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spring Security configuration bugs are quiet: the app works, but a path is open. Matchers in `authorizeHttpRequests` are evaluated in order, so a broad `permitAll` before a narrower rule wins. Spring Security 6 denies requests no rule matches, but 5.x permitted them, and an explicit final `anyRequest().authenticated()` or `denyAll()` keeps the intent clear across upgrades. Path matching changed between versions (trailing slash matching is off by default since Spring Framework 6, the old `antMatchers` and `mvcMatchers` were replaced by `requestMatchers`), and upgrades can change which rule applies. `web.ignoring()` skips the whole filter chain, including security headers, and should only cover static assets. CSRF is often disabled globally when only the stateless API needed it, leaving form login or session-based endpoints open. CORS with `allowedOriginPatterns("*")` and `allowCredentials(true)` effectively trusts every site. Spring Boot Actuator exposes `env`, `heapdump`, `configprops` and `loggers` if `management.endpoints.web.exposure.include=*`, which can leak secrets or allow log level changes. `@PreAuthorize` is ignored unless method security is enabled, and does not apply to internal calls within the same class. Multiple `SecurityFilterChain` beans need `securityMatcher` and `@Order`, or one chain silently handles everything.
</context>

<task>
Harden the Spring Security configuration of {{service}}.

1. Read every `SecurityFilterChain`, `WebSecurityCustomizer`, method security setup, CORS configuration, Actuator properties per profile, and the controllers' routes and annotations. Note the Spring Boot and Spring Security versions.
2. Build a table of routes and their effective rule by walking the matchers in order, flagging paths that are open by accident, rules shadowed by earlier ones, missing deny-by-default, and `web.ignoring()` misuse.
3. Check CSRF (disabled only for stateless token-authenticated chains), CORS (exact origins), session creation policy, security headers, Actuator exposure and its own access rule, method security enablement and annotation coverage on sensitive services.
4. Rewrite the configuration with the smallest change: clear chain separation with `securityMatcher` and order, specific rules first and `anyRequest()` last, CSRF and CORS per chain, Actuator limited to `health` and `info` publicly with the rest behind an admin role or a management port.
5. Write tests with `MockMvc` or `WebTestClient` and Spring Security test support: anonymous, normal user and admin against each sensitive route and Actuator endpoint, CSRF required where expected, and a CORS preflight from an unlisted origin rejected.
6. Run the tests and the build.
</task>

<constraints>
- Do not disable CSRF, CORS checks or authentication to make a test pass.
- Keep existing clients working; list any route whose access changes.
- Do not expose new Actuator endpoints; reduce exposure only.
- State the Spring version assumptions when using APIs that changed between versions.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: issue, location, effect (which paths are exposed), severity, fix.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Needs a decision
Access changes that need the team's agreement.
</output_format>
