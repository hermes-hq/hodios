---
schema: 1
id: cpp-style-rules
kind: rule
title: C++ style rules
description: Standing rules for modern C++ an assistant writes, covering RAII, no raw new or delete, const by default, value semantics, span and string_view at boundaries, and sanitizer-clean code.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, game-developer, embedded-engineer]
stack: [cpp]
requires: [none]
risk: read-only
tags: [modern-cpp, raii, ownership, undefined-behaviour, sanitizers, core-guidelines]
applies_to: ["**/*.cpp", "**/*.cc", "**/*.cxx", "**/*.hpp", "**/*.hh", "**/*.hxx"]
pairs_with:
  personas: [cpp-engineer]
  prompts: [debug-native-crash]
  rules: [test-writing-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change C++ code in this project:

**Standard and tooling**
- Use the language standard set in the build (CMake `CMAKE_CXX_STANDARD` or the compiler flags); do not use features from a newer standard.
- Code must compile without warnings under the project's flags (at least `-Wall -Wextra -Wpedantic` or `/W4`, treated as errors) and pass clang-tidy and the formatter configured in the repo.
- Tests must pass under AddressSanitizer and UndefinedBehaviorSanitizer, and ThreadSanitizer for concurrent code, where the project has those builds.

**Ownership and resources**
- Every resource is owned by an object whose destructor releases it (RAII): memory, files, sockets, locks, handles.
- No raw `new` or `delete` in application code. Use values first, then `std::make_unique`, then `std::make_shared` only when ownership is truly shared.
- Raw pointers and references never own. Use `T&` for a required non-owning argument, `T*` for an optional one, and smart pointers in signatures only when the function takes or shares ownership.
- Follow the rule of zero: let members manage resources so the class needs no custom copy, move or destructor. If you must write one, write or delete all five.
- Lock mutexes with `std::scoped_lock` or `std::unique_lock`, never manual `lock()`/`unlock()`.

**Interfaces and values**
- Mark everything `const` that does not change: locals, member functions, references and pointers to data that is only read. Use `constexpr` for compile-time constants.
- Pass cheap types by value, read-only larger types by `const&`, and sinks by value then `std::move`. Accept `std::string_view` and `std::span<const T>` for read-only views at function boundaries, and never store a view beyond the lifetime of what it points to.
- Return values rather than out-parameters; use `std::optional` for "maybe a value" and the project's error type (`std::expected`, a result type or exceptions) consistently.
- Make single-argument constructors `explicit`, and mark overrides with `override` and leaf classes `final` where it helps.
- Use `enum class`, strong types for units and ids, and `[[nodiscard]]` on functions whose result must not be ignored.

**Undefined behaviour**
- Never read uninitialised memory: initialise every variable at declaration and every member with a default member initialiser.
- Check bounds before indexing, or use `.at()` where the cost is acceptable; do not do pointer arithmetic outside an array.
- Do not hold references, pointers or iterators into a container across operations that may reallocate or erase.
- No signed integer overflow, no shifts by the width or more, no type punning through pointer casts (use `std::bit_cast` or `std::memcpy`), and no C-style casts; use `static_cast` and justify any `reinterpret_cast` or `const_cast` in a comment.
- Do not return references to locals or capture locals by reference in a lambda that outlives them.

**Errors and exceptions**
- Follow the project's policy on exceptions. Where exceptions are used, throw by value and catch by `const&`, and keep destructors and move operations `noexcept`. Where they are disabled (games, embedded), return error values and check every one.

**Style**
- Prefer standard algorithms and range-based `for` over hand-written index loops when they read clearly.
- Keep headers minimal: include what you use, forward-declare where it avoids heavy includes, no `using namespace` in headers.
- Prefer `auto` when the type is obvious or verbose, and spell it out when it carries meaning.
- Follow the C++ Core Guidelines where the project has no rule of its own.
