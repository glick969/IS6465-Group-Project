# Member A to Member B handoff

## Ownership and merge sequence

Member A delivers Product Management, home, shared CSS, overall use case model draft, product documents, product reflection, and verification evidence. Member B delivers Raw Material Management, login, and the initial ERD. Each member reviews the other's work. No approval is pre-filled.

1. Keep the `products/`, `images/`, and `assets/` paths from this package. Add `security/login.php` and `materials/index.php` plus the rest of Member B's files.
2. Update all shared header copies and home material card: replace `integration.php?area=login` with `security/login.php` and `integration.php?area=materials` with `materials/index.php`, respecting the existing `../` prefix in product pages. There are seven page files plus the integration page with copied headers; use a project-wide search to update every occurrence.
3. Reuse `assets/css/styles.css`: `.page-heading`, `.panel`, `.field`, `.form-grid`, `.toolbar`, `.table-wrap`, `.badge`, `.notice`, and `.btn`. Retain explicit labels, focus indicators, and mobile behavior. Avoid changing product IDs or names of CSS variables without reviewing both modules.
4. Merge Member B's raw material use cases into the model draft. Both staff actors currently associate with each CRUD use case; customers associate only with Read Products. The login oval is a separate Member B use case, not an include arrow on every CRUD operation. Add actual authentication preconditions in the final application.
5. Incorporate the data contract below into the ERD. Review multiplicities together. Add no DB connection for midterm.
6. Combine reflections, peer-test both modules, and record actual human contributions. Replace Member A/B with real names only after each member reviews their work. Merge docs into the final group ZIP and submit the actual GitHub repo link on Canvas.

## Product data contract for the ERD

| Field | Proposed final type or constraint | Prototype key |
|---|---|---|
| product_id | Unique primary key, not editable | id |
| product_name | Required string | name |
| ski_type | Park / Powder / Touring | skiType |
| size_cm | Positive whole number, prototype convention | size |
| construction_makeup | Full carbon / Hybrid | makeup |
| selling_price | Nonnegative USD; use integer cents or fixed-decimal handling in final design | price |
| manufacturing_cost | Nonnegative USD; staff-only | cost |
| finished_quantity | Nonnegative whole pairs | quantity |
| responsible_employee_id | Required FK to Employee | employee |
| status | Active / Inactive | status |

`materialLinks` and `history` are sample dependency flags only. They are not substitutes for actual relationships and should not become redundant authoritative database columns.

- Each Product has one responsible Employee; an Employee may be responsible for zero or many Products. This models responsibility, not every person who contributed to manufacturing.
- Product to RawMaterial is many-to-many through Product_Material. Use a composite unique key (product_id, material_id), a positive required_quantity, and the material's unit; quantity is per one pair of skis.
- Product may appear on zero or many historical OrderLines. Store historical unit_price separately from current selling_price. Other transaction links such as returns must also participate in final deletion checks.
- InventoryAdjustment belongs to the raw material module: link material and employee; record reason, change amount, and timestamp. This package does not change raw material stock when finished stock is edited.
- Product deletion: history takes priority and requires inactivation; material links block deletion; only a record with neither dependency is eligible after confirmation. The proposal does not require zero finished stock for product deletion, so that extra restriction has not been added.
- Product_Material CRUD and actual SQL JOIN are future integration work. No material-requirements editor or automatic material consumption is claimed in this package.

## Decisions for joint review

The two CRUD sets match the assignment body and proposal despite the screenshot popup mentioning one set. Prototype conventions needing agreement are USD with two decimal places, positive whole centimeters, names up to 80 characters, and fictional employee choices. Sample authentication and client-side visibility are not final authorization. Final protected requests need server validation, safe output encoding, proper authentication, and authorization. PDO/database work is outside the midterm.

## Contribution evidence

The generated files exist; this does not establish student contribution or review. Each member should make their actual changes on their own branch, commit them with accurate messages, review the other module, and retain peer-test notes. No commit history or reviewer sign-off has been invented.
