// ============================================================
//  SUPPER PLANNER — script.js
// ============================================================

// ── Walmart aisle definitions ────────────────────────────────
const WALMART_AISLES = [
  { key: 'produce',    label: 'Fresh Produce',          sub: 'Aisle 1–2',         icon: '🥦', bg: '#EAF3DE',
    keywords: ['lettuce','romaine','spinach','kale','arugula','cabbage','onion','garlic','ginger','tomato','potato','carrot','celery','broccoli','cauliflower','asparagus','zucchini','squash','cucumber','bell pepper','pepper','mushroom','corn','pea','snap pea','green bean','bean sprout','avocado','lime','lemon','orange','apple','banana','mango','strawberr','blueberr','raspberr','grape','peach','pear','plum','pineapple','watermelon','cantaloupe','herb','cilantro','parsley','basil','mint','thyme','rosemary','dill','chive','green onion','scallion','shallot','jalapen','serrano','leek','parsnip','turnip','radish','beet','sweet potato','yam','artichoke','brussels','bok choy','eggplant','okra'] },
  { key: 'meat',       label: 'Meat & Seafood',         sub: 'Back of store',     icon: '🥩', bg: '#FAECE7',
    keywords: ['beef','ground beef','steak','chuck','sirloin','brisket','roast','chicken breast','chicken thigh','chicken wing','chicken drum','whole chicken','ground chicken','chicken','turkey','ground turkey','pork chop','pork loin','pork shoulder','pork tenderloin','pork','bacon','sausage','chorizo','ham','ribs','lamb','veal','salmon','shrimp','tilapia','cod','tuna','halibut','mahi','catfish','trout','crab','lobster','scallop','clam','mussel','oyster','anchov','sardine','fish fillet','seafood','meat','protein'] },
  { key: 'dairy',      label: 'Dairy & Eggs',           sub: 'Refrigerated wall', icon: '🥛', bg: '#E6F1FB',
    keywords: ['milk','cream','half and half','butter','margarine','cheese','cheddar','mozzarella','parmesan','feta','ricotta','cottage cheese','cream cheese','brie','gouda','swiss','provolone','monterey','colby','sour cream','yogurt','greek yogurt','egg','whipping cream','heavy cream','buttermilk','kefir','whipped cream','string cheese','shredded cheese','sliced cheese'] },
  { key: 'frozen',     label: 'Frozen Foods',           sub: 'Frozen aisle',      icon: '❄️', bg: '#EEEDFE',
    keywords: ['frozen','ice cream','frozen vegetable','frozen fruit','frozen pizza','frozen meal','frozen chicken','frozen beef','frozen fish','frozen shrimp','tater tot','french frie','edamame','frozen dinner','popsicle','sorbet','gelato','frozen waffle','frozen burrito','puff pastry'] },
  { key: 'bakery',     label: 'Bread & Bakery',         sub: 'Bakery aisle',      icon: '🍞', bg: '#FAEEDA',
    keywords: ['bread','bun','roll','bagel','english muffin','pita','naan','flatbread','tortilla','wrap','taco shell','tostada','crouton','breadcrumb','panko','pizza dough','pie crust','pastry','croissant','muffin','donut','cake','brownie','cookie','biscuit','cracker','tortilla chip'] },
  { key: 'pasta',      label: 'Pasta, Rice & Grains',   sub: 'Dry goods aisle',   icon: '🍝', bg: '#F1EFE8',
    keywords: ['pasta','spaghetti','penne','fettuccine','linguine','rigatoni','farfalle','rotini','ziti','lasagna noodle','macaroni','elbow','rice','white rice','brown rice','jasmine rice','basmati','wild rice','arborio','quinoa','couscous','farro','barley','oat','oatmeal','grits','polenta','cornmeal','flour','bread flour','all-purpose flour','whole wheat flour','noodle','ramen noodle','udon','soba','vermicelli','orzo'] },
  { key: 'canned',     label: 'Canned & Jarred Goods',  sub: 'Center store',      icon: '🥫', bg: '#E1F5EE',
    keywords: ['canned','can of','jar of','canned tomato','tomato sauce','tomato paste','diced tomato','crushed tomato','marinara','pasta sauce','pizza sauce','salsa','enchilada sauce','canned bean','black bean','kidney bean','refried bean','baked bean','chickpea','lentil','canned corn','canned tuna','canned salmon','broth','stock','chicken broth','beef broth','vegetable broth','coconut milk','cream of','soup','canned pumpkin','artichoke heart','roasted red pepper','olive','pickle','relish','sauerkraut','green chile'] },
  { key: 'condiments', label: 'Condiments & Sauces',    sub: 'Condiment aisle',   icon: '🍶', bg: '#FBEAF0',
    keywords: ['ketchup','mustard','mayonnaise','mayo','ranch','caesar dressing','italian dressing','vinaigrette','dressing','hot sauce','sriracha','tabasco','worcestershire','soy sauce','teriyaki','hoisin','oyster sauce','fish sauce','ponzu','mirin','rice vinegar','apple cider vinegar','white wine vinegar','balsamic','vinegar','bbq sauce','barbecue sauce','buffalo sauce','pesto','tahini','peanut butter','almond butter','jelly','jam','honey','maple syrup','agave','molasses','chocolate sauce','curry paste'] },
  { key: 'pantry',     label: 'Pantry & Baking',        sub: 'Baking aisle',      icon: '🧂', bg: '#FCEBEB',
    keywords: ['salt','pepper','olive oil','vegetable oil','canola oil','coconut oil','sesame oil','cooking spray','sugar','brown sugar','powdered sugar','vanilla','baking soda','baking powder','yeast','cornstarch','arrowroot','cocoa','chocolate chip','dried herb','italian seasoning','oregano','thyme','cumin','paprika','smoked paprika','chili powder','curry powder','garam masala','cayenne','turmeric','cinnamon','nutmeg','allspice','cloves','bay leaf','garlic powder','onion powder','taco seasoning','cajun seasoning','everything bagel','seasoning','spice','bouillon','red pepper flake','white pepper','pine nut','walnut','almond','pecan','cashew'] },
  { key: 'beverages',  label: 'Beverages',              sub: 'Beverage aisle',    icon: '🥤', bg: '#E6F1FB',
    keywords: ['water','sparkling water','juice','orange juice','apple juice','lemonade','iced tea','coffee','tea','soda','pop','beer','wine','white wine','red wine','sports drink','energy drink','oat milk','almond milk','soy milk','coconut water'] },
  { key: 'other',      label: 'Other',                  sub: 'Various aisles',    icon: '🛒', bg: '#F1EFE8', keywords: [] },
];

const AISLE_BY_LABEL = Object.fromEntries(WALMART_AISLES.map(a => [a.label, a]));
const AISLE_BY_KEY = Object.fromEntries(WALMART_AISLES.map(a => [a.key, a]));

const DAYS = [
  { full: 'Monday', abbr: 'Mon' }, { full: 'Tuesday', abbr: 'Tue' }, { full: 'Wednesday', abbr: 'Wed' },
  { full: 'Thursday', abbr: 'Thu' }, { full: 'Friday', abbr: 'Fri' }, { full: 'Saturday', abbr: 'Sat' },
  { full: 'Sunday', abbr: 'Sun' },
];

const PROTEINS = [
  { value: 'chicken', label: 'Chicken' }, { value: 'beef', label: 'Beef' }, { value: 'pork', label: 'Pork' },
  { value: 'fish', label: 'Fish / Seafood' }, { value: 'pasta', label: 'Pasta' },
  { value: 'vegetarian', label: 'Vegetarian' }, { value: 'other', label: 'Other' },
];
const PROTEIN_LABEL = Object.fromEntries(PROTEINS.map(p => [p.value, p.label]));

