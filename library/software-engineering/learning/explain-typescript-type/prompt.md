---
schema: 1
id: explain-typescript-type
kind: prompt
title: Explain a complex TypeScript type
description: Explains a hard TypeScript type with generics, conditional, mapped, template literal or infer by evaluating it step by step on concrete inputs and naming the trick each part uses.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, frontend-engineer, fullstack-engineer]
stack: [typescript]
requires: [none]
inputs: [text, file]
output: [explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [type-level-programming, generics, conditional-types, code-reading]
pairs_with:
  prompts: [simplify-typescript-types, fix-typescript-type-error, explain-code]
args:
  - name: type
    description: The type definition, with any helper types it uses.
    type: text
    required: true
  - name: usage
    description: Where it is used, or an example input type, so the evaluation runs on a real case.
    type: text
output_contract:
  format: markdown
  sections: [In one sentence, Piece by piece, Evaluated on examples, Tricks it relies on, Check in your editor, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Complex TypeScript types are small programs that run in the compiler, and they become readable once you evaluate them by hand on a concrete input. The ideas that trip people up are few: conditional types distribute over unions when the checked type is a naked type parameter, and wrapping it in `[T]` stops that; `infer` captures part of a matched type; `never` disappears from unions, which is how filters work; mapped types with `as` remap or drop keys; `keyof` on a union gives only common keys; `T[number]` indexes tuples and arrays; template literal types split strings; recursion has a depth limit; and modifiers such as `-?` and `readonly` change optionality and mutability. Hover output in the editor is often truncated or shows the alias name rather than the result.
</context>

<task>
Explain this TypeScript type:

```ts
{{type}}
```
{{#usage}}
Used like this: {{usage}}
{{/usage}}

1. Say in one sentence what the type computes, in plain words: given what input, what comes out.
2. Break it into its parts in evaluation order. For each: the syntax, what it does, and the TypeScript feature it uses (generic constraint, conditional, distributive conditional, infer, mapped type with key remapping, indexed access, template literal, recursion).
3. Evaluate it step by step on two or three concrete inputs: the usage if given, a typical case, and an edge case (a union, an optional property, an empty object or tuple, `any` or `never`). Show each intermediate type.
4. Name the tricks it relies on and the behaviour that would surprise a reader, especially distribution over unions, `never` filtering and how `any` passes through.
5. Show a small check the reader can paste into their editor or the TypeScript playground to confirm the result, using a type-level assertion such as an `Expect<Equal<...>>` helper defined inline.
</task>

<constraints>
- Evaluate carefully; a wrong intermediate type defeats the purpose. If the result depends on compiler options such as `strictNullChecks` or `exactOptionalPropertyTypes`, say so.
- Explain the type as written. Mention a simpler equivalent only if one clearly exists, in one line.
- If you are unsure of a result, say so and rely on the editor check to settle it.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one sentence
Input to output, in plain words.
## Piece by piece
A table: part, what it does, feature used.
## Evaluated on examples
For each input, the steps as a list of intermediate types.
## Tricks it relies on
Bullets.
## Check in your editor
The type-level assertion as a ts code block, with the expected result.
## Questions
Anything needed to be sure, such as compiler options or helper types not shown.
</output_format>
