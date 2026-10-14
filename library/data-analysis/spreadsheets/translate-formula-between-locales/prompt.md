---
schema: 1
id: translate-formula-between-locales
kind: prompt
title: Translate a formula between spreadsheet languages
description: Converts formulas between English and localised Excel or Google Sheets function names, argument separators, decimal commas and format codes so they paste and work.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [localisation, function-names, argument-separator, decimal-comma, regional-settings]
pairs_with:
  prompts: [write-spreadsheet-formula, debug-spreadsheet-formula, convert-excel-to-google-sheets]
args:
  - name: formulas
    description: One or more formulas exactly as you have them (from a tutorial, a colleague or a forum answer).
    type: text
    required: true
  - name: from_setup
    description: Where the formula comes from, for example "English Excel tutorial" or "German Excel, Windows".
    type: string
    required: true
  - name: to_setup
    description: Where it must work - application, display language and regional format, for example "Excel 365 in Portuguese (Brazil)" or "Google Sheets, spreadsheet locale France".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Translated formulas, What changed, Check before trusting, If it still fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people paste formulas from English tutorials into localised spreadsheets, and the reverse. Experts know what actually changes. Excel stores formulas in English internally and translates them on screen, so a file shared between languages works; the problem is only formulas typed or pasted as text. In Excel, function names change with the display language (SUM becomes SUMME in German, SOMME in French, SOMA in Portuguese, SUMA in Spanish), TRUE and FALSE are translated, and the argument separator follows the system list separator, usually a semicolon where the decimal separator is a comma. Array constants change too: the row and column separators inside `{ }` differ by locale. Text format codes inside TEXT() are also localised in Excel, so `"yyyy"` may need to be `"JJJJ"` in German or `"aaaa"` in French or Portuguese. Google Sheets keeps English function names by default (there is a setting to show localised names), but its separators follow the spreadsheet locale in File > Settings, and in comma-decimal locales an array literal uses `;` for rows and `\` for columns.

From: {{from_setup}}
To: {{to_setup}}

<formulas>
{{formulas}}
</formulas>
</context>

<task>
1. Identify for both setups: function-name language, argument separator, decimal separator, array-literal separators and whether TEXT format codes are localised. If the target language or region is unclear, ask which display language and regional format the target uses, and stop.
2. Translate each formula: function names, TRUE and FALSE, separators, decimal numbers inside the formula, array constants and format codes in TEXT, keeping cell references, sheet names and quoted text exactly as they are.
3. For any localised function name you are not certain of, keep the English name in a comment beside it and mark it `[CHECK]`, rather than guessing. Point the user to the app's own way to confirm: typing the first letters and reading the autocomplete list, Excel's Insert Function dialog, or Microsoft's Functions Translator add-in for Excel.
4. Explain each change in one line.
5. Give a quick test: one input the user can type with the expected result, so they know the translated formula behaves the same.
</task>

<constraints>
- Do not change the logic of the formula. If you spot a bug, mention it after the translation without fixing it silently.
- Do not invent function names. A wrong translated name produces #NAME? and wastes the user's time; mark uncertainty instead.
- Quoted text, sheet names and named ranges are not translated.
- Note when a function does not exist in the target at all (for example a Sheets-only function pasted into Excel), and offer the nearest equivalent.
- Mention that changing the separator system-wide (Windows regional settings, or the Sheets spreadsheet locale) is an alternative, and what else it changes (dates and number display), so the user can choose.
</constraints>

<output_format>
## Translated formulas
Each formula in a code block, ready to paste, with `[CHECK]` notes where needed.

## What changed
Table: element | original | translated | why.

## Check before trusting
The test input and expected result.

## If it still fails
Three bullets: #NAME? (function name), a formula that shows as text (cell formatted as text or a leading apostrophe), and wrong numbers (decimal separator in data versus formula).
</output_format>
