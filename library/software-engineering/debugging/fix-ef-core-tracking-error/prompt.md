---
schema: 1
id: fix-ef-core-tracking-error
kind: prompt
title: Fix an Entity Framework Core tracking error
description: Fixes EF Core "instance cannot be tracked", concurrency exceptions, disposed DbContext, second-operation and missing Include bugs by tracing entity state and DbContext lifetime.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, software-engineer]
stack: [dotnet]
requires: [none]
inputs: [stack-trace, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [entity-framework-core, orm, change-tracking, dbcontext, concurrency]
pairs_with:
  prompts: [explain-stack-trace, fix-n-plus-one-queries]
  personas: [dotnet-engineer]
args:
  - name: error
    description: "The exception type, message and stack trace exactly as printed, for example the InvalidOperationException saying an instance of 'Order' cannot be tracked because another instance with the same key is already being tracked."
    type: text
    required: true
  - name: code
    description: The code that loads and saves the entities, how the DbContext is registered (AddDbContext, a factory, a singleton) and where it is used (controller, background service, Blazor component). Include the EF Core version and database provider if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What EF Core is complaining about, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a .NET engineer who fixes EF Core errors by reasoning about the change tracker and the DbContext lifetime, not by sprinkling `AsNoTracking()` or `Detach` calls until the error moves. What experienced engineers know:
- One DbContext tracks one instance per key. "Cannot be tracked because another instance with the same key is already being tracked" usually comes from calling `Update()` or `Attach()` on a detached object (often mapped from a DTO) after the same row was already loaded in that context, or from attaching a graph whose children repeat the same entity.
- `Update()` marks the whole graph Modified, including navigation properties, which can overwrite columns or insert duplicates. Loading the entity and copying values (`Entry(e).CurrentValues.SetValues(dto)`) is usually safer.
- DbContext is not thread-safe. "A second operation was started on this context instance" comes from parallel queries (`Task.WhenAll`, un-awaited calls, `async void`) on one context.
- "Cannot access a disposed context instance" comes from a scoped context captured by a singleton, a background service, a fire-and-forget task or a lazy-loading proxy used after the request ended. `IDbContextFactory` or `IServiceScopeFactory` creates a correctly scoped context.
- In Blazor Server a scoped context lives as long as the circuit, so it grows stale and collides; use a factory per operation.
- `DbUpdateConcurrencyException` means the row version or concurrency token did not match, or zero rows were affected (a deleted row, a wrong key, a trigger). It needs a decision about which write wins, not a retry loop.
- Missing related data is usually a missing `Include`, a navigation loaded by a no-tracking query, or lazy loading not configured; null navigations are not an EF bug.
- Identity resolution differs between tracking, `AsNoTracking()` and `AsNoTrackingWithIdentityResolution()`.
</context>

<task>
Fix this EF Core error.

Error:
{{error}}

Code and DbContext registration:
{{code}}

1. If you can read the repository, open the code that loads and saves the entity, the DbContext registration and every place that context is injected before answering.
2. Say what EF Core is complaining about in plain words: which entity, which key, which operation and which context instance.
3. Trace the cause: where each instance of the entity enters the context, how long the context lives, whether it is shared across threads or outlives its scope, and which state (Added, Modified, Unchanged, Detached) each entity is in at `SaveChanges`.
4. If the code shown is not enough to decide, name the missing piece (the registration, the calling service, the DTO mapping) and ask for it, then stop.
5. Give the smallest fix that matches the cause: load then set values instead of `Update()` on a detached graph, a context per unit of work through a factory or scope, awaiting queries in sequence, an explicit `Include`, or a concurrency resolution with the chosen winner. Show it as a diff.
6. Say how to verify it: a test or request that reproduces the original error and now passes, and logging with `EnableSensitiveDataLogging` only in development if state needs inspecting.
</task>

<constraints>
- Do not make DbContext a singleton or turn off change tracking globally to silence the error.
- Do not catch and ignore `DbUpdateConcurrencyException` or wrap it in a blind retry; state which write should win and why.
- Do not recommend `EnableSensitiveDataLogging` for production.
- Do not invent EF Core APIs; if a behaviour depends on the EF Core version, say which.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What EF Core is complaining about
Entity, key, operation and context, in two or three sentences.
## Cause
The specific code path, or the missing information needed to decide.
## Fix
A diff with a one-line reason for each change.
## Check
How to reproduce the original error and confirm it is gone.
</output_format>
