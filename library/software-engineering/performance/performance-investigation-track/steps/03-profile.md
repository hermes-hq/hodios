# Step 3: Profile

1. Choose tools that fit the runtime and the symptom: a sampling CPU profiler and flame graph, allocation and GC logs, database query plans and slow query logs, distributed traces, or browser and mobile performance tools. Use wall-clock profiling when waiting is suspected.
2. Profile the baseline scenario, not an idle system.
3. Classify where the time goes: our code, a library, database, network or downstream services, locks and pools, garbage collection, or I/O. Give each contributor's share of the total.
4. Note anything surprising, such as work repeated per item or a call that should not happen at all.

Sections: Tools and capture, Where the time goes (table: contributor | share | evidence), Surprises.

Stop and wait for approval.
