# Step 1: Automated scan

<targets>
{{app_url_or_routes}}
</targets>

1. Start the app locally the way the project documents. If it cannot be started, or a flow needs credentials or test data you do not have, list what is missing and stop.
2. Run {{scan_command}} if given; otherwise use the project's existing accessibility tests, or an axe-based scan of each route through a headless browser, including states reached by interaction (open menus, dialogs, validation errors, empty and loading states).
3. Map each violation to its source: the component or template file, the stylesheet or token behind a contrast failure. Group identical violations that share a source.
4. Record each group with the success criterion it maps to, its impact (blocks a task, makes it harder, cosmetic), and the routes affected.

Write the artifact: How the scan ran, Violations by source (Source | Rule | Criterion | Impact | Instances | Routes), Routes not reached and why. Continue to step 2.
