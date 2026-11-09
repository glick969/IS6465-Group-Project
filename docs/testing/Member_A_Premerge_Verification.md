> Historical record from the original Member A package. Counts and pending-module statements below describe that earlier version, not this combined package. See verification.md for the current review.

# Product prototype verification

Prepared November 6 2026. Checks below were performed by the AI assistant using the local files and the in-app browser. They do not constitute student or teammate sign-off.

## Browser interaction results

The eight PHP-suffixed pages contain HTML and browser JavaScript. A local HTTP preview served them as HTML; no PHP engine or database was involved.

| Check | Observed result | Related acceptance criteria |
|---|---|---|
| Submit an empty Add product form | Specific required-field errors appeared; no record was created | AT-P02 |
| Enter negative price/cost and 1.5 pairs | Amount and whole-pair errors appeared; other entries remained in the form | AT-P02 |
| Create Summit Test 180 with zero price, zero cost, and zero pairs | New P1005 appeared on the details page with a temporary-save message and $0.00 values | AT-P01, AT-P14 |
| Edit P1005 to $799.25 and 5 pairs | Details showed the revised values under P1005 | AT-P06 |
| Open customer catalog after the edit | Active sample products and P1005 appeared with public fields; cost and employee fields were absent from rendered content; inactive P1004 was absent | AT-P05 |
| Search for an unmatched name | List reported zero results with guidance and a clear-filters action | AT-P11 |
| Combine search P1001, Powder, and Inactive, then Active | Counts changed from zero matches to one match; clearing filters restored all four original records after reset | AT-P03 |
| Review P1002 deletion, then Cancel | Product details remained available with the record unchanged | AT-P08 |
| Confirm P1002 deletion | Record disappeared from the list; explicit removal message appeared | AT-P07 |
| Review P1001 with historical transactions | Delete unavailable was disabled; inactivation was offered | AT-P09 |
| Confirm P1001 inactivation | Record remained in staff list and disappeared from customer catalog | AT-P05, AT-P09 |
| Review P1003 with material requirements | Deletion was disabled and the material-dependency explanation appeared | AT-P10 |
| Change P1003 price to 42, then Cancel | Details still showed the original $1,099.00 price | AT-P08 |
| Request an unknown product ID | Product-not-found explanation and Products navigation were available | UC-P02 A3 |
| Confirm Reset sample data | Original four records returned and temporary changes were removed | Demo support |
| Keyboard navigation from skip link | Tab moved to the next link and the visible focus outline appeared | Partial keyboard check |
| Responsive inspection | Home and add-product layouts were visually inspected at a 390-pixel frame width; a narrow main-browser layout was also inspected | Partial responsive check |

Sample records were reset after the checks. The independent product ID counter may remain above its initial value within the verification tab; this deliberately avoids ID reuse.

## File and design checks

- Eight PHP pages exist: home, integration handoff, product list, create, view, edit, delete, and customer catalog.
- All local HTML/PHP links, scripts, images, label targets, and element IDs passed static checks.
- All four browser JavaScript files passed syntax checks.
- All 17 SVG files parsed as XML: two interface illustrations, two model diagrams, four activity diagrams, and nine wireframes.
- All five DOCX files were rendered and every page was visually reviewed. The final requirements document is eight pages; each of the four use case documents is one page.
- The retained course template was not changed. Its styles, theme, numbering, and settings were preserved byte for byte in the generated documents. Sample tutoring text and unfilled instructional placeholders were removed. Page-number fields remain functional.
- Diagram images were visually inspected. Activity decisions include explicit outcomes and merge nodes for alternative/validation paths. Wireframes cover the four CRUD use cases and error, empty, public-view, and dependency states.
- Every product FR and BR appears in the requirements traceability matrix. Deferred authorization and historical-price criteria are identified explicitly.

## Limits and remaining review

- No PHP runtime execution was tested on this computer because PHP is not installed. Run the included pages with the course PHP development server before final submission.
- AT-P12 (database historical-price preservation) and AT-P13 (real server authorization) are deferred. No database, real login, transaction integrity, or protected route is implemented in this front-end assignment.
- Storage-denied/quota-failure handling exists in the code but was not induced in browser testing. Cross-tab synchronization, multiple users, maliciously altered browser storage, and real inventory concurrency are outside this prototype.
- Full screen-reader testing, exhaustive keyboard navigation, contrast certification, additional browsers, and all mobile page states have not been verified. The UI includes semantic labels, visible focus, text status labels, and responsive styles, but no accessibility certification is claimed.
- Member B's login, raw material module, ERD, combined reflection, and final merged navigation require joint review and testing. Canvas videos were not accessed and are not claimed as watched.
- Both students must review and understand the AI-assisted work and record their actual contributions before submitting it.
