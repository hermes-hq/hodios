---
schema: 1
id: localize-wordpress-plugin-or-theme
kind: prompt
title: Make a WordPress plugin or theme translatable
description: Makes a WordPress plugin or theme translation-ready with a matching text domain, escaping translation functions, plurals and context, translator comments, POT generation and JavaScript translations.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [wordpress]
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
tags: [text-domain, pot-file, wp-i18n, translation-functions, wp-cli]
pairs_with:
  prompts: [build-wordpress-plugin, extract-ui-strings, write-translator-context-notes]
args:
  - name: project
    description: Plugin or theme, its slug, whether it is or will be on the WordPress.org directory, block editor or JavaScript UI used, minimum WordPress version, and current i18n state.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Text domain and loading, PHP strings, JavaScript and blocks, POT and language files, Checks, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WordPress translation readiness has strict, mechanical rules. The text domain must be a string literal identical to the plugin or theme slug; WordPress.org language packs are matched by slug, and a variable or constant as the domain (or as the string) cannot be extracted by the tools. Plugins hosted on WordPress.org no longer need to call `load_plugin_textdomain`, but recent WordPress versions report a notice when translations for a domain are loaded too early, typically from translation calls running at plugin load before `init`, which is a common cause of new notices after core updates. Output must use the escaping variants (`esc_html__`, `esc_html_e`, `esc_attr__`) because translators' strings are untrusted. Counts use `_n` with `sprintf` and `number_format_i18n`, and the count is passed twice (once to pick the form, once to print it). Ambiguous words need `_x`. Several placeholders need numbered forms (`%1$s`, `%2$s`) so translators can reorder them, and each string with placeholders needs a `translators:` comment on the line directly above. Splitting a sentence around a link into separate strings makes it untranslatable. JavaScript strings use `@wordpress/i18n` and reach the browser only after `wp_set_script_translations` for that script handle and JSON files generated from the PO files; `block.json` declares its own `textdomain`.
</context>

<task>
Make this WordPress project translation-ready:

{{project}}

1. Record the baseline: run PHPCS with the WordPress standard if configured, any tests, and a build of JavaScript assets. Stop and report if they fail.
2. Read the main plugin file or `style.css` header, the slug, existing translation calls, hooks used at load time, enqueued scripts and any `block.json` files.
3. Text domain and loading: set the `Text Domain` and `Domain Path` headers to the slug and `/languages`; if the project is not hosted on WordPress.org or must support older WordPress versions, load the text domain on `init`. Move any translation calls that run before `init` (for example in constructors or at file load) into hooked code.
4. PHP strings: wrap every user-facing string with the right function: escaping variants for output, `__` for values returned or passed on, `_n` for counts with `number_format_i18n`, `_x` and `_ex` for context, numbered placeholders for two or more values, `translators:` comments directly above any string with placeholders, and whole sentences with markup inserted through placeholders (`wp_kses` against a small allowlist if translators may include tags). Never use variables or constants as the string or the domain.
5. JavaScript and blocks: import `__`, `_n`, `_x` and `sprintf` from `@wordpress/i18n`, declare `textdomain` in each `block.json`, and call `wp_set_script_translations` for every script handle with translated strings, with the path to the `languages` folder.
6. POT and language files: generate the POT with WP-CLI's `i18n make-pot` (excluding build and vendor folders as appropriate), add a script for it, and document `i18n make-json` for producing JavaScript translation files from PO files.
7. Checks: enable the PHPCS WordPress i18n sniff with the text domain configured, and run it.
8. Report the strings converted and any that could not be converted cleanly (dynamic strings, strings built from options).
</task>

<constraints>
- The text domain is always the literal slug; no variables, constants or concatenation in translation calls.
- Never echo translated strings without escaping.
- Do not create translations; only the POT and the tooling.
- Do not change user-visible English text except to join sentence fragments into translatable sentences, and list every such change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Checks before changes.

## Text domain and loading
Headers, loading hook and moved early calls.

## PHP strings
Patterns used, with before and after examples, and a count of converted strings.

## JavaScript and blocks
Imports, `block.json` and script translation registration.

## POT and language files
Commands and scripts.

## Checks
PHPCS sniff results.

## Follow-ups
Strings not converted and why, and changed English text.
</output_format>
