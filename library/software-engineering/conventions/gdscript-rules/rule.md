---
schema: 1
id: gdscript-rules
kind: rule
title: GDScript rules
description: Standing rules for Godot 4 GDScript an assistant writes, covering static typing, signals over hard references, scene composition, physics in the physics step and exported tuning values.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [game-developer]
stack: [godot]
requires: [none]
risk: read-only
tags: [gdscript, static-typing, signals, scene-composition, gameplay-code]
applies_to: ["**/*.gd"]
pairs_with:
  personas: [game-developer]
  prompts: [implement-platformer-character-controller, implement-game-ai-behavior]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change GDScript in this Godot project:

**Version and typing**
- Write Godot 4 syntax (`@export`, `@onready`, `super()`, `Callable`, typed signals) unless the project is on Godot 3; check `project.godot` before assuming.
- Type everything: variables, parameters, return values (`-> void` included), arrays (`Array[Enemy]`) and dictionaries where the project's version supports typed dictionaries. Use `:=` only when the type is obvious from the right-hand side.
- Give reusable scripts a `class_name` and use it in type hints instead of `Node`.
- Keep the project's typing warnings (untyped declaration, unsafe property access, unsafe call) enabled; do not silence them with `@warning_ignore` without a comment.

**Scenes and nodes**
- Compose behaviour from child nodes and small scenes rather than deep inheritance chains.
- Get child nodes with `@onready var x: Type = $Path` or `%UniqueName`; never use long `get_node("../../..")` paths that reach up or across the tree.
- Communicate upward and sideways with signals; call methods downward on children you own. A node must not assume who its parent is.
- Connect signals in code with `signal_name.connect(_on_...)` or in the editor, consistently with the project, and name handlers `_on_<node>_<signal>`.
- Use autoloads only for truly global services (save system, audio bus, settings), not as a shortcut for passing references.
- Free nodes with `queue_free()`, and check `is_instance_valid()` before using a reference that might have been freed.

**Frame loop and physics**
- Move physics bodies and run gameplay that affects collisions in `_physics_process(delta)`; use `_process(delta)` for visuals and UI only.
- Multiply movement and timers by `delta`; never assume a frame rate.
- Use `CharacterBody2D/3D` with `move_and_slide()` for characters and set `velocity`; do not set the position of a `RigidBody` directly, use forces, impulses or `_integrate_forces`.
- Read input actions from the Input Map (`Input.is_action_pressed("jump")`), not raw key codes, and handle one-shot input in `_unhandled_input` where UI should be able to consume it.

**Performance**
- Do not allocate in per-frame code: no new arrays, dictionaries, strings or nodes inside `_process` or `_physics_process` when they can be reused or pooled.
- Cache node references and resources instead of calling `get_node`, `find_child` or `load` every frame; use `preload` for resources known at compile time.
- Prefer groups, signals and areas over scanning the whole tree each frame.
- Use timers or `await get_tree().create_timer(t).timeout` for delays instead of counting frames, and make sure the awaiting node can be freed safely.

**Designer-facing values**
- Expose tunable gameplay values with `@export` and a range hint (`@export_range(0, 1000, 10, "suffix:px/s")`), grouped with `@export_group`, instead of hard-coded numbers.
- Put shared data (enemy stats, item definitions) in custom `Resource` classes rather than in scripts.

**Style**
- Follow the official GDScript style guide: `snake_case` for functions and variables, `PascalCase` for classes and nodes, `CONSTANT_CASE` for constants, private members prefixed with `_`, and the standard member order (signals, enums, constants, exports, vars, onready vars, built-in callbacks, public then private methods).
- Keep scripts small and single-purpose; split one that handles several unrelated concerns.