// ── Inline icons ─────────────────────────────────────────────
const svg = (paths, w = 16) =>
  `<svg viewBox="0 0 16 16" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.6" ` +
  `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICON = {
  chevron:  svg('<path d="m4 6.3 4 4 4-4"/>', 15),
  lock:     svg('<rect x="3.6" y="7" width="8.8" height="6.4" rx="1.6"/><path d="M5.8 7V5.2a2.2 2.2 0 0 1 4.4 0V7"/>', 15),
  unlock:   svg('<rect x="3.6" y="7" width="8.8" height="6.4" rx="1.6"/><path d="M5.8 7V5.2a2.2 2.2 0 0 1 4.2-.8"/>', 15),
  shuffle:  svg('<path d="M2.4 5.4h2.9l5.4 5.2h2.1M2.4 10.6h2.9l5.4-5.2h2.1"/><path d="m11.4 3.3 1.8 2.1-1.8 2.1M11.4 8.5l1.8 2.1-1.8 2.1"/>', 15),
  close:    svg('<path d="m4.6 4.6 6.8 6.8m0-6.8-6.8 6.8"/>', 15),
  plus:     svg('<path d="M8 3.4v9.2M3.4 8h9.2"/>', 15),
  trash:    svg('<path d="M3.4 4.6h9.2M6.4 4.6V3.2h3.2v1.4M4.9 4.6l.6 8.3a1 1 0 0 0 1 .9h3a1 1 0 0 0 1-.9l.6-8.3"/>', 15),
};

// ── Starter data ─────────────────────────────────────────────
const DEFAULT_MEALS = [
  { id: 1,  name: 'Spaghetti Bolognese',          protein: 'beef',       ingredients: { 'Meat & Seafood': ['Ground beef (500g)'], 'Pasta, Rice & Grains': ['Spaghetti (400g)'], 'Fresh Produce': ['Onion', 'Garlic'], 'Canned & Jarred Goods': ['Crushed tomatoes'], 'Pantry & Baking': ['Olive oil', 'Italian seasoning'] } },
  { id: 2,  name: 'Chicken Tacos',                protein: 'chicken',    ingredients: { 'Meat & Seafood': ['Chicken breast (400g)'], 'Fresh Produce': ['Lettuce', 'Tomato', 'Lime', 'Avocado'], 'Dairy & Eggs': ['Sour cream', 'Shredded cheese'], 'Bread & Bakery': ['Taco shells'], 'Pantry & Baking': ['Taco seasoning'] } },
  { id: 3,  name: 'Pork Chops & Mashed Potatoes', protein: 'pork',       ingredients: { 'Meat & Seafood': ['Pork chops (4)'], 'Fresh Produce': ['Potatoes (1kg)', 'Garlic'], 'Dairy & Eggs': ['Butter', 'Milk'], 'Pantry & Baking': ['Salt', 'Pepper', 'Olive oil'] } },
  { id: 4,  name: 'Salmon with Rice',             protein: 'fish',       ingredients: { 'Meat & Seafood': ['Salmon fillets (4)'], 'Pasta, Rice & Grains': ['White rice (2 cups)'], 'Fresh Produce': ['Lemon', 'Broccoli'], 'Condiments & Sauces': ['Soy sauce'], 'Pantry & Baking': ['Olive oil'] } },
  { id: 5,  name: 'Beef Stir Fry',                protein: 'beef',       ingredients: { 'Meat & Seafood': ['Beef strips (400g)'], 'Fresh Produce': ['Bell peppers', 'Snap peas', 'Broccoli', 'Garlic', 'Ginger'], 'Condiments & Sauces': ['Soy sauce', 'Sesame oil'], 'Pantry & Baking': ['Cornstarch'] } },
  { id: 6,  name: 'Chicken Caesar Salad',         protein: 'chicken',    ingredients: { 'Meat & Seafood': ['Chicken breast (2)'], 'Fresh Produce': ['Romaine lettuce', 'Lemon'], 'Dairy & Eggs': ['Parmesan cheese'], 'Condiments & Sauces': ['Caesar dressing'], 'Bread & Bakery': ['Croutons'] } },
  { id: 7,  name: 'Homemade Pizza',               protein: 'vegetarian', ingredients: { 'Fresh Produce': ['Bell pepper', 'Mushrooms', 'Onion'], 'Dairy & Eggs': ['Mozzarella cheese'], 'Bread & Bakery': ['Pizza dough'], 'Canned & Jarred Goods': ['Pizza sauce'], 'Pantry & Baking': ['Olive oil', 'Italian seasoning'] } },
  { id: 8,  name: 'Garlic Butter Shrimp Pasta',   protein: 'fish',       ingredients: { 'Meat & Seafood': ['Shrimp (300g)'], 'Pasta, Rice & Grains': ['Linguine (300g)'], 'Fresh Produce': ['Garlic', 'Parsley', 'Lemon'], 'Dairy & Eggs': ['Butter'], 'Pantry & Baking': ['Olive oil'] } },
  { id: 9,  name: 'Beef Tacos',                   protein: 'beef',       ingredients: { 'Meat & Seafood': ['Ground beef (400g)'], 'Fresh Produce': ['Lettuce', 'Tomato', 'Lime', 'Avocado'], 'Dairy & Eggs': ['Sour cream', 'Shredded cheese'], 'Bread & Bakery': ['Taco shells'], 'Pantry & Baking': ['Taco seasoning'] } },
  { id: 10, name: 'Chicken Fried Rice',           protein: 'chicken',    ingredients: { 'Meat & Seafood': ['Chicken breast (300g)'], 'Pasta, Rice & Grains': ['Cooked rice (3 cups)'], 'Fresh Produce': ['Carrots', 'Peas', 'Green onion', 'Garlic'], 'Condiments & Sauces': ['Soy sauce', 'Sesame oil'], 'Dairy & Eggs': ['Eggs (2)'] } },
];

// ── Suggestion library ───────────────────────────────────────
const R = (name, protein, blurb, ingredients) => ({ name, protein, blurb, ingredients });

const RECIPE_LIBRARY = [
  R('Lemon Herb Roast Chicken', 'chicken', 'One tray, almost no work, and the leftovers make lunch.', { 'Meat & Seafood': ['Whole chicken (1.5kg)'], 'Fresh Produce': ['Lemon', 'Potatoes (1kg)', 'Carrots', 'Garlic', 'Rosemary'], 'Pantry & Baking': ['Olive oil', 'Salt', 'Pepper'] }),
  R('Chicken Fajitas', 'chicken', 'Everything hits one skillet and the table sorts itself out.', { 'Meat & Seafood': ['Chicken breast (500g)'], 'Fresh Produce': ['Bell peppers', 'Onion', 'Lime', 'Cilantro'], 'Bread & Bakery': ['Flour tortillas'], 'Dairy & Eggs': ['Sour cream', 'Shredded cheese'], 'Pantry & Baking': ['Cumin', 'Chili powder', 'Olive oil'] }),
  R('Honey Garlic Chicken Thighs', 'chicken', 'Thighs stay juicy even when dinner runs late.', { 'Meat & Seafood': ['Chicken thighs (8)'], 'Fresh Produce': ['Garlic', 'Green onion', 'Broccoli'], 'Condiments & Sauces': ['Honey', 'Soy sauce', 'Rice vinegar'], 'Pasta, Rice & Grains': ['Jasmine rice (2 cups)'] }),
  R('Butter Chicken', 'chicken', 'Tastes like takeaway, costs like a Tuesday.', { 'Meat & Seafood': ['Chicken thighs (600g)'], 'Fresh Produce': ['Onion', 'Garlic', 'Ginger'], 'Canned & Jarred Goods': ['Tomato paste', 'Coconut milk'], 'Dairy & Eggs': ['Heavy cream', 'Butter'], 'Bread & Bakery': ['Naan'], 'Pantry & Baking': ['Garam masala', 'Turmeric', 'Paprika'], 'Pasta, Rice & Grains': ['Basmati rice (2 cups)'] }),
  R('Greek Chicken Bowls', 'chicken', 'Bright and lemony — a good reset after a heavy week.', { 'Meat & Seafood': ['Chicken breast (500g)'], 'Fresh Produce': ['Cucumber', 'Tomato', 'Red onion', 'Lemon', 'Parsley'], 'Dairy & Eggs': ['Feta cheese', 'Greek yogurt'], 'Pasta, Rice & Grains': ['Couscous (1.5 cups)'], 'Canned & Jarred Goods': ['Olives'], 'Pantry & Baking': ['Olive oil', 'Oregano'] }),
  R('Chicken Pot Pie', 'chicken', 'The cold-night dinner everybody quietly hopes for.', { 'Meat & Seafood': ['Chicken breast (500g)'], 'Fresh Produce': ['Carrots', 'Celery', 'Onion', 'Peas'], 'Dairy & Eggs': ['Butter', 'Milk'], 'Bread & Bakery': ['Pie crust'], 'Canned & Jarred Goods': ['Chicken broth'], 'Pantry & Baking': ['Flour', 'Thyme'] }),

  R('Classic Beef Chili', 'beef', 'Better the next day, which makes it two dinners.', { 'Meat & Seafood': ['Ground beef (600g)'], 'Fresh Produce': ['Onion', 'Bell pepper', 'Garlic'], 'Canned & Jarred Goods': ['Kidney beans', 'Diced tomatoes', 'Tomato paste'], 'Dairy & Eggs': ['Shredded cheese', 'Sour cream'], 'Pantry & Baking': ['Chili powder', 'Cumin', 'Smoked paprika'] }),
  R('Beef & Broccoli', 'beef', 'Faster than delivery once the rice is on.', { 'Meat & Seafood': ['Beef sirloin (450g)'], 'Fresh Produce': ['Broccoli', 'Garlic', 'Ginger', 'Green onion'], 'Condiments & Sauces': ['Soy sauce', 'Oyster sauce', 'Sesame oil'], 'Pasta, Rice & Grains': ['White rice (2 cups)'], 'Pantry & Baking': ['Cornstarch', 'Brown sugar'] }),
  R('Smash Burgers', 'beef', 'A twenty-minute night that still feels like a treat.', { 'Meat & Seafood': ['Ground beef (600g)'], 'Bread & Bakery': ['Burger buns'], 'Fresh Produce': ['Lettuce', 'Tomato', 'Onion', 'Pickles'], 'Dairy & Eggs': ['Cheddar cheese'], 'Condiments & Sauces': ['Ketchup', 'Mustard', 'Mayonnaise'], 'Frozen Foods': ['French fries'] }),
  R("Shepherd's Pie", 'beef', 'Uses up the potatoes and feeds a crowd.', { 'Meat & Seafood': ['Ground beef (600g)'], 'Fresh Produce': ['Potatoes (1kg)', 'Carrots', 'Onion', 'Peas'], 'Dairy & Eggs': ['Butter', 'Milk', 'Shredded cheese'], 'Canned & Jarred Goods': ['Beef broth', 'Tomato paste'], 'Condiments & Sauces': ['Worcestershire'] }),
  R('Beef Stew', 'beef', 'Mostly hands-off — the oven does the shift.', { 'Meat & Seafood': ['Beef chuck (800g)'], 'Fresh Produce': ['Carrots', 'Potatoes (750g)', 'Onion', 'Celery', 'Thyme'], 'Canned & Jarred Goods': ['Beef broth', 'Tomato paste'], 'Pantry & Baking': ['Flour', 'Bay leaf'], 'Bread & Bakery': ['Crusty bread'] }),
  R('Meatball Subs', 'beef', 'A pantry-jar dinner that eats like a treat.', { 'Meat & Seafood': ['Ground beef (500g)'], 'Bread & Bakery': ['Sub rolls', 'Breadcrumbs'], 'Dairy & Eggs': ['Mozzarella cheese', 'Parmesan cheese', 'Eggs (1)'], 'Canned & Jarred Goods': ['Marinara sauce'], 'Fresh Produce': ['Garlic', 'Basil'] }),

  R('Pulled Pork Sandwiches', 'pork', 'Ten minutes of work, then the slow cooker takes over.', { 'Meat & Seafood': ['Pork shoulder (1.5kg)'], 'Bread & Bakery': ['Brioche buns'], 'Fresh Produce': ['Cabbage', 'Carrots', 'Onion'], 'Condiments & Sauces': ['BBQ sauce', 'Apple cider vinegar', 'Mayonnaise'], 'Pantry & Baking': ['Brown sugar', 'Smoked paprika'] }),
  R('Pork Carnitas Bowls', 'pork', 'Crispy edges, and it stretches across two meals.', { 'Meat & Seafood': ['Pork shoulder (1.2kg)'], 'Fresh Produce': ['Orange', 'Lime', 'Onion', 'Cilantro', 'Avocado'], 'Pasta, Rice & Grains': ['White rice (2 cups)'], 'Canned & Jarred Goods': ['Black beans', 'Salsa'], 'Pantry & Baking': ['Cumin', 'Oregano'] }),
  R('Sausage & Peppers', 'pork', 'One pan, six ingredients, no recipe needed.', { 'Meat & Seafood': ['Italian sausage (6)'], 'Fresh Produce': ['Bell peppers', 'Onion', 'Garlic'], 'Bread & Bakery': ['Sub rolls'], 'Pantry & Baking': ['Olive oil', 'Italian seasoning'] }),
  R('Maple Glazed Pork Tenderloin', 'pork', 'Feels dressed up but it is a weeknight cut.', { 'Meat & Seafood': ['Pork tenderloin (700g)'], 'Fresh Produce': ['Sweet potato', 'Brussels sprouts', 'Garlic'], 'Condiments & Sauces': ['Maple syrup', 'Dijon mustard'], 'Pantry & Baking': ['Olive oil', 'Thyme'] }),

  R('Fish Tacos', 'fish', 'Light, quick, and it uses the taco kit you already buy.', { 'Meat & Seafood': ['Tilapia fillets (500g)'], 'Fresh Produce': ['Cabbage', 'Lime', 'Cilantro', 'Avocado', 'Jalapeno'], 'Bread & Bakery': ['Corn tortillas'], 'Dairy & Eggs': ['Sour cream'], 'Pantry & Baking': ['Chili powder', 'Cumin'] }),
  R('Lemon Butter Cod', 'fish', 'On the table in fifteen minutes, start to finish.', { 'Meat & Seafood': ['Cod fillets (4)'], 'Fresh Produce': ['Lemon', 'Garlic', 'Parsley', 'Asparagus'], 'Dairy & Eggs': ['Butter'], 'Pasta, Rice & Grains': ['Orzo (300g)'], 'Pantry & Baking': ['Olive oil'] }),
  R('Honey Sriracha Salmon', 'fish', 'Sweet-hot glaze that wins over people who claim not to like fish.', { 'Meat & Seafood': ['Salmon fillets (4)'], 'Fresh Produce': ['Green onion', 'Garlic', 'Snap peas', 'Lime'], 'Condiments & Sauces': ['Honey', 'Sriracha', 'Soy sauce'], 'Pasta, Rice & Grains': ['Jasmine rice (2 cups)'] }),
  R('Shrimp Fried Rice', 'fish', 'Built for leftover rice — cheap, fast, no waste.', { 'Meat & Seafood': ['Shrimp (400g)'], 'Pasta, Rice & Grains': ['Cooked rice (3 cups)'], 'Fresh Produce': ['Carrots', 'Peas', 'Green onion', 'Garlic', 'Ginger'], 'Dairy & Eggs': ['Eggs (3)'], 'Condiments & Sauces': ['Soy sauce', 'Sesame oil'] }),
  R('Tuna Melts', 'fish', 'The emergency dinner that everyone secretly likes.', { 'Meat & Seafood': ['Canned tuna (3)'], 'Bread & Bakery': ['Sourdough bread'], 'Dairy & Eggs': ['Cheddar cheese', 'Butter'], 'Fresh Produce': ['Celery', 'Red onion', 'Tomato'], 'Condiments & Sauces': ['Mayonnaise', 'Dijon mustard'] }),

  R('Creamy Tomato Penne', 'pasta', 'Pantry ingredients, twenty minutes, no shopping trip.', { 'Pasta, Rice & Grains': ['Penne (400g)'], 'Canned & Jarred Goods': ['Crushed tomatoes', 'Tomato paste'], 'Dairy & Eggs': ['Heavy cream', 'Parmesan cheese', 'Butter'], 'Fresh Produce': ['Onion', 'Garlic', 'Basil'], 'Pantry & Baking': ['Olive oil', 'Red pepper flakes'] }),
  R('Pesto Pasta with Peas', 'pasta', 'Five ingredients, and the freezer covers most of them.', { 'Pasta, Rice & Grains': ['Farfalle (400g)'], 'Condiments & Sauces': ['Pesto'], 'Frozen Foods': ['Frozen peas'], 'Dairy & Eggs': ['Parmesan cheese'], 'Fresh Produce': ['Lemon', 'Basil'], 'Pantry & Baking': ['Pine nuts', 'Olive oil'] }),
  R('Baked Ziti', 'pasta', 'Assemble early, bake when everyone is actually home.', { 'Pasta, Rice & Grains': ['Ziti (500g)'], 'Canned & Jarred Goods': ['Marinara sauce'], 'Dairy & Eggs': ['Ricotta cheese', 'Mozzarella cheese', 'Parmesan cheese', 'Eggs (1)'], 'Fresh Produce': ['Garlic', 'Basil'], 'Pantry & Baking': ['Italian seasoning'] }),
  R('Cacio e Pepe', 'pasta', 'Three ingredients. Genuinely.', { 'Pasta, Rice & Grains': ['Spaghetti (400g)'], 'Dairy & Eggs': ['Parmesan cheese', 'Butter'], 'Pantry & Baking': ['Black pepper', 'Salt'] }),
  R('Mac & Cheese Bake', 'pasta', 'The one the kids will eat without negotiation.', { 'Pasta, Rice & Grains': ['Elbow macaroni (450g)'], 'Dairy & Eggs': ['Cheddar cheese', 'Milk', 'Butter'], 'Bread & Bakery': ['Breadcrumbs'], 'Pantry & Baking': ['Flour', 'Mustard powder', 'Paprika'] }),

  R('Black Bean Burritos', 'vegetarian', 'Cheap, filling, and it freezes well for later.', { 'Canned & Jarred Goods': ['Black beans', 'Salsa'], 'Bread & Bakery': ['Flour tortillas'], 'Pasta, Rice & Grains': ['White rice (2 cups)'], 'Fresh Produce': ['Onion', 'Bell pepper', 'Lime', 'Cilantro', 'Avocado'], 'Dairy & Eggs': ['Shredded cheese', 'Sour cream'], 'Pantry & Baking': ['Cumin', 'Chili powder'] }),
  R('Chickpea Coconut Curry', 'vegetarian', 'Almost entirely shelf-stable — good for a bare-fridge night.', { 'Canned & Jarred Goods': ['Chickpeas', 'Coconut milk', 'Diced tomatoes'], 'Fresh Produce': ['Onion', 'Garlic', 'Ginger', 'Spinach', 'Cilantro'], 'Pasta, Rice & Grains': ['Basmati rice (2 cups)'], 'Bread & Bakery': ['Naan'], 'Pantry & Baking': ['Curry powder', 'Turmeric', 'Cumin'] }),
  R('Caprese Flatbreads', 'vegetarian', 'Fifteen minutes and it looks like you tried.', { 'Bread & Bakery': ['Flatbread'], 'Dairy & Eggs': ['Mozzarella cheese'], 'Fresh Produce': ['Tomato', 'Basil', 'Garlic', 'Arugula'], 'Condiments & Sauces': ['Balsamic vinegar'], 'Pantry & Baking': ['Olive oil'] }),
  R('Sweet Potato & Black Bean Tacos', 'vegetarian', 'Roast the tray, warm the tortillas, done.', { 'Fresh Produce': ['Sweet potato', 'Red onion', 'Lime', 'Cilantro', 'Avocado'], 'Canned & Jarred Goods': ['Black beans'], 'Bread & Bakery': ['Corn tortillas'], 'Dairy & Eggs': ['Feta cheese'], 'Pantry & Baking': ['Smoked paprika', 'Cumin', 'Olive oil'] }),
  R('Mushroom Risotto', 'vegetarian', 'Twenty minutes of stirring buys a very good dinner.', { 'Pasta, Rice & Grains': ['Arborio rice (2 cups)'], 'Fresh Produce': ['Mushrooms', 'Onion', 'Garlic', 'Parsley'], 'Dairy & Eggs': ['Parmesan cheese', 'Butter'], 'Canned & Jarred Goods': ['Vegetable broth'], 'Beverages': ['White wine'] }),

  R('Breakfast for Dinner', 'other', 'The night nobody wants to cook — and nobody complains.', { 'Dairy & Eggs': ['Eggs (8)', 'Butter', 'Milk', 'Cheddar cheese'], 'Meat & Seafood': ['Bacon'], 'Bread & Bakery': ['Bread', 'Pancake mix'], 'Fresh Produce': ['Potatoes (500g)', 'Green onion'], 'Condiments & Sauces': ['Maple syrup'] }),
  R('Loaded Nachos', 'other', 'A clear-out-the-fridge dinner disguised as a treat.', { 'Bread & Bakery': ['Tortilla chips'], 'Canned & Jarred Goods': ['Refried beans', 'Salsa', 'Olives'], 'Dairy & Eggs': ['Shredded cheese', 'Sour cream'], 'Fresh Produce': ['Tomato', 'Green onion', 'Jalapeno', 'Avocado'], 'Meat & Seafood': ['Ground beef (400g)'] }),
];

// ── State ────────────────────────────────────────────────────
const KEYS = { meals: 'sp-meals', week: 'sp-week', locks: 'sp-locks', checked: 'sp-checked', extras: 'sp-extras', theme: 'sp-theme' };

let meals = [];
let weekPlan = [];       // 7 entries: meal id or null
let dayLocks = [];       // 7 booleans
let checkedItems = [];   // grocery keys
let extraItems = [];     // free-text extras
let nextId = 1;

// view-only state
const openDays = new Set();
const openMeals = new Set();
let mealQuery = '';
let hideChecked = false;

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed === null ? fallback : parsed;
  } catch { return fallback; }
}

function loadState() {
  // An empty saved array means the user deleted everything — respect that
  // rather than resurrecting the starter meals on every reload.
  const stored = read(KEYS.meals, null);
  meals = Array.isArray(stored) ? stored.map(sanitizeMeal).filter(Boolean) : deepClone(DEFAULT_MEALS);
  weekPlan = read(KEYS.week, []);
  dayLocks = read(KEYS.locks, []);
  checkedItems = read(KEYS.checked, []);
  extraItems = read(KEYS.extras, []);

  if (!Array.isArray(weekPlan)) weekPlan = [];
  if (!Array.isArray(dayLocks)) dayLocks = [];
  if (!Array.isArray(checkedItems)) checkedItems = [];
  if (!Array.isArray(extraItems)) extraItems = [];

  nextId = meals.reduce((max, m) => Math.max(max, m.id), 0) + 1;
  normalizeWeek();
}

function sanitizeMeal(m) {
  if (!m || typeof m !== 'object' || typeof m.name !== 'string') return null;
  const ingredients = {};
  if (m.ingredients && typeof m.ingredients === 'object') {
    Object.entries(m.ingredients).forEach(([cat, list]) => {
      if (Array.isArray(list)) ingredients[cat] = list.filter(i => typeof i === 'string');
    });
  }
  return {
    id: Number.isFinite(m.id) ? m.id : 0,
    name: m.name,
    protein: PROTEIN_LABEL[m.protein] ? m.protein : 'other',
    ingredients,
  };
}

// Keep the week a clean array of 7 slots holding meals that still exist, with no duplicates.
function normalizeWeek() {
  const seen = new Set();
  const next = [];
  for (let i = 0; i < 7; i++) {
    const id = weekPlan[i];
    const keep = getMeal(id) !== null && !seen.has(id);
    if (keep) seen.add(id);
    next.push(keep ? id : null);
  }
  weekPlan = next;
  dayLocks = Array.from({ length: 7 }, (_, i) => Boolean(dayLocks[i]) && weekPlan[i] !== null);
}

function saveState() {
  try {
    localStorage.setItem(KEYS.meals, JSON.stringify(meals));
    localStorage.setItem(KEYS.week, JSON.stringify(weekPlan));
    localStorage.setItem(KEYS.locks, JSON.stringify(dayLocks));
    localStorage.setItem(KEYS.checked, JSON.stringify(checkedItems));
    localStorage.setItem(KEYS.extras, JSON.stringify(extraItems));
  } catch {
    /* storage full or blocked — the session still works, it just won't persist */
  }
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));
const getMeal = id => meals.find(m => m.id === id) || null;

// ── Small helpers ────────────────────────────────────────────
function escHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const normalizeName = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// "Ground beef (500g)" → { base: 'Ground beef', qty: '500g' }
function splitQty(text) {
  const m = String(text).trim().match(/^(.*?)\s*\(([^()]*)\)$/);
  return m && m[1].trim() ? { base: m[1].trim(), qty: m[2].trim() } : { base: String(text).trim(), qty: '' };
}

function countIngredients(meal) {
  return Object.values(meal.ingredients || {}).reduce((n, list) => n + list.length, 0);
}

const MAX_TOASTS = 3;

function toast(message, ms = 2600) {
  const stack = document.getElementById('toast-stack');
  // Don't let a burst of actions bury the page under notices.
  while (stack.children.length >= MAX_TOASTS) stack.firstElementChild.remove();

  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 240);
  }, ms);
}

function confirmAction({ title, text, okLabel = 'Remove' }) {
  const modal = document.getElementById('confirm-modal');
  if (typeof modal.showModal !== 'function') return Promise.resolve(window.confirm(text));

  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-text').textContent = text;
  document.getElementById('confirm-ok').textContent = okLabel;

  return new Promise(resolve => {
    const onClose = () => {
      modal.removeEventListener('close', onClose);
      resolve(modal.returnValue === 'ok');
    };
    modal.addEventListener('close', onClose);
    modal.returnValue = '';
    modal.showModal();
  });
}

// ── Theme ────────────────────────────────────────────────────
function activeTheme() {
  const set = document.documentElement.getAttribute('data-theme');
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncThemeButton() {
  const btn = document.getElementById('theme-toggle');
  const goingDark = activeTheme() === 'light';
  btn.setAttribute('aria-label', goingDark ? 'Switch to dark theme' : 'Switch to light theme');
  btn.setAttribute('title', goingDark ? 'Switch to dark theme' : 'Switch to light theme');
}

function toggleTheme() {
  const next = activeTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(KEYS.theme, next); } catch {}
  syncThemeButton();
}

// ── Tabs ─────────────────────────────────────────────────────
function showTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const on = btn.dataset.tab === tab;
    btn.classList.toggle('active', on);
    if (btn.getAttribute('role') === 'tab') btn.setAttribute('aria-selected', String(on));
  });
  document.querySelectorAll('.tab-section').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${tab}`);
  });
  closeMobileNav();
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}

