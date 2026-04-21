---
title: "Budget Planner"
description: "Personal finance and budgeting tool with expense tracking and reports"
pubDate: 2024-08-15
author: "Mario"
'domain-icon': "logistic"
---

Take control of your finances with this intuitive budgeting tool. Track expenses, set goals, visualize spending patterns, and make informed financial decisions.

### Expense Tracking

Record transactions quickly with multiple methods:
- **Manual entry** - Add expenses one by one
- **Bank sync** - Automatic transaction import
- **Receipt scan** - Upload and auto-extract
- **Recurring** - Set up recurring bills
- **Split** - Divide expenses (e.g., splitting dinner)

```typescript
// Transaction interface
interface Transaction {
  id: string;
  amount: number;
  currency: string;
  category: Category;
  date: Date;
  description: string;
  account: string;
  tags: string[];
  receipt?: Receipt;
}

async function createTransaction(data: Partial<Transaction>) {
  validateTransaction(data);
  
  const transaction = await db.transactions.create({
    ...data,
    normalizedAmount: convertToBaseCurrency(data.amount, data.currency),
  });
  
  await updateBudgetProgress(data.category, data.amount);
  return transaction;
}
```

### Budget Goals

Set and track financial goals:

| Goal Type | Description |
|-----------|-------------|
| Monthly | Limit spending per category |
| Savings | Target amount to save |
| Debt | Pay off specific debts |
| Investment | Contribution targets |
| Custom | Any financial milestone |

> "The envelope budgeting system helps users allocate their income to specific categories, ensuring they never overspend."

### Visual Reports

Comprehensive dashboards and reports:
- **Spending by category** - Pie chart breakdown
- **Monthly comparison** - Bar graph trends
- **Income vs. expenses** - Line chart over time
- **Net worth** - Asset tracking
- **Cash flow** - Money in and out

```javascript
// Generate spending report
function generateMonthlyReport(userId, year, month) {
  const transactions = getTransactions(userId, year, month);
  const income = transactions.filter(t => t.amount > 0);
  const expenses = transactions.filter(t => t.amount < 0);
  
  const byCategory = groupBy(expenses, 'category');
  const categoryTotals = mapValues(byCategory, t => sum(t));
  
  return {
    totalIncome: sum(income),
    totalExpenses: sum(expenses),
    savingsRate: (sum(income) + sum(expenses)) / sum(income),
    byCategory: categoryTotals,
    topExpenses: sortBy(expenses, 'amount').slice(0, 10),
  };
}
```

### Bank Integration

Securely connect your bank accounts:
- **Plaid** - Major US banks support
- **Plaid Europe** - EU bank connections
- **Manual** - Add accounts without integration
- **Read-only** - Your credentials are never stored

---

*Built with React, Node.js, PostgreSQL, Plaid API*