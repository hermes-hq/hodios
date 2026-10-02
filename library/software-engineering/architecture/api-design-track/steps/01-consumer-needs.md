# Step 1: Consumer needs

Understand who will call the API and what they must get done before modelling anything.

1. If essentials are missing, ask for them in one message and wait: consumer types and counts, the jobs each must accomplish (for example "sync new orders into our ERP every five minutes"), their environment (server, browser, mobile on flaky networks, low-code tools), auth, volumes and latency needs, and data they must never see.
2. Write a consumer needs brief:
   - **Consumers:** table of consumer, environment, auth, volume and jobs.
   - **Jobs:** numbered, phrased from the consumer's side, each with frequency and the cost of failure.
   - **Interaction patterns:** request and response, bulk, long-running operations, webhooks or events, offline sync, and which jobs need each.
   - **Non-goals** for the first version.
   - **Quality needs:** latency, availability, rate limits and freshness per job, marked stated or assumed.
3. List open questions with who should answer each.

Stop and wait for approval or edits. Do not model resources yet.
