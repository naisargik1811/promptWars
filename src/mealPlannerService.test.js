import { describe, it, expect } from 'vitest';
import { generateMealPlan } from './mealPlannerService';

describe('mealPlannerService', () => {
  it('correctly calculates budget feasibility when budget is ample', async () => {
    const plan = await generateMealPlan({
      dailySchedule: 'relaxed-weekend',
      cookingTime: 'any',
      servings: 2,
      dietaryRestrictions: [],
      budget: 1000,
      pantryEssentials: []
    });

    expect(plan.budget.isFeasible).toBe(true);
    expect(plan.budget.surplusOrDeficit).toBeGreaterThan(0);
    expect(plan.budget.color).toBe('emerald');
  });

  it('correctly handles low budget constraints', async () => {
    const plan = await generateMealPlan({
      dailySchedule: 'busy-workday',
      cookingTime: 'under-30',
      servings: 4,
      dietaryRestrictions: ['Vegan'],
      budget: 200,
      pantryEssentials: []
    });

    expect(plan.budget.isFeasible).toBe(false);
    expect(plan.budget.color).toBe('rose');
  });

  it('correctly identifies pantry items and deducts price', async () => {
    const plan = await generateMealPlan({
      dailySchedule: 'busy-workday',
      cookingTime: 'under-30',
      servings: 1,
      dietaryRestrictions: [],
      budget: 500,
      pantryEssentials: ['Tofu', 'Spinach']
    });

    // Check that items containing "Tofu" or "Spinach" are marked inPantry
    let tofuChecked = false;
    let spinachChecked = false;

    Object.values(plan.groceryCategories).forEach(items => {
      items.forEach(item => {
        if (item.name.toLowerCase().includes('tofu')) {
          expect(item.inPantry).toBe(true);
          expect(item.estimatedPrice).toBe(0);
          tofuChecked = true;
        }
        if (item.name.toLowerCase().includes('spinach')) {
          expect(item.inPantry).toBe(true);
          expect(item.estimatedPrice).toBe(0);
          spinachChecked = true;
        }
      });
    });

    expect(tofuChecked || spinachChecked).toBe(true);
  });
});
