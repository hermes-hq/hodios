# Step 1: Profile the raw data

1. Load `{{input_path}}` read-only, checking encoding, delimiter, header rows, sheet names and footer rows. Record exactly how it was read.
2. Profile every column: inferred type vs intended type, missing count and share (including disguised missing values like "", "N/A", "-", 0 or 1900-01-01), distinct count, top values, min and max, and examples of values that fail the intended type.
3. Look for structural problems: duplicate rows and duplicate keys, inconsistent category spellings and case, mixed date formats and time zones, units mixed in one column, numbers stored as text with thousands separators or currency symbols, leading and trailing spaces, outliers beyond plausible ranges, and rows that break cross-column logic (end before start, totals that do not add up).
4. Write the profiling code as the first part of the pipeline script, so the profile can be regenerated.

Write the artifact: How it was read, Shape, Column profile (Column | Intended type | Missing | Distinct | Range or top values | Problems), Structural problems with counts. Continue to step 2.
