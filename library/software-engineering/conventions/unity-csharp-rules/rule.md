---
schema: 1
id: unity-csharp-rules
kind: rule
title: Unity C# rules
description: Standing rules for Unity C# scripts covering serialized private fields, lifecycle order, no per-frame allocations or Find calls, ScriptableObjects for data, physics timing and null checks.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [game-developer]
stack: [unity]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [monobehaviour, scriptableobject, garbage-collection, game-loop, serialization]
applies_to: ["Assets/**/*.cs", "Packages/**/*.cs"]
pairs_with:
  rules: [csharp-style-rules]
  prompts: [untangle-unity-god-monobehaviour]
  personas: [game-developer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Unity C# scripts in this project:

**Know the project first**
- Read `ProjectSettings/ProjectVersion.txt` for the Unity version and check which input system, render pipeline and packages are installed before using their APIs. Match the scripting conventions and namespaces already in `Assets/`.
- Never edit `.meta` files, scene or prefab YAML by hand unless asked; describe the Inspector change instead.

**Fields and serialization**
- Expose tuning values with `[SerializeField] private`, not `public` fields. Use properties for read access from other scripts.
- Add `[Tooltip]` and `[Range]` or `[Min]` to designer-facing values. Give every serialized field a sensible default.
- Renaming a serialized field loses the values set in scenes and prefabs; use `[FormerlySerializedAs("oldName")]` when you rename one.
- Unity cannot serialize properties, dictionaries, interfaces or generic types without help. Do not rely on them appearing in the Inspector.

**Lifecycle**
- `Awake` caches references on the same object (`GetComponent`), `OnEnable` subscribes to events, `Start` reads other objects that are initialised in their own `Awake`, `OnDisable` unsubscribes. Every subscription has a matching unsubscription.
- Do not depend on the order of `Awake` or `Update` between different scripts; if order matters, make it explicit with a manager call or Script Execution Order and say so.
- Use `Update` for input and non-physics logic, `FixedUpdate` for forces and Rigidbody movement, `LateUpdate` for cameras that follow. Multiply per-frame movement by `Time.deltaTime`; do not use `deltaTime` for forces applied in `FixedUpdate`.

**No per-frame waste**
- Never call `GameObject.Find`, `FindObjectOfType` (or `FindFirstObjectByType`), `GetComponent` or `Camera.main` in `Update`, `FixedUpdate` or other hot paths. Cache in `Awake` or inject a reference.
- Avoid allocations in per-frame code: no LINQ, no string concatenation, no `new` lists, no boxing, no lambdas that capture. Use the non-allocating physics queries (`RaycastNonAlloc` or the overloads that take a results buffer).
- Use object pooling (`UnityEngine.Pool.ObjectPool` where available) for frequently spawned objects instead of `Instantiate` and `Destroy` every time.
- Compare tags with `CompareTag`, not `tag ==`. Cache `Animator.StringToHash` and `Shader.PropertyToID` values.

**Data and architecture**
- Keep shared configuration and static data in `ScriptableObject` assets, not in hard-coded constants or duplicated prefab values.
- Keep MonoBehaviours small and focused on one responsibility. Put game rules in plain C# classes that can be tested without a scene.
- Communicate between systems with C# events, UnityEvents or ScriptableObject event channels instead of deep `GetComponent` chains or singletons that every script reaches into. If the project already uses a singleton or DI framework, follow it.

**Null checks and destroyed objects**
- Unity objects override `==`: a destroyed object compares equal to `null`, but `?.` and `??` bypass that check. Use `if (obj != null)` or `TryGetComponent` for Unity objects; do not use `?.` on them.

**Coroutines and async**
- Stop coroutines you start when the object is disabled. Cache `WaitForSeconds` instances used in loops.
- With `async`/`await` (or `Awaitable` in recent versions), check that the object still exists after every await and pass a cancellation token tied to the object's lifetime.

**Before you finish**
- Make sure the project compiles with no new console errors or warnings, and run the Edit Mode or Play Mode tests that cover the change if the project has them. Say what you checked and what needs a manual play test.
