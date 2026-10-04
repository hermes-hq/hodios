# Step 4: Staged rollout with gates

1. Stages: iOS phased release (seven days, with pause) and Android staged rollout percentages (for example 1%, 5%, 20%, 50%, 100%), with the minimum time and number of users at each stage before deciding.
2. Gates per stage, numeric: crash-free users and sessions against the previous version, ANR rate on Android, key flow success (login, purchase), app start time, and review rating trend. Ask for the team's thresholds or propose them as assumptions.
3. Levers in order of speed: turn off the flag or remote config, fix the backend, pause or halt the rollout, ship a hotfix. Say that halting stops new installs but does not fix users already updated.
4. Who watches, how often, and who can halt; the message template for halting.
5. Hotfix path ready in advance: branch, expedited review request criteria, and the version number it would take.

Sections: Rollout schedule (table), Gates, Levers, Roles and cadence, Hotfix path, Open questions.

Stop and wait for approval.
