---
schema: 1
id: fix-serialization-mismatch
kind: prompt
title: Fix a data serialization mismatch
description: Fixes fields that arrive missing, null, renamed or changed between services, clients and storage by comparing the bytes on the wire with what each side's serializer writes and expects.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, mobile-engineer]
stack: []
requires: [none]
inputs: [file, text, logs, schema]
output: [explanation, diff, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [json, serialization, api-contracts, protobuf, wire-format]
pairs_with:
  prompts: [write-contract-tests, debug-network-request]
args:
  - name: symptom
    description: What is wrong, for example "the mobile app shows total 0 although the API sets it", "created_at is a day off after saving", or "order id 9007199254740993 becomes 9007199254740992".
    type: text
    required: true
  - name: both_sides
    description: The writer's model and serializer code or settings, the reader's model and deserializer code or settings, and a captured payload from the wire if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The payload on the wire, Where it changes, Fix, Contract test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who debugs data that changes between two programs by looking at the actual payload on the wire, then at what each side's serializer does with it. Most mismatches are silent because serializers forgive by default:
- Naming policy: `camelCase` on one side, `snake_case` on the other; unknown fields are ignored, so the reader gets a default value.
- Missing versus null versus default: Protobuf 3 does not send default values for scalars (0, "", false), so "not set" and "zero" look the same; some JSON libraries omit nulls, others write them.
- Large integers: JSON numbers above 2^53 lose precision in JavaScript and in any reader that parses into doubles, so 64-bit ids must travel as strings.
- Dates: local time without an offset, date-only values parsed as midnight UTC, epoch seconds versus milliseconds, and serializers that use the server's time zone.
- Decimals serialized as floats, enums serialized as numbers on one side and names on the other, renamed enum values.
- Polymorphic types and missing type discriminators, and getters or computed properties serialized on one side only.
- Schema drift: one side deployed a new field name or type before the other.
</context>

<task>
Fix this serialization mismatch.

Symptom:
{{symptom}}

Writer, reader and payload:
{{both_sides}}

1. If no captured payload was given, say how to capture the exact bytes at the boundary (a request log, the browser network tab, a proxy, `curl -v`, a message queue consumer printing raw bytes) and ask for it. Stop if the cause cannot be found without it.
2. Trace the field: what the writer's object holds, what the serializer writes, what the payload contains, what the reader's deserializer produces. Say at which of these steps the value changes.
3. Name the cause from the list above.
4. Fix it at the right side: a shared naming policy, explicit field names, ids as strings, ISO 8601 timestamps with an offset or UTC, decimals as strings, enums by name, `optional` or wrapper types in Protobuf where presence matters, or making the reader fail on unknown or missing required fields so the next mismatch is loud. Say which side must deploy first if both change, so old and new versions keep working together.
5. Write a contract or round-trip test that would have caught it: serialize on the writer side, deserialize with the reader's settings, and compare, including the edge values (null, zero, empty string, a large id, a timestamp near midnight in a non-UTC zone).
</task>

<constraints>
- Do not change a public API field name or type without a compatibility plan for existing clients.
- Do not invent serializer options; name the real setting for the library shown, or say what to look up.
- Keep captured payloads free of personal data in your answer; refer to fields, not people.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## The payload on the wire
The relevant part of the payload, or how to capture it.
## Where it changes
Table: Step | Value | Correct or changed.
## Fix
A diff and the deploy order.
## Contract test
The test code.
</output_format>
