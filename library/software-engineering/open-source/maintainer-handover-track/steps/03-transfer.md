# Step 3: Transfer access in stages

Move access from the approved inventory to the approved successors safely.

1. Order the transfer: first add successors alongside the departing maintainer (repository and triage, then review and merge, then release), then registries and signing, then domain, funds and accounts last.
2. For each asset give the action, who does it, the check that it worked (for example a successor cuts a release while the departing maintainer watches), and the date.
3. Require two-factor authentication for every person with publish or admin rights.
4. Plan an overlap period with at least one release done by the successors.
5. Rotate shared secrets and tokens the departing maintainer knew, once successors control them.
6. Update the governance or MAINTAINERS file and the security contact.

Stop and wait for confirmation that the transfer steps are done or scheduled. Mark anything still pending.