// ── Week planning ────────────────────────────────────────────
const proteinOf = id => (getMeal(id) || {}).protein;

/**
 * Fill every unlocked slot with a distinct meal, avoiding the same protein on
 * consecutive nights. Backtracks, and falls back to a best-effort fill when the
 * rotation is too small or too protein-heavy to satisfy the rule.
 */
function planWeek() {
  const slots = weekPlan.map((id, i) => (dayLocks[i] && getMeal(id) ? id : null));
  const used = new Set(slots.filter(id => id !== null));
  const open = slots.map((v, i) => (v === null ? i : -1)).filter(i => i >= 0);
  const pool = shuffle(meals.filter(m => !used.has(m.id)));

  let steps = 0;
  const place = k => {
    if (k === open.length) return true;
    if (++steps > 20000) return false;
    const i = open[k];
    for (const m of pool) {
      if (used.has(m.id)) continue;
      const prev = i > 0 ? slots[i - 1] : null;
      const next = i < 6 ? slots[i + 1] : null;
      if (prev !== null && proteinOf(prev) === m.protein) continue;
      if (next !== null && proteinOf(next) === m.protein) continue;
      slots[i] = m.id;
      used.add(m.id);
      if (place(k + 1)) return true;
      slots[i] = null;
      used.delete(m.id);
    }
    return false;
  };

  if (place(0)) return slots;

  // Not solvable (or too slow) — fill what we can and leave the rest empty.
  const relaxed = weekPlan.map((id, i) => (dayLocks[i] && getMeal(id) ? id : null));
  const taken = new Set(relaxed.filter(id => id !== null));
  const rest = shuffle(meals.filter(m => !taken.has(m.id)));
  for (let i = 0; i < 7; i++) {
    if (relaxed[i] !== null) continue;
    if (!rest.length) break;
    const prev = i > 0 ? relaxed[i - 1] : null;
    const pick = rest.findIndex(m => prev === null || proteinOf(prev) !== m.protein);
    relaxed[i] = rest.splice(pick >= 0 ? pick : 0, 1)[0].id;
  }
  return relaxed;
}

