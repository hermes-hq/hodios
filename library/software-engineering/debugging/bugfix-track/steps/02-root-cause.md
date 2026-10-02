# Step 2: Root cause

Find why it happens, not just where it shows up.

1. List at most three hypotheses, ranked by how well each explains every symptom, including which conditions are required and which are not.
2. Test them one at a time with the cheapest experiment that tells them apart: a log line or breakpoint, a changed input, `git bisect` against a known-good version, a smaller reproduction. Change one thing per experiment and record the result.
3. Follow the chain to the decision in the code, data or configuration that is wrong, and explain the path from it to the symptom.
4. Ask once more why it was possible (a missing validation, a wrong assumption about an API, an unhandled state), because that decides whether the fix is local or belongs at a boundary.
5. Search for the same pattern elsewhere and list the places. Do not fix them yet.

Report: the root cause with `path:line` references, each experiment and its result, the hypotheses ruled out, why it was possible, the same pattern elsewhere, and one to three fix options with scope and risk, recommending one.

Stop and wait for approval of the cause and the fix option.
