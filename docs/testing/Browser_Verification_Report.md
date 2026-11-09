# Complete Front End Browser Verification

Test date: November 8 2026, America Denver time. The combined project was exercised in the ChatGPT in-app browser against the included local preview server. The application pages contain HTML/CSS and browser JavaScript saved with PHP extensions; they contain no server-side PHP logic.

## Result

All 65 recorded browser assertions passed. All 13 pages were also checked at 390, 768, and 1280 pixel viewport widths, giving 39 page/width combinations. A clean-tab direct-load sweep of the 13 pages recorded no console errors. No application source changes were necessary.

The responsive review helper was expanded to cover every application page and all three widths, with visible measurements. Wide list tables have intentional horizontal scrolling. No non-table main-content elements exceeded the tested viewport boundaries. This is a layout check, not a full accessibility certification.

## Browser checks

| Number | Check | Result |
|---|---|---|
| 1 | Login required fields | PASS |
| 2 | Password visibility toggle | PASS |
| 3 | Login invalid email | PASS |
| 4 | Generic wrong-credentials message | PASS |
| 5 | Five attempts lock sign-in | PASS |
| 6 | Product required fields | PASS |
| 7 | Product negative amounts and fractional pairs rejected | PASS |
| 8 | Product create at zero boundaries | PASS |
| 9 | Product update retains ID | PASS |
| 10 | Product reload preserves temporary edit | PASS |
| 11 | Product cancel preserves price | PASS |
| 12 | Public catalog projects active public fields | PASS |
| 13 | Catalog empty result | PASS |
| 14 | Catalog type filter | PASS |
| 15 | Product combined filters empty | PASS |
| 16 | Product combined filters match | PASS |
| 17 | Product delete cancellation | PASS |
| 18 | Product eligible deletion | PASS |
| 19 | Product history disables deletion | PASS |
| 20 | Product inactivation hides public record | PASS |
| 21 | Product material link blocks deletion | PASS |
| 22 | Login lock expires | PASS |
| 23 | Employee sign-in redirects to materials | PASS |
| 24 | Low-stock filter includes threshold equality | PASS |
| 25 | Material empty search | PASS |
| 26 | Material required-field validation | PASS |
| 27 | Material duplicate and negative inputs | PASS |
| 28 | Material create decimals and initial history | PASS |
| 29 | Material stock/history locks unit | PASS |
| 30 | Material detail update retains unit and ID | PASS |
| 31 | Material cancel discards unsaved edit | PASS |
| 32 | Stock adjustment requires reason amount employee | PASS |
| 33 | Below-zero stock rejected | PASS |
| 34 | Correction reaches exact zero with audit entry | PASS |
| 35 | Initial count and correction protect zero-stock material | PASS |
| 36 | Material inactivation succeeds | PASS |
| 37 | Existing linked material unit locked | PASS |
| 38 | Delivery updates quantity purchase date and history | PASS |
| 39 | Production use triggers low stock at exact threshold | PASS |
| 40 | Unused material unit remains editable | PASS |
| 41 | Material delete cancellation | PASS |
| 42 | Material eligible deletion | PASS |
| 43 | Material positive stock prevents deletion | PASS |
| 44 | Login session status persists | PASS |
| 45 | Sign out restores login | PASS |
| 46 | Admin role redirect | PASS |
| 47 | Admin role session displayed | PASS |
| 48 | Customer role redirect | PASS |
| 49 | Future purchase date rejected | PASS |
| 50 | Zero material boundary without fabricated history | PASS |
| 51 | Unused unit change allowed | PASS |
| 52 | New unused material can be deleted | PASS |
| 53 | products view unknown ID | PASS |
| 54 | products edit unknown ID | PASS |
| 55 | products delete unknown ID | PASS |
| 56 | materials view unknown ID | PASS |
| 57 | materials edit unknown ID | PASS |
| 58 | materials delete unknown ID | PASS |
| 59 | Reset cancellation keeps changes | PASS |
| 60 | Material reset restores fixtures | PASS |
| 61 | Product reset restores fixtures | PASS |
| 62 | Responsive layouts at 39 page-width combinations | PASS |
| 63 | Clean direct-page load sweep | PASS |
| 64 | Keyboard skip-to-content focuses main | PASS |
| 65 | Escape dismisses reset confirmation | PASS |

## Responsive checks

| Page | Width | Heading loaded | Non-table overflow |
|---|---|---|---|
| Home | 390 px | Yes | None |
| Login | 390 px | Yes | None |
| Product list | 390 px | Yes | None |
| Add product | 390 px | Yes | None |
| Product details | 390 px | Yes | None |
| Edit product | 390 px | Yes | None |
| Delete product | 390 px | Yes | None |
| Customer catalog | 390 px | Yes | None |
| Material list | 390 px | Yes | None |
| Add material | 390 px | Yes | None |
| Material details | 390 px | Yes | None |
| Edit material | 390 px | Yes | None |
| Delete material | 390 px | Yes | None |
| Home | 768 px | Yes | None |
| Login | 768 px | Yes | None |
| Product list | 768 px | Yes | None |
| Add product | 768 px | Yes | None |
| Product details | 768 px | Yes | None |
| Edit product | 768 px | Yes | None |
| Delete product | 768 px | Yes | None |
| Customer catalog | 768 px | Yes | None |
| Material list | 768 px | Yes | None |
| Add material | 768 px | Yes | None |
| Material details | 768 px | Yes | None |
| Edit material | 768 px | Yes | None |
| Delete material | 768 px | Yes | None |
| Home | 1280 px | Yes | None |
| Login | 1280 px | Yes | None |
| Product list | 1280 px | Yes | None |
| Add product | 1280 px | Yes | None |
| Product details | 1280 px | Yes | None |
| Edit product | 1280 px | Yes | None |
| Delete product | 1280 px | Yes | None |
| Customer catalog | 1280 px | Yes | None |
| Material list | 1280 px | Yes | None |
| Add material | 1280 px | Yes | None |
| Material details | 1280 px | Yes | None |
| Edit material | 1280 px | Yes | None |
| Delete material | 1280 px | Yes | None |

## Evidence and cleanup

- browser-results.json contains observed UI evidence, assertions, layout measurements, and clean-tab page results.
- browser-proof.png shows the merged material-details page. Earlier home-preview.png is historical evidence.
- Both fixture sets were reset after functional checks. The demo login was signed out. Test data existed only in temporary browser storage.
- Four unsourced MutationObserver errors occurred in the original test tab during iframe/tooling diagnostics. Application source contains no MutationObserver call. A subsequent fresh direct-page sweep of all 13 application pages recorded no console errors. No cause is asserted beyond this distinction.
- Two diagnostic tool calls needed adjustment: the read-only DOM interface does not expose iframe contentDocument, and its heading locator does not support a level filter. Visible frame measurements and exact heading names were used to finish the checks. These diagnostic call failures are separate from application assertions.

## Scope limits

The planned front-end browser pass is complete in one browser environment. PHP is unavailable on this computer, so these HTML-only PHP files were served by the included Python preview rather than a PHP engine. Running the course PHP server remains a separate environment check.

The prototype intentionally has no database or real authentication. Server authorization, historical database price integrity, concurrent users, denied-storage failures, exhaustive assistive-technology testing, and cross-browser certification are not verified by this result. Both students must review and approve the work they submit. No GitHub upload or Canvas submission was performed.