function generateWeek({ announce = true } = {}) {
  if (!meals.length) {
    if (announce) toast('Add a few meals first, then shuffle.');
    return;
  }
  weekPlan = planWeek();
  normalizeWeek();
  checkedItems = [];
  saveState();
  renderAll();

  if (!announce) return;
  const filled = weekPlan.filter(Boolean).length;
  const locked = dayLocks.filter(Boolean).length;
  if (filled < 7) toast(`Planned ${plural(filled, 'night')} — add ${plural(7 - filled, 'more meal')} to fill the week.`, 3600);
  else if (locked) toast(`Reshuffled around ${plural(locked, 'locked night')}.`);
  else toast('New week planned.');
}

function rerollDay(dayIdx) {
  if (!meals.length) return toast('Add a few meals first.');
  const inWeek = new Set(weekPlan.filter((id, i) => id !== null && i !== dayIdx));
  const prev = dayIdx > 0 ? weekPlan[dayIdx - 1] : null;
  const next = dayIdx < 6 ? weekPlan[dayIdx + 1] : null;

  const candidates = meals.filter(m =>
    m.id !== weekPlan[dayIdx] &&
    !inWeek.has(m.id) &&
    (prev === null || proteinOf(prev) !== m.protein) &&
    (next === null || proteinOf(next) !== m.protein));

  const fallback = meals.filter(m => m.id !== weekPlan[dayIdx] && !inWeek.has(m.id));
  const pool = candidates.length ? candidates : fallback;
  if (!pool.length) return toast('No other meal fits that night — add more to your rotation.', 3200);

  setDayMeal(dayIdx, shuffle(pool)[0].id, { silent: true });
  toast(`${DAYS[dayIdx].full}: ${getMeal(weekPlan[dayIdx]).name}`);
}

