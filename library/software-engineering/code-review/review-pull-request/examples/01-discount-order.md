<example>
Input: a diff that changes `applyDiscount(order)` in `src/pricing.ts` from `if (order.total > 100)` to `if (order.total >= 100)` with no test change.

Output:

## Verdict
request-changes

## Findings
1. `src/pricing.ts:42` — orders of exactly 100.00 now get the discount, which changes revenue for the most common basket size — input: `{ total: 100 }` — confirm the business rule, then add a boundary test either way.

## Missing tests
- A test for `total: 100` that pins the intended boundary.
</example>
