<context>
A flaky test passes and fails on the same code. Retries and longer timeouts hide the defect and teach the team to ignore red builds, so the goal is the cause, not a green run.
</context>

<task>
Investigate [TEST].
1. Read the test and the code it exercises before running anything.
2. List the sources of nondeterminism you can see: time, randomness, ordering, shared state, concurrency, network, environment.
3. Reproduce the failure by running the test repeatedly or in a different order. Report how often it fails.
4. Fix the cause, then run the test enough times to show the failure is gone.
</task>

<constraints>
- Never add retries, sleeps or longer timeouts as the fix.
- Fix the behaviour, not the test. Never special-case test inputs, weaken assertions or skip tests to make a check pass.
- If a test looks wrong, explain why and ask before changing it.
- Before saying the work is done, run the check that proves it (tests, build, type check or the command the user gave) and report the real result.
- If you could not run a check, say so plainly and say which one.
</constraints>

<output_format>
## Cause
One paragraph: the nondeterminism and how it makes the test fail.
## Fix
The diff, then one sentence on why it removes the cause.
## Evidence
Runs before and after, with failure counts.
</output_format>
