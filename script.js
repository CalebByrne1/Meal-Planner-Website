// ============================================================
//  SUPPER PLANNER — script.js
// ============================================================

// ── Walmart Aisle Definitions ────────────────────────────────
const WALMART_AISLES = [
  { key: 'produce',    label: 'Fresh Produce',          sub: 'Aisle 1–2',        icon: '🥦', bg: '#EAF3DE',
    keywords: ['lettuce','romaine','spinach','kale','arugula','cabbage','onion','garlic','ginger','tomato','potato','carrot','celery','broccoli','cauliflower','asparagus','zucchini','squash','cucumber','bell pepper','pepper','mushroom','corn','pea','snap pea','green bean','bean sprout','avocado','lime','lemon','orange','apple','banana','mango','strawberr','blueberr','raspberr','grape','peach','pear','plum','pineapple','watermelon','cantaloupe','herb','cilantro','parsley','basil','mint','thyme','rosemary','dill','chive','green onion','scallion','shallot','jalapen','serrano','leek','parsnip','turnip','radish','beet','sweet potato','yam','artichoke','brussels','bok choy','eggplant','okra'] },
  { key: 'meat',       label: 'Meat & Seafood',         sub: 'Back of store',    icon: '🥩', bg: '#FAECE7',
    keywords: ['beef','ground beef','steak','chuck','sirloin','brisket','roast','chicken breast','chicken thigh','chicken wing','chicken drum','whole chicken','ground chicken','turkey','ground turkey','pork chop','pork loin','pork shoulder','bacon','sausage','ham','ribs','lamb','veal','salmon','shrimp','tilapia','cod','tuna','halibut','mahi','catfish','trout','crab','lobster','scallop','clam','mussel','oyster','anchov','sardine','fish fillet','seafood','meat','protein'] },
  { key: 'dairy',      label: 'Dairy & Eggs',           sub: 'Refrigerated wall',icon: '🥛', bg: '#E6F1FB',
    keywords: ['milk','cream','half and half','butter','margarine','cheese','cheddar','mozzarella','parmesan','feta','ricotta','cottage cheese','cream cheese','brie','gouda','swiss','provolone','monterey','colby','sour cream','yogurt','greek yogurt','egg','whipping cream','heavy cream','buttermilk','kefir','whipped cream','string cheese','shredded cheese','sliced cheese'] },
  { key: 'frozen',     label: 'Frozen Foods',           sub: 'Frozen aisle',     icon: '❄️', bg: '#EEEDFE',
    keywords: ['frozen','ice cream','frozen vegetable','frozen fruit','frozen pizza','frozen meal','frozen chicken','frozen beef','frozen fish','frozen shrimp','tater tot','french frie','edamame','frozen dinner','popsicle','sorbet','gelato','frozen waffle','frozen burrito'] },
  { key: 'bakery',     label: 'Bread & Bakery',         sub: 'Bakery aisle',     icon: '🍞', bg: '#FAEEDA',
    keywords: ['bread','bun','roll','bagel','english muffin','pita','naan','tortilla','wrap','taco shell','tostada','crouton','breadcrumb','panko','pizza dough','pie crust','pastry','croissant','muffin','donut','cake','brownie','cookie','biscuit','cracker'] },
  { key: 'pasta',      label: 'Pasta, Rice & Grains',   sub: 'Dry goods aisle',  icon: '🍝', bg: '#F1EFE8',
    keywords: ['pasta','spaghetti','penne','fettuccine','linguine','rigatoni','farfalle','rotini','lasagna noodle','rice','white rice','brown rice','jasmine rice','basmati','wild rice','quinoa','couscous','farro','barley','oat','oatmeal','grits','polenta','cornmeal','flour','bread flour','all-purpose flour','whole wheat flour','noodle','ramen noodle','udon','soba','vermicelli','orzo'] },
  { key: 'canned',     label: 'Canned & Jarred Goods',  sub: 'Center store',     icon: '🥫', bg: '#E1F5EE',
    keywords: ['canned','can of','jar of','canned tomato','tomato sauce','tomato paste','diced tomato','crushed tomato','marinara','pasta sauce','pizza sauce','salsa','enchilada sauce','canned bean','black bean','kidney bean','chickpea','lentil','canned corn','canned tuna','canned salmon','broth','stock','chicken broth','beef broth','vegetable broth','coconut milk','cream of','soup','canned pumpkin','artichoke heart','roasted red pepper','olives','pickle','relish','sauerkraut'] },
  { key: 'condiments', label: 'Condiments & Sauces',    sub: 'Condiment aisle',  icon: '🍶', bg: '#FBEAF0',
    keywords: ['ketchup','mustard','mayonnaise','mayo','ranch','caesar dressing','italian dressing','vinaigrette','dressing','hot sauce','sriracha','tabasco','worcestershire','soy sauce','teriyaki','hoisin','oyster sauce','fish sauce','ponzu','mirin','rice vinegar','apple cider vinegar','white wine vinegar','balsamic','vinegar','bbq sauce','buffalo sauce','tahini','peanut butter','almond butter','jelly','jam','honey','maple syrup','agave','molasses','chocolate sauce'] },
  { key: 'pantry',     label: 'Pantry & Baking',        sub: 'Baking aisle',     icon: '🧂', bg: '#FCEBEB',
    keywords: ['salt','pepper','olive oil','vegetable oil','canola oil','coconut oil','sesame oil','cooking spray','sugar','brown sugar','powdered sugar','vanilla','baking soda','baking powder','yeast','cornstarch','arrowroot','cocoa','chocolate chip','dried herb','italian seasoning','oregano','thyme','cumin','paprika','chili powder','cayenne','turmeric','cinnamon','nutmeg','allspice','cloves','bay leaf','garlic powder','onion powder','taco seasoning','cajun seasoning','everything bagel','seasoning','spice','bouillon','red pepper flake','white pepper'] },
  { key: 'beverages',  label: 'Beverages',               sub: 'Beverage aisle',   icon: '🥤', bg: '#E6F1FB',
    keywords: ['water','sparkling water','juice','orange juice','apple juice','lemonade','iced tea','coffee','tea','soda','pop','beer','wine','white wine','red wine','sports drink','energy drink','oat milk','almond milk','soy milk','coconut water'] },
  { key: 'other',      label: 'Other',                   sub: 'Various aisles',   icon: '🛒', bg: '#F1EFE8', keywords: [] },
];

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const DEFAULT_MEALS = [
  { id:1,  name:'Spaghetti Bolognese',          protein:'beef',      ingredients:{ 'Meat & Seafood':['Ground beef (500g)'], 'Pasta, Rice & Grains':['Spaghetti (400g)'], 'Fresh Produce':['Onion','Garlic','Canned tomatoes'], 'Pantry & Baking':['Olive oil','Italian seasoning'] } },
  { id:2,  name:'Chicken Tacos',                protein:'chicken',   ingredients:{ 'Meat & Seafood':['Chicken breast (400g)'], 'Fresh Produce':['Lettuce','Tomato','Lime','Avocado'], 'Dairy & Eggs':['Sour cream','Shredded cheese'], 'Bread & Bakery':['Taco shells'], 'Pantry & Baking':['Taco seasoning'] } },
  { id:3,  name:'Pork Chops & Mashed Potatoes', protein:'pork',      ingredients:{ 'Meat & Seafood':['Pork chops (4)'], 'Fresh Produce':['Potatoes (1kg)','Garlic'], 'Dairy & Eggs':['Butter','Milk'], 'Pantry & Baking':['Salt','Pepper','Olive oil'] } },
  { id:4,  name:'Salmon with Rice',             protein:'fish',      ingredients:{ 'Meat & Seafood':['Salmon fillets (4)'], 'Pasta, Rice & Grains':['White rice (2 cups)'], 'Fresh Produce':['Lemon','Broccoli'], 'Condiments & Sauces':['Soy sauce'], 'Pantry & Baking':['Olive oil'] } },
  { id:5,  name:'Beef Stir Fry',                protein:'beef',      ingredients:{ 'Meat & Seafood':['Beef strips (400g)'], 'Fresh Produce':['Bell peppers','Snap peas','Broccoli','Garlic','Ginger'], 'Condiments & Sauces':['Soy sauce','Sesame oil'], 'Pantry & Baking':['Cornstarch'] } },
  { id:6,  name:'Chicken Caesar Salad',         protein:'chicken',   ingredients:{ 'Meat & Seafood':['Chicken breast (2)'], 'Fresh Produce':['Romaine lettuce','Lemon'], 'Dairy & Eggs':['Parmesan cheese'], 'Condiments & Sauces':['Caesar dressing'], 'Bread & Bakery':['Croutons'] } },
  { id:7,  name:'Homemade Pizza',               protein:'other',     ingredients:{ 'Fresh Produce':['Bell pepper','Mushrooms','Onion'], 'Dairy & Eggs':['Mozzarella cheese'], 'Bread & Bakery':['Pizza dough'], 'Canned & Jarred Goods':['Pizza sauce'], 'Pantry & Baking':['Olive oil','Italian seasoning'] } },
  { id:8,  name:'Garlic Butter Shrimp Pasta',   protein:'fish',      ingredients:{ 'Meat & Seafood':['Shrimp (300g)'], 'Pasta, Rice & Grains':['Linguine (300g)'], 'Fresh Produce':['Garlic','Parsley','Lemon'], 'Dairy & Eggs':['Butter'], 'Pantry & Baking':['Olive oil'] } },
  { id:9,  name:'Beef Tacos',                   protein:'beef',      ingredients:{ 'Meat & Seafood':['Ground beef (400g)'], 'Fresh Produce':['Lettuce','Tomato','Lime','Avocado'], 'Dairy & Eggs':['Sour cream','Shredded cheese'], 'Bread & Bakery':['Taco shells'], 'Pantry & Baking':['Taco seasoning'] } },
  { id:10, name:'Chicken Fried Rice',           protein:'chicken',   ingredients:{ 'Meat & Seafood':['Chicken breast (300g)'], 'Pasta, Rice & Grains':['Cooked rice (3 cups)'], 'Fresh Produce':['Carrots','Peas','Green onion','Garlic'], 'Condiments & Sauces':['Soy sauce','Sesame oil'], 'Dairy & Eggs':['Eggs (2)'] } },
];

