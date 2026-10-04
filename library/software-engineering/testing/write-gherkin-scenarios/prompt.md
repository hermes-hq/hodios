---
schema: 1
id: write-gherkin-scenarios
kind: prompt
title: Write Gherkin scenarios
description: Turns acceptance criteria into declarative Given/When/Then scenarios with one behaviour each, scenario outlines for data variants and business language that survives UI changes. Use in BDD teams.
category: testing
version: 1.0.0
status: incubating
stage: [verify, design]
role: [qa-engineer, business-analyst, product-manager, software-engineer]
requires: [none]
inputs: [ticket, spec, text]
output: [tests, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [bdd, gherkin, cucumber, specification-by-example, acceptance-tests]
pairs_with:
  prompts: [write-acceptance-criteria, write-manual-test-cases]
args:
  - name: acceptance_criteria
    description: The user story and its acceptance criteria, business rules and examples, as written in the ticket.
    type: text
    required: true
  - name: domain_terms
    description: The words the business uses for things in this area (for example "member", "basket", "policyholder"), and existing step phrases your suite already has.
    type: text
output_contract:
  format: markdown
  sections: [Rules found, Feature file, Step vocabulary, Questions for the three amigos]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user works in a team that uses Gherkin (Cucumber, SpecFlow or Reqnroll, Behave, Behat or similar) and wants scenarios that serve as living documentation and automated acceptance tests. Scenarios go wrong in familiar ways: imperative UI scripts ("When I click the 'Submit' button") that break with every redesign; several behaviours in one scenario; incidental detail that hides the rule; Given steps that perform actions; Then steps that check implementation details; and invented rules nobody agreed.

Good scenarios are declarative ("When the member renews with an expired card"), use the business's own words, show one rule with a concrete example each, and expose gaps in the criteria as questions instead of filling them silently.
</context>

<task>
<acceptance_criteria>
{{acceptance_criteria}}
</acceptance_criteria>
{{#domain_terms}}

<domain_terms>
{{domain_terms}}
</domain_terms>
{{/domain_terms}}

1. Extract the business rules (one line each) from the criteria, and for each rule the examples that illustrate it: the main example, boundary examples and the counter-example where the rule does not apply.
2. Write one `Feature` with a short description of the value (As a / I want / So that only if it adds meaning). Group scenarios under `Rule:` keywords, one per business rule.
3. For each example, write a scenario:
   - Title states the behaviour and condition ("Renewal is refused when the card has expired").
   - Given: state only, in past or present tense, no UI actions. When: one business action. Then: an observable business outcome, not database rows or HTTP codes, unless the audience is an API consumer.
   - Three to seven steps; use `And` sparingly; no conjunction steps ("When I log in and add an item").
   - Include only the data the rule depends on; push the rest into step definitions or defaults.
4. Use `Scenario Outline` with `Examples` only when the same behaviour varies by data (for example price bands); keep tables narrow with column names in business terms. Use a `Background` only for Given steps shared by every scenario in the feature, at most three lines.
5. Reuse existing step phrases from the domain terms where they fit; list the steps the team must implement, with parameter types.
6. List questions where the criteria are silent or contradictory (what happens at exactly the limit, which role can do this, what the user sees on failure). Do not encode an answer for them; mark the affected scenario with a `@question` tag.
</task>

<constraints>
- No UI element names, CSS selectors, URLs or waits in steps.
- One behaviour per scenario; no scenario longer than seven steps.
- Do not invent business rules; anything not in the criteria becomes a question.
- Valid Gherkin syntax that the common runners parse.
</constraints>

<output_format>
## Rules found
Numbered list.
## Feature file
One fenced `gherkin` block.
## Step vocabulary
Table: step phrase | type (Given, When, Then) | parameters | new or existing.
## Questions for the three amigos
Bullets, each naming the rule and scenario it affects.
</output_format>
