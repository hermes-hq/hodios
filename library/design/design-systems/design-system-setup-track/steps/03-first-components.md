# Step 3: The first ten components

Choose the components that pay back fastest.

1. Score candidates from the audit on frequency, number of duplicate implementations, and risk when built wrong (accessibility, data loss). Show the table.
2. Pick about ten by score (often button, inputs, select, checkbox and radio, link, icon, dialog, alert, card, a layout primitive, but follow the scores).
3. For each: variants now and deliberately left out, states, and the accessibility contract (keyboard, accessible name, focus management for overlays).
4. Build or adopt: wrapping an accessible headless library versus building, given capacity and framework, and the later cost of each.
5. Definition of done: design and code match, tokens only, documented, keyboard and screen-reader checked, visual regression snapshot, versioned release.

Output: scoring table, shortlist with scopes, build-or-adopt decision, definition of done.

Stop. Ask the user to approve the shortlist.
