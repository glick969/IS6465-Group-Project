# Raw material use cases

## UC-M01 Create Raw Material

**objective** Create a complete record for a material used to build skis.

**event** The workshop starts using a new material or supplier part.

**actors** Employee or administrator

**pre** The employee demonstration is open. Final system: an authorized employee or administrator is signed in.

**post** Success: a new material with a unique ID is shown; a starting quantity above zero is logged as an initial count. Midterm: data exist only in this browser tab. Final system: stored in the database.

**failure** No record is created. Invalid values remain available for correction; cancelling leaves the collection unchanged.

### Main flow

1. Actor: Open Raw materials and select Add material. System: Display the form and identify required and optional fields.
2. Actor: Enter name, description, unit, unit cost, starting quantity, reorder level, purchase date, recorded-by employee, and status. System: Present unit choices, amount hints, and the low-stock threshold explanation.
3. Actor: Select Add material. System: Validate fields and a unique name. If valid, assign an ID, log any starting quantity as an initial count, and update sample data.
4. Actor: Review the new material. System: Display material details and a temporary-save confirmation.

### Alternatives

- **A1 Invalid values** At step 3, show field-specific errors (missing unit, negative cost or quantity, future purchase date) and preserve entries; the actor corrects them and retries step 3.
- **A2 Duplicate name** At step 3, identify the existing record with that name (for example M2001); the actor renames the material or cancels.
- **A3 Cancel** Before confirmation, Cancel returns to the list without creating a material.
- **A4 Storage unavailable** Keep the form visible and explain that temporary changes could not be saved.
- **A5 Unauthorized final user** Final system only: deny the protected request before showing or saving a form.

Related: AD-M01. WF-M01 and WF-M01E. Rules: proposal Raw Material Management; DB/data-dictionary.md.

## UC-M02 Read Raw Materials

**objective** Find material records, stock levels, and costs, and identify materials that need reordering.

**event** An employee checks stock before production or purchasing.

**actors** Employee or administrator

**pre** Material pages are available. Fictional fixture records are loaded. Final system: staff access requires an authorized role; customers cannot open this module.

**post** Matching records or a clear empty state are shown, and low-stock materials are flagged. No material data are changed.

**failure** An invalid or missing material ID produces a material-not-found message; the employee can return to the list.

### Main flow

1. Actor: Open Raw materials. System: Show material records with unit, unit cost, quantity on hand, reorder level, status, low-stock indicators, and summary counts.
2. Actor: Enter name/ID and optionally select stock level or status. System: Apply combined filters and show the matching count or a no-results state.
3. Actor: Select View for a record. System: Show full details, a low-stock warning when it applies, linked products, and stock change history with the newest change first.
4. Actor: Return to Raw materials. System: Show the list so another record can be selected.

### Alternatives

- **A1 Low stock only** At step 2, choosing Low stock only lists active materials whose quantity on hand is at or below their reorder level.
- **A2 No matches** At step 2, show a no-results explanation and let the actor clear or change filters.
- **A3 Missing record** At step 3, show Material not found and a route back to Raw materials.
- **A4 Role enforcement** Final system only: deny customer requests to this module and keep unit costs internal on the server. Prototype view separation is not authorization.

Related: AD-M02. WF-M02 and WF-M02D. Rules: proposal Raw Material Management; DB/data-dictionary.md.

## UC-M03 Update Raw Material

**objective** Keep material details current and log every stock change under the same ID.

**event** A delivery arrives, material is used, a count is corrected, or cost changes.

**actors** Employee or administrator

**pre** An existing material is selected in the employee demonstration. Final system: staff role authorization succeeds.

**post** Success: the same ID identifies the revised material; each stock change is logged with reason, amount, employee, and time. Midterm changes remain temporary.

**failure** Invalid or cancelled changes leave the sample record unchanged. A change that would take stock below zero is rejected.

### Main flow

1. Actor: Select Edit for an existing material. System: Load current details. Show quantity on hand as read only; the ID is not editable.
2. Actor: Revise details, or choose a stock-change reason, amount, and employee. System: Show unit hints and a live preview of the new quantity on hand.
3. Actor: Select Save details or Record adjustment. System: Validate values. Save details under the same ID, or apply the signed change and log it.
4. Actor: Review the revised material. System: Show details and stock history with a temporary-save confirmation.

### Alternatives

- **A1 Invalid values** At step 3, keep entries and show field errors (duplicate name, negative cost or reorder level, missing reason or employee, zero amount); repeat step 3.
- **A2 Stock below zero** Reject production use or a subtracting correction larger than the quantity on hand; state the quantity on hand and keep the entries.
- **A3 Unit locked** If the material has stock, stock history, or product links, the unit cannot be changed.
- **A4 Cancel** Return to details with stored values unchanged.
- **A5 Missing record or storage failure** Show Material not found with no editable form, or keep entries and report the failed save.

Related: AD-M03. WF-M03 and WF-M03A; validation follows WF-M01E. Rules: proposal Raw Material Management; DB/data-dictionary.md.

## UC-M04 Delete or Inactivate Raw Material

**objective** Remove an unused material with zero stock, or retire a linked material while preserving its history.

**event** An employee identifies a duplicate, mistaken, or discontinued material.

**actors** Employee or administrator

**pre** A material exists in the employee demonstration with its stock, product links, and history. Final system: staff authorization and relationship checks succeed.

**post** Success: an eligible record is removed, or the material remains with Inactive status. Cancellation or a blocked operation leaves data unchanged.

**failure** Missing records show an error. Materials with product links, any stock history, or stock on hand cannot be permanently deleted.

### Main flow

1. Actor: Select Delete material or Review removal options from a material record. System: Display the material identity, stock on hand, product links, and history summary.
2. Actor: Review whether removal is eligible. System: For a record with zero stock, no product links, and no stock history, show Confirm delete and Cancel.
3. Actor: Select Confirm delete. System: Recheck the rules and remove only the eligible temporary record.
4. Actor: Review the result. System: Return to Raw materials with a removal confirmation.

### Alternatives

- **A1 Product links or history** At step 2, disable permanent deletion and offer Confirm mark inactive; an already inactive record needs no change. Any logged stock change counts as history.
- **A2 Stock on hand** With no links or history but stock above zero, disable deletion and offer Confirm mark inactive.
- **A3 Cancel** Before confirmation, return to details and preserve the material.
- **A4 Missing record or storage failure** Show an explanatory error and do not report success.
- **A5 Final integrity** The final database must repeat these checks in a protected operation using the Product_Material and Inventory_Adjustment foreign keys.

Related: AD-M04. WF-M04, WF-M04H, and WF-M04S. Rules: proposal Raw Material Management; DB/data-dictionary.md.
