# Step 3: Build the on-call dashboard

1. Top row answers "are users hurt": SLO status and budget left, request rate, error ratio, latency percentiles against the targets.
2. Then the same signals by route or job and by version or region; then each dependency from this service's side; then the saturation of the resource that runs out first (pools, queues, memory against limit, CPU throttling); then background jobs with last success time.
3. Every panel: a title written as a question, the query or placeholder, unit, thresholds matching the alerts, and what on-call does when it is red.
4. Deploy, flag and config changes as annotations; variables for environment, region and version.
5. The drill-down path from each paging alert to the panel that separates its likely causes, then to traces or logs.

Sections: Layout, Panels (table), Annotations, Drill-down per alert, Open questions.

Stop and wait for approval.
