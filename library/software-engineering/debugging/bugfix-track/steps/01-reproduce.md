# Step 1: Reproduce

Turn the report into a reproduction you can run on demand.

1. Restate the bug as observed versus expected behaviour. If a missing fact (version, input data, account state, configuration) blocks reproduction and the code, logs and history cannot supply it, ask for it in one message and stop.
2. Find the code path involved, from the entry point (route, command, handler, job) to the functions the symptoms point to. Cite file paths.
3. Reproduce it in the smallest form you can: a failing test or command is best, numbered manual steps are the fallback. Remove every condition that is not needed and list the ones that are.
4. Run it at least twice. If it fails only sometimes, say how often.
5. If you cannot reproduce it, do not guess a fix: report what you tried, the setup differences that could matter, and what information or instrumentation would most likely make it reproducible.
6. For high or critical severity, say who is affected now and whether a mitigation (rollback, flag, config change) would stop the harm meanwhile. Recommend it; do not apply it.

Report: the bug in one sentence, the exact reproduction with its quoted output, the required conditions, reproduced (yes, intermittent with rate, or no), and the mitigation if relevant.

Stop and wait for approval.
