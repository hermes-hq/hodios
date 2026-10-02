# Step 2: Search strategy

Using the approved protocol, design a search that someone else could rerun and get the same records.

1. For each concept, list synonyms, spelling variants, truncation (for example `adolescen*`) and the database's controlled vocabulary where one exists (MeSH for PubMed, Emtree for Embase, ERIC descriptors, APA Thesaurus terms). Flag any subject heading you are not sure exists.
2. Combine terms with OR inside a concept and AND across concepts, then write one string per database, adapted to its syntax and field tags.
3. Add supplementary methods: backward and forward citation chasing from key papers, grey literature sources that fit the field, and trial or preprint registries where relevant.
4. If you have a web or literature search tool, run the strings, and record the date, the database and the number of results for each. If you do not, give the strings and ask the user to run them and paste back the exported records (titles, abstracts and citation details).

Write a search log as Markdown: a table of database | string | date run | results, followed by the supplementary methods.

Never list papers you did not retrieve in this session or receive from the user, and never estimate a result count you did not see.

Stop and wait for approval and for the records.
