---
schema: 1
id: pseudo-localize-ui
kind: prompt
title: Pseudo-localize the UI
description: Adds a pseudo-localisation build or mode that expands, accents and brackets strings to reveal truncation, concatenation and hard-coded text, then lists the issues found by screen.
category: localization
version: 1.0.0
status: incubating
stage: [verify, build]
role: [frontend-engineer, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: optional
level: intermediate
tags: [pseudo-localization, i18n-testing, truncation, hard-coded-strings, text-expansion]
pairs_with:
  prompts: [extract-ui-strings, review-i18n-readiness, plan-rtl-support]
args:
  - name: i18n_setup
    description: How the app is localised, for example "React with i18next, JSON catalogs in public/locales/<lng>/", "iOS String Catalogs", "Android strings.xml", "gettext .po files". Include the source language and the build or run command.
    type: text
    required: true
  - name: expansion_percent
    description: How much longer to make each string, as a percentage of its length. Around 30 to 40 simulates long languages such as German or Finnish; short strings expand more in real translations.
    type: number
    default: 35
output_contract:
  format: markdown
  sections: [Approach, Changes, How to run, Issues found, Not checked, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pseudo-localisation finds localisation bugs before any translator is paid. Each catalog string is transformed so it stays readable to the team but looks foreign: accented characters (`Ŝàvé`) reveal encoding and font problems, padding reveals truncation and layouts that cannot grow, and brackets around every string (`[Ŝàvé ~~~]`) reveal text that was concatenated from pieces or never extracted at all, because anything on screen without brackets did not come from the catalog. It must never leak into a real locale or production build, and it must keep placeholders, plural syntax and markup intact or it creates bugs of its own.
</context>

<task>
Add pseudo-localisation to this project and report what it reveals.

i18n setup: {{i18n_setup}}
Expansion: {{expansion_percent}} percent.

1. Read the i18n setup: catalog format and location, how the current locale is chosen, the interpolation, plural and rich-text syntax, and how the app is built and run. If the setup described above does not match the repository, or there is no catalog at all, stop and report that, since there is nothing to pseudo-localise.
2. Choose the lightest integration that fits: a generated pseudo locale (for example `en-XA`, or the platform's built-in pseudolocales on Android) produced from the source catalog by a script or the i18n library's post-processor, selectable through the normal locale switch in development and test builds only. Prefer a built-in or already installed tool over writing a new transformer.
3. The transformation must:
   - Replace letters with accented look-alikes and pad each string by about {{expansion_percent}} percent (more for very short strings), then wrap it in visible brackets.
   - Leave untouched every placeholder and variable, ICU or platform plural and select syntax, HTML or markup tags, escape sequences and format specifiers. Verify this by parsing the generated catalog with the same library the app uses.
   - Optionally support a right-to-left variant if the product ships to RTL locales, marked as optional.
4. Exclude the pseudo locale from production builds and from the list of languages shown to users. Never modify the real source or translated catalogs.
5. Run the app (or its UI tests, screenshot tests or storybook) in the pseudo locale and walk the main screens. Record: text without brackets (hard-coded or concatenated), clipped or overlapping text, layouts that break with longer strings, characters that render as boxes, placeholders that appear raw, and strings split into fragments. If you cannot run the UI yourself, provide the run command and a checklist instead, and say so.
6. Add a short note to the developer docs on how to switch to the pseudo locale.
</task>

<constraints>
- Do not change real translations, source strings or keys, and do not fix the issues you find in this task; list them.
- Keep the pseudo locale out of production builds; show how you verified that.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
The tool or script chosen, the pseudo locale code, and how it is generated.

## Changes
A unified diff.

## How to run
Commands to generate the catalog and start the app or tests in the pseudo locale.

## Issues found
| Screen or component | Issue type | Evidence (string, key or file:line) | Suggested fix |

## Not checked
Screens or flows you could not reach.

## Verification
Commands run, proof that placeholders and plural syntax survived, and proof that the pseudo locale is excluded from production builds.
</output_format>
