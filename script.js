/*
 * Interactive P&L sample script – expanded layout with EBITDA and Net Profit
 *
 * This script drives a simple profit & loss statement where clicking on a
 * top‑level category row toggles its subcategories, and clicking on a
 * subcategory total drills down to show the invoices and ledger entries
 * that make up that number. Categories such as Gross Profit, EBITDA and
 * Net Profit are shown as computed rows without subcategories.
 */

// Sample P&L structure and data. Totals are illustrative and not based on real
// business data. Each category may have subcategories; clicking a category
// toggles its children. Clicking a subcategory row reveals the invoices and
// ledger entries behind it.
const pnlData = [
  {
    name: 'Sales',
    total: 150000,
    subcategories: [
      {
        name: 'Sales – Drink',
        total: 40000,
        invoices: [
          { date: '2021-06-02', invoice: 'INV-DR01', vendor: 'Customer A', description: 'Beer sales', amount: 15000 },
          { date: '2021-06-15', invoice: 'INV-DR02', vendor: 'Customer B', description: 'Wine sales', amount: 12500 },
          { date: '2021-06-29', invoice: 'INV-DR03', vendor: 'Customer C', description: 'Cocktail sales', amount: 12500 }
        ],
        ledgerEntries: [
          { account: '4001 Sales – Drink', description: 'Revenue from drink sales', amount: 40000 }
        ]
      },
      {
        name: 'Sales – Food',
        total: 110000,
        invoices: [
          { date: '2021-06-03', invoice: 'INV-FO01', vendor: 'Customer X', description: 'Lunch sales', amount: 40000 },
          { date: '2021-06-17', invoice: 'INV-FO02', vendor: 'Customer Y', description: 'Dinner sales', amount: 35000 },
          { date: '2021-06-30', invoice: 'INV-FO03', vendor: 'Customer Z', description: 'Catering event', amount: 35000 }
        ],
        ledgerEntries: [
          { account: '4002 Sales – Food', description: 'Revenue from food sales', amount: 110000 }
        ]
      }
    ]
  },
  {
    name: 'Cost of Sales',
    total: -40000,
    subcategories: [
      {
        name: 'Cost of Sales – Drink',
        total: -10000,
        invoices: [
          { date: '2021-06-01', invoice: 'BILL-DR01', vendor: 'Supplier 1', description: 'Beverage purchases', amount: -5000 },
          { date: '2021-06-20', invoice: 'BILL-DR02', vendor: 'Supplier 2', description: 'Bottle supply', amount: -5000 }
        ],
        ledgerEntries: [
          { account: '5001 COGS – Drink', description: 'Cost of beverage ingredients', amount: -10000 }
        ]
      },
      {
        name: 'Cost of Sales – Food',
        total: -30000,
        invoices: [
          { date: '2021-06-05', invoice: 'BILL-FO01', vendor: 'Food Supplier A', description: 'Meat and vegetables', amount: -12000 },
          { date: '2021-06-18', invoice: 'BILL-FO02', vendor: 'Food Supplier B', description: 'Dairy and bakery', amount: -10000 },
          { date: '2021-06-29', invoice: 'BILL-FO03', vendor: 'Food Supplier C', description: 'Seafood', amount: -8000 }
        ],
        ledgerEntries: [
          { account: '5002 COGS – Food', description: 'Cost of food ingredients', amount: -30000 }
        ]
      }
    ]
  },
  {
    name: 'Gross Profit',
    total: 110000,
    subcategories: []
  },
  {
    name: 'Staff Costs',
    total: -50000,
    subcategories: [
      {
        name: 'Salaries',
        total: -50000,
        invoices: [
          { date: '2021-06-30', invoice: 'PAY-SAL01', vendor: 'Payroll Provider', description: 'Staff wages', amount: -20000 },
          { date: '2021-06-30', invoice: 'PAY-SAL02', vendor: 'Payroll Provider', description: 'Manager wages', amount: -30000 }
        ],
        ledgerEntries: [
          { account: '6001 Salaries', description: 'Staff wages and salaries', amount: -50000 }
        ]
      }
    ]
  },
  {
    name: 'Expenses',
    total: -20000,
    subcategories: [
      {
        name: 'R&D',
        total: -5000,
        invoices: [
          { date: '2021-06-10', invoice: 'BILL-RD01', vendor: 'Research Consultants', description: 'Product research', amount: -3000 },
          { date: '2021-06-24', invoice: 'BILL-RD02', vendor: 'Development Tools', description: 'Prototyping equipment', amount: -2000 }
        ],
        ledgerEntries: [
          { account: '7001 R&D', description: 'Research and development costs', amount: -5000 }
        ]
      },
      {
        name: 'Administration',
        total: -3000,
        invoices: [
          { date: '2021-06-12', invoice: 'BILL-AD01', vendor: 'Office Supplies Co.', description: 'Stationery and office supplies', amount: -2000 },
          { date: '2021-06-28', invoice: 'BILL-AD02', vendor: 'Service Provider', description: 'Administrative services', amount: -1000 }
        ],
        ledgerEntries: [
          { account: '7002 Administration', description: 'Administrative expenses', amount: -3000 }
        ]
      },
      {
        name: 'Marketing',
        total: -4000,
        invoices: [
          { date: '2021-06-07', invoice: 'BILL-MK01', vendor: 'Ad Agency', description: 'Advertising campaign', amount: -2500 },
          { date: '2021-06-21', invoice: 'BILL-MK02', vendor: 'Printing Co.', description: 'Promotional materials', amount: -1500 }
        ],
        ledgerEntries: [
          { account: '7003 Marketing', description: 'Marketing expenses', amount: -4000 }
        ]
      },
      {
        name: 'Sales',
        total: -3000,
        invoices: [
          { date: '2021-06-13', invoice: 'BILL-SL01', vendor: 'Commission Payments', description: 'Sales commissions', amount: -2000 },
          { date: '2021-06-27', invoice: 'BILL-SL02', vendor: 'Sales Training Co.', description: 'Sales training', amount: -1000 }
        ],
        ledgerEntries: [
          { account: '7004 Sales', description: 'Sales-related expenses', amount: -3000 }
        ]
      },
      {
        name: 'Operations',
        total: -5000,
        invoices: [
          { date: '2021-06-09', invoice: 'BILL-OP01', vendor: 'Maintenance Co.', description: 'Kitchen maintenance', amount: -3000 },
          { date: '2021-06-23', invoice: 'BILL-OP02', vendor: 'Utility Provider', description: 'Utility charges', amount: -2000 }
        ],
        ledgerEntries: [
          { account: '7005 Operations', description: 'Operational expenses', amount: -5000 }
        ]
      }
    ]
  },
  {
    name: 'EBITDA',
    total: 40000,
    subcategories: []
  },
  {
    name: 'Other Expenses',
    total: -8000,
    subcategories: [
      {
        name: 'Depreciation',
        total: -5000,
        invoices: [
          { date: '2021-06-30', invoice: 'DEPR-01', vendor: 'Depreciation Entry', description: 'Asset depreciation', amount: -5000 }
        ],
        ledgerEntries: [
          { account: '8001 Depreciation', description: 'Depreciation expense', amount: -5000 }
        ]
      },
      {
        name: 'Interest',
        total: -3000,
        invoices: [
          { date: '2021-06-30', invoice: 'INT-01', vendor: 'Loan Provider', description: 'Loan interest', amount: -3000 }
        ],
        ledgerEntries: [
          { account: '8002 Interest', description: 'Interest expense', amount: -3000 }
        ]
      }
    ]
  },
  {
    name: 'Net Profit',
    total: 32000,
    subcategories: []
  }
];