// ── State ────────────────────────────────────────────────────
let meals, weekPlan, checkedItems, nextId;

function loadState() {
  try { meals = JSON.parse(localStorage.getItem('sp-meals')) || deepClone(DEFAULT_MEALS); } catch { meals = deepClone(DEFAULT_MEALS); }
  try { weekPlan = JSON.parse(localStorage.getItem('sp-week')) || null; } catch { weekPlan = null; }
  try { checkedItems = JSON.parse(localStorage.getItem('sp-checked')) || []; } catch { checkedItems = []; }
  nextId = Math.max(...meals.map(m => m.id), 0) + 1;
}

function saveState() {
  try { localStorage.setItem('sp-meals', JSON.stringify(meals)); } catch {}
  try { localStorage.setItem('sp-week', JSON.stringify(weekPlan)); } catch {}
  try { localStorage.setItem('sp-checked', JSON.stringify(checkedItems)); } catch {}
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
function getMeal(id) { return meals.find(m => m.id === id); }

// ── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab="' + tab + '"]').forEach(b => b.classList.add('active'));
      document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');
      // close mobile nav
      document.getElementById('mobile-nav').classList.remove('open');
    });
  });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('open');
  });
}

// ── Weekly Plan ──────────────────────────────────────────────
function generateWeek() {
  if (meals.length < 7) {
    alert('You need at least 7 meals to fill the week without repeats. Add ' + (7 - meals.length) + ' more.');
    return;
  }

  let best = null;
  for (let attempt = 0; attempt < 400; attempt++) {
    const shuffled = [...meals].sort(() => Math.random() - 0.5).slice(0, 7);
    let valid = true;
    for (let i = 1; i < shuffled.length; i++) {
      if (shuffled[i].protein === shuffled[i - 1].protein) { valid = false; break; }
    }
    if (valid) { best = shuffled; break; }
    if (!best) best = shuffled;
  }

  weekPlan = best.map(m => m.id);
  checkedItems = [];
  saveState();
  renderWeek();
  renderGrocery();
}

