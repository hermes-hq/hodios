---
schema: 1
id: phoenix-liveview-rules
kind: rule
title: Phoenix and LiveView rules
description: Standing rules for Phoenix and LiveView covering contexts as boundaries, thin LiveViews, mount and handle_params, streams for lists, assigns discipline, Ecto changesets and PubSub.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [phoenix]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [liveview, contexts, ecto, pubsub, function-components]
applies_to: ["lib/**/*.ex", "lib/**/*.heex", "test/**/*.exs", "priv/repo/migrations/**"]
pairs_with:
  rules: [elixir-style-rules]
  personas: [elixir-phoenix-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Phoenix app:

**Know the project first**
- Check the Phoenix and LiveView versions in `mix.exs`. Function components, `~H`, streams, `to_form`, verified routes (`~p`) and `<.link>` came in specific versions; use what this project supports and follow the existing generator output style.

**Contexts are the boundary**
- Web modules (controllers, LiveViews, components) call context functions (`Accounts.get_user!/1`, `Billing.create_invoice/2`). They never call `Repo` directly or build Ecto queries.
- Put a new function in the context that owns the data. Do not create a context per table; keep cross-context calls through public functions only.
- Pass the current user or scope into context functions that need authorization and enforce access there, not only in the UI.

**LiveView**
- Keep LiveViews thin: `mount`, `handle_params`, `handle_event` and `handle_info` call contexts and update assigns.
- `mount/3` runs twice (static render, then connected). Subscribe to PubSub, start timers and do expensive work only `if connected?(socket)`. Load data that depends on URL params in `handle_params/3`.
- Use `stream/3` for long or growing collections instead of keeping full lists in assigns. Keep assigns small; do not store large structs you do not render.
- Use `assign_async` or `start_async` for slow loads so the page renders immediately with a loading state.
- Validate every event payload: `phx-value-*` and form params come from the client and can be forged. Re-check permissions in `handle_event` for actions on a resource.
- Use `push_patch` for changes within the same LiveView and `push_navigate` across LiveViews; keep URL state (filters, page, selected tab) in params so reload and back work.

**Forms and Ecto**
- Build forms from changesets with `to_form/1`, validate on `phx-change` with an action set, and save on `phx-submit`. Put validation in changeset functions, constraints in the database with matching `unique_constraint` and `foreign_key_constraint` calls.
- Use separate changesets for different operations (registration versus profile update) instead of one that casts every field.
- Avoid N+1 with `preload` in the context query. Use `Repo.transaction` or `Ecto.Multi` for multi-step writes.
- Migrations: one change per migration, safe for running app versions (add nullable, backfill, then constrain); never edit one that has run in production.

**Components and templates**
- Use function components with declared `attr` and `slot`, and reuse the core components module. Avoid `Phoenix.HTML.raw` with user content.
- Use `~p` verified routes, never hand-written path strings.

**PubSub and processes**
- Broadcast from the context after a successful write, with topic names defined in one place. Handle the message in `handle_info` and update the stream.
- Do not start unsupervised processes from LiveViews for work that must finish; use a Task.Supervisor, Oban or the project's job system.

**Before you finish**
- Run `mix format`, `mix compile --warnings-as-errors`, Credo if used, and `mix test` including `Phoenix.LiveViewTest` for LiveViews you changed. Say what you ran.
