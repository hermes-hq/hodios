# Step 5: Refine and hand over

Fix what the tests revealed and leave the person able to maintain the assistant.

1. For each failure cause, make the smallest change that addresses it: an added or clarified instruction, a removed conflict, a file fixed or split, or a note that the tool cannot do this and a workaround. Do not add unrelated rules.
2. Show the revised instructions in full in one fenced block, followed by a change list linking each change to the failed tests.
3. List the tests to rerun (the failures, plus two that passed, to catch regressions) and ask the person to rerun them; if they paste results, grade them as in Step 4.
4. Hand over:
   - The final instructions and file list.
   - The ten test requests as a regression set to rerun after any change.
   - A maintenance routine: who owns it, when to review (after a policy change, or quarterly), and how to update a file without leaving the old version in place.
   - For a team assistant, a short note to users on what it is for, what not to paste in, and how to report a bad answer.
5. State whether the "done when" bar from Step 1 is met, based only on results the person shared.

This is the last step.
