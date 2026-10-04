# Step 2: Patch and minor batch

1. Update all approved direct dependencies within their current major using the package manager, letting it update the lockfile.
2. Run the baseline checks. If anything fails, bisect: split the batch in halves until the package responsible is found, take it out of the batch and move it to step 3's list with the reason.
3. Review the lockfile diff summary: number of transitive changes, any new packages, and install scripts added by new packages.
4. Commit the batch with a message listing every package and version change.

Sections: Updated packages (table: package | from | to), Checks before and after, Removed from batch (with reason), Lockfile notes. Stop and wait for approval.
