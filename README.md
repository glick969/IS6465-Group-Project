# Kitten Factory midterm project

This package combines both members' midterm work. Member A's agreed work in English: Product Management CRUD, home page, shared layout/CSS, product use case documents and activity diagrams, wireframes, overall use case model draft, product requirements, and a reflection contribution.

## Run

From the package root in a PHP-enabled environment (such as the course Codespace):

```sh
php -S localhost:8000
```

Open http://localhost:8000/index.php. Pages contain HTML/CSS and browser JavaScript and are saved as PHP files. No server-side PHP logic, third-party library, build step, database, credentials, or external asset download is required. JavaScript must be enabled for the interactive product demo. For local environments without PHP, `python3 preview.py` serves the HTML-only PHP files for preview; this does not execute PHP.

## Demonstrate

1. Open Products and add a complete product. Follow the success message to its details.
2. Edit price or inventory, save, and verify the same product ID.
3. Search by name/ID and combine type/status filters. Clear filters or try an unmatched name.
4. Open the customer catalog; only active public fields appear. Same-tab staff changes are reflected when returning to the catalog.
5. Review P1002 for eligible deletion; Cancel first, then confirm.
6. Review P1001 for historical-transaction inactivation and P1003 for material-link blocking.
7. Reset sample data from the Products page when needed.

Raw materials (Member B):

8. Open Raw materials. Three active materials are flagged low stock; filter by Low stock only.
9. Add a material. Try a duplicate name or a negative cost to see validation, then save with a starting quantity; the view page shows an Initial count entry.
10. Edit Epoxy resin (M2003). Try using 10 L in production to see the below-zero rule, then record a 12 L delivery; the low-stock flag clears and the purchase date updates.
11. Removal rules: M2001 has product links and history (inactivate only), M2004 still has stock (delete blocked), M2006 is unused with zero stock (delete after confirmation).
12. Sign in at Login with a fictional account listed on the page. Employees and admins go to Raw materials; customers go to the catalog. Five wrong passwords pause the form for 30 seconds.

Temporary records use sessionStorage in the current tab. They do not persist as real inventory. Reset replaces sample records and discards temporary edits; a separate ID counter intentionally continues to avoid ID reuse. Public and staff views are demonstrations, not access controls. Anyone able to access this prototype can open staff URLs. Never use real sensitive data.

## Documents

- `docs/requirements/Product_Requirements_and_Business_Rules.docx`: completed product-side course template with traceability and acceptance criteria.
- `docs/use-cases/`: four individual use case DOCX files and an editable Markdown mirror.
- `docs/design-atlas.html`: visual use case model, four activity diagrams, and nine low-fidelity wireframes; open in a browser.
- `docs/use-case-model/`, `docs/activity-diagrams/`, `docs/wireframes/`: standalone SVG/PNG assets and editable source for diagrams.
- `docs/reflection/Member_A_Reflection.md`: reflection contribution to combine with teammate's text.
- `docs/testing/verification.md`: checks actually performed and outstanding human review.
- `docs/HANDOFF.md`: module ownership, merge instructions, fields, and ERD contract.

## Member B contribution

- `security/login.php` and `assets/js/login.js`: login page (UC-A01). Demo accounts only; passwords compared as SHA-256 hashes in the browser to illustrate never storing plain text. This is not real authentication.
- `materials/index.php`, `create.php`, `view.php`, `edit.php`, `delete.php` with `assets/js/materials.js` and `assets/js/material-fixtures.js`: Raw Material Management CRUD (UC-M01 to UC-M04), including stock adjustments with a reason and employee, low-stock indicators, and delete-or-inactivate rules.
- `DB/ERD.png`, `DB/ERD.svg`, `DB/ERD.dot`, `DB/data-dictionary.md`: ERD draft and data dictionary for joint review.
- `docs/use-cases/UC-M01` to `UC-M04` DOCX files and `material-use-cases.md`: raw material use case documents built on the same course template as the product use cases.
- `docs/activity-diagrams/AD-M01` to `AD-M04` (DOT source, SVG, PNG): raw material activity diagrams.
- `docs/wireframes/WF-M01` to `WF-M04S` and `WF-A01` (SVG, PNG): raw material and login wireframes.
- Shared navigation and the home page card now link to the real login and raw material pages; the temporary integration page was removed. Member B styles were appended to the end of `assets/css/styles.css` without changing existing rules.

## Scope remaining for the group

Member B still needs a reflection contribution, and both members must add the material use cases (UC-M01 to UC-M04) to the overall use case model. Both members must review shared artifacts, complete the combined reflection, record actual contributions, and prepare the final group ZIP and repository link.

## Sources and AI assistance

Based on the supplied Kitten Factory Project Proposal, the two supplied IS6465 lectures, the SAD Requirements and Business Rules Template, and the pasted midterm instructions/screenshots. Canvas module/video contents were not accessible and have not been claimed as reviewed. The home illustration and mark are original SVG artwork; no outside image assets or UI framework are used.

AI assistance drafted this package and performed the recorded automated checks. No student review, authorship attestation, teammate approval, or GitHub submission is claimed. Students remain responsible for understanding, reviewing, and validating the final work under course policy.
