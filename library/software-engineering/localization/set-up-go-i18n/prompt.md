---
schema: 1
id: set-up-go-i18n
kind: prompt
title: Set up i18n in a Go service or CLI
description: Sets up i18n in a Go service or CLI with go-i18n message files, CLDR plurals, language matching with x/text, per-request localizers, extraction and merge, and honest limits on date formatting.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [go]
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
tags: [go-i18n, x-text, language-matcher, accept-language, message-files]
pairs_with:
  prompts: [design-localized-api-errors, localize-server-sent-messages, propagate-locale-through-services]
args:
  - name: project
    description: Service (HTTP or gRPC) or CLI, Go version, where user-facing text is produced (API errors, emails, templates, terminal output), and any i18n already present.
    type: text
    required: true
  - name: locales
    description: Languages to support, default first, for example "en, de, pt-BR".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Library and bundle, Language matching, Messages and plurals, Extraction and translation workflow, Formatting, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Go has no i18n in the standard library. The common choice is go-i18n (v2): a `Bundle` holds messages loaded from TOML, JSON or YAML files, a `Localizer` is created for a list of preferred languages, and messages declare CLDR plural forms (`one`, `few`, `many`, `other`) chosen by a `PluralCount`. Its `goi18n extract` command collects messages defined in code into a source file, and `goi18n merge` produces `translate.*` files with only new or changed messages for translators, a workflow teams skip and then lose translations. `golang.org/x/text` provides language tags and matching: build a `Matcher` from supported tags and match the cookie or user setting and the `Accept-Language` header together; the matched tag can carry extensions such as `-u-rg-`, so use the returned index into the supported list rather than the tag itself. The bundle should be built once at startup and then only read, since concurrent loads are not the intended use; localizers are cheap and per request. Message templates use Go's text template syntax, so template data must be passed as a map or struct and the field names stay identical across languages. A CLI reads the locale from `LC_ALL`, `LC_MESSAGES` and `LANG` (POSIX form such as `de_DE.UTF-8`, or `C`), which must be converted to a BCP 47 tag. The standard `time` package has no localized month or day names, and number formatting needs `x/text/message` or another library.
</context>

<task>
Set up i18n in this Go project:

{{project}}

Languages: {{locales}}.

1. Run `go build ./...`, `go vet ./...` and `go test ./...` and record the baseline. Stop and report if they fail.
2. Find where user-facing text is produced and any existing i18n or message maps. Reuse an existing approach if it is sound.
3. Library and bundle: add go-i18n v2 (or keep the installed library), create one bundle at startup with the default language, register the file format's unmarshal function, and load message files embedded with `embed.FS` so the binary carries its translations.
4. Language matching: build a matcher from {{locales}}; for HTTP, match the user's stored preference or cookie first, then `Accept-Language`, in middleware or an interceptor, and put the localizer in the request context. For a CLI, convert `LC_ALL`, `LC_MESSAGES` and `LANG` to a BCP 47 tag, treating `C` and `POSIX` as the default, and allow a flag override.
5. Messages and plurals: define messages with stable IDs, a description for translators, and plural forms where counts appear; pass `PluralCount` and template data as a map or struct. Handle a missing message by falling back to the default language's text, and log it once, never returning an empty string or the ID to users.
6. Extraction and translation workflow: add `goi18n extract` and `goi18n merge` steps (as a `go generate` directive or Makefile target), document which files translators edit and how finished files are merged back, and commit the active files.
7. Formatting: format numbers with `x/text/message` printers for the matched tag; for dates with month or weekday names, state the gap in the standard library and propose an option (a CLDR-backed library, or numeric ISO-style dates in user-facing text) rather than hand-writing month name tables.
8. Convert a representative slice (one API error, one message with a count, one email or CLI output) and list the rest.
9. Run build, vet and tests again, including table tests that request the slice with several `Accept-Language` values (including an unsupported one and a regional variant) and assert the matched language and plural form.
</task>

<constraints>
- Do not mutate the bundle after startup or share a localizer across requests.
- Do not use the matched tag with extensions as a map key; use the matcher's index.
- Do not hand-write month or weekday name tables for many languages.
- Do not invent translations; non-default files contain source text for translators, or the default is used as fallback.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, vet and tests before changes.

## Library and bundle
Library, startup code and embedded files.

## Language matching
Middleware or CLI locale detection.

## Messages and plurals
Message definitions, plural use and fallback handling.

## Extraction and translation workflow
Commands, file layout and translator hand-off.

## Formatting
Number formatting and the date-name decision.

## Verification
Commands and table tests with real results.

## Follow-ups
Remaining strings and decisions.
</output_format>
