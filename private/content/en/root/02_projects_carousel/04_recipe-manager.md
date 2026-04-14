---
title: "Recipe Manager"
description: "Personal recipe collection and meal planner with nutritional information"
pubDate: 2024-06-08
author: "Mario"
---

Organize your favorite recipes and plan your meals effortlessly. This comprehensive app combines a recipe database, meal planning, shopping lists, and nutritional tracking in one seamless experience.

### Recipe Database

Store and organize your recipes with a powerful search:

- **Manual entry** - Add your own recipes
- **Import** - Paste URLs to auto-extract recipe data
- **Photo gallery** - Upload mouth-watering images
- **Categories** - Organize by cuisine, meal type, occasion
- **Tags** - Quick filters for dietary needs

```javascript
// Recipe import from URL
async function importRecipe(url) {
  const html = await fetch(url).then(r => r.text());
  const parser = new RecipeParser();
  const recipe = parser.extract(html);
  
  return db.recipes.create({
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.steps,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    source: url,
  });
}
```

### Meal Planner

Plan your week with drag-and-drop:
- Weekly calendar view
- Auto-suggest based on preferences
- Scale recipes for serving size
- Balance nutritional goals

> "The meal planner reduces food waste by 35% by helping users buy exactly what they need."

### Shopping List Generator

Automatically create shopping lists from meal plans:
- **Combine duplicates** - 3 tomatoes + 2 tomatoes = 5 tomatoes
- **Categorize** - Produce, dairy, meat, pantry
- **Check off items** - As you shop
- **Share** - Send to family members

```typescript
// Generate shopping list
interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

function generateShoppingList(meals: MealPlan[]): ShoppingItem[] {
  const ingredients = meals.flatMap(m => m.ingredients);
  const combined = new Map<string, ShoppingItem>();
  
  for (const ing of ingredients) {
    const key = `${ing.name}-${ing.unit}`;
    if (combined.has(key)) {
      combined.get(key)!.quantity += ing.quantity;
    } else {
      combined.set(key, {
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        category: ing.category,
      });
    }
  }
  
  return Array.from(combined.values());
}
```

### Nutritional Information

Every recipe includes:
- Calories, protein, carbs, fat
- Vitamins and minerals
- Fiber and sodium
- Dietary flags (vegan, gluten-free, etc.)

---

*Built with Flutter, Firebase, Spoonacular API*