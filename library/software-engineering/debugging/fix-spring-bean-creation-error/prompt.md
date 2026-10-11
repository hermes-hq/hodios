---
schema: 1
id: fix-spring-bean-creation-error
kind: prompt
title: Fix a Spring Boot startup failure
description: Fixes Spring Boot startup failures such as UnsatisfiedDependencyException, circular references, missing beans, conflicting beans and unbound properties.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, logs, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [startup-errors, dependency-injection, application-context, configuration-properties]
pairs_with:
  prompts: [fix-gradle-or-maven-build-failure, fix-jpa-lazy-loading-error]
  personas: [java-spring-engineer]
args:
  - name: error
    description: "The startup log from \"APPLICATION FAILED TO START\" or the first exception, including the full \"Caused by\" chain."
    type: text
    required: true
  - name: context
    description: "Spring Boot version, the profile in use, and what changed (a new dependency, a moved package, a new configuration class, a test that fails to load the context)."
    type: text
output_contract:
  format: markdown
  sections: [Root exception, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Spring engineer who reads startup failures from the bottom of the "Caused by" chain up. Spring Boot's failure analyzers often print a "Description" and "Action" block, which is a good start but not always the root. The causes:
- No qualifying bean: the class is outside the component scan (not under the `@SpringBootApplication` package), missing a stereotype annotation, excluded by a profile or `@ConditionalOn...` condition, or an auto-configuration that did not apply (run with `--debug` to print the condition evaluation report).
- More than one candidate: two beans of the same type; use `@Primary`, `@Qualifier`, or remove the duplicate (often a manual `@Bean` duplicating auto-configuration).
- Circular references: prohibited by default since Spring Boot 2.6. Break the cycle by extracting the shared logic, using events, or moving a dependency to a method parameter; `@Lazy` or `spring.main.allow-circular-references=true` hide design problems.
- Configuration properties: a required property missing in this profile, a placeholder `${...}` that does not resolve, type conversion failures (durations, lists), `@ConfigurationProperties` validation failures.
- Bean creation exceptions from inside a bean's constructor or `@PostConstruct`: the real error is the nested one (a database not reachable, a file not found), not Spring itself.
- Spring Boot 3 migration: `javax.*` to `jakarta.*` packages, removed properties, and dependencies not yet on Jakarta EE.
- Test contexts: slices (`@WebMvcTest`, `@DataJpaTest`) only load part of the context, so beans the controller needs must be provided as mocks (`@MockitoBean` in recent versions, `@MockBean` before).
</context>

<task>
Fix this Spring startup failure.

Startup log:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Find the innermost "Caused by" and the bean, injection point or property it names.
2. Read the classes involved, the application class package, configuration classes, profiles and properties files.
3. Name the cause. If conditions or auto-configuration are involved, run the app or test with `--debug` (or `debug=true`) and read the condition evaluation report.
4. Fix at the cause: move or scan the package, add the missing annotation or `@Bean`, qualify the right candidate, break the cycle by restructuring, add the property to the right profile or give it a sensible default, fix the jakarta import, or provide the bean in the test slice.
5. Start the application (or run the failing test) and confirm the context loads.
</task>

<constraints>
- Do not set `spring.main.allow-circular-references=true`, `allow-bean-definition-overriding=true` or blanket `@Lazy` as the fix without explaining what it hides and getting agreement.
- Do not widen component scanning to the whole classpath or add `scanBasePackages` for everything.
- Never put real secrets in properties files; use environment variables or the project's secrets mechanism.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Root exception
The innermost "Caused by" and the bean or property it names.
## Cause
Why Spring cannot create or choose the bean.
## Fix
The diff.
## Verification
The app or test context started successfully, with the command used.
</output_format>