// Format numbers as currency (GBP) with no decimals
function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  });
  return formatter.format(value).replace('£', '£');
}

// Render the P&L table with top‑level categories
function renderTable() {
  const tbody = document.querySelector('#pnlTable tbody');
  tbody.innerHTML = '';
  pnlData.forEach((cat, index) => {
    const row = document.createElement('tr');
    row.dataset.type = 'category';
    row.dataset.index = index;
    row.innerHTML = `
      <td>${cat.name}</td>
      <td>${formatCurrency(cat.total)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Toggle subcategory rows for a given category row
function toggleSubcategories(row, catIndex) {
  const nextRow = row.nextSibling;
  // If next row is a subcategory belonging to this category, collapse
  if (nextRow && nextRow.classList && nextRow.classList.contains('subcategory') && parseInt(nextRow.dataset.catIndex) === parseInt(catIndex)) {
    // Remove subsequent subcategory rows until a non‑subcategory row or different category index
    let current = nextRow;
    while (current && current.classList.contains('subcategory') && parseInt(current.dataset.catIndex) === parseInt(catIndex)) {
      const toRemove = current;
      current = current.nextSibling;
      toRemove.parentNode.removeChild(toRemove);
    }
  } else {
    // Expand: insert subcategory rows after current row
    const subcats = pnlData[catIndex].subcategories;
    let insertAfter = row;
    for (let i = 0; i < subcats.length; i++) {
      const sub = subcats[i];
      const subRow = document.createElement('tr');
      subRow.classList.add('subcategory');
      subRow.dataset.catIndex = catIndex;
      subRow.dataset.subIndex = i;
      subRow.innerHTML = `
        <td>${sub.name}</td>
        <td>${formatCurrency(sub.total)}</td>
      `;
      // Insert after the last inserted row (or category row for first iteration)
      insertAfter.parentNode.insertBefore(subRow, insertAfter.nextSibling);
      insertAfter = subRow;
    }
  }
}

// Show invoice and ledger details for a subcategory
function showDetails(catIndex, subIndex) {
  const sub = pnlData[catIndex].subcategories[subIndex];
  const detailsPanel = document.getElementById('details-panel');
  // Populate header
  document.getElementById('details-header').textContent = `${sub.name} – Details`;
  // Populate invoices
  const invoiceBody = document.querySelector('#invoiceTable tbody');
  invoiceBody.innerHTML = '';
  sub.invoices.forEach((inv) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${inv.date}</td>
      <td>${inv.invoice}</td>
      <td>${inv.vendor}</td>
      <td>${inv.description}</td>
      <td>${formatCurrency(inv.amount)}</td>
    `;
    invoiceBody.appendChild(row);
  });
  // Populate ledger entries
  const ledgerBody = document.querySelector('#ledgerTable tbody');
  ledgerBody.innerHTML = '';
  sub.ledgerEntries.forEach((entry) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.account}</td>
      <td>${entry.description}</td>
      <td>${formatCurrency(entry.amount)}</td>
    `;
    ledgerBody.appendChild(row);
  });
  detailsPanel.hidden = false;
  // Scroll into view for convenience
  detailsPanel.scrollIntoView({ behavior: 'smooth' });
}

// Hide the details panel
function hideDetails() {
  document.getElementById('details-panel').hidden = true;
}

// Attach event listeners after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  const tbody = document.querySelector('#pnlTable tbody');
  tbody.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row) return;
    const type = row.dataset.type;
    // Determine cell index (0 = name, 1 = total)
    const cellIndex = Array.prototype.indexOf.call(row.children, e.target.closest('td'));
    if (type === 'category') {
      const catIndex = row.dataset.index;
      // If clicked on the first cell (category name), toggle subcategories
      if (cellIndex === 0) {
        toggleSubcategories(row, catIndex);
      } else if (cellIndex === 1 && pnlData[catIndex].subcategories.length === 0) {
        // Category with no subcategories: show aggregated details if any
        // For computed rows like Gross Profit, EBITDA, Net Profit we do not show details
        hideDetails();
      }
    } else if (row.classList.contains('subcategory')) {
      // Subcategory row: show details regardless of clicked cell
      const catIndex = row.dataset.catIndex;
      const subIndex = row.dataset.subIndex;
      showDetails(parseInt(catIndex), parseInt(subIndex));
    }
  });
  // Hide details button
  document.getElementById('hide-details').addEventListener('click', hideDetails);
});