function setDayMeal(dayIdx, mealId, { silent = false } = {}) {
  if (mealId !== null) {
    // A meal can only appear once in the week — clear any other night holding it.
    const existing = weekPlan.indexOf(mealId);
    if (existing >= 0 && existing !== dayIdx) {
      weekPlan[existing] = null;
      dayLocks[existing] = false;
    }
  }
  weekPlan[dayIdx] = mealId;
  if (mealId === null) dayLocks[dayIdx] = false;
  saveState();
  renderAll();
  if (!silent && mealId !== null) toast(`${DAYS[dayIdx].full} set to ${getMeal(mealId).name}.`);
}

function toggleLock(dayIdx) {
  if (weekPlan[dayIdx] === null) return;
  dayLocks[dayIdx] = !dayLocks[dayIdx];
  saveState();
  renderWeek();
  toast(dayLocks[dayIdx] ? `${DAYS[dayIdx].full} locked — shuffling won't touch it.` : `${DAYS[dayIdx].full} unlocked.`);
}

// ── Rendering: week ──────────────────────────────────────────
function emptyState(icon, title, text, actionLabel, action) {
  return `
    <div class="empty-state">
      <div class="empty-icon" aria-hidden="true">${icon}</div>
      <p class="empty-title">${escHtml(title)}</p>
      <p class="empty-text">${escHtml(text)}</p>
      ${actionLabel ? `<button class="btn-primary" data-action="${action}">${escHtml(actionLabel)}</button>` : ''}
    </div>`;
}

function mealOptions(selectedId) {
  const inWeek = new Set(weekPlan.filter(id => id !== null && id !== selectedId));
  const opts = meals.map(m => {
    const dup = inWeek.has(m.id);
    return `<option value="${m.id}"${m.id === selectedId ? ' selected' : ''}>` +
      `${escHtml(m.name)}${dup ? ' — already this week' : ''}</option>`;
  });
  return `<option value=""${selectedId === null ? ' selected' : ''}>— leave empty —</option>${opts.join('')}`;
}

function renderDayCard(id, i) {
  const meal = getMeal(id);
  const open = openDays.has(i);
  const locked = dayLocks[i];
  const day = DAYS[i];

  const title = meal ? escHtml(meal.name) : 'Nothing planned';
  const meta = meal
    ? `${plural(countIngredients(meal), 'ingredient')}${locked ? ' · locked' : ''}`
    : 'Open to pick a meal';
  const chip = meal
    ? `<span class="protein-chip chip-${meal.protein}">${escHtml(PROTEIN_LABEL[meal.protein])}</span>`
    : '';

  return `
    <article class="day-card${open ? ' open' : ''}${locked ? ' locked' : ''}${meal ? '' : ' empty'}">
      <div class="day-head">
        <button class="day-toggle" data-action="toggle-day" data-day="${i}"
                aria-expanded="${open}" aria-controls="daybody-${i}">
          <span class="day-badge">${day.abbr}</span>
          <span class="day-main">
            <span class="day-meal">${title}</span>
            <span class="day-meta">${escHtml(meta)}</span>
          </span>
          ${chip}
          <span class="chevron">${ICON.chevron}</span>
        </button>
        <div class="day-tools">
          <button class="tool-btn" data-action="lock-day" data-day="${i}" aria-pressed="${locked}"
                  aria-label="${locked ? 'Unlock' : 'Lock'} ${day.full}" title="${locked ? 'Unlock this night' : 'Lock this night'}"
                  ${meal ? '' : 'disabled'}>${locked ? ICON.lock : ICON.unlock}</button>
          <button class="tool-btn" data-action="reroll-day" data-day="${i}"
                  aria-label="Swap ${day.full}" title="Swap in a different meal">${ICON.shuffle}</button>
        </div>
      </div>
      <div class="day-body" id="daybody-${i}"${open ? '' : ' hidden'}>
        <div class="swap-row">
          <label for="dayswap-${i}">${day.full}</label>
          <select class="mini-input" id="dayswap-${i}" data-action="set-day" data-day="${i}">${mealOptions(id)}</select>
        </div>
        ${meal ? renderIngEditor(meal, 'day', i) : '<p class="no-ings">Pick a meal above and its ingredients will show up here.</p>'}
      </div>
    </article>`;
}

function renderWeek() {
  const grid = document.getElementById('week-grid');
  if (!meals.length) {
    grid.innerHTML = emptyState('📖', 'Your rotation is empty',
      'Add the suppers you actually cook, then shuffle them into a week.', 'Add meals', 'goto-meals');
    return;
  }
  grid.innerHTML = weekPlan.map(renderDayCard).join('');
}

function renderWeekStats() {
  const wrap = document.getElementById('week-stats');
  if (!meals.length) { wrap.innerHTML = ''; return; }

  const planned = weekPlan.filter(id => id !== null);
  const proteins = new Set(planned.map(proteinOf));
  const groceryTotal = countGroceryItems();
  const locked = dayLocks.filter(Boolean).length;

  const pills = [
    `<b>${planned.length}</b><span>of 7 nights planned</span>`,
    `<b>${proteins.size}</b><span>different proteins</span>`,
    `<b>${groceryTotal}</b><span>things to buy</span>`,
  ];
  if (locked) pills.push(`<b>${locked}</b><span>locked</span>`);

  wrap.innerHTML = pills.map(p => `<div class="stat-pill">${p}</div>`).join('');
}

// ── Rendering: ingredient editor (shared) ────────────────────
function renderIngEditor(meal, mode, ref) {
  const cats = Object.keys(meal.ingredients || {});
  const body = cats.length
    ? cats.map(cat => renderCatBlock(meal, cat, mode, ref)).join('')
    : '<p class="no-ings">No ingredients yet. Add a category below and anything you list will flow into the grocery list.</p>';
  return body + renderAddCatRow(meal, mode, ref);
}

