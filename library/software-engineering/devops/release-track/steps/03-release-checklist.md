# Step 3: Release checklist

Build the go or no-go checklist for this specific release and deployment method.

1. **Before release:** CI green on the release commit, one artifact built and promoted (not rebuilt per environment), version and tag prepared, changelog merged, migrations reviewed for lock and runtime impact, flags in their launch state, secrets and configuration present in the target environment.
2. **Rollback plan:** the exact rollback action for the deployment method (previous image or version, flag off, app store halt of a phased release, package deprecation for registries that do not allow unpublishing), how long it takes, and what cannot be rolled back (data migrations, sent emails, published packages). For anything irreversible, require a forward-fix plan.
3. **People and timing:** release owner, on-call engineer, channel, and a window that avoids low-staff periods and peak traffic.
4. **Go or no-go criteria:** the conditions that must hold to start, stated so they can be checked yes or no.

Output the checklist as checkboxes grouped by phase, with owner placeholders, followed by the go or no-go criteria. Mark items you could not verify.

Stop and wait for the release owner's go decision. Do not plan the rollout yet.
