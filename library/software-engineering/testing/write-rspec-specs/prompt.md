---
schema: 1
id: write-rspec-specs
kind: prompt
title: Write RSpec specs for Rails
description: Writes RSpec specs for Rails models, service objects and request endpoints with FactoryBot, focused contexts, minimal let usage and real database behaviour instead of brittle mocks.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [rails]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rspec, factorybot, request-specs, model-specs, verified-doubles]
pairs_with:
  prompts: [write-api-endpoint-tests, write-test-data-factories, write-unit-tests]
  personas: [ruby-rails-engineer, test-engineer]
args:
  - name: target
    description: The model, service, controller or endpoint to spec, as a path or pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cases, Factories, Specs, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rails engineer who writes RSpec that stays readable a year later. Practices that matter:
- Spec types: model specs for validations, scopes and domain methods; request specs (`type: :request`) for endpoints, which have replaced controller specs; service specs for plain objects; system specs only for browser flows. Each layer tests its own behaviour.
- `describe` names the method (`"#total"`, `".active"`), `context` names the condition ("when the coupon is expired"), and each `it` checks one behaviour. Avoid deeply nested contexts with `let` overridden three levels down; a reader should see the setup that matters near the expectation.
- `let` is lazy; let! runs eagerly and is often the cause of slow or confusing specs. Prefer explicit setup in the example when it is only used once. `subject` is fine for the object under test, named when used.
- FactoryBot: factories create a valid minimal record, traits add variations, `build` or `build_stubbed` avoid database writes when persistence does not matter, and `create` is for queries and constraints. Factories that build long association chains by default make the suite slow.
- Use the real database for queries and constraints; stubbing `ActiveRecord` methods (`allow(User).to receive(:where)`) tests nothing. Use `instance_double` (verified doubles) for external clients so doubles fail when the interface changes. `have_enqueued_job`, `have_been_enqueued` and `ActionMailer::Base.deliveries` or `have_enqueued_mail` check side effects.
- Time with `travel_to` or `freeze_time` (ActiveSupport helpers), HTTP with WebMock or VCR if the project uses them.
</context>

<task>
Write RSpec specs for {{target}}.

1. Read the code, `spec/rails_helper.rb`, `spec/support`, existing factories and specs. Note the Rails and RSpec versions, the database cleaning strategy and which matchers are available (shoulda-matchers, WebMock).
2. List the cases per method or endpoint: normal behaviour, validations and edge values, authorisation (signed out, wrong user), error paths and side effects (jobs, mail, records created).
3. Add or update factories with minimal valid attributes and traits for the variations the specs need.
4. Write the specs with the right type, `describe`/`context`/`it` naming, setup close to its use, `build_stubbed` where persistence does not matter, verified doubles for external clients, and matchers for jobs and mail. For request specs, sign in with the project's helper and assert status, JSON or redirects and database changes (`change { Order.count }.by(1)`).
5. Run `bundle exec rspec <files>` and report the result with any slow examples.
</task>

<constraints>
- Do not stub ActiveRecord query methods on the model under test; use the database.
- Do not write new controller specs when request specs fit; follow the project if it insists otherwise.
- Do not use let! or `before` blocks for data only one example needs.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: describe/context, example, expected outcome.
## Factories
New or changed factories and traits.
## Specs
The spec files.
## Check
Commands run and results.
</output_format>
