---
schema: 1
id: switch-spring-to-constructor-injection
kind: prompt
title: Switch Spring beans to constructor injection
description: Converts Spring field and setter injection to constructor injection, exposing hidden dependencies and cycles, keeping qualifiers, optional and lazy dependencies, and proving the context still starts.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dependency-injection, constructor-injection, circular-dependencies, spring-beans]
pairs_with:
  prompts: [decouple-for-testability, untangle-circular-dependencies]
  personas: [java-spring-engineer]
  rules: [spring-boot-rules]
args:
  - name: scope
    description: The packages or classes to convert, and whether the code is Java or Kotlin and uses Lombok.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, including a context-loading test, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Injection points, Diff, Cycles and smells, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Spring engineer. Field injection (`@Autowired private Foo foo;`) hides dependencies, makes classes impossible to construct in a unit test without reflection or a Spring context, allows `final`-less mutable fields, and lets circular dependencies slip through. Constructor injection makes dependencies explicit, fields `final`, and classes testable with plain `new`. With one constructor, `@Autowired` is not needed. With Lombok, `@RequiredArgsConstructor` on `final` fields does the same, if the project already uses Lombok.

What must carry over exactly: `@Qualifier` and `@Value` annotations move to constructor parameters (with Lombok, qualifiers on fields are copied to the constructor only if `lombok.config` sets `copyableAnnotations`); `@Autowired(required = false)` becomes `Optional<Foo>` or `ObjectProvider<Foo>`; `@Lazy` on a field must stay `@Lazy` on the parameter or become `ObjectProvider`; collections of beans (`List<Handler>`) keep their order (`@Order`); and setter injection used for genuinely optional or reconfigurable dependencies may be intentional.

The conversion surfaces problems that were always there: a circular dependency that field injection tolerated now fails at startup (and Spring Boot 2.6 and later forbids cycles by default anyway). Breaking it with `@Lazy` hides it again; the real fix is usually extracting the shared logic into a third bean or using an event. A constructor with eight or more parameters is a signal the class does too much, worth reporting, not fixing here. Tests that used `@InjectMocks` with field injection keep working, but tests that set fields by reflection need updating.
</context>

<task>
Convert {{scope}} to constructor injection.

1. List every field and setter injection point with its annotations (`@Qualifier`, `@Value`, `required = false`, `@Lazy`, collection types), and whether the class is a configuration class, an abstract base class, or a bean created in a `@Bean` method.
2. Convert class by class: `final` fields, one constructor (or Lombok if the project uses it, with qualifier handling checked), annotations moved to parameters, optional dependencies as `Optional` or `ObjectProvider`. For abstract base classes with injected fields, decide whether subclasses pass dependencies up or the base keeps setter injection, and say which.
3. Update tests that construct the class or set fields by reflection.
4. Start the application context (the project's context test or `@SpringBootTest`) and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}. If a cycle appears, report its path and propose a structural fix; do not paper over it with `@Lazy` without agreement.
5. Report classes with too many dependencies as a follow-up list.
</task>

<constraints>
- Same beans, qualifiers, optional and lazy semantics, and collection ordering.
- Do not break cycles with @Lazy or allow-circular-references without agreement.
- Do not add Lombok if the project does not use it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Injection points
Table: class, field or setter, annotations, conversion.
## Diff
The change (summarised for mechanical edits).
## Cycles and smells
Cycles found with path and proposed fix; classes with many dependencies.
## Check
Context startup and test results.
</output_format>
