---
schema: 1
id: generate-platform-token-files
kind: prompt
title: Generate platform token files
description: Generates web, iOS and Android token files from a source token file, with naming transforms, theme variants and a check that every alias resolves and every token appears per platform.
category: design-systems
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, mobile-engineer, designer]
requires: [repo-read, file-write, shell]
inputs: [config, repo]
output: [code, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [design-tokens, token-pipeline, theming, dtcg, css-variables, multi-platform]
pairs_with:
  prompts: [define-design-tokens, audit-hardcoded-styles-against-tokens, design-dark-mode]
  personas: [design-systems-lead]
args:
  - name: tokens_source
    description: Path to the source token file or folder, for example "tokens/" with W3C Design Tokens (DTCG) JSON, or a design-tool export.
    type: string
    required: true
  - name: platforms
    description: "Target platforms and formats, for example 'web: CSS custom properties and a TypeScript object; iOS: Swift (SwiftUI Color and CGFloat); Android: Compose Kotlin and XML resources'."
    type: text
    required: true
  - name: output_dir
    description: Folder where generated files go, for example "packages/tokens/dist". Generated files are overwritten here and nowhere else.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Source analysis, Pipeline, Generated files, Resolution report, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A token source is only useful once each platform gets values it can use natively, with names that follow its conventions and themes it can switch. Hand-maintained copies drift within weeks. The common failures in a token pipeline are aliases that do not resolve (or resolve to the wrong theme), colours converted with the wrong colour space or lost alpha, dimensions emitted as `px` on platforms that use points or dp, names that collide after case conversion, and themes emitted as separate full copies so that a missing token in one theme goes unnoticed. A good pipeline uses a maintained token build tool where one fits the stack, keeps the source as the single truth, and fails loudly when a token cannot be produced.
</context>

<task>
Generate platform token files from {{tokens_source}} for these platforms:

<platforms>
{{platforms}}
</platforms>

Write generated output only under {{output_dir}}.

1. **Analyse the source.** Read {{tokens_source}}. Identify the format (DTCG `$value`/`$type`, a legacy `value` format, or a design-tool export), the token groups and types, the tiers (primitive, semantic, component), how themes are expressed (separate files, sets, modes or `$extensions`), and any composite tokens (typography, shadow, border). If the format is unrecognisable or the file is missing, stop and report what you found.
2. **Check the repository.** Look for an existing token build setup (a config for a token build tool, scripts in the package manifest, earlier output). Extend it rather than creating a parallel pipeline. If none exists, set one up with a maintained open-source token build tool installed as a dev dependency through the project's package manager, and explain the choice in one paragraph. Do not write a bespoke converter if a maintained tool handles the format.
3. **Define transforms per platform:**
   - **Names:** web kebab-case custom properties with an optional prefix (`--ds-color-text-default`); TypeScript camelCase keys; Swift camelCase static members grouped by type; Android snake_case resource names and Compose camelCase vals. Detect and report collisions after conversion.
   - **Colours:** hex or `rgb()` with alpha for web; Swift `Color` or `UIColor` with correct sRGB or Display P3 components; Android `#AARRGGBB` in XML and `Color(0xAARRGGBB)` in Compose. Keep alpha.
   - **Dimensions:** `rem` or `px` for web as the existing code uses; points (`CGFloat`) for iOS; `dp` for spacing and `sp` for font sizes on Android. State the base used for any rem conversion.
   - **Composite tokens:** typography to platform text styles where supported; shadows to the nearest native elevation or shadow API with a note on what cannot be represented.
   - **References:** keep semantic tokens as references to primitives where the format supports it (CSS `var()`), otherwise resolve them.
4. **Emit themes.** For each theme, emit the semantic layer per platform (for example `[data-theme="dark"]` blocks or `prefers-color-scheme` for web, asset catalogue appearances or theme objects for iOS, `values-night` resources or a Compose colour scheme for Android), following the repository's existing switching mechanism if any.
5. **Generate.** Run the build. Write files to {{output_dir}} with a header comment saying they are generated and must not be edited by hand, naming the source.
6. **Verify.** Produce a resolution report: every source token, whether it resolved, and whether it appears on every platform and in every theme. Fail on unresolved aliases, circular references, missing theme values and name collisions. Compile or type-check the outputs where a toolchain is available (TypeScript compile, Swift or Kotlin syntax check, Android resource validation), and run the repository's tests. Spot-check three colours and three dimensions by hand across platforms.
</task>

<constraints>
- Never edit the token source to make the build pass; report source problems instead.
- Write only inside {{output_dir}} plus the build configuration and package manifest entries the pipeline needs.
- Install only well-known, maintained packages from the official registry and say what you installed.
- If a platform needs a toolchain that is not available here, generate the files, mark that platform as not compiled, and say so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Platforms, themes, token count, files generated, pass or fail.
## Source analysis
Format, groups, tiers, themes and composite tokens found.
## Pipeline
Tool and configuration used or created, and the transforms per platform as a table (Concern, Web, iOS, Android).
## Generated files
Tree of {{output_dir}} with a short excerpt of each file type.
## Resolution report
| Token | Type | Resolved | Web | iOS | Android | Themes complete |
Only failures in full; successes as a count.
## Verification
Commands run and their actual results, and the spot checks.
## Follow-ups
Source problems to fix, unsupported token types, and how to wire the build into CI.
</output_format>