function renderWeek() {
  const grid = document.getElementById('week-grid');
  if (!weekPlan || weekPlan.length === 0) {
    grid.innerHTML = '<p class="empty-state">Click "Regenerate Week" to build your plan.</p>';
    return;
  }

  grid.innerHTML = weekPlan.map((id, i) => {
    const meal = getMeal(id);
    if (!meal) return '';
    return `
      <div class="day-card" id="daycard-${i}">
        <div class="day-header" onclick="toggleDayCard(${i})">
          <span class="day-label">${DAYS[i]}</span>
          <span class="day-meal-name">${meal.name}</span>
          <span class="protein-chip chip-${meal.protein}">${meal.protein}</span>
          <span class="chevron">▼</span>
        </div>
        <div class="day-body" id="daybody-${i}">
          ${renderDayIngEditor(meal, i)}
        </div>
      </div>`;
  }).join('');
}

function toggleDayCard(i) {
  document.getElementById('daycard-' + i).classList.toggle('open');
}

function renderDayIngEditor(meal, dayIdx) {
  const cats = Object.keys(meal.ingredients || {});
  let html = cats.length === 0
    ? '<p class="no-ings">No ingredients yet. Add a category below.</p>'
    : cats.map(cat => renderCatBlock(meal, cat, dayIdx, 'day')).join('');
  html += renderAddCatRow(meal.id, dayIdx, 'day');
  return html;
}

