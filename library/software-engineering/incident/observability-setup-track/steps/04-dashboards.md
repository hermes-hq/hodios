# Step 4: Dashboards as code

1. Use the dashboards-as-code format the team already has (dashboard JSON in the repo, a provisioning folder, Terraform, Jsonnet or the vendor's config format). If there is none, write a dashboard JSON for a Grafana-compatible tool and say how to import it.
2. One overview dashboard: request rate, error ratio and latency percentiles per route or operation; saturation; business metrics; a panel of recent error logs filtered by trace id. Every panel title states the question it answers.
3. Write the queries against the metric names actually registered in step 3.
4. Propose, but do not activate, two or three alert conditions tied to user impact (error ratio and latency on the key operations), each with a threshold placeholder for the team to set with an SLO.

Continue to step 5.
