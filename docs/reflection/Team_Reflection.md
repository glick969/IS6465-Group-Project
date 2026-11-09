# Ethics and Critical Thinking in Front End Development

Kitten Factory's front end should make business information understandable while protecting information that a viewer does not need. The staff product interface includes manufacturing costs and responsible employees, while the customer catalog presents active skis, specifications, selling prices, and availability. Customers do not see internal costs or employee details in that catalog. Because this prototype has no real authentication, interface visibility alone does not protect data: the final application must enforce permissions on the server, including requests made directly to protected URLs.

The demonstration login uses a general incorrect-credentials message and a short pause after repeated failed attempts. These examples illustrate cautious feedback, but the browser-based check and pause can be bypassed and must not be described as production security. The final system must verify passwords with an appropriate server-side password-hashing mechanism and maintain authenticated sessions. The prototype labels its accounts as fictional and asks users not to enter real credentials.

Critical thinking shaped deletion and inventory decisions. Product history should remain available for orders, returns, and reporting, so products with historical transactions can be inactivated rather than erased. Material requirements block permanent product deletion. A raw material may be deleted only with zero stock, no product links, and no inventory history. Initial counts and corrections count as history just as deliveries and production use do. Confirmation and Cancel actions let employees reconsider a destructive operation and understand why it may be unavailable.

Stock changes require a reason, an employee, and a timestamp instead of allowing an unexplained overwrite. Adjustments that would reduce material stock below zero are rejected. Material units become locked when inventory, adjustment history, or product relationships depend on them, preventing an old kilogram entry from silently being displayed as liters. Current product prices must likewise remain separate from historical order-line prices in the future database. These rules preserve the meaning of records over time.

The interface should also help users correct mistakes without excluding them. Required fields have labels; money is marked in USD; product stock is measured in whole pairs. Validation retains entries and identifies fields needing correction. Status text accompanies color, focus indicators support keyboard navigation, and responsive layouts support small screens. These choices support accessibility, but further user and assistive-technology review is needed before claiming the interface is fully accessible.

All data are fictional and temporary. The pages explain that they do not connect to a database, preventing the demonstration from being mistaken for reliable production inventory. AI assistance was used to draft code, diagrams, documents, and checks. Human responsibility remains with the two students: each must inspect, understand, verify, and revise the work they submit. Fair attribution and accurate test records matter as much as a polished interface.

## Contributions and sources

This combined reflection incorporates Member A's product/interface reflection and Tyler Glick's login/material reflection, with shared discussion of the revised history and unit rules. The individual contributions remain in this folder. The combined wording is AI assisted and requires both students' review before submission.

Sources: Kitten Factory Project Proposal, pp. 2-4; IS6465 Lecture 1, pp. 17-20 and 22; IS6465 Lecture 2, pp. 6, 8, and 15-18. No additional student testing or approval is claimed here.