function renderCatBlock(meal, cat, mode, ref) {
  const items = meal.ingredients[cat] || [];
  const data = `data-meal="${meal.id}" data-cat="${escHtml(cat)}" data-mode="${escHtml(mode)}" data-ref="${escHtml(ref)}"`;
  return `
    <div class="ing-category" ${data}>
      <div class="ing-category-header">
        <span class="ing-category-label">${escHtml(cat)}</span>
        <button class="btn-sm danger" data-action="del-cat" ${data}>${ICON.trash} Remove</button>
      </div>
      <div class="ing-rows">
        ${items.map((item, ii) => `
          <div class="ing-row">
            <label class="visually-hidden" for="ing-${mode}-${ref}-${safeCatId(cat)}-${ii}">Ingredient</label>
            <input class="ing-input" type="text" id="ing-${mode}-${ref}-${safeCatId(cat)}-${ii}"
                   value="${escHtml(item)}" data-action="edit-ing" data-idx="${ii}" ${data} />
            <button class="icon-btn" data-action="del-ing" data-idx="${ii}" ${data}
                    aria-label="Remove ${escHtml(item)}">${ICON.close}</button>
          </div>`).join('')}
      </div>
      <div class="add-ing-row">
        <label class="visually-hidden" for="newing-${mode}-${ref}-${safeCatId(cat)}">Add an ingredient to ${escHtml(cat)}</label>
        <input class="add-ing-input" type="text" id="newing-${mode}-${ref}-${safeCatId(cat)}"
               placeholder="Add to ${escHtml(cat)}…" autocomplete="off" data-action="new-ing" ${data} />
        <button class="btn-sm" data-action="add-ing" ${data}>${ICON.plus} Add</button>
      </div>
    </div>`;
}

function renderAddCatRow(meal, mode, ref) {
  const used = new Set(Object.keys(meal.ingredients || {}));
  const options = WALMART_AISLES
    .filter(a => !used.has(a.label))
    .map(a => `<option value="${escHtml(a.label)}">${a.icon} ${escHtml(a.label)}</option>`)
    .join('');

  if (!options) return '';
  return `
    <div class="add-cat-row">
      <label class="visually-hidden" for="catsel-${mode}-${ref}">Add an aisle</label>
      <select class="cat-select" id="catsel-${mode}-${ref}">${options}</select>
      <button class="btn-sm" data-action="add-cat" data-meal="${meal.id}" data-mode="${escHtml(mode)}" data-ref="${escHtml(ref)}">
        ${ICON.plus} Add aisle
      </button>
    </div>`;
}

const safeCatId = cat => String(cat).replace(/[^a-z0-9]/gi, '_');

// ── Ingredient CRUD ──────────────────────────────────────────
function withMeal(el, fn) {
  const meal = getMeal(Number(el.dataset.meal));
  if (meal) fn(meal, el.dataset.cat, Number(el.dataset.idx));
}

function editIng(el) {
  withMeal(el, (meal, cat, idx) => {
    const value = el.value.trim();
    if (!meal.ingredients[cat] || meal.ingredients[cat][idx] === undefined) return;
    if (!value) {
      meal.ingredients[cat].splice(idx, 1);
      if (!meal.ingredients[cat].length) delete meal.ingredients[cat];
    } else {
      meal.ingredients[cat][idx] = value;
    }
    saveState();
    renderAll();
  });
}

function deleteIng(el) {
  withMeal(el, (meal, cat, idx) => {
    if (!meal.ingredients[cat]) return;
    meal.ingredients[cat].splice(idx, 1);
    if (!meal.ingredients[cat].length) delete meal.ingredients[cat];
    saveState();
    renderAll();
  });
}

function addIng(el) {
  const input = el.closest('.ing-category').querySelector('.add-ing-input');
  const value = input.value.trim();
  if (!value) return input.focus();

  withMeal(el, (meal, cat) => {
    if (!meal.ingredients[cat]) meal.ingredients[cat] = [];
    meal.ingredients[cat].push(value);
    saveState();
    renderAll();
    // Put the cursor back so several ingredients can be typed in a row.
    const again = document.getElementById(`newing-${el.dataset.mode}-${el.dataset.ref}-${safeCatId(cat)}`);
    if (again) again.focus();
  });
}

function addCat(el) {
  const meal = getMeal(Number(el.dataset.meal));
  if (!meal) return;
  const select = el.closest('.add-cat-row').querySelector('select');
  const cat = select.value;
  if (!cat) return;
  if (!meal.ingredients) meal.ingredients = {};
  if (!meal.ingredients[cat]) meal.ingredients[cat] = [];
  saveState();
  renderAll();
  const input = document.getElementById(`newing-${el.dataset.mode}-${el.dataset.ref}-${safeCatId(cat)}`);
  if (input) input.focus();
}

async function deleteCat(el) {
  const meal = getMeal(Number(el.dataset.meal));
  const cat = el.dataset.cat;
  if (!meal || !meal.ingredients[cat]) return;

  const count = meal.ingredients[cat].length;
  if (count > 0) {
    const ok = await confirmAction({
      title: `Remove ${cat}?`,
      text: `This drops ${plural(count, 'ingredient')} from ${meal.name}.`,
    });
    if (!ok) return;
  }
  delete meal.ingredients[cat];
  saveState();
  renderAll();
}

// ── Grocery list ─────────────────────────────────────────────
function classifyIngredient(item) {
  const lower = item.toLowerCase();
  for (const aisle of WALMART_AISLES) {
    if (aisle.key === 'other') continue;
    if (aisle.keywords.some(kw => lower.includes(kw))) return aisle.key;
  }
  return 'other';
}

/**
 * Collapse the week's ingredients into one entry per item per aisle, keeping
 * every quantity seen and remembering which meals asked for it.
 */
function buildGrocery() {
  const byAisle = {};
  WALMART_AISLES.forEach(a => { byAisle[a.key] = new Map(); });

  const add = (raw, categoryLabel, source) => {
    const text = String(raw).trim();
    if (!text) return;
    const aisle = AISLE_BY_LABEL[categoryLabel];
    const key = aisle ? aisle.key : classifyIngredient(text);
    const { base, qty } = splitQty(text);
    const norm = base.toLowerCase();

    const bucket = byAisle[key];
    let entry = bucket.get(norm);
    if (!entry) {
      entry = { base, qtys: [], sources: [], extra: !source, key: `${key}::${norm}` };
      bucket.set(norm, entry);
    }
    if (qty && !entry.qtys.includes(qty)) entry.qtys.push(qty);
    if (source) { entry.extra = false; if (!entry.sources.includes(source)) entry.sources.push(source); }
  };

  weekPlan.forEach(id => {
    const meal = getMeal(id);
    if (!meal) return;
    Object.entries(meal.ingredients || {}).forEach(([cat, items]) =>
      items.forEach(item => add(item, cat, meal.name)));
  });
  extraItems.forEach(item => add(item, null, null));

  return byAisle;
}

function countGroceryItems() {
  const byAisle = buildGrocery();
  return WALMART_AISLES.reduce((n, a) => n + byAisle[a.key].size, 0);
}

const entryLabel = entry => entry.base + (entry.qtys.length ? ` (${entry.qtys.join(' + ')})` : '');

function renderGrocery() {
  const content = document.getElementById('grocery-content');
  const bar = document.getElementById('grocery-bar');
  const byAisle = buildGrocery();
  const active = WALMART_AISLES.filter(a => byAisle[a.key].size > 0);

  if (!active.length) {
    bar.style.display = 'none';
    content.innerHTML = emptyState('🛒', 'Nothing on the list yet',
      'Plan a week of suppers and every ingredient lands here, sorted by aisle.', 'Plan this week', 'goto-week');
    return;
  }
  bar.style.display = '';

  const all = active.flatMap(a => [...byAisle[a.key].values()]);
  const total = all.length;
  const done = all.filter(e => checkedItems.includes(e.key)).length;
  updateProgress(done, total);

  content.innerHTML = active.map(aisle => {
    const entries = [...byAisle[aisle.key].values()];
    const remaining = entries.filter(e => !checkedItems.includes(e.key)).length;
    if (hideChecked && remaining === 0) return '';

    return `
      <section class="grocery-aisle">
        <div class="aisle-header">
          <div class="aisle-icon-wrap" style="background:${aisle.bg}">${aisle.icon}</div>
          <div>
            <h2 class="aisle-title">${escHtml(aisle.label)}</h2>
            <p class="aisle-meta">${escHtml(aisle.sub)} · ${hideChecked ? `${plural(remaining, 'item')} left` : plural(entries.length, 'item')}</p>
          </div>
        </div>
        <div class="aisle-items">
          ${entries.map(entry => {
            const checked = checkedItems.includes(entry.key);
            const note = entry.extra
              ? '<span class="extra-tag">extra</span>'
              : `<span class="grocery-src">${escHtml(entry.sources.join(' · '))}</span>`;
            return `
              <label class="grocery-item${checked ? ' checked' : ''}${checked && hideChecked ? ' hidden-checked' : ''}">
                <input type="checkbox" ${checked ? 'checked' : ''} data-action="check-item" data-key="${escHtml(entry.key)}" />
                <span class="grocery-text">
                  <span class="grocery-name">${escHtml(entryLabel(entry))}${entry.extra ? note : ''}</span>
                  ${entry.extra ? '' : note}
                </span>
                ${entry.extra ? `<button class="icon-btn" data-action="del-extra" data-base="${escHtml(entry.base)}" aria-label="Remove ${escHtml(entry.base)}">${ICON.close}</button>` : ''}
              </label>`;
          }).join('')}
        </div>
      </section>`;
  }).join('');
}

