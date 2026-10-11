# Step 1: Inventory assets and access

List everything a maintainer controls, so nothing is forgotten in the handover.

1. Build a table of assets by group: code hosting (organisation, repositories, admin rights, branch protection), package registries and container registries (publish rights, two-factor status, tokens in CI), CI and secrets, release signing keys, domain and DNS, docs hosting, email aliases and the security contact, chat servers and social accounts, funding platforms and any money held, trademarks or name rights, and third-party services (analytics, error tracking, CDN).
2. For each asset record: who has access now, whether it is held only by the departing maintainer, how it is recovered if lost, and renewal dates.
3. Flag single points of failure and anything that expires soon, such as a domain renewal.
4. Mark every unknown as `[CONFIRM: …]` and list what the maintainer needs to check.

Stop and wait for corrections to the inventory. Do not discuss successors yet.
