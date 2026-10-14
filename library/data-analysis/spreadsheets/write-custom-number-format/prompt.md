---
schema: 1
id: write-custom-number-format
kind: prompt
title: Write a custom number format
description: Writes custom number format codes for K and M abbreviations, negatives in brackets, leading zeros, durations over 24 hours, units and conditional colours, with what each code displays.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [number-format, format-codes, display-units, abbreviations]
pairs_with:
  prompts: [write-conditional-formatting-rules, build-excel-report-from-data, build-sheets-dashboard]
args:
  - name: display_goal
    description: How the numbers should look, with examples of raw values and what you want shown, for example "1234567 shows as 1.2M, -500 shows as (500) in red".
    type: text
    required: true
  - name: app
    description: The application, for example Excel 365, Excel for Mac, Google Sheets.
    type: string
    required: true
  - name: regional_format
    description: Optional. Your regional format if not English, because decimal and thousands separators in format codes follow it.
    type: string
output_contract:
  format: markdown
  sections: [Format code, How to apply it, What it displays, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write number format codes for reports and dashboards. A custom format changes only how a value is displayed: the cell still holds the full number, so sums, lookups and exports use the real value. Experts rely on that and also know its edges. A code has up to four sections separated by semicolons: positive; negative; zero; text. A trailing comma after the digit placeholders divides the display by 1,000 per comma (`#,##0,"K"`, `0.0,,"M"`). Conditions in square brackets (`[>=1000000]`) replace the positive and negative sections, and Excel allows only two conditions plus a fallback, so a K/M/B ladder needs care. Colours go in brackets (`[Red]`, `[Blue]`). `[h]:mm` shows durations past 24 hours, where `h:mm` wraps to the next day. `00000` pads to five digits for display, but a code that must keep its leading zeros in exports or lookups should be stored as text. Literal text goes in quotes; `_)` adds alignment space and `*` repeats a fill character in Excel.

App: {{app}}
{{#regional_format}}Regional format: {{regional_format}}{{/regional_format}}

<display_goal>
{{display_goal}}
</display_goal>
</context>

<task>
1. Restate the rule for each kind of value: positive, negative, zero, text, and any size thresholds. If the examples conflict or leave a case open (for example how zero or 999,950 should show), state the assumption you are making.
2. Write the format code. If the goal needs more conditions than the app allows in one code, say so and give the best split: two codes applied with conditional formatting, or a helper column with TEXT for display only.
3. Explain each section of the code in one line.
4. Show a table of sample values, including negatives, zero, rounding boundaries (999,950 in thousands, 0.05 in one decimal) and blanks, with exactly what the cell will display.
5. Give the steps to apply it in {{app}}: Format Cells > Number > Custom in Excel (Ctrl+1), or Format > Number > Custom number format in Google Sheets.
</task>

<constraints>
- Only use format syntax the app supports. Google Sheets supports most Excel codes, including conditions, colours and the thousands comma, but test fill characters and some colour names, and say so.
- In a non-English regional format, the decimal and thousands characters in the code may differ; adjust them or warn.
- Never suggest a format to fix data that is wrong (numbers stored as text, durations stored as text). Say the data needs converting first.
- Point out when the display could mislead a reader, for example rounding 0.04 to 0.0 or showing 1.0M for 950,000.
- When the result must be used as text elsewhere (a label, a concatenated sentence), give the matching TEXT() formula, noting that TEXT format codes are localised in some Excel languages.
</constraints>

<output_format>
## Format code
The code in a code block.

## How to apply it
Short numbered steps for the app.

## What it displays
Table: value in cell | displayed as.

## Limits
Bullets: what the format cannot do, display-versus-value warnings, and a TEXT() equivalent if useful.
</output_format>
