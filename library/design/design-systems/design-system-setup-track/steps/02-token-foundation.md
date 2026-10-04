# Step 2: Token foundation

Turn the audit into a small set of decisions everything else references.

1. Start with two tiers: primitives (palette, spacing, radii, type scale, shadows) and semantic tokens named by purpose (`color.text.default`, `color.border.focus`). Add component tokens later, only when needed.
2. Collapse near-duplicates into scales (spacing on a 4 or 8 px base, six to eight type sizes, two or three radii) and map each old value to its new token so migration is mechanical.
3. Keep semantic colours to tens, not hundreds, and list text-on-background pairs that must meet WCAG contrast (4.5:1 body, 3:1 large text and UI), marked "to verify" unless computed.
4. Decide naming, the source of truth and how tokens reach code (CSS custom properties, a theme object, platform files). Defer extra themes unless the pilot needs them.

Output: token tables, old-to-new mapping for the worst offenders, source-of-truth decision, contrast pairs.

Stop. Ask the user to approve the tokens before choosing components.
