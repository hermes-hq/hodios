# Step 4: Test hypotheses and fix

1. Write ranked hypotheses from the profile: "If we <change>, <metric> will drop by about <range> because <evidence>". Rank by expected gain per effort and risk.
2. Take the top one. Make the smallest change that tests it, re-run the baseline measurement exactly, and keep the change only if the gain exceeds the noise. Revert otherwise and record the result anyway.
3. Run the tests after each kept change.
4. Repeat until the target is met, or the remaining contributors need a design change; describe that change instead of making it.

Sections: Hypotheses, Experiment log (table: hypothesis | change | before | after | runs | kept?), Changes kept, Design changes proposed.

Stop and wait for approval.
