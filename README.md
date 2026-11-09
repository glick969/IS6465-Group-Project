# Kitten Factory midterm project

Kitten Factory is a front-end prototype for a ski manufacturing company. This combined group package contains Product Management, Raw Material Management, a home page, and a demonstration login page. HTML/CSS pages are saved with the PHP extension, with supplemental JavaScript for validation and temporary interactions. No database is connected.

## Run the project

In the course PHP-enabled environment, open a terminal in this folder:

```sh
php -S localhost:8000
```

Open http://localhost:8000/index.php. There is no build step, package installation, database setup, or external asset dependency. JavaScript must be enabled for interactive demonstrations.

If PHP is unavailable, `python3 preview.py` serves these HTML-only PHP pages for local preview; it does not execute PHP. Passing this preview is not evidence of a PHP runtime test.

## Pages and demonstrations

| Area | Start page | Demonstration |
|---|---|---|
| Home | index.php | Navigate to both modules and the public catalog |
| Login | security/login.php | Fictional employee, administrator, and customer accounts |
| Products | products/index.php | Create, search/view, edit, and delete/inactivate products |
| Customer catalog | products/catalog.php | Active products and public fields only |
| Raw materials | materials/index.php | Create, search/view, edit/adjust stock, and delete/inactivate materials |

Product examples: P1002 has no dependencies and can be deleted after confirmation; P1001 has transaction history and can be inactivated; P1003 has material requirements that block deletion. A product price update retains its ID. Product stock uses whole pairs; prices and manufacturing costs must be nonnegative.

Material examples: M2003 demonstrates stock adjustments and low-stock indicators. Production use cannot reduce stock below zero. Every adjustment records its reason, employee, amount, and time. Any adjustment, including an initial count or correction, is inventory history and prevents permanent deletion. M2006 has zero stock, no links, and no history, so it is the eligible deletion example. Units are locked when stock, any adjustment history, or product links exist.

Login uses the fictional accounts displayed on its page with the password `Workshop-2026`. Employee/admin demonstrations open Raw materials; customer demonstrations open the catalog. Incorrect credentials produce a general error; five failed attempts pause the form for 30 seconds. These behaviors are demonstrations, not real authentication or protection against attacks. Client-side SHA-256 is not the final application's password-storage design.

Temporary changes are stored in sessionStorage for the current tab. The reset controls restore sample records; counters can continue to avoid reusing IDs. Staff pages remain directly accessible. Do not enter real credentials or sensitive information.

## Submission documents

| Deliverable | Location |
|---|---|
| All diagrams and ERD in one visual index | [Design atlas](docs/design-atlas.html) |
| Overall use case model and login model | docs/use-case-model/ |
| Eight CRUD use case documents | docs/use-cases/UC-P01 through UC-P04 and UC-M01 through UC-M04 DOCX files |
| Eight activity diagrams | docs/activity-diagrams/ (DOT, SVG, PNG) |
| Product, material, and login wireframes | docs/wireframes/ (SVG, PNG) |
| ERD and data dictionary | [ERD SVG](DB/ERD.svg), [ERD PNG](DB/ERD.png), [data dictionary](DB/data-dictionary.md) |
| Product requirements and business rules | docs/requirements/Product_Requirements_and_Business_Rules.docx |
| Team scope and artifact traceability | [Team traceability](docs/requirements/Team_Scope_and_Traceability.md) |
| Combined ethics and critical thinking reflection | [Team reflection](docs/reflection/Team_Reflection.md) |
| Current checks and remaining verification | [Verification record](docs/testing/verification.md) |

SVG files support zooming; PNGs are convenient for inclusion in documents. Open the design atlas in a browser to review both modules and the proposed data model. Orders, payments, shipping, and returns in the ERD describe later application scope and are not implemented pages in this midterm.

## Team contributions

- Product Management contributor (Member A): product pages and supporting documents, home page, shared styling, overall use case model, product requirements, and reflection contribution; combined documentation and atlas cleanup.
- Tyler Glick (Member B): login and raw material pages, material documents and diagrams, ERD/data dictionary, reflection contribution, and revised material history/unit rules.
- Both members: review the shared design, explain the submitted work, record their actual contributions, and perform the final merged-project check. Author names and approvals should reflect actual student review.

## Verification status

The latest material history/unit rules passed isolated checks using the actual JavaScript functions. The package was also checked for file completeness, local page/asset links, JavaScript syntax, diagram XML, and use case content consistency. The updated Word requirements document was rendered and visually reviewed. Current merged browser results and screenshot evidence are included; historical Member A browser tests are labeled separately.

The planned full merged front-end browser pass is complete: 65 assertions passed, with 39 responsive checks and a clean 13-page console sweep. See docs/testing/Browser_Verification_Report.md. PHP-engine startup in the course environment remains a separate check because this computer has no PHP runtime. Database authorization and historical transaction persistence are future work, not requirements implemented by this front-end prototype. See the verification record for the limits of each check.

## Sources and AI assistance

Project context comes from the supplied Kitten Factory proposal, two IS6465 lectures, SAD requirements template, and pasted midterm instructions. The original SVG logo and ski illustration were created for this prototype.

AI assisted with drafting code, documentation, diagrams, and checks. Both students remain responsible for reviewing, understanding, and validating what they submit under course policy. No student sign-off, GitHub upload, or Canvas submission is implied by this package.
