---
schema: 1
id: untangle-unity-god-monobehaviour
kind: prompt
title: Untangle a giant Unity MonoBehaviour
description: Splits a giant Unity MonoBehaviour into focused components and plain C# classes, keeping serialized fields, scene and prefab references and execution order intact.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [game-developer]
stack: [unity]
requires: [repo-read, file-write]
inputs: [file]
output: [plan, diff, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [monobehaviour, serialized-fields, component-design, prefabs]
pairs_with:
  personas: [game-developer]
args:
  - name: script
    description: The MonoBehaviour to split, as a path or pasted code, the Unity version, and how it is used (on which prefabs or scenes, who references it).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Responsibilities, Proposed split, Serialization plan, Diff, Editor checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You split Unity scripts knowing that the code is only half the asset: scenes and prefabs store serialized field values by field name and the script by its GUID in the `.meta` file. Renaming or moving a serialized field without `[FormerlySerializedAs("oldName")]` silently drops the designer-set value. Moving a field into a new component means every prefab and scene instance loses it unless the value is migrated. Renaming the class or file breaks the script reference unless the file is renamed inside the editor so the `.meta` GUID is kept. Other scripts, `UnityEvent` bindings in the inspector, animation events and `SendMessage` calls reference methods by name and are not found by the compiler.

A god MonoBehaviour usually mixes input, movement or physics, health or stats, UI updates, audio and save data. Good targets: plain C# classes (no `MonoBehaviour`) for logic that needs no engine callbacks, which are unit-testable in Edit Mode; small components for things that need `Update`, collisions or inspector fields; `ScriptableObject` for shared configuration. Execution order between `Awake`, `OnEnable` and `Start` across new components is not guaranteed, so dependencies set up in one method of the old script may now race.
</context>

<task>
Split {{script}}.

1. Read the script and list responsibilities with line ranges, every serialized field (public or `[SerializeField]`), Unity callbacks, and methods that may be called by name (UnityEvents, animation events, `SendMessage`, `Invoke`).
2. Propose the split: plain C# classes for engine-free logic, components for engine-facing parts, which component each serialized field moves to. Keep the original class as a coordinator so existing references still resolve. Wait for approval.
3. Write a serialization plan: for every field that moves, how its value is carried over (keep it on the original component, `[FormerlySerializedAs]`, or an editor migration step the user runs on the listed prefabs), and how initialisation order is made explicit (one `Awake` wiring dependencies, or `[DefaultExecutionOrder]`).
4. Apply the split in steps and add Edit Mode tests for the extracted plain classes.
5. List the editor checks the user must run, because you cannot open the editor: compile, open each affected prefab and scene, confirm inspector values, play the main flows, check the console.
</task>

<constraints>
- No designer-set value may be lost; never rename or move a serialized field without a carry-over plan.
- Keep the class name, file name and namespace of the original component unless the user renames it in the editor.
- Do not claim prefabs or scenes were verified; say what the user must check.
- Do not change gameplay tuning, physics settings or frame-rate dependent behaviour.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Responsibilities
Table: line range, responsibility, serialized fields, callbacks.
## Proposed split
Classes and components with their job.
## Serialization plan
Table: field, old owner, new owner, carry-over method.
## Diff
The code change.
## Editor checks
Checklist for the user to run in the editor.
</output_format>
