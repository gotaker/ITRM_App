# ITRM Patch v3 — XLSM Parity Upgrade

- Heatmap: Scope/View selector (All, Five highest, Per-category), 4×4/5×5, appetite curve; **Scatter overlay with jitter** option.
- Reports: **Top N**, Category means, Highest per category.
- Risks: Code, Owner, Mitigation cost columns; Pre/Post P/I + computed scores; **Guided assessment** button.
- Guided assessment (/assess) backed by `questions` table.
- Import: mapping for perspective/category/title/code/owner/mitigation_cost + pre/post P/I.
- DB: Added `questions` table; new risk fields (`code`, `owner`, `mitigation_cost`, `revision_info`). Settings add `default_top_n`, `scatter_jitter`.
