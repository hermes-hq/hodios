# Step 3: Majors one at a time

For each approved major, in the agreed order:

1. Read the migration guide for every major crossed and list the breaking changes that apply to this code, with the files affected.
2. Upgrade the package (and the packages that must move with it) one major version at a time if several are crossed; use an official codemod when one exists and review its output.
3. Fix compile errors, then failing tests, then new deprecation warnings.
4. Run the baseline checks and compare. Commit, one major per commit, with the breaking changes and fixes in the message.
5. If a major needs a product decision, a runtime upgrade, or more than a reasonable amount of work, stop for that package, record why, and move on to the next.

Sections: Majors log (table: package | from | to | breaking changes that applied | result), Deferred (with reason and next step), Checks. Stop and wait for approval.
