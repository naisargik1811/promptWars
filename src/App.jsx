import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  CheckSquare, 
  AlertTriangle, 
  RefreshCw, 
  ChevronRight, 
  Compass, 
  Egg, 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  Layers, 
  Plus, 
  X,
  BookOpen,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Info
} from 'lucide-react';
import { generateMealPlan } from './mealPlannerService';
import './App.css';

function App() {
  // Setup input states
  const [dailySchedule, setDailySchedule] = useState('busy-workday');
  const [cookingTime, setCookingTime] = useState('under-30');
  const [servings, setServings] = useState(2);
  const [budget, setBudget] = useState(500);
  
  // Dietary Restrictions
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Low-Carb'];
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  // Pantry Essentials
  const [pantryInput, setPantryInput] = useState('');
  const [pantryEssentials, setPantryEssentials] = useState(['Olive Oil', 'Salt', 'Black Pepper', 'Garlic']);

  // Results State
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  // Add custom pantry item
  const handleAddPantry = (e) => {
    e.preventDefault();
    if (pantryInput.trim() && !pantryEssentials.includes(pantryInput.trim())) {
      setPantryEssentials([...pantryEssentials, pantryInput.trim()]);
      setPantryInput('');
    }
  };

  // Remove pantry item
  const handleRemovePantry = (item) => {
    setPantryEssentials(pantryEssentials.filter(i => i !== item));
  };

  // Toggle dietary option
  const toggleDietary = (option) => {
    if (dietaryRestrictions.includes(option)) {
      setDietaryRestrictions(dietaryRestrictions.filter(item => item !== option));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, option]);
    }
  };

  // Generate the list
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const plan = await generateMealPlan({
        dailySchedule,
        cookingTime,
        servings,
        dietaryRestrictions,
        budget,
        pantryEssentials
      });
      setMealPlan(plan);
      // Reset checklist states
      setCompletedItems({});
      setCompletedTasks({});
    } catch (error) {
      console.error("Error generating plan", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle checklist item
  const toggleGroceryItem = (item) => {
    setCompletedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Toggle checklist task step
  const toggleTaskStep = (stepKey) => {
    setCompletedTasks(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  return (
    <div className="app-container">
      {/* Header section with Glassmorphic effects */}
      <header className="app-header">
        <div className="header-logo">
          <Sparkles className="icon-sparkle" />
          <h1>PrimalPrep</h1>
        </div>
        <p className="header-tagline">Craft custom recipe workflows, personalized groceries, and budget-feasible meal timelines.</p>
      </header>

      <main className="app-grid">
        {/* Settings Panel */}
        <section className="settings-panel">
          <h2 className="section-title">
            <Compass className="title-icon" /> Daily Setup
          </h2>
          <p className="section-desc">Customize your schedule, dietary rules, and kitchen targets.</p>

          <div className="input-group">
            <label className="input-label">
              <Calendar className="label-icon" /> Your Day's Schedule
            </label>
            <div className="select-wrapper">
              <select 
                value={dailySchedule} 
                onChange={(e) => setDailySchedule(e.target.value)}
                className="select-field"
              >
                <option value="busy-workday">💼 Busy Workday (Quick & Prep-friendly)</option>
                <option value="relaxed-weekend">🏡 Relaxed Weekend (Leisurely Cooking)</option>
                <option value="active-gym-day">💪 Active Workout Day (High Protein & Energy)</option>
                <option value="busy-travel">✈️ Travel / Out & About (Ultra Minimalist)</option>
              </select>
            </div>
          </div>

          <div className="grid-2-col">
            <div className="input-group">
              <label className="input-label">
                <Clock className="label-icon" /> Max Cook Time
              </label>
              <div className="select-wrapper">
                <select 
                  value={cookingTime} 
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="select-field"
                >
                  <option value="under-30">⚡ Under 30 mins</option>
                  <option value="under-60">⏳ Under 60 mins</option>
                  <option value="any">🍲 Any duration</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                <Users className="label-icon" /> Target Servings
              </label>
              <div className="servings-counter">
                <button 
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="counter-btn"
                >-</button>
                <span className="counter-val">{servings}</span>
                <button 
                  onClick={() => setServings(servings + 1)}
                  className="counter-btn"
                >+</button>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">₹</span> Daily Budget (₹)
            </label>
            <div className="slider-container">
              <input 
                type="range" 
                min="100" 
                max="2500" 
                step="50"
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                className="slider-field"
              />
              <div className="slider-labels">
                <span>₹100</span>
                <span className="budget-bubble">₹{budget}</span>
                <span>₹2500</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Dietary Lifestyle</label>
            <div className="pills-grid">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleDietary(option)}
                  className={`pill-btn ${dietaryRestrictions.includes(option) ? 'active' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Pantry Essentials (Avoid buying these)</label>
            <form onSubmit={handleAddPantry} className="pantry-form">
              <input 
                type="text" 
                placeholder="e.g., Rice, Soy sauce..." 
                value={pantryInput}
                onChange={(e) => setPantryInput(e.target.value)}
                className="text-input"
              />
              <button type="submit" className="add-btn">
                <Plus size={18} />
              </button>
            </form>
            <div className="pantry-list">
              {pantryEssentials.map((item) => (
                <span key={item} className="pantry-tag">
                  {item}
                  <button onClick={() => handleRemovePantry(item)} className="tag-remove">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="generate-btn"
          >
            {loading ? (
              <>
                <RefreshCw className="spinner" /> Generating Plan...
              </>
            ) : (
              <>
                Generate Meal To-Do List <ArrowRight size={18} />
              </>
            )}
          </button>
        </section>

        {/* Results / Meal Plan Workspace */}
        <section className="results-panel">
          {!mealPlan && !loading ? (
            <div className="empty-state">
              <BookOpen size={48} className="empty-icon" />
              <h3>No Meal Plan Generated Yet</h3>
              <p>Configure your cooking options in the left panel and click "Generate Meal To-Do List" to build your custom schedule.</p>
            </div>
          ) : loading ? (
            <div className="loading-state">
              <div className="loading-ring"></div>
              <p>Tailoring recipes to your schedule...</p>
              <p className="loading-sub">Calculating ingredient swaps and budget feasibility...</p>
            </div>
          ) : (
            <div className="results-content animate-fade-in">
              {/* Budget Feasibility Summary Alert */}
              <div className={`budget-alert ${mealPlan.budget.color}`}>
                <div className="alert-header">
                  <div className="alert-title-wrapper">
                    {mealPlan.budget.isFeasible ? (
                      <CheckSquare className="alert-icon" />
                    ) : (
                      <AlertTriangle className="alert-icon" />
                    )}
                    <h4>Budget Analysis: {mealPlan.budget.isFeasible ? 'Feasible' : 'Budget Alert'}</h4>
                  </div>
                  <span className="cost-tag">₹{mealPlan.budget.estimatedCost} est. cost</span>
                </div>
                <p className="alert-text">{mealPlan.budget.strategy}</p>
              </div>

              {/* Day Overview Meta Tags */}
              <div className="meta-banner">
                <div className="meta-item">
                  <span className="meta-label">Schedule</span>
                  <span className="meta-val">{mealPlan.meta.schedule.replace('-', ' ')}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Servings</span>
                  <span className="meta-val">{mealPlan.meta.servings} People</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Diet</span>
                  <span className="meta-val">{mealPlan.meta.dietLabel}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Max Cooking Time</span>
                  <span className="meta-val">{mealPlan.meta.cookingTime.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Breakfast / Lunch / Dinner Daily Schedule */}
              <div className="meals-section">
                <h3 className="sub-title">👨‍🍳 Cooking Schedule & Checklist</h3>
                
                {/* Breakfast Card */}
                <div className="meal-card">
                  <div className="meal-badge breakfast">
                    <Coffee size={16} /> Breakfast
                  </div>
                  <div className="meal-header">
                    <h4>{mealPlan.breakfast.name}</h4>
                    <span className="time-badge">{mealPlan.breakfast.prepTime} prep + {mealPlan.breakfast.cookTime} cook</span>
                  </div>
                  <div className="meal-ingredients-list">
                    <strong>Ingredients needed:</strong> {mealPlan.breakfast.ingredients.join(', ')}
                  </div>
                  <div className="cooking-steps">
                    <h5>Workflow Tasks:</h5>
                    <ol>
                      {mealPlan.breakfast.steps.map((step, idx) => {
                        const stepKey = `b-${idx}`;
                        return (
                          <li key={idx} className={completedTasks[stepKey] ? 'completed' : ''}>
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={!!completedTasks[stepKey]} 
                                onChange={() => toggleTaskStep(stepKey)}
                              />
                              <span className="checkmark"></span>
                              <span className="step-text">{step}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>

                {/* Lunch Card */}
                <div className="meal-card">
                  <div className="meal-badge lunch">
                    <Utensils size={16} /> Lunch
                  </div>
                  <div className="meal-header">
                    <h4>{mealPlan.lunch.name}</h4>
                    <span className="time-badge">{mealPlan.lunch.prepTime} prep + {mealPlan.lunch.cookTime} cook</span>
                  </div>
                  <div className="meal-ingredients-list">
                    <strong>Ingredients needed:</strong> {mealPlan.lunch.ingredients.join(', ')}
                  </div>
                  <div className="cooking-steps">
                    <h5>Workflow Tasks:</h5>
                    <ol>
                      {mealPlan.lunch.steps.map((step, idx) => {
                        const stepKey = `l-${idx}`;
                        return (
                          <li key={idx} className={completedTasks[stepKey] ? 'completed' : ''}>
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={!!completedTasks[stepKey]} 
                                onChange={() => toggleTaskStep(stepKey)}
                              />
                              <span className="checkmark"></span>
                              <span className="step-text">{step}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>

                {/* Dinner Card */}
                <div className="meal-card">
                  <div className="meal-badge dinner">
                    <Utensils size={16} /> Dinner
                  </div>
                  <div className="meal-header">
                    <h4>{mealPlan.dinner.name}</h4>
                    <span className="time-badge">{mealPlan.dinner.prepTime} prep + {mealPlan.dinner.cookTime} cook</span>
                  </div>
                  <div className="meal-ingredients-list">
                    <strong>Ingredients needed:</strong> {mealPlan.dinner.ingredients.join(', ')}
                  </div>
                  <div className="cooking-steps">
                    <h5>Workflow Tasks:</h5>
                    <ol>
                      {mealPlan.dinner.steps.map((step, idx) => {
                        const stepKey = `d-${idx}`;
                        return (
                          <li key={idx} className={completedTasks[stepKey] ? 'completed' : ''}>
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={!!completedTasks[stepKey]} 
                                onChange={() => toggleTaskStep(stepKey)}
                              />
                              <span className="checkmark"></span>
                              <span className="step-text">{step}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Grocery List & Substitutions Grid */}
              <div className="grid-2-col">
                {/* Grocery Shopping List */}
                <div className="grocery-card">
                  <h3 className="card-title">
                    <ShoppingBag size={20} className="title-icon" /> Grocery List
                  </h3>
                  <p className="card-subtitle">Check items you already have or when bought</p>
                  
                  {Object.entries(mealPlan.groceryCategories).map(([category, items]) => {
                    if (items.length === 0) return null;
                    return (
                      <div key={category} className="grocery-category">
                        <h5 className="category-header">{category.replace(/([A-Z])/g, ' $1')}</h5>
                        <ul className="grocery-checklist">
                          {items.map((item, idx) => (
                            <li key={idx} className={`grocery-item ${completedItems[item.name] || item.inPantry ? 'checked' : ''}`}>
                              <label className="checkbox-container">
                                <input 
                                  type="checkbox"
                                  checked={!!(completedItems[item.name] || item.inPantry)}
                                  onChange={() => toggleGroceryItem(item.name)}
                                />
                                <span className="checkmark"></span>
                                <span className="item-name">{item.name}</span>
                                {item.inPantry && <span className="pantry-label">In Pantry</span>}
                                {!item.inPantry && item.estimatedPrice > 0 && (
                                  <span className="price-tag">₹{item.estimatedPrice.toFixed(2)}</span>
                                )}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Substitutions & Money Savers */}
                <div className="subs-card">
                  <h3 className="card-title">
                    <Layers size={20} className="title-icon" /> Smart Ingredient Swaps
                  </h3>
                  <p className="card-subtitle">Swap premium or restricted foods to fit your kitchen needs</p>
                  <div className="subs-list">
                    {mealPlan.substitutions.map((sub, idx) => (
                      <div key={idx} className="sub-item">
                        <div className="sub-original">
                          <span className="badge-original">Avoid / Costly</span>
                          <span className="sub-name">{sub.original}</span>
                        </div>
                        <ChevronRight className="swap-arrow" />
                        <div className="sub-replacement">
                          <span className="badge-replacement">Swap With</span>
                          <span className="sub-name">{sub.replacement}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="kitchen-tips">
                    <div className="tip-header">
                      <Info size={16} />
                      <h5>Anti-Waste Tip:</h5>
                    </div>
                    <p>Before leaving for the grocery store, check your fridge crisper drawer. Leftover spinach or onions can be seamlessly incorporated into breakfast or lunch bowls regardless of the recipe!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
