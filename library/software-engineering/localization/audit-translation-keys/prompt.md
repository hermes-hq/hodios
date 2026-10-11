---
schema: 1
id: audit-translation-keys
kind: prompt
title: Audit translation keys against the code
description: Cross-checks string catalogs against the code that uses them to find missing, unused, duplicate and dynamically built keys, then proposes a safe clean-up with nothing deleted on a guess.
category: localization
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [frontend-engineer, mobile-engineer, software-engineer]
requires: [repo-read, shell]
inputs: [repo, file]
output: [report, table, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [translation-keys, message-catalog, dead-code]
pairs_with:
  prompts: [extract-ui-strings, automate-translation-file-sync]
args:
  - name: scope
    description: Folders, packages or apps to audit, and where their catalogs live if known.
    type: text
    required: true
  - name: source_locale
    description: The locale whose catalog is the source of truth, for example en or en-US.
    type: string
    default: en
  - name: i18n_library
    description: i18n library or catalog format in use, for example i18next, vue-i18n, FormatJS, gettext, Android strings.xml. Leave empty to detect it.
    type: string
output_contract:
  format: markdown
  sections: [Setup found, Missing keys, Unused keys, Duplicates and near-duplicates, Dynamic keys, Clean-up plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Catalogs drift. Keys stay behind after a screen is deleted, new code calls keys nobody added to the source catalog, and two keys hold the same English for no reason. A naive grep makes this worse: keys built at runtime (`t("status." + state)`, `t(\`plan.${tier}.name\`)`), keys passed through props or config, keys used only by a server or an email template in another package, and keys referenced from translation files themselves (nested `$t(...)` references) all look "unused" to a text search. Deleting those breaks production in every locale at once, and translators pay again when keys come back.
</context>

<task>
Audit translation keys in {{scope}}. Source locale: {{source_locale}}.
{{#i18n_library}}i18n library: {{i18n_library}}.{{/i18n_library}} If no library is named, detect it from dependencies and catalog files.

1. Map the setup: every catalog file per locale and namespace, the lookup functions and components (`t`, `useTranslations`, `<Trans>`, `getString`, `_()`, `R.string.*`), and any key prefixes added by namespaces or scoped helpers.
2. Collect keys used in code with a parser or a precise search per lookup form. Resolve namespace prefixes so the used key matches the catalog key. Include server code, email and push templates, and config files that hold keys.
3. Find dynamic keys: any lookup whose argument is not a string literal. For each, list the pattern and the set of catalog keys it can reach, and mark those keys as used. If the set cannot be worked out, mark the whole prefix as "do not touch".
4. Compare against the source catalog:
   - **Missing:** used in code, absent from the source catalog. Note the fallback the user sees today (raw key, empty, English).
   - **Unused:** in the catalog, not reachable from any literal or dynamic use. Give the confidence (high when no prefix match exists anywhere in the repo, low otherwise).
   - **Locale gaps:** keys present in the source but absent from target locales, and keys present in a target locale but not in the source (orphans).
5. Find duplicates: identical keys defined twice in one file (the last one usually wins silently), and different keys with identical source text. For identical text, say whether they should stay separate (different context, for example "Open" the verb and "Open" the status) or merge.
6. Run the project's own extraction or lint command if one exists and compare its result with yours; explain differences.
7. Write a clean-up plan in order: add missing keys first, then remove high-confidence unused keys in one reviewable change, keep low-confidence ones behind a deprecation note for one release, and add a check so drift does not return.
</task>

<constraints>
- Do not delete or rename any key in this run; propose changes only.
- Never report a key as unused when a dynamic lookup could reach it.
- Keep merges of identical text to cases where the context is the same; translators need separate keys when meaning differs.
- Count keys per category and per locale so the scale is clear.
{{> output/uncertainty}}
</constraints>

<output_format>
## Setup found
Catalogs, locales, lookup forms and the commands you ran.

## Missing keys
| Key | Used in | Current fallback |

## Unused keys
| Key | Confidence | Evidence |

## Duplicates and near-duplicates
| Keys | Source text | Merge or keep, and why |

## Dynamic keys
| Pattern | Location | Keys it can reach |

## Clean-up plan
Numbered steps with the check that prevents drift.
</output_format>
