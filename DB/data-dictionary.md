# Kitten Factory ERD and data dictionary

Member B draft for joint review. Diagram: `DB/ERD.png` (editable source `DB/ERD.dot`, vector `DB/ERD.svg`). The midterm has no database connection; this design is for the final submission.

## Relationships

| Parent | Child | Cardinality | Meaning |
|---|---|---|---|
| USER_ACCOUNT | CUSTOMER | 1 to 0..1 | A customer login belongs to one customer profile |
| USER_ACCOUNT | EMPLOYEE | 1 to 0..1 | An employee or admin login belongs to one employee profile |
| CUSTOMER | ORDERS | 1 to 0..many | A customer places zero or many orders |
| EMPLOYEE | ORDERS | 0..1 to 0..many | An order may be handled by one employee (nullable for web orders) |
| ORDERS | ORDER_LINE | 1 to 1..many | Every order has at least one line |
| ORDERS | PAYMENT | 1 to 0..many | An order may be paid in one or more payments |
| ORDERS | SHIPMENT | 1 to 0..1 | An order ships at most once |
| ORDER_LINE | RETURN_ITEM | 1 to 0..many | Returns point to the exact product line that came back |
| PRODUCT | ORDER_LINE | 1 to 0..many | A product appears on zero or many order lines |
| EMPLOYEE | PRODUCT | 1 to 0..many | Each product has one responsible employee |
| EMPLOYEE | EMPLOYEE_TRAINING | 1 to 0..many | Training records verify employee training |
| PRODUCT | PRODUCT_MATERIAL | 1 to 0..many | Junction table resolving the many-to-many between products and materials |
| RAW_MATERIAL | PRODUCT_MATERIAL | 1 to 0..many | A material is used in zero or many products |
| RAW_MATERIAL | INVENTORY_ADJUSTMENT | 1 to 0..many | Every stock change to a material is logged |
| EMPLOYEE | INVENTORY_ADJUSTMENT | 1 to 0..many | Every stock change records the employee who made it |

## Raw Material module tables (Member B)

### RAW_MATERIAL

| Column | Type | Rules |
|---|---|---|
| material_id | INT, PK, auto-increment | Not editable; shown as M2001, M2002... in the prototype |
| material_name | VARCHAR(80) | Required |
| description | VARCHAR(255) | Optional |
| unit_of_measure | VARCHAR(20) | Required (for example sq m, kg, L, each). Locked once the material has stock, any INVENTORY_ADJUSTMENT history, or PRODUCT_MATERIAL links, because changing it would relabel earlier records without converting them |
| unit_cost | DECIMAL(10,2) | Required, >= 0, USD |
| quantity_on_hand | DECIMAL(10,2) | Required, >= 0; changed only through an INVENTORY_ADJUSTMENT after creation |
| reorder_level | DECIMAL(10,2) | Required, >= 0; low-stock indicator when quantity_on_hand <= reorder_level |
| last_purchase_date | DATE | Optional; updated when a Delivery adjustment is recorded |
| status | ENUM('Active','Inactive') | Default Active |

### PRODUCT_MATERIAL

| Column | Type | Rules |
|---|---|---|
| product_id | INT, PK + FK to PRODUCT | Composite primary key with material_id |
| material_id | INT, PK + FK to RAW_MATERIAL | Composite primary key with product_id |
| required_quantity | DECIMAL(10,2) | Required, > 0; amount needed for one pair, in the material's unit |

### INVENTORY_ADJUSTMENT

| Column | Type | Rules |
|---|---|---|
| adjustment_id | INT, PK, auto-increment | |
| material_id | INT, FK to RAW_MATERIAL | Required |
| employee_id | INT, FK to EMPLOYEE | Required; who made the change |
| change_amount | DECIMAL(10,2) | Positive for deliveries, negative for production use; cannot take stock below zero |
| reason | ENUM('Initial count','Delivery','Production use','Correction') | Required. Initial count is logged when a material is created with stock |
| adjusted_at | DATETIME | Set by the system |

