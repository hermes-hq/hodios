# Step 5: Restore safely

Bring services back without bringing the attacker back.

1. Runbook per wave: system, source (backup date or rebuild), owner, validation, go or no-go before reconnecting.
2. Each system: restore into the isolated segment, check for step 3 persistence, patch and harden (especially the entry point), reset local credentials, reconnect under monitoring.
3. Prefer backups older than the earliest attacker activity; check later ones for planted accounts, tasks or tampered software.
4. Monitoring for the coming weeks on the attacker's tools, accounts and infrastructure, new admins, remote tools and large uploads, reviewed daily by a named person.
5. Done when critical services are validated, no attacker activity for an agreed period, backups run again with an offline or immutable copy, and leadership has accepted open risks.

Stop until the team confirms these criteria or raises problems.