function renderCatBlock(meal, cat, idx, mode) {
  const items = meal.ingredients[cat] || [];
  const safeId = safeCatId(meal.id, cat);
  return `
    <div class="ing-category" id="ingcat-${safeId}">
      <div class="ing-category-header">
        <span class="ing-category-label">${cat}</span>
        <button class="btn-sm danger" onclick="deleteCat(${meal.id},'${esc(cat)}',${idx},'${mode}')">Remove</button>
      </div>
      <div class="ing-rows">
        ${items.map((item, ii) => `
          <div class="ing-row">
            <input class="ing-input" type="text" value="${escAttr(item)}" onchange="updateIng(${meal.id},'${esc(cat)}',${ii},this.value)" />
            <button class="icon-btn" onclick="deleteIng(${meal.id},'${esc(cat)}',${ii},${idx},'${mode}')">×</button>
          </div>`).join('')}
      </div>
      <div class="add-ing-row">
        <input class="add-ing-input" type="text" placeholder="Add ingredient…" id="newing-${safeId}"
          onkeydown="if(event.key==='Enter') addIng(${meal.id},'${esc(cat)}',${idx},'${mode}')" />
        <button class="btn-sm" onclick="addIng(${meal.id},'${esc(cat)}',${idx},'${mode}')">Add</button>
      </div>
    </div>`;
}

function renderAddCatRow(mealId, idx, mode) {
  const options = WALMART_AISLES.map(a => `<option value="${a.label}">${a.icon} ${a.label}</option>`).join('');
  return `
    <div class="add-cat-row">
      <select class="cat-select" id="catsel-${mealId}-${idx}-${mode}">${options}</select>
      <button class="btn-sm" onclick="addCat(${mealId},${idx},'${mode}')">Add Category</button>
    </div>`;
}

// ── Ingredient CRUD ──────────────────────────────────────────
function updateIng(mealId, cat, idx, val) {
  const meal = getMeal(mealId);
  if (!meal) return;
  meal.ingredients[cat][idx] = val;
  saveState();
  renderGrocery();
}

function deleteIng(mealId, cat, idx, refIdx, mode) {
  const meal = getMeal(mealId);
  if (!meal) return;
  meal.ingredients[cat].splice(idx, 1);
  if (meal.ingredients[cat].length === 0) delete meal.ingredients[cat];
  saveState();
  refreshEditor(mealId, refIdx, mode);
  renderGrocery();
}

function addIng(mealId, cat, refIdx, mode) {
  const safeId = safeCatId(mealId, cat);
  const el = document.getElementById('newing-' + safeId);
  if (!el) return;
  const val = el.value.trim();
  if (!val) return;
  const meal = getMeal(mealId);
  if (!meal.ingredients[cat]) meal.ingredients[cat] = [];
  meal.ingredients[cat].push(val);
  el.value = '';
  saveState();
  refreshEditor(mealId, refIdx, mode);
  renderGrocery();
}

function addCat(mealId, refIdx, mode) {
  const el = document.getElementById(`catsel-${mealId}-${refIdx}-${mode}`);
  if (!el) return;
  const cat = el.value.trim();
  if (!cat) return;
  const meal = getMeal(mealId);
  if (!meal.ingredients) meal.ingredients = {};
  if (!meal.ingredients[cat]) meal.ingredients[cat] = [];
  saveState();
  refreshEditor(mealId, refIdx, mode);
}

function deleteCat(mealId, cat, refIdx, mode) {
  const meal = getMeal(mealId);
  if (!meal) return;
  delete meal.ingredients[cat];
  saveState();
  refreshEditor(mealId, refIdx, mode);
  renderGrocery();
}

