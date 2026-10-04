# Step 1: Release branch and freeze

1. Confirm the version (marketing version and build number scheme) and the target dates: branch cut, freeze, submission, rollout start. Work back from the target, allowing time for beta and store review.
2. List the contents: each feature and fix, its flag (if any), its owner, and the risk (new permissions, payments, login, data migration on device, SDK upgrades, minimum OS change).
3. Mark items that are not ready: they leave the release or ship dark behind a flag that defaults off.
4. Check dependencies: backend endpoints, remote config and flags that must exist first, and whether older app versions keep working against them.
5. Freeze rules: from branch cut only fixes for release blockers, each approved by the release owner; how fixes reach main and the release branch.

Sections: Version and dates, Contents (table), Not ready, Dependencies, Freeze rules, Open questions.

Stop and wait for approval.
