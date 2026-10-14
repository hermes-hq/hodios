---
schema: 1
id: review-event-schema-change
kind: prompt
title: Review an event schema change
description: Reviews a change to an Avro, Protobuf or JSON Schema event or message schema for backward and forward compatibility with existing consumers, stored history and replays, and proposes a safe rollout.
category: data
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, data-engineer, architect]
stack: [kafka]
requires: [none]
inputs: [diff, schema]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [schema-evolution, schema-registry, avro, protobuf, compatibility, event-streaming]
pairs_with:
  prompts: [design-change-data-capture, design-event-driven-system, review-database-migration]
  personas: [data-engineer]
args:
  - name: schema_change
    description: The old and new schema, or a diff, for the topic, queue or stream.
    type: text
    required: true
  - name: context
    description: Optional. Serialisation format, registry and its compatibility setting, who produces and consumes the events, retention or long-term storage of old events, and whether consumers replay history.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Compatibility analysis, Consumer impact, Safer change, Rollout order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Events outlive the code that wrote them. A topic with long retention, a compacted topic or a data lake holding raw events means new consumers will read old data and old consumers may read new data, so a schema change must be judged in both directions. Backward compatible means consumers on the new schema can read old data; forward compatible means consumers on the old schema can read new data; full means both, and transitive variants check against every previous version, not just the last. Each format has its own rules: in Avro, adding a field needs a default for backward compatibility and removing one needs a default in the old schema for forward compatibility, renames need aliases, and enum additions break old readers unless a default symbol exists; in Protobuf, field numbers must never be reused or retyped (reserve removed numbers and names), and `required` is a trap; in JSON Schema, compatibility depends on `additionalProperties` and is easy to get wrong. Semantic changes (same field, new meaning or unit) pass every registry check and still break consumers. The rollout order follows the compatibility type: upgrade consumers first for backward changes, producers first for forward ones.
</context>

<task>
<schema_change>
{{schema_change}}
</schema_change>
{{#context}}
Context: {{context}}
{{/context}}

1. Identify the format and every change: fields added, removed, renamed, retyped, made optional or required, defaults changed, enum symbols changed, nesting changed, field numbers or names reused.
2. For each change, decide backward, forward and full compatibility under that format's rules, and whether the registry's configured mode (if given) would accept it.
3. Look for semantic changes that pass mechanical checks: unit or currency changes, meaning changes, new nullability of a field consumers treat as always present, timestamps changing precision or time zone.
4. Assess consumer impact: which consumers break, when (on deploy, on replay of old events, on reading new events), and what happens to stored history.
5. Propose a safer version of the change: defaults, aliases, reserved numbers, a new optional field alongside the old one with a deprecation period, or a new topic or versioned event type when the change is truly breaking.
6. Give the rollout order (consumers or producers first), the registry compatibility mode to use, and the checks to add to CI (registry compatibility test against all previous versions).
</task>

<constraints>
- Apply the rules of the stated format; if the format is unclear, say so and analyse for the most likely one with the assumption stated.
- Do not call a change safe because the registry accepts it; address semantics separately.
- Mark registry or library behaviour you are unsure of as "to verify".
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Safe, safe with changes, or breaking, in one line, with the compatibility type.

## Compatibility analysis
Table: Change | Backward | Forward | Notes.

## Consumer impact
Bullets.

## Safer change
The revised schema.

## Rollout order
Numbered steps, plus CI checks.
</output_format>
