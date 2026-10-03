# Step 2: Build test cases

Fix the inputs every version will be judged on.

1. Write 8 to 15 cases: about half realistic happy-path inputs spread across the variety the prompt really sees, about a third edge cases (empty or very short input, very long input, ambiguous requests, unusual formatting, boundary values in any rule), and the rest negative cases (out of scope, missing information, input the prompt should decline or flag). Include at least one case for every current problem from Step 1.
2. Base cases on the sample inputs where given, varied rather than copied; mark synthetic ones. Use fictional names and data.
3. Write each input in full, exactly as it would be pasted, for every placeholder.
4. For each case give the requirements it tests, the expected behaviour, and a pass criterion that someone else would check the same way: exact value, contains or does-not-contain, a pattern, a word or item count, valid structure, or a one-sentence rubric.
5. Add a scoring sheet: one row per case with columns for each version.

Stop and wait for approval. Once approved, the cases are frozen.
