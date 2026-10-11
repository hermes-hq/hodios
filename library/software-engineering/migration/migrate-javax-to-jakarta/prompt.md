---
schema: 1
id: migrate-javax-to-jakarta
kind: prompt
title: Migrate javax to the jakarta namespace
description: Moves a Java codebase from javax.* to jakarta.* enterprise APIs, as needed for Spring Boot 3 or Jakarta EE 9+, including config strings, service files and third-party libraries that still ship javax.
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
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jakarta-ee, namespace-change, spring-boot-3, java-upgrade, openrewrite]
pairs_with:
  prompts: [upgrade-major-dependency, inventory-deprecated-api-usage]
  workflows: [runtime-upgrade-track]
  personas: [migration-engineer]
args:
  - name: project
    description: The build tool, current and target framework versions (for example Spring Boot 2.7 to 3.x), app server if any, and anything notable such as JSP, SOAP or JAXB.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Library blockers, Changes made, Runtime checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Jakarta EE 9 renamed the enterprise APIs from `javax.*` to `jakarta.*` (servlet, persistence, validation, transaction, ws.rs, mail, xml.bind, inject, annotation and others), and Spring Boot 3 and Spring Framework 6 require the new names. Packages that belong to Java SE keep `javax`: `javax.sql`, `javax.crypto`, `javax.net`, `javax.naming`, `javax.swing`, `javax.xml.parsers`, `javax.annotation.processing` and similar, so a blind global replace breaks compilation. The import changes are the easy part and are well served by automated recipes such as OpenRewrite. The failures that hurt are silent: a third-party library still compiled against `javax.servlet` compiles fine but its filter is never registered; `javax.persistence.*` property keys in configuration are ignored; `persistence.xml`, `web.xml` and XML namespaces still point at old schemas; `META-INF/services` files name old interfaces. A dependency tree can also pull both `javax` and `jakarta` artifacts at once.
</context>

<task>
Project: {{project}}

1. Inventory `javax` usage in sources and split it into enterprise APIs (must move) and Java SE packages (must stay). Also search non-Java files: property and YAML keys, XML descriptors and their namespaces, `META-INF/services`, JSP taglibs, annotation strings in reflection or AOP pointcuts.
2. List dependencies that still depend on `javax` enterprise APIs (from the dependency tree), and for each find the Jakarta-compatible version, a replacement, or a classifier variant. Anything with no Jakarta version is a blocker; report it before changing code.
3. Apply the change with an automated recipe where available, then fix what it misses by hand. Upgrade companion libraries that move with the namespace (for example the persistence provider, validator and servlet container) to versions that match.
4. Remove duplicate API artifacts so only `jakarta` versions remain on the classpath, and add a build rule (dependency ban or enforcer) that fails if a `javax` enterprise artifact returns.
5. Build and run the full test suite. Then start the application and check what tests often miss: filters and listeners registered, validation annotations enforced, entity mapping and schema validation, JSON and XML binding, and any SOAP or mail paths.
</task>

<constraints>
- Never rename Java SE `javax` packages; list any you are unsure about.
- Do not claim a library has a Jakarta-compatible version unless you checked its release notes or artifact; mark it "to verify" otherwise.
- Keep the namespace change separate from unrelated refactors so the diff can be reviewed.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: package or key | where | must move or must stay | count.
## Library blockers
Table: dependency | current version | Jakarta-ready version or replacement | status.
## Changes made
Automated recipe used, manual fixes, dependency changes, the build rule added.
## Runtime checks
Each check from step 5 with pass or fail.
## Remaining risks
Bullets, or "None".
</output_format>
