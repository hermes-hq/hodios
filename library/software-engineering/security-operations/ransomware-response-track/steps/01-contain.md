# Step 1: Contain

Stop the spread without destroying evidence.

1. Restate known and unknown in five lines at most. If it is unclear whether encryption is still running, which systems are hit, or whether backups are reachable from the affected network, ask now alongside the actions below.
2. Name the incident lead, technical lead and scribe from the roles given, and an out-of-band channel if identity or email may be compromised.
3. Immediate actions, ordered, each with owner and check:
   - Isolate affected hosts with endpoint tooling or at the switch. Do not power them off unless encryption is running and isolation is impossible; memory holds evidence.
   - Protect backups: disconnect repositories and consoles, change backup admin credentials from a clean device, confirm an offline or immutable copy exists.
   - Cut spread paths: disable remote access for affected users, restrict SMB, remote desktop and remote management between segments, block known attacker infrastructure.
   - Disable (not delete) attacker-used accounts; plan a coordinated privileged credential reset so access is cut at once.
4. Notify now: leadership, counsel, the cyber insurer (policies often require early notice and approve the response firm), the incident response retainer; law enforcement reporting as a question for counsel.

Stop until the team confirms containment or explicitly defers it.
