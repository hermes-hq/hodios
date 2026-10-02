# Step 1: Frame the question and plan the analysis

Turn "{{question}}" into an analysis plan the stakeholder can agree to before any work starts.

<data_description>
{{data_description}}
</data_description>

1. State the decision this analysis informs, who makes it and by when. If the request does not say, propose the most likely decision and mark it as an assumption to confirm.
2. Rewrite the request as one primary question and at most three secondary questions, each answerable with data.
3. Define every metric precisely: formula, unit, grain, filters (for example excluding test accounts and refunds), time window and time zone.
4. Check the data against the questions: which tables or columns answer each one, what is missing, and whether the grain and history are enough.
5. Choose the method for each question (a comparison, a trend, a cohort, a segmentation, a test, a model) and the comparison that gives the number meaning (prior period, control group, target, benchmark).
6. Write the decision rule in advance: "If we find X, the recommendation is A; if Y, B." Name the result that would change the stakeholder's mind.
7. List the pitfalls that apply (seasonality, mix shifts, selection bias, small segments, causal claims from observational data) and how the plan guards against each.
8. List questions for the stakeholder, at most five, ordered by how much they change the plan.

Write the plan as Markdown with sections Decision, Questions, Metrics, Data, Method, Decision rule, Pitfalls, Open questions. Keep it to one page.

Stop and wait for approval.
