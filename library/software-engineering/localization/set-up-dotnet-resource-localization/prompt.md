---
schema: 1
id: set-up-dotnet-resource-localization
kind: prompt
title: Set up .NET resource localisation
description: Sets up ASP.NET Core localisation with resx resources, IStringLocalizer, request localisation middleware, data annotation messages, culture-aware formatting and ICU available in containers.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [resx, istringlocalizer, request-localization, data-annotations, invariant-globalization]
pairs_with:
  prompts: [design-localized-api-errors, implement-locale-formatting, localize-server-sent-messages]
args:
  - name: project
    description: .NET version, ASP.NET Core MVC, Razor Pages, Blazor or minimal APIs, hosting (container image, OS), and any localisation already present.
    type: text
    required: true
  - name: locales
    description: Cultures to support, default first, for example "en-US, de-DE, ja-JP".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Services and middleware, Resources, Usage, Validation messages, Plurals and formatting, Runtime environment, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ASP.NET Core localisation fails quietly. `IStringLocalizer<T>` finds a `.resx` file by the type's full name relative to the assembly's root namespace and the configured `ResourcesPath`; when the name or folder is off by one segment, it returns the key itself and sets `ResourceNotFound`, so the page shows keys and nothing errors. Shared strings need a marker class whose namespace matches the resource file location. `UseRequestLocalization` must run before routing and endpoints, and distinguishes `SupportedCultures` (formatting of dates and numbers) from `SupportedUICultures` (which strings are shown); setting only one gives English text with German dates or the reverse. The default providers are query string, cookie and `Accept-Language`, in that order; a route-based provider needs to be added explicitly. Data annotation messages are localized only after `AddDataAnnotationsLocalization`. resx has no plural support, so counts need an ICU-capable library or per-category keys. Container images built with `InvariantGlobalization` enabled (common in slim and Alpine images) treat every culture as invariant, so formatting is wrong everywhere even though the code is right; full globalization needs ICU libraries in the image. `IHtmlLocalizer` encodes arguments but not the resource string, so resources containing HTML must be trusted.
</context>

<task>
Set up localisation in this .NET project:

{{project}}

Cultures: {{locales}}.

1. Run `dotnet build` and `dotnet test` and record the baseline. Stop and report if they fail.
2. Read `Program.cs`, the project file (root namespace, `InvariantGlobalization`), the Dockerfile if any, existing `.resx` files, controllers or pages, models with data annotations, and background services.
3. Services and middleware: `AddLocalization` with a `ResourcesPath`, `AddViewLocalization` and `AddDataAnnotationsLocalization` where views and annotations are used, and `UseRequestLocalization` placed before routing with `SupportedCultures` and `SupportedUICultures` both set from {{locales}}, a default culture, and the provider order the product needs (add a route data provider if URLs carry the culture).
4. Resources: a folder layout that matches namespaces, a `SharedResource` marker class for common strings, one neutral `.resx` plus one per culture, comments on each entry for translators, and named placeholders documented in comments since resx uses positional `{0}`.
5. Usage: inject `IStringLocalizer<T>` in services and controllers, `IViewLocalizer` in views, and check `ResourceNotFound` in a test helper so missing resources fail tests instead of rendering keys.
6. Validation messages: move `ErrorMessage` text to resources via data annotations localization, and return localized problem details with stable error codes from the API.
7. Plurals and formatting: for counts, choose an ICU MessageFormat library or per-category keys and state which; format dates, numbers and currency with `CultureInfo.CurrentCulture` set by the middleware, never `InvariantCulture` for user-facing values. For Blazor WebAssembly, load the globalization data the app needs.
8. Runtime environment: check `InvariantGlobalization` in the project and Dockerfile; if enabled, propose turning it off and adding ICU libraries to the image, and state the image size trade-off. Background services and hosted jobs must set `CurrentCulture` and `CurrentUICulture` from the recipient's stored culture.
9. Convert a representative slice (one page or endpoint, one validation model, one message with a count) and list the rest.
10. Run build and tests again, including a test that requests the slice with two cultures and asserts no resource keys appear; report results.
</task>

<constraints>
- Do not set `CultureInfo.DefaultThreadCurrentCulture` globally to fix a per-request problem.
- Do not invent translations; culture-specific resx files carry source text marked for translation, or rely on the neutral file.
- Do not change the base image without stating the size and security update impact.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build and tests before changes.

## Services and middleware
`Program.cs` changes and provider order.

## Resources
Folder layout, naming rules and marker class.

## Usage
Localizer examples in services, controllers and views, and the missing-resource check.

## Validation messages
Annotation and problem details changes.

## Plurals and formatting
Chosen plural approach and formatting calls.

## Runtime environment
Globalization mode, container image and background culture handling.

## Verification
Commands and requests with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
