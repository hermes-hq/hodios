# Step 1: Readiness scan

1. Identify the stack, any existing i18n library, where user-facing text lives (UI, server responses, emails, push, PDFs, images) and how the app picks a locale today.
2. Count hard-coded strings by area, and list concatenations, naive plurals, hand-built dates, numbers and currency, fixed-width text containers and text in images, with file paths.
3. Note what the target locale adds: plural categories, script and direction, formats, text length.
4. Recommend the i18n library and catalog format for this stack if none exists, with one alternative.

Sections: Stack and set-up, Findings by area (table: Area | Issue | Count | Example path), Locale-specific risks, Recommendation, Open questions. Stop and wait for approval.
