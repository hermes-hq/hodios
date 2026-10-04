# Step 1: UI audit

Find what exists and where inconsistency costs most.

1. If inputs are missing, ask for screenshots of the 10 to 20 most-used screens, the main stylesheet or theme file, and the component folder listing, or give a one-hour collection task (screenshot every distinct button, input, modal and table; grep for hex colours and font sizes). Wait for results.
2. Inventory by element type (colours, type sizes, spacing, radii, shadows, buttons, inputs, modals, tables, alerts, navigation): distinct variants and which product uses each. Mark near-duplicates versus genuine variants.
3. Rank inconsistency by cost: frequency, number of teams rebuilding it, and bugs or accessibility issues caused (missing focus states, low contrast).
4. Note constraints: frameworks that cannot share code, theming or white-label needs, accessibility obligations, products being retired.

Output: inventory table, top five costs, constraints.

Stop. Ask the user to confirm the inventory and which products are in scope.
