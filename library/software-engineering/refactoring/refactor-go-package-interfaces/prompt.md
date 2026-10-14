---
schema: 1
id: refactor-go-package-interfaces
kind: prompt
title: Refactor Go interfaces to idiomatic shape
description: Reshapes Go code so interfaces are small and defined by consumers, constructors return concrete types, and interfaces with one implementation and no test need are removed, without behaviour change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [go-interfaces, consumer-defined-interfaces, package-design, test-doubles]
pairs_with:
  prompts: [remove-needless-abstraction, decouple-for-testability]
  personas: [go-engineer]
  rules: [go-style-rules]
args:
  - name: packages
    description: The Go packages whose interfaces feel wrong, as paths, and the symptom (mocks for everything, huge interfaces, an interfaces package, Java-style IUserService).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not "go test ./...".
    type: string
output_contract:
  format: markdown
  sections: [Interface inventory, Target shape, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer. Go interfaces are satisfied implicitly, which changes where they belong: the package that uses a dependency declares the small interface it needs (`type orderStore interface { Get(ctx, id) (Order, error) }`), and the package that provides the implementation exports a concrete type. "Accept interfaces, return structs." Code written with habits from Java or C# does the opposite: a producer package exports `UserService` interface plus `userServiceImpl`, constructors return the interface, a central `interfaces` package holds everything, and each interface has twenty methods and exactly one implementation, created only to generate mocks.

Costs: big interfaces force fakes to implement methods the test does not use; returning an interface hides methods and fields from callers and prevents adding methods without breaking every implementation; and a shared interfaces package creates import cycles and couples unrelated consumers.

When an interface earns its place: several real implementations (storage backends, payment providers), a boundary that tests need to fake (network, clock, filesystem), or a consumer that needs only a few methods. Watch for behaviour traps: a nil pointer stored in an interface is not a nil interface (`err != nil` surprises), so changing return types from interface to concrete can change nil checks; type assertions and type switches on the old interface break when it disappears; and exported interfaces are part of a module's public API, so removing them from a library is a breaking change.
</context>

<task>
Reshape the interfaces in {{packages}}.

1. List every interface: where it is declared, methods, implementations (search for types with those methods), consumers, which methods each consumer actually calls, and whether it is exported from a module others import.
2. For each, decide: keep, move to the consumer and shrink to the methods it uses, or remove in favour of the concrete type. Constructors that return interfaces return concrete types. List public API changes separately. Wait for approval.
3. Apply the changes package by package; regenerate or rewrite test doubles as small hand-written fakes for the shrunken interfaces where the project allows.
4. Check nil-interface comparisons and type assertions affected by the change. Run `go vet`, `go build ./...` and the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each package, and report results.
</task>

<constraints>
- No behaviour change; nil checks and type assertions are reviewed where return types change.
- Do not remove exported interfaces from a module other modules import without listing it as a breaking change and agreeing.
- Do not introduce new mocking frameworks.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Interface inventory
Table: interface, declared in, methods, implementations, consumers and methods used, exported.
## Target shape
Decision per interface, and public API changes.
## Diff
The change.
## Check
go vet, build and test results.
</output_format>
