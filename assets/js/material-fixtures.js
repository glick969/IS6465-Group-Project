/* Fictional data only. No real authorization or database. */
window.KF_MATERIAL_FIXTURES = {
  "materials": [
    {
      "id": "M2001",
      "name": "Carbon fiber fabric",
      "description": "Twill-weave carbon cloth used in full carbon and hybrid lay-ups.",
      "unit": "sq m",
      "unitCost": 28.5,
      "quantity": 74,
      "reorderLevel": 20,
      "lastPurchase": "2026-10-14",
      "status": "Active",
      "products": ["P1001", "P1003"]
    },
    {
      "id": "M2002",
      "name": "Paulownia wood core",
      "description": "Pre-shaped lightweight core blank for hybrid skis.",
      "unit": "each",
      "unitCost": 42,
      "quantity": 18,
      "reorderLevel": 20,
      "lastPurchase": "2026-10-02",
      "status": "Active",
      "products": ["P1001"]
    },
    {
      "id": "M2003",
      "name": "Epoxy resin",
      "description": "Two-part laminating resin.",
      "unit": "L",
      "unitCost": 19.75,
      "quantity": 4,
      "reorderLevel": 8,
      "lastPurchase": "2026-09-18",
      "status": "Active",
      "products": ["P1001", "P1003"]
    },
    {
      "id": "M2004",
      "name": "P-Tex base material",
      "description": "Sintered base sheet, black.",
      "unit": "sq m",
      "unitCost": 15,
      "quantity": 12,
      "reorderLevel": 5,
      "lastPurchase": "",
      "status": "Active",
      "products": []
    },
    {
      "id": "M2005",
      "name": "ABS sidewall strip",
      "description": "Discontinued sidewall material replaced by a newer supplier part.",
      "unit": "m",
      "unitCost": 3.1,
      "quantity": 0,
      "reorderLevel": 0,
      "lastPurchase": "2026-06-30",
      "status": "Inactive",
      "products": []
    },
    {
      "id": "M2006",
      "name": "Carbon fabric - old entry",
      "description": "Created by mistake; never received or used.",
      "unit": "sq m",
      "unitCost": 28.5,
      "quantity": 0,
      "reorderLevel": 0,
      "lastPurchase": "",
      "status": "Active",
      "products": []
    }
  ],
  "adjustments": [
    {"id": "A3005", "material": "M2003", "employee": "E01", "change": -3, "reason": "Production use", "at": "2026-10-28T14:05"},
    {"id": "A3004", "material": "M2001", "employee": "E01", "change": -6, "reason": "Production use", "at": "2026-10-21T10:40"},
    {"id": "A3003", "material": "M2001", "employee": "E02", "change": 30, "reason": "Delivery", "at": "2026-10-14T09:20"},
    {"id": "A3002", "material": "M2002", "employee": "E02", "change": 10, "reason": "Delivery", "at": "2026-10-02T08:55"},
    {"id": "A3001", "material": "M2005", "employee": "E02", "change": -2, "reason": "Production use", "at": "2026-08-15T15:30"}
  ]
};
