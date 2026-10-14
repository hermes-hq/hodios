---
schema: 1
id: explore-free-text-column
kind: prompt
title: Explore a free-text column
description: Profiles a free-text column in a dataset (blanks, lengths, languages, common words and phrases, samples by segment) with code, so you can decide how to categorise or analyse it.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, product-manager, researcher]
stack: [python]
requires: [none]
inputs: [dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [text-analysis, n-grams, text-profiling, open-text, nlp]
pairs_with:
  prompts: [classify-text-records, explore-dataset, anonymize-dataset]
args:
  - name: text_column
    description: What the column is (support ticket descriptions, cancellation reasons, notes fields), the number of rows, other columns you can segment by (date, product, rating), and 15 to 30 sample values with personal data removed.
    type: text
    required: true
  - name: decision
    description: What you need to decide, for example "which categories to use for a dropdown", "whether the notes field explains refunds" or "what to tag automatically". Optional.
    type: text
  - name: tool
    description: What you will run the code in.
    type: enum
    enum: [pandas, polars, r, sql]
    default: pandas
output_contract:
  format: markdown
  sections: [First read of the samples, Profiling code, What to look for, Candidate categories, Next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who looks at free-text fields before anyone builds categories for them. A text column is usually messier than it looks: a large share is blank, "n/a", "-", "see above" or pasted templates; a few long values are emails or logs copied in; staff use internal abbreviations and product codes; several languages are mixed; and the same field means different things in different teams or periods (a form change in March alters what people write). Counting single words mostly returns stopwords and product names, so two- and three-word phrases, counts by segment and time, and reading random samples tell you more. Free text often contains names, emails, phone numbers and account numbers, so profiling should mask them before results are shared. The aim is to understand the column well enough to choose: fixed categories, a codebook for manual coding, automatic classification, or leaving it alone.
</context>

<task>
Profile this free-text column with {{tool}}.

<text_column>
{{text_column}}
</text_column>

{{#decision}}Decision to support: {{decision}}{{/decision}}

1. Read the samples and note what you see: placeholder values, templates, languages, abbreviations, personal data, and different kinds of content mixed in one field.
2. Write profiling code: share of blank and placeholder values (with the placeholder list made from the samples), length distribution in characters and words with the longest examples, language detection on a sample if several languages appear, top two- and three-word phrases after lowercasing and removing stopwords, phrase counts by one or two segment columns and by month, and a reproducible random sample of 50 values per segment for reading.
3. Mask emails, phone numbers and long digit strings before any output that will be shared, and say that names need a separate step.
4. Say what patterns in the results would matter and what each implies.
5. From the samples, propose candidate categories as hypotheses, each with the sample values that suggest it, and say how to test them on the full data.
6. Recommend the next step (dropdown or form change, codebook and manual coding, automatic classification, or no further work) with the reason.
</task>

<constraints>
- Use only libraries commonly available for {{tool}} and say what to install; no paid services.
- Present candidate categories as hypotheses from a sample, not findings; never give category shares from the samples as if they were the full column.
- Do not quote personal data from the samples back in the answer.
- Do not run sentiment scoring by default; mention it only if the decision needs it, with its limits on short and domain-specific text.
- If the samples are too few or too uniform to say anything, say so.
</constraints>

<output_format>
## First read of the samples
Bullets of observations.

## Profiling code
One code block producing each profile, with comments.

## What to look for
A table: result, what it would mean, what to do.

## Candidate categories
A table: category, description, example values from the sample, how to test.

## Next step
The recommendation and why.
</output_format>
