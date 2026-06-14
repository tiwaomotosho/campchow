import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { C as ChevronDown, S as ShieldCheck, A as ArrowLeft, X, L as LoaderCircle, a as Check, P as Phone, M as Mail, Z as Zap } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const zones = [{ "id": "new-auditorium-shimawa", "label": "New Auditorium (Shimawa)", "areas": [{ "id": "wing-a", "label": "Wing A", "pickupPoints": ["Main Entrance", "Side Gate A", "Ushers Station"] }, { "id": "wing-b", "label": "Wing B", "pickupPoints": ["Wing B Entrance", "Media Corner", "Overflow Section"] }, { "id": "wing-c", "label": "Wing C", "pickupPoints": ["Wing C Entrance", "Choir Stand Side", "Rear Exit"] }, { "id": "centre-aisle", "label": "Centre Aisle", "pickupPoints": ["Front Centre", "Mid Centre", "Back Centre"] }, { "id": "gallery", "label": "Gallery Level", "pickupPoints": ["Gallery Stairs", "Gallery Left", "Gallery Right"] }] }, { "id": "old-auditorium", "label": "Old Auditorium", "areas": [{ "id": "perimeter-1", "label": "Perimeter 1 (North)", "pickupPoints": ["North Gate Main", "Side Entry A", "Press Area"] }, { "id": "perimeter-2", "label": "Perimeter 2 (South)", "pickupPoints": ["South Gate", "Refreshment Point", "Side Exit B"] }, { "id": "perimeter-3", "label": "Perimeter 3 (East)", "pickupPoints": ["East Entrance", "Row 1-50 Gate", "VIP Entrance"] }, { "id": "perimeter-4", "label": "Perimeter 4 (West)", "pickupPoints": ["West Gate", "Wheelchair Access", "Staff Entrance"] }, { "id": "back-entrance", "label": "Back Entrance", "pickupPoints": ["Rear Gate", "Loading Bay", "Staff Car Park"] }] }, { "id": "the-pavilion", "label": "The Pavilion", "areas": [{ "id": "north-stand", "label": "North Stand", "pickupPoints": ["North Entrance", "Concession A", "Stair Block 1"] }, { "id": "south-stand", "label": "South Stand", "pickupPoints": ["South Entrance", "Concession B", "Stair Block 2"] }, { "id": "main-floor", "label": "Main Floor", "pickupPoints": ["Floor Entrance", "Stage Left", "Stage Right"] }, { "id": "vip-section", "label": "VIP Section", "pickupPoints": ["VIP Lounge", "VIP Reception"] }] }, { "id": "prayer-city", "label": "Prayer City", "areas": [{ "id": "block-1", "label": "Block 1", "pickupPoints": ["Block 1 Gate", "Prayer Hall A", "Reception"] }, { "id": "block-2", "label": "Block 2", "pickupPoints": ["Block 2 Gate", "Prayer Hall B", "Water Point"] }, { "id": "prayer-hall", "label": "Main Prayer Hall", "pickupPoints": ["Hall Entrance", "Side Entrance"] }] }, { "id": "tree-of-life", "label": "Tree of Life", "areas": [{ "id": "east-side", "label": "East Side", "pickupPoints": ["East Walkway", "Near Fountain", "Bench Area"] }, { "id": "west-side", "label": "West Side", "pickupPoints": ["West Walkway", "Shade Garden", "Exit Path"] }] }, { "id": "mission-house", "label": "Mission House", "areas": [{ "id": "main-reception", "label": "Main Reception", "pickupPoints": ["Front Desk", "Lobby", "Waiting Area"] }, { "id": "side-wing", "label": "Side Wing", "pickupPoints": ["Side Entrance", "Chapel Area", "Back Offices"] }] }, { "id": "canaan-land", "label": "Canaan Land", "areas": [{ "id": "block-a", "label": "Block A", "pickupPoints": ["Block A Gate", "Courtyard", "Reception"] }, { "id": "block-b", "label": "Block B", "pickupPoints": ["Block B Gate", "Community Hall"] }, { "id": "community-centre", "label": "Community Centre", "pickupPoints": ["Centre Entrance", "Side Hall"] }] }, { "id": "youth-centre", "label": "Youth Centre", "areas": [{ "id": "main-building", "label": "Main Building", "pickupPoints": ["Front Desk", "Left Wing Entrance", "Right Wing Entrance"] }, { "id": "annex-block", "label": "Annex Block", "pickupPoints": ["Annex Main Door", "Side Corridor", "Garden Entrance"] }, { "id": "court-area", "label": "Basketball Court Area", "pickupPoints": ["Court Gate", "Bench Area", "Changing Room Side"] }, { "id": "back-gate", "label": "Back Gate", "pickupPoints": ["Back Gate Post", "Rear Fence Corner"] }] }, { "id": "emmanuel-park", "label": "Emmanuel Park", "areas": [{ "id": "main-entrance", "label": "Main Entrance", "pickupPoints": ["Gate Arch", "Ticket Booth", "Info Stand"] }, { "id": "play-area", "label": "Play Area", "pickupPoints": ["Playground", "Snack Corner", "Seating Zone"] }] }, { "id": "2000-chalets", "label": "2000 Chalets", "areas": [{ "id": "block-1-500", "label": "Block 1-500", "pickupPoints": ["Block 1 Entrance", "Block 250 Junction", "Block 500 Gate", "Central Water Point"] }, { "id": "block-501-1000", "label": "Block 501-1000", "pickupPoints": ["Block Entrance", "Mid-Block Junction", "Water Point", "Car Park Side"] }, { "id": "block-1001-1500", "label": "Block 1001-1500", "pickupPoints": ["Block 1001 Gate", "Block 1250 Junction", "Reception Area"] }, { "id": "block-1501-2000", "label": "Block 1501-2000", "pickupPoints": ["Far End Gate", "Block 1750 Area", "Final Block Exit"] }] }, { "id": "estate-12", "label": "Estate 12", "areas": [{ "id": "phase-1", "label": "Phase 1", "pickupPoints": ["Phase 1 Gate", "Central Road", "Corner Shop"] }, { "id": "phase-2", "label": "Phase 2", "pickupPoints": ["Phase 2 Gate", "Community Hall", "Water Point"] }] }, { "id": "estate-13", "label": "Estate 13", "areas": [{ "id": "phase-1", "label": "Phase 1", "pickupPoints": ["Phase 1 Gate", "Main Road", "Corner Stop"] }, { "id": "phase-2", "label": "Phase 2", "pickupPoints": ["Phase 2 Gate", "Junction"] }, { "id": "phase-3", "label": "Phase 3", "pickupPoints": ["Phase 3 Gate", "Far Block"] }] }, { "id": "rehoboth-house", "label": "Rehoboth House", "areas": [{ "id": "ground-floor", "label": "Ground Floor", "pickupPoints": ["Main Reception", "Lobby", "Side Wing"] }, { "id": "first-floor", "label": "First Floor", "pickupPoints": ["Stair Landing", "Conference Room"] }] }, { "id": "redemption-camp-hq", "label": "Redemption Camp HQ", "areas": [{ "id": "main-reception", "label": "Main Reception", "pickupPoints": ["Front Desk", "Visitor Lobby"] }, { "id": "admin-block", "label": "Admin Block", "pickupPoints": ["Admin Entrance", "Conference Room", "Car Park"] }] }, { "id": "main-gate", "label": "Main Gate", "areas": [{ "id": "inbound", "label": "Inbound Lane", "pickupPoints": ["Security Post", "Welcome Arch", "Waiting Bay"] }, { "id": "outbound", "label": "Outbound Lane", "pickupPoints": ["Exit Post", "Taxi Park"] }] }, { "id": "rectem", "label": "RECTEM", "areas": [{ "id": "studio-block", "label": "Main Studio Block", "pickupPoints": ["Studio Lobby", "Reception Desk", "Ground Floor Side"] }, { "id": "media-hall", "label": "Media Hall", "pickupPoints": ["Hall Main Entrance", "Backstage Door", "Equipment Bay"] }, { "id": "it-centre", "label": "IT Centre", "pickupPoints": ["Lab Entrance", "Server Room Corridor", "Help Desk"] }] }];
const locationsData = {
  zones
};
const _baseUrl = "https://images.unsplash.com/";
const _params = "?auto=format&fit=crop&w=900&q=70";
const fallback = { "rice": "photo-1567620905732-2d1ec7ab7445", "grill": "photo-1432139555190-58524dae6a55", "pastry": "photo-1509440159596-0249088772ff", "soup": "photo-1547592180-85f173990554", "drink": "photo-1437418747212-8d9709afab22", "snack": "photo-1606755962773-d324e0a13086" };
const vendorCovers = { "mama-titi": "photo-1604908176997-125f25cc6f3d", "grace-grill": "photo-1555939594-58d7cb561ad1", "bread-of-life": "photo-1509440159596-0249088772ff", "living-water": "photo-1551024709-8f23befc6f87", "sister-bola": "photo-1567620905732-2d1ec7ab7445", "kingdom-kitchen": "photo-1568901346375-23c9450c58cd", "covenant-pepper": "photo-1547592180-85f173990554", "manna-suya": "photo-1529193591184-b1d58069ecdd", "chalet-cafe": "photo-1481833761820-0509d3217039", "glory-shawarma": "photo-1633321702518-7feccafb94d5" };
const menuItems = { "jollof-rice": "photo-1604908554007-9b6f5c0b9b8e", "grilled-chicken": "photo-1598103442097-8b74394b95c6", "fried-fish": "photo-1535140728325-a4d3707eee61", "beef": "photo-1558030006-450675393462", "snack-generic": "photo-1606755962773-d324e0a13086", "soft-drink": "photo-1554866585-cd94860890b7", "pepper-soup": "photo-1547592180-85f173990554", "grill-platter": "photo-1555939594-58d7cb561ad1", "suya-skewer": "photo-1529193591184-b1d58069ecdd", "bread": "photo-1509440159596-0249088772ff", "burger": "photo-1568901346375-23c9450c58cd", "shawarma": "photo-1633321702518-7feccafb94d5", "pie-pastry": "photo-1604908176997-125f25cc6f3d" };
const hero = ["photo-1604908176997-125f25cc6f3d", "photo-1555939594-58d7cb561ad1", "photo-1547592180-85f173990554", "photo-1517248135467-4c7edcad34c4"];
const categoryTiles = { "jollof-rice": { "src": "photo-1604908176997-125f25cc6f3d", "fallback": "photo-1567620905732-2d1ec7ab7445" }, "grills-suya": { "src": "photo-1555939594-58d7cb561ad1", "fallback": "photo-1432139555190-58524dae6a55" }, "pastries": { "src": "photo-1509440159596-0249088772ff", "fallback": "photo-1620921568790-c1cf8984624c" }, "pepper-soup": { "src": "photo-1547592180-85f173990554", "fallback": "photo-1598866594230-a7c12756260f" }, "drinks": { "src": "photo-1551024709-8f23befc6f87", "fallback": "photo-1437418747212-8d9709afab22" }, "shawarma": { "src": "photo-1633321702518-7feccafb94d5", "fallback": "photo-1561758033-d89a9ad46330" } };
const lifestyle = { "kitchen-vendor": { "src": "photo-1556910103-1c02745aae4d", "fallback": "photo-1466637574441-749b8f19452f" }, "rider-delivery": { "src": "photo-1517649763962-0c623066013b", "fallback": "photo-1571068316344-75bc76f77890" } };
const imagesData = {
  _baseUrl,
  _params,
  fallback,
  vendorCovers,
  menuItems,
  hero,
  categoryTiles,
  lifestyle
};
const ZONES = ["All Zones", ...locationsData.zones.map((z) => z.label)];
const CATEGORIES = [
  "All",
  "Rice Dishes",
  "Protein & Grills",
  "Snacks",
  "Beverages",
  "Pastries",
  "Local Soup",
  "Fast Food"
];
const U = (id) => `${imagesData._baseUrl}${id}${imagesData._params}`;
const cover = (k) => U(imagesData.vendorCovers[k]);
const item = (k) => U(imagesData.menuItems[k]);
const F = imagesData.fallback;
const FALLBACK = {
  rice: U(F.rice),
  grill: U(F.grill),
  pastry: U(F.pastry),
  soup: U(F.soup),
  drink: U(F.drink),
  snack: U(F.snack)
};
const MAMA_TITI_MENU = [
  {
    id: "rice",
    title: "Rice & Stew",
    items: [
      { id: "mt-r1", name: "Jollof Rice + Chicken", description: "Rich tomato jollof with smoky grilled chicken", price: 1800, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Popular", "Spicy"] },
      { id: "mt-r2", name: "White Rice + Egusi Stew", description: "Fluffy white rice with rich egusi", price: 1500, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Halal"] },
      { id: "mt-r3", name: "Fried Rice + Turkey", description: "Seasoned fried rice with turkey drumstick", price: 2e3, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Popular"] },
      { id: "mt-r4", name: "Ofada Rice + Ayamase", description: "Local ofada rice with green pepper stew", price: 1700, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Spicy"] }
    ]
  },
  {
    id: "proteins",
    title: "Proteins",
    items: [
      { id: "mt-p1", name: "Grilled Chicken (full)", description: "Smoky and well-seasoned", price: 1200, image: item("grilled-chicken"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
      { id: "mt-p2", name: "Fried Fish (medium)", description: "Crispy seasoned catfish", price: 900, image: item("fried-fish"), imageFallback: FALLBACK.grill },
      { id: "mt-p3", name: "Peppered Ponmo", description: "Soft cow skin in pepper sauce", price: 400, image: item("beef"), imageFallback: FALLBACK.grill, tags: ["Halal", "Spicy"] },
      { id: "mt-p4", name: "Peppered Beef (3 pcs)", description: "Tender peppered beef", price: 600, image: item("beef"), imageFallback: FALLBACK.grill, tags: ["Halal"] }
    ]
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      { id: "mt-s1", name: "Moin Moin (2 wraps)", description: "Steamed bean pudding", price: 400, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
      { id: "mt-s2", name: "Coleslaw", description: "Creamy and fresh", price: 200, image: item("snack-generic"), imageFallback: FALLBACK.snack },
      { id: "mt-s3", name: "Fried Plantain (Dodo)", description: "Sweet and golden", price: 350, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Vegan"] }
    ]
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { id: "mt-d1", name: "Chilled Soft Drink", description: "Coke, Fanta, or Sprite", price: 300, image: item("soft-drink"), imageFallback: FALLBACK.drink },
      { id: "mt-d2", name: "Bottled Water (75cl)", description: "Still mineral water", price: 150, image: item("soft-drink"), imageFallback: FALLBACK.drink },
      { id: "mt-d3", name: "Zobo (cup)", description: "Hibiscus, lightly sweetened", price: 250, image: item("soft-drink"), imageFallback: FALLBACK.drink, tags: ["Vegan"] }
    ]
  }
];
const sec = (id, title, items) => ({ id, title, items });
const GRACE_MENU = [
  sec("grills", "Grills", [
    { id: "gg-1", name: "Grilled Whole Chicken", description: "Slow-grilled, perfectly seasoned, served with sauce", price: 3500, image: item("grilled-chicken"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
    { id: "gg-2", name: "Mixed Grill Platter", description: "Chicken, beef, and fish with peppered vegetables", price: 4200, image: item("grill-platter"), imageFallback: FALLBACK.grill, tags: ["Popular"] },
    { id: "gg-3", name: "Suya Beef Skewers (x4)", description: "Spiced and char-grilled on open flame", price: 1800, image: item("suya-skewer"), imageFallback: FALLBACK.grill, tags: ["Spicy", "Halal"] },
    { id: "gg-4", name: "Grilled Tilapia", description: "Whole fish with pepper sauce and onions", price: 2800, image: item("fried-fish"), imageFallback: FALLBACK.grill }
  ]),
  sec("sides", "Sides & Drinks", [
    { id: "gg-5", name: "Spicy Potato Wedges", description: "Crispy, seasoned wedges", price: 900, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Vegan"] },
    { id: "gg-6", name: "Chilled Soft Drink", description: "Coke, Fanta, or Sprite", price: 300, image: item("soft-drink"), imageFallback: FALLBACK.drink }
  ])
];
const BREAD_MENU = [
  sec("bakery", "Fresh from the Oven", [
    { id: "bl-1", name: "Artisan Agege Bread", description: "Fresh-baked, soft and fluffy loaf", price: 800, image: item("bread"), imageFallback: FALLBACK.pastry, tags: ["Popular"] },
    { id: "bl-2", name: "Meat Pie (x2)", description: "Flaky pastry filled with seasoned minced meat", price: 700, image: item("snack-generic"), imageFallback: FALLBACK.pastry },
    { id: "bl-3", name: "Chicken Pie (x2)", description: "Golden pastry with savoury chicken filling", price: 800, image: item("pie-pastry"), imageFallback: FALLBACK.pastry },
    { id: "bl-4", name: "Chin Chin (bag)", description: "Lightly sweetened, crunchy fried snack", price: 400, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Vegan"] }
  ])
];
const WATER_MENU = [
  sec("drinks", "Cold Drinks", [
    { id: "lw-1", name: "Chilled Zobo (50cl)", description: "Hibiscus infusion, lightly sweetened and cold", price: 350, image: item("soft-drink"), imageFallback: FALLBACK.drink, tags: ["Vegan", "Popular"] },
    { id: "lw-2", name: "Fresh Kunu (50cl)", description: "Millet-based drink, refreshing and filling", price: 300, image: item("soft-drink"), imageFallback: FALLBACK.drink, tags: ["Vegan"] },
    { id: "lw-3", name: "Bottled Water (1.5L)", description: "Still mineral water", price: 200, image: item("soft-drink"), imageFallback: FALLBACK.drink },
    { id: "lw-4", name: "Soft Drink (can)", description: "Coke, Fanta, or Sprite", price: 300, image: item("soft-drink"), imageFallback: FALLBACK.drink }
  ])
];
const BOLA_MENU = [
  sec("rice", "Rice Specials", [
    { id: "sb-1", name: "Party Jollof + Chicken", description: "Smoky party-style jollof with grilled chicken", price: 2200, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Popular", "Spicy"] },
    { id: "sb-2", name: "Coconut Rice + Prawns", description: "Fragrant coconut rice with seasoned prawns", price: 2500, image: item("jollof-rice"), imageFallback: FALLBACK.rice },
    { id: "sb-3", name: "Ofada Rice + Ayamase", description: "Local ofada rice with traditional green pepper stew", price: 1900, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Spicy"] },
    { id: "sb-4", name: "Fried Rice + Goat Meat", description: "Seasoned fried rice with tender goat meat", price: 2400, image: item("jollof-rice"), imageFallback: FALLBACK.rice, tags: ["Halal"] }
  ])
];
const KINGDOM_MENU = [
  sec("fast", "Fast Food", [
    { id: "kk-1", name: "Loaded Beef Burger", description: "Beef patty, lettuce, tomato, house sauce", price: 1800, image: item("burger"), imageFallback: FALLBACK.snack, tags: ["Popular"] },
    { id: "kk-2", name: "Chicken Wrap", description: "Grilled chicken strips in flatbread with coleslaw", price: 1500, image: item("snack-generic"), imageFallback: FALLBACK.snack },
    { id: "kk-3", name: "Chips + Chicken Strips", description: "Crispy fries and seasoned chicken pieces", price: 1400, image: item("snack-generic"), imageFallback: FALLBACK.snack },
    { id: "kk-4", name: "Beef Shawarma", description: "Spiced beef, pickles, sauce in flatbread", price: 1600, image: item("shawarma"), imageFallback: FALLBACK.snack, tags: ["Spicy"] }
  ])
];
const COVENANT_MENU = [
  sec("soup", "Pepper Soups", [
    { id: "cp-1", name: "Goat Meat Pepper Soup", description: "Rich, spiced broth with tender goat meat", price: 2200, image: item("pepper-soup"), imageFallback: FALLBACK.soup, tags: ["Popular", "Spicy"] },
    { id: "cp-2", name: "Catfish Pepper Soup", description: "Fresh catfish in a bold, spiced broth", price: 2500, image: item("pie-pastry"), imageFallback: FALLBACK.soup, tags: ["Spicy"] },
    { id: "cp-3", name: "Cow Foot Pepper Soup", description: "Slow-cooked, deeply flavoured and aromatic", price: 1900, image: item("pepper-soup"), imageFallback: FALLBACK.soup, tags: ["Spicy", "Halal"] },
    { id: "cp-4", name: "Chicken Pepper Soup", description: "Comforting, lightly peppered chicken broth", price: 2e3, image: item("pepper-soup"), imageFallback: FALLBACK.soup }
  ])
];
const MANNA_MENU = [
  sec("suya", "Suya & Grills", [
    { id: "ms-1", name: "Beef Suya (per stick)", description: "Classic spiced suya on skewer", price: 300, image: item("suya-skewer"), imageFallback: FALLBACK.grill, tags: ["Spicy", "Halal"] },
    { id: "ms-2", name: "Suya Wrap", description: "Suya strips wrapped in thin flatbread", price: 900, image: item("shawarma"), imageFallback: FALLBACK.snack, tags: ["Spicy"] },
    { id: "ms-3", name: "Kilishi (50g)", description: "Dried spiced beef — a camp favourite", price: 600, image: item("beef"), imageFallback: FALLBACK.grill, tags: ["Halal"] },
    { id: "ms-4", name: "Chicken Suya", description: "Grilled spiced chicken skewers", price: 1200, image: item("grilled-chicken"), imageFallback: FALLBACK.grill, tags: ["Spicy"] }
  ])
];
const CHALET_MENU = [
  sec("snacks", "Snacks & Bites", [
    { id: "cc-1", name: "Egg Sandwich", description: "Toasted bread with fried egg and seasoning", price: 700, image: item("snack-generic"), imageFallback: FALLBACK.snack },
    { id: "cc-2", name: "Puff Puff (x6)", description: "Soft, pillowy fried dough — freshly made", price: 400, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Vegan", "Popular"] },
    { id: "cc-3", name: "Sausage Roll (x2)", description: "Seasoned sausage in short-crust pastry", price: 500, image: item("snack-generic"), imageFallback: FALLBACK.pastry },
    { id: "cc-4", name: "Hot Coffee", description: "Freshly brewed, served hot", price: 600, image: item("soft-drink"), imageFallback: FALLBACK.drink }
  ])
];
const GLORY_MENU = [
  sec("shawarma", "Shawarma & Combos", [
    { id: "gs-1", name: "Chicken Shawarma", description: "Marinated chicken, garlic sauce, veggies in flatbread", price: 1600, image: item("shawarma"), imageFallback: FALLBACK.snack, tags: ["Popular"] },
    { id: "gs-2", name: "Beef Shawarma", description: "Spiced beef with pickles, sauce and fresh greens", price: 1800, image: item("shawarma"), imageFallback: FALLBACK.snack, tags: ["Spicy"] },
    { id: "gs-3", name: "Double Chicken Shawarma", description: "Extra chicken, extra filling", price: 2200, image: item("snack-generic"), imageFallback: FALLBACK.snack },
    { id: "gs-4", name: "Shawarma + Chips Combo", description: "Shawarma of choice with seasoned chips", price: 2200, image: item("snack-generic"), imageFallback: FALLBACK.snack, tags: ["Popular"] }
  ])
];
const VENDORS = [
  {
    id: "mama-titi",
    name: "Mama Titi's Kitchen",
    category: "Local Nigerian",
    zone: "Youth Centre",
    distance: "400m",
    rating: 4.8,
    reviews: 312,
    eta: "20-30 min",
    open: true,
    min: 500,
    cover: cover("mama-titi"),
    coverFallback: FALLBACK.rice,
    menu: MAMA_TITI_MENU
  },
  {
    id: "grace-grill",
    name: "Shalom Restaurant",
    category: "Protein & Grills",
    zone: "Mission House",
    distance: "650m",
    rating: 4.6,
    reviews: 201,
    eta: "25-35 min",
    open: true,
    min: 800,
    cover: cover("grace-grill"),
    coverFallback: FALLBACK.grill,
    menu: GRACE_MENU
  },
  {
    id: "bread-of-life",
    name: "Canaan Land Bakery",
    category: "Pastries",
    zone: "Old Auditorium",
    distance: "900m",
    rating: 4.9,
    reviews: 488,
    eta: "15-25 min",
    open: true,
    min: 300,
    cover: cover("bread-of-life"),
    coverFallback: FALLBACK.pastry,
    menu: BREAD_MENU
  },
  {
    id: "living-water",
    name: "Living Water Drinks",
    category: "Beverages",
    zone: "Tree of Life",
    distance: "300m",
    rating: 4.5,
    reviews: 156,
    eta: "15-20 min",
    open: true,
    min: 200,
    cover: cover("living-water"),
    coverFallback: FALLBACK.drink,
    menu: WATER_MENU
  },
  {
    id: "sister-bola",
    name: "Mimi's Naija Kitchen",
    category: "Rice Dishes",
    zone: "Estate 12",
    distance: "1.2km",
    rating: 4.7,
    reviews: 276,
    eta: "25-40 min",
    open: true,
    min: 600,
    cover: cover("sister-bola"),
    coverFallback: FALLBACK.rice,
    menu: BOLA_MENU
  },
  {
    id: "kingdom-kitchen",
    name: "Delta Kitchen",
    category: "Fast Food",
    zone: "Main Gate",
    distance: "1.8km",
    rating: 4.4,
    reviews: 98,
    eta: "30-45 min",
    open: true,
    min: 500,
    cover: cover("kingdom-kitchen"),
    coverFallback: FALLBACK.snack,
    menu: KINGDOM_MENU
  },
  {
    id: "covenant-pepper",
    name: "Calvary Kitchen",
    category: "Local Soup",
    zone: "Emmanuel Park",
    distance: "750m",
    rating: 4.8,
    reviews: 187,
    eta: "20-35 min",
    open: true,
    min: 700,
    cover: cover("covenant-pepper"),
    coverFallback: FALLBACK.soup,
    menu: COVENANT_MENU
  },
  {
    id: "manna-suya",
    name: "Manna Suya Spot",
    category: "Suya & Grills",
    zone: "2000 Chalets",
    distance: "1.1km",
    rating: 4.6,
    reviews: 143,
    eta: "Closed",
    open: false,
    min: 400,
    cover: cover("manna-suya"),
    coverFallback: FALLBACK.grill,
    menu: MANNA_MENU
  },
  {
    id: "chalet-cafe",
    name: "Grace Table Cafe",
    category: "Snacks & Drinks",
    zone: "White House",
    distance: "550m",
    rating: 4.5,
    reviews: 167,
    eta: "20-30 min",
    open: true,
    min: 300,
    cover: cover("chalet-cafe"),
    coverFallback: FALLBACK.snack,
    menu: CHALET_MENU
  },
  {
    id: "glory-shawarma",
    name: "Glory Shawarma",
    category: "Fast Food",
    zone: "RECTEM",
    distance: "2.1km",
    rating: 4.3,
    reviews: 89,
    eta: "30-45 min",
    open: true,
    min: 600,
    cover: cover("glory-shawarma"),
    coverFallback: FALLBACK.snack,
    menu: GLORY_MENU
  }
];
for (const v of VENDORS) {
  const dishes = (v.menu ?? []).flatMap((s) => s.items.map((i) => i.name)).join(" ");
  v.searchable = `${v.name} ${v.category} ${dishes}`.toLowerCase();
}
const getVendorMenu = (v) => v.menu ?? [];
const LOCATIONS = locationsData.zones.map((z) => z.label);
const ZONE_BY_LABEL = Object.fromEntries(locationsData.zones.map((z) => [z.label, z]));
const getAreas = (loc) => (ZONE_BY_LABEL[loc]?.areas ?? []).map((a) => a.label);
const getPickupPoints = (loc, area) => {
  const z = ZONE_BY_LABEL[loc];
  const a = z?.areas.find((ar) => ar.label === area);
  return a?.pickupPoints ?? ["Main Entrance", "Side Gate", "Reception"];
};
const BANKS = [
  { name: "GTBank", code: "*737#" },
  { name: "Access Bank", code: "*901#" },
  { name: "First Bank", code: "*894#" },
  { name: "Zenith Bank", code: "*966#" },
  { name: "UBA", code: "*919#" },
  { name: "Opay", code: "*955#" }
];
const CartCtx = reactExports.createContext(null);
const seedFromMenu = (id) => {
  for (const s of MAMA_TITI_MENU) {
    const f = s.items.find((i) => i.id === id);
    if (f) return f;
  }
  return null;
};
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState(() => {
    const seed = [];
    const r1 = seedFromMenu("mt-r1");
    const s3 = seedFromMenu("mt-s3");
    if (r1) seed.push({ id: r1.id, name: r1.name, price: r1.price, image: r1.image, imageFallback: r1.imageFallback, qty: 2, vendorId: "mama-titi" });
    if (s3) seed.push({ id: s3.id, name: s3.name, price: s3.price, image: s3.image, imageFallback: s3.imageFallback, qty: 1, vendorId: "mama-titi" });
    return seed;
  });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("cc-cart");
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("cc-cart", JSON.stringify(items));
  }, [items]);
  const add = (item2, vendorId) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item2.id);
      if (found) return prev.map((p) => p.id === item2.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { id: item2.id, name: item2.name, price: item2.price, image: item2.image, imageFallback: item2.imageFallback, qty: 1, vendorId }];
    });
  };
  const setQty = (id, qty) => {
    setItems((prev) => qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => p.id === id ? { ...p, qty } : p));
  };
  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartCtx.Provider, { value: { items, count, subtotal, add, setQty, remove, clear }, children });
}
const useCart = () => {
  const ctx = reactExports.useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
const AuthCtx = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [reason, setReason] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("cc-user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
      }
    }
  }, []);
  const login = (u) => {
    setUser(u);
    if (typeof window !== "undefined") sessionStorage.setItem("cc-user", JSON.stringify(u));
    setModalOpen(false);
  };
  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") sessionStorage.removeItem("cc-user");
  };
  const requireAuth = (r) => {
    setReason(r ?? "");
    setModalOpen(true);
  };
  const _close = () => setModalOpen(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthCtx.Provider, { value: {
    user,
    isLoggedIn: !!user,
    isGuest: !user,
    login,
    logout,
    requireAuth,
    _modalOpen: modalOpen,
    _reason: reason,
    _close
  }, children });
}
const useAuth = () => {
  const ctx = reactExports.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
const DEMO_NAMES = ["Adebayo Okafor", "Chiamaka Eze", "Tunde Bakare", "Ngozi Okonkwo", "Emeka Nwosu"];
const COUNTRIES = [
  { flag: "🇳🇬", code: "+234", name: "Nigeria" },
  { flag: "🇬🇭", code: "+233", name: "Ghana" },
  { flag: "🇰🇪", code: "+254", name: "Kenya" },
  { flag: "🇿🇦", code: "+27", name: "South Africa" },
  { flag: "🇬🇧", code: "+44", name: "United Kingdom" },
  { flag: "🇺🇸", code: "+1", name: "United States" }
];
const rand = (a) => a[Math.floor(Math.random() * a.length)];
function AuthModal() {
  const { _modalOpen, _reason, _close, login } = useAuth();
  const [screen, setScreen] = reactExports.useState("choice");
  const [loadingLabel, setLoadingLabel] = reactExports.useState(null);
  const [country, setCountry] = reactExports.useState(COUNTRIES[0]);
  const [ccOpen, setCcOpen] = reactExports.useState(false);
  const [phone, setPhone] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState(["", "", "", "", "", ""]);
  const otpRefs = reactExports.useRef([]);
  const [secs, setSecs] = reactExports.useState(30);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [pendingMethod, setPendingMethod] = reactExports.useState("phone");
  const [welcomeName, setWelcomeName] = reactExports.useState("");
  reactExports.useEffect(() => {
    document.body.style.overflow = _modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [_modalOpen]);
  reactExports.useEffect(() => {
    if (_modalOpen) {
      setScreen("choice");
      setLoadingLabel(null);
      setOtp(["", "", "", "", "", ""]);
      setPhone("");
      setName("");
      setEmail("");
    }
  }, [_modalOpen]);
  reactExports.useEffect(() => {
    if (screen !== "otp") return;
    setSecs(30);
    const id = setInterval(() => setSecs((s) => s - 1), 1e3);
    return () => clearInterval(id);
  }, [screen]);
  reactExports.useEffect(() => {
    if (screen !== "otp" || secs > 0) return;
    const code = Array.from({ length: 6 }, () => String(Math.floor(Math.random() * 10)));
    code.forEach((d, i) => setTimeout(() => {
      setOtp((prev) => {
        const n = [...prev];
        n[i] = d;
        return n;
      });
      if (i === 5) setTimeout(() => finishOtp(true), 400);
    }, i * 110));
  }, [secs, screen]);
  if (!_modalOpen) return null;
  const ssoLogin = (method) => {
    setLoadingLabel(method === "google" ? "Connecting to Google…" : "Connecting to Apple…");
    setTimeout(() => {
      const nm = rand(DEMO_NAMES);
      setLoadingLabel(null);
      finishWelcome({ name: nm, method, email: `${nm.split(" ")[0].toLowerCase()}@gmail.com` });
    }, 1500);
  };
  const onOtpChange = (i, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const n = [...prev];
      n[i] = digit;
      return n;
    });
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
    if (digit && i === 5) setTimeout(() => finishOtp(false), 250);
  };
  const onOtpPaste = (e) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (txt.length) {
      setOtp(txt.padEnd(6, "").split("").slice(0, 6));
      if (txt.length === 6) setTimeout(() => finishOtp(false), 300);
    }
  };
  const finishOtp = (auto) => {
    setLoadingLabel("Verifying…");
    setTimeout(() => {
      setLoadingLabel(null);
      setPendingMethod("phone");
      setScreen("profile");
      if (auto) toast.info("Code auto-filled for demo");
    }, 700);
  };
  const finishWelcome = (u) => {
    login(u);
    setWelcomeName(u.name.split(" ")[0]);
    setScreen("welcome");
    setTimeout(() => {
      _close();
      toast.success(`🎉 Welcome, ${u.name.split(" ")[0]}!`, { description: "You can now place orders and earn rewards." });
    }, 1900);
  };
  const fillDemo = () => {
    setName("Adeola Johnson");
    setEmail("adeola.johnson@campchow.app");
  };
  const Backdrop = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[60] bg-black/55 animate-fade-in", onClick: _close });
  const header = (back) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
    back ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: back, className: "grid place-items-center h-9 w-9 -ml-1 rounded-full hover:bg-muted text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "Camp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: _close, className: "grid place-items-center h-9 w-9 -mr-1 rounded-full hover:bg-muted text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
  ] });
  const loadingOverlay = loadingLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 grid place-items-center bg-card/85 backdrop-blur rounded-t-3xl sm:rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 32, className: "text-brand animate-spin mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold text-body", children: loadingLabel })
  ] }) });
  let body;
  if (screen === "welcome") {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", style: { minHeight: 320 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-24 w-24 rounded-full bg-success grid place-items-center animate-checkmark pulse-ring", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 48, className: "text-white", strokeWidth: 3 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-2xl font-extrabold text-dark", children: [
        "Welcome to CampChow, ",
        welcomeName,
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Your account is ready. Let's find you something delicious." })
    ] });
  } else if (screen === "choice") {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark text-center", children: "Join the Camp's food network" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground text-center", children: _reason || "Order from your favourite vendors, track your rider, and earn rewards." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => ssoLogin("google"), className: "tap w-full h-12 rounded-xl border border-border bg-card font-semibold text-body inline-flex items-center justify-center gap-2.5 hover:bg-muted transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleG, {}),
          " Continue with Google"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => ssoLogin("apple"), className: "tap w-full h-12 rounded-xl bg-dark text-white font-semibold inline-flex items-center justify-center gap-2.5 hover:opacity-90 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AppleLogo, {}),
          " Continue with Apple"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setScreen("phone"), className: "tap w-full h-12 rounded-xl bg-brand text-white font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-brand-mid transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
          " Continue with Phone"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 flex items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setPendingMethod("email");
        setScreen("email");
      }, className: "tap w-full h-11 rounded-xl border border-border font-semibold text-body inline-flex items-center justify-center gap-2 hover:bg-muted transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 17 }),
        " Sign up with Email"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-sm text-muted-foreground", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setScreen("signin"), className: "font-semibold text-brand hover:underline", children: "Sign in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: _close, className: "mt-3 w-full text-center text-xs text-muted-foreground hover:text-body", children: "Continue browsing as guest" })
    ] });
  } else if (screen === "phone") {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(() => setScreen("choice")),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark", children: "What's your number?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "We'll send a one-time code to verify it's you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCcOpen((v) => !v), className: "h-12 px-3 rounded-xl border border-border bg-card font-semibold text-body inline-flex items-center gap-1.5 hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: country.flag }),
            " ",
            country.code,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
          ] }),
          ccOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-14 left-0 z-20 w-56 max-h-60 overflow-auto bg-card border border-border rounded-xl shadow-xl p-1", children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setCountry(c);
            setCcOpen(false);
          }, className: "w-full flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-muted text-left text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: c.flag }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: c.name }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: c.code })
          ] }, c.code)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            autoFocus: true,
            inputMode: "numeric",
            value: phone,
            onChange: (e) => setPhone(e.target.value.replace(/[^\d ]/g, "")),
            placeholder: "0812 345 6789",
            className: "flex-1 h-12 px-4 rounded-xl border border-border bg-card text-[15px] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setScreen("otp"),
          disabled: phone.replace(/\D/g, "").length < 7,
          className: "tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition disabled:opacity-40 disabled:cursor-not-allowed",
          children: "Send Code"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-xs text-muted-foreground inline-flex items-center gap-1.5 justify-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13, className: "text-success" }),
        " Your number stays private. Demo only — no real SMS sent."
      ] })
    ] });
  } else if (screen === "otp") {
    const pct = secs / 30 * 100;
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(() => setScreen("phone")),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark", children: "Enter your code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Sent to ",
        country.code,
        " ",
        phone || "0812 345 6789"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-between gap-2", onPaste: onOtpPaste, children: otp.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: (el) => {
            otpRefs.current[i] = el;
          },
          value: d,
          inputMode: "numeric",
          maxLength: 1,
          onChange: (e) => onOtpChange(i, e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
          },
          className: "w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-border bg-card focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-14 w-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-14 w-14 -rotate-90", viewBox: "0 0 40 40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "17", fill: "none", stroke: "var(--color-border)", strokeWidth: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "20",
                cy: "20",
                r: "17",
                fill: "none",
                stroke: "var(--color-brand)",
                strokeWidth: "3",
                strokeDasharray: 2 * Math.PI * 17,
                strokeDashoffset: 2 * Math.PI * 17 * (1 - pct / 100),
                strokeLinecap: "round",
                style: { transition: "stroke-dashoffset 1s linear" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center text-sm font-bold text-brand", children: Math.max(0, secs) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter any 6 digits, or wait — we'll auto-fill for the demo." })
      ] })
    ] });
  } else if (screen === "profile") {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(() => setScreen("choice")),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark", children: "Almost there." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Just a few details to set up your account." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fillDemo, className: "tap inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }),
          " Fill demo"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Sister Funke Adeyemi", className: "auth-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "auth-input" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => finishWelcome({ name: name.trim() || "Adeola Johnson", email: email || void 0, phone: `${country.code} ${phone}`, method: pendingMethod }),
          className: "tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition",
          children: "Create My Account"
        }
      )
    ] });
  } else if (screen === "email") {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(() => setScreen("choice")),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark", children: "Sign up with email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quick and easy — no password rules to fight." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fillDemo, className: "tap inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }),
          " Fill demo"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Brother Samuel", className: "auth-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "auth-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", defaultValue: "", placeholder: "••••••••", className: "auth-input" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => finishWelcome({ name: name.trim() || "Adeola Johnson", email: email || "adeola.johnson@campchow.app", method: "email" }),
          className: "tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition",
          children: "Create Account"
        }
      )
    ] });
  } else {
    body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      header(() => setScreen("choice")),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-extrabold text-dark", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sign in to your CampChow account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone or email", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Phone number or email", className: "auth-input" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "••••••••", className: "auth-input" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.info("Reset link sent — check your inbox."), className: "mt-2 text-xs font-semibold text-brand hover:underline", children: "Forgot password?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => finishWelcome({ name: "Adeola Johnson", method: "email", email: "adeola.johnson@campchow.app" }),
          className: "tap mt-5 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition",
          children: "Sign In"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    Backdrop,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed z-[60] inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center sm:p-4 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pointer-events-auto w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 animate-slide-up sm:animate-fade-in max-h-[92vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden mx-auto h-1.5 w-12 rounded-full bg-border mb-4" }),
      loadingOverlay,
      body
    ] }) })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children })
  ] });
}
function GoogleG() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.3 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.9 6.1C12.3 13.2 17.7 9.5 24 9.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7C43.9 38 46.5 31.8 46.5 24.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M10.4 28.3c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.3 0 20 0 24s.9 7.7 2.5 11l7.9-6.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.3-5.7c-2 1.4-4.7 2.3-8.2 2.3-6.3 0-11.7-3.7-13.6-9.1l-7.9 6.1C6.4 42.6 14.6 48 24 48z" })
  ] });
}
function AppleLogo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "18", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.05 12.5c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.1-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.6-3.7zM14.6 4.6c.7-.8 1.1-2 1-3.1-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" }) });
}
const appCss = "/assets/styles-DVXDGSEx.css";
const FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%231A6B3C'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='system-ui'>🛒</text></svg>`;
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "CampChow — Food. Delivered Anywhere on the Camp." },
      { name: "description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      { name: "theme-color", content: "#1A6B3C" },
      { property: "og:title", content: "CampChow — Food. Delivered Anywhere on the Camp." },
      { property: "og:description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CampChow — Food. Delivered Anywhere on the Camp." },
      { name: "twitter:description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b1e6bc8-7834-4032-938c-cf4e277555a9/id-preview-32ad970f--0c80a80e-e09f-498a-bd43-eea921c3d9f3.lovable.app-1780041865390.png"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: FAVICON, type: "image/svg+xml" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] }) }) });
}
const $$splitComponentImporter$c = () => import("./index-LZaUQJ6V.mjs");
const Route$c = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CampChow — Food. Delivered Anywhere on the Camp."
    }, {
      name: "description",
      content: "The three-sided food ordering and last-mile delivery platform built exclusively for Redemption City."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./home.index-BK-EhnZV.mjs");
const Route$b = createFileRoute("/home/")({
  head: () => ({
    meta: [{
      title: "Browse Vendors — CampChow"
    }, {
      name: "description",
      content: "Order from your favourite vendors and get it delivered to your zone."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./vendor.transactions-DezkoYiw.mjs");
const Route$a = createFileRoute("/vendor/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./vendor.login-DPq3hyOh.mjs");
const Route$9 = createFileRoute("/vendor/login")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./vendor.earnings-BDI033tb.mjs");
const Route$8 = createFileRoute("/vendor/earnings")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./vendor.dashboard-BENTpzc1.mjs");
const Route$7 = createFileRoute("/vendor/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./rider.transactions-Cm2YG_rp.mjs");
const Route$6 = createFileRoute("/rider/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./rider.login-OPdMuBDN.mjs");
const Route$5 = createFileRoute("/rider/login")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./rider.dashboard-C_re3fM1.mjs");
const Route$4 = createFileRoute("/rider/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./home.order-confirmed-CvD2Nj8W.mjs");
const Route$3 = createFileRoute("/home/order-confirmed")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./home.checkout-DBSNkN8f.mjs");
const Route$2 = createFileRoute("/home/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./home.cart-CymlRe_u.mjs");
const Route$1 = createFileRoute("/home/cart")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./home.vendor._id-55BhtmoJ.mjs");
const Route = createFileRoute("/home/vendor/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const HomeIndexRoute = Route$b.update({
  id: "/home/",
  path: "/home/",
  getParentRoute: () => Route$d
});
const VendorTransactionsRoute = Route$a.update({
  id: "/vendor/transactions",
  path: "/vendor/transactions",
  getParentRoute: () => Route$d
});
const VendorLoginRoute = Route$9.update({
  id: "/vendor/login",
  path: "/vendor/login",
  getParentRoute: () => Route$d
});
const VendorEarningsRoute = Route$8.update({
  id: "/vendor/earnings",
  path: "/vendor/earnings",
  getParentRoute: () => Route$d
});
const VendorDashboardRoute = Route$7.update({
  id: "/vendor/dashboard",
  path: "/vendor/dashboard",
  getParentRoute: () => Route$d
});
const RiderTransactionsRoute = Route$6.update({
  id: "/rider/transactions",
  path: "/rider/transactions",
  getParentRoute: () => Route$d
});
const RiderLoginRoute = Route$5.update({
  id: "/rider/login",
  path: "/rider/login",
  getParentRoute: () => Route$d
});
const RiderDashboardRoute = Route$4.update({
  id: "/rider/dashboard",
  path: "/rider/dashboard",
  getParentRoute: () => Route$d
});
const HomeOrderConfirmedRoute = Route$3.update({
  id: "/home/order-confirmed",
  path: "/home/order-confirmed",
  getParentRoute: () => Route$d
});
const HomeCheckoutRoute = Route$2.update({
  id: "/home/checkout",
  path: "/home/checkout",
  getParentRoute: () => Route$d
});
const HomeCartRoute = Route$1.update({
  id: "/home/cart",
  path: "/home/cart",
  getParentRoute: () => Route$d
});
const HomeVendorIdRoute = Route.update({
  id: "/home/vendor/$id",
  path: "/home/vendor/$id",
  getParentRoute: () => Route$d
});
const rootRouteChildren = {
  IndexRoute,
  HomeCartRoute,
  HomeCheckoutRoute,
  HomeOrderConfirmedRoute,
  RiderDashboardRoute,
  RiderLoginRoute,
  RiderTransactionsRoute,
  VendorDashboardRoute,
  VendorEarningsRoute,
  VendorLoginRoute,
  VendorTransactionsRoute,
  HomeIndexRoute,
  HomeVendorIdRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  BANKS as B,
  CATEGORIES as C,
  LOCATIONS as L,
  Route as R,
  VENDORS as V,
  ZONES as Z,
  useCart as a,
  getPickupPoints as b,
  getVendorMenu as c,
  getAreas as g,
  imagesData as i,
  router as r,
  useAuth as u
};
