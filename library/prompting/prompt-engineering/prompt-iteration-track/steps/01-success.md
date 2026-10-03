# Step 1: Define success

Decide what "better" means before changing a word of the prompt.

1. If there is no prompt yet, draft v1 from the task description in the usual structure (context, task, constraints, output format) and treat it as the baseline. If the task itself is unclear, ask up to three questions and stop.
2. Write down:
   - **Job:** one sentence: input, deliverable, who uses it.
   - **Requirements:** numbered R1, R2… covering format, length, content rules, tone, and what to do with missing, ambiguous or out-of-scope input. Mark each as a hard requirement (a failure is a failure) or a quality goal (graded).
   - **Current problems:** what goes wrong today, from the description and any bad sample outputs, each linked to a requirement.
   - **Done when:** the bar for adopting a new version, for example "passes every hard requirement on all cases and improves the quality score, with no previously passing case now failing".
   - **Run settings:** the tool or model tier, and whether to run each case once or several times (several when outputs vary a lot between runs).

Stop and wait for approval or edits before building test cases.
