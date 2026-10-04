# Step 2: Keyboard and accessibility-tree checks, then a fix plan

For each key flow, in order of importance:

1. Keyboard only: can every control be reached with Tab and operated with Enter, Space and arrows as its role expects; is focus always visible; does focus order follow the visual order; can every dialog, menu and popover be closed with Escape and does focus return to where it was; is there any trap; is there a skip link or landmark navigation.
2. Accessibility tree (through the browser's accessibility snapshot or devtools protocol): every control has a meaningful name, the right role and its current state (expanded, selected, checked, invalid); headings form a sensible outline; form fields are tied to labels and errors; status messages and async updates are announced through a live region or focus move.
3. Visual: reflow at 320 CSS pixels wide and 400% zoom without horizontal scrolling for text, text spacing overrides, non-text contrast of focus rings and control borders, nothing conveyed by colour alone, motion respecting reduced-motion preferences, target sizes.
4. Merge these findings with step 1 by source. Rank by impact on completing the flow, then by number of users and routes affected.

Write the artifact: Manual findings (Flow | Step | Issue | Criterion | Source | How found), Fix plan (Source | Fix | Issues resolved | Regression test), Out of scope (content issues such as captions or alt text that need authors, third-party widgets). Stop and wait for approval.
