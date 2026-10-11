---
schema: 1
id: set-up-spring-message-sources
kind: prompt
title: Set up Spring Boot message sources
description: Sets up Spring Boot localisation with MessageSource bundles, a LocaleResolver, validation messages from the same bundles, UTF-8 handling, and locales that survive async and background work.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [message-source, locale-resolver, bean-validation, resource-bundles, thymeleaf]
pairs_with:
  prompts: [design-localized-api-errors, localize-server-sent-messages, propagate-locale-through-services]
args:
  - name: project
    description: Spring Boot version, Spring MVC or WebFlux, server-rendered templates or API-only, async and messaging used, and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, de, fr-CA".
    type: string
    required: true
  - name: locale_source
    description: How the request locale is chosen.
    type: enum
    enum: [accept-language, cookie, session, query-param, user-setting]
    default: accept-language
output_contract:
  format: markdown
  sections: [Baseline, Message bundles, Locale resolution, Validation messages, Plurals and formatting, Async and background work, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spring Boot auto-configures a `MessageSource` from `messages*.properties` when `spring.messages.basename` matches, and several defaults bite. `spring.messages.fallback-to-system-locale` is true by default, so a missing English bundle on a server whose JVM default locale is German falls back to German instead of the base `messages.properties`. Messages are run through `java.text.MessageFormat` when they have arguments, where a single quote is an escape character, so "don't {0}" loses its apostrophe unless written `''`; `spring.messages.always-use-message-format` makes this consistent. Older tooling wrote properties files as ISO-8859-1 with unicode escapes; Boot reads them as UTF-8 by default, so mixed encodings produce mojibake. The default `AcceptHeaderLocaleResolver` accepts any language the client sends unless supported locales are set. Bean Validation constraint messages (`{order.quantity.min}`) come from `ValidationMessages.properties` unless the validator is wired to the application's `MessageSource`. `MessageFormat` choice formats are a poor fit for plurals in most languages; ICU4J's `MessageFormat` handles CLDR plurals. `LocaleContextHolder` is thread-bound, so `@Async` methods, executors, messaging listeners and reactive pipelines lose the request locale.
</context>

<task>
Set up localisation in this Spring Boot project:

{{project}}

Locales: {{locales}}. Locale source: {{locale_source}}.

1. Run the build and tests and record the baseline. Stop and report if they fail.
2. Read `application.properties` or `application.yml`, any `MessageSource` or `LocaleResolver` beans, controllers, exception handlers, validation constraints and async or messaging code.
3. Message bundles: set `spring.messages.basename` (several bundles if the app is large), `encoding` UTF-8, `fallback-to-system-locale: false`, `always-use-message-format: true`, and `use-code-as-default-message` off outside development so missing codes show up. Create `messages.properties` as the base and one file per locale; convert any legacy escaped files to UTF-8.
4. Locale resolution: for {{locale_source}}, configure the matching resolver with supported locales from {{locales}} and the default; for query parameters add a `LocaleChangeInterceptor`. For WebFlux, use a `LocaleContextResolver`. Respect an explicit user setting over the header when the user is signed in.
5. Validation messages: wire `LocalValidatorFactoryBean` to the application's `MessageSource` (check whether the installed Boot version already does), move constraint messages to the bundles with `{code}` references, and make the global exception handler return localized messages with stable error codes.
6. Plurals and formatting: for messages with counts, use ICU4J `MessageFormat` (through a small wrapper or a custom `MessageSource`) or separate keys per CLDR category, and say which; format dates, numbers and currency with the resolved locale, not `Locale.getDefault()`.
7. Async and background work: capture the locale where work is scheduled and restore it in executors (a `TaskDecorator`), carry it in message headers for listeners, and for emails use the recipient's stored locale.
8. Templates: if Thymeleaf or another engine is used, convert the base layout's `lang` attribute and one template's text to message expressions.
9. Convert a representative slice (one endpoint's error messages, one constraint, one message with an apostrophe and an argument, one plural) and list the rest.
10. Run tests again, including requests with two `Accept-Language` values and an unsupported one, and an async path; report results.
</task>

<constraints>
- Never rely on the JVM default locale for user-facing text.
- Do not hard-code translated text in constraint annotations.
- Do not invent translations; locale bundles carry keys with source text marked for translation, or rely on the base bundle.
- Check property and class names against the installed Spring Boot version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build and tests before changes.

## Message bundles
Properties, file layout and encoding.

## Locale resolution
Resolver, supported locales and interceptor.

## Validation messages
Validator wiring, constraint codes and error responses.

## Plurals and formatting
Chosen plural approach and formatting calls.

## Async and background work
Task decorator, message headers and email locale.

## Verification
Commands and requests with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
