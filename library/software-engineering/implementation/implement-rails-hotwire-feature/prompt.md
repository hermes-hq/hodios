---
schema: 1
id: implement-rails-hotwire-feature
kind: prompt
title: Build a Rails feature with Hotwire
description: Implements an interactive Rails feature with Turbo Frames, Turbo Streams and small Stimulus controllers, server-rendered and tested, instead of adding a JavaScript SPA.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, backend-engineer, software-engineer]
stack: [rails]
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
tags: [hotwire, turbo, stimulus, server-rendered, system-tests]
args:
  - name: feature
    description: The interaction to build, for example "inline edit of a task title", "comments that appear live for everyone on the page".
    type: text
    required: true
  - name: realtime
    description: Whether other users must see changes without reloading.
    type: enum
    enum: ["no", "yes"]
    default: "no"
output_contract:
  format: markdown
  sections: [Approach, Changes, Tests, Verification, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hotwire keeps HTML on the server and sends small updates, so most interactive features need little JavaScript. The common mistakes: a failed form re-render returns 200, so Turbo ignores it (Turbo needs status 422 for invalid forms, `:unprocessable_entity`, or `:unprocessable_content` on Rack 3.1 and later, and 303 `:see_other` after non-GET redirects); a frame id in the response does not match the requesting frame, so the user sees "Content missing"; a link inside a frame meant to leave the frame lacks `data-turbo-frame="_top"`; broadcasts are added for something only the current user needs to see; and Stimulus controllers grow into a hand-written SPA.
</context>

<task>
Implement this feature with Hotwire:

{{feature}}

Live updates for other users needed: {{realtime}}.

1. Read `Gemfile`, `config/importmap.rb` or the JS bundler config, existing Stimulus controllers, and two or three existing views and controllers. Check the Rails and turbo-rails versions and follow their conventions.
2. Pick the smallest tool for each part and say why:
   - Turbo Drive: whole-page navigation, already on.
   - Turbo Frame: replace one region on request (inline edit, tabs, pagination inside a panel, lazy-loaded sections with `loading: "lazy"`).
   - Turbo Stream response: update several regions after a form submit (append the new item, reset the form, update a counter).
   - Turbo Stream broadcast over Action Cable: only when other users must see the change. On Turbo 8, `broadcasts_refreshes` with page refreshes by morphing (`turbo_refreshes_with method: :morph`) is often simpler than many targeted broadcasts; use it if the project already does.
   - Stimulus: client-only behaviour (toggle, autosize, copy to clipboard, character count). Keep each controller small and generic.
3. Use `dom_id` for every frame and target id so responses line up. Wrap edit and show partials in the same `turbo_frame_tag`.
4. In controllers, respond to `turbo_stream` and `html` formats. Render invalid forms with status 422 (the symbol the project and its Rack version use) and redirect after non-GET with `status: :see_other`. Keep the HTML fallback working, so the feature still works without JavaScript where practical.
5. If realtime is "yes": broadcast from the model or controller with `broadcasts_to` or `broadcast_append_to`/`broadcast_replace_to`, subscribe with `turbo_stream_from` scoped to the right record, and check that the stream name cannot be used to subscribe to another tenant's data (turbo-rails signs stream names; do not build them from user input).
6. Write a system test (Capybara) that performs the interaction and asserts the page updated without a full reload, plus request tests for the turbo_stream response and the 422 path.
7. Run the tests and the linters the project uses.
</task>

<constraints>
- Do not add React, Vue or a client-side state library for this feature.
- Do not bypass authorization in stream or frame responses; frame requests go through the same controller checks.
- Do not broadcast data the receiving users are not allowed to see.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Which part uses Drive, Frames, Streams, broadcasts or Stimulus, one line each with the reason.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.

## Notes
Version-specific behaviour or follow-ups, or "None".
</output_format>
