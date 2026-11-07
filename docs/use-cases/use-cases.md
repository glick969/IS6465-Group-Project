# Product use cases

## UC-P01 Create Product

**objective** Create a complete record for a ski product.

**event** The workshop introduces a new sellable ski product.

**actors** Employee or administrator

**pre** The employee demonstration is open. Required employee choices are available. Final system: an authorized employee or administrator is signed in.

**post** Success: a new product with a unique ID is shown. Midterm: data exist only in this browser tab. Final system: the product is stored in the database.

**failure** No record is created. Invalid values remain available for correction; cancelling leaves the collection unchanged.

### Main flow

1. Actor: Open Products and select Add product. System: Display the product form and identify required fields.
2. Actor: Enter specifications, USD price/cost, stock in pairs, responsible employee, and status. System: Present unit hints and available choices.
3. Actor: Select Add product. System: Validate fields and rules. If valid, assign an ID and update temporary sample data.
4. Actor: Review the new product. System: Display product details and a clear temporary-save confirmation.

### Alternatives

- **A1 Invalid values** At step 3, show field-specific errors and preserve entries; the actor corrects them and retries step 3.
- **A2 Cancel** Before confirmation, Cancel returns to the list without creating a product.
- **A3 Storage unavailable** Keep the form visible and explain that temporary changes could not be saved.
- **A4 Unauthorized final user** Final system only: deny the protected request before showing or saving a form.

Related: FR-P01, FR-P06, FR-P07; BR-P01-04, BR-P11. AD-P01. WF-P01 and WF-P01E. AT-P01, AT-P02, AT-P08, AT-P13, AT-P14.

## UC-P02 Read Products

**objective** Find product information appropriate to the viewer.

**event** An employee checks product records or a customer compares skis.

**actors** Employee, administrator, or customer

**pre** Product pages are available. Fictional fixture records are loaded. Final system: staff access requires an authorized role; customers use the public catalog.

**post** Matching records or a clear empty state are shown. No product data are changed.

**failure** An invalid or missing product ID produces a product-not-found message; the viewer can return to the list.

### Main flow

1. Actor: Employee opens Products. System: Show staff records with specifications, pricing, internal cost, stock, and status.
2. Actor: Enter name/ID and optionally select type or status. System: Apply combined filters and show the matching count or a no-results state.
3. Actor: Select View for a record. System: Show complete staff details and dependency summary.
4. Actor: Return to Products. System: Show the list so another record can be selected.

### Alternatives

- **A1 Customer catalog** Instead of staff step 1, the customer opens Customer catalog. Show active products only with public specifications, selling price, and availability; filter by name/size and type. No staff details links are offered.
- **A2 No matches** At step 2, show a no-results explanation and let the actor clear or change filters.
- **A3 Missing record** At step 3, show Product not found and a route back to Products.
- **A4 Role enforcement** Final system only: deny customer requests to internal pages and exclude confidential fields server-side. Prototype view separation is not authorization.

Related: FR-P02, FR-P03, FR-P07; BR-P05, BR-P06. AD-P02. WF-P02, WF-P02D, and WF-P02C. AT-P03, AT-P04, AT-P05, AT-P11, AT-P13.

## UC-P03 Update Product

**objective** Correct product information without changing its identity.

**event** Specifications, price, stock, responsible employee, or status changes.

**actors** Employee or administrator

**pre** An existing product is selected in the employee demonstration. Final system: staff role authorization succeeds.

**post** Success: the same ID identifies the revised product. Midterm changes remain temporary. Final system must retain earlier order-line prices.

**failure** Invalid or cancelled changes do not modify the stored sample record. A missing ID produces an explanatory message.

### Main flow

1. Actor: Select Edit for an existing product. System: Load the current values into the form. Keep product ID outside editable input.
2. Actor: Revise the fields that have changed. System: Show units and the historical-price preservation note.
3. Actor: Select Save changes. System: Validate all values and update the selected temporary record while retaining its ID and dependencies.
4. Actor: Review the revised product. System: Show details with a temporary-save confirmation.

### Alternatives

- **A1 Invalid values** At step 3, retain edits and show field-specific errors. Correct them and repeat step 3.
- **A2 Cancel** Return to the product details with original stored values unchanged.
- **A3 Missing record** If the ID is missing or unknown, display Product not found and do not display an editable form.
- **A4 Storage unavailable** Keep edits in the form and report the failed temporary save.
- **A5 Inactive status** If status changes to Inactive, remove the product from the same-tab customer catalog while retaining its staff record.

Related: FR-P04, FR-P06, FR-P07; BR-P01-06, BR-P10, BR-P11. AD-P03. WF-P03; validation state follows WF-P01E. AT-P02, AT-P05, AT-P06, AT-P08, AT-P12, AT-P13, AT-P14.

## UC-P04 Delete or Inactivate Product

**objective** Remove an eligible unused product or discontinue a linked product while preserving history.

**event** An employee identifies a duplicate, incorrect, or discontinued product.

**actors** Employee or administrator

**pre** A product exists in the employee demonstration. Its sample dependency flags are available. Final system: staff authorization and actual relationship checks succeed.

**post** Success: an eligible record is removed, or a linked record remains with Inactive status. Cancellation or a blocked operation leaves data unchanged.

**failure** Missing records show an error. Records with dependencies cannot be permanently deleted. Temporary storage failure leaves the operation unconfirmed.

### Main flow

1. Actor: Select Delete product or Review removal options from a product record. System: Display the product identity and dependency summary.
2. Actor: Review whether removal is eligible. System: For a record with no material links and no historical transactions, show Confirm delete and Cancel.
3. Actor: Select Confirm delete. System: Recheck dependency flags and remove only the eligible temporary record.
4. Actor: Review the result. System: Return to Products with a removal confirmation.

### Alternatives

- **A1 Historical transactions** At step 2, disable permanent deletion and offer Confirm mark inactive. On confirmation retain the product and set Inactive; an already inactive record needs no change.
- **A2 Material requirements** Without history but with material links, disable deletion and explain the blocker. Offer inactivation; removing material links is outside this front-end package.
- **A3 Cancel** Before confirmation, return to details and preserve the product.
- **A4 Missing record or storage failure** Show an explanatory error and do not report success.
- **A5 Final integrity** The final database must repeat dependency checks within a protected operation and reject conflicting deletions. Sample flags do not implement referential integrity.

Related: FR-P05, FR-P07; BR-P07-09. AD-P04. WF-P04, WF-P04H, and WF-P04B. AT-P07, AT-P08, AT-P09, AT-P10, AT-P13.