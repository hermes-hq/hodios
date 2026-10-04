# Step 2: Extract strings with context

1. Set up the approved library and an English source catalog; add a lint rule against new hard-coded strings if the stack has one.
2. Move strings into the catalog area by area, with stable keys by feature and purpose and a translator comment wherever meaning, placeholder or length is not obvious.
3. Rewrite concatenations as single messages with named placeholders, and counts as ICU plurals.
4. Change no behaviour or visible English text, except where a fix needs it; list those.

Sections: Changes by area, New keys (count and examples), Strings left for later with reasons. Stop and wait for approval.
