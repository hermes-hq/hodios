# Step 3: Impact model

Model the revenue and churn impact of the chosen option, transparently enough that the owner can change any assumption.

1. Build the model by segment, as a table with one row per segment and plan: customers, current MRR, new MRR under the chosen option, the change per customer, the assumed churn or downgrade rate caused by the change, and resulting MRR.
2. Write the formula used: `new MRR = Σ over segments (customers × (1 − added churn) × new price per customer)`, plus expected uplift in new-customer conversion or average deal size if the option affects it.
3. Run three scenarios (pessimistic, expected, optimistic) by varying the assumed added churn and new-customer conversion. Every assumption is labelled with its source (research from step 1, the owner's estimate, or a placeholder) and none is presented as fact.
4. Calculate the break-even churn: the share of affected customers who could leave before the change loses revenue.
5. List the non-revenue effects to watch: support volume, sales cycle length, discount requests, brand and community reaction.
6. Define the guardrails that would pause or reverse the rollout (for example churn in the affected segment above a set threshold for two consecutive months).

Stop and wait for approval or changes to the assumptions. Do not write customer communication yet.
