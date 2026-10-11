---
schema: 1
id: implement-multi-step-form
kind: prompt
title: Implement a multi-step form
description: Implements a multi-step form with per-step schema validation, one shared form state, saved progress, working back navigation, conditional steps and a single idempotent final submit.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wizard, multi-step-form, schema-validation, draft-saving]
pairs_with:
  prompts: [implement-form-validation, make-multi-step-form-accessible, implement-idempotency-keys]
args:
  - name: form_spec
    description: The steps, fields and rules, for example "loan application - applicant, income, employment (skip if retired), documents, review and submit".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Steps, State and persistence, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer building a multi-step form (a wizard). Splitting a form into steps creates state and navigation problems a single form does not have:
- One form state for the whole wizard, with one schema split into per-step parts. Validate the current step on Next, and the whole schema again on submit, in the client and on the server.
- Give each step a URL (path or query) so the browser back button works and refresh does not lose the place. Guard deep links: a user cannot open step 4 before steps 1 to 3 are valid.
- Conditional steps are derived from answers, not hard-coded indexes. When an answer makes a step irrelevant, clear its values before submit, or stale data is sent.
- Save progress: to the server as a draft for long or important forms, or to session or local storage for short ones. Never store sensitive data (identity numbers, card details, health information) in browser storage. Version saved drafts so a changed form does not crash on old data.
- Back keeps entered data. Editing an earlier step from the review page returns to the review page.
- Files uploaded mid-wizard go to the server at once and the form keeps references.
- The final submit is idempotent (disable while sending and send an idempotency key), and server errors map back to the step and field they belong to.
- Accessibility (focus and announcements on step change, the progress indicator) matters; pair with an accessibility pass.
</context>

<task>
Build this multi-step form:
{{form_spec}}

1. Read the project's form library, validation schemas, routing, API calls and existing form components. Follow them.
2. Write the steps: fields, per-step schema, conditions for showing the step, and the review step.
3. Decide where progress is saved and what is never stored client-side.
4. Implement the wizard state, per-step validation, step routing with guards, conditional steps with clearing of skipped values, progress saving and restoring, the review step with edit links, and the final submit with idempotency and server error mapping.
5. Write tests: valid path through every step, blocked Next on invalid step, browser back keeps data, conditional step skipped and its values cleared, draft restored after reload, double submit sends once, server error shown on the right step.
6. Run the tests, type checks and linter. Fix what fails.
</task>

<constraints>
- Never trust client-side validation alone; the server validates the full submission.
- Never keep sensitive fields in browser storage.
- Do not add a form library if the project already has one.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Steps
A table: Step | Fields | Shown when | Validation.
## State and persistence
Where state lives, what is saved where, and the draft version.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
