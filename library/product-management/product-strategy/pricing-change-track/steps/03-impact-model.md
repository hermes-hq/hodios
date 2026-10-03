# Step 3: Impact model

Model the revenue and churn impact of the chosen option so the owner can change any assumption.

1. A table with one row per segment and plan: customers, current MRR, new MRR, change per customer, assumed churn or downgrade caused by the change, and resulting MRR.
2. Write the formula used: `new MRR = Σ over segments (customers × (1 − added churn) × new price per customer)`, plus expected uplift in new-customer conversion or average deal size if the option affects it.
3. Phase the effect: existing customers move only when the option says (at renewal, after grandfathering or a transition discount), so show MRR month by month for twelve months from the renewal calendar, not as if everyone moved on day one.
4. Run pessimistic, expected and optimistic scenarios by varying added churn and new-customer conversion. Label every assumption's source (step 1 research, the owner's estimate, or a placeholder); none is fact.
5. Calculate the break-even churn: the share of affected customers who could leave before the change loses revenue.
6. Non-revenue effects to watch: support volume, sales cycle length, discount requests, community reaction.
7. Guardrails that would pause or reverse the rollout (for example affected-segment churn above a threshold for two months running).

Stop and wait for approval or changes to the assumptions. Do not write customer communication yet.