function updateProgress(done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-label').textContent =
    done === total && total > 0 ? `All ${plural(total, 'item')} in the cart` : `${done} of ${plural(total, 'item')} checked`;
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-fill').style.width = `${pct}%`;
}

function toggleItem(input) {
  const key = input.dataset.key;
  if (input.checked) {
    if (!checkedItems.includes(key)) checkedItems.push(key);
  } else {
    checkedItems = checkedItems.filter(k => k !== key);
  }
  saveState();
  renderGrocery();
  renderWeekStats();
}

function uncheckAll() {
  if (!checkedItems.length) return toast('Nothing is checked off yet.');
  checkedItems = [];
  saveState();
  renderGrocery();
  toast('Cleared every check mark.');
}

function addExtraItem(value) {
  const text = value.trim();
  if (!text) return false;
  const exists = extraItems.some(i => normalizeName(i) === normalizeName(text));
  if (exists) { toast(`"${text}" is already on the list.`); return false; }
  extraItems.push(text);
  saveState();
  renderGrocery();
  renderWeekStats();
  toast(`Added ${text} to ${AISLE_BY_KEY[classifyIngredient(text)].label}.`);
  return true;
}

function removeExtraItem(base) {
  const norm = normalizeName(base);
  extraItems = extraItems.filter(i => normalizeName(splitQty(i).base) !== norm);
  saveState();
  renderGrocery();
  renderWeekStats();
}

function copyGrocery() {
  const byAisle = buildGrocery();
  const blocks = WALMART_AISLES
    .filter(a => byAisle[a.key].size > 0)
    .map(a => {
      const lines = [...byAisle[a.key].values()]
        .map(e => `  ${checkedItems.includes(e.key) ? '[x]' : '[ ]'} ${entryLabel(e)}`)
        .join('\n');
      return `${a.icon} ${a.label} (${a.sub})\n${lines}`;
    });

  if (!blocks.length) return toast('There is nothing to copy yet.');
  const text = `Grocery list — Supper Planner\n\n${blocks.join('\n\n')}`;

  const done = () => toast('Grocery list copied to your clipboard.');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

// Clipboard API is unavailable over file:// and plain http, so keep a fallback.
function fallbackCopy(text, done) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;top:-1000px;opacity:0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  area.remove();
  ok ? done() : toast('Copying was blocked — select the list and copy manually.', 3400);
}

// ── My Meals ─────────────────────────────────────────────────
function renderMeals() {
  const list = document.getElementById('meal-list');

  if (!meals.length) {
    list.innerHTML = emptyState('🍳', 'No meals yet',
      'Add the suppers you cook most often — the ones you could make without looking anything up.', null, null);
    return;
  }

  const query = normalizeName(mealQuery);
  const visible = query ? meals.filter(m => normalizeName(m.name).includes(query)) : meals;

  if (!visible.length) {
    list.innerHTML = emptyState('🔍', 'No matches',
      `Nothing in your rotation matches "${mealQuery}".`, 'Clear search', 'clear-search');
    return;
  }

  list.innerHTML = visible.map(meal => {
    const open = openMeals.has(meal.id);
    const nights = weekPlan.indexOf(meal.id);
    const count = countIngredients(meal);
    const meta = [
      count ? plural(count, 'ingredient') : 'No ingredients yet',
      nights >= 0 ? `on ${DAYS[nights].full}` : null,
    ].filter(Boolean).join(' · ');

    return `
      <article class="meal-card${open ? ' open' : ''}">
        <div class="meal-head">
          <button class="meal-toggle" data-action="toggle-meal" data-meal="${meal.id}"
                  aria-expanded="${open}" aria-controls="mealbody-${meal.id}">
            <span class="meal-main">
              <span class="meal-name">${escHtml(meal.name)}</span>
              <span class="meal-meta">${escHtml(meta)}</span>
            </span>
            <span class="protein-chip chip-${meal.protein}">${escHtml(PROTEIN_LABEL[meal.protein])}</span>
            <span class="chevron">${ICON.chevron}</span>
          </button>
          <div class="meal-tools">
            <button class="tool-btn" data-action="del-meal" data-meal="${meal.id}"
                    aria-label="Remove ${escHtml(meal.name)}" title="Remove from rotation">${ICON.trash}</button>
          </div>
        </div>
        <div class="meal-body" id="mealbody-${meal.id}"${open ? '' : ' hidden'}>
          <div class="meal-edit-row">
            <label class="visually-hidden" for="mealname-${meal.id}">Meal name</label>
            <input class="mini-input name" type="text" id="mealname-${meal.id}" value="${escHtml(meal.name)}"
                   data-action="rename-meal" data-meal="${meal.id}" />
            <label class="visually-hidden" for="mealprotein-${meal.id}">Main protein</label>
            <select class="mini-input" id="mealprotein-${meal.id}" data-action="reprotein-meal" data-meal="${meal.id}">
              ${PROTEINS.map(p => `<option value="${p.value}"${p.value === meal.protein ? ' selected' : ''}>${p.label}</option>`).join('')}
            </select>
          </div>
          ${renderIngEditor(meal, 'meal', meal.id)}
        </div>
      </article>`;
  }).join('');
}

function addMeal() {
  const nameEl = document.getElementById('new-meal-name');
  const proteinEl = document.getElementById('new-meal-protein');
  const name = nameEl.value.trim();
  if (!name) return nameEl.focus();

  if (meals.some(m => normalizeName(m.name) === normalizeName(name))) {
    toast(`"${name}" is already in your rotation.`);
    nameEl.select();
    return;
  }

  const meal = { id: nextId++, name, protein: proteinEl.value, ingredients: {} };
  meals.push(meal);
  nameEl.value = '';
  mealQuery = '';
  document.getElementById('meal-search').value = '';
  openMeals.add(meal.id);
  saveState();
  renderAll();
  toast(`Added ${name}. Open it to list the ingredients.`, 3200);
}

async function deleteMeal(id) {
  const meal = getMeal(id);
  if (!meal) return;
  const ok = await confirmAction({
    title: 'Remove this meal?',
    text: `${meal.name} will be dropped from your rotation and from any night it's planned for.`,
  });
  if (!ok) return;

  meals = meals.filter(m => m.id !== id);
  openMeals.delete(id);
  normalizeWeek();
  saveState();
  renderAll();
  toast(`Removed ${meal.name}.`);
}

function renameMeal(el) {
  const meal = getMeal(Number(el.dataset.meal));
  if (!meal) return;
  const name = el.value.trim();
  if (!name) { el.value = meal.name; return; }
  meal.name = name;
  saveState();
  renderAll();
}

function changeProtein(el) {
  const meal = getMeal(Number(el.dataset.meal));
  if (!meal) return;
  meal.protein = el.value;
  saveState();
  renderAll();
}

// ── Discover ─────────────────────────────────────────────────
function ingredientSet(meal) {
  return new Set(Object.values(meal.ingredients || {}).flat().map(i => splitQty(i).base.toLowerCase()));
}

