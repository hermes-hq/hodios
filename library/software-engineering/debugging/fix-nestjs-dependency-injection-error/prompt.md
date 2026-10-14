---
schema: 1
id: fix-nestjs-dependency-injection-error
kind: prompt
title: Fix a NestJS dependency injection error
description: Fixes "Nest can't resolve dependencies" and circular dependency errors by tracing module imports, exports, providers and injection tokens, using forwardRef only when a cycle is real.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [nestjs]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dependency-injection, modules, providers, circular-dependency, injection-tokens]
pairs_with:
  prompts: [fix-spring-bean-creation-error, fix-module-import-error, fix-typescript-type-error]
  personas: [typescript-engineer, backend-engineer]
args:
  - name: error
    description: The full startup or test error, for example "Nest can't resolve dependencies of the OrdersService (?, ConfigService). Please make sure that the argument UsersService at index [0] is available in the OrdersModule context."
    type: text
    required: true
  - name: code
    description: The modules, the service with the failing constructor and the provider it needs, or their paths. Say whether it fails at app start or in a unit test.
    type: text
output_contract:
  format: markdown
  sections: [What Nest could not resolve, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a NestJS engineer who reads the resolution error literally. "Nest can't resolve dependencies of the X (?, Y). Please make sure that the argument Z at index [0] is available in the M context" names the class being built, the position of the missing argument, the token Nest looked for, and the module whose scope was searched. The causes, in order of frequency:
- The provider lives in another module that is not imported into M, or is imported but not listed in that module's `exports`. Providers are private to their module unless exported.
- The provider was added to `imports` instead of `providers` (or a module was added to `providers`), which produces a different but related error.
- The token is wrong or missing: the argument shows as `?` or `Object` when the type is an interface or a type alias (erased at runtime), when it was imported with `import type`, or when `emitDecoratorMetadata` is off. Interfaces need a string or symbol token with `@Inject(TOKEN)` and a `{ provide: TOKEN, useClass | useValue | useFactory }` provider.
- A circular import between files or modules: the argument shows as `undefined` or the error mentions a circular dependency. Barrel files (`index.ts`) re-exporting everything often create the cycle. `forwardRef(() => OtherModule)` on both sides works, but a cycle usually means shared logic should move to a third module or an event.
- Dynamic modules: `TypeOrmModule.forFeature([Entity])` must be imported in the module whose providers inject the repository; `ConfigModule.forRoot` needs `isGlobal: true` or importing where used; `JwtModule.register` similar.
- Scope: a request-scoped provider makes its consumers request-scoped too, which can surprise singletons and cron jobs.
- In unit tests, `Test.createTestingModule` only knows what the test registers: every constructor dependency needs a real provider or a mock with the same token.
</context>

<task>
Fix this NestJS dependency injection error.

Error:
{{error}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Parse the message: the class being constructed, the missing argument's index and token, and the module context.
2. Read that module, the module that declares the missing provider, their `imports`, `exports` and `providers`, the constructor and the import statements for the parameter types. Check tsconfig for `emitDecoratorMetadata`. If it fails only in a test, read the testing module setup.
3. Name the cause: missing import or export, wrong token or type-only import, interface without an injection token, file or module cycle, dynamic module registration, scope, or incomplete test module.
4. Apply the smallest fix: import and export correctly, add a token and `@Inject`, register the dynamic module where it is used, add the mock provider in the test, or break the cycle by extracting shared code. Use `forwardRef` only when the cycle is genuine and say why it is acceptable.
5. Start the app (or run the test) and confirm it boots, then run the related tests.
</task>

<constraints>
- Do not register the same provider class in several modules' `providers` to make the error go away; that creates separate instances.
- Do not make modules `@Global()` to avoid wiring imports, except for genuinely app-wide infrastructure.
- Do not add `forwardRef` everywhere as a first fix.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What Nest could not resolve
Class, argument index, token and module context.
## Cause
Why the token was not available there.
## Fix
The diff.
## Verification
App start or test run results.
</output_format>
