# Kitten Factory Member A contribution

This package implements Member A's agreed midterm work in English: Product Management CRUD, home page, shared layout/CSS, product use case documents and activity diagrams, wireframes, overall use case model draft, product requirements, and a reflection contribution.

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

Temporary records use sessionStorage in the current tab. They do not persist as real inventory. Reset replaces sample records and discards temporary edits; a separate ID counter intentionally continues to avoid ID reuse. Public and staff views are demonstrations, not access controls. Anyone able to access this prototype can open staff URLs. Never use real sensitive data.

## Documents

- `docs/requirements/Product_Requirements_and_Business_Rules.docx`: completed product-side course template with traceability and acceptance criteria.
- `docs/use-cases/`: four individual use case DOCX files and an editable Markdown mirror.
- `docs/design-atlas.html`: visual use case model, four activity diagrams, and nine low-fidelity wireframes; open in a browser.
- `docs/use-case-model/`, `docs/activity-diagrams/`, `docs/wireframes/`: standalone SVG/PNG assets and editable source for diagrams.
- `docs/reflection/Member_A_Reflection.md`: reflection contribution to combine with teammate's text.
- `docs/testing/verification.md`: checks actually performed and outstanding human review.
- `docs/HANDOFF.md`: module ownership, merge instructions, fields, and ERD contract.

## Scope remaining for the group

Member B owns login, Raw Material Management, and the ERD draft. The integration page labels these handoff areas and avoids broken links. Replace its navigation links when those modules are merged. Both members must review shared artifacts, complete the combined reflection, record actual contributions, and prepare the final group ZIP and repository link. This package alone is not the complete group submission.

## Sources and AI assistance

Based on the supplied Kitten Factory Project Proposal, the two supplied IS6465 lectures, the SAD Requirements and Business Rules Template, and the pasted midterm instructions/screenshots. Canvas module/video contents were not accessible and have not been claimed as reviewed. The home illustration and mark are original SVG artwork; no outside image assets or UI framework are used.

AI assistance drafted this package and performed the recorded automated checks. No student review, authorship attestation, teammate approval, or GitHub submission is claimed. Students remain responsible for understanding, reviewing, and validating the final work under course policy.