**Delete rule:** a material can be permanently deleted only when quantity_on_hand is zero, it has no PRODUCT_MATERIAL links, and it has no INVENTORY_ADJUSTMENT history of any kind (initial counts and corrections included). Any other material is marked Inactive instead, so its history is preserved.

## Product module table (Member A contract)

### PRODUCT

| Column | Type | Rules |
|---|---|---|
| product_id | INT, PK, auto-increment | Not editable; P1001... in the prototype |
| responsible_employee_id | INT, FK to EMPLOYEE | Required |
| product_name | VARCHAR(80) | Required |
| ski_type | ENUM('Park','Powder','Touring') | Required |
| size_cm | SMALLINT | Required, positive whole number |
| construction_makeup | ENUM('Full carbon','Hybrid') | Required |
| selling_price | DECIMAL(10,2) | Required, >= 0 |
| manufacturing_cost | DECIMAL(10,2) | Required, >= 0; staff only |
| finished_quantity | INT | Required, >= 0 whole pairs |
| status | ENUM('Active','Inactive') | Default Active |

**Delete rule (Member A):** order history requires inactivation; material links block deletion; otherwise delete after confirmation.

## Shared and order tables

| Table | Columns |
|---|---|
| USER_ACCOUNT | user_id PK; email (unique, required); password_hash (from PHP `password_hash()`, never plain text); role ENUM('Customer','Employee','Admin'); status ENUM('Active','Disabled'); last_login DATETIME |
| CUSTOMER | customer_id PK; user_id FK (unique); first_name; last_name; street; city; state; zip; phone |
| EMPLOYEE | employee_id PK; user_id FK (unique); first_name; last_name; position; hire_date |
| EMPLOYEE_TRAINING | training_id PK; employee_id FK; training_name; completed_date |
| ORDERS | order_id PK; customer_id FK; employee_id FK (nullable); order_date; status ENUM('Pending','Paid','Shipped','Delivered','Cancelled') |
| ORDER_LINE | line_id PK; order_id FK; product_id FK; quantity (> 0 pairs); unit_price (copied from selling_price at time of sale) |
| PAYMENT | payment_id PK; order_id FK; payment_date; amount; method; card_last4 |
| SHIPMENT | shipment_id PK; order_id FK (unique); ship_date; delivery_date; shipping_cost; tracking_number |
| RETURN_ITEM | return_id PK; line_id FK; return_date; quantity (pairs); reason; refund_amount |

## Changes from the suggested course ERD

| Change | Reason |
|---|---|
| Added USER_ACCOUNT | Required for login and user management; stores a hashed password and a role |
| Removed the ORDER-PAYMENT circular keys and CUST_ID on PAYMENT | The customer is known through the order; avoids redundant and circular foreign keys |
| CREDIT_CARD replaced with method and card_last4 | Storing full card numbers is unsafe and against PCI DSS |
| SHIPMENT and RETURN given proper foreign keys | The suggested ERD had no key linking them to an order or a product |
| RETURN_ITEM points to ORDER_LINE | Shows exactly which ski came back, and why |
| Removed the duplicate Type and PROD_NAME/ski_name fields | The same attribute appeared twice |
| Added PRODUCT_MATERIAL | Products and raw materials are many-to-many and need a junction table |
| Added INVENTORY_ADJUSTMENT | Proposal rule: stock changes need a reason and the employee who made them |
| Added EMPLOYEE_TRAINING | Requirement to verify that employees are trained |
| Fixed CAST to unit_cost; added reorder_level and status | Typo fix; supports lean production and the low-stock indicator |
| Renamed ORDER to ORDERS | ORDER is a reserved word in SQL |
| Order total is not stored | It is calculated from order lines (quantity x unit_price) so it can never disagree with them |

## Questions for joint review

1. Products link to one responsible employee (Member A contract). Is that enough for "track product to specific workers," or do we want a production log table later?
2. Should an order's employee_id stay optional (web orders) or be required?
3. Confirm the units list for raw materials (sq m, kg, L, each).
