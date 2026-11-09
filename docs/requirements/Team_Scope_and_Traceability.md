# Team Scope and Artifact Traceability

The midterm contains two CRUD sets: Product Management and Raw Material Management. Login and home are included as the required basic pages. The front-end implementation uses HTML/CSS saved as PHP pages, supplemented by browser JavaScript and fictional temporary data. Database integration is excluded.

| Use case | Use case document | Activity diagram | Wireframes | Page |
|---|---|---|---|---|
| UC-P01 Create Product | UC-P01_Create_Product.docx | AD-P01 | WF-P01, WF-P01E | products/create.php |
| UC-P02 Read Products | UC-P02_Read_Products.docx | AD-P02 | WF-P02, WF-P02D, WF-P02C | products/index.php, view.php, catalog.php |
| UC-P03 Update Product | UC-P03_Update_Product.docx | AD-P03 | WF-P03; WF-P01E validation pattern | products/edit.php |
| UC-P04 Delete or Inactivate Product | UC-P04_Delete_or_Inactivate_Product.docx | AD-P04 | WF-P04, WF-P04H, WF-P04B | products/delete.php |
| UC-M01 Create Raw Material | UC-M01_Create_Raw_Material.docx | AD-M01 | WF-M01, WF-M01E | materials/create.php |
| UC-M02 Read Raw Materials | UC-M02_Read_Raw_Materials.docx | AD-M02 | WF-M02, WF-M02D | materials/index.php, view.php |
| UC-M03 Update Raw Material | UC-M03_Update_Raw_Material.docx | AD-M03 | WF-M03, WF-M03A | materials/edit.php |
| UC-M04 Delete or Inactivate Raw Material | UC-M04_Delete_or_Inactivate_Raw_Material.docx | AD-M04 | WF-M04, WF-M04H, WF-M04S | materials/delete.php |
| UC-A01 Login supporting model | Supporting model and login wireframe | Not part of the two CRUD design sets | WF-A01 | security/login.php |
| Home navigation | Ordinary home page, not a data use case | Not applicable | Not required as a CRUD use case | index.php |

Use case documents are in docs/use-cases; diagram sources and images are in docs/activity-diagrams and docs/wireframes. The visual index is docs/design-atlas.html.

## Shared data design

DB/ERD.svg and DB/data-dictionary.md describe the proposed database. Product has one responsible employee. Products and materials are many-to-many through PRODUCT_MATERIAL, with a unique product/material pair and positive quantity per manufactured pair. Inventory adjustments link each stock change to a material and employee. ORDER_LINE retains the selling price at the time of sale. These relationships are design artifacts, not live database operations in the midterm.

## Rule checks and boundaries

- Product requirements and individual acceptance criteria are documented in Product_Requirements_and_Business_Rules.docx.
- Raw materials with any adjustment history are retained and inactivated. The revised code and UC-M04 count initial counts and corrections as history.
- A material unit is locked when stock, adjustment history, or product links exist. The save handler retains the stored unit.
- The current verification record distinguishes isolated rule checks from historical browser checks and outstanding team testing.
- Real authorization, database persistence, historical transaction-price verification, and automatic production/material consumption remain later work.
