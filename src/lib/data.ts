import locationsData from "./locations.json";
export type Vendor = {
  id: string;
  name: string;
  category: string;
  zone: string;
  distance: string;
  rating: number;
  reviews: number;
  eta: string;
  open: boolean;
  min: number;
  cover: string;
  coverFallback?: string;
  menu?: MenuSection[];   // every vendor now has an orderable menu
  searchable?: string;    // dish keywords for search (built below)
};

export const ZONES = ["All Zones", ...locationsData.zones.map((z) => z.label)];

export const CATEGORIES = [
  "All", "Rice Dishes", "Protein & Grills", "Snacks", "Beverages",
  "Pastries", "Local Soup", "Fast Food",
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;

/* Reliable per-category fallback photos (tier 2 of SmartImage). */
export const FALLBACK = {
  rice:    img("photo-1567620905732-2d1ec7ab7445"),
  grill:   img("photo-1432139555190-58524dae6a55"),
  pastry:  img("photo-1509440159596-0249088772ff"),
  soup:    img("photo-1547592180-85f173990554"),
  drink:   img("photo-1437418747212-8d9709afab22"),
  snack:   img("photo-1606755962773-d324e0a13086"),
  food:    img("photo-1504674900247-0877df9cc836"),
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageFallback?: string;
  tags?: ("Popular" | "Spicy" | "Vegan" | "Halal")[];
};
export type MenuSection = { id: string; title: string; items: MenuItem[] };

/* ────────────────────────────────────────────────────────────
   MAMA TITI — full flagship menu
──────────────────────────────────────────────────────────────── */
export const MAMA_TITI_MENU: MenuSection[] = [
  {
    id: "rice", title: "Rice & Stew", items: [
      { id: "mt-r1", name: "Jollof Rice + Chicken", description: "Rich tomato jollof with smoky grilled chicken", price: 1800, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Popular", "Spicy"] },
      { id: "mt-r2", name: "White Rice + Egusi Stew", description: "Fluffy white rice with rich egusi", price: 1500, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Halal"] },
      { id: "mt-r3", name: "Fried Rice + Turkey", description: "Seasoned fried rice with turkey drumstick", price: 2000, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Popular"] },
      { id: "mt-r4", name: "Ofada Rice + Ayamase", description: "Local ofada rice with green pepper stew", price: 1700, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Spicy"] },
    ],
  },
  {
    id: "proteins", title: "Proteins", items: [
      { id: "mt-p1", name: "Grilled Chicken (full)", description: "Smoky and well-seasoned", price: 1200, image: img("photo-1598103442097-8b74394b95c6"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
      { id: "mt-p2", name: "Fried Fish (medium)", description: "Crispy seasoned catfish", price: 900, image: img("photo-1535140728325-a4d3707eee61"), imageFallback: FALLBACK.grill },
      { id: "mt-p3", name: "Peppered Ponmo", description: "Soft cow skin in pepper sauce", price: 400, image: img("photo-1558030006-450675393462"), imageFallback: FALLBACK.grill, tags: ["Halal", "Spicy"] },
      { id: "mt-p4", name: "Peppered Beef (3 pcs)", description: "Tender peppered beef", price: 600, image: img("photo-1558030006-450675393462"), imageFallback: FALLBACK.grill, tags: ["Halal"] },
    ],
  },
  {
    id: "sides", title: "Sides", items: [
      { id: "mt-s1", name: "Moin Moin (2 wraps)", description: "Steamed bean pudding", price: 400, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
      { id: "mt-s2", name: "Coleslaw", description: "Creamy and fresh", price: 200, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack },
      { id: "mt-s3", name: "Fried Plantain (Dodo)", description: "Sweet and golden", price: 350, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
    ],
  },
  {
    id: "drinks", title: "Drinks", items: [
      { id: "mt-d1", name: "Chilled Soft Drink", description: "Coke, Fanta, or Sprite", price: 300, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
      { id: "mt-d2", name: "Bottled Water (75cl)", description: "Still mineral water", price: 150, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
      { id: "mt-d3", name: "Zobo (cup)", description: "Hibiscus, lightly sweetened", price: 250, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink, tags: ["Vegan"] },
    ],
  },
];

/* Helper to build small per-vendor menus quickly */
const sec = (id: string, title: string, items: MenuItem[]): MenuSection => ({ id, title, items });

const GRACE_MENU: MenuSection[] = [
  sec("grills", "Grills", [
    { id: "gg-1", name: "Grilled Whole Chicken", description: "Slow-grilled, perfectly seasoned, served with sauce", price: 3500, image: img("photo-1598103442097-8b74394b95c6"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
    { id: "gg-2", name: "Mixed Grill Platter", description: "Chicken, beef, and fish with peppered vegetables", price: 4200, image: img("photo-1555939594-58d7cb561ad1"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
    { id: "gg-3", name: "Suya Beef Skewers (x4)", description: "Spiced and char-grilled on open flame", price: 1800, image: img("photo-1529193591184-b1d58069ecdd"), imageFallback: FALLBACK.grill, tags: ["Spicy", "Halal"] },
    { id: "gg-4", name: "Grilled Tilapia", description: "Whole fish with pepper sauce and onions", price: 2800, image: img("photo-1535140728325-a4d3707eee61"), imageFallback: FALLBACK.grill },
  ]),
  sec("sides", "Sides & Drinks", [
    { id: "gg-5", name: "Spicy Potato Wedges", description: "Crispy, seasoned wedges", price: 900, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
    { id: "gg-6", name: "Chilled Soft Drink", description: "Coke, Fanta, or Sprite", price: 300, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
  ]),
];

const BREAD_MENU: MenuSection[] = [
  sec("bakery", "Fresh from the Oven", [
    { id: "bl-1", name: "Artisan Agege Bread", description: "Fresh-baked, soft and fluffy loaf", price: 800, image: img("photo-1509440159596-0249088772ff"), imageFallback: FALLBACK.pastry, tags: ["Popular"] },
    { id: "bl-2", name: "Meat Pie (x2)", description: "Flaky pastry filled with seasoned minced meat", price: 700, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.pastry },
    { id: "bl-3", name: "Chicken Pie (x2)", description: "Golden pastry with savoury chicken filling", price: 800, image: img("photo-1604908176997-125f25cc6f3d"), imageFallback: FALLBACK.pastry },
    { id: "bl-4", name: "Chin Chin (bag)", description: "Lightly sweetened, crunchy fried snack", price: 400, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
  ]),
];

const WATER_MENU: MenuSection[] = [
  sec("drinks", "Cold Drinks", [
    { id: "lw-1", name: "Chilled Zobo (50cl)", description: "Hibiscus infusion, lightly sweetened and cold", price: 350, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink, tags: ["Vegan", "Popular"] },
    { id: "lw-2", name: "Fresh Kunu (50cl)", description: "Millet-based drink, refreshing and filling", price: 300, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink, tags: ["Vegan"] },
    { id: "lw-3", name: "Bottled Water (1.5L)", description: "Still mineral water", price: 200, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
    { id: "lw-4", name: "Soft Drink (can)", description: "Coke, Fanta, or Sprite", price: 300, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
  ]),
];

const BOLA_MENU: MenuSection[] = [
  sec("rice", "Rice Specials", [
    { id: "sb-1", name: "Party Jollof + Chicken", description: "Smoky party-style jollof with grilled chicken", price: 2200, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Popular", "Spicy"] },
    { id: "sb-2", name: "Coconut Rice + Prawns", description: "Fragrant coconut rice with seasoned prawns", price: 2500, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice },
    { id: "sb-3", name: "Ofada Rice + Ayamase", description: "Local ofada rice with traditional green pepper stew", price: 1900, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Spicy"] },
    { id: "sb-4", name: "Fried Rice + Goat Meat", description: "Seasoned fried rice with tender goat meat", price: 2400, image: img("photo-1604908554007-9b6f5c0b9b8e"), imageFallback: FALLBACK.rice, tags: ["Halal"] },
  ]),
];

const KINGDOM_MENU: MenuSection[] = [
  sec("fast", "Fast Food", [
    { id: "kk-1", name: "Loaded Beef Burger", description: "Beef patty, lettuce, tomato, house sauce", price: 1800, image: img("photo-1568901346375-23c9450c58cd"), imageFallback: FALLBACK.snack, tags: ["Popular"] },
    { id: "kk-2", name: "Chicken Wrap", description: "Grilled chicken strips in flatbread with coleslaw", price: 1500, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack },
    { id: "kk-3", name: "Chips + Chicken Strips", description: "Crispy fries and seasoned chicken pieces", price: 1400, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack },
    { id: "kk-4", name: "Beef Shawarma", description: "Spiced beef, pickles, sauce in flatbread", price: 1600, image: img("photo-1633321702518-7feccafb94d5"), imageFallback: FALLBACK.snack, tags: ["Spicy"] },
  ]),
];

const COVENANT_MENU: MenuSection[] = [
  sec("soup", "Pepper Soups", [
    { id: "cp-1", name: "Goat Meat Pepper Soup", description: "Rich, spiced broth with tender goat meat", price: 2200, image: img("photo-1547592180-85f173990554"), imageFallback: FALLBACK.soup, tags: ["Popular", "Spicy"] },
    { id: "cp-2", name: "Catfish Pepper Soup", description: "Fresh catfish in a bold, spiced broth", price: 2500, image: img("photo-1604908176997-125f25cc6f3d"), imageFallback: FALLBACK.soup, tags: ["Spicy"] },
    { id: "cp-3", name: "Cow Foot Pepper Soup", description: "Slow-cooked, deeply flavoured and aromatic", price: 1900, image: img("photo-1547592180-85f173990554"), imageFallback: FALLBACK.soup, tags: ["Spicy", "Halal"] },
    { id: "cp-4", name: "Chicken Pepper Soup", description: "Comforting, lightly peppered chicken broth", price: 2000, image: img("photo-1547592180-85f173990554"), imageFallback: FALLBACK.soup },
  ]),
];

const MANNA_MENU: MenuSection[] = [
  sec("suya", "Suya & Grills", [
    { id: "ms-1", name: "Beef Suya (per stick)", description: "Classic spiced suya on skewer", price: 300, image: img("photo-1529193591184-b1d58069ecdd"), imageFallback: FALLBACK.grill, tags: ["Spicy", "Halal"] },
    { id: "ms-2", name: "Suya Wrap", description: "Suya strips wrapped in thin flatbread", price: 900, image: img("photo-1633321702518-7feccafb94d5"), imageFallback: FALLBACK.snack, tags: ["Spicy"] },
    { id: "ms-3", name: "Kilishi (50g)", description: "Dried spiced beef — a camp favourite", price: 600, image: img("photo-1558030006-450675393462"), imageFallback: FALLBACK.grill, tags: ["Halal"] },
    { id: "ms-4", name: "Chicken Suya", description: "Grilled spiced chicken skewers", price: 1200, image: img("photo-1598103442097-8b74394b95c6"), imageFallback: FALLBACK.grill, tags: ["Spicy"] },
  ]),
];

const CHALET_MENU: MenuSection[] = [
  sec("snacks", "Snacks & Bites", [
    { id: "cc-1", name: "Egg Sandwich", description: "Toasted bread with fried egg and seasoning", price: 700, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack },
    { id: "cc-2", name: "Puff Puff (x6)", description: "Soft, pillowy fried dough — freshly made", price: 400, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Vegan", "Popular"] },
    { id: "cc-3", name: "Sausage Roll (x2)", description: "Seasoned sausage in short-crust pastry", price: 500, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.pastry },
    { id: "cc-4", name: "Hot Coffee", description: "Freshly brewed, served hot", price: 600, image: img("photo-1554866585-cd94860890b7"), imageFallback: FALLBACK.drink },
  ]),
];

const GLORY_MENU: MenuSection[] = [
  sec("shawarma", "Shawarma & Combos", [
    { id: "gs-1", name: "Chicken Shawarma", description: "Marinated chicken, garlic sauce, veggies in flatbread", price: 1600, image: img("photo-1633321702518-7feccafb94d5"), imageFallback: FALLBACK.snack, tags: ["Popular"] },
    { id: "gs-2", name: "Beef Shawarma", description: "Spiced beef with pickles, sauce and fresh greens", price: 1800, image: img("photo-1633321702518-7feccafb94d5"), imageFallback: FALLBACK.snack, tags: ["Spicy"] },
    { id: "gs-3", name: "Double Chicken Shawarma", description: "Extra chicken, extra filling", price: 2200, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack },
    { id: "gs-4", name: "Shawarma + Chips Combo", description: "Shawarma of choice with seasoned chips", price: 2200, image: img("photo-1606755962773-d324e0a13086"), imageFallback: FALLBACK.snack, tags: ["Popular"] },
  ]),
];

export const VENDORS: Vendor[] = [
  {
    id: "mama-titi", name: "Mama Titi's Kitchen", category: "Local Nigerian",
    zone: "Youth Centre", distance: "400m", rating: 4.8, reviews: 312,
    eta: "20-30 min", open: true, min: 500,
    cover: img("photo-1604908176997-125f25cc6f3d"), coverFallback: FALLBACK.rice,
    menu: MAMA_TITI_MENU,
  },
  {
    id: "grace-grill", name: "Shalom Restaurant", category: "Protein & Grills",
    zone: "Mission House", distance: "650m", rating: 4.6, reviews: 201,
    eta: "25-35 min", open: true, min: 800,
    cover: img("photo-1555939594-58d7cb561ad1"), coverFallback: FALLBACK.grill,
    menu: GRACE_MENU,
  },
  {
    id: "bread-of-life", name: "Canaan Land Bakery", category: "Pastries",
    zone: "Old Auditorium", distance: "900m", rating: 4.9, reviews: 488,
    eta: "15-25 min", open: true, min: 300,
    cover: img("photo-1509440159596-0249088772ff"), coverFallback: FALLBACK.pastry,
    menu: BREAD_MENU,
  },
  {
    id: "living-water", name: "Living Water Drinks", category: "Beverages",
    zone: "Tree of Life", distance: "300m", rating: 4.5, reviews: 156,
    eta: "15-20 min", open: true, min: 200,
    cover: img("photo-1551024709-8f23befc6f87"), coverFallback: FALLBACK.drink,
    menu: WATER_MENU,
  },
  {
    id: "sister-bola", name: "Mimi's Naija Kitchen", category: "Rice Dishes",
    zone: "Estate 12", distance: "1.2km", rating: 4.7, reviews: 276,
    eta: "25-40 min", open: true, min: 600,
    cover: img("photo-1567620905732-2d1ec7ab7445"), coverFallback: FALLBACK.rice,
    menu: BOLA_MENU,
  },
  {
    id: "kingdom-kitchen", name: "Delta Kitchen", category: "Fast Food",
    zone: "Main Gate", distance: "1.8km", rating: 4.4, reviews: 98,
    eta: "30-45 min", open: true, min: 500,
    cover: img("photo-1568901346375-23c9450c58cd"), coverFallback: FALLBACK.snack,
    menu: KINGDOM_MENU,
  },
  {
    id: "covenant-pepper", name: "Calvary Kitchen", category: "Local Soup",
    zone: "Emmanuel Park", distance: "750m", rating: 4.8, reviews: 187,
    eta: "20-35 min", open: true, min: 700,
    cover: img("photo-1547592180-85f173990554"), coverFallback: FALLBACK.soup,
    menu: COVENANT_MENU,
  },
  {
    id: "manna-suya", name: "Manna Suya Spot", category: "Suya & Grills",
    zone: "2000 Chalets", distance: "1.1km", rating: 4.6, reviews: 143,
    eta: "Closed", open: false, min: 400,
    cover: img("photo-1529193591184-b1d58069ecdd"), coverFallback: FALLBACK.grill,
    menu: MANNA_MENU,
  },
  {
    id: "chalet-cafe", name: "Grace Table Cafe", category: "Snacks & Drinks",
    zone: "White House", distance: "550m", rating: 4.5, reviews: 167,
    eta: "20-30 min", open: true, min: 300,
    cover: img("photo-1481833761820-0509d3217039"), coverFallback: FALLBACK.snack,
    menu: CHALET_MENU,
  },
  {
    id: "glory-shawarma", name: "Glory Shawarma", category: "Fast Food",
    zone: "RECTEM", distance: "2.1km", rating: 4.3, reviews: 89,
    eta: "30-45 min", open: true, min: 600,
    cover: img("photo-1633321702518-7feccafb94d5"), coverFallback: FALLBACK.snack,
    menu: GLORY_MENU,
  },
];

/* Build a searchable keyword string per vendor from its dishes */
for (const v of VENDORS) {
  const dishes = (v.menu ?? []).flatMap((s) => s.items.map((i) => i.name)).join(" ");
  v.searchable = `${v.name} ${v.category} ${dishes}`.toLowerCase();
}

export const getVendorMenu = (v: Vendor): MenuSection[] => v.menu ?? [];

/* ── Location cascade ────────────────────────────────── */
export const LOCATIONS = locationsData.zones.map((z) => z.label);

const ZONE_BY_LABEL = Object.fromEntries(locationsData.zones.map((z) => [z.label, z]));

export const getAreas = (loc: string): string[] => (ZONE_BY_LABEL[loc]?.areas ?? []).map((a) => a.label);

export const getPickupPoints = (loc: string, area: string): string[] => {
  const z = ZONE_BY_LABEL[loc];
  const a = z?.areas.find((ar) => ar.label === area);
  return a?.pickupPoints ?? ["Main Entrance", "Side Gate", "Reception"];
};

export const BANKS = [
  { name: "GTBank",    code: "*737#" },
  { name: "Access Bank", code: "*901#" },
  { name: "First Bank", code: "*894#" },
  { name: "Zenith Bank", code: "*966#" },
  { name: "UBA",       code: "*919#" },
  { name: "Opay",      code: "*955#" },
];
