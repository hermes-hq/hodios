---
schema: 1
id: upgrade-spring-boot-2-to-3
kind: prompt
title: Upgrade a Spring Boot 2 app to Spring Boot 3
description: Upgrades a Spring Boot 2.x application to 3.x via 2.7 first, covering Java 17, Spring Security 6 configuration, renamed properties, Hibernate 6, observability and URL matching changes.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [backend-engineer, software-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spring-boot-3, spring-security-6, hibernate-6, openrewrite, java-17]
pairs_with:
  prompts: [migrate-javax-to-jakarta, upgrade-major-dependency, fix-spring-bean-creation-error]
  workflows: [runtime-upgrade-track]
  personas: [java-spring-engineer]
args:
  - name: project
    description: Current Boot and Java versions, build tool, modules, and the main Spring projects in use (Security, Data JPA, Cloud, Batch, WebFlux), plus notable libraries.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Upgrade path, Blockers, Changes made, Behaviour checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The safe path to Spring Boot 3 goes through the latest 2.7 release first: fix every deprecation warning there, because 3.0 removed what 2.x deprecated. Boot 3 needs Java 17 and the Jakarta namespace, and several changes compile cleanly but change behaviour. Spring Security 6 removed `WebSecurityConfigurerAdapter` in favour of `SecurityFilterChain` beans, replaced `antMatchers` with `requestMatchers`, and applies authorization to every dispatch type by default, which can block error pages and async requests. Spring MVC no longer matches a trailing slash by default, so `/users/` stops reaching `/users`. Hibernate 6 changes ID generation defaults, some query semantics and type mappings, which shows up at runtime, not at compile time. Many configuration properties were renamed or moved; the `spring-boot-properties-migrator` dependency reports them at startup. Sleuth is replaced by Micrometer Tracing. Spring Cloud and other ecosystem libraries must move to release trains that support Boot 3. OpenRewrite recipes automate much of the mechanical work but not the behaviour checks.
</context>

<task>
Project: {{project}}

1. Read the build files and list the Boot, Spring Cloud and third-party versions. Check each third-party library for a Boot 3 and Jakarta-compatible release; anything without one is a blocker to report before code changes.
2. Step 1: upgrade to the latest 2.7.x, fix all deprecation warnings, and get the tests green. Commit this separately.
3. Step 2: move to Java 17 if not already there, then to Boot 3 with the matching Spring Cloud train. Apply the javax to jakarta change and use an automated recipe for the mechanical parts, reviewing its diff.
4. Rewrite security configuration as `SecurityFilterChain` beans with `requestMatchers`, and check dispatcher types, CSRF and CORS behaviour. Decide trailing-slash handling explicitly (redirect, explicit mappings or a filter) rather than restoring old defaults blindly.
5. Add the properties migrator temporarily, fix every reported property, then remove it. Replace Sleuth with Micrometer Tracing if used.
6. Run the full test suite and then start the app to check what tests miss: security rules on real endpoints (including error pages), trailing-slash URLs, JPA ID generation and queries against a real database, JSON serialization, actuator endpoints, tracing headers and startup time.
</task>

<constraints>
- Do not skip the 2.7 step; if the user insists, explain what will be harder to diagnose.
- Do not claim a library is Boot 3 compatible without checking its release notes; mark unknowns "to verify".
- Keep the upgrade free of unrelated refactors so it can be reviewed and reverted.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Upgrade path
Ordered versions with what each step changes.
## Blockers
Table: library | current | Boot 3 version or replacement | status.
## Changes made
Per step: automated changes, manual fixes, security config, properties.
## Behaviour checks
Each check from step 6 with pass or fail.
## Remaining risks
Bullets, or "None".
</output_format>
