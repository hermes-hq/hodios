# Step 4: Trial and report

1. {{#trial_task}}Take the trial task: {{trial_task}}. {{/trial_task}}If no trial task was given, pick a small, well-defined open issue or TODO and say which.
2. Work it as a fresh agent would: read only the instruction files first, then do the task using the documented commands. Note every point where the instructions were missing, wrong or ignored, and every permission prompt or denial.
3. Do not merge or push. Leave the change on a branch or as an uncommitted diff for the team.
4. Fix instruction gaps the trial exposed, if they are small and clearly within the approved scope.

Write the report:

## Before and after
Setup time, fastest feedback command and its time, full check time, instruction file size.

## Trial
Task, result, checks run with real output, friction points and what was changed because of them.

## Open items
Table: item (secrets to rotate, missing fast tests, credentials needed for setup), why it matters, suggested owner.

## Next
Which agent use the repository is now ready for, and what must change before more autonomy.