function refreshEditor(mealId, refIdx, mode) {
  const meal = getMeal(mealId);
  if (!meal) return;
  if (mode === 'day') {
    const el = document.getElementById('daybody-' + refIdx);
    if (el) el.innerHTML = renderDayIngEditor(meal, refIdx);
  } else {
    const el = document.getElementById('mealbody-' + mealId);
    if (el) el.innerHTML = renderMealIngEditor(meal);
  }
}

// ── Grocery List ─────────────────────────────────────────────
function classifyIngredient(item) {
  const lower = item.toLowerCase();
  for (const aisle of WALMART_AISLES) {
    if (aisle.key === 'other') continue;
    if (aisle.keywords.some(kw => lower.includes(kw))) return aisle.key;
  }
  return 'other';
}

function buildGroceryByAisle() {
  const map = {};
  WALMART_AISLES.forEach(a => map[a.key] = new Set());
  if (!weekPlan) return map;

  weekPlan.forEach(id => {
    const meal = getMeal(id);
    if (!meal || !meal.ingredients) return;
    Object.entries(meal.ingredients).forEach(([cat, items]) => {
      items.forEach(item => {
        if (!item.trim()) return;
        const aisleByLabel = WALMART_AISLES.find(a => a.label === cat);
        const key = aisleByLabel ? aisleByLabel.key : classifyIngredient(item);
        map[key].add(item.trim());
      });
    });
  });
  return map;
}

