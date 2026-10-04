---
schema: 1
id: clean-survey-export
kind: prompt
title: Clean a raw survey export with a decision log
description: Cleans a raw survey export in the project files with reproducible code, checking speeders, straight-lining, duplicates and attention checks, recoding scales and logging every decision.
category: data-exploration
version: 1.0.0
status: incubating
stage: [build, verify]
role: [researcher, data-analyst, ux-researcher]
requires: [repo-read, file-write, shell]
inputs: [dataset, file]
output: [code, table, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [survey-data, data-cleaning, speeders, straight-lining, attention-checks, codebook]
pairs_with:
  prompts: [analyze-survey-results, analyze-likert-data, write-survey-questionnaire, compute-survey-margin-of-error]
  personas: [statistician, data-analyst]
args:
  - name: data
    description: Path to the raw export in the project (CSV, TSV, SPSS or Excel), or its column list and a few sample rows, plus where the questionnaire or variable labels are.
    type: text
    required: true
  - name: survey_tool
    description: The survey platform that produced the export, so its header rows, metadata columns and preview-response markers can be handled. "any" to detect them from the file.
    type: string
    default: any
  - name: rules
    description: Pre-registered or agreed exclusion rules and thresholds, for example "exclude completion under 40% of median time; exclude failing both attention checks". Without them, problem responses are flagged but not excluded.
    type: text
output_contract:
  format: markdown
  sections: [Export structure, Exclusion flow, Flags not excluded, Recoding log, Codebook, Files written, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Raw survey exports are messy in specific ways: extra header rows holding question text and internal ids, preview and test responses mixed with real ones, partial responses, metadata columns with IP addresses or locations, multi-select answers in one cell or spread across columns, "don't know" coded as a number that sits on the scale, reverse-coded items, and open text with personal details. The cleaning choices change the results, so they must be scripted from the untouched raw file, follow rules fixed in advance where they exist, and be logged so a reader can see how many responses each rule removed. Cleaning by hand in a spreadsheet, or excluding responses because they look odd after seeing the results, undermines the analysis.
</context>

<task>
Clean this survey export.

<data>
{{data}}
</data>
Survey tool: {{survey_tool}}.
{{#rules}}
<exclusion_rules>
{{rules}}
</exclusion_rules>
{{/rules}}

1. Inspect the project: find the raw export and any questionnaire, codebook or existing analysis code, and the language the project already uses (R, Python or other). Never modify the raw file; write all outputs to a new location such as a `clean/` folder, and write the cleaning as a script that runs end to end from the raw file.
2. Read the export structure: header rows, metadata columns, the respondent id, timestamps and duration, completion status, and how preview or test responses are marked. Report it before changing anything.
3. Remove preview and test responses and responses with no consent recorded, and count each.
4. Apply the exclusion rules exactly as written, in the order given, counting how many responses each removes and keeping the excluded rows in a separate file with the reason. Without rules, compute these flags but do not exclude: incomplete (by the share of required items answered), speeders (duration below a stated fraction of the median, with the fraction reported), straight-lining (zero variance across each grid of five or more items), failed attention checks, duplicate respondents (same id, or identical answers plus matching metadata), and inconsistent answers between related items.
5. Recode: scale labels to numbers in the questionnaire's direction; reverse-coded items, named and verified against the item wording; "don't know", "not applicable" and "prefer not to say" to explicit missing codes, never to a scale point; multi-select into one indicator column per option; "other, please specify" back into existing options only when the text clearly matches, logged.
6. Tidy open text: trim whitespace, keep the original text, and flag (do not delete) responses containing names, emails, phone numbers or other identifying details for the user to redact.
7. Remove or separate direct identifiers and sensitive metadata (IP address, precise location, email) from the analysis file, keeping a protected linking file only if the user needs one.
8. Write a codebook: variable name, question text, type, values and labels, missing codes, and derived variables.
9. Verify: rerun the script from the raw file and confirm the output is identical; reconcile counts (raw rows minus each exclusion equals final rows); spot-check five respondents from raw to clean; and run the project's tests or add a small test for the recoding if the project has a test setup.
</task>

<constraints>
- Never exclude a response on a judgement call that is not in the rules; flag it and leave the decision to the user.
- Do not change thresholds after seeing how many responses they remove; if a rule looks wrong, say so and ask.
- Never alter answers to make them consistent; flag inconsistencies.
- Do not print identifying data into the report; refer to respondents by id.
- If the export cannot be found or read, or the questionnaire is needed to recode safely and is missing, say what is missing and stop.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Export structure
What the file contains and how it was read.
## Exclusion flow
Table: Step | Rule | Removed | Remaining, from raw rows to final rows.
## Flags not excluded
Table: Flag | Count | Definition used, for the user to decide on.
## Recoding log
One line per decision: variable, from, to, reason.
## Codebook
Where it is written, and a summary of derived variables.
## Files written
One line per file.
## Verification
The checks run and their real results.
</output_format>
