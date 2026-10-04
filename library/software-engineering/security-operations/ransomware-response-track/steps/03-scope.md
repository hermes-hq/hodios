# Step 3: Scope

Find how far the attacker went, so nothing is restored into a compromised environment.

1. Scope table, including hypervisors, backup servers and cloud tenants: System | Encrypted? | Attacker activity | Exfiltration signs | Evidence | Confidence.
2. Answer or list as open: initial access (phishing, exposed remote access, vulnerable edge system, stolen credentials, supplier); earliest activity versus encryption time; accounts used and whether the identity system is compromised; persistence (new accounts, tasks, services, remote tools, policy changes, cloud app credentials); data theft (large uploads, archive tools, leak-site claims), which changes the legal picture even if recovery succeeds; which backups are intact and older than the earliest activity.
3. Name the checks that would close each open question.
4. Coordinated reset from clean devices: privileged, service and cloud admin accounts, and the directory's Kerberos ticket-granting account reset twice with replication time between.
5. List what counsel needs now (theft signs, personal data, customers affected).

Stop for results and approval.
