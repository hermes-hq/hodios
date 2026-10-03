# Step 4: Diagnose failures

Find the cause of each failure in the prompt, not in the output.

1. For each group of failures, trace it to a cause in v1, quoting the line or naming the gap. Typical causes: the requirement is missing or implicit; it is buried or contradicted by another line; the output format is underspecified; there is no rule for missing or ambiguous input; an example teaches the wrong pattern; emphasis causes over-application; inputs are not separated from instructions; the task needs information the prompt does not provide.
2. Separate prompt problems from problems a prompt cannot fix (the model lacks the knowledge, the input lacks the information, the task needs a tool or a second step), and say which is which.
3. Propose one targeted fix per cause, the smallest change that should address it, and predict which cases it should flip and which passing cases it could put at risk.
4. Order the fixes by expected impact. Recommend applying them together only if they touch unrelated parts of the prompt; otherwise suggest which to try first.

Stop and wait for approval of the fixes to apply.
