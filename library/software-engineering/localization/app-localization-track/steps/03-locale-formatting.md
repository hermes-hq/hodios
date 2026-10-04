# Step 3: Fix locale formatting

1. Replace hand-built dates, times, numbers, currencies, lists and relative times with locale-aware APIs, passing the active locale.
2. Fix layout for text growth (wrapping, no fixed widths); for a right-to-left target, switch to logical CSS properties and set `dir`.
3. Make the locale choice explicit: saved user choice, then device or browser preference, then default, with a fallback chain to English.
4. Add tests that render key screens or functions in English and the target locale.

Sections: Changes, Tests added, Remaining risks. Stop and wait for approval.
