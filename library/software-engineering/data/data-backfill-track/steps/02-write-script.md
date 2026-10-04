# Step 2: Write the script

1. Batch by an indexed, monotonic key (primary key ranges), never by `OFFSET`. Start with a modest batch size and make it configurable.
2. Make each batch idempotent: the update is recomputed from source data and guarded so rerunning changes nothing (for example `WHERE new_col IS DISTINCT FROM derived`); inserts use upsert on a natural key.
3. One short transaction per batch, with a lock timeout and statement timeout; no external calls inside.
4. Checkpoint the last completed key to a table or file after each batch so the job resumes after a crash or stop.
5. Throttle: sleep between batches and pause automatically when replica lag, lock waits or error rates exceed a threshold.
6. A dry-run mode that computes and logs changes without writing, a limit to a key range, a stop switch, and progress logs (batch, rows changed, rate, estimated time left).
7. Saving old values for the undo plan, if chosen.

Output the script in a code block with a short explanation of each setting. Stop and wait for approval.