function renderGrocery() {
  const content = document.getElementById('grocery-content');
  const map = buildGroceryByAisle();
  const active = WALMART_AISLES.filter(a => map[a.key] && map[a.key].size > 0);

  if (active.length === 0) {
    content.innerHTML = '<p class="empty-state">Generate a week first to see your grocery list.</p>';
    updateProgress(0, 0);
    return;
  }

  const total = active.reduce((s, a) => s + map[a.key].size, 0);
  updateProgress(checkedItems.length, total);

  content.innerHTML = active.map(aisle => {
    const items = [...map[aisle.key]];
    return `
      <div class="grocery-aisle">
        <div class="aisle-header">
          <div class="aisle-icon-wrap" style="background:${aisle.bg}">${aisle.icon}</div>
          <div>
            <div class="aisle-title">${aisle.label}</div>
            <div class="aisle-meta">${aisle.sub} · ${items.length} item${items.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="aisle-items">
          ${items.map(item => {
            const key = aisle.key + ':' + item;
            const checked = checkedItems.includes(key);
            return `
              <label class="grocery-item${checked ? ' checked' : ''}">
                <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleItem(this,'${esc(key)}',${total})">
                <span>${item}</span>
              </label>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

function toggleItem(el, key, total) {
  if (el.checked) {
    if (!checkedItems.includes(key)) checkedItems.push(key);
    el.closest('.grocery-item').classList.add('checked');
  } else {
    checkedItems = checkedItems.filter(k => k !== key);
    el.closest('.grocery-item').classList.remove('checked');
  }
  saveState();
  updateProgress(checkedItems.length, total);
}

function updateProgress(done, total) {
  const label = document.getElementById('progress-label');
  const fill = document.getElementById('progress-fill');
  const wrap = document.getElementById('progress-wrap');
  if (total === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  label.textContent = `${done} of ${total} items checked`;
  fill.style.width = Math.round((done / total) * 100) + '%';
}

function uncheckAll() {
  checkedItems = [];
  saveState();
  renderGrocery();
}

function copyGrocery() {
  const map = buildGroceryByAisle();
  const lines = WALMART_AISLES
    .filter(a => map[a.key] && map[a.key].size > 0)
    .map(a => `${a.icon} ${a.label} (${a.sub}):\n${[...map[a.key]].map(i => '  - ' + i).join('\n')}`)
    .join('\n\n');
  navigator.clipboard.writeText(lines).then(() => {
    const btn = document.getElementById('copy-btn');
    const old = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = old, 1800);
  });
}

// ── My Meals ─────────────────────────────────────────────────
function renderMeals() {
  const list = document.getElementById('meal-list');
  if (meals.length === 0) {
    list.innerHTML = '<p class="empty-state">No meals yet. Add one above.</p>';
    return;
  }
  list.innerHTML = meals.map(meal => `
    <div class="meal-card" id="mealcard-${meal.id}">
      <div class="meal-card-header" onclick="toggleMealCard(${meal.id})">
        <span class="meal-card-name">${meal.name}</span>
        <span class="protein-chip chip-${meal.protein}">${meal.protein}</span>
        <span class="chevron">▼</span>
        <button class="btn-sm danger" onclick="event.stopPropagation(); deleteMeal(${meal.id})">Remove</button>
      </div>
      <div class="meal-card-body" id="mealbody-${meal.id}">
        ${renderMealIngEditor(meal)}
      </div>
    </div>`).join('');
}

function renderMealIngEditor(meal) {
  const cats = Object.keys(meal.ingredients || {});
  let html = cats.length === 0
    ? '<p class="no-ings">No ingredients yet. Add a category below.</p>'
    : cats.map(cat => renderCatBlock(meal, cat, meal.id, 'meal')).join('');
  html += renderAddCatRow(meal.id, meal.id, 'meal');
  return html;
}

function toggleMealCard(id) {
  document.getElementById('mealcard-' + id).classList.toggle('open');
}

function addMeal() {
  const nameEl = document.getElementById('new-meal-name');
  const proteinEl = document.getElementById('new-meal-protein');
  const name = nameEl.value.trim();
  if (!name) { nameEl.focus(); return; }
  meals.push({ id: nextId++, name, protein: proteinEl.value, ingredients: {} });
  nameEl.value = '';
  saveState();
  renderMeals();
}

function deleteMeal(id) {
  if (!confirm('Remove this meal from your rotation?')) return;
  meals = meals.filter(m => m.id !== id);
  if (weekPlan) weekPlan = weekPlan.filter(mid => mid !== id);
  saveState();
  renderMeals();
  renderWeek();
  renderGrocery();
}

// ── Discover ─────────────────────────────────────────────────
async function getSuggestions() {
  const resultEl = document.getElementById('ai-result');
  const btn = document.getElementById('suggest-btn');
  btn.disabled = true;
  btn.textContent = 'Thinking…';
  resultEl.innerHTML = '<p class="status-msg">Asking Claude for suggestions based on your meals…</p>';

  const mealNames = meals.map(m => m.name).join(', ');
  const prompt = `I like these suppers: ${mealNames}. Suggest exactly 5 new supper meals I might enjoy. Respond ONLY with a JSON array, no markdown or backticks: [{"name":"Meal name","reason":"One sentence why I would like it","protein":"chicken"}]. Protein must be one of: chicken, beef, pork, fish, pasta, vegetarian, other.`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await resp.json();
    const text = data.content.map(c => c.text || '').join('');
    const suggestions = JSON.parse(text.replace(/```json|```/g, '').trim());

    resultEl.innerHTML = `<div class="suggestion-list">
      ${suggestions.map(s => `
        <div class="suggestion-row">
          <div class="suggestion-info">
            <div class="suggestion-name">${s.name}</div>
            <div class="suggestion-reason">${s.reason}</div>
          </div>
          <button class="btn-sm" onclick="addSuggestion(this)" data-meal='${JSON.stringify(s).replace(/'/g, "&#39;")}'>Add to my meals</button>
        </div>`).join('')}
    </div>`;
  } catch (e) {
    resultEl.innerHTML = '<p class="status-msg">Could not get suggestions — check your connection and try again.</p>';
  }

  btn.disabled = false;
  btn.textContent = 'Suggest New Meals ↗';
}

function addSuggestion(btn) {
  const s = JSON.parse(btn.getAttribute('data-meal'));
  meals.push({ id: nextId++, name: s.name, protein: s.protein || 'other', ingredients: {} });
  saveState();
  renderMeals();
  btn.textContent = 'Added!';
  btn.disabled = true;
}

// ── Helpers ──────────────────────────────────────────────────
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
function escAttr(s) { return String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function safeCatId(mealId, cat) { return mealId + '-' + String(cat).replace(/[^a-z0-9]/gi, '_'); }

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTabs();

  document.getElementById('generate-btn').addEventListener('click', generateWeek);
  document.getElementById('copy-btn').addEventListener('click', copyGrocery);
  document.getElementById('uncheck-btn').addEventListener('click', uncheckAll);
  document.getElementById('add-meal-btn').addEventListener('click', addMeal);
  document.getElementById('suggest-btn').addEventListener('click', getSuggestions);
  document.getElementById('new-meal-name').addEventListener('keydown', e => { if (e.key === 'Enter') addMeal(); });

  renderMeals();

  if (!weekPlan && meals.length >= 7) {
    generateWeek();
  } else {
    renderWeek();
    renderGrocery();
  }
});