function suggestMeals(count = 5) {
  const owned = new Set(meals.map(m => normalizeName(m.name)));
  const proteinCounts = meals.reduce((acc, m) => ({ ...acc, [m.protein]: (acc[m.protein] || 0) + 1 }), {});

  const pantry = new Set();
  meals.forEach(m => ingredientSet(m).forEach(i => pantry.add(i)));

  const candidates = RECIPE_LIBRARY
    .filter(r => !owned.has(normalizeName(r.name)))
    .map(recipe => {
      const items = new Set(Object.values(recipe.ingredients).flat().map(i => splitQty(i).base.toLowerCase()));
      const overlap = [...items].filter(i => pantry.has(i)).length;
      const have = proteinCounts[recipe.protein] || 0;

      // Favour proteins you're short on, then meals that reuse what you already buy.
      const score = (have === 0 ? 7 : Math.max(0, 4 - have)) + Math.min(overlap, 5) * 0.7 + Math.random() * 2.4;
      return { recipe, items, overlap, have, score };
    });

  // Pick greedily, penalising proteins already chosen, so five suggestions
  // don't all turn out to be pasta just because pasta is the biggest gap.
  const picked = [];
  const chosen = {};
  while (picked.length < count && candidates.length) {
    let bestIdx = 0;
    let bestScore = -Infinity;
    candidates.forEach((c, i) => {
      const adjusted = c.score - (chosen[c.recipe.protein] || 0) * 3;
      if (adjusted > bestScore) { bestScore = adjusted; bestIdx = i; }
    });
    const [winner] = candidates.splice(bestIdx, 1);
    chosen[winner.recipe.protein] = (chosen[winner.recipe.protein] || 0) + 1;
    picked.push(winner);
  }

  // Two suggestions explaining themselves with the identical sentence reads
  // like a bug, so the second one falls back to its own blurb.
  const usedReasons = new Set();
  return picked.map(candidate => {
    let reason = buildReason(candidate);
    if (usedReasons.has(reason)) reason = candidate.recipe.blurb;
    usedReasons.add(reason);
    return { ...candidate.recipe, reason };
  });
}

// "Fish / Seafood" and "Other" don't read well dropped into a sentence.
const REASON_NOUN = {
  chicken: 'chicken', beef: 'beef', pork: 'pork',
  fish: 'fish or seafood', pasta: 'pasta', vegetarian: 'vegetarian', other: 'other',
};

function buildReason({ recipe, items, have }) {
  const noun = REASON_NOUN[recipe.protein];

  if (have === 0) {
    if (recipe.protein === 'vegetarian') return 'You have no meat-free nights yet — this one covers that.';
    if (recipe.protein === 'other') return "It doesn't resemble anything else in your rotation, which is rather the point.";
    if (recipe.protein === 'pasta') return 'There is no simple pasta night in your rotation yet — this is the easy one.';
    return `Nothing in your rotation is built around ${noun}, so this fills a gap.`;
  }

  let best = null;
  let bestOverlap = 0;
  meals.forEach(m => {
    const shared = [...ingredientSet(m)].filter(i => items.has(i)).length;
    if (shared > bestOverlap) { bestOverlap = shared; best = m; }
  });
  if (bestOverlap >= 3) {
    return `Shares ${plural(bestOverlap, 'ingredient')} with your ${best.name}, so it barely changes the shop.`;
  }
  if (have === 1) {
    if (recipe.protein === 'vegetarian') return 'You have one meat-free supper — this gives it some company.';
    if (recipe.protein === 'other') return 'A change of pace from everything else on the list.';
    return `You've only got one ${noun} supper — this gives that night an alternative.`;
  }
  return recipe.blurb;
}

function renderSuggestions() {
  const resultEl = document.getElementById('ai-result');
  const suggestions = suggestMeals(5);

  if (!suggestions.length) {
    resultEl.innerHTML = '<p class="status-msg">You already have every meal we know about. Add your own above — the rotation is yours now.</p>';
    return;
  }

  resultEl.innerHTML = `
    <div class="suggestion-list">
      ${suggestions.map(s => {
        const count = Object.values(s.ingredients).flat().length;
        return `
          <div class="suggestion-row">
            <div class="suggestion-info">
              <p class="suggestion-name">${escHtml(s.name)}</p>
              <p class="suggestion-reason">${escHtml(s.reason)} · ${plural(count, 'ingredient')} included.</p>
            </div>
            <div class="suggestion-meta">
              <span class="protein-chip chip-${s.protein}">${escHtml(PROTEIN_LABEL[s.protein])}</span>
              <button class="btn-sm" data-action="add-suggestion" data-name="${escHtml(s.name)}">${ICON.plus} Add</button>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function addSuggestion(el) {
  const name = el.dataset.name;
  const recipe = RECIPE_LIBRARY.find(r => r.name === name);
  if (!recipe) return;

  if (meals.some(m => normalizeName(m.name) === normalizeName(name))) {
    toast(`${name} is already in your rotation.`);
    return;
  }

  meals.push({ id: nextId++, name: recipe.name, protein: recipe.protein, ingredients: deepClone(recipe.ingredients) });
  saveState();
  renderAll();   // leaves #ai-result alone, so the button below stays put
  el.textContent = 'Added';
  el.disabled = true;
  toast(`${name} joined your rotation, ingredients and all.`, 3200);
}

// ── Render everything ────────────────────────────────────────
function renderAll() {
  renderWeek();
  renderWeekStats();
  renderGrocery();
  renderMeals();
}

// ── Events ───────────────────────────────────────────────────
const ACTIONS = {
  'goto-week':    () => showTab('week'),
  'goto-meals':   () => { showTab('meals'); document.getElementById('new-meal-name').focus(); },
  'clear-search': () => { mealQuery = ''; document.getElementById('meal-search').value = ''; renderMeals(); },
  'toggle-day':   el => {
    const i = Number(el.dataset.day);
    openDays.has(i) ? openDays.delete(i) : openDays.add(i);
    renderWeek();
  },
  'toggle-meal':  el => {
    const id = Number(el.dataset.meal);
    openMeals.has(id) ? openMeals.delete(id) : openMeals.add(id);
    renderMeals();
  },
  'lock-day':     el => toggleLock(Number(el.dataset.day)),
  'reroll-day':   el => rerollDay(Number(el.dataset.day)),
  'add-ing':      addIng,
  'del-ing':      deleteIng,
  'add-cat':      addCat,
  'del-cat':      deleteCat,
  'del-meal':     el => deleteMeal(Number(el.dataset.meal)),
  'del-extra':    el => removeExtraItem(el.dataset.base),
  'add-suggestion': addSuggestion,
};

function initEvents() {
  // Tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });

  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    const nav = document.getElementById('mobile-nav');
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Delegated clicks
  document.addEventListener('click', event => {
    // The delete button sits inside a <label>, which would also toggle the checkbox.
    const extraBtn = event.target.closest('[data-action="del-extra"]');
    if (extraBtn) event.preventDefault();

    const el = event.target.closest('[data-action]');
    if (!el || el.tagName === 'INPUT' || el.tagName === 'SELECT') return;
    const handler = ACTIONS[el.dataset.action];
    if (handler) handler(el);
  });

  // Delegated changes
  document.addEventListener('change', event => {
    const el = event.target.closest('[data-action]');
    if (!el) return;
    switch (el.dataset.action) {
      case 'check-item':     return toggleItem(el);
      case 'edit-ing':       return editIng(el);
      case 'set-day':        return setDayMeal(Number(el.dataset.day), el.value ? Number(el.value) : null);
      case 'rename-meal':    return renameMeal(el);
      case 'reprotein-meal': return changeProtein(el);
    }
  });

  // Enter inside the "add ingredient" fields
  document.addEventListener('keydown', event => {
    const el = event.target;
    if (event.key !== 'Enter' || !el.dataset || el.dataset.action !== 'new-ing') return;
    event.preventDefault();
    addIng(el);
  });

  // Escape closes the mobile menu
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileNav();
  });

  // Toolbar
  document.getElementById('generate-btn').addEventListener('click', () => generateWeek());
  document.getElementById('copy-btn').addEventListener('click', copyGrocery);
  document.getElementById('uncheck-btn').addEventListener('click', uncheckAll);
  document.getElementById('print-btn').addEventListener('click', () => { showTab('grocery'); window.print(); });

  document.getElementById('hide-checked').addEventListener('change', event => {
    hideChecked = event.target.checked;
    renderGrocery();
  });

  document.getElementById('extra-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('extra-input');
    if (addExtraItem(input.value)) input.value = '';
    input.focus();
  });

  document.getElementById('add-meal-form').addEventListener('submit', event => {
    event.preventDefault();
    addMeal();
  });

  document.getElementById('meal-search').addEventListener('input', event => {
    mealQuery = event.target.value;
    renderMeals();
  });

  document.getElementById('suggest-btn').addEventListener('click', renderSuggestions);

  // Confirm dialog buttons
  document.getElementById('confirm-modal').addEventListener('click', event => {
    const btn = event.target.closest('[data-confirm]');
    if (btn) document.getElementById('confirm-modal').close(btn.dataset.confirm);
  });

  document.getElementById('reset-btn').addEventListener('click', async () => {
    const ok = await confirmAction({
      title: 'Start over?',
      text: 'Your meals, this week\'s plan and everything checked off will be replaced with the ten starter meals.',
      okLabel: 'Reset everything',
    });
    if (!ok) return;
    meals = deepClone(DEFAULT_MEALS);
    weekPlan = [];
    dayLocks = [];
    checkedItems = [];
    extraItems = [];
    nextId = meals.length + 1;
    openDays.clear();
    openMeals.clear();
    normalizeWeek();
    generateWeek({ announce: false });
    showTab('week');
    toast('Back to the starter meals.');
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  syncThemeButton();
  initEvents();

  if (!weekPlan.some(Boolean) && meals.length) generateWeek({ announce: false });
  else renderAll();
});